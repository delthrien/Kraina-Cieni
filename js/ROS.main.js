/*!
 *	Copyright (C) 2011 Marcin Danysz (skrzynkapanamarcina@gmail.com)    
 *
 *	@Kraina Cieni is Browser-Based Dungeon-Crawl game
 *	@Link: http://www.krainacieni.pl
 *
 *	This file is part of Kraina Cieni.
 *
 *	Kraina Cieni is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
 *	Kraina Cieni is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 *	You should have received a copy of the GNU General Public License along with Kraina Cieni. If not, see <http://www.gnu.org/licenses/>.
 */

// Zbiór zmiennych podstawowych
ROS.base = {
	gameVersion: '0.412',
	gameVersionDate: '2011-08-11',
    tileWidth: 48,
    tileHeight: 48,
    gameSize: [50,50],   // rozmiar obszaru calej mapy 0-49 / 0-49
    gameSizePX: [2400,2400],  
    wSize: [0,0], // Rozmiar okna z grą (well) w px

    preloadImages: [],

    gameTurn: 1, // przechowuje aktualny numer tury
    gamePhase: 1, // przechowuje aktualny numer fazy tury
    gamePhases: ['heroes','npcs','events'],
    gamePhaseName: 'heroes',

    heroes: {}, // tablica jednowymiarowa przechowująca referencje do wszystkich postaci bohaterów
    npcs: {}, // tablica jednowymiarowa przechowująca referencje do wszystkich potworów
    containers: {}, // tablica jednowymiarowa przechowująca referencje do wsystkich kontenerów (skrzyń, beczek itp)
    doors: {}, // obiekt przechowująca referencje do wszystkich drzwi
    palettes: {}, // tablica jednowymiarowa przechowująca referencje do wsystkich peletek (kart)
    triggers: {}, // tablica przechowuje obiekty trigerów (niewidzialne divy reagujące na zdarzenia)
    items:{}, // przechowuje obiekty przedmiotów

    activePlayer: null, // przechowuje objekt aktywnego gracza
    activeNPC: null, // przechowuje obikt aktywnego npc

    activePlayerCircleAnimation: null, // animacja oznaczenia aktywnego gracza

    // Tablica przechowuje procentowy modyfikator w odniesieniu do odległości
	// np strzał na odległość 3 pól posiada modyfikator -10% na trafienie
	distanceMod: [0,0,-5,-10,-20,-25,-35,-45,-60,-70],
	distanceSizeMod: [-15,-10,0,10,15,20,25],	

	npcClasses: {
		"c1":"Urządzenie",
		"c2":"Potwór"
	},
	npcRaces: {
		"r1":"Manekin treningowy",
		"r2":"Pająk",
		"r3":"Postać eteryczna"
	},
	
	heroClasses: {
		"c1":"Wojownik",
		"c2":"Ranger",
		"c3":"Mag"
	},	
	heroRaces: {
		"r1":"Krasnolud",
		"r2":"Człowiek",
		"r3":"Elf"
	},

	statsNames: {
		"life"            : "Życie",
		"movement"        : "Ruch",
		"weapon_skill"    : "Walka wręcz",
		"defense_skill"   : "Obrona",
		"ballistic_skill" : "Celność",
		"strength"        : "Siła",
		"toughness"       : "Wytrzymałość",
		"initiative"      : "Inicjatywa",
		"attacks"         : "Ataki",
		"mana"            : "Magia",
		"sight"           : "Zasięg wzroku",
		"armour"          : "Pancerz",
		"damage"          : "Obrażenia"		
	},

	phaseNext: function(nr) {
		
		if (ROS.base.gamePhase < 3) {
			ROS.base.gamePhase++;
		} else {
			ROS.base.gamePhase = 1
			ROS.base.gameTurn++;
		}

		// Można wybrać faze podając nr
		if (nr) ROS.base.gamePhase = nr;

		var x,m,tiledamage;

		ROS.base.gamePhaseName = ROS.base.gamePhases[(ROS.base.gamePhase-1)];

		switch(ROS.base.gamePhaseName) {
			// FAZA GRACZY - NOWA TURA
			case 'heroes':
				ROS.hud.showQuickMenu();
				ROS.map.changeShadowBorderColor('black');
				ROS.console.addLine('<b>Faza Graczy</b>');
				
				// Nowa tura graczy rozpoczyna się od ostatnio wybranego bohatera
				// Jeśli żaden nie był wybrany (np na poczatku gry) to wybiera pierwszego
				if (!ROS.base.activePlayer) {
					// ustawia pierwszego z brzegu jako aktywnego
					for(x in ROS.base.heroes) {
						ROS.base.activePlayer = ROS.base.heroes[x];
						ROS.base.activePlayer.choosenBulb.style.display = 'block';
						break;
					}					
				} 
				
				// centruje mape na aktywnych graczu				
				ROS.map.center(ROS.base.activePlayer.tilex,ROS.base.activePlayer.tiley,false);

				// przywracam punktu many wszystkim przedmiotą które posiadają autoregeneracje many
				for(x in ROS.base.items) {					
					if (ROS.base.items[x].basic.hasOwnProperty('magic')) {
						m = ROS.base.items[x].basic.magic;
						if (m.manaActual < m.manaMax) {
							m.manaActual += m.manaAutoRestore;
							if (m.manaActual > m.manaMax) {
								m.manaActual = m.manaMax;
							}
						}
					}
				}

				// przywraca punkty ruchu wszystkim graczom, 
				// przelicza aktywne efekty które na nich oddziałują
				for(x in ROS.base.heroes) {					
					ROS.base.heroes[x].usedWeapons = 0; // resetuje oznaczenie użycia broni
					// regenerując ilość punktów ruchu podstawiam wartość z tablicy sklonowanej ponieważ na nią oddziałują przedmioty o czasowym działaniu i mogę mieć taki przedmiot który zwiększa górną granice punktów ruchu i wlasnie do tej granicy powinienem uzupełnić punkty
					ROS.base.heroes[x].actualStats.movement = ROS.base.heroes[x].cloneStats.movement;
					ROS.base.heroes[x].actualStats.attacks = ROS.base.heroes[x].cloneStats.attacks;

					// Regeneruje poziom many o 1
					if (ROS.base.heroes[x].actualStats.mana < ROS.base.heroes[x].cloneStats.mana) {
						ROS.base.heroes[x].actualStats.mana++;
					}

					// sprawdzam czy gracz stoi na polu zadającym obrażenia jeśli tak to otrzymuje stosowne rany
					tiledamage = ROS.dungeon.getSegment("map",ROS.dungeon.tileMap[ROS.base.heroes[x].tiley][ROS.base.heroes[x].tilex],'danger');
					if (tiledamage > 0 && ROS.base.heroes[x].actualStats.life > 0) {
						ROS.base.heroes[x].hurt(tiledamage);						
					}
					ROS.base.heroes[x].refreshIconStats();
					ROS.base.heroes[x].refreshBulbStats();
				}

				ROS.dungeon.setAccessTable(); // raz na poczatku i pozniej przy każdej zmianie gracza, aby kolejny gracz wiedział gdzie skonczyl poprzedni
				
				ROS.hud.refresh();
				ROS.hud.show();

				// Aktywuj animacje zaznaczenia aktywnego bohatera
				ROS.base.activePlayerCircleAnimation = new ROS.Animation('playerMark');				
				ROS.base.activePlayerCircleAnimation.moveAbs(ROS.base.activePlayer.left,ROS.base.activePlayer.top);
				ROS.base.activePlayerCircleAnimation.ignite({});

				// Rozpocznij obsługe kursora
				ROS.menuPopup.loopStart();
			break;

			// FAZA NPC
			case 'npcs':
				ROS.console.addLine('<b>Faza Wrogów</b>');
				ROS.npcMode.startPhase();
			break;

			// NIEPRZEWIDZIANE ZDARZENIA
			case 'events':				
				ROS.console.addLine('<b>Faza Zdarzeń</b>');
				ROS.events.startPhase();		
			break;

		}

	},

	// Ustawia gracza na wskazanej pozycji jako aktywnego
	setActivePlayer: function(tx,ty) {
		var x;
		if (ROS.base.gamePhaseName === 'heroes' && ROS.dungeon.gridHeroes[ty][tx] instanceof ROS.Hero) {			
			ROS.base.activePlayer = ROS.dungeon.gridHeroes[ty][tx];  // jesli conajmniej drugi od konca to moge jeszcze zwiekszyc
			
			ROS.hud.refresh();
			ROS.hud.refreshQuickMenu(); // odswieża menu podręczne

			ROS.base.activePlayerCircleAnimation.moveAbs(ROS.base.activePlayer.left,ROS.base.activePlayer.top); // ustawiam animacje - oznaczenie aktywnego gracza
			
			for(x in ROS.base.heroes) {
				ROS.base.heroes[x].choosenBulb.style.display = 'none';
			}	
			ROS.base.activePlayer.choosenBulb.style.display = 'block';

			ROS.dungeon.setAccessTable(); // odswiezam tablice zajetych pol poniewaz prawdopodobnie zmienilo sie polozenie poprzedniego gracza
		}
	}

	
};
















// Tworzy i obsługuje minimapke
ROS.minimap = (function() {

	var moveTimeout;
	var canvasContent = null;

	return {
		mm: null,
		mm2: null,
		area: null,
		paint: null, // div z malowaną minimapką
		moving: false,
		status: 0, // informacja o tym czy okno mapki jest otwarte czy zamkniete

		borderSize: 250,
		innerBorder: null,

		create: false, // tester

		refresh: function() {
			if (ROS.minimap.create) {
				ROS.minimap.area.style.width = (4*Math.round(ROS.base.wSize[0] / ROS.base.tileWidth)) + 'px';
				ROS.minimap.area.style.height = (4*Math.round(ROS.base.wSize[1] / ROS.base.tileHeight)) + 'px';
				ROS.minimap.innerBorder.style.width = (4*Math.round(ROS.base.wSize[0] / ROS.base.tileWidth)) - 2 + 'px';
				ROS.minimap.innerBorder.style.height = (4*Math.round(ROS.base.wSize[1] / ROS.base.tileHeight)) - 2 + 'px';
			}
		},

		minimize: function() {
			ROS.minimap.paintCanvas.style.display = 'none';
			ROS.minimap.area.style.display = 'none';
			ROS.minimap.mm.style.width = 54+'px';
			ROS.minimap.mm.style.height = 54+'px';
			ROS.minimap.mm.style.background = 'url(gfx/mmapa_mini.png)';
			ROS.minimap.status = 0;
		},

		
		maximize: function() {
			ROS.minimap.redrawAll();
			ROS.minimap.paintCanvas.style.display = 'block';
			ROS.minimap.area.style.display = 'block';
			ROS.minimap.mm.style.width = 228+'px';
			ROS.minimap.mm.style.height = 228+'px';
			ROS.minimap.mm.style.background = 'url(gfx/mmapa.png)';
			ROS.minimap.status = 1;
		},		

		create: function() {
			// minimapa
			ROS.minimap.mm = document.createElement("div");
			var mms = ROS.minimap.mm.style;
			mms.position = 'absolute';
			mms.zIndex = 500;
			mms.top = 0+'px';
			mms.left = 0+'px';
			mms.width = 228+'px';
			mms.height = 228+'px';
			mms.background = 'url(gfx/mmapa.png)';
			mms.backgroundSize = '100%';
			mms.backgroundOrigin = 'content';
			mms.overflow = 'hidden';
			ROS.map.well.appendChild(ROS.minimap.mm);
			ROS.minimap.mm.onmouseover = function() {
				ROS.map.borderMoving = false;
				ROS.minimap.maximize();
				ROS.menuPopup.loopStop();
			};
			ROS.minimap.mm.onmouseout = function() {
				ROS.minimap.minimize();
				ROS.map.borderMoving = true;
				ROS.menuPopup.loopStart();
			};

			
			ROS.minimap.paintCanvas = document.createElement("canvas");			
			ROS.minimap.paintCanvas.width = 200; // musi byc tutaj ustalone bo w stylach nie wystarcza
			ROS.minimap.paintCanvas.height = 200;
			var mpcs = ROS.minimap.paintCanvas.style;
			mpcs.top = 5+'px';
			mpcs.left = 5+'px';
			mpcs.zIndex = 14;
			mpcs.position = 'absolute';
			ROS.minimap.mm.appendChild(ROS.minimap.paintCanvas);
			canvasContent = ROS.minimap.paintCanvas.getContext('2d');


			ROS.minimap.mm2 = document.createElement("div");
			var mm2s = ROS.minimap.mm2.style;
			mm2s.position = 'absolute';
			mm2s.zIndex = 15;
			mm2s.top = 5+'px';
			mm2s.left = 5+'px';
			mm2s.width = 200+'px';
			mm2s.height = 200+'px';			
			mm2s.overflow = 'hidden';
			ROS.minimap.mm.appendChild(ROS.minimap.mm2);
			ROS.minimap.mm2.onmousedown = function(e) {
				ROS.mouse.down(e,false);
				if (ROS.mouse.buttonDown === 1) {
					ROS.minimap.startMove();
				}
			};
			ROS.minimap.mm2.onmouseup = function() {
				ROS.minimap.stopMove();
			};


			ROS.minimap.area = document.createElement("div");
			var mas = ROS.minimap.area.style;
			mas.position = 'absolute';
			mas.left = 0 + 'px';
			mas.top = 0 + 'px';
			mas.width = (4*Math.round(ROS.base.wSize[0] / ROS.base.tileWidth)) + 'px'; // 200
			mas.height = (4*Math.round(ROS.base.wSize[1] / ROS.base.tileHeight)) + 'px'; // 200
			mas.zIndex = 13;
			mas.border = ROS.minimap.borderSize+'px solid #2F2217';
			mas.opacity = .2;			
			ROS.minimap.mm2.appendChild(ROS.minimap.area);

			ROS.minimap.innerBorder = document.createElement("div");
			var ibs = ROS.minimap.innerBorder.style;
			ibs.position = 'absolute';
			ibs.top = 0+'px';
			ibs.left = 0+'px';
			ibs.width = (4*Math.round(ROS.base.wSize[0] / ROS.base.tileWidth)) - 2 + 'px';
			ibs.height = (4*Math.round(ROS.base.wSize[1] / ROS.base.tileHeight)) - 2 + 'px';
			ibs.border = '1px solid #000000';
			ROS.minimap.area.appendChild(ROS.minimap.innerBorder);

			// Na starcie jest zwinięta
			ROS.minimap.minimize();

			ROS.map.create = true;
		},

		// rysuje punkt na minimapie
		draw: function(x,y,color,stroke,w,h,transparency) {			
			if (color === null) {
				color = ROS.dungeon.getSegment("map",ROS.dungeon.tileMap[y][x],'minimap');
				if (!color) {
					color = ROS.dungeon.getSegment("stuff",ROS.dungeon.tileStuff[y][x],'minimap');
				}
			}

			if (color) {
				var rgb = ROS.tools.convHex2RGB(color);				
				if (stroke) {
					canvasContent.strokeStyle = "rgba("+rgb[0]+","+rgb[1]+","+rgb[2]+","+transparency+")";
					canvasContent.strokeRect((x*4),(y*4),w,h);			
				} else {					
					canvasContent.fillStyle = "rgba("+rgb[0]+","+rgb[1]+","+rgb[2]+","+transparency+")";
					canvasContent.fillRect((x*4),(y*4),w,h);			
				}
			}
		},

		// na podstawie odwiedzonych obszarów przerysowuje całą minimapke
		redrawAll: function() {
			var x,y;
			canvasContent.clearRect(0,0,200,200);
			for(y=0; y<ROS.base.gameSize[1]; y++) {
                for(x=0; x<ROS.base.gameSize[0]; x++) {
                    // Do testu bierze tylko komórki na których znajdują się podziemia lub sciany                    
                    if (ROS.dungeon.gridVisible[y][x] !== 0) {
             			ROS.minimap.draw(x,y,null,false,4,4,0.7);       	             			
                    } else {
                    	// sprawdza czy nie jest to FOW
                    	if (ROS.dungeon.gridFogOfWar[y][x] !== 0) {
             				ROS.minimap.draw(x,y,null,false,4,4,0.4);
             			}
                    }

                    if (ROS.dungeon.gridHeroes[y][x] !== 0) {
                    	ROS.minimap.draw(x,y,'#ff0000',false,3,3,1);
                    }
                }
            }
		},

		startMove: function() {
			// zapamietuje pozycje w chwili nacisniecia
			if (!self.moving) {
				if (ROS.mouse.overwell()) {
					var mapStartX = parseInt(ROS.minimap.area.style.left,10);
					var mapStartY = parseInt(ROS.minimap.area.style.top,10);
					var mouseStartX = ROS.mouse.x;
					var mouseStartY = ROS.mouse.y;
					ROS.minimap.moving = true;
					ROS.minimap.move(mapStartX,mapStartY,mouseStartX,mouseStartY);
				}
			}
		},

		move: function(px,py,mx,my) {
			var x = parseInt(ROS.minimap.area.style.left,10);
			var y = parseInt(ROS.minimap.area.style.top,10);

			// rozmiar okienka
			var w = parseInt(ROS.minimap.area.style.width,10);
			var h = parseInt(ROS.minimap.area.style.height,10);

			var mmx = px + (ROS.mouse.x - mx);
			var mmy = py + (ROS.mouse.y - my);

			// Ogrniczenia okienka minimapy, zby nie dało się wyjechać okienkiem poza obszar minimapki
			// 200 to wymiar minimapy (200x200)
			if (mmx < -ROS.minimap.borderSize) mmx = -ROS.minimap.borderSize;
			if (mmx > 200-ROS.minimap.borderSize-w) mmx = 200-ROS.minimap.borderSize-w;

			if (mmy < -ROS.minimap.borderSize) mmy = -ROS.minimap.borderSize;
			if (mmy > 200-ROS.minimap.borderSize-h) mmy = 200-ROS.minimap.borderSize-h;

			ROS.minimap.area.style.left = mmx + 'px';
			ROS.minimap.area.style.top = mmy + 'px';

			// 0.5 ponieważ przesunięcie Boxa o 1px przesuwa mape o pół tiles'a poniewaz cały tiles to 2px
			// 0.25 ponieważ przesunięcie Boxa o 1px przesuwa mape o 1/4 tiles'a poniewaz cały tiles to 4px
			ROS.map.area.style.left = Math.floor((x + ROS.minimap.borderSize) * ROS.base.tileWidth)*(-0.25) + 'px';
			ROS.map.area.style.top = Math.floor((y + ROS.minimap.borderSize) * ROS.base.tileHeight)*(-0.25) + 'px';

			moveTimeout = setTimeout(function() { ROS.minimap.move(px,py,mx,my); },10);
		},

		stopMove: function() {
			clearTimeout(moveTimeout);
			ROS.minimap.moving = false;
		}

	};

})();














// Tworzy i obsługuje głowny obszar mapy z podziemiami
ROS.map = (function() {

	var moveTimeout;
	var moveTimeoutSlide;

	return {
		well:null,
		area:null,
		
		pathLayer:null,

		moving:false,
		borderMoving:true, // jesli tru to dziala borderMove jesli nie to nie dziala
		create:false, // tester
		shadows:null,
		
		refresh: function() {
			if (ROS.map.create) {
				ROS.map.well.style.width = ROS.base.wSize[0]+'px';
				ROS.map.well.style.height = ROS.base.wSize[1]+'px';
			}
		},

		create: function() {
			// Wrapper window
			ROS.map.well = document.createElement("div");
			var w = ROS.map.well.style;
			w.position = 'absolute';
			w.overflow = 'hidden';
			w.width = ROS.base.wSize[0]+'px';
			w.height = ROS.base.wSize[1]+'px';
			w.top = 0+'px';
			w.left = 0+'px';
			w.display = 'block';
			document.body.appendChild(ROS.map.well);

			// Entire game
			ROS.map.area = document.createElement("div");
			var m = ROS.map.area.style;			
			m.position = 'relative';
			m.background = 'url(gfx/bg.jpg)';
			m.width = ROS.base.gameSizePX[0]+'px';
			m.height = ROS.base.gameSizePX[1]+'px';
			m.left = 0+'px';
			m.top = 0+'px';
			ROS.map.area.onmousedown = function(e) {
				ROS.mouse.down(e);
				if (ROS.mouse.buttonDown === 3) {
					ROS.map.startMove();
				}
			};
			ROS.map.area.onmouseup = function() {				
				ROS.map.stopMove();
			};
			ROS.map.well.appendChild(ROS.map.area);

			// Cień na krawędziach wrappera
			// Jest na osobnej wartstwie aby nie byl przykrywany przez background ROS.map.area
						
			ROS.map.shadows = document.createElement("div");
			var s = ROS.map.shadows.style;
			s.position = 'absolute';
    		s.top = 0+'px'; 
    		s.left = 0+'px';
    		s.width = 100+'%';
    		s.height = 100+'%';
    		s.pointerEvents = 'none'; /* to make clicks pass through */    		
    		s.mozBoxShadow = 'inset 0 0 15px 10px #000000';
			s.webkitBoxShadow = 'inset 0 0 15px 10px  #000000';
			s.boxShadow = 'inset 0 0 15px 10px  #000000';	
			s.zIndex = 100;	
			ROS.map.well.appendChild(ROS.map.shadows);			

			ROS.map.create = true;
		},

		changeShadowBorderColor: function(type) {			
			switch(type) {
				case "red":
					ROS.map.shadows.style.mozBoxShadow = 'inset 0 0 35px 5px #FF0000';
					ROS.map.shadows.style.webkitBoxShadow = 'inset 0 0 35px 5px  #FF0000';
					ROS.map.shadows.style.boxShadow = 'inset 0 0 35px 5px  #FF0000';
				break;
				case "black":
					ROS.map.shadows.style.mozBoxShadow = 'inset 0 0 25px 5px #000000';
					ROS.map.shadows.style.webkitBoxShadow = 'inset 0 0 25px 5px  #000000';
					ROS.map.shadows.style.boxShadow = 'inset 0 0 25px 5px  #000000';	
				break;
			}			
		},

		startMove: function() {
			// zapamietuje pozycje w chwili nacisniecia
			if (!ROS.map.moving) {
				if (ROS.mouse.overwell() && !ROS.infoScroll.active) {
					if (ROS.base.gamePhaseName === 'heroes') {
						ROS.menuPopup.loopStop();
					}
					var mapStartX = parseInt(ROS.map.area.style.left,10);
					var mapStartY = parseInt(ROS.map.area.style.top,10);
					var mouseStartX = ROS.mouse.x;
					var mouseStartY = ROS.mouse.y;
					ROS.map.moving = true;
					ROS.map.move(mapStartX,mapStartY,mouseStartX,mouseStartY);
				}
			}
		},

		move: function(px,py,mx,my) {
			var x = parseInt(ROS.map.area.style.left,10);
			var y = parseInt(ROS.map.area.style.top,10);
			
			var mmx = px + (ROS.mouse.x - mx);
			var mmy = py + (ROS.mouse.y - my);

			// Ogrniczenia okna mapy, zeby nie dało się wyjechać oknem poza obszar mapy			
			if (mmx > 0) {mmx = 0;}
			if (mmx < -ROS.base.gameSizePX[0]+ROS.base.wSize[0]) {mmx = -ROS.base.gameSizePX[0]+ROS.base.wSize[0];}
			if (mmy > 0) {mmy = 0;}
			if (mmy < -ROS.base.gameSizePX[1]+ROS.base.wSize[1]) {mmy = -ROS.base.gameSizePX[1]+ROS.base.wSize[1];}

			ROS.map.area.style.left = mmx + 'px';
			ROS.map.area.style.top = mmy + 'px';

			moveTimeout = setTimeout(function() { ROS.map.move(px,py,mx,my); },10);
		},

		stopMove: function() {			
			clearTimeout(moveTimeout);

			if (ROS.map.moving) {
				ROS.map.moving = false;
				
				var x = parseInt(ROS.map.area.style.left,10);
				var y = parseInt(ROS.map.area.style.top,10);
				
				// box na minimapie przesuwa się odpowiednio również
				ROS.minimap.area.style.left = Math.floor(x / ROS.base.tileWidth)*(-1)*4 - ROS.minimap.borderSize + 'px';
				ROS.minimap.area.style.top = Math.floor(y / ROS.base.tileHeight)*(-1)*4 - ROS.minimap.borderSize + 'px';

				if (ROS.base.gamePhaseName === 'heroes') {
					ROS.menuPopup.loopStart();
				}
			}
		},


		

		// przesuwanie mapy
		borderMove: function(speed) {
			if (!ROS.map.borderMoving) return;

			// grubość aktywnej krawędzi
			var areaSize = 20;

			var mmx,mmy;

			// polozenie mapy
			var x = parseInt(ROS.map.area.style.left,10);
			var y = parseInt(ROS.map.area.style.top,10);

			// rozmiar okna
			var w = ROS.base.wSize[0];
			var h = ROS.base.wSize[1];

			// polozenie myszki
			var mx = ROS.mouse.x;
			var my = ROS.mouse.y;

			// podstawiam aktualne wartości aby nie zerował osi w ktorych nie przesuwa
			mmx = x;
			mmy = y;

			if (mx >= (w-areaSize) && mx <= w) {
				mmx = x - speed;
			}
			if (mx <= areaSize && mx >= 0) {
				mmx = x + speed;
			}
			if (my >= (h-areaSize) && my <= h) {
				mmy = y - speed;
			}
			if (my <= areaSize && my >= 0) {
				mmy = y + speed;
			}

			//ROS.tools.console('log',mx);

			if (mmx !== 0 || mmy !== 0) {
				// Ogrniczenia okna mapy, zeby nie dało się wyjechać oknem poza obszar mapy			
				if (mmx >= 0) {mmx = 0;}
				if (mmx < -ROS.base.gameSizePX[0]+w) {mmx = -ROS.base.gameSizePX[0]+w;}

				if (mmy >= 0) {mmy = 0;}
				if (mmy < -ROS.base.gameSizePX[1]+h) {mmy = -ROS.base.gameSizePX[1]+h;}

				ROS.map.area.style.left = mmx + 'px';
				ROS.map.area.style.top = mmy + 'px';

				// box na minimapie przesuwa się odpowiednio również
				ROS.minimap.area.style.left = Math.floor(x / ROS.base.tileWidth)*(-1)*4 - ROS.minimap.borderSize + 'px';
				ROS.minimap.area.style.top = Math.floor(y / ROS.base.tileHeight)*(-1)*4 - ROS.minimap.borderSize + 'px';
			}			
		},

		// natychmiastowe ustawienie mapy na wybranym tile'u
		center: function(tx,ty,slide,onFinish,displaceX,displaceY) {
			
			if (slide === undefined) {
				slide = false;
			}

			var dX = (displaceX == undefined ? 0 : displaceX);
			var dY = (displaceY == undefined ? -70 : displaceY); // przesuniecie o -45 w pionie, bo dolna czesc okna jest zaslonieta przez plakietki postaci

			//var x = (this.left*-1)+Math.floor(ROS.base.wSize[0]/2)+dX;
			//var y = (this.top*-1)+Math.floor(ROS.base.wSize[1]/2)+dY;

			var x = ((tx * ROS.base.tileWidth)*-1) + Math.floor(ROS.base.wSize[0]/2) + dX;
			var y = ((ty * ROS.base.tileHeight)*-1) + Math.floor(ROS.base.wSize[1]/2) + dY;

			// rozmiar okna
			var w = ROS.base.wSize[0];
			var h = ROS.base.wSize[1];

			// Ogrniczenia okna mapy, zeby nie dało się wyjechać oknem poza obszar mapy
			if (x > 0) x = 0;
			if (x < -ROS.base.gameSizePX[0] + w) x = -ROS.base.gameSizePX[0] + w;

			if (y > 0) y = 0;
			if (y < -ROS.base.gameSizePX[1] + h) y = -ROS.base.gameSizePX[1] + h;

			var startX = parseInt(ROS.map.area.style.left,10);
			var startY = parseInt(ROS.map.area.style.top,10);

			// jesli przesuniecie mapy jest nieznaczne to włacza tryb płynny

			var x1 = Math.abs(startX);
			var y1 = Math.abs(startY);
			var x2 = Math.abs(x);
			var y2 = Math.abs(y);
			var test1 = false;
			var test2 = false;
			var distance = 300;
			if (x1 > x2) {
				if (x1 - x2 < distance) test1 = true;
			} else {
				if (x2 - x1 < distance) test1 = true;
			}
			if (y1 > y2) {
				if (y1 - y2 < distance) test2 = true;
			} else {
				if (y2 - y1 < distance) test2 = true;
			}
			if (test1 && test2) {
				slide = true;
			}

			if (!slide) {				
				ROS.map.area.style.left = x + 'px';
				ROS.map.area.style.top = y + 'px';
				ROS.minimap.area.style.left = (Math.floor(parseInt(ROS.map.area.style.left,10) / ROS.base.tileWidth)*(-1)*4) - ROS.minimap.borderSize + 'px';
				ROS.minimap.area.style.top = (Math.floor(parseInt(ROS.map.area.style.top,10) / ROS.base.tileHeight)*(-1)*4) - ROS.minimap.borderSize + 'px';
				if (onFinish) {					
					(onFinish)();
				}
				return; 
			} else {							
				var checkSteps = 5;				
				// określam siatke nachylenia linii przesuwu.
	        	// Tworze wirtualny prostokąt którego jeden narożnik to punk startowy, a przeciwległy narożnik to punk końcowy i dziele ten prostokąt na kolumny i rzędy
	        	// w ten sposób otrzymuje wysokść i szerokość jednej kosteczki tego posiatkowanego prostokąta, wymiary podstawiam pod slopeX i slopeY
	        	var slopeX = Math.abs((x - startX) / checkSteps);
	        	var slopeY = Math.abs((y - startY) / checkSteps);            
	        	ROS.map.slideTo(startX,startY,x,y,slopeX,slopeY,onFinish);
			}
		},

		slideTo: function(sx,sy,ex,ey,qx,qy,onFinish) {
			// pobieram położenie kolejnych kosteczek
			var x,y;

			if (sx < ex) {
            	x = sx + qx;
            	if (x > ex) x = ex;            	
        	} else {
        		x = sx - qx;
        		if (x < ex) x = ex;            	
        	}

			if (sy < ey) {
            	y = sy + qy;
            	if (y > ey) y = ey;            	
            } else {
            	y = sy - qy;
            	if (y < ey) y = ey;
            }

            ROS.map.area.style.left = x + 'px';
			ROS.map.area.style.top = y + 'px';

			ROS.minimap.area.style.left = (Math.floor(parseInt(ROS.map.area.style.left,10) / ROS.base.tileWidth)*(-1)*4) - ROS.minimap.borderSize + 'px';
			ROS.minimap.area.style.top = (Math.floor(parseInt(ROS.map.area.style.top,10) / ROS.base.tileHeight)*(-1)*4) - ROS.minimap.borderSize + 'px';
			
			if (x === ex && y === ey) {
				clearTimeout(moveTimeoutSlide);
				if (onFinish) {
					(onFinish)();
				}
				return;
			}

			moveTimeoutSlide = setTimeout(function() { ROS.map.slideTo(x,y,ex,ey,qx,qy,onFinish); },10);
		}

	};

})();













// URUCHAMIANA PO ZAŁADOWANIU SKRYPTÓW I GRAFIK
// Aktywuje wsztystkie klasy gry
ROS.load = function() {

	// Pobiera rozmiar okna gry
	ROS.base.wSize = [ROS.tools.windowSize().x,ROS.tools.windowSize().y];

	// Propagacja zdarzeń:
	// Najwyższy poziom obsługi puszczenia klawisza myszki, obsługiwany przez BODY:
	document.body.onmouseup = function() {
		// Puszczenie kursora na obszarze strony powoduje:
		// I. Zatrzymanie przesuwania minimapy (ważne jesli zjechałem z jej obszaru z naciśnietym przyciskiem)
		ROS.minimap.stopMove();

		// II. Zatrzymanie przesuwania mapy
		ROS.map.stopMove();

		// III. Jeśli jest przenoszony przedmiot to wraca go na pole z ktorego został podniesiony
		if (ROS.flyBag.item !== null) {
			ROS.flyBag.giveBack();
			ROS.flyBag.hide();
		}

		// IV. Zamknięcie popup menu
		if (ROS.flyMenu.active) {
			ROS.fly.hide();
			ROS.flyMenu.hide();
		}
	}

	// Zdarzenia zatrzymują/wznawiają przesuwanie mapy techniką zbliżenia do krawedzi jesli kursor zjedzie z obszaru okna
	// UWAGA: Te zdarzenia są wywoływane również gdy wjade myszką na diva w obszarze body - dziwne, w kazdym razie nie pchamy tu nic wiecej
	document.body.onmouseout = function() {
		ROS.map.borderMoving = false;	
		//ROS.tools.console('log','hmm');		
	}
	document.body.onmouseover = function() {
		ROS.map.borderMoving = true;
		//ROS.tools.console('log','hmm2');
	}

	// Podczas zmiany wielkosci okna dostosowuje wszystkie elementy gry do nowej przestrzeni
	window.onresize = function() {		
		ROS.mouse.center();	
		ROS.base.wSize = [ROS.tools.windowSize().x,ROS.tools.windowSize().y];
		ROS.map.refresh();
		ROS.minimap.refresh();
		if (ROS.base.activePlayer) {
			ROS.map.center(ROS.base.activePlayer.tilex,ROS.base.activePlayer.tiley);
		}
		ROS.infoScroll.refresh();		
	}	
	
	// Paletka informacyjna
		ROS.infoScroll.create();
		ROS.microScroll.create();
	
	// Paletki stworzone, wywołuje okno powitalne
		var welcome = '<img src="gfx/logo.png"><br />'+
		'ver. '+ROS.base.gameVersion+' ('+ROS.base.gameVersionDate+')'+
		'<p style="text-align:left; font-size:14px;">Zanim zaczniesz grę mam dla Ciebie kilka cennych uwag:<br />'+
		'- gra nie jest jeszcze ukończona (więc jest mało przedmiotów i wrogów)<br />'+
		'- przeładowanie strony powoduje wygenerowanie nowych niepowtarzalnych podziemi<br />'+
		'- ture kończysz klikając w ikone klepsydry w dolnym prawym rogu ekranu<br />'+
		'- używaj obu przycisków myszy, aby odkryć wszystkie opcje<br />'+
		'- jeśli gra działa powoli zmniejsz rozmiar okna przeglądarki<br />'+
		'- jeśli masz jakieś uwagi lub pytania zapraszam na strone www.krainacieni.pl<br /><br />'+
		'To chyba tyle na początek, miłej zabawy :)';
		ROS.infoScroll.show(welcome,600,0.5,function() { ROS.base.phaseNext(1); });

	// Obszar podziemia
		ROS.map.create();

	// Guziki akcji
		ROS.hud.create();

	// Mapa
		ROS.dungeon.create();

	// Minimapa
		ROS.minimap.create();

	// Divy latające		
		ROS.fly.create();
		ROS.flyBag.create();
		ROS.flyMenu.create();	
		ROS.console.create();
		ROS.console.addLine('Inicjalizacja...<br>');
	// BOHATEROWIE
		
		var w1 = new ROS.Hero('dwarf','Ryger');
		w1.addStuff('gold');
		w1.addStuff('gold');
		w1.addStuff('goldPile');

		var w2 = new ROS.Hero('barbarian','Tim');
		w2.addStuff('dagger');
		w2.addStuff('magicDagger');
		w2.addStuff('shield');
		w2.addStuff('crossbow');
		w2.addStuff('crossbow');

		var w3 = new ROS.Hero('elf','Iliael');		
		w3.addStuff('bow');

		var w4 = new ROS.Hero('wizard','Fentin');
		w4.addStuff('potionHeal');

		ROS.dungeon.putHeroesIntoDungeon(w1,w2,w3,w4);

		w1 = null;
		w2 = null;
		w3 = null;
		w4 = null;
		

	// Eventy myszki i klawiatury	
	document.onmousemove = ROS.mouse.position;
	document.onmousedown = ROS.mouse.down;
	document.onmouseup   = ROS.mouse.up;

	document.onkeydown = ROS.keyboard.down;
	document.onkeyup   = ROS.keyboard.up;

	// ROS.base.phaseNext(1); // Startuje pierwszą faze gry

}