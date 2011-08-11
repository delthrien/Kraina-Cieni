// Główny obiekt gry
var ROS = {};

// Ładowanie tablicy grafik do cacha przeglądarki
// Posiada zdolność równoległego ładowania wielu zdjęć jednocześnie ! (40% szybsza)
ROS.preloadImages = (function() {

	return {
		onComplete: function(){},
		onFinishEach: function(){},
		all: 0,
		images: [], // Tablica obiektów grafik
		queue: [], // Tablica stringów oczekujących na załadowanie do cache
		now: '',

		// Metoda kolejkuje grafiki, przekazuje się jej tablice ze stringami		
		addSingle: function(arr) {
			ROS.preloadImages.queue = ROS.preloadImages.queue.concat(arr);
		}, 
		
		addGroup: function(group) {
			var x,t,tab,path,ext;
			for(t in group) {
				tab = group[t];
				path = tab[0]; // Pierwsza komorka tablicy zawiera sciezke
				ext = tab[1]; // Druga komórka zawiera rozszerzenie
				for(x=2; x<tab.length; x++) {				
					ROS.preloadImages.queue.push(path+'/'+tab[x]+'.'+ext);					
				}
			}			
		},
		
		// Rozpoczyna równoległe ładowanie obrazków z kolejki
		start: function() {			
		    ROS.preloadImages.all = ROS.preloadImages.queue.length;
		    while(ROS.preloadImages.queue.length > 0) {
		    	// Ściąga obrazek ze szczytu kolejki i ładuje do pamięci
		        ROS.preloadImages.loadImage(ROS.preloadImages.queue.shift());
		    }		    
		},
		
		// Ładuje grafike do pamieci, odpala eventy
		loadImage: function(src){
			var im = new Image;		    
		    im.onerror = function() {
		    	ROS.tools.console('warn',src+' | Error');
		    	ROS.preloadImages.all -= 1; // Zmniejsza informacje o ilość wszystkich o jeden
		    }
		    im.onload = function() {
		    	ROS.preloadImages.now = src;
		        ROS.preloadImages.images.push(im); // dodaje grafike do tablicy
		        (ROS.preloadImages.onFinishEach)();		        
		        if(ROS.preloadImages.all === ROS.preloadImages.images.length) {
		        	(ROS.preloadImages.onComplete)();
		        }
		    }
		    im.src = src; // Pobiera zdjęcie
		    im = null;
		}		
	}

})();


// Ładowanie tablicy skryptów do cacha przeglądarki
// Posiada zdolność równoległego ładowania wielu skryptów jednocześnie ! (40% szybsza)
ROS.preloadScripts = (function() {
	
	return {
		onComplete: function(){},
		onFinishEach: function(){},
		all: 0,
		scripts: [], // Tablica załadowanych stringow
		queue: [], // Tablica stringów oczekujących na załadowanie
		now: '',

		// Metoda kolejkuje skrypty, przekazuje się jej tablice z nazwami plikow js
		add: function(arr) {
			ROS.preloadScripts.queue = ROS.preloadScripts.queue.concat(arr);
		}, 
				
		// Rozpoczyna równoległe ładowanie skryptów z kolejki
		start: function() {			
		    ROS.preloadScripts.all = ROS.preloadScripts.queue.length;
		    while(ROS.preloadScripts.queue.length > 0) {
		    	// Ściąga nazwe ze szczytu kolejki i ładuje do pamięci
		        ROS.preloadScripts.loadScript(ROS.preloadScripts.queue.shift());
		    }		    
		},

		loadScript: function(url) {
			// dodanie taga skryptowego do head'a
			var head = document.getElementsByTagName('head')[0];
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = url;

			script.onerror = function() {
		    	ROS.tools.console('warn',url+' | Error');
		    	ROS.preloadScripts.all -= 1; // Zmniejsza informacje o ilość wszystkich o jeden
		    }			
			script.onload = function() {
		    	ROS.preloadScripts.now = url;
		        ROS.preloadScripts.scripts.push(url); // dodaje skrypt do tablicy
		        (ROS.preloadScripts.onFinishEach)();		        
		        if(ROS.preloadScripts.all === ROS.preloadScripts.scripts.length) {
		        	(ROS.preloadScripts.onComplete)();
		        }
		    }
			head.appendChild(script);
			script = null;
			head = null;
		}

	}	

})();




// Obsługa okienta z belką postępu wgrywania
ROS.progressBar = (function() {
	
	var barSize = [350,15];
	var barbox = null;
	var bar = null;
	var text = null;
	var header = '';

	return {
		
		create: function() {
			text = document.createElement("div");
			var t = text.style;
			t.position = 'absolute';			
			t.width = barSize[0]+'px';
			t.height = 40+'px';	
			t.bottom = 59+'px';
			t.right = 30+'px';
			t.display = 'block';
			t.fontSize = 11+'px'; 
			t.fontFamily = 'Comic Sans MS'; 
			t.color = '#eeeeee';
			document.body.appendChild(text);

			// barBox
			barbox = document.createElement("div");
			var bb = barbox.style;
			bb.position = 'absolute';
			bb.width = barSize[0]+'px';
			bb.height = barSize[1]+'px';	
			bb.bottom = 30+'px';
			bb.right = 30+'px';
			bb.display = 'block';						
			document.body.appendChild(barbox);

			bar = document.createElement("div");
			var pb = bar.style;
			pb.position = 'absolute';
			pb.width = 0+'px';
			pb.height = barSize[1]+'px';	
			pb.top = 0+'px';
			pb.left = 0+'px';
			pb.display = 'block';			
			pb.background = '#ff0000';
			barbox.appendChild(bar);

		},

		setHeader: function(txt) {
			header = txt;
		},

		setColor: function(c) {
			bar.style.background = c;			
			barbox.style.mozBoxShadow = '0 0 5px 5px '+c;
			barbox.style.webkitBoxShadow = '0 0 5px 5px '+c;
			barbox.style.boxShadow = '0 0 5px 5px '+c;			
		},

		size: function(actual,all,txt) {

			var widthPercent = (actual / all) * 100;
			text.innerHTML = '<span style="font-size:18px;">' + header + '</span>' + (header !== '' ? '<br>' : '') + txt + ' (' + Math.ceil(widthPercent) + '%)';
			bar.style.width = Math.ceil((widthPercent / 100) * 350) + 'px';
		},

		hide: function() {
			text.style.display = 'none';
			barbox.style.display = 'none';			
		},
	}

})();



// Jeśli przeglądarka to Firefox to zwraca TRUE jesli nie firefox to FALSE
ROS.browserTest = function() {
	var op,sa,ch,ff,ie,ko;
	var nua = navigator.userAgent;

	ch=(nua.indexOf('Chrome')!==-1);
	op=(nua.indexOf('Opera')!==-1);
	sa=(nua.indexOf('Safari')!==-1);
	ko=(!sa && (nua.indexOf('Konqueror')!==-1) ) ? true : false;
	ff=( (!sa && !ko ) && ( nua.indexOf('Gecko')!==-1 ) ) ? true : false;
	ie=((nua.indexOf('MSIE')!==-1)&&!op);

	if (ff || ch) {
		return true;
	}	
	return false;      
};


// Uruchamia wgrywanie wszystkich skryptów JS oraz grafik
(function() {	
	if (!ROS.browserTest()) {
		document.body.style.color = '#ccc';
		document.body.style.background = 'url(gfx/bg.jpg)';
		document.body.style.fontSize = 12+'px'; 
		document.body.style.fontFamily = 'Comic Sans MS'; 
		document.body.innerHTML = '<center><br /><br /><span style="font-size:22px; color:#fff;">Kraina Cieni</span><br /><br />Uwaga: gra do poprawnego działania wymaga przeglądarki <span style="font-size:14px; color:#fff;">Firefox 4+</span> lub <span style="font-size:14px; color:#fff;">Chrome 11+</span>.</center>';	
		return;
	}
	

	ROS.progressBar.create();
	
	// Skrypty BIG
	ROS.preloadScripts.add([
	'js/ROS.tools.js',
	'js/ROS.fly.js',
	'js/ROS.Palette.js',
	'js/ROS.mouse.js',
	'js/ROS.keyboard.js',
	'js/ROS.Triggers.js',
	'js/ROS.Animation.js',
	'js/ROS.effects.js',
	'js/ROS.menuPopup.js',
	'js/ROS.Sound.js',
	'js/ROS.Door.js',
	'js/ROS.dungeon.js',
	'js/ROS.Item.js',
	'js/ROS.Spells.js',	
	'js/ROS.Npc.js',
	'js/ROS.Hero.js',	
	'js/ROS.Container.js',
	'js/ROS.playerFight.js',
	'js/ROS.playerPath.js',
	'js/ROS.events.js',
	'js/ROS.console.js',
	'js/ROS.hud.js',
	'js/ROS.npcMode.js',
	'js/ROS.main.js']);
	

	// Grafiki
	ROS.preloadImages.addGroup([
	['gfx/warriors/dwarf','png'    ,'walk'],				
	['gfx/warriors/barbarian','png','walk'],	
	['gfx/warriors/elf','png'      ,'walk'],
	['gfx/warriors/wizard','png'   ,'walk'],

	['gfx/npc/spider','png'    ,'walk','dead','deadIcon'],	
	['gfx/npc/blackwidow','png','walk','dead','deadIcon'],	
	['gfx/npc/dummy','png'     ,'walk','dead','deadIcon'],
	
	['gfx/mapLayers/map','png','stone1','stone2','stone3','stone4',
							   'water1','water2',
							   'dirt1','dirt2',
							   'acid1',
							   'grass1',
							   'lava1','lava2',
							   'ice1','ice2'],
		
	['gfx/mapLayers/stuff','png','stonewall1','stonewall2',								 
								 'column1',
								 'lavawall1',
								 'icewall1','icewall2',

								 'chest'    ,'chestIcon',   'chestDestroy',
								 'dustpile' ,'dustpileIcon',
								 'barrel'   ,'barrelIcon',  'barrelDestroy',
								 'miscstuff','miscstuffIcon',
								 'barrelopen',],

	['gfx/mapLayers/doors','png','woodClose1','woodClose2','woodClose3','woodClose4', 'woodDestroy1','woodDestroy2','woodDestroy3','woodDestroy4',
	                             'webClose1','webClose2','webClose3','webClose4',     'webDestroy1','webDestroy2','webDestroy3','webDestroy4'],
	
	['gfx/path','png','skos-koniec','linia-koniec','skos','linia','zakret','kolano','ostry-lewo','ostry-prawo','lekki-lewo','lekki-prawo'],	
	['gfx/buttons','png','open_chest','open_door','end_turn','mechanics','gameinfo','empty'],

	['gfx/items','png','damagedItem','dagger','magicdagger','potion_wounds','potion_empty','shield','bow','crossbow','gold','goldpile'],

	['gfx/sprites','png','aim','arrow','blood','playermark','slash','swing','lightstorm','smoke']
	

	]);
	ROS.preloadImages.addSingle([
	'gfx/blank.gif',	
	'gfx/warriors/rip.png',	
	'gfx/scroll.gif',	
	'gfx/mmapa.png',			
	'gfx/mmapa_mini.png',		
	'gfx/quickmenu.png',				
	'gfx/bg.jpg',
	'gfx/bg_ice.jpg',
	'gfx/body_items.png',

	'gfx/field.png',
	'gfx/fieldlight.png',

	'gfx/wykresbg1.gif',
	'gfx/wykresbg2.gif',
	'gfx/wykresbg3.gif',

	'gfx/cursor_gauntlet.gif',
	'gfx/flybg.jpg',	
	'gfx/palette-close.png',
	
	'gfx/palettebg.gif',
	'gfx/palettebg_small.gif',

	'gfx/hud5_2.png',
	'gfx/hud5_3.png',
	'gfx/hud5_4.png',	
	'gfx/bulbYellow.png',
	'gfx/bulb2.png',
	'gfx/bulb1.png',
	'gfx/bulbRed.png',
	'gfx/bulbBlue.png',
	'gfx/choosenBulb.png'
	]);




	
	ROS.preloadScripts.onFinishEach = function() {
		ROS.progressBar.size(ROS.preloadScripts.scripts.length,ROS.preloadScripts.all,ROS.preloadScripts.now);
	}	
	ROS.preloadScripts.onComplete = function() {
		
		// Czyści pasek
		// 0,1 aby nie bylo dzielenia przez zero wewnatrz metody
		ROS.progressBar.size(0,1,'Proszę czekać...'); 

		ROS.preloadImages.onFinishEach = function() {
			ROS.progressBar.size(ROS.preloadImages.images.length,ROS.preloadImages.all,ROS.preloadImages.now);
		}
		ROS.preloadImages.onComplete = function() {
			ROS.progressBar.hide();	
			ROS.load();
		}
		


		// II - Ładowanie grafik		
		ROS.progressBar.setColor('#ff0000');
		ROS.progressBar.setHeader('Ładowanie grafiki:');	
		ROS.preloadImages.start();
	}

	// I - Ładowanie skryptów JS	
	ROS.progressBar.setColor('#00ff00');
	ROS.progressBar.setHeader('Ładowanie skryptów:');
	ROS.preloadScripts.start();

})();