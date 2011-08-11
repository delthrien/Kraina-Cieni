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

ROS.heroes = {
	"dwarf": {
		"heroClass":"c1", // klasa postaci
		"heroRace":"r1", // rasa
		"level":1,
		"levelTable": [
			// damage, wounds, attacks
			['1d2'   ,'+|2','+|0'],
			['1d3'   ,'+|2','+|0'],
			['1d4'   ,'+|2','+|0'],
			['1d5'   ,'+|2','+|1'],
			['1d6'   ,'+|3','+|0'],
			['2d3'   ,'+|2','+|0'],
			['1d6+1' ,'+|2','+|0'],
			['2d4'   ,'+|2','+|0'],
			['1d8+1' ,'+|2','+|0'],
			['2d5'   ,'+|4','+|0'],
			['1d8+2' ,'+|2','+|1'],
			['2d5+1' ,'+|2','+|0'],
			['1d10+2','+|2','+|0'],
			['2d6+1' ,'+|2','+|0'],
			['1d12+2','+|3','+|0'],
			['1d11+3','+|2','+|0'],
			['1d12+3','+|2','+|0'],
			['2d7+2' ,'+|2','+|0'],
			['1d14+3','+|2','+|0'],
			['2d8+2' ,'+|4','+|0'],
			['1d14+4','+|2','+|1'],
			['2d8+3' ,'+|2','+|0'],
			['1d16+4','+|2','+|0'],
			['2d9+3' ,'+|2','+|0'],
			['1d18+4','+|3','+|0'],
			['1d18+4','+|2','+|0'],
			['1d18+4','+|2','+|0'],
			['1d18+4','+|2','+|0'],
			['1d18+4','+|2','+|0'],
			['1d18+4','+|4','+|0']
		],
		"gfx": {
			"walk": 'gfx/warriors/dwarf/walk.png',
			"image":'gfx/warriors/dwarf/krasnolud.jpg', //  Grafika do charakterystyk
			"icon": 'gfx/warriors/dwarf/krasnoludiconbig.jpg' //  Grafika do listy
		},
		"sfx": {
			"def": 'footstep1,footstep2',
			"wet": 'footstep_water',
			"hot": 'footstep_lava',
			"pain":'scream1,scream2',
			"hit": 'hero_bleed1,hero_bleed2,hero_bleed3'
		},

		"stats": {
			"sight":5,
			"movement":10,
			"attacks":2,
			"life":35,
			"weapon_skill":40,
			"defense_skill":40,
			"ballistic_skill":25,
			"strength":40,
			"toughness":30,
			"mana":2
		},

		"hurtAnim":'blood',
		"dieAnim":'blood'
	},

	"barbarian": {
		"heroClass":"c1", // klasa postaci
		"heroRace":"r2", // rasa
		"level":1,
		"levelTable": [
			['1d2'   ,'+|1','+|0'],
			['1d3'   ,'+|1','+|0'],
			['1d4'   ,'+|1','+|0'],
			['1d5'   ,'+|2','+|0'],
			['1d6'   ,'+|2','+|1'],
			['2d3'   ,'+|5','+|0'],
			['1d6+1' ,'+|1','+|0'],
			['2d4'   ,'+|1','+|0'],
			['1d8+1' ,'+|1','+|0'],
			['2d5'   ,'+|2','+|0'],
			['1d8+2' ,'+|2','+|1'],
			['2d5+1' ,'+|5','+|0'],
			['1d10+2','+|1','+|0'],
			['2d6+1' ,'+|1','+|0'],
			['1d12+2','+|1','+|0'],
			['1d11+3','+|2','+|0'],
			['1d12+3','+|2','+|0'],
			['2d7+2' ,'+|5','+|0'],
			['1d14+3','+|1','+|0'],
			['2d8+2' ,'+|1','+|1'],
			['1d14+4','+|1','+|0'],
			['2d8+3' ,'+|2','+|0'],
			['1d16+4','+|2','+|0'],
			['2d9+3' ,'+|5','+|0'],
			['1d18+4','+|1','+|0'],
			['2d9+4' ,'+|1','+|0'],
			['1d18+5','+|1','+|0'],
			['2d10+4','+|2','+|0'],
			['1d20+5','+|2','+|0'],
			['2d11+4','+|5','+|0']
		],
		"gfx": {
			"walk": "gfx/warriors/barbarian/walk.png",
			"image":"gfx/warriors/barbarian/barbarzynca.jpg", //  Grafika do charakterystyk
			"icon": "gfx/warriors/barbarian/barbarzyncaiconbig.jpg" //  Grafika do listy
		},
		"sfx": {
			"def": "footstep1,footstep2",
			"wet": "footstep_water",
			"hot": "footstep_lava",
			"pain": "scream1,scream2",
			"hit": "hero_bleed1,hero_bleed2,hero_bleed3"
		},

		"stats": {
			"sight":4,
			"movement":16,
			"attacks":3,
			"life":35,
			"weapon_skill":35,
			"defense_skill":35,
			"ballistic_skill":30,
			"strength":40,
			"toughness":30,
			"mana":20
		},

		"hurtAnim":"blood",
		"dieAnim":"blood"
	},

	"elf": {
		"heroClass":"c2", // klasa postaci
		"heroRace":"r3", // rasa
		"level":1,
		"levelTable": [
			['1d2'   ,'+|1','+|0'],
			['1d3'   ,'+|1','+|0'],
			['1d4'   ,'+|1','+|1'],
			['1d5'   ,'+|2','+|0'],
			['1d6'   ,'+|3','+|0'],
			['2d3'   ,'+|1','+|0'],
			['1d6+1' ,'+|1','+|0'],
			['2d4'   ,'+|1','+|0'],
			['1d8+1' ,'+|2','+|1'],
			['2d5'   ,'+|3','+|0'],
			['1d8+2' ,'+|1','+|0'],
			['2d5+1' ,'+|1','+|0'],
			['1d10+2','+|1','+|0'],
			['2d6+1' ,'+|2','+|0'],
			['1d12+2','+|3','+|0'],
			['1d11+3','+|1','+|0'],
			['1d12+3','+|1','+|1'],
			['2d7+2' ,'+|1','+|0'],
			['1d14+3','+|2','+|0'],
			['2d8+2' ,'+|3','+|0'],
			['2d8+2' ,'+|1','+|0'],
			['2d8+2' ,'+|1','+|0'],
			['2d8+2' ,'+|1','+|0'],
			['2d8+2' ,'+|2','+|0'],
			['2d8+2' ,'+|3','+|0'],
			['2d8+2' ,'+|1','+|0'],
			['2d8+2' ,'+|1','+|0'],
			['2d8+2' ,'+|1','+|0'],
			['2d8+2' ,'+|2','+|0'],
			['2d8+2' ,'+|3','+|0']
		],
		"gfx": {
			"walk": 'gfx/warriors/elf/walk.png',
			"image":'gfx/warriors/elf/elf.png', //  Grafika do charakterystyk
			"icon": 'gfx/warriors/elf/elficonbig.jpg' //  Grafika do listy
		},
		"sfx": {
			"def": "footstep1,footstep2",
			"wet": "footstep_water",
			"hot": "footstep_lava",
			"pain": "scream1,scream2",
			"hit": "hero_bleed1,hero_bleed2,hero_bleed3"
		},

		"stats": {
			"sight":4,
			"movement":20,
			"attacks":2,
			"life":20,
			"weapon_skill":35,
			"defense_skill":30,
			"ballistic_skill":55,
			"strength":30,
			"toughness":30,			
			"mana":16
		},

		"hurtAnim":"blood",
		"dieAnim":"blood"
	},

	"wizard": {
		"heroClass":"c3", // klasa postaci
		"heroRace":"r2", // rasa
		"level":1,
		"levelTable": [
			['1d2'   ,'+|1','+|0'],
			['1d3'   ,'+|1','+|0'],
			['1d4'   ,'+|1','+|0'],
			['1d5'   ,'+|2','+|0'],
			['1d6'   ,'+|3','+|0'],
			['2d3'   ,'+|1','+|0'],
			['1d6+1' ,'+|1','+|0'],
			['2d4'   ,'+|1','+|0'],
			['1d8+1' ,'+|2','+|0'],
			['2d5'   ,'+|3','+|1'],
			['1d8+2' ,'+|1','+|0'],
			['2d5+1' ,'+|1','+|0'],
			['1d10+2','+|1','+|0'],
			['2d6+1' ,'+|2','+|0'],
			['1d12+2','+|3','+|0'],
			['1d12+2','+|1','+|0'],
			['1d12+2','+|1','+|0'],
			['1d12+2','+|1','+|0'],
			['1d12+2','+|2','+|0'],
			['1d12+2','+|3','+|1'],
			['1d12+2','+|1','+|0'],
			['1d12+2','+|1','+|0'],
			['1d12+2','+|1','+|0'],
			['1d12+2','+|2','+|0'],
			['1d12+2','+|3','+|0'],
			['1d12+2','+|1','+|0'],
			['1d12+2','+|1','+|0'],
			['1d12+2','+|1','+|0'],
			['1d12+2','+|2','+|0'],
			['1d12+2','+|3','+|0']
		],
		"gfx": {
			"walk": "gfx/warriors/wizard/walk.png",
			"image":"gfx/warriors/wizard/czarnoksieznik.png", //  Grafika do charakterystyk
			"icon": "gfx/warriors/wizard/czarnoksieznikiconbig.jpg" //  Grafika do listy
		},
		"sfx": {
			"def": "footstep1,footstep2",
			"wet": "footstep_water",
			"hot": "footstep_lava",
			"pain": "scream1,scream2",
			"hit": "hero_bleed1,hero_bleed2,hero_bleed3"
		},

		"stats": {
			"sight":4,
			"movement":11,
			"attacks":1,
			"life":30,
			"weapon_skill":20,
			"defense_skill":20,
			"ballistic_skill":30,
			"strength":20,
			"toughness":30,
			"mana":40
		},

		"hurtAnim":"blood",
		"dieAnim":"blood"
	}
};



// Klasa tworząca postać bohatera
ROS.Hero = (function() {

	return function(type,name) {
		var self = this;
		var h = ROS.heroes[type];
		var x,y;
		
		this.uniqid = type+'#'+ROS.tools.dice(100000); // każda postać musi miec inne ID

		// Do tablicy heroes wpisuje referencje
		ROS.base.heroes[this.uniqid] = this;

		this.heroRace  = h.heroRace; // rasa
		this.heroClass = h.heroClass; // klasa
		this.heroRaceName  = ROS.base.heroRaces[h.heroRace];
		this.heroClassName = ROS.base.heroClasses[h.heroClass];

		this.gfx = ROS.tools.clone(h.gfx);
		this.sfx = ROS.tools.clone(h.sfx);

		this.hurtAnim = h.hurtAnim;
		this.dieAnim = h.dieAnim;

		this.tilex = 0;
		this.tiley = 0;
		this.left = 0;
		this.top = 0;
		this.width = 48;
		this.height = 48;		
		this.angle = 0; // Kąt ustawienia gracza. zero czyli na wschód
		this.makeTurn = false; // flaga zabezpieczjąca przed kilkukrotnycm wywolanie obrócenia

		this.unconscious = false; // okresla czy postac jest nieprzytowmna

		this.gridVisible = [];	// LOS
		


		// poruszanie
		this.moveFlag = false;
		var nextStepX = 0;
		var nextStepY = 0;
		var nextStepXpx = 0;
		var nextStepYpx = 0;
		var path = [];
		var step = 0;
		var rotate = 0;
		var actualrotate = 0;
		var onFinishMove = null;

		// Tablice na obiekty przedmiotów ubranych oraz bedących w plecaku
		this.itemsWear = [0,0,0,0,0,0,0,0,0,0,0];
		this.itemsBackpack = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

		// Przechowuje przedmioty do szybkiego użycia
		this.quickmenu = [0,0,0,0,0];

		// Przechowuje obiekty zaklęć wyuczonych
		this.magicSpells = [];

		// Informacja o tym czy broń została użyta w danej turze, a więc czy miał miejsce atak.
		// Jeśli tak to nie wolno zmienić borni do początku następnej tury.
		this.usedWeapons = 0;

		// dodaje wartosc zbroi. Każdy bohater naturalnie ma ten wskaźnik rowny zero
		h.stats.armour = 0;

		// Statystyki bazowe dla cech
		// Ulegają zmianie tylko w przypadku awansu na wyższy poziom
		// Przechowują stany naturalne cech, czyli bez wpływu zewnętznych czynników
		// Wykorzystywane w celu odtworzenia stanu orginalnego cechy np: po uleczeniu
		this.solidStats = ROS.tools.clone(h.stats);

		// Kopia statystyk bazowych
		// Te statystyki zmieniają się w zależnosci od wpływu zewnetrznych czynników np: eliksir siły może zwiększych czasowo siłe
		this.cloneStats = ROS.tools.clone(h.stats);

		// Tworzy dodatkowe pola na charakterystyki które się wyczerpują,
		// przechowuja aktualny stan danej cechy. Na początku ustalane są na maksymalne wartości.
		this.actualStats = {
			"life": h.stats.life,
			"movement": h.stats.movement,
			"mana": h.stats.mana,
			"attacks": h.stats.attacks
		};

		// Specjalny obiekt przechowujący bonusy do wartości cech wyczerpujących się.
		// Wartości takie są przechowywane w osobnym obiekcie
		// ponieważ efekty które w ten sposób zwiększają cechę, jesli są czasowe to:
		// - po upływie swojego czasu odbierają punkty które dodały. Jeśli gracz je złużyje wczesniej to nic nie odbierają.
		// - jesli są czasowe lub trwałe to mogą spowodować zwiększenie wartosci cechy ponad stan maksymalny
		// Przykład: Bohater wypija eliksir życia który dodaje mu 5 punktów na 3 tury.
		//			 Taki bonus zapisywany jest do poniższego obiektu. Następnie gracz zostaje
		//			 ranny i traci 3 punkty zycia. Po upływie czasu działania eliksiru odbiera mu on
		//			 pozostałe 2 punkty a nie 5 tyle ile dał. Chociaż gracz mógł mieć duze wiecej
		//			 ponieważ ilość jego aktualnych puktów życia to suma actualStats + actualBonuses
		// Przykład 2: Jeśli na gracza działa kilka efektów zwiekszających czasowo jedną cechę actual.
		// 			 To sytuacja nadal jest klarowna. Jeden eliksir dodaje 2 pż na 2 tury, drugi eliksir
		//			 dodaje 6 na 6 tur. W sumie w actualTimeBonuses wartość life wynosi 8.
		//			 Gracz zostaje ranny i traci 3pż (w bonusie pozostaje 5). Po upływie 2 tur przestaje działac eliksir dodający
		//			 2 pż więc te dwa punkty są odbierane z bonusa, bo wartość bonusa jest wystarczająca (w bonusie pozostaje 3).
		//			 Po 6 turach przestaje działać drugi eliksir jednak nie odbiera on 6 lecz pozostałe 3 pż
		//			 bo tylko tyle zostało w bonusie.
		// Przykład 3: Jeśli gracz wypija eliksir zwikeszający trwale wartosc pż o 5 to zadziała on nawet
		//			 w przypadku gdy miał maksymalną ilość punktów życia. Może dzieki temu mieć np: 25 na 20.
		//			 Jesli zostanie ranny i straci te punkty np otrzyma 8 obrażeń to pozniej juz moze sie wyleczyć tylko do 20
		//			 Chyba że znowu wywoła efekt o zdolności zwiększającej cechę ponad stan.
		this.actualBonuses = {
			"life": 0,
			"movement": 0,
			"mana": 0,
			"attacks": 0
		};

		this.levelTable = h.levelTable;
		this.level = h.level;
		this.exp = 0; // doświadczenie potrzebne aby określicz czy postać jest juz gotowa do przejscia na wyzszy level. W Queście Złoto = Doswiadczenie tutaj bedzie podobnie ale zloto mozna pozyczac dlatego doswiadczenie ma swoj licznik
		this.gold = 0;




		// GRAFIKA BOHATERA
		var o = document.createElement("div");		
		o.style.width = this.width+'px';
		o.style.height = this.height+'px';
		o.style.position = 'absolute';
		o.style.zIndex = 17;
		o.style.left = this.left+'px';
		o.style.top = this.top+'px';
		o.style.backgroundImage = 'url('+this.gfx['walk']+')';
		
		ROS.tools.addEvent(o,'mousedown',function(e) {
			var p;
			ROS.mouse.down(e); // Pobranie numeru naciśnietego przycisku
			if (!ROS.infoScroll.active) {

				// Jeśli jakas postac sie porusza to nie mozna wybrac innej
				for(p in ROS.base.heroes) {                    
                    if (ROS.base.heroes[p].moveFlag) {
                        return;
                    }
                }

				switch(ROS.mouse.buttonDown) {
					case 1: // Lewy przycisk myszki - Wybranie gracza
						ROS.base.setActivePlayer(self.tilex,self.tiley);							
					break;
					case 3: // Prawy przycisk myszki - Otwarcie karty
						ROS.Sound.play('bookopen');
						self.sheet.center();
						self.showSheet('backpack');
					break;
				}
			}
		});	
		ROS.tools.addEvent(o,'mouseover',function() {
			if (!ROS.map.moving) {
				ROS.fly.show(null,1,175,null,self.istat);			
			}
		});		
		ROS.tools.addEvent(o,'mouseout',function(e) {
			ROS.fly.hide();
		});

		ROS.map.area.appendChild(o);
		this.obj = o;

		o = null;



		// przechowuje wykresy
		// Nie jest podpinany do DOMu teraz, dopiero gdy najdzie kursor na ikone wroga wtedy jest podpinany do latajacego bloczka
		this.istat = document.createElement("div");
		this.istat.style.position = 'relative';
		this.istat.style.margin = 5+'px';
		




		// HUD BOHATERA
		this.choosenBulb = document.createElement('div');			
		var cbs = this.choosenBulb.style;
		cbs.position = 'absolute';
		cbs.left = -100+'px';
		cbs.bottom = -8+'px';
		cbs.width = 124+'px';
		cbs.height = 126+'px';
		cbs.zIndex = 505;
		cbs.display = 'none';
		cbs.background = 'url(gfx/choosenBulb.png) no-repeat';
		ROS.map.well.appendChild(this.choosenBulb);
			

		this.bulb = document.createElement('div');			
		var bs = this.bulb.style;
		bs.position = 'absolute';
	    bs.left = -100+'px';
		bs.bottom = 11+'px';
		bs.width = 90+'px';
		bs.height = 88+'px';
		bs.zIndex = 507;
		bs.background = 'url(gfx/bulb1.png) no-repeat';
		ROS.map.well.appendChild(this.bulb);
		bs = null;

		this.bulbYellow = document.createElement('div');			
		var bys = this.bulbYellow.style;
		bys.position = 'absolute';
	    bys.left = 7+'px';
		bys.top = 8+'px';
		bys.width = 76+'px';
		bys.height = 72+'px';
		bys.zIndex = 507;
		bys.background = 'url(gfx/bulbYellow.png) no-repeat';
		this.bulb.appendChild(this.bulbYellow);
		bys = null;

		var bulbRedMask = document.createElement('div');
		var brms = bulbRedMask.style;
		brms.position = 'absolute';
	    brms.left = 13+'px';
		brms.top = 13+'px';
		brms.width = 32+'px';
		brms.height = 63+'px';
		brms.zIndex = 508;
		brms.overflow = 'hidden';		
		this.bulb.appendChild(bulbRedMask);
		brms = null;
		 
		this.bulbRed = document.createElement('div');			
		var brs = this.bulbRed.style;
		brs.position = 'absolute';
	    brs.left = 0+'px';
		brs.top = 0+'px';
		brs.width = 32+'px';
		brs.height = 63+'px';
		brs.zIndex = 508;
		brs.background = 'url(gfx/bulbRed.png) no-repeat';
		bulbRedMask.appendChild(this.bulbRed);
		brs = null;

		var bulbBlueMask = document.createElement('div');
		var bbms = bulbBlueMask.style;
		bbms.position = 'absolute';
	    bbms.left = 45+'px';
		bbms.top = 13+'px';
		bbms.width = 32+'px';
		bbms.height = 63+'px';
		bbms.zIndex = 508;
		bbms.overflow = 'hidden';		
		this.bulb.appendChild(bulbBlueMask);
		bbms = null;

		this.bulbBlue = document.createElement('div');			
		var bbs = this.bulbBlue.style;
		bbs.position = 'absolute';
	    bbs.left = 0+'px';
		bbs.top = 0+'px';
		bbs.width = 33+'px';
		bbs.height = 63+'px';
		bbs.zIndex = 508;
		bbs.background = 'url(gfx/bulbBlue.png) no-repeat';
		bulbBlueMask.appendChild(this.bulbBlue);
		bbs = null;

		this.bulbCenter = document.createElement('div');			
		var bcs = this.bulbCenter.style;
		bcs.position = 'absolute';
	    bcs.left = 17+'px';
		bcs.top = 17+'px';
		bcs.width = 56+'px';
		bcs.height = 56+'px';
		bcs.zIndex = 509;
		bcs.background = 'url(gfx/bulb2.png) no-repeat';
		this.bulb.appendChild(this.bulbCenter);
		bcs = null;

		ROS.tools.addEvent(this.bulbCenter,'mousedown',function(e) {
			var p;
			ROS.mouse.down(e); // Pobranie numeru naciśnietego przycisku
			if (!ROS.infoScroll.active) {

				// Jeśli jakas postac sie porusza to nie mozna wybrac innej
				for(p in ROS.base.heroes) {                    
                    if (ROS.base.heroes[p].moveFlag) {
                        return;
                    }
                }

				switch(ROS.mouse.buttonDown) {
					case 1: // Lewy przycisk myszki - Wybranie gracza
						ROS.base.setActivePlayer(self.tilex,self.tiley);
						ROS.map.center(self.tilex,self.tiley,true);							
					break;
					case 3: // Prawy przycisk myszki - Otwarcie karty
						ROS.Sound.play('bookopen');
						self.sheet.center();
						self.showSheet('backpack');
					break;
				}
			}
		});	





		// KARTA BOHATERA
		// Tworzy karte bohatera
		var sheetWidth = 452;
		var sheetHeight = 352;
		this.sheet = new ROS.Palette(sheetWidth,sheetHeight,name+' ('+this.heroRaceName+' - '+this.heroClassName+')');
		

		// Rozszerzenie zdarzenia klikniecia
		// Klik na paletce powoduje ustawienia wlasciciela jako aktywnego gracza
		ROS.tools.addEvent(this.sheet.pDiv,'mousedown',function() {	
			ROS.base.setActivePlayer(self.tilex,self.tiley);			
		});		


		// Div z guzikami reprezentującymi zakładki
		var sheetButtons = document.createElement("div");
		var sbs = sheetButtons.style;
		sbs.position = 'absolute';
		sbs.left = 10+'px';
		sbs.bottom = 10+'px';
		sbs.width = (sheetWidth-10)+'px';
		sbs.height = 24+'px';
		this.sheet.insertNodes(sheetButtons);

		// Metoda prywatna tworząca guzik
		function makeButton(action) {
			var b = document.createElement("div");
			var bs = b.style;
			bs.position = 'absolute';
			bs.width = 70+'px';
			bs.height = 18+'px';
			bs.left = 0+'px';
			bs.top = 0+'px';
			bs.padding = 2+'px';
			bs.border = '1px solid #815a3b';
			bs.background = '#ac8b58';
			bs.fontSize = 12+'px';
			bs.fontFamily = 'Comic Sans MS';
			bs.color = '#463122';
			bs.textAlign = 'center';
			bs.MozBorderRadius = '3px';
			bs.borderRadius = '3px';
			bs.WebkitBorderRadius = '3px';
			bs = null;
			ROS.tools.addEvent(b,'mousedown',function(e) {			
				ROS.mouse.down(e,false);
				if (ROS.mouse.buttonDown === 1) {
					self.showSheet(action);
				}
			});
			ROS.tools.addEvent(b,'mouseover',function() {							
				this.style.background = '#92ac58';
			});
			ROS.tools.addEvent(b,'mouseout',function() {			
				this.style.background = '#ac8b58';
			});
			try {
				return b;
			} finally {
				b = null;
			}
		}

		// Guziki na karcie
		var b1 = makeButton('backpack');
		b1.style.left = 0+'px';
		b1.innerHTML = 'Plecak';
		sheetButtons.appendChild(b1);
		b1 = null;

		var b2 = makeButton('stats');
		b2.style.left = 80+'px';
		b2.innerHTML = 'Statystyki';
		sheetButtons.appendChild(b2);
		b2 = null;

		// Przestrzeń na zawartość strony: Statystyki (nad guzikami)
		var sheetPage1 = document.createElement("div");
		var sps1 = sheetPage1.style;
		sps1.position = 'absolute';
		sps1.left = 0+'px';
		sps1.top = 0+'px';
		sps1.display = 'none';
		//sps1.border = '1px solid #815a3b';
		sps1.width = (sheetWidth-2)+'px';
		sps1.height = (sheetHeight-72)+'px';
		sps1.fontSize = 14+'px';
		this.sheet.insertNodes(sheetPage1);

		// Przestrzeń na zawartość strony: Plecak (nad guzikami)
		var sheetPage2 = document.createElement("div");
		var sps2 = sheetPage2.style;
		sps2.position = 'absolute';
		sps2.left = 0+'px';
		sps2.top = 0+'px';
		sps2.display = 'none';
		//sps2.border = '1px solid #815a3b';
		sps2.width = (sheetWidth-2)+'px';
		sps2.height = (sheetHeight-72)+'px';
		sps2.fontSize = 14+'px';
		this.sheet.insertNodes(sheetPage2);



		



		// Tworzy puste komórki plecaka, na których można poukładać noszone przedmioty
		this.createStuffTable = function() {

			// tworzy dwa pola na przedmioty:

			/*
			 * I. KOMÓRKI PLECAKA
			 *    25 pól
			 */

			var x, no, col, row, eq;
			var sx, sy, t, t2, sinfo;

			// div - plecak
			var eq_table = document.createElement("div");
			eq_table.id = 'heroBackpackGrid_'+this.uniqid;
			eq_table.style.position = 'absolute';
			eq_table.style.left = 196+'px';
			eq_table.style.top = 17+'px';
			eq_table.style.width = 241+'px';
			eq_table.style.height = 241+'px';
			sheetPage2.appendChild(eq_table);

			// div - pola plecaka
			var len = this.itemsBackpack.length;
			for (x=0; x<len; x++) {

				row = Math.floor(x/5); // zero dla pierwszego rzedu, jeden dla drugiego itd
				col = x-(row*5);

				eq = document.createElement("div");
				eq.id = 'heroBackpackGridField_'+this.uniqid+'_'+x;
				eq.className = 'containerField';
				eq.style.zIndex = '90';
				eq.style.left = (col*48) + 'px';
				eq.style.top = (row*48) + 'px';
				eq_table.appendChild(eq);

				
				ROS.tools.addEvent(eq,'mousedown',function(e) {				

					// Sprawdza czy w komórce znajduje się przedmiot
					// jesli nie ma przedmiotu to nic nie robi i wywoluje propagacje zdarzenia rodzicielskiego elementu
					if (!this.hasChildNodes()) { return; }
					
					// Stopuje propagacje
					ROS.mouse.down(e,true); 

					// Klikniecie na komórce zawierającej przedmiot oznacza paletke gracza jako aktywnego
					ROS.base.setActivePlayer(self.tilex,self.tiley);

					var poz = this.id.split("_")[2];
					ROS.fly.hide();					

					switch(ROS.mouse.buttonDown) {
		                case 1: // Lewy przycisk myszki - Podniesienie przedmiotu z komórki
	                    	ROS.Sound.play('take');

	                    	// tworzy nową referencje do obiektu przedmiotu
		                    var field = this;

	                    	ROS.flyBag.owner = self;
		                    ROS.flyBag.from = 'backpack';
		                    ROS.flyBag.item = self.itemsBackpack[poz];
		                    ROS.flyBag.giveBack = function() {
		                      	// wraca obrazek na stare pole
		                        field.appendChild(ROS.flyBag.area.firstChild);
		                        ROS.flyBag.area.innerHTML = null;
		                        // przepisuje referencje na stare pole
								self.itemsBackpack[poz] = ROS.flyBag.item;
								ROS.flyBag.item = null;
								field = null;
		                    }

		                    // Przedmiot moze byc przekazany innym bohaterom
		                    // lub kontenerom będącym w styku z tym bohaterem
		                    // Odswieza liste odbiorców:
		                    ROS.flyBag.setTargets(self.tilex,self.tiley);

		                    // przekłada ikonke z komórki do latającego diva
		                    ROS.flyBag.area.appendChild(this.firstChild);
		                    ROS.flyBag.show();

		                    // Usuwa referencje z tablicy
		                    // Jedyną referencja przedmiotu znajduje się w tech chwili w obiekcie ROS.flyBag.item
							self.itemsBackpack[poz] = 0;
		                break;
		                case 3: // Menu z opcjami
		                	var field = this;
		                	var li,a;
		                	var menu = document.createElement("div");
			                menu.className = 'menu';
            				var ul = document.createElement("ul");
            				menu.appendChild(ul);

		                	// DODAJE OPCJE UŻYCIA
                			// Jesli przedmiot mozna uzywac i gracz nie jest martwy
                			if (self.itemsBackpack[poz].testActivate('whenUse') && self.actualStats.life > 0) {
								// UŻYJ
								a = document.createElement("a");
 								a.appendChild(document.createTextNode('Użyj'));
 								a.href = '#';
 								a.onmouseup = ROS.tools.bind(
	 								function(owner,item,effect,activation) {
		 								ROS.effects.selectTargetStart(owner,item,effect,activation);
		 							},
		 							self,
		 							self.itemsBackpack[poz],
		 							self.itemsBackpack[poz].effects.whenUse,
		 							'whenUse'
		 						);
 								li = document.createElement("li");
 								li.appendChild(a);
 								ul.appendChild(li);
 							}

 							// DODAJ OPCJE WYRZUĆ
 							a = document.createElement("a");
 							a.appendChild(document.createTextNode('Wyrzuć'));
 							a.href = '#';
 							a.onmouseup = ROS.tools.bind(
 								function(itempos,field) {
 									// Wyrzucając przedmiot tworzy się kontener na polu na którym stoi gracz
 									// Gracz nie moze wyrzucić przedmiotu na polu na którym jest inny kontener
 									if (ROS.dungeon.gridContainers[self.tiley][self.tilex] === 0) {
 										// tworzy kontener
 										ROS.dungeon.gridContainers[self.tiley][self.tilex] = new ROS.Container('miscStuff',self.tilex,self.tiley);
 									} 

									// wsadza przedmiot
									if (ROS.dungeon.gridContainers[self.tiley][self.tilex].addItem(ROS.base.items[self.itemsBackpack[itempos].uniqid])) {
									
	 									// usuwa ikonke
	 									field.removeChild(field.firstChild);

	 									// usuwa referencje globalną - NIE USUWA BO PRZEDMIOT JEST PRZENIESIONY
		 								// delete ROS.base.items[self.itemsBackpack[itempos].uniqid];
		 									
		 								self.itemsBackpack[itempos] = 0;
		 									
		 								// usuwa ikonke i referencje z quickmenu (jesli byla)
		 								ROS.hud.refreshQuickMenuRef();
	 									
	 									// odświeża hud
	 									ROS.hud.refresh();
		 								self.refreshIconStats();
										self.refreshBulbStats();
	 																						
	 									field = null;
 									}
	 								
 								},
 								poz,
 								field
 							);
 							li = document.createElement("li");
 							li.appendChild(a);
 							ul.appendChild(li);

 							ROS.flyMenu.move(ROS.mouse.x+30,ROS.mouse.y-10);
            				ROS.flyMenu.fill(menu);

            				menu = null;
            				field = null;
		                break;
		            }			        
				});

				ROS.tools.addEvent(eq,'mouseup',function(e) {				

					ROS.mouse.up(e,false); // nie zatrzymuje propadacji aby puszczenie myszki wywołało przerwanie przesuwania paletki kontenera

					// sprawdza czy był przenoszony przedmiot
					if (ROS.flyBag.item !== null) {
						ROS.Sound.play('drop');

						// upewniam się czy na polu nie znajduje sie inny przedmiot
						if (this.hasChildNodes()) {
							var poz = this.id.split("_")[2];

							// Sprawdza czy cel jest dozwolony
							if (ROS.flyBag.inTargets(self.uniqid)) {
								// Jesli przenoszony przedmiot to złoto i odkladane jest na przedmiot ktory tez jest zlotem to łaczy ich wartosci
								if (ROS.flyBag.item.basic.type === 13 && self.itemsBackpack[poz].basic.type === 13) {
									self.itemsBackpack[poz].basic.typeSpecific.howmuch += ROS.flyBag.item.basic.typeSpecific.howmuch; // dodaje wartosc przenoszonego zlota do zlota lezacego
									
									// sprawdza czy w kontenerze pozostały jakies przedmioty
									// jesli nie pozostały i kontener ma flage empty=false to go usuwa
									if (ROS.flyBag.owner instanceof ROS.Container && 
										ROS.flyBag.owner.countItems() === 0 &&
										!ROS.flyBag.owner.container.empty) {
										ROS.flyBag.owner.destroy();
									}

								} else {														
									// W kazdym innym przypadku zwraca ikonke na pole z ktorego została podniesiona
									ROS.flyBag.giveBack();
								}
							} else {
								// wraca ikonke na pole z ktorego została podniesiona
								ROS.flyBag.giveBack();
								ROS.infoScroll.show('Obiekty znajdują się zbyt daleko od siebie, aby możliwa była wymiana przedmiotów.');
							}

						} else {

							// Sprawdza czy cel jest dozwolony
							if (ROS.flyBag.inTargets(self.uniqid)) {
								// wstawia ikonke na nowe pole
								this.appendChild(ROS.flyBag.area.firstChild);
								
								// Wstawia na nowe pole
								var poz = this.id.split("_")[2];
								self.itemsBackpack[poz] = ROS.flyBag.item; // wstaw przenoszony przedmiot na nowe pole tablicy
								
								// sprawdza czy w kontenerze pozostały jakies przedmioty
								// jesli nie pozostały i kontener ma flage empty=false to go usuwa
								if (ROS.flyBag.owner instanceof ROS.Container && 
									ROS.flyBag.owner.countItems() === 0 &&
									!ROS.flyBag.owner.container.empty) {
									ROS.flyBag.owner.destroy();
								}

							} else {
								// wraca ikonke na pole z ktorego została podniesiona
								ROS.flyBag.giveBack();
								ROS.infoScroll.show('Obiekty znajdują się zbyt daleko od siebie, aby możliwa była wymiana przedmiotów.');
							}

						}
						ROS.flyBag.clear();

						ROS.hud.refreshQuickMenuRef();
					}
				});				

				eq = null;				
			}





			/*
			 * II. KOMÓRKI POSTACI
			 *     11 pól
			 */

			// div - postać
			var eq_body = document.createElement("div");
			eq_body.id = 'heroWearGrid_'+this.uniqid;
			eq_body.style.position = 'absolute';
			eq_body.style.left = 11+'px';
			eq_body.style.top = 17+'px';
			eq_body.style.width = 165+'px';
			eq_body.style.height = 235+'px';
			sheetPage2.appendChild(eq_body);

			// ta funkcja jest wywoływana poprzez funkcje bindArguments
			function callOnMouseOver(a,b,c,d) {
				// jesli pole jest puste to wyświetla opis pola, jesli jest zajęte to nie wyswietla opisu dzieki czemu moze wyswietlic się opis przedmiotu znajdującego się w tym polu bo nie jest nadpisywany tą funkcją ROS.fly.show
				if (d.hasChildNodes() == false) ROS.fly.show(a,b,c);								
			}

			// div - pola postaci
			for (x=0; x<11; x++) {

				switch(x) {
					// UWAGA NIE ZMIENIAĆ NUMERACJI !!!
					case 0: sx=58; sy=0; sinfo='Pole na helm'; break; // hełm
					case 1: sx=0; sy=25; sinfo='Pole na amulet'; break; // naszyjnik
					case 2: sx=116; sy=25; sinfo='Pole na płaszcz'; break; // płaszcz
					case 3: sx=58; sy=63; sinfo='Pole na napierśnik'; break; // zbroja
					case 4: sx=0; sy=80; sinfo='Pole na broń podstawową<br>Jedno lub dwuręczną'; break; // bronie zasięgowe lub zwykłe
					case 5: sx=116; sy=80; sinfo='Pole na tarcze lub broń dodatkową (jednoręczną)'; break; // tarcza lub druga broń
					case 6: sx=58; sy=111; sinfo='Pole na pas'; break; // pas
					case 7: sx=10; sy=128; sinfo='Pole na pierścień'; break; // pierscien 1
					case 8: sx=0; sy=176; sinfo='Pole na pierścień'; break; // pierscien 2
					case 9: sx=106; sy=128; sinfo='Pole na rękawice'; break; // rękawice
					case 10: sx=58; sy=186; sinfo='Pole na buty'; break; // buty
				}

				eq = document.createElement("div");
				eq.id = 'heroWearGridField_'+this.uniqid+'_'+x;
				eq.className = 'containerField';				
				eq.style.zIndex = '90';
				eq.style.left = sx + 'px';
				eq.style.top = sy + 'px';				
				eq_body.appendChild(eq);

				//eq.onmouseover = ROS.tools.bind(callOnMouseOver,sinfo,1,140,eq);

				ROS.tools.addEvent(eq,'mouseover',ROS.tools.bind(callOnMouseOver,sinfo,1,140,eq));
				
				ROS.tools.addEvent(eq,'mouseout',ROS.fly.hide);

				ROS.tools.addEvent(eq,'mousedown',function(e) {
					
					// Sprawdza czy w komórce znajduje się przedmiot
		            if (!this.hasChildNodes()) { return; }
		            
		            // Stopuje propagacje
					ROS.mouse.down(e,true); 

					// Klikniecie na komórce zawierającej przedmiot oznacza paletke gracza jako aktywnego
					ROS.base.setActivePlayer(self.tilex,self.tiley);                	
		                                	
					var poz = this.id.split("_")[2];
					ROS.fly.hide();

					switch(ROS.mouse.buttonDown) {
		                case 1: // Lewy przycisk myszki - Podniesienie przedmiotu z komórki		                    

							// Sprawdzenie czy gracz nie probuje podniesc broni z pola na bron PO wykonaniu nią ataku
				            // Jeśli podnoszony przedmiot to broń do walki wrecz lub bron do walki zasiegowej oraz
				            // jesli przedmiot podnoszony jesst z lewej bądź prawej reki to przerwij i wyświetl komunikat.
				            if (self.usedWeapons == 1) {
				                if (poz == 4 || poz == 5) {
					                if (self.itemsWear[poz].isWeapon()) {
				                        ROS.fly.hide();
				                        ROS.infoScroll.show('Po wykonaniu ataku nie wolno zmieniać broni do końca tury.');
				                        return;
				                    }
				                }
				            }

				            // jesli przedmiot posiada efekty dzialajace gdy jest ubrany
							// to teraz te efekty przestają działać.
                    		if (self.itemsWear[poz].testActivate('whenWear')) {
	                        	ROS.effects.delEffects(self.itemsWear[poz].uniqid);
                    		}

				            ROS.Sound.play('take');

	                    	// tworzy nową referencje do obiektu przedmiotu
	                    	var field = this;
	                    	
	                    	ROS.flyBag.owner = self;
	                    	ROS.flyBag.from = 'wear';
		                    ROS.flyBag.item = self.itemsWear[poz];
		                    ROS.flyBag.giveBack = function() {
		                      	// wraca obrazek na stare pole
		                        field.appendChild(ROS.flyBag.area.firstChild);
		                        ROS.flyBag.area.innerHTML = null;
		                        // przepisuje referencje na stare pole
								self.itemsWear[poz] = ROS.flyBag.item;
								ROS.flyBag.item = null;
								field = null;
		                    }

		                    // Przedmiot moze byc przekazany innym bohaterom
		                    // lub kontenerom będącym w styku z tym bohaterem
		                    // Odswieza liste odbiorców:
		                    ROS.flyBag.setTargets(self.tilex,self.tiley);

		                    // przekłada ikonke z komórki do latającego diva
		                    ROS.flyBag.area.appendChild(this.firstChild);
		                    ROS.flyBag.show();

		                    // Test i deaktywacja efektow wynikające z nowo ubranego przedmiotu
							if (self.itemsWear[poz].testActivate('whenWear')) {
								ROS.effects.whenWear[self.itemsWear[poz].effects.whenWear].deactivate(self);
							}

		                    // Usuwa referencje z tablicy
		                    // Jedyną referencja przedmiotu znajduje się w tech chwili w obiekcie ROS.flyBag.item
							self.itemsWear[poz] = 0;
							
							self.refreshIconStats(); // aby odswiezyc informacje o aktywnej broni jesli wlozylem ją w dłoń
							self.refreshBulbStats(); // aby odswiezy
				        
		                break;
		                case 3: // Menu z opcjami
		                	var field = this;
		                	var li,a;
		                	var menu = document.createElement("div");
			                menu.className = 'menu';
            				var ul = document.createElement("ul");
            				menu.appendChild(ul);

		                	// DODAJE OPCJE UŻYCIA
                			// Jesli przedmiot mozna uzywac i gracz nie jest martwy
                			if (self.itemsWear[poz].testActivate('whenUse') && self.actualStats.life > 0) {
								// UŻYJ
								a = document.createElement("a");
 								a.appendChild(document.createTextNode('Użyj'));
 								a.href = '#';
 								a.onmouseup = ROS.tools.bind(
	 								function(owner,item,effect,activation) {
		 								ROS.effects.selectTargetStart(owner,item,effect,activation);
		 							},
		 							self,
		 							self.itemsWear[poz],
		 							self.itemsWear[poz].effects.whenUse,
		 							'whenUse'
		 						);
 								li = document.createElement("li");
 								li.appendChild(a);
 								ul.appendChild(li);
 							}

 							// DODAJ OPCJE WYRZUĆ
 							a = document.createElement("a");
 							a.appendChild(document.createTextNode('Wyrzuć'));
 							a.href = '#';
 							a.onmouseup = ROS.tools.bind(
 								function(itempos,field) {

 									// Wyrzucając przedmiot tworzy się kontener na polu na którym stoi gracz
 									// Gracz nie moze wyrzucić przedmiotu na polu na którym jest inny kontener
 									if (ROS.dungeon.gridContainers[self.tiley][self.tilex] === 0) {
 										// tworzy kontener
 										ROS.dungeon.gridContainers[self.tiley][self.tilex] = new ROS.Container('miscStuff',self.tilex,self.tiley);
 									} 

									// wsadza przedmiot
									if (ROS.dungeon.gridContainers[self.tiley][self.tilex].addItem(ROS.base.items[self.itemsWear[itempos].uniqid])) {
									
	 									// usuwa ikonke
	 									field.removeChild(field.firstChild);

	 									// usuwa referencje globalną - NIE USUWA BO PRZEDMIOT JEST PRZENIESIONY
		 								// delete ROS.base.items[self.itemsBackpack[itempos].uniqid];
		 								
		 								// Test i deaktywacja efektow wynikających z wyrzuconego przedmiotu
										if (self.itemsWear[itempos].testActivate('whenWear')) {
											ROS.effects.whenWear[self.itemsWear[itempos].effects.whenWear].deactivate(self);
										}
											
		 								self.itemsWear[itempos] = 0;
		 									
		 								// usuwa ikonke i referencje z quickmenu (jesli byla)
		 								ROS.hud.refreshQuickMenuRef();
	 									
	 									// odświeża hud
	 									ROS.hud.refresh();
		 								self.refreshIconStats();
										self.refreshBulbStats();
	 																						
	 									field = null;
 									}
	 								
 								},
 								poz,
 								field
 							);
 							li = document.createElement("li");
 							li.appendChild(a);
 							ul.appendChild(li);

 							ROS.flyMenu.move(ROS.mouse.x+30,ROS.mouse.y-10);
            				ROS.flyMenu.fill(menu);

            				menu = null;
            				field = null;
		                break;
		            }
				});

				ROS.tools.addEvent(eq,'mouseup',function(e) {								
					
					ROS.mouse.up(e,false); // // nie zatrzymuje propadacji aby puszczenie myszki wywołało przerwanie przesuwania paletki kontenera

					var pozycja;
					var poz;

					// sprawdza czy był przenoszony przedmiot
					if (ROS.flyBag.item !== null) {

						ROS.Sound.play('drop');

						// na tych polach rządzą zasady,
						// każde z pól może przechowywać konkretne typy przedmiotów
						// system sprawdza czy nie nastapiła próba umieszczenia przedmiotu na niedozwolonym polu
						var t = ROS.flyBag.item.basic.type; // typy przedmiotów ktore mogą być ubierane 0-10
						var poz = this.id.split('_')[2]; // numer pola nad ktorym puszczono guzik 0-10
						var h = ROS.flyBag.item.basic.typeSpecific.hand; // kazdy przedmiot który można wsadzic do reki musi miec atrybut "hand"
						if (
							(t == 0 && poz == 0) || // Na głowie - hełm
							(t == 1 && poz == 1) || // Na szyi - naszyjnik
							(t == 2 && poz == 2) || // Na plecach - plaszcz
							(t == 3 && poz == 3) || // Na torsie - zbroje
							(t == 4 && poz == 4 && h == 1) || // W prawej ręce - JEDNORĘCZNA broń do walki wręcz (typ 4)
							(t == 4 && poz == 4 && h == 2 && self.itemsWear[5] == 0) || // W prawej ręce - moze byc DWURĘCZNA broń do walki wręcz (typ 4) o ile pole 5 (druga ręka) jest puste
							(t == 5 && poz == 4 && h == 1) || // W prawej ręce - JEDNORĘCZNA broń strzelecka (typ 5)
							(t == 5 && poz == 4 && h == 2 && self.itemsWear[5] == 0) || // W prawej ręce - moze byc DWURĘCZNA broń strzelecka (typ 5) o ile pole 5 (druga ręka) jest puste
							(t == 6 && poz == 5 && self.itemsWear[4] == 0) || // W lewej ręce - tarcza o ile w prawej ręce nic nie ma
							(t == 6 && poz == 5 && self.itemsWear[4].basic.typeSpecific.hand == 1) || // W lewej ręce - tarcza o ile w drugiej ręce nie ma broni dwuręcznej
							(t == 4 && poz == 5 && h == 1 && self.itemsWear[4] == 0) || // W lewej ręce - broń do walki wręcz czyli typ 4 o ile jest JEDNORĘCZNA i w prawej ręcę nic nie ma
							(t == 4 && poz == 5 && h == 1 && self.itemsWear[4].basic.typeSpecific.hand == 1) || // W lewej ręce - broń do walki wręcz czyli typ 4 o ile jest JEDNORĘCZNA i w prawej ręcę znajduje się bron jednoręczna
							(t == 5 && poz == 5 && h == 1 && self.itemsWear[4] == 0) || // W lewej ręce - broń strzelecka czyli typ 5 o ile jest JEDNORĘCZNA i w prawej ręcę nic nie ma
							(t == 5 && poz == 5 && h == 1 && self.itemsWear[4].basic.typeSpecific.hand == 1) || // W lewej ręce - broń strzelecka czyli typ 5 o ile jest JEDNORĘCZNA i w prawej ręcę znajduje się bron jednoręczna
							(t == 7 && poz == 6) || // Na biodrach - pas
							(t == 8 && poz == 7) || // Na palcu - pierscien
							(t == 8 && poz == 8) || // Na palcu drugim - pierscien
							(t == 9 && poz == 9) || // Na dłoniach - rękawice
							(t == 10 && poz == 10)  // Na stopach - obuwie
						) {

							// upewniam się czy na polu nie znajduje sie inny przedmiot
							if (this.hasChildNodes()) {
								// Wróć przedmiot na miejsce z którego został podniesiony
								ROS.flyBag.giveBack(); // pole niedozwolone wróć przedmiot na pole startowe
							} else {
								// jeśli postać atakowała w tej turze to nie wolno zmienić broni a więc na polu 4 i 5 nie wolno położyć przedmiotu typu bron do ww lub strzeleckiej
								if (self.usedWeapons==1 && (poz==4 || (poz==5 && (t==4 || t==5)))) {
									ROS.infoScroll.show('Po wykonaniu ataku nie wolno zmieniać broni do końca tury.');
									// Wróć przedmiot na miejsce z którego został podniesiony
									ROS.flyBag.giveBack(); // pole niedozwolone wróć przedmiot na pole startowe
								} else {

									// Sprawdza czy cel jest dozwolony
									if (ROS.flyBag.inTargets(self.uniqid)) {
										this.appendChild(ROS.flyBag.area.firstChild); // wstaw grafike przedmiotu do pola, grafika to jedyne dziecko ROS.flyBag.area
										
										// Wstawia na nowe
										self.itemsWear[poz] = ROS.flyBag.item;
										
										// Test i aktywacja efektow wynikające z nowo ubranego przedmiotu
										if (self.itemsWear[poz].testActivate('whenWear')) {
											ROS.effects.whenWear[self.itemsWear[poz].effects.whenWear].activate(self);
										}

										// sprawdza czy w kontenerze pozostały jakies przedmioty
										// jesli nie pozostały i kontener ma flage empty=false to go usuwa
										if (ROS.flyBag.owner instanceof ROS.Container && 
											ROS.flyBag.owner.countItems() === 0 &&
											!ROS.flyBag.owner.container.empty) {
											ROS.flyBag.owner.destroy();
										}

									} else {
										// wraca ikonke na pole z ktorego została podniesiona
										ROS.flyBag.giveBack();
										ROS.infoScroll.show('Obiekty znajdują się zbyt daleko od siebie, aby możliwa była wymiana przedmiotów.');
									}

								}
							}							
						} else {
							ROS.flyBag.giveBack(); // pole niedozwolone wróć przedmiot na pole startowe
						}

						ROS.flyBag.clear(); // wyłaczam wodzenie bloczka za kursorem
						
						self.refreshIconStats(); // aby odswiezyc informacje o aktywnej broni jesli wlozylem ją w dłoń
						self.refreshBulbStats(); // aby odswiezyc informacje o aktywnej broni jesli wlozylem ją w dłoń
					
						ROS.hud.refreshQuickMenuRef();
					}
				});				

				eq = null;
				
			}

			eq_table = null;
			eq_body = null;

		};


		this.createStuffTable(); // odpalam powyższą funkcje w chwili tworzenia obiektu gracza

		this.fists = new ROS.Item('hands');		
		
		// ======= KONIEC KONSTRUKTORA ============











		// METODY PUBLICZNE

		this.setStartPosition = function(x,y)  {
			// Postać bohatera posiada na starcie dwie referencje przechowywane w poniższych tablicach
			// Do tablicy graczy (gridHeroes) wpisuje referencje do obiektu tej postaci w komórce x,y
			ROS.dungeon.gridHeroes[y][x] = this;

			// Zmienne położeniowe
			this.left = x*ROS.base.tileWidth;
			this.top = y*ROS.base.tileHeight;
			this.tilex = x;
			this.tiley = y;
			this.obj.style.left = this.left + 'px';
			this.obj.style.top = this.top + 'px';

			this.refreshLOS();
		};


		// pokaz karte bohatera
		this.showSheet = function(page) {
			// Na podstawie wybranej zakładki - wypełnia kartę
			switch(page) {
				case "stats":
					var ss = this.solidStats;
					var cs = this.cloneStats;
					var as = this.actualStats;
					sheetPage1.innerHTML = '<div style="padding:2px; border:1px solid #716250; position: absolute; left:15px; top:10px; width:200px; height:95px;"><table style="width:200px;">'+
					'<tr>'+
						'<td>Życie:</td>'+
						'<td width="70" align="center"><b>'+as.life+' / '+(cs.life != ss.life ? '<span style="color:#ea0005;">'+cs.life+'</span>' : cs.life)+'</b></td>'+
						'<td width="35" align="right">'+ss.life+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td>Magia:</td>'+
						'<td align="center"><b>'+as.mana+' / '+(cs.mana != ss.mana ? '<span style="color:#ea0005;">'+cs.mana+'</span>' : cs.mana)+'</b></td>'+
						'<td align="right">'+ss.mana+'</td>'+
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
					'</table></div>'+

					'<div style="padding:2px; border:1px solid #716250; position: absolute; left:15px; top:121px; width:200px; height:140px;"><table style="width:200px;">'+
					'<tr>'+
						'<td>Walka wręcz:</td>'+
						'<td width="35" align="right"><b>'+(cs.weapon_skill != ss.weapon_skill ? '<span style="color:#ea0005;">'+cs.weapon_skill+'</span>' : cs.weapon_skill)+'</b></td>'+
						'<td width="35" align="right">'+ss.weapon_skill+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td>Obrona:</td>'+
						'<td width="35" align="right"><b>'+(cs.defense_skill != ss.defense_skill ? '<span style="color:#ea0005;">'+cs.defense_skill+'</span>' : cs.defense_skill)+'</b></td>'+
						'<td width="35" align="right">'+ss.defense_skill+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td>Celność:</td>'+
						'<td align="right"><b>'+(cs.ballistic_skill != ss.ballistic_skill ? '<span style="color:#ea0005;">'+cs.ballistic_skill+'</span>' : cs.ballistic_skill)+'</b></td>'+
						'<td align="right">'+ss.ballistic_skill+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td>Siła:</td>'+
						'<td align="right"><b>'+(cs.strength != ss.strength ? '<span style="color:#ea0005;">'+cs.strength+'</span>' : cs.strength)+'</b></td>'+
						'<td align="right">'+ss.strength+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td>Wytrzymałość:</td>'+
						'<td align="right"><b>'+(cs.toughness != ss.toughness ? '<span style="color:#ea0005;">'+cs.toughness+'</span>' : cs.toughness)+'</b></td>'+
						'<td align="right">'+ss.toughness+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td>Zasięg wzroku:</td>'+
						'<td align="right"><b>'+(cs.sight != ss.sight ? '<span style="color:#ea0005;">'+cs.sight+'</span>' : cs.sight)+'</b></td>'+
						'<td align="right">'+ss.sight+'</td>'+
					'</tr>'+
					'</table></div>'+

					'<div style="padding:2px; border:1px solid #716250; position: absolute; left:231px; top:10px; width:200px; height:150px;"><table style="width:200px;">'+
					'<tr>'+
						'<td>Poziom:</td>'+
						'<td width="35" align="right"><b>'+this.level+'</b></td>'+
					'</tr>'+
					'<tr>'+
						'<td>Złoto:</td>'+
						'<td width="35" align="right"><b>'+this.gold+'</b></td>'+
					'</tr>'+
					'<tr>'+
						'<td>Doświadczenie:</td>'+
						'<td width="35" align="right"><b>'+this.exp+'</b></td>'+
					'</tr>'+
					'</table></div>';

					// obrazek
					/*
					var heroImage = document.createElement("img");
					heroImage.src = self.gfx.image;
					var hms = heroImage.style;
					hms.width = 263+'px';
					hms.height = 278+'px';
					hms.position = 'absolute';
					hms.right = 0+'px';
					hms.top = 0+'px';
					sheetPage1.insertNodes(heroImage);
					*/

					sheetPage1.style.display = 'block';
					sheetPage2.style.display = 'none';
				break;
				case "backpack":
					this.fillWearGrid();
					this.fillBackpackGrid();
					sheetPage1.style.display = 'none';
					sheetPage2.style.display = 'block';
				break;
			}
			this.sheet.show(true);
		};


		// Lokalna: Zeruje tablice LOS
		this.clearLOS = function() {
			var x,y;
			for(y=0; y<ROS.base.gameSize[1]; y++) {
				this.gridVisible[y] = [];
				for(x=0; x<ROS.base.gameSize[0]; x++) {
					this.gridVisible[y][x] = 0;
				}
			}
		};

		// Oblicza zasięg widzenia postaci
		this.refreshLOS = function(rays) {
			this.clearLOS();
			if (this.actualStats.life < 0) return; // Jeśli postac jest nieprzytomna to wywolanie refreshLOS wykonuje tylko clearLOS i konczy

			if (rays === undefined) {
				rays = 200;
			}

			var x, y, a, xd, yd, tx, ty, pi2 = Math.PI * 2, incr = Math.PI / rays;
			var distance,dPX,dPX2,dPX3;
			var last_tx = this.tilex; 
			var last_ty = this.tiley;

			distance = this.cloneStats.sight; // maksymalny zasięg wzroku w tilesach
			dPX = distance*48; // odległośc od postaci po ktorej pola przestają być widoczne w PX
			dPX2 = (distance-2)*48; // odleglosc od postaci po ktorej pola zaczynają być słabo widoczne w PX
			dPX3 = (distance-1)*48; // odleglosc od postaci po ktorej pola zaczynają być bardzo słabo widoczne w PX

			for (a = 0; a < pi2; a += incr) {

				xd = Math.cos(a) * 24; // polowa tilea
				yd = -Math.sin(a) * 24;

				x = this.left + 24; // X - środek pola gracza w px
				y = this.top + 24; // Y - środek pola gracza w px

				// Na początku jako poprzednio sprawdzany punkt ustala punkt na którym stoi postać				
				last_tx = this.tilex; 
				last_ty = this.tiley;
				
				while (true) {
					// pierwszy obieg zaczyna się od położenia gracza x,y
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





					// czym mniej tym słabiej widoczny:
					//  0 : nie widoczny
					//  1 : prawie nie widoczny
					//  2 : słabo widoczny
					//  3 : widoczny

					if ( ( x < (this.left - dPX2) && x > (this.left - dPX3) ) || 
					     ( x > (this.left + dPX2) && x < (this.left + dPX3) ) || 
					     ( y < (this.top  - dPX2) && y > (this.top  - dPX3) ) || 
					     ( y > (this.top  + dPX2) && y < (this.top  + dPX3) ) ) {
						this.gridVisible[ty][tx] = 2;

						if (ROS.dungeon.gridMiniMap[ty][tx] === 0) {
							ROS.dungeon.gridMiniMap[ty][tx] = 1;							
						}
					} else if (x < (this.left - dPX3) || 
					           x > (this.left + dPX3) || 
					           y < (this.top  - dPX3) || 
					           y > (this.top  + dPX3)) {
						this.gridVisible[ty][tx] = 1;

						if (ROS.dungeon.gridMiniMap[ty][tx] === 0) {
							ROS.dungeon.gridMiniMap[ty][tx] = 1;							
						}
					} else {
						this.gridVisible[ty][tx] = 3;

						if (ROS.dungeon.gridMiniMap[ty][tx] === 0) {
							ROS.dungeon.gridMiniMap[ty][tx] = 1;
						}
					}

					ROS.dungeon.gridFogOfWar[ty][tx] = 1; // ten obszar już zawsze bedzie widoczny w FOW


					last_tx = tx;
					last_ty = ty;


					// przerywa po natrafieniu na przeszkode
					if (ROS.dungeon.gridLos[ty][tx] === 1) break;
					if (x <= (this.left - dPX) || x >= (this.left + dPX) || y <= (this.top - dPX) || y >= (this.top + dPX)) break; // przerywa po osiagnieciu odleglosci rownej zasiegowi widzenia
					if (x < 0 || y < 0 || x >= ROS.base.gameSize[0] * 48 || y >= ROS.base.gameSize[1] * 48) break; // przerywa po dojsciu do brzegu mapy
				}
			}
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
		// Metoda startuje ruch
		this.moveStart = function(args) {
			step = 0;
			path = args.path;
			onFinishMove = args.onfinish;
			this.moveFlag = true;
			ROS.base.activePlayerCircleAnimation.destroy(); // animacja koła wokół aktywnej postaci			
			this.move();
			args = null;
		};

		this.moveStop = function() {
			ROS.dungeon.setAccessTable();
			step = 0;
			this.refreshIconStats(); // odświeżam stan wykresu ruchu oraz życia
			this.refreshBulbStats(); // odświeżam stan wykresu ruchu oraz życia
			this.moveFlag = false;

			// animacja koła wokół aktywnej postaci
			ROS.base.activePlayerCircleAnimation = new ROS.Animation('playerMark');
			ROS.base.activePlayerCircleAnimation.ignite({});
			ROS.base.activePlayerCircleAnimation.moveAbs(this.left,this.top);			

			if (onFinishMove) onFinishMove();
			onFinishMove = null;
		};

		// Metoda sprawdza czy gracz doszedl do konca sciezki:
		// Jesli nie to:
		// - ustala jej kolejny etap
		// - obraca postać twarzą w kierunku kolejnego segmentu ścieżki
		// - uruchamia odgłos przemieszczania
		// uruchamia funkcje go() ktora się zapętla przesuwając płynnie postać na kolejny segment
		this.move = function() {
			if (step == path.length) {
				// finish doszedłem do końca ścieżki
				this.moveStop();
				return;
			}

			nextStepX = path[step][0];
			nextStepY = path[step][1];

			nextStepXpx = nextStepX * ROS.base.tileWidth;
			nextStepYpx = nextStepY * ROS.base.tileHeight;

			var enX = parseInt(this.tilex,10);
			var enY = parseInt(this.tiley,10);
			var toX = parseInt(nextStepX,10);
			var toY = parseInt(nextStepY,10);

			// Określa kierunek postaci
			
			if (toX == (enX-1) && toY == enY) {rotate = 180;}
			else if (toX == (enX+1) && toY == enY) {rotate = 0;}
			else if (toX == enX && toY == (enY-1)) {rotate = 270;}
			else if (toX == enX && toY == (enY+1)) {rotate = 90;}
			else if (toX == (enX-1) && toY == (enY-1)) {rotate = 225;}
			else if (toX == (enX+1) && toY == (enY-1)) {rotate = 315;}
			else if (toX == (enX+1) && toY == (enY+1)) {rotate = 45;}
			else if (toX == (enX-1) && toY == (enY+1)) {rotate = 135;}

			// dzwiek kroków gdy ruszam na kolejnego tile'a
			var footstep_cat = ROS.dungeon.getSegment("map",ROS.dungeon.tileMap[nextStepY][nextStepX],'sound');
			this.playsound(footstep_cat);

			this.actualStats.movement -= 1; // obniżam punkt ruchu (odbywa się po każdym "Kroku" gracza)

			//ROS.tools.console('log','nowy start:'+actualrotate+'|'+rotate);

			// jesli nie zmienia kierunku
			if (actualrotate === rotate) {
				this.go();
			} else {
				this.makeTurn = true;
				this.turn(rotate,this.go);				
			}
		};


		// Metoda obraca postac twarzą w nowym kierunku (płynnie)
		this.turn = function(r,onFinish) {			
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

			if (actualrotate != finalAngle) {
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
				this.makeTurn = false; // skonczyl sie obracac
				(onFinish)();				
			}
		};

		

		// Metoda przesuwa postac.
		// Po dotarciu do kolejnego segmentu ścieżki zatrzymuje się i uruchamia move()
		this.go = function() {

			// na podstawie wybranego kierunku przesuwam postać
			switch(this.angle) {				
				case 0: this.moveRel(2,0); break;
				case 45: this.moveRel(2,2); break;
				case 90: this.moveRel(0,2); break;
				case 135: this.moveRel(-2,2); break;
				case 180: this.moveRel(-2,0); break;
				case 225: this.moveRel(-2,-2); break;
				case 270: this.moveRel(0,-2); break;				
				case 315: this.moveRel(2,-2); break;				
			}

			// jak tylko osiągne cel to mam sie zatrzymac
			if (nextStepXpx == this.left && nextStepYpx == this.top) {

				// zapisuje nowe położenie w tablicy 2d
				ROS.dungeon.gridHeroes[nextStepY][nextStepX] = this; // w nowe miejsce wpisuje referencje do obiektu gracza
				ROS.dungeon.gridHeroes[this.tiley][this.tilex] = 0; // w stare miejsce wpisuje 0 usuwając referencje

				this.tilex = nextStepX;
				this.tiley = nextStepY;

				// odświeża zakresy widzenia
				this.refreshLOS(); // postaci przesuwanego gracza
				ROS.dungeon.createLos(false); // globalny dla wszystkich

				// cierpienie po wejsciu na tile'a zadającego obrażenia
				var tiledamage = ROS.dungeon.getSegment("map",ROS.dungeon.tileMap[this.tiley][this.tilex],'danger');
				if (tiledamage > 0) {

					this.hurt(tiledamage);

					if (this.isDestroy()) {					
						// POSTAC JEST NIEPRZYTOMNA
						this.moveStop(); // zatrzymuje ruch						
						return; // przerywam zapetlenie metody go();
					}
				}

				/*
				// PRZYKLEJANIE DO WROGÓW
				// jeśli na chociaż jednym polu sasiadującym znajduje się wróg który posiada cechę GLUEACTUAL==1 to postac sie zatrzymuje i traci reszte punktów ruchu
				// sprawdzam każdy z 8 otaczającyh tileów
				var m,x1,x2,x3,y1,y2,y3;
				var g=0;

				x1 = this.tilex-1;
				x2 = this.tilex;
				x3 = this.tilex+1;
				y1 = this.tiley-1;
				y2 = this.tiley;
				y3 = this.tiley+1;

				if (ROS.dungeon.gridNpcs[y1][x1] !== 0) { m = ROS.dungeon.gridNpcs[y1][x1]; if (m !== 0 && m.glueActual == 1) g=1; }
				if (ROS.dungeon.gridNpcs[y2][x1] !== 0) { m = ROS.dungeon.gridNpcs[y2][x1]; if (m !== 0 && m.glueActual == 1) g=1; }
				if (ROS.dungeon.gridNpcs[y3][x1] !== 0) { m = ROS.dungeon.gridNpcs[y3][x1]; if (m !== 0 && m.glueActual == 1) g=1; }
				if (ROS.dungeon.gridNpcs[y1][x2] !== 0) { m = ROS.dungeon.gridNpcs[y1][x2]; if (m !== 0 && m.glueActual == 1) g=1; }
				// tutaj ja stoje :P
				if (ROS.dungeon.gridNpcs[y3][x2] !== 0) { m = ROS.dungeon.gridNpcs[y3][x2]; if (m !== 0 && m.glueActual == 1) g=1; }
				if (ROS.dungeon.gridNpcs[y1][x3] !== 0) { m = ROS.dungeon.gridNpcs[y1][x3]; if (m !== 0 && m.glueActual == 1) g=1; }
				if (ROS.dungeon.gridNpcs[y2][x3] !== 0) { m = ROS.dungeon.gridNpcs[y2][x3]; if (m !== 0 && m.glueActual == 1) g=1; }
				if (ROS.dungeon.gridNpcs[y3][x3] !== 0) { m = ROS.dungeon.gridNpcs[y3][x3]; if (m !== 0 && m.glueActual == 1) g=1; }
				if (g == 1) {
					this.actualStats.movement = 0;
					this.moveStop(); // zatrzymuje ruch
					return;
				}
				*/

				step++;
				this.move();
				return;
			}

			setTimeout(function() { self.go(); },15);
		};







		// Funkcja tworzy nowy obiekt przedmiotu o podanym identyfikatorze i dokłada go do niesionych przedmiotów bohatera
		// Jeśli w plecaku gracza nie ma miejsca na przedmiot nie jest on tworzony i funkcja zwraca false
		this.addStuff = function(id) {
			var x;

			for(x=0; x<this.itemsBackpack.length; x++) {
				// na pierwsze puste pole wstawia przedmiot
				if (this.itemsBackpack[x] == 0) {
					this.itemsBackpack[x] = new ROS.Item(id);
					return true;
				}
			}

			ROS.infoScroll.show('Brak miejsca w plecaku !');
			return false;
		};


		// Dodaje zaklęcie do wyuczonych zaklęć bohatera
		this.addSpell = function(id) {
			this.magicSpells.push(new ROS.Spell(id));
		};


		// Funkcja rozkłada ikony przedmiotów w plecaku na podstawie tablicy posidanych przedmiotów
		this.fillWearGrid = function() {
			var x,p;
			// przelatuje po tablicy niesionych przedmiotów i na podstawie danych obiektow rozkłada grafiki przedmiotów w plecaku
			for (x=0; x<this.itemsWear.length; x++) {
				p = ROS.tools.get('heroWearGridField_'+this.uniqid+'_'+x);
				if (this.itemsWear[x] !== 0) {
					p.appendChild(this.itemsWear[x].gfx);
				} else if (p.hasChildNodes()) {
					p.removeChild(p.firstChild);
				}
				p = null;
			}
		};


		this.fillBackpackGrid = function() {
			var x,p;
			// przelatuje po tablicy niesionych przedmiotów i na podstawie danych obiektow rozkłada grafiki przedmiotów w plecaku
			for (x=0; x<this.itemsBackpack.length; x++) {
				p = ROS.tools.get('heroBackpackGridField_'+this.uniqid+'_'+x)
				if (this.itemsBackpack[x] !== 0) {
					p.appendChild(this.itemsBackpack[x].gfx);
				} else if (p.hasChildNodes()) {
					p.removeChild(p.firstChild);
				}
				p = null;
			}
		};



		// Funkcja pokazuje liniowe statystyki przy ikonie gracza
		this.refreshIconStats = function() {
			this.istat.innerHTML = '<table cellpadding=0 cellspacing=0>'
			+ '<tr><td colspan=3><b><span style="font-size:13px;">'+this.heroRaceName+' '+this.getName()+'</span></b></td></tr>'
			+ '<tr><td>Życie:&nbsp;</td><td>'+ROS.tools.show_wykres(this.actualStats.life,this.cloneStats.life,2,0.8)+'</td><td>&nbsp;('+this.actualStats.life+'/'+this.cloneStats.life+')</td></tr>'
			+ '<tr><td>Magia:&nbsp;</td><td>'+ROS.tools.show_wykres(this.actualStats.mana,this.cloneStats.mana,3,0.8)+'</td><td>&nbsp;('+this.actualStats.mana+'/'+this.cloneStats.mana+')</td></tr>'
			+ '<tr><td>Ruch:&nbsp;</td><td>'+ROS.tools.show_wykres(this.actualStats.movement,this.cloneStats.movement,1,0.8)+'</td><td>&nbsp;('+this.actualStats.movement+'/'+this.cloneStats.movement+')</td></tr>'
			+ '<tr><td>Ataki:&nbsp;</td><td>'+ROS.tools.show_wykres(this.actualStats.attacks,this.cloneStats.attacks,1,0.8)+'</td><td>&nbsp;('+this.actualStats.attacks+'/'+this.cloneStats.attacks+')</td></tr>'
			+ '</table>';			
		};


		this.refreshBulbStats = function() {
			this.bulbYellow.style.opacity = ((this.actualStats.movement * 100) / this.cloneStats.movement) / 100;	
			ROS.tools.rotate(this.bulbRed,((((this.actualStats.life * 100) / this.cloneStats.life) * 1.8)+180),'100% 50%');
			ROS.tools.rotate(this.bulbBlue,-((((this.actualStats.mana * 100) / this.cloneStats.mana) * 1.8)+180),'0% 50%');
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


		// Metoda uruchamiana w chwili gdy gracz zostanie trafiony
		this.hurt = function(wounds) {			

			if (wounds > 0) {
				this.actualStats.life -= wounds;			
			}
			
			this.playsound('hit');

			// Animacja jest odtwarzana tylko jesli bohater znajduje sie w zasiegu wzroku
			if (ROS.dungeon.gridVisible[this.tiley][this.tilex] > 0) {
				var anim = new ROS.Animation(this.hurtAnim);
				anim.moveAbs(this.left,this.top);
				anim.ignite({
					repetitions:1,
					speed:100,					
					zindex:18
				});  // jednorazowe odtworzenie animacji zmieniającej klatki co 0,1 sek
			}

			// animacja wartości zadanych obrażeń
			var woundsAnim = new ROS.Animation('wounds');
			// pozycja x jest losowana od 1 do 48 aby kilka animacji nie zlewało sie ze sobą
			var aPozx = (this.left+(ROS.tools.dice(this.width)))-(woundsAnim.width/2);
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
				"speed": 50				
			});	

			// sprawdzamy czy obrazenia zadane przez atak spowodowaly śmierć
			if (this.actualStats.life <= 0) {				
				this.die(wounds); // CEL GINIE (jesli gracz to nieprzytomny)
				return;
			}

			this.refreshIconStats(); // odswieza liniowe wykresy przy ikonie gracza
			this.refreshBulbStats(); // odswieza liniowe wykresy przy ikonie gracza

			// odswiezenie otwartej karty gracza - dorobic!
		};

		this.heal = function(healPoints) {

			this.actualStats.life += healPoints;

			// actualStats nie mogą być nigdy wyższe niż cloneStats,
			if (this.actualStats.life > this.cloneStats.life) {
				// zmieniam ilosc odzyskanych punktów do takiej wartosci jaka mogła byc uleczona
				healPoints = this.cloneStats.life - this.actualStats.life;
				this.actualStats.life = this.cloneStats.life				
			}

			// Jesli postać była nieprzytomna to teraz znowu odzyskuje życie
			if (this.unconscious) {
				this.undie();
			}

			// animacja wartości odzyskanych punktów życia
			var woundsAnim = new ROS.Animation('wounds');
			// pozycja x jest losowana od 1 do 48 aby kilka animacji nie zlewało sie ze sobą
			var aPozx = (this.left+(ROS.tools.dice(this.width)))-(woundsAnim.width/2);
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
				"speed": 50				
			});	

			this.refreshIconStats(); // odswieza liniowe wykresy przy ikonie gracza
			this.refreshBulbStats(); // odswieza liniowe wykresy przy ikonie gracza

		};

		// Metoda uruchamiana w chwili gdy gracz zostanie zabity
		this.die = function(wounds) {
			// jesli juz jest nieprzytowmny to wyjdz (moze sie tak zdarzyc jesli są wywolywane zdarzenia odbierajace zycie kazdemu)
			if (this.unconscious) return;

			this.playsound('hit');

			ROS.playerPath.clearPath();

			this.obj.style.background = 'url(gfx/warriors/rip.png)';
			this.bulb.style.opacity = 0.3;

			
			this.actualStats.life = 0;
			this.refreshIconStats(); // odswieza liniowe wykresy przy ikonie gracza
			this.refreshBulbStats(); // odswieza liniowe wykresy przy ikonie gracza
			this.unconscious = true;

			// Aktualizuje przestrzeń obszaru widzianego przez graczy
			ROS.dungeon.createLos(true); // odswieza globalne

			// Sprawdza czy wszyscy nie żyją
			var allDead = true;
			var p;
			for (p in ROS.base.heroes) {
				if (ROS.base.heroes[p].actualStats.life > 0) {
					allDead = false;
				}
			}

			if (allDead) {				
				ROS.infoScroll.show('Wszyscy bohaterowie nie żyją !');
			}

		};

		// Metoda budzi gracza do gry ze stanu nieprzytomnego
		this.undie = function() {
			this.obj.style.backgroundImage = 'url('+this.gfx['walk']+')';
			this.bulb.style.opacity = 1;
			this.unconscious = false;
			
			ROS.dungeon.createLos(true);

			if (ROS.base.gamePhaseName === 'heroes') ROS.hud.refresh();
			this.refreshIconStats(); // odswieza liniowe wykresy przy ikonie gracza
			this.refreshBulbStats(); // odswieza liniowe wykresy przy ikonie gracza
		};


		this.rightHandWeapon = function() {
			var lw = this.itemsWear[5];
			var rw = this.itemsWear[4];

			// jesli w prawej nic nie mam i w lewej nic nie mam lub mam tam cos co nie jest bronią to ustawiam ze walcze pieściami
			// Zasada jest prosta 
			// Wlaczyś pięściami mozna tylko jesli w obu rękach nie ma broni
			if (rw === 0 && (lw === 0 || (lw instanceof ROS.Item && !lw.isWeapon() ) ) ) {
				return this.fists;
			}

			// Jesli tu jestem to znaczy ze w lewej rece mam bron czyli prawa zwraca false bede walczyl tylo lewą
			if (rw === 0) {
				return false;
			}

			// jesli tu jestem to znaczy ze w prawej mam bron i ja zwraca
			return rw;
		};
		this.leftHandWeapon = function() {
			var lw = this.itemsWear[5];
			
			// jesli w lewej mam bron
			if (lw instanceof ROS.Item && lw.isWeapon()) {
				return lw;
			}

			// jesliw  lewej nie mam broni to nic nie robi
			return false;
		};

		this.getName = function() {
			return name;
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


		this.clearLOS();

		this.refreshIconStats(); // maluje startowe wykresy statów przy ikonie
		this.refreshBulbStats(); // maluje startowe wykresy statów przy ikonie



	};

})();