// Broń którą walczą wrogowie jest ich częścią, wróg może posiadać jeden typ ataku zasiegowego i jeden typ ataku bliskiego

ROS.npcs = {
	"dummy": {
		"name":"Manekin",
		"npcRace":"r1", // rasa
		"npcClass":"c1",
		"gfx": {
			"walk": 'gfx/npc/dummy/walk.png',			
			"image":'gfx/blank.gif',
			"dead": 'gfx/npc/dummy/dead.png'
		},

		"deadContainer":"deadDummy", // po zabiciu w jego miejscu pojawia się kontener

		"sfx": {
			"def": "", 
			"wet": "",
			"hot": "",
			"pain": "",
			"hit": "",
			"die": ""
		},
		
		"friends": [],

		"desc":"Brak",
		"size":2, // rozmiar potwora od 0 - malutki do 4 - ogromny		
		"glue":0, // przyklejanie graczy podczas próby ominięcią wroga	
		"fly":false, // postac lata - nie działają na nią płyny, dziury itp	
		"nonMagicResist":false, // odpornosc na bron niemagiczną
		"exp":10, // doświadczenie jakie zdobędzie gracz który go zabije
		"hurtAnim":"blood", // nieobowiązkowe
		"dieAnim":"blood", // nieobowiązkowe
			
		"attacksType": [],
		
		"stats": {
			"sight":0,
			"movement":0, // ruch
			"attacks":0,
			"life":10,
			"defense_skill":1, // nie moze byc równy zero
			"strength":0,
			"toughness":4,			
			"armour":10,						
			"initiative":0
		}		
	},
	
	"spider": {
		"name":"Pająk",
		"npcRace":"r2", // rasa
		"npcClass":"c2",
		"gfx": {
			"walk": 'gfx/npc/spider/walk.png',
			"image":'gfx/npc/spider/spider.jpg',
			"dead": 'gfx/npc/spider/dead.png'
		},

		"deadContainer":"deadSpider",

		"sfx": {
			"def": "", // dźwięk kroków wroga
			"wet": "footstep_water",
			"hot": "footstep_lava",
			"pain":"", // ryk bólu wroga
			"hit": "splash", // dżwięk wydawany w chwili uderzenia we wroga
			"die": "splash" // dźwięk w chwili śmierci wroga
		},
		
		"friends": [],

		"desc":"Przepotworny paskudny pająk :P",
		"size":0, // rozmiar potwora od 0 - malutki do 4 - ogromny		
		"glue":1, // przyklejanie graczy podczas próby ominięcią wroga
		"fly":false,	
		"nonMagicResist":false, // odpornosc na bron niemgiczną	
		"exp":25,
		"hurtAnim":"blood", // nieobowiązkowe
		"dieAnim":"blood", // nieobowiązkowe

		// uwaga: atak który minimalny zasięg równy ma 1 - zawsze uznawany jest za bliski przez co doliczana jest do niego sila wroga !
		// przyklad atak o zasięgu 1-5 - moze byc zadany z odleglosci nawet 5 pol a mimo to bedzie uznawany za bliski !
		"attacksType": [
			{
				"name":"Ukąszenie",
				"weapon_skill":30,
				"range_min":1,
				"range_max":1,
				"strength":"1d8+4",	
				"magic": false, // czy atak jest magiczny		
				"attack_anim":"swing",			
				"sfx":"spider_attack1,spider_attack2"
			}, 
			{
				"name":"Splunięcie jadem",
				"weapon_skill":20,
				"range_min":2,
				"range_max":2,
				"strength":"1d10",	
				"magic": false, // czy atak jest magiczny			
				"attack_anim":"swing",
				"attack_anim_move": 1, // czy animacja ma sie przesuwac w kierunku celu
				"sfx":"spider_attack1,spider_attack2"
			}		
		],		
		
		"stats": {
			"sight": 4, // zasięg wzroku pająka
			"movement": 3,
			"attacks": 1,
			"life": 10,
			"defense_skill": 15,
			"strength": 25,
			"toughness": 5,
			"armour": 0,			
			"initiative": 30	
		}		
	},


	"blackwidow": {
		"name":'Czarna Wdowa',
		"npcRace":"r2", // rasa
		"npcClass":"c2",
		"gfx": {
			"walk": "gfx/npc/blackwidow/walk.png",			
			"image":"gfx/npc/blackwidow/blackwidow.jpg",
			"dead": 'gfx/npc/blackwidow/dead.png'
		},

		"deadContainer":"deadBlackwidow",

		"sfx": {
			"def": "", // dźwięk kroków wroga
			"wet": "footstep_water",
			"hot": "footstep_lava",
			"pain":"", // ryk bólu wroga
			"hit": "splash", // dżwięk wydawany w chwili uderzenia we wroga
			"die": "splash" // dźwięk w chwili śmierci wroga
		},
		
		"friends": [],

		"desc":"Brak",
		"size":1, // rozmiar potwora od 0 - malutki do 4 - ogromny
		"glue":1, // przyklejanie graczy podczas próby ominięcią wroga	
		"fly":false,
		"nonMagicResist":false, // odpornosc na bron niemgiczną	
		"exp":35,
		"hurtAnim":"blood",	
		"dieAnim":"blood",
		
		"attacksType": [
			{
				"name":"Ukąszenie",
				"weapon_skill":35,
				"range_min":1,
				"range_max":1,
				"strength":"1d8+5",	
				"magic": false, // czy atak jest magiczny			
				"attack_anim":"swing",
				"sfx":"spider_attack1,spider_attack2"
			}, 
			{
				"name":"Oślepiające ukąszenie",
				"weapon_skill":30,
				"range_min":1,
				"range_max":1,
				"strength":"1d8+2",
				"magic": true, // czy atak jest magiczny	
				"specialEffects": {					
					"duration":3, // długosc działania efektu - liczac od tury wroga 
					"sight":"-|1"
				},
				"desc":"Oślepia na 3 tury.",
				"attack_anim":"swing",
				"sfx":"spider_attack1,spider_attack2"
			}, 
			{
				"name":"Jad",
				"weapon_skill":25,
				"range_min":2,
				"range_max":2,
				"strength":"1d8+2",						
				"attack_anim":"swing",
				"attack_anim_move": 1, // czy animacja ma sie przesuwac w kierunku celu
				"sfx":"spider_attack1,spider_attack2"
			}
		],
		
		"stats": {
			"sight": 5,
			"movement": 4, 
			"attacks": 2,
			"life": 20,
			"defense_skill": 15,	
			"strength": 35,
			"toughness": 8,
			"armour": 5,			
			"initiative": 50	
		}
	},


	"ghost": {
		"name":"Duch",
		"npcRace":"r3", // rasa
		"npcClass":"c2",
		"gfx": {
			"walk": 'gfx/npc/ghost/walk.png',
			"image":'gfx/npc/ghost/ghost.jpg',
			"dead": 'gfx/npc/ghost/dead.png'
		},

		"deadContainer":"deadGhost",

		"sfx": {
			"def": "", // dźwięk kroków wroga
			"wet": "",
			"hot": "",
			"pain":"", // ryk bólu wroga
			"hit": "splash", // dżwięk wydawany w chwili uderzenia we wroga
			"die": "splash" // dźwięk w chwili śmierci wroga
		},
		
		"friends": [],

		"desc":"Mrożący krew w żyłach duch.",
		"size":2, // rozmiar potwora od 0 - malutki do 4 - ogromny		
		"glue":0, // przyklejanie graczy podczas próby ominięcią wroga	
		"fly":true,	
		"nonMagicResist":true, // odpornosc na bron niemgiczną
		"exp":25,
		"hurtAnim":"blood", // nieobowiązkowe
		"dieAnim":"blood", // nieobowiązkowe

		// uwaga: atak który minimalny zasięg równy ma 1 - zawsze uznawany jest za bliski przez co doliczana jest do niego sila wroga !
		// przyklad atak o zasięgu 1-5 - moze byc zadany z odleglosci nawet 5 pol a mimo to bedzie uznawany za bliski !
		"attacksType": [
			{
				"name":"Lodowy dotyk",
				"weapon_skill":30,
				"range_min":1,
				"range_max":2,
				"strength":"1d8+4",	
				"magic": true, // czy atak jest magiczny			
				"attack_anim":"swing",
				"attack_anim_move": 1, // czy animacja ma sie przesuwac w kierunku celu		
				"sfx":"spider_attack1,spider_attack2"
			}		
		],		
		
		"stats": {
			"sight": 8, // zasięg wzroku pająka
			"movement": 4,
			"attacks": 1,
			"life": 10,
			"defense_skill": 15,
			"strength": 25,
			"toughness": 5,
			"armour": 0,			
			"initiative": 50	
		}		
	}
};







// Klasa tworząca wrogie jednostki
ROS.Npc = (function() {

	return function(type) {
		
		var self = this;
		var x,y;
		var npc = ROS.tools.clone(ROS.npcs[type]);
		var nextStepX = 0;
		var nextStepY = 0;
		var nextStepXpx = 0;
		var nextStepYpx = 0;
		var path = [];
		var step = 0;
		var rotate = 0;
		var actualrotate = 0;
		var onFinishMove = null;

		this.uniqid = type+'#'+ROS.tools.dice(100000);

		// Do tablicy npcs wpisuje referencje
		ROS.base.npcs[this.uniqid] = this;

		
		
		this.gfx = npc.gfx;
		this.sfx = npc.sfx;
		this.attacksType = npc.attacksType;

		this.hurtAnim = npc.hurtAnim;
		this.dieAnim  = npc.dieAnim;
		this.deadContainer = npc.deadContainer;

		this.npcRace  = npc.npcRace; // rasa
		this.npcClass = npc.npcClass; // klasa
		this.npcRaceName  = ROS.base.npcRaces[npc.npcRace];
		this.npcClassName = ROS.base.npcClasses[npc.npcClass];

		this.exp  = npc.exp;	
		this.fly  = npc.fly;  // czy nps lata
		this.desc = npc.desc; // opis
		this.glue = npc.glue; // przyklejanie postaci graczy do wroga w chwili stanięcia na polu sasiadującym
		this.glueActual = npc.glue; // stan aktualny przyklejania 
		this.nonMagicResist = npc.nonMagicResist;
		

		this.tilex = 0;
		this.tiley = 0;
		this.left = 0;
		this.top = 0;
		this.width = 48;
		this.height = 48;
		this.angle = 0;
		this.moveFlag = false;


		this.gridVisible = [];	// LOS
		
		// Zmienna wykorzystywana w facie Npc. Każdy kto wykona swoją ture jest oznakowany
		this.doneHisTurn = false;
			
		this.knownTargets = {}; // obiekt na cele ktore widzi, widzial, zna :)

		// Statystyki bazowe dla cech
		// Ulegają zmianie tylko w przypadku awansu na wyższy poziom
		// Przechowują stany naturalne cech, czyli bez wpływu zewnętznych czynników
		// Wykorzystywane w celu odtworzenia stanu orginalnego cechy np: po uleczeniu
		this.solidStats = ROS.tools.clone(npc.stats);

		// Kopia statystyk bazowych
		// Te statystyki zmieniają się w zależnosci od wpływu zewnetrznych czynników np: eliksir siły może zwiększych czasowo siłe
		this.cloneStats = ROS.tools.clone(npc.stats);

		// Tworzy dodatkowe pola na charakterystyki które się wyczerpują,
		// przechowuja aktualny stan danej cechy. Na początku ustalane są na maksymalne wartości.
		this.actualStats = {
			"life": npc.stats.life,
			"movement": npc.stats.movement,			
			"attacks": npc.stats.attacks
		};


		// Tworze graficzną interpretacje postaci wroga
		var o = document.createElement("img");	
		o.src = 'gfx/blank.gif';	
		o.style.width = this.width+'px';
		o.style.height = this.height+'px';
		o.style.position = 'absolute';
		o.style.zIndex = 17;
		o.style.left = this.left+'px';
		o.style.top = this.top+'px';	
		o.style.backgroundImage = 'url('+this.gfx['walk']+')';
		o.style.display = 'none';
		
		ROS.tools.addEvent(o,'mousedown',function(e) {
			ROS.mouse.down(e); // Pobranie numeru naciśnietego przycisku
			if (!ROS.infoScroll.active && self.moveFlag === false) {					
				switch(ROS.mouse.buttonDown) {                		
					case 3:	
						ROS.fly.hide();
						ROS.Sound.play('bookopen');
						self.sheet.center();
						self.refreshStats();
						self.sheet.show();
					break;
				}
			}	
		});
		ROS.tools.addEvent(o,'mouseover',function() {
			
			// WAŻNA linijka - jesli najedziemy na cel podczas wyboru opcji z menu podrecznego to nie wywoluje dymka
			// automatycznie onTarget tez nie jest wywolywany zeby nie zmodyfikowac danych ustawionych przez checkAttack
			if (ROS.flyMenu.active) return;
			
			if (!ROS.base.activePlayer.unconscious &&
		    	ROS.playerPath.activePlayerMoveFlag === 0 &&
				ROS.playerFight.attackFlag === 0 &&
				!ROS.map.moving) {
				
				var info = '<b>'+self.getName()+'</b><br />';
				info += ROS.playerFight.onTarget(self);

				ROS.fly.show(info,1,300);

				/*
				// pokazuje zasieg wzroku jednostki wroga				
				var x,y;
				self.refreshLOS();
				for(y=0; y<ROS.base.gameSize[1]; y++) {			
					for(x=0; x<ROS.base.gameSize[0]; x++) {
						if (self.gridVisible[y][x] === 1) {
							if (ROS.base.preloadImages['map'+x+'-'+y]) {
								ROS.base.preloadImages['map'+x+'-'+y].style.border = '1px solid lime';
							}
						}
					}
				}
				*/

				
			}	
		});
		ROS.tools.addEvent(o,'mouseout',function() {
			ROS.fly.hide();

			/* 
			// Usuwa zasięg wzroku jednostki wroga
			var x,y;
			for(y=0; y<ROS.base.gameSize[1]; y++) {			
				for(x=0; x<ROS.base.gameSize[0]; x++) {
					if (self.gridVisible[y][x] === 1) {
						if (ROS.base.preloadImages['map'+x+'-'+y]) {
							ROS.base.preloadImages['map'+x+'-'+y].style.border = 'none';
						}
					}
				}
			}
			*/

		});

		ROS.map.area.appendChild(o);		
		this.obj = o;
		
		o = null;

		// KARTA NPC
		// Tworzy karte npc
		var sheetWidth = 452;
		var sheetHeight = 352;
		this.sheet = new ROS.Palette(sheetWidth,sheetHeight,npc.name+' ('+this.npcRaceName+' - '+this.npcClassName+')');


		// ======= KONIEC KONSTRUKTORA ============


		this.setStartPosition = function(x,y)  {
			ROS.dungeon.gridNpcs[y][x] = this;

			// Zmienne położeniowe
			this.left = x*ROS.base.tileWidth;
			this.top = y*ROS.base.tileHeight;
			this.tilex = x;
			this.tiley = y;
			this.obj.style.left = this.left + 'px';
			this.obj.style.top = this.top + 'px';
		};

		// Przesuwa gracza relatywnie do swojej pozycji o cały segment
		this.moveRel = function(x,y) {
			this.left += x;
			this.top += y;
			this.obj.style.left = this.left + 'px';
			this.obj.style.top = this.top + 'px';
		};

		// Przesuwa gracza na pole x,y
		this.moveAbs = function(x, y) {
			this.left = x;
			this.top = y;
			this.tilex = Math.floor(this.left / ROS.base.tileWidth);
			this.tiley = Math.floor(this.top / ROS.base.tileHeight);
			this.obj.style.left = this.left + 'px';
			this.obj.style.top = this.top + 'px';
		};

		// RUCH gracza
		// Metoda ustala sciezke i startuje ruch
		this.moveStart = function(args) {
			step = 0;
			path = args.path;
			onFinishMove = args.onfinish;
			this.moveFlag = true;
			ROS.dungeon.setAccessTable();
			this.move();
		};

		this.moveStop = function() {
			ROS.dungeon.setAccessTable();
			step = 0;			
			this.moveFlag = false;
			if (onFinishMove) onFinishMove();
			onFinishMove = null;
		};

		this.move = function() {
			if (step == path.length) {
				// finish doszedłem do końca ścieżki
				this.moveStop();
				return;
			}



			nextStepX = path[step][0];
			nextStepY = path[step][1];

			//ROS.tools.console('log','Następny krok: '+nextStepX+'/'+nextStepY+' | Aktualna pozycja: '+this.tilex+'/'+this.tiley+' | Aktualny kierunek: '+actualrotate);

			nextStepXpx = nextStepX * ROS.base.tileWidth;
			nextStepYpx = nextStepY * ROS.base.tileHeight;

			var enX = parseInt(this.tilex,10);
			var enY = parseInt(this.tiley,10);
			var toX = parseInt(nextStepX,10);
			var toY = parseInt(nextStepY,10);

			// Określa kierunek postaci
			// Kąt obliczany jest zgodnie z ruchem wskazówek zegara (0 stopni = E)
			if      (toX == (enX-1) && toY == enY)     {rotate = 180;} // W
			else if (toX == (enX+1) && toY == enY)     {rotate = 0;}   // E
			else if (toX == enX     && toY == (enY-1)) {rotate = 270;} // N
			else if (toX == enX     && toY == (enY+1)) {rotate = 90;}  // S
			else if (toX == (enX-1) && toY == (enY-1)) {rotate = 225;} // NW
			else if (toX == (enX+1) && toY == (enY-1)) {rotate = 315;} // NE
			else if (toX == (enX+1) && toY == (enY+1)) {rotate = 45;}  // SE
			else if (toX == (enX-1) && toY == (enY+1)) {rotate = 135;} // SW
			
			this.actualStats.movement -= 1; // obniżam punkt ruchu (odbywa się po każdym "Kroku" gracza)

			// ROS.tools.console('log','nowy start:'+actualrotate+'|'+rotate);

			// Jesli przechodzi pomiedzy polami których nie widac to robi to błyskawicznie
			// Równiez obrót nie jest animowany tylko natychmiast obraca grafike na docelowy kierunek
			if (ROS.dungeon.gridVisible[enY][enX] == 0 && ROS.dungeon.gridVisible[toY][toX] == 0) {
				if (actualrotate === rotate) {
					this.go(48);
				} else {
					actualrotate = rotate;
					ROS.tools.rotate(this.obj,actualrotate);
					this.angle = actualrotate;
					this.go(48);
				}				
			} else {
				if (actualrotate === rotate) {
					this.go();
				} else {
					this.turn(rotate,this.go);	
				}
			}

		};

		// Metoda obraca npc przodem w nowym kierunku (płynnie)
		this.turn = function(r,onFinish) {
			//var self = this;
			var cw,ccw;
			var finalAngle = r;
			var angleAccuracy = 8; // stopni

			if (actualrotate > r) {
				cw = (360-actualrotate) + r;
				ccw = actualrotate-r;
			} else {
				cw = r-actualrotate;
				ccw = (360-r) + actualrotate;
			}

			if (cw > ccw) {
				// w lewo				
				if (ccw >= actualrotate && r != 0) {
					// to znaczy ze bedzie przejscie przez punkt zero
					// dlatego powiekszam skale poniżej 360 stopni aby uniknąć konieczności przechodzenia przez punk zerowy zwrotny 0=360					
					// zero jest specyficznym wyjątkiem :) jest ok
					finalAngle = -(360-r);
				}

				if (finalAngle <= actualrotate-angleAccuracy) {
					actualrotate -= angleAccuracy;
				} else {
					// jesli docelowy kąt jest mniejszy niż krok stopni obrotu (15 stopni) to ustalam ze kolejny jest juz docelowym
					actualrotate = finalAngle;
				}				
			} else {
				// w prawo
				if (cw <= actualrotate) {
					// to znaczy ze bedzie przejscie przez punkt zero
					// dlatego powiekszam skale powyzej 360 stopni aby uniknąć konieczności przechodzenia przez punk zwrotny 360=0
					finalAngle = 360+r;
				}
				
				if (finalAngle >= actualrotate+angleAccuracy) {
					actualrotate += angleAccuracy;
				} else {
					actualrotate = finalAngle;
				}				
			}
			
			//ROS.tools.console('log',cw+'/'+ccw+'/'+actualrotate+'/'+r+'/'+finalAngle);
			ROS.tools.rotate(this.obj,actualrotate);

			if (actualrotate !== finalAngle) {
				//ROS.tools.console('log','Obraca się: '+this.uniqid+' | '+self);				
				setTimeout(function() { self.turn(r,onFinish); },15);
			} else {
				// przywracam prawidowy kąt, aby mieścil sie w przedziale 0-359 stopni
				if (finalAngle >= 360) {
					finalAngle = (finalAngle-360);
				}
				if (finalAngle < 0) {
					finalAngle = (360+finalAngle); // robie plus ale dodaje ujemną wartosc wiec tak jak bym odejnowal
				}
				actualrotate = finalAngle;
				this.angle = actualrotate;
				(onFinish)();				
			}
		};

		// Metoda przesuwa postac.
		// Po dotarciu do kolejnego segmentu ścieżki zatrzymuje się i uruchamia move()
		this.go = function(stepLength) {

			if (stepLength === undefined) {
				stepLength = 2;
			}

			// na podstawie wybranego kierunku przesuwam postać
			switch(this.angle) {				
				case 0:   this.moveRel( stepLength        , 0    ); break;
				case 45:  this.moveRel( stepLength        , stepLength ); break;
				case 90:  this.moveRel( 0                 , stepLength ); break;
				case 135: this.moveRel( (stepLength*(-1)) , stepLength ); break;
				case 180: this.moveRel( (stepLength*(-1)) , 0    ); break;
				case 225: this.moveRel( (stepLength*(-1)) , (stepLength*(-1)) ); break;
				case 270: this.moveRel( 0                 , (stepLength*(-1)) ); break;				
				case 315: this.moveRel( stepLength        , (stepLength*(-1)) ); break;				
			}
			
			

			//ROS.tools.console('log',nextStepXpx+' : '+this.left+' | '+nextStepYpx+' : '+this.top);

			// jak tylko osiągne cel to mam sie zatrzymac
			if (nextStepXpx == this.left && nextStepYpx == this.top) {

				// zapisuje nowe położenie w tablicy 2d
				ROS.dungeon.gridNpcs[nextStepY][nextStepX] = this; // w nowe miejsce wpisuje referencje do obiektu gracza
				ROS.dungeon.gridNpcs[this.tiley][this.tilex] = 0; // w stare miejsce wpisuje 0 usuwając referencje

				this.tilex = nextStepX;
				this.tiley = nextStepY;

				
				// cierpienie po wejsciu na tile'a zadającego obrażenia (chyba ze lata)
				var tiledamage = ROS.dungeon.getSegment("map",ROS.dungeon.tileMap[this.tiley][this.tilex],'danger');
				if (tiledamage > 0 && !this.fly) {

					this.hurt(tiledamage)						
					
					if (this.isDestroy()) {												
						this.moveStop(); // zatrzymuje ruch						
						return; // przerywa zapetlenie metody go();
					}
				}

				// przypisuje poziom widzialności jednostki na taki jaki ma podłoga :) - wyłanianie z cienia
				this.obj.style.display = ROS.base.preloadImages['map'+this.tilex+'-'+this.tiley].style.display;
				this.obj.style.opacity = ROS.base.preloadImages['map'+this.tilex+'-'+this.tiley].style.opacity;

				
			
				step++;
				this.move();
				return;
			}
			
			//ROS.tools.console('log','Ide: '+this.uniqid+' test:'+rotate+' | '+self);
			setTimeout(function() { self.go(stepLength); },15);
		};







		// Zeruje tablice LOS
		this.clearLOS = function() {
			var x,y;
			for(y=0; y<ROS.base.gameSize[1]; y++) {
				this.gridVisible[y] = [];
				for(x=0; x<ROS.base.gameSize[0]; x++) {
					this.gridVisible[y][x] = 0;
				}
			}
		};

		// Oblicza zakres widzenia wroga
		this.refreshLOS = function() {
			
			this.clearLOS();		
			var x,y,a,xd,yd,tx,ty,pi2 = Math.PI * 2, incr = Math.PI / 64;		
			var distance = (this.cloneStats.sight*48); // maksymalny zasięg wzroku w tilesach		
			
			var last_tx = this.tilex; 
			var last_ty = this.tiley;

			for (a = 0; a < pi2; a += incr) {
			
				xd = Math.cos(a) * 24; // polowa tilea
				yd = -Math.sin(a) * 24;
				
				x = this.left + 24; // X - środek pola wroga w px
				y = this.top + 24; // Y - środek pola wroga w px
				
				// Na początku jako poprzednio sprawdzany punkt ustala punkt na którym stoi wróg
				last_tx = this.tilex; 
				last_ty = this.tiley;

				while (true) {				
					// pierwszy obieg zaczyna się od położenia wroga x,y
					tx = Math.floor(x / ROS.base.tileWidth); // określa nad jakim tilem aktualnie jest
					ty = Math.floor(y / ROS.base.tileHeight);				
					
					x += xd;
					y += yd;
					
					// jesli dany tile był juz sprawdzany to przeskocz go (chyba ze to pole na ktorym stoi postać bo ono jest ustawiane jako ostatnio sprawdzane na poczatku)
					if ((last_tx == tx && last_ty == ty) && (tx != this.tilex || ty != this.tiley)) {
						continue;
					}


					// Sprawdza relacje miedzy polami.
					if (ROS.tools.testGridRelationship({x:last_tx,y:last_ty},{x:tx,y:ty},[1,3])) {
						last_tx = tx;
						last_ty = ty;

						// Jesli poprzednie pole wskazuje że nie widać z niego na pole aktualne to przerywa
						break;		
					}

					this.gridVisible[ty][tx] = 1; // tilesy który wróg widzi 
					
					last_tx = tx;
					last_ty = ty;

					if (ROS.dungeon.gridLos[ty][tx] === 1) break; // przerywa po natrafieniu na przeszkode				
					if (x <= (this.left - distance) || x >= (this.left + distance) || y <= (this.top - distance) || y >= (this.top + distance)) break; // przerywa po osiagnieciu odleglosci rownej zasiegowi widzenia
					if (x < 0 || y < 0 || x >= ROS.base.gameSize[0] * 48 || y >= ROS.base.gameSize[1] * 48) break; // przerywa po dojsciu do brzegu mapy			
				}
			}
			
		};





		


		this.refreshStats = function() {			
			var ss = this.solidStats;
			var cs = this.cloneStats;
			var as = this.actualStats;
			
			var kod = '<div style="padding:2px; border:1px solid #716250; position: absolute; left:15px; top:10px; width:200px; height:100px;"><table style="width:200px;">'+
				'<tr>'+
					'<td>Życie:</td>'+
					'<td width="70" align="center"><b>'+as.life+' / '+(cs.life != ss.life ? '<span style="color:#ea0005;">'+cs.life+'</span>' : cs.life)+'</b></td>'+
					'<td width="35" align="right">'+ss.life+'</td>'+
				'</tr>'+
				'<tr>'+
					'<td>Ruch:</td>'+
					'<td align="center"><b>'+as.movement+' / '+(cs.movement != ss.movement ? '<span style="color:#ea0005;">'+cs.movement+'</span>' : cs.movement)+'</b></td>'+
					'<td align="right">'+ss.movement+'</td>'+
				'</tr>'+
				'<tr>'+	
					'<td>Ataki:</td>'+
					'<td align="center"><b>'+as.attacks+' / '+(cs.attacks != ss.attacks ? '<span style="color:#ea0005;">'+cs.attacks+'</span>' : cs.attacks)+'</b></td>'+
					'<td align="right">'+ss.attacks+'</td>'+
				'</tr>'+
				'<tr>'+	
					'<td>Latanie:</td>'+
					'<td colspan="2" align="center">'+(this.fly ? 'Tak' : 'Nie')+'</td>'+
				'</tr>'+
				'</table></div>'+

				'<div style="padding:2px; border:1px solid #716250; position: absolute; left:15px; top:126px; width:200px; height:140px;"><table style="width:200px;">'+
				'<tr>'+
					'<td>Obrona:</td>'+
					'<td width="35" align="right"><b>'+(cs.defense_skill != ss.defense_skill ? '<span style="color:#ea0005;">'+cs.defense_skill+'</span>' : cs.defense_skill)+'</b></td>'+
					'<td width="35" align="right">'+ss.defense_skill+'</td>'+
				'</tr>'+
				'<tr>'+
					'<td>Siła:</td>'+
					'<td align="right"><b>'+(cs.strength != ss.strength ? '<span style="color:#ea0005;">'+cs.strength+'</span>' : cs.strength)+'</b></td>'+
					'<td align="right">'+ss.strength+'</td>'+
				'</tr>'+
				'<tr>'+
					'<td>Wytrzymałość:</td>'+
					'<td align="right"><b>'+(cs.toughness != ss.toughness ? '<span style="color:#ea0005;">'+cs.toughness+'</span>' : cs.toughness)+'+'+cs.armour+'</b></td>'+
					'<td align="right">'+ss.toughness+'</td>'+
				'</tr>'+
				'<tr>'+	
					'<td>Inicjatywa:</td>'+
					'<td align="right"><b>'+(cs.initiative != ss.initiative ? '<span style="color:#ea0005;">'+cs.initiative+'</span>' : cs.initiative)+'</b></td>'+
					'<td align="right">'+ss.initiative+'</td>'+
				'</tr>'+
				'<tr>'+	
					'<td>Mod za rozmiar:</td>'+				
					'<td colspan="2" align="right">'+ROS.base.distanceSizeMod[this.getSize()]+'</td>'+
				'</tr>'+			
				'<tr>'+	
					'<td>Doświadczenie:</td>'+				
					'<td colspan="2" align="right">'+this.exp+' pkt.</td>'+
				'</tr>'+				
				'</table></div>';
				
			var kod2 = '<div style="padding:2px; border:1px solid #716250; position: absolute; left:231px; top:10px; width:200px; height:260px;"><table style="width:200px;">';
			
			if (this.attacksType.length > 0) {
				for (var x=0; x<this.attacksType.length; x++) {
					var a = this.attacksType[x];
					kod2 += '<tr><td colspan="3"><b>'+a.name+'</b></td></tr>'+
					'<tr><td>&nbsp;&nbsp;Siła ataku:</td><td align="right"><b>'+a.strength+'</b></td></tr>'+
					'<tr><td>&nbsp;&nbsp;Władanie:</td><td align="right"><b>'+a.weapon_skill+'%</b></td></tr>'+
					'<tr><td>&nbsp;&nbsp;Zasięg (min-max):</td><td align="right"><b>'+a.range_min+' - '+a.range_max+'</b></td></tr>';
					if (a.desc !== undefined) kod2 += '<tr><td colspan="2">'+a.desc+'</td></tr>';
				}	
			} else {
				kod2 += '<tr><td colspan="3"><b>Brak ataków</b></td></tr>';
			}
			
			kod2 += '</table></div>';
			
			var secretCode = '<div style="position:absolute; right:10px; bottom:10px; font-size:8px; color:black;">'+this.uniqid+'</div>';

			this.sheet.insertHTML(kod+kod2+secretCode);
			
			kod = null;
			kod2 = null;

		};





		// Metoda odgrywa losowy dźwięk z podanej kategorii
		this.playsound = function(snd_category) {
			var sound = this.sfx[snd_category];		
			if (sound != '') {
				var fs = sound.split(',');			
				if (fs.length > 1) ROS.Sound.play(fs[(ROS.tools.dice(fs.length)-1)]);
				else ROS.Sound.play(fs[0]);
			}
		};
		
		// Metoda uruchamiana w chwili gdy wróg zostanie trafiony
		this.hurt = function(wounds) {			
			
			if (wounds > 0) {
				this.actualStats.life -= wounds;			
			}

			this.playsound('hit');

			// Animacja jest odtwarzana tylko jesli potwor znajduje sie w zasiegu wzroku
			if (ROS.dungeon.gridVisible[this.tiley][this.tilex] > 0) {
				var anim = new ROS.Animation(this.hurtAnim);
				anim.moveAbs(this.left,this.top);
				anim.ignite({
					repetitions:1,
					speed:100,					
					zindex:18
				});			
			
				// animacja wartości zadanych obrażeń
				var woundsAnim = new ROS.Animation('wounds');
				var aPozx = (this.left+(this.width/2))-(woundsAnim.width/2);
				var aPozy = (this.top+(this.height/2))-(woundsAnim.height/2);
				woundsAnim.moveAbs(aPozx,aPozy);
				woundsAnim.innerObj.innerHTML = '<span style="color:#f22; background:#300; border-radius:2px; font-size:18px; font-weight:bold; opacity:0.7;">-'+wounds+'</span>';
				woundsAnim.igniteMove({
					"repetitions": 30,
					"transform": {
	                     "mode": 1, // jesli 1 to modyfikuje dla całej długosci animacji jesli 0 to dotyczy jednego powtorzenia
	                     "start": {                     
	                        "scale": 0.8,
	                        "opacity": 1
	                     },
	                     "end": {                     
	                        "scale": 1.5,
	                        "opacity": 0                  
	                     }
	                },
	                
					"start_x": aPozx,
					"start_y": aPozy,
					"stop_x": aPozx,
					"stop_y": self.top-50,
					"zindex": 100,
					"speed": 70					
				});	
			}
			
			// sprawdzamy czy obrazenia zadane przez atak spowodowaly śmierć
			if (this.actualStats.life <= 0) {
				this.die(wounds); // CEL GINIE (jesli gracz to nieprzytomny)
				return;
			}

			this.refreshStats();
		};
		
		this.heal = function(healPoints) {
			this.actualStats.life += healPoints;

			// actualStats nie mogą być nigdy wyższe niż cloneStats,
			if (this.actualStats.life > this.cloneStats.life) {
				this.actualStats.life = this.cloneStats.life				
			}

			
			// Animacja jest odtwarzana tylko jesli potwor znajduje sie w zasiegu wzroku
			if (ROS.dungeon.gridVisible[this.tiley][this.tilex] > 0) {

				// animacja wartości odzyskanych punktów życia
				var woundsAnim = new ROS.Animation('wounds');
				// pozycja x jest losowana od 1 do 48 aby kilka animacji nie zlewało sie ze sobą
				var aPozx = (this.left+(this.width/2))-(woundsAnim.width/2);
				var aPozy = (this.top+(this.height/2))-(woundsAnim.height/2);
				woundsAnim.moveAbs(aPozx,aPozy);
				woundsAnim.innerObj.innerHTML = '<span style="color:#2f2; background:#030; border-radius:2px; font-size:18px; font-weight:bold; opacity:0.7;">+'+healPoints+'</span>';
				woundsAnim.igniteMove({
					"repetitions": 30,
					"transform": {
	                     "mode": 1, // jesli 1 to modyfikuje dla całej długosci animacji jesli 0 to dotyczy jednego powtorzenia
	                     "start": {                     
	                        "scale": 0.8,
	                        "opacity": 1
	                     },
	                     "end": {                     
	                        "scale": 1.5,
	                        "opacity": 0                  
	                     }
	                },

					"start_x": aPozx,
					"start_y": aPozy,
					"stop_x": aPozx,
					"stop_y": self.top-50,
					"zindex": 100,
					"speed": 70				
				});	
			}

			this.refreshStats();			
		};


		// Metoda uruchamiana w chwili gdy wróg zostanie trafiony
		this.die = function(wounds) {
			this.playsound('die');
			
			this.actualStats.life = 0; // informacja dla wszystkich referencji do obiektu tego wroga że już jest martwy
			// jeśli celem jest potwór (walka miedzy dwoma potworami) i atakujący potwór ma 2 ataki to wyobraźmy sobie taką sytuacje: 
			// pierwszym atakiem potwór zabija cel - obrazek (img) wroga zostaje sciagniety z warstwy gry, ale referencja do celu pozostaje w zmienej enemyTarget 
			// wykonywany jest test sprawdzajacy ile cel ma zycia przed wykonaniem drugiego ataku. 
			// Jeśli po pierwszym ataku cel choć został ściagnięty jego obrazek miałby zycia ponad 0 to wykonany by zostal drugi atak w pustke, ktory ponownie zadal by smiertelny cios tyle ze obrazka celu juz by nie bylo i wyskoczyl by error :)			
			
			ROS.fly.hide();

			this.sheet.destroy();
			this.sheet = null;
		
			ROS.map.area.removeChild(this.obj);
			this.obj = null;
			
			// ZAMIANA W KONTENER
			// W miejscu śmierci NPC wstawia kontenerek ciała do przeszukania
			// Sprawdza czy w tym miejscu nie znajduje sie juz inny kontener
			if (ROS.dungeon.gridContainers[this.tiley][this.tilex] instanceof ROS.Container) {
				// Jeśli NPC stoi na kontenerze to szuka najbliższego wolnego pola bez kontenera
				// Sprawdza pola przyległe
				var x,y;
				var newCandidates = [];
				for(y = this.tiley-1; y <= this.tiley+1; y++) {
					if (y < 0 || y >= ROS.base.gameSize[1]) continue; // przeskakuje obieg dla kolumn bedących poza obszarem gry
					for(x = this.tilex-1; x <= this.tilex+1; x++) {
						if (x < 0 || x >= ROS.base.gameSize[0]) continue; // przeskakuje obieg dla rzędów bedących poza obszarem gry
						
						// jesli na polu nie ma kontenera
						// jesli pole jest wnetrzem pomieszczenia
						// jesli na polu nie ma czegos
						if (ROS.dungeon.gridContainers[y][x] === 0 &&
							ROS.dungeon.tileMap[y][x] &&
							!ROS.dungeon.tileStuff[y][x]) {
								newCandidates.push({'tx':x,'ty':y});
						}
					}	
				}

				// Jesli są kandydaci to losuje jednego
				// Jeśli nie ma kandydatów to nie pojawia się kontener - bardzo żadka możliwość
				if (newCandidates.length > 0) {
					var cp = newCandidates[(ROS.tools.dice(newCandidates.length)-1)];
					ROS.dungeon.gridContainers[cp.ty][cp.tx] = new ROS.Container(this.deadContainer,cp.tx,cp.ty);
					// Wypełnia przedmiotami o losowej rzadkości występowania
					ROS.dungeon.gridContainers[cp.ty][cp.tx].addItems(ROS.tools.dice(20));
					ROS.tools.rotate(ROS.dungeon.gridContainers[cp.ty][cp.tx].obj,actualrotate);	
				}

				
			} else {
				ROS.dungeon.gridContainers[this.tiley][this.tilex] = new ROS.Container(this.deadContainer,this.tilex,this.tiley);
				// Wypełnia przedmiotami o losowej rzadkości występowania
				ROS.dungeon.gridContainers[this.tiley][this.tilex].addItems(ROS.tools.dice(20));
				ROS.tools.rotate(ROS.dungeon.gridContainers[this.tiley][this.tilex].obj,actualrotate);				
			}
			
			
			
			ROS.dungeon.gridNpcs[this.tiley][this.tilex] = 0; // usuwam referencje do obiektu potworka z tablicy gridNpcs
			delete ROS.base.npcs[this.uniqid]; // usuwa z tablicy jednostek npc

			ROS.dungeon.createLos(true); // odswiezam zasiegi widzenia aby nowo dodane kontenery mialy prawidłowe opacity			

			ROS.dungeon.setAccessTable(); // odswiezam informacje o zajętości pola - teraz pole zajete przez tego wroga jest puste				
		};


		this.getName = function() {
			return npc.name;
		};
		this.getSize = function() {
			return npc.size;
		};
		this.getToughness = function() {
			return this.cloneStats.toughness;
		};
		this.getArmour = function() {
			return this.cloneStats.armour;
		};
		this.isDestroy = function() {
			if (this.actualStats.life <= 0)	{
				return true;
			}
			return false;
		};

		// czyści tablice LOS podczas tworzenia obiektu NPC
		this.clearLOS();

	};
	
})();