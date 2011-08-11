ROS.npcMode = (function() {
	
	

	return {

		npcs: [], // Tablica na npc
		activeEnemyNr: 0,
		trail: [],
		target: null,
		choosenAttacks: [],
		distance: 0,
		sight: false,

		clearNpcTurnFlags: function() {
			var x;
			for(x in ROS.base.npcs) {
				ROS.base.npcs[x].doneHisTurn = false;
			}	
		},

		// Przygotowuje liste npc ktorzy jeszcze nie wykonali swojej kolejki w tej turze 
		// Segreguje ich w kolejnsci inicjatywy i wybiera aktywnego Npc
		setActiveNpc: function() {
			// przelatuje przez całą tablice 2d zawierająca wrogie jednostki
			// ta tablica jest nadpisywana za kazdym razem w każdej fazie potworów w celu przesiania jednostek poległych		
			ROS.npcMode.npcs = []; // zeruje tabele
			var x,y;
			for(x in ROS.base.npcs) {
				if (!ROS.base.npcs[x].doneHisTurn) {
					ROS.npcMode.npcs.push(ROS.base.npcs[x]);
				}
			}
			
			if (ROS.npcMode.npcs.length === 0) {
				return 0;
			}

			// mieszam tablice aby za kazdym razem kolejnosc wrogow o tej samej inicjatywie była inna
			ROS.npcMode.npcs = ROS.tools.shuffleArray(ROS.npcMode.npcs);
			
			// sortowanie nie zmienia polozenia jednostek o takiej samej inicjatywie dlatego wczesniej pomieszałem tablice
			var n = ROS.npcMode.npcs.length;
			var temp;
			for (y=0; y<n; y++) {	
				// cykl powtarzam tyle razy ile jest komorek
				for (x=0; x<(n-1); x++) {			
					// potwór o najniższej inicjatywie jest spychany na koniec
					if (ROS.npcMode.npcs[x].cloneStats.initiative < ROS.npcMode.npcs[(x+1)].cloneStats.initiative) {
						temp = ROS.npcMode.npcs[x];
						ROS.npcMode.npcs[x] = ROS.npcMode.npcs[(x+1)];
						ROS.npcMode.npcs[(x+1)] = temp;			
					}
				}
				
			}
			
			ROS.base.activeNPC = ROS.npcMode.npcs[0];
			ROS.base.activeNPC.doneHisTurn = true; // już zaznacza ze ten Npc juz wykonal swoja kolejke chociaz dopiero ją zaczyna

			return ROS.npcMode.npcs.length;	
		},

		startPhase: function() {
			ROS.map.changeShadowBorderColor('red');										
				
			ROS.menuPopup.loopStop();
			ROS.base.activePlayerCircleAnimation.destroy(); // wylaczam animacje oznaczenia aktywnego gracza				
				
			ROS.hud.hide();
			ROS.hud.hideQuickMenu();				
			
			if (ROS.base.npcs.length < 1) {
				// brak jednostek npc na mapie konczy faze
				ROS.npcMode.finishPhase();
				return;
			}

			var x,e;
			// Odswieza stan statystyk ubywających wszystkich wrogim jednostkom
			for(x in ROS.base.npcs) {
				e = ROS.base.npcs[x];			
				e.actualStats.movement = e.cloneStats.movement;
				e.actualStats.attacks  = e.cloneStats.attacks;			
			}

			// Zeruje flagi
			ROS.npcMode.clearNpcTurnFlags();	
			
			ROS.npcMode.nextNPC();		
		},

		finishPhase: function() {
			//ROS.microScroll.hide(); // chowa po turze wrogów				

			ROS.npcMode.npcs = [];	
			ROS.base.activeNPC = null;
			ROS.npcMode.activeEnemyNr = 0;		
			ROS.npcMode.trail = [];
			ROS.npcMode.target = null;
			ROS.npcMode.choosenAttacks = [];
			ROS.npcMode.distance = 0;
			ROS.npcMode.sight = false;
			
			// po wykonaniu ostatniego ataku odczekaj pol sekundy - w ceul zobaczenia efektu i zakoncz faze
			setTimeout(function() { ROS.base.phaseNext(); },500);	
			return; // koniec
		},

		// Metoda odpowiedzialna za ruch wrogiej jednostki
		nextNPC: function() {
			// Ustala aktywnego Npc
			if (!ROS.npcMode.setActiveNpc()) {
				// Jeśli wszyscy wrogowie wykonali swoje ruchy to konczy
				ROS.npcMode.finishPhase();
				return;
			}
			
			ROS.npcMode.activeEnemyNr++;			
			//ROS.microScroll.show('Trwa tura wrogów: <b>'+ROS.npcMode.activeEnemyNr+'</b>','#ff0000');

			// Z każdym nowym npc czyści jego cel i sciezke aby mozna bylo ustawic nowe
			ROS.npcMode.trail = [];
			ROS.npcMode.target = null;
			
			// sprawdza czy npc nie stoi na polu zadającym obrażenia jeśli tak otrzymuje je (chyba że lata wtedy nie)
			// każdy npc otrzymuje obrażenia na początku swojej kolejki w fazie wrógów zgodnie z kolejnościa inicjatywy
			var tiledamage = ROS.dungeon.getSegment("map",ROS.dungeon.tileMap[ROS.base.activeNPC.tiley][ROS.base.activeNPC.tilex],'danger');
			if (tiledamage > 0 && ROS.base.activeNPC.actualStats.life > 0 && !ROS.base.activeNPC.fly) {
				
				ROS.base.activeNPC.hurt(tiledamage);

				if (ROS.base.activeNPC.isDestroy()) {
					ROS.npcMode.nextNPC();					
					return;
				}
			}

			ROS.npcMode.move();			
		},


		move: function() {			
			
			// wybiera cel i oblicza trase
			ROS.npcMode.calculateTrail();
						
			if (ROS.npcMode.target) {		
				
				//ROS.tools.console('log',ROS.base.activeNPC.getName()+' ('+ROS.base.activeNPC.uniqid+') wybrał: '+(ROS.npcMode.target ? ROS.npcMode.target.name+' ('+ROS.npcMode.target.uniqid+'|'+ROS.dungeon.tileAccess[ROS.npcMode.target.tiley][ROS.npcMode.target.tilex]+')' : 'Brak celu')+' | Ścieżka: '+ROS.npcMode.trail);
					
				// Jesli NPC wybrał na cel postać bohatera to centruje na tym bohaterze
				if (ROS.npcMode.target instanceof ROS.Hero) {
					ROS.map.center(
						ROS.npcMode.target.tilex,
						ROS.npcMode.target.tiley
					);
				}
				
				if (ROS.npcMode.trail.length > 0) {			
					ROS.base.activeNPC.moveStart({
						path : ROS.npcMode.trail,
						onfinish : function() {	
							// czysci sciezke: BARDZO WAŻNE !
							ROS.npcMode.trail = [];
							// atakuje			
							ROS.npcMode.attack();
						}
					});			
				} else {			
					// atakuje
					ROS.npcMode.attack();
				}		

			// Jeśli nie wybrał celu to znaczy ze nikogo nie widzial i nigdzie nie idzie przeskakujemy do kolejnego
			} else {
				ROS.npcMode.nextNPC();				
			}
			
		},
		
		

		


		// Funkcja oblicza droge ruchu jednostce wroga (AI)
		calculateTrail: function() {
			var x,y;
			
			// Ustawia ze nie widzi zadnego celu z posrod tych ktore zna
			for (x in ROS.base.activeNPC.knownTargets) {
				ROS.base.activeNPC.knownTargets[x].iseeyou = false;
			}
			
			// Odświeża zasięg wzroku NPC, spisuje wszystkie tile które on widzi
			ROS.base.activeNPC.refreshLOS();			

			// KROK 1 - Rozpoznanie
			var c;
			var ilu_widzi = 0;
			for(y=0; y<ROS.base.gameSize[1]; y++) {			
				for(x=0; x<ROS.base.gameSize[0]; x++) {
					// dla każdego tile'a w zasięgu wzroku sprawdzam czy znajduje się na nim potencjalny cel czyli inny wróg lub gracz (wyłączam z tego pozycje tego wroga)
					if (ROS.base.activeNPC.gridVisible[y][x] === 1 && (x !== ROS.base.activeNPC.tilex && y !== ROS.base.activeNPC.tiley)) {
						
						if (ROS.dungeon.gridHeroes[y][x] !== 0) {
							ilu_widzi++;
							c = ROS.dungeon.gridHeroes[y][x];
							if (c.actualStats.life > 0) {// tylko przytomni sa brani pod uwagę
								if (!ROS.base.activeNPC.knownTargets[c.uniqid]) {
									ROS.base.activeNPC.knownTargets[c.uniqid] = {									
										"type"  : "Player",
										"hate"  : 1,
										"iseeyou": true
									};								
								} else {
									ROS.base.activeNPC.knownTargets[c.uniqid].iseeyou = true;
								}
							}						
						}
						
						else if (ROS.dungeon.gridNpcs[y][x] !== 0) {
							ilu_widzi++;
							c = ROS.dungeon.gridNpcs[y][x];
							if (!ROS.base.activeNPC.knownTargets[c.uniqid]) {
								ROS.base.activeNPC.knownTargets[c.uniqid] = {																	
									"type"  : "NPC",
									"hate"  : 0,
									"iseeyou": true
								};								
							} else {
								ROS.base.activeNPC.knownTargets[c.uniqid].iseeyou = true;
							}						
						}
					}
				}
			}		
			
			
			// Jeśli wróg nikogo nie widzi to nic nie robi
			if (ilu_widzi === 0) {
				//ROS.tools.console('log',ROS.base.activeNPC.getName()+' ('+ROS.base.activeNPC.uniqid+') nikogo nie widzi');
				return;
			}
			
			// KROK 2 - Wybór celu
			// Identyfikatory celów przepisuje do tablicy i sortuje tablice w kolejnosci nienawiści
			var cele = [];
			var temp;
			for (x in ROS.base.activeNPC.knownTargets) {
				if (ROS.base.activeNPC.knownTargets[x].iseeyou === true) {
					// Jesli jednostka jest NPC to weźmie ją na cel tylko jesli jest innej rasy
					if ((ROS.base.activeNPC.knownTargets[x].type === "NPC" && ROS.base.npcs[x].npcRace !== ROS.base.activeNPC.npcRace) || 
					    ROS.base.activeNPC.knownTargets[x].type === "Player") {
						cele.push(x);
					}
				}			
			}					

			

			for (y = 0; y < cele.length; y++) {	
				// cykl powtarzam tyle razy ile jest komorek
				for (x = 0; x < (cele.length-1); x++) {			
					// postać najmniej nielubiana jest spychana na koniec
					if (ROS.base.activeNPC.knownTargets[cele[x]].hate < ROS.base.activeNPC.knownTargets[cele[(x+1)]].hate) {
						temp = cele[x];
						cele[x] = cele[(x+1)];
						cele[(x+1)] = temp;			
					}
				}			
			}
			
			

			// Spawdza ścieżke ruchu do każdego celu zaczynajac od tych których nie lubi najbardziej
			// Zaatakuje pierwszego do którego może się dostać	
			var trail = [];
			var t;				
			var cele_w_zasiegu = [];
			var cele_w_zasiegu2 = [];
			var cele_poza_zasiegiem = [];

			for (x=0; x<cele.length; x++) {
				
				if (ROS.base.activeNPC.knownTargets[cele[x]].type === "Player") {
					
					trail = ROS.tools.AStar(
							ROS.dungeon.tileAccess,
							[parseInt(ROS.base.activeNPC.tilex,10),parseInt(ROS.base.activeNPC.tiley,10)],
							[parseInt(ROS.base.heroes[cele[x]].tilex,10),parseInt(ROS.base.heroes[cele[x]].tiley,10)],
							1);
					t = ROS.base.heroes[cele[x]];
				} else {					
					trail = ROS.tools.AStar(
							ROS.dungeon.tileAccess,
							[parseInt(ROS.base.activeNPC.tilex,10),parseInt(ROS.base.activeNPC.tiley,10)],
							[parseInt(ROS.base.npcs[cele[x]].tilex,10),parseInt(ROS.base.npcs[cele[x]].tiley,10)],
							1);
					t = ROS.base.npcs[cele[x]];					
				}
				
				// Ponieważ w wywołaniu AStara powyżej przesyłam argument GoalFree == 1
				// To modyfikowana jest tablica tileAccess na potrzeby astara, teraz musze przywrocic jej pierwotny stan
				ROS.dungeon.setAccessTable();

				// jesli droga do tego celu jest możliwa to idzie :)
				if (trail.length > 0) {					
					trail.shift();									
					trail.pop(); // usuwa ostatni element poniewaz wskazuje on pole celu a npc zatrzymuje sie obok niego czyli na przedostatnim polu	
					
					// jesli dlugosc sciezki jest rowna lub krotsza od ilosci punktów ruchu (czyli moze przejsc całą)
					if (trail.length <= ROS.base.activeNPC.cloneStats.movement) {
						cele_w_zasiegu.push({
							"droga" : trail.slice(0,ROS.base.activeNPC.cloneStats.movement), // pobieram z tablicy pierwsze X krokow gdzie X to liczba punktow ruchu
							"cel" : t
						});	
					} else {
						// jesli jest mozliwa droga ale jest dluzsza niz ilosc punktow ruchu
						cele_w_zasiegu2.push({
							"droga" : trail.slice(0,ROS.base.activeNPC.cloneStats.movement), // pobieram z tablicy pierwsze X krokow gdzie X to liczba punktow ruchu
							"cel" : t
						});	
					}					
				} else {
					// jesli nie jest mozliwa droga
					cele_poza_zasiegiem.push({						
						"cel" : t
					});	
				}						
			}

			// jesli chociaz jeden cel jest w zasiegu to wybieram pierwszy poniewaz byly wkladane do tablicy w kolejnosci najwyzszego hate'a
			if (cele_w_zasiegu.length > 0) {
				ROS.npcMode.trail = cele_w_zasiegu[0].droga;
				ROS.npcMode.target = cele_w_zasiegu[0].cel;	
				cele_w_zasiegu = null;
				cele_w_zasiegu2 = null;
				cele_poza_zasiegiem = null;
				return;
			} 
			if (cele_w_zasiegu2.length > 0) {
				ROS.npcMode.trail = cele_w_zasiegu2[0].droga;
				ROS.npcMode.target = cele_w_zasiegu2[0].cel;			
				cele_w_zasiegu = null;
				cele_w_zasiegu2 = null;
				cele_poza_zasiegiem = null;
				return;
			}
			if (cele_poza_zasiegiem.length > 0) {
				ROS.npcMode.trail = []
				ROS.npcMode.target = cele_poza_zasiegiem[0].cel;			
				cele_w_zasiegu = null;
				cele_w_zasiegu2 = null;
				cele_poza_zasiegiem = null;
				return;
			}		
			
			cele_w_zasiegu = null;
			cele_w_zasiegu2 = null;
			cele_poza_zasiegiem = null;
			return;
		},

		
		// Metoda odpowiedzialna za atak wrogiej jednostki
		attack: function() {
			var x,a,a2;
			var faceTarget,faceTarget2;

			ROS.npcMode.choosenAttacks = [];
			
			// Npc moze zginąć w fazie ruchu (przechodząc np przez lawe)
			// dlatego sprawdzam w fazie ataku czy jeszcze zyje
			if (ROS.npcMode.target && ROS.base.activeNPC.actualStats.life > 0) {
				
				// Obliczam odleglosc i linie wzroku do celu
				ROS.npcMode.distance = ROS.tools.calculateDistance(
					ROS.base.activeNPC.tilex,
					ROS.base.activeNPC.tiley,
					ROS.npcMode.target.tilex,
					ROS.npcMode.target.tiley
				);
				ROS.npcMode.sight = ROS.tools.checkLos(
					ROS.base.activeNPC.tilex,
					ROS.base.activeNPC.tiley,
					ROS.npcMode.target.tilex,
					ROS.npcMode.target.tiley
				);
							
				// Wybiera ataki które NPC może wykonać ze swojej pozycji 
				for (x=0; x<ROS.base.activeNPC.attacksType.length; x++) {				
					a = ROS.base.activeNPC.attacksType[x];
									
					// sprawdza czy atak jest w zasięgu
					if (ROS.npcMode.distance >= a.range_min && ROS.npcMode.distance <= a.range_max) {					
						ROS.npcMode.choosenAttacks.push(a);
					}
				}
					
				// Jeśli NPC posiada atak, który ma szanse powodzenia						
				if (ROS.npcMode.choosenAttacks.length > 0) {				
					
					faceTarget = ROS.tools.frontFace(
						ROS.base.activeNPC.left,
						ROS.base.activeNPC.top,
						ROS.npcMode.target.left + (ROS.base.tileWidth/2),
						ROS.npcMode.target.top + (ROS.base.tileWidth/2)
					);

					if (ROS.npcMode.target instanceof ROS.Hero && !ROS.npcMode.target.makeTurn) {
						// Ustawia cel (bohatera) twarzą do wroga
						faceTarget2 = ROS.tools.frontFace(						
							ROS.npcMode.target.left,
							ROS.npcMode.target.top,
							ROS.base.activeNPC.left + (ROS.base.tileWidth/2),
							ROS.base.activeNPC.top + (ROS.base.tileWidth/2)
						);
						if (faceTarget2 !== false) {
							ROS.npcMode.target.makeTurn = true;
							ROS.npcMode.target.turn(
								faceTarget2,
								function(){}
							);
						}
					}
					// ROS.tools.console('log','Atakuje cel! | Wywołuje turn na: '+faceTarget);

					// Ustawia NPC przodem do celu i atakuje
					if (faceTarget !== false) {
						ROS.base.activeNPC.turn(
							faceTarget,
							ROS.npcMode.attackGo
						);
					} else {
						ROS.npcMode.attackGo();
					}

				// Jeśli żadnym atakiem NPC nie może sięgnąć celu to kończy
				} else {
					ROS.npcMode.nextNPC();
				}
				
			} else {
				ROS.npcMode.nextNPC();
			}
			
		},



		// Metoda zajmuje się wykonaniem wszystkich ataków wroga
		attackGo: function() {
			
			if (ROS.base.activeNPC.actualStats.attacks > 0 && ROS.npcMode.target.actualStats.life > 0 && ROS.npcMode.sight) {
				
				// z posrod atakow wybranych wylosowuje jeden
				var attackNr = ROS.tools.dice(ROS.npcMode.choosenAttacks.length)-1;			
				
				ROS.base.activeNPC.actualStats.attacks -= 1; // zmniejszam ilosc atakow
					
				// wykonuje atak
				ROS.npcMode.fightAttack({
					attack   : ROS.npcMode.choosenAttacks[attackNr],				
					onFinish : function() {		
					 	// przejdz do wykonywania kolejnego ataku
						ROS.npcMode.attackGo();
					}
				});
				
			} else {
				ROS.npcMode.nextNPC();
			}
			
		},
		
			
		// Atak wroga na cel
		fightAttack: function(args) {
			
			var cel = ROS.npcMode.target;
			var dist = ROS.npcMode.distance;
			
			var choosenAttack = args.attack;		
			var onFinishAttack = args.onFinish;			
			
			var anim, animPozx, animPozy, sfx;		
			var showInfoInConsole = true;

			// odgłos
			sfx = choosenAttack.sfx.split(',');
			if (sfx.length > 1) ROS.Sound.play(sfx[(ROS.tools.dice(sfx.length)-1)]);
			else ROS.Sound.play(sfx[0]);
			
			// animacja ataku
			anim = new ROS.Animation(choosenAttack.attack_anim); // swingN
			animPozx = (ROS.base.activeNPC.left+(ROS.base.activeNPC.width/2))-(anim.width/2);
			animPozy = (ROS.base.activeNPC.top+(ROS.base.activeNPC.height/2))-(anim.height/2);
			anim.moveAbs(animPozx,animPozy);
			
			// jesli npc atakujący jest poza zasiegiem wzroku i cel jest poza zasiegiem wzroku to nie widac animacji ataku
			// uzywam opacity() zamiast hide() bo ignite poniżej z automatu robi show() wiec niweczy hide()
			if (ROS.dungeon.gridVisible[ROS.base.activeNPC.tiley][ROS.base.activeNPC.tilex] === 0 &&
				ROS.dungeon.gridVisible[ROS.npcMode.target.tiley][ROS.npcMode.target.tilex] === 0) {				
				anim.opacity(0);
				showInfoInConsole = false;
			}

			if (choosenAttack.attack_anim_move == 1) {				
				anim.igniteMove({
					"start_x": animPozx,
					"start_y": animPozy,
					"stop_x": (cel.left+(cel.width/2))-(anim.width/2),
					"stop_y": (cel.top+(cel.height/2))-(anim.height/2),				
					"speed": 1,
					"angle": ROS.base.activeNPC.angle, // Kat ustawienia animacji
					"onFinishMove": function() {											
						ROS.npcMode.fightAttackEffect(choosenAttack,cel,dist,showInfoInConsole); 					
						onFinishAttack();						
					} 
				});		
			} else {			
				anim.ignite({
					"repetitions": 1,
					"speed": 60,				
					"zindex": 16,
					"angle": ROS.base.activeNPC.angle, // Kat ustawienia animacji
					"onTweenFrame": 1, // procentowy moment odtwarzanej animacji w ktorym zostanie uruchomiony onTween
					"onTween": function() {									
						ROS.npcMode.fightAttackEffect(choosenAttack,cel,dist,showInfoInConsole);
						onFinishAttack();						
					}				
				}); 				
			}
			
		},

		
		
		fightAttackEffect: function(choosenAttack,cel,dist,showInfoInConsole) {		
			var szansaTrafienia = 0;
			var nazwaAtaku = '';
			var silaAtaku = 0;
			var rany;
			
			// jeśli MINIMALNYM zasięgiem tego ataku jest odleglosc wieksza niz 1 to uznajemy taki atak za zasięgowy
			// atak ktory ma minimalny zasieg 1 a maksymalny np 3 moze zostac zadany nawet z odleglosci 2 pol a mimo to jest uznawany za NIE zasięgowy !
			if (choosenAttack.range_min > 1) {
				szansaTrafienia = Math.round( choosenAttack.weapon_skill + ROS.base.distanceMod[dist-1] );
				silaAtaku = ROS.tools.numberReader(choosenAttack.strength);
			} else {
				szansaTrafienia = Math.round((choosenAttack.weapon_skill / cel.cloneStats.defense_skill) * 50);
				silaAtaku = ROS.base.activeNPC.cloneStats.strength + ROS.tools.numberReader(choosenAttack.strength);
			}
				
			nazwaAtaku = choosenAttack.name;
					
			if (szansaTrafienia < 5) {
				szansaTrafienia = 5; // rzut ponizej 5 uznawany jest za super sukces
			}
			if (szansaTrafienia > 100) {
				szansaTrafienia = 100;		
			}

			var rzutNaTrafienie = ROS.tools.dice(100);
			
			if (rzutNaTrafienie <= szansaTrafienia) {
				
				rany = silaAtaku - (cel.cloneStats.toughness) + (cel.cloneStats.armour);
				if (rany < 0) {
					rany = 0;				
				}

				if (showInfoInConsole) {
					ROS.console.addLine(ROS.base.activeNPC.getName()+' > '+cel.getName()+': <b>'+nazwaAtaku+'</b><br>&nbsp; - Szansa trafienia : <span style="color:#ff0000"><b>'+szansaTrafienia+'%</b></span> (rzut : <span style="color:#ff0000"><b>'+rzutNaTrafienie+'</b></span> - Trafiony za: <span style="color:#ff0000"><b>'+rany+'</b></span>)<br>');	
				}

				cel.hurt(rany);		

				if (cel.isDestroy()) {								
					cel = 0;
					return;		
				}

			} else {
				// jesli nie trafil		
				if (showInfoInConsole) {		
					ROS.console.addLine(ROS.base.activeNPC.getName()+' > '+cel.getName()+': <b>'+nazwaAtaku+'</b><br>&nbsp; - Szansa trafienia : <span style="color:#ff0000"><b>'+szansaTrafienia+'%</b></span> (rzut : <span style="color:#ff0000"><b>'+rzutNaTrafienie+'</b></span> - Nie trafiony)<br>');	
				}
			}
			
			// Bez względu na to czy NPC trafił czy nie trafil to jesli jego celem był inny NPC to ten inny NPC otrzymuje bonus do heta przeciwko atakującemu potworkowi o ile przezył cios
			if (cel instanceof ROS.Npc && cel.actualStats.life > 0) {
				// notuje w pamięci zaatakowanego wroga kto go zaatakował
				// jednostka która go zaatakowała będzie przez niego ścigana nawet jeśli zniknie mu z pola widzenia
				// sprawdzam czy w tablicy specjalnych celów wroga znajduje się już ten gracz, jeśli się znajduje to zwiekszam moc nienawiści do niego o 1 jesli jescze go nie było to go wstawiam 
				
				if (!cel.knownTargets[ROS.base.activeNPC.uniqid]) {
					cel.knownTargets[ROS.base.activeNPC.uniqid] = {									
						"type"  : "NPC",
						"hate"  : 1,
						"iseeyou": true
					};								
				} else {
					cel.knownTargets[ROS.base.activeNPC.uniqid].hate += 1;
				}
			}		
		}

	}; 

})();