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

// Div przechowujący menu z opcjami
ROS.flyMenu = (function() {

	return {
		area: null,
		active: false,

		// Wywoływane raz
		create: function() {
			if (ROS.flyMenu.area == null) {
				ROS.flyMenu.area = document.createElement("div");
				var fm = ROS.flyMenu.area.style;
				fm.position = 'absolute';
				fm.zIndex = 650;
				fm.left = -2000+'px';
				fm.top = -2000+'px';
				fm.display = 'none';
				document.body.appendChild(ROS.flyMenu.area);
			}
		},
		
		show: function() {
			ROS.flyMenu.area.style.display = 'block';
			ROS.flyMenu.active = true;
		},

		hide: function() {
			ROS.flyMenu.area.style.display = 'none';
			ROS.flyMenu.active = false;
			ROS.tools.clearNodes(ROS.flyMenu.area);
		},

		move: function(x,y) {
			ROS.flyMenu.area.style.left = x+'px';
			ROS.flyMenu.area.style.top = y+'px';
		},

		fill: function(menu) {
			ROS.flyMenu.area.innerHTML = null;
			ROS.tools.clearNodes(ROS.flyMenu.area);
			ROS.flyMenu.area.appendChild(menu);			
			ROS.flyMenu.show();
			menu = null;
		}
		
	};

})();





// Dymek
ROS.fly = (function() {
	
	var flyDelay = null;
	var flyMove = null;	
	var flyWidth, flyHeight;
	var repulsion = 50; // moment wyczucia zblizenia do krawedzi okna
	var displacement = 20; // przesunięcie w stosunku do kursora			

	return {
		area: null,
		active: false,

		// Wywoływane raz 
		create: function() {
			if (ROS.fly.area == null) {
				ROS.fly.area = document.createElement("div");
				var fs = ROS.fly.area.style;
				fs.position = 'absolute';
				fs.zIndex = 10000; 
				fs.width = 100+'px'; 				
				fs.padding = 3+'px'; 
				fs.border = '1px solid #815a3b'; 
				fs.background = '#777777 url(gfx/flybg.jpg)';
				fs.fontSize = 11+'px'; 
				fs.fontFamily = 'Comic Sans MS'; 
				fs.color = '#000000';
				fs.visibility = 'hidden';
				fs.MozBorderRadius = '6px';
				fs.borderRadius = '6px';
				fs.WebkitBorderRadius = '6px';
				document.body.appendChild(ROS.fly.area);
				fs = null;
			}
		},		
		

		show: function(txt,bgcolor,w,timeDelay,node) {			
			
			//ROS.tools.console('log','show: '+ROS.fly.area.style.top +' / '+ROS.fly.area.style.left+' / '+ROS.fly.area.style.visibility);

			var k;	
			var de = timeDelay || 0;
			var wi = w || 100;	
			
			ROS.fly.area.style.top = 0+'px';
			ROS.fly.area.style.left = 0+'px';
			ROS.fly.area.style.width = wi+'px';
			 
			ROS.tools.clearNodes(ROS.fly.area);
			ROS.fly.area.innerHTML = null;

			if (txt) {
				ROS.fly.area.innerHTML = txt; 
				txt = null;				
			}

			if (node) {
				ROS.fly.area.appendChild(node);	
				node = null;
			}
			
			flyWidth = parseInt(ROS.fly.area.offsetWidth,10);
			flyHeight = parseInt(ROS.fly.area.offsetHeight,10);
						
			switch(bgcolor) {
				default:
				case 1: k = '#dcbb85'; break; // normalny
				case 2: k = '#e9999e'; break; // czerwony		
			}
			ROS.fly.area.style.backgroundColor = k;
			ROS.fly.area.style.opacity = .8;			

			if (de > 0) {
				flyDelay = setTimeout(
					function() { 						
						ROS.fly.active = true;
						ROS.fly.move();							
						ROS.fly.area.style.visibility = 'visible';					
					},de
				);
			} else {				
				ROS.fly.active = true;
				ROS.fly.move();				
				ROS.fly.area.style.visibility = 'visible';					
			}
		},

		hide: function() {			
			if (flyDelay) {		
				clearTimeout(flyDelay);
				flyDelay = null;
			}
			if (flyMove) {		
				clearTimeout(flyMove);
				flyMove = null;
			}
			ROS.tools.clearNodes(ROS.fly.area);
			ROS.fly.area.innerHTML = "";
			ROS.fly.active = false;
			ROS.fly.area.style.visibility = 'hidden'; 
			ROS.fly.area.style.top = 0+'px';
			ROS.fly.area.style.left = 0+'px';			
		},

		move: function() { 			
			if (ROS.mouse.x > (ROS.base.wSize[0] - flyWidth - repulsion)) {
				// pokaż dymek z lewej
				ROS.fly.area.style.left = parseInt(ROS.mouse.x - flyWidth - displacement,10)+'px'; 
			} else {
				// pokaz dymek z prawej
				ROS.fly.area.style.left = parseInt(ROS.mouse.x + displacement,10)+'px'; 
			}

			if (ROS.mouse.y > (ROS.base.wSize[1] - flyHeight - repulsion)) {
				// pokaż dymek na gorze
				ROS.fly.area.style.top = parseInt(ROS.mouse.y - flyHeight - displacement,10)+'px'; 
			} else {
				// pokaz dymek na dole
				ROS.fly.area.style.top = parseInt(ROS.mouse.y + displacement,10)+'px'; 
			}
			
			flyMove = setTimeout(ROS.fly.move,10);
		}
			
	};

})();




// Div do przenoszenia przedmiotów
ROS.flyBag = (function() {
	
	var flyBagMove = null;
	var displacement = 30; // przesunięcie w stosunku do kursora			
	
	return {
		area: null,	// referencja obiektu DOM (div przenoszący ikone przedmiotu)	
		active: false, // włącza i wyłącza wodzenie diva za kursorem myszki
		item: null, // przechowuje referencje przenoszonego przedmiotu
		targets: [], // przechowuje identyfikatory obiektów które mogą przyjąć przenoszony przedmiot
		from: null, // przechowuje informacje o nazwie przestrzeni w ktorej sie znajduje przedmiot (backpack,wear,container)
		owner: null, // referencja do wlasciciela (hero, container)
		giveBack: null, // Odpowiada za zwrot przedmiotu na pole z ktorego został podniesiony

		clear: function() {
			ROS.flyBag.area.innerHTML = ''; // usuwa obrazek z flyBaga
			ROS.flyBag.giveBack = null;
			ROS.flyBag.item = null;
			ROS.flyBag.from = null;
			ROS.flyBag.owner = null;
			ROS.flyBag.hide();
		},

		// Pobiera identyfikatory obiektów które mogą przyjąć przenoszony przedmiot
		// Bierze pod uwage bohaterów oraz kontenery
		// Sprawdza pola sąsiadujące z polem na ktorym znajduje sie aktualny 
		// wlasiciel przedmiotu
		setTargets: function(tx,ty) {
			ROS.flyBag.targets = []; // czysci tablice
            function testTile(x,y) {
            	if (ROS.dungeon.gridContainers[y][x] !== 0) {
            		ROS.flyBag.targets.push(ROS.dungeon.gridContainers[y][x].uniqid);
            	}
            	if (ROS.dungeon.gridHeroes[y][x] !== 0) {
            		ROS.flyBag.targets.push(ROS.dungeon.gridHeroes[y][x].uniqid);
            	}
            }		
            testTile(tx,ty); // dodaje samego siebie
            if (ty > 0) { testTile(tx,ty-1); } // N
            if (tx < 99 && ty > 0) { testTile(tx+1,ty-1); } // NE
            if (tx < 99) { testTile(tx+1,ty); } // E
			if (ty < 99 && tx < 99) { testTile(tx+1,ty+1); } // SE
			if (ty < 99) { testTile(tx,ty+1); } // S
            if (ty < 99 && tx > 0) { testTile(tx-1,ty+1); } // SW
            if (tx > 0) { testTile(tx-1,ty); } // W
        	if (tx > 0 && ty > 0) { testTile(tx-1,ty-1); } // NW
		},

		// Sprawdza czy id znajduje sie w tablicy celów
		inTargets: function(id) {
			var x;
			for(x in ROS.flyBag.targets) {
				if (ROS.flyBag.targets[x] === id) {
					return true;
				}
			}
			return false;
		},

		// Uruchamiane raz
		create: function() {
			if (ROS.flyBag.area == null) {
				ROS.flyBag.area = document.createElement("div");
				var fb = ROS.flyBag.area.style;
				fb.position = 'absolute';
				fb.zIndex = 9000; 
				fb.width = 48+'px'; 
				fb.height = 48+'px';				
				fb.visibility = 'hidden';
				fb.pointerEvents = 'none';
				// Jesli flyBag był blisko kursora zdarzało się że przy szybkich przesunięciach nie nadąrzał za kursorem 
				// i program odnotowywal moment w ktorym kursor nachodzil na flyBag co powodowało wyświetlenie migawek 
				// opisu przedmiotu przenoszonego
				ROS.tools.addEvent(ROS.flyBag.area,'mouseover',ROS.fly.hide);
				
				document.body.appendChild(ROS.flyBag.area);
				fb = null;
			}
		},
		



		show: function() {			
			ROS.flyBag.active = true;
			ROS.flyBag.move();
			ROS.flyBag.area.style.visibility = 'visible';
		},

		hide: function() { 							
			ROS.flyBag.area.style.visibility = 'hidden';
			if (flyBagMove) {		
				clearTimeout(flyBagMove);
				flyBagMove = null;
			}
			ROS.flyBag.active = false;
		},

		move: function() {			
			ROS.flyBag.area.style.left = (ROS.mouse.x - displacement)+'px'; 
			ROS.flyBag.area.style.top = (ROS.mouse.y - displacement)+'px';
						
			flyBagMove = setTimeout(ROS.flyBag.move,10); 				
		}
			
	};

})();






// Skrol informacyjny, zawierający treść, pojawia się centralnie
ROS.infoScroll = (function() {
	
	var hidetimer = null;

	return {
		area: null,
		innerArea: null,
		active: false,
		veil: null,
		onHidden: null,

		create: function() {
			if (ROS.infoScroll.area == null) {
				ROS.infoScroll.area = document.createElement("div");
				var i = ROS.infoScroll.area.style;
				i.position = 'absolute'; 
				i.width = 250+'px'; 				
				i.top = Math.floor(ROS.base.wSize[1]/2) - 100 + 'px'; 
				i.left = Math.floor(ROS.base.wSize[0]/2) - 125 + 'px';  				
				i.mozBorderRadius = '20px';
				i.borderRadius = '20px';
				i.webkitBorderRadius = '20px';				
				i.zIndex = 5000;
				i.padding = 2+'px';				
				i.border = '15px solid transparent';				
    			i.mozBoxShadow = '0 0 28px #000000';
				i.webkitBoxShadow = '0 0 28px #000000';
				i.boxShadow = '0 0 28px #000000';
				i.display = 'none';
				i.opacity = 1;
				document.body.appendChild(ROS.infoScroll.area);	
				ROS.tools.addEvent(ROS.infoScroll.area,'click',ROS.infoScroll.hide);

				ROS.infoScroll.innerArea = document.createElement("div");
				var ia = ROS.infoScroll.innerArea.style;
				ia.position = 'relative';
				ia.background = 'url(gfx/palettebg2.jpg)';
				ia.border = '2px solid #211d13';
				ia.mozBorderRadius = '12px';
				ia.borderRadius = '12px';
				ia.webkitBorderRadius = '12px';				
				ia.padding = 20+'px';
				ia.textAlign = 'center'; 
				ia.fontSize = 16+'px'; 
				ia.fontFamily = 'Comic Sans MS';
				ia.color = '#333333';
				ROS.infoScroll.area.appendChild(ROS.infoScroll.innerArea);
				
				ROS.infoScroll.veil = document.createElement("div");
				var v = ROS.infoScroll.veil.style;
				v.position = 'absolute';
				v.overflow = 'hidden';
				v.width = ROS.base.wSize[0]+'px';
				v.height = ROS.base.wSize[1]+'px';
				v.top = 0+'px';
				v.left = 0+'px';
				v.display = 'none';
				v.background = '#000000';
				v.opacity = 0.1;
				v.zIndex = 4990;
				document.body.appendChild(ROS.infoScroll.veil);
			}
		},
		
		refresh: function() {
			ROS.infoScroll.area.style.top = Math.floor(ROS.base.wSize[1]/2) - (ROS.infoScroll.area.offsetHeight / 2) + 'px'; 
			ROS.infoScroll.area.style.left = Math.floor(ROS.base.wSize[0]/2) - (parseInt(ROS.infoScroll.area.style.width)/2) + 'px'; 
			ROS.infoScroll.veil.style.width = ROS.base.wSize[0]+'px';
			ROS.infoScroll.veil.style.height = ROS.base.wSize[1]+'px';
		},
		
		show: function(txt,width,veil,onHidden) {			
			clearTimeout(hidetimer);

			ROS.infoScroll.area.style.width = (width || 250) + 'px';									
			
			ROS.tools.clearNodes(ROS.infoScroll.innerArea);
			ROS.infoScroll.innerArea.innerHTML = txt;			

			//ROS.tools.console('log',ROS.infoScroll.area.offsetHeight+'px');

			if (veil) {
				ROS.infoScroll.veil.style.opacity = veil;	
				ROS.infoScroll.veil.style.display = 'block';
			} else {
				ROS.infoScroll.veil.style.opacity = 0.1; // ustawia na default
				ROS.infoScroll.veil.style.display = 'none';
			}

			ROS.infoScroll.area.style.display = 'block';
			ROS.infoScroll.active = true;

			ROS.infoScroll.refresh();

			if (onHidden) {
				ROS.infoScroll.onHidden = onHidden;
			}
		},

		hide: function() {
			ROS.infoScroll.veil.style.display = 'none';
			ROS.infoScroll.veil.style.opacity = 0.1; // ustawia na default
			ROS.infoScroll.hidden();	
		},

		hidden: function() {
			var a = parseFloat(ROS.infoScroll.area.style.opacity).toFixed(2);			
			var an = (a - 0.08).toFixed(2);
			
			if (an < 0) {
				if (ROS.infoScroll.onHidden) {
					(ROS.infoScroll.onHidden)();
					ROS.infoScroll.onHidden = null;
				}
				ROS.infoScroll.area.style.display = 'none';
				ROS.infoScroll.area.style.opacity = 1; // ustawia na default
				clearTimeout(hidetimer);
				ROS.infoScroll.active = false;				
				return;
			} else {
				ROS.infoScroll.area.style.opacity = an;
			}

			hidetimer = setTimeout(ROS.infoScroll.hidden,10);
		}

	};

})();




// Skrol informacyjny, zawierający treść, pojawia się w lewej dolnej czesci okna
ROS.microScroll = (function() {
	
	return {
		area: null,
		active: false,

		create: function() {
			if (ROS.microScroll.area == null) {
				ROS.microScroll.area = document.createElement("div");
				var i = ROS.microScroll.area.style;
				i.position = 'absolute'; 
				i.width = 'auto'; 
				i.height = 'auto'; 
				i.bottom = 98 + 'px'; 
				i.left = 0 + 'px';  
				i.opacity = 0.5;
				i.zIndex = 400;
				i.padding = 0;
				i.display = 'none';
				document.body.appendChild(ROS.microScroll.area);				
			}
		},
		
		show: function(txt,color) {			
			
			if (ROS.base.activePlayer) {
				var newInfo = new ROS.Animation('microScrollInfo');
				newInfo.obj.style.position = 'relative';
				newInfo.innerObj.style.position = 'relative';
				ROS.microScroll.area.appendChild(newInfo.obj);
				
				var bubble = document.createElement("div");
				var b = bubble.style;
				b.position = 'relative'; 
				b.width = 'auto'; 
				b.height = 'auto'; 
				b.zIndex = 410;
				b.padding = '5px';
				b.margin = '5px';
				b.textAlign = 'left'; 
				b.fontSize = 12+'px'; 
				b.fontFamily = 'Comic Sans MS'; 
				b.background = '#000000';
				b.mozBorderRadius = '15px';
				b.borderRadius = '15px';
				b.webkitBorderRadius = '15px';
				b.mozBoxShadow = '2px 2px 10px #000';
				b.webkitBoxShadow = '2px 2px 10px #000';
				b.boxShadow = '2px 2px 10px #000';
				b.color = color;				
				bubble.innerHTML = txt;

				newInfo.moveAbs(0,0);
				newInfo.innerObj.appendChild(bubble);
				newInfo.ignite({
					"repetitions": 60,
					"speed": 100,
					"transform": {
	                     "mode": 2, // jesli 1 to modyfikuje dla całej długosci animacji jesli 0 to dotyczy jednego powtorzenia
	                     "startFrame":40,
	                     "start": {                     
	                        "opacity": 1
	                     },
	                     "endFrame":60,
	                     "end": {                     
	                        "opacity": 0                  
	                     }
	                },
	                "zindex": 10000				
				});
					
			}

			ROS.microScroll.area.style.display = 'block';
			ROS.microScroll.active = true;			
		},

		hide: function(noFade) {
			ROS.microScroll.area.style.display = 'none';
			ROS.microScroll.active = false;				
		}		

	};

})();
