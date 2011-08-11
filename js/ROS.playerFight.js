// Obiekt walki gracza
// Zawiera zmienne i metody obsługujące wykonanie ataku brońmi trzymanymi w rekach
ROS.playerFight = (function() {
	
	return {
		
		attackFlag:0, // przechowuje stan wykonywania ataku bohatera (1 - aktualnie jest wykonywany atak | 0 - nie jest) w grze może być wykonywany jeden atak w tym samym czasie !
		
		// Metoda okresla jaki cel znajduje sie na wsazanym polu
		defineTarget: function(x,y) {
			// Jest zachowana specyficzna kolejnosc w przypadku jesli na polu drzwi stoi beczka a na niej siedzi pająk to 
			// zaatakowanie takiego pola najpierw zrani pająka pozniej rozbije beczke a na koncu drzwi
			var t = null;
			// W PIERWSZEJ KOLEJNOSCI PODSTAWIA WROGA			
			if (ROS.dungeon.gridNpcs[y][x] instanceof ROS.Npc) {
				t = ROS.dungeon.gridNpcs[y][x];				
			
			// JESLI WROGA NIE MA TO PODSTAWIA ELEMENT OTOCZENIA - KONTENER
			} else if (ROS.dungeon.gridContainers[y][x] instanceof ROS.Container) {
				t = ROS.dungeon.gridContainers[y][x];				
			
			// JESLI KONTENERA ANI WROGA NIE MA TO PODSTAWIA - DRZWI
			} else if (ROS.dungeon.tileDoors[y][x] instanceof ROS.Door) {
				t = ROS.dungeon.tileDoors[y][x];				
			}

			return t;
		},


		// Metoda wywoływana w chwili potwierdzenia chęci ataku na wybane pole z menu nawigacyjnego
		startFight: function(x,y) {
			// zamienia tile na px
			var cx = (x * ROS.base.tileWidth) + (ROS.base.tileWidth / 2);
			var cy = (y * ROS.base.tileHeight) + (ROS.base.tileHeight / 2);

			var allowed = ROS.playerFight.attackAllowed(x,y);						
			var target = ROS.playerFight.defineTarget(x,y);

			ROS.fly.hide(); // na czas animacji ataku ukrywam okieko zeby ładnie było widac animacje :P
			ROS.base.activePlayer.usedWeapons = 1; // zaznaczam ze gracz użył broni od tej chwili do konca tury nie będzie mógł zmienić broni						
			ROS.mouse.buttonDown = null; // bardzo ważne						
			ROS.playerFight.attackFlag = 1;	
			ROS.base.activePlayer.actualStats.attacks -= 1; // obniżam pozostałą ilość ataków	

			// obraca gracza twarzą w kierunku kliknietego tilea
			var ff = ROS.tools.frontFace(ROS.base.activePlayer.left,ROS.base.activePlayer.top,cx,cy);
			if (ff !== false) {
				ROS.base.activePlayer.turn(ff,function() {
					ROS.playerFight.fightAttack(1,cx,cy,allowed);
				}); // Kierunek ustawienia gracza, po ustawienia atakuje			
			} else {
				ROS.playerFight.fightAttack(1,cx,cy,allowed);
			}
			ff = null;
		},

		finishFight: function() {
			ROS.playerFight.attackFlag = 0; // oznaczam zakonczenie wykoywania atakow								
			ROS.menuPopup.forceLoop(); // odswiezam informacje o polu na ktorym stał wrog	
		},

		// Metoda przeprowadza obliczenia związane z wykonaniem ataku
		// Przekazujemy w argumencie numer ręki, którą wykonać atak 1=prawa, 2=lewa
		fightAttack: function(hand,celx,cely,al) {			
			var anim, animPozx, animPozy;			
			var weapon, szansa, s;

			ROS.base.activePlayer.refreshIconStats(); // odświeżam stan wykresu ruchu oraz życia

			hand = hand || 1;
			
			// Jeśli atak prawą ręką i wolno nią atakować lub lewą i wolno nia atakowac
			if ((hand === 1 && al[0]) || 
			    (hand === 2 && al[1])) {	
				
				if (hand === 1) {
					weapon = ROS.base.activePlayer.rightHandWeapon();
				} else {
					weapon = ROS.base.activePlayer.leftHandWeapon();
				}

				// dźwięk broni
				s = weapon.basic.typeSpecific.sounds.attack.split(',');
				if (s.length > 1) ROS.Sound.play(s[(ROS.tools.dice(s.length)-1)]);
				else ROS.Sound.play(s[0]);
				
				// animacja ataku bronią
				anim = new ROS.Animation(weapon.basic.typeSpecific.animate); 
				animPozx = (ROS.base.activePlayer.left+(ROS.base.activePlayer.width/2))-(anim.width/2);
				animPozy = (ROS.base.activePlayer.top+(ROS.base.activePlayer.height/2))-(anim.height/2);				
				anim.moveAbs(animPozx,animPozy);
				
				var cel_x = (Math.floor(celx/48)*48)+24-(anim.width/2);
				var cel_y = (Math.floor(cely/48)*48)+24-(anim.height/2);

				// animacja przesuwająca się (np: strzały)
				if (weapon.basic.typeSpecific.animateMove) {		
					anim.igniteMove({
						"start_x": animPozx,
						"start_y": animPozy,
						"stop_x": cel_x,
						"stop_y": cel_y,
						"speed": 10,
						"angle": ROS.base.activePlayer.angle, // Kat ustawienia animacji
						"onFinishMove": function() {															
							
							// Lexical scope - zasieg zmiennych ustalany jest w chwili ich utworzenia a nie wywolania							
							// dlatego argumenty weapon,hand,szansa przekazują poprawne dane chociaz funkcja jest 
							// wywolywana duzo pozniej
							// Funkcja fightAttackEffect jest prywatna dla obiektu ROS.playerFight
							// mimo to jest do niej zasięg z wnętrza funkcji onFinishMove wlaśnie dzięki Lexical Scope
							ROS.playerFight.fightAttackEffect(weapon,hand,celx,cely);
							
							// jesli byl atak pierwszą i moge drugą to drugą
							if (hand === 1 && al[1]) {								
								ROS.playerFight.fightAttack(2,celx,cely,al);
							} else {
								ROS.playerFight.finishFight();
							}							
						} 
					});					
				} else {						
					anim.ignite({
						"repetitions": 1,
						"speed": 60,						
						"zindex": 16,
						"angle": ROS.base.activePlayer.angle, // Kat ustawienia animacji
						"onTweenFrame": 3,
						"onTween": function() {
							// Używam onTween aby było wrażenie że przeciwnik "chlapnął krwią" gdy cios go dosięgnął a nie po wykonaniu animacji						 
							ROS.playerFight.fightAttackEffect(weapon,hand,celx,cely);
						},
						"onFinish": function() {
							// jesli byl atak pierwsza i moge drugą to druga
							if (hand === 1 && al[1]) {	
								ROS.playerFight.fightAttack(2,celx,cely,al);
							} else {
								ROS.playerFight.finishFight();							
							} 							
						} 
					});
					
				}
			} else {
				// jesli byl atak pierwsza i moge drugą to druga
				if (hand === 1 && al[1]) {
					ROS.playerFight.fightAttack(2,celx,cely,al);
				} else {
					// jesli pierwszą mi nie wolno i drugą tez nie to koncze
					ROS.playerFight.finishFight();
				}
			}
		},



		// Metoda przydziela konsekwencje ataku trafionemu celowi
		fightAttackEffect: function(bron,hand,celx,cely) {			
			// Rzut na trafienie
			var rnt = ROS.tools.dice(100); 

			var rany;				
			var shit = bron.basic.typeSpecific.sounds.hit.split(',');
			var opis = (hand === 1 ? 'Broń główna' : 'Broń dodatkowa');
			var x;
			var tx = Math.floor(celx / ROS.base.tileWidth);
			var ty = Math.floor(cely / ROS.base.tileHeight);
			
			// Odświeżam informacje o celu
			var target = ROS.playerFight.defineTarget(tx,ty);
			var distance = ROS.tools.calculateDistance(ROS.base.activePlayer.tilex,ROS.base.activePlayer.tiley,tx,ty); 
			var szansa = ROS.playerFight.hitChance(1,target,distance);						

			// Bronie zasięgowe złużywają się nawet jesli nie trafią
			if (bron.basic.type === 5) {
				bron.changeCondition(-1);
			}
			

			if (rnt <= szansa) {			
				
				// broń bliska złużywa się tylko jeśli trafi
				if (bron.getType() === 4) {					
					bron.changeCondition(-1);					
				}

				// URUCHOMIENIE EFEKTU whenHit
				if (bron.testActivate('whenHit')) {
					ROS.effects['whenHit'][bron.effects.whenHit].activate(tx,ty,[target]);	
				}

				
				if (shit.length > 1) ROS.Sound.play(shit[(ROS.tools.dice(shit.length)-1)]);
				else ROS.Sound.play(shit[0]);

				rany = ROS.playerFight.damageCount(bron,target)[1]; // oblicza i przydziela obrażenia						


				if (target) {
								
					ROS.playerFight.experienceCount(rany,target); // przydziela zdobyte doswiadczenie postaci która zraniła wroga

					ROS.console.addLine(ROS.base.activePlayer.getName()+' > '+target.getName()+' <b>('+opis+' - '+bron.getName()+')</b>:<br>&nbsp;&nbsp;&nbsp;Szansa trafienia: <span style="color:#ff0000"><b>'+szansa+'%</b></span> (rzut : <span style="color:#ff0000"><b>'+rnt+'</b></span> - Trafiony za: <span style="color:#ff0000"><b>'+rany+'</b></span>)<br>');					
					
					target.hurt(rany);		

					// Nawet jesli powyzszy hurt doprowadzi do smierci celu to i tak w targecie pozostanie referencja do obiektu tego celu dlatego moge wywolad isDestroy()
					if (target.isDestroy()) {
						target = 0;
						return;
					} 
				} else {
					ROS.console.addLine(ROS.base.activePlayer.getName()+' > Pusty obszar <b>('+opis+' - '+bron.getName()+')</b>:<br>&nbsp;&nbsp;&nbsp;&nbsp;Szansa trafienia: <span style="color:#ff0000"><b>'+szansa+'%</b></span> (rzut : <span style="color:#ff0000"><b>'+rnt+'</b></span> - Trafiony za: <span style="color:#ff0000"><b>'+rany+'</b></span>)<br>');					
				}			
			} else {			
				if (target) {
					ROS.console.addLine(ROS.base.activePlayer.getName()+' > '+target.getName()+' <b>('+opis+' - '+bron.getName()+')</b>:<br>&nbsp;&nbsp;&nbsp;Szansa trafienia: <span style="color:#ff0000"><b>'+szansa+'%</b></span> (rzut : <span style="color:#ff0000"><b>'+rnt+'</b></span> - Nie trafiony)<br>');
				} else {
					ROS.console.addLine(ROS.base.activePlayer.getName()+' > Pusty obszar <b>('+opis+' - '+bron.getName()+')</b>:<br>&nbsp;&nbsp;&nbsp;Szansa trafienia: <span style="color:#ff0000"><b>'+szansa+'%</b></span> (rzut : <span style="color:#ff0000"><b>'+rnt+'</b></span> - Nie trafiony)<br>');											
				}
			}
					
			if (target instanceof ROS.Npc) {
				// Bez względu na to czy trafił czy nie
				// wzrasta nienawiść atakowanego celu do bohatera atakującego
				if (!target.knownTargets[ROS.base.activePlayer.uniqid]) {
					 target.knownTargets[ROS.base.activePlayer.uniqid] = {									
						"type"  : "Player",
						"hate"  : 1,
						"iseeyou": true
					};								
				} else {
					target.knownTargets[ROS.base.activePlayer.uniqid].hate += 1;
				}		
			}
		},

		// Oblicza ilość zdobytego doświadczenia i przydziela je graczowi
		experienceCount: function(rany,target) {			
			if (target instanceof ROS.Npc) {
				var max_exp = target.exp; // sprawdzamy ile wynosi doświadczenie całkowite wroga			
				var max_life = target.solidStats.life; // sprawdzamy ile wynosi maksymalna żywotność wroga						
				var perc_loss = (rany * 100) / max_life; // obliczam jaki procent jego zdrowia został mu odebrany						
				if (perc_loss > 100) perc_loss = 100; // jeśli zadałem mu więcej niż potrzebował czyli ponad 100% to obcinam do 100%
				var exp = Math.ceil(max_exp * (perc_loss/100)); // teraz obliczam jaki to jest procent doświadczenia
				ROS.base.activePlayer.exp += exp; // dodaje do puli doświadczenia gracza
			}
		},

		// Metoda oblicza ilość zadanych obrażeń
		// Jeśli weapon równy jest zero to znaczy że gracz walczy pięściami 
		// w przeciwnym wypadku weapon jest obiektem broni
		// Jesli w zmiennej maxmin przeslemy slowo max albo min to zwroci maksymalne lub minimalne obrazenia
		damageCount: function(weapon,target,maxmin) {
			var silaAtaku = 0;			
			var dorzut = ROS.tools.numberReader(ROS.base.activePlayer.levelTable[ROS.base.activePlayer.level][0],maxmin); // pobieram z tabelki poziomów	
			var silaPostaci = ROS.base.activePlayer.cloneStats.strength;
			var silaBroni = ROS.tools.numberReader(weapon.basic.typeSpecific.damage,maxmin);
			var rany;

			// Zepsute bronie nic nie dodają
			if (weapon.basic.typeSpecific.conditionActual < 1) {
				silaBroni = 0;
			}

			switch(weapon.getType()) {
				case 4: silaAtaku = silaBroni + dorzut + silaPostaci; break;
				case 5: silaAtaku = silaBroni + dorzut; break;
			}
			
			if (target) {
				rany = silaAtaku - (target.getToughness() + target.getArmour());
			} else {
				rany = silaAtaku;
			}
			
			if (rany < 0) rany = 0;

			// Sprawdzam czy cel nie jest odporny na broń niemagiczną
			// Jeśli cel jest odporny na niemagiczną broń, a atak taką wykonano to zeruje obrażenia
			if (target && target.nonMagicResist && !weapon.basic.typeSpecific.magic) {
				rany = 0;
			}			

			return [silaAtaku,rany];
		},

		// Metoda oblicza procentową szanse trafienia z broni
		hitChance: function(hand,target,distance) {
			var sT = 0; // szansa trafienia
			var ws = ROS.base.activePlayer.cloneStats.weapon_skill;
			var bs = ROS.base.activePlayer.cloneStats.ballistic_skill;			
			var sa_dwie = false;

			var rw = ROS.base.activePlayer.rightHandWeapon();
			var lw = ROS.base.activePlayer.leftHandWeapon();

			var weapon = (hand === 1 ? rw : lw);
			
			if (rw && lw) {
				sa_dwie = true;
			}

			// przy walce dwoma brońmi naraz stosuje się modyfikator wynikający z trudnosci 
			// broń główna dostaje -10 do WS / BS
			// broń dodatkowa dostaje -20 do WS / BS	
			if (sa_dwie) {
				switch(hand) {
					case 1:
						ws -= 10; 
						bs -= 10;
					break;
					case 2:
						ws -= 20; 
						bs -= 20;
					break;
				}
			} 
									
			if (ws < 0) ws = 0;
			if (bs < 0) bs = 0;
			
			switch(weapon.getType()) {
				case 4: // Broń bliska
					
					// Tylko NPC mają wartość obrony
					if (target instanceof ROS.Npc) {
						// Jesli atakujący ma dwa razy wieksza walke wrecz od obrony celu to go trafia na 100
						sT = Math.round((ws / target.cloneStats.defense_skill) * 50); 						
					} else if (target instanceof ROS.Door || 
						       target instanceof ROS.Container) {
						sT = 100; // w drzwi i kontenery zawsze jest 100% szansy trafienia
					} else {
						sT = ws;
					}
				break;
				case 5: // Broń zasięgowa
					
					// Tylko NPC mają wartość rozmiaru która modyfikuje szanse trafienia
					if (target instanceof ROS.Npc || 
						target instanceof ROS.Door || 
						target instanceof ROS.Container) {
						sT = Math.round( bs + ROS.base.distanceMod[distance-1] + ROS.base.distanceSizeMod[target.getSize()] ); 
					} else {
						// tylko modyfikator za odleglosc
						sT = Math.round( bs + ROS.base.distanceMod[distance-1]);
					}
				break;
			}
		
			// jeśli cel jest w zasięgu broni, 
			// to zawsze jest 5% szans na powodzenie, 
			// nawet jesli z obliczeń wynika że jest mniej
			if (sT < 5) sT = 5;
			if (sT > 100) sT = 100;
		
			return sT;
		},


		// Sprawdza czy daną bronią można wykonać atak na wskazane pole 	
		attackAllowed: function(x,y) {		
			var gX = ROS.base.activePlayer.tilex;
			var gY = ROS.base.activePlayer.tiley;
			var leftAllowed = false;
			var rightAllowed = false;

			var distance = ROS.tools.calculateDistance(gX,gY,x,y); // obliczam odległóść pola wskazanego celownikiem od aktywnego gracza								
			
			var rw = ROS.base.activePlayer.rightHandWeapon();
			var lw = ROS.base.activePlayer.leftHandWeapon();

			function check(bron) {
				if (!bron) {return false;}
				if (distance <= bron.basic.typeSpecific.range) {				
					if (ROS.tools.checkLos(gX,gY,x,y)) {					
						if (bron.basic.typeSpecific.conditionActual > 0) {						
							return true;
						}
					}
				}
				return false;
			}

			// Sprawdzam o ile na polu nie stoi inny gracz wtedy nie wolno mi atakowac
			if (ROS.dungeon.gridHeroes[y][x] === 0) {
				rightAllowed = check(rw);
				leftAllowed = check(lw);				
			}

			return [rightAllowed,leftAllowed];
		},


		

		
		// uruchamiana tylko po najechaniu na NPC lub KONTENER lub DRZWI
		onTarget: function(target) {			
			
			// WAŻNA linijka - jesli najedziemy na cel podczas wyboru opcji z menu podrecznego to nie wywoluje onTarget 
			// zeby nie zmodyfikowac danych ustawionych przez checkAttack
			if (ROS.flyMenu.active) return '';

			var info = '';
			var info2 = '';

			var distance = ROS.tools.calculateDistance(ROS.base.activePlayer.tilex,ROS.base.activePlayer.tiley,target.tilex,target.tiley); // obliczam odległóść pola wskazanego celownikiem od aktywnego gracza								
			var allowed = ROS.playerFight.attackAllowed(target.tilex,target.tiley);
			
			var rw = ROS.base.activePlayer.rightHandWeapon();
			var lw = ROS.base.activePlayer.leftHandWeapon();
			
			if (target.nonMagicResist) {
				info2 = 'Cecha specjalna: niewrażliwość na broń niemagiczną<br />';
			}

			info = '<i>'+ROS.base.activePlayer.getName()+' nie trzyma w rękach broni, którą mógłby teraz wykonać atak przeciwko temu celowi.</i>';

			// Jeśli mogę wykonac atak bronią trzymaną w prawej ręce
			if (allowed[0]) {				
				info = 'Broń głowna: <b>'+rw.getName()+'</b>:<br>'+
					   '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Szansa trafienia: <b>'+ROS.playerFight.hitChance(1,target,distance)+'%</b><br>'+
					   '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Możliwe obrażenia: <b>'+ROS.playerFight.damageCount(rw,target,'min')[1]+'</b> - <b>'+ROS.playerFight.damageCount(rw,target,'max')[1]+'</b>';	
			}	
			
			// Jeśli moge wykonać atak bronią trzymaną w lewej ręce
			if (allowed[1]) {
				if (info !== '') info += '<br />';
				info += 'Broń dodatkowa: <b>'+lw.getName()+'</b>:<br>'+
						'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Szansa trafienia: <b>'+ROS.playerFight.hitChance(2,target,distance)+'%</b><br>'+
						'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Możliwe obrażenia: <b>'+ROS.playerFight.damageCount(lw,target,'min')[1]+'</b> - <b>'+ROS.playerFight.damageCount(lw,target,'max')[1]+'</b>';
			} 	
			
			// Pokazuje informacje o szansie trafienia wroga nad którym jest celownik
			var i = info2+'Kondycja: <b>'+target.actualStats.life+'</b> / <b>'+target.cloneStats.life+'</b><br />'+
				ROS.tools.show_wykres(target.actualStats.life,target.cloneStats.life,2,2.60)+
				'<hr size=1 color="#000000" noshadow>Aktywny bohater: <b>'+ROS.base.activePlayer.getName()+'</b><br />'+info;

			return i;

		},


		// Zwraca informacje o potencjalnym celu ataku
		checkAttack: function(x,y) {			
			var distance = ROS.tools.calculateDistance(ROS.base.activePlayer.tilex,ROS.base.activePlayer.tiley,x,y); // obliczam odległóść pola wskazanego celownikiem od aktywnego gracza					
			var allowed = ROS.playerFight.attackAllowed(x,y);						
			var target = ROS.playerFight.defineTarget(x,y);

			return {
				"name": (target ? target.getName() : 'Pusty obszar'),
				"canAttack": ((allowed[0] || allowed[1]) ? true : false),			
				"distance": distance
			};						
		}
	
	}; // koniec obiektu singleton

})();