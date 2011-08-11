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

// Paletka pokazująca informacje o mechanice gry
ROS.Palette = (function() {
	
	return function(w,h,n) {
		var self = this;				
		var pInside;		
		var moveTimeout;

		this.uniqid = 'paletka#'+ROS.tools.dice(100000);

		this.pDiv;

		// Do tablicy palettes wpisuje referencje
		// PO CO ? Np. aby łatwo sprawdzić czy wszystkie palety są zamkniete
		ROS.base.palettes[this.uniqid] = this;


		// Zmienne publiczne
		this.name = n;		
		this.active = false,
		this.moving = false;

		// Metody publiczne
		this.insertHTML = function(kod) {
			pInside.innerHTML = kod;	
		};

		this.insertNodes = function(node) {
			pInside.appendChild(node);	
		};

		this.addLine = function(txt) {
			pInside.innerHTML += txt;
			pInside.scrollTop = pInside.scrollHeight; // przewija bloczek na koniec
		};

		this.center = function() {
			// ustawia centralnie
			this.pDiv.style.left = (Math.floor(ROS.base.wSize[0]/2) - Math.floor(parseInt(this.pDiv.style.width,10)/2)) + 'px';
			this.pDiv.style.top = (Math.floor(ROS.base.wSize[1]/2) - Math.floor(parseInt(this.pDiv.style.height,10)/2) - 45) + 'px';
		};

		this.show = function(center) {
			if (center === undefined || center === true) { 			
				this.center();				
			}			
			// ustawia kolejnosc wyciąga paletke na pierwszy plan
			this.recalculateOrder();
			// pokazuje
			this.pDiv.style.display = 'block';
			self.active = true;
		};

		this.hide = function() {
			self.center();
			this.pDiv.style.display = 'none';			
			self.active = false;
		};

		
		// przydziela nowe z-indexy wszystkim paletkom
		// tej przydziela najwyższy
		// z-indexy paletek rozpoczynają od 501
		this.recalculateOrder = function() {			
			var ilosc = 0;
			var i = 0;
			var xPal;
			for(xPal in ROS.base.palettes) {
				ilosc += 1;
			}
			
			for(xPal in ROS.base.palettes) {				
				if (ROS.base.palettes[xPal] === self) {
					// Jak to działa: np jesli petla ma 4 obiegi a na drugim miejscu jest ta paletka 
					// to pętla wygeneruje 501,505,503,504
					ROS.base.palettes[xPal].setZindex(501+ilosc);
				} else {
					ROS.base.palettes[xPal].setZindex(501+i);
				}
				i++;
			}			
		};

		this.setZindex = function(z) {
			this.pDiv.style.zIndex = z;
		};

		this.startMove = function() {
			// zapamietuje pozycje w chwili nacisniecia
			this.pDiv.style.cursor = 'move';

			if (!self.moving) {
				var paletteStartX = parseInt(this.pDiv.style.left,10);
				var paletteStartY = parseInt(this.pDiv.style.top,10);
				var mouseStartX = ROS.mouse.x;
				var mouseStartY = ROS.mouse.y;
				self.moving = true;
				self.move(paletteStartX,paletteStartY,mouseStartX,mouseStartY);
			}			
		};

		this.move = function(px,py,mx,my) {			
			this.pDiv.style.left = px + (ROS.mouse.x - mx) + 'px';
			this.pDiv.style.top = py + (ROS.mouse.y - my) + 'px';
			moveTimeout = setTimeout(function() { self.move(px,py,mx,my); },10);
		};

		this.stopMove = function() {
			this.pDiv.style.cursor = ''; // usuwa zmiane korsora czyli pierwszenstwo wezmie ustawienie globalne z BODY
			clearTimeout(moveTimeout);
			self.moving = false;
		};

		this.destroy = function() {
			ROS.map.well.removeChild(this.pDiv);
			delete ROS.base.palettes[this.uniqid];
			this.pDiv = null;
			pInside = null;
		};
		
		// Lokalna: Wywoływane raz podczas tworzenia obiektu
		function create(width,height) {
			
			// Div główny
			self.pDiv = document.createElement("div");		
			var ps = self.pDiv.style;
			ps.position = 'absolute';
			ps.zIndex = 501;
			ps.left = 0+'px';			
			ps.top = 0+'px';
			ps.width = width+'px';
			ps.height = height+'px';
			ps.overflow = 'hidden'; 			
			ps.padding = 5+'px'; 
			//ps.border = '1px solid #815a3b'; 			
			ps.background = 'url(gfx/palettebg.gif)';
			ps.mozBorderRadius = 10+'px';
			ps.borderRadius = 10+'px';
			ps.webkitBorderRadius = 10+'px';
			ps.mozBoxShadow = '2px 2px 15px #000';
			ps.webkitBoxShadow = '2px 2px 15px #000';
			ps.boxShadow = '2px 2px 15px #000';
			ps.display = 'none';	
			ROS.map.well.appendChild(self.pDiv);

			ROS.tools.addEvent(self.pDiv,'mousedown',function(e) {	
				ROS.mouse.down(e,true); // zatrzymuje propagacje

				self.recalculateOrder();
				if (ROS.mouse.buttonDown === 1) {
					self.startMove();
				}
			});

			ROS.tools.addEvent(self.pDiv,'mouseup',function(e) {			
				ROS.mouse.up(e,true); // zatrzymuje propagacje
				self.stopMove();
			});

			ROS.tools.addEvent(self.pDiv,'mouseover',function() {				
				// najechanie na paletke zatrzymuje obliczanie sciezki na mapie
				ROS.menuPopup.loopStop();	
			});
			ROS.tools.addEvent(self.pDiv,'mouseout',function() {				
				// zjechanie aktywuje rysowanie sciezki
				ROS.menuPopup.loopStart();	
			});			


			// Listwa w górnej części			
			var pTop = document.createElement("div");		
			var psTop = pTop.style;
			psTop.position = 'absolute';
			psTop.left = 10+'px';			
			psTop.top = 10+'px';
			psTop.width = (width-20)+'px';
			psTop.height = 25+'px';
			//psTop.background = 'url(gfx/palettebg2.jpg)';
			psTop.fontSize = 18+'px'; 
			psTop.fontFamily = 'Comic Sans MS'; 
			psTop.color = '#463122';
			psTop.padding = 5+'px';
			//psTop.mozBorderRadius = '7px 7px 0 0';
			//psTop.borderRadius = '7px 7px 0 0';
			//psTop.webkitBorderRadius = '7px 7px 0 0';			
			self.pDiv.appendChild(pTop);			

/*
			ROS.tools.addEvent(pTop,'mousedown',function(e) {			
				ROS.mouse.down(e,false); // nie zatrzymuje propagacji
				if (ROS.mouse.buttonDown === 1) {
					self.startMove();
				}
			});
			ROS.tools.addEvent(pTop,'mouseup',function(e) {			
				ROS.mouse.up(e,true); // zatrzymuje propagacje
				self.stopMove();
			});
*/
			pTop.innerHTML = self.name;

			// Guzik zamykający
			var pClose = document.createElement("img");		
			var psClose = pClose.style;
			psClose.position = 'absolute';
			psClose.width = 24+'px';
			psClose.height = 24+'px';
			psClose.right = 5+'px';
			psClose.top = 5+'px';
			pClose.src = 'gfx/palette-close.png';
			pTop.appendChild(pClose);

			ROS.tools.addEvent(pClose,'mousedown',function(e) {						
				ROS.mouse.down(e,true);
				if (ROS.mouse.buttonDown === 1) {
					self.hide();
				}
			});
			

			// Div wewnętrzny
			pInside = document.createElement("div");
			var psInside = pInside.style;
			psInside.position = 'absolute';
			psInside.left = 5+'px';			
			psInside.top = 45+'px';
			psInside.overflow = 'auto'; 
			psInside.width = width+'px';
			psInside.height = (height-40)+'px';
			psInside.fontSize = 11+'px'; 
			psInside.fontFamily = 'Comic Sans MS'; 
			psInside.color = '#463122';			
			self.pDiv.appendChild(pInside);
			
			pTop = null;
			pClose = null;
		};

		

		// Konstruktor
		// uruchamiam podczas stworzenia obiektu
		// argumenty są przesyłane przy tworzeniu obiektu
		create(w,h);		
		
	};

})();