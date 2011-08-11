/**
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

// Guziki akcji
ROS.hud = (function() {
	
	function doorToggle() {
		ROS.dungeon.tileDoors[ROS.base.activePlayer.tiley][ROS.base.activePlayer.tilex].toggle(); 
		ROS.fly.hide();
	}
	function doorInfo() {
		ROS.fly.show('Otwórz/Zamknij drzwi',1,86);
	}
	function doorHide() {
		ROS.fly.hide();
	}
	function chestSearch() {
		ROS.dungeon.gridContainers[ROS.base.activePlayer.tiley][ROS.base.activePlayer.tilex].startSearch();
		ROS.fly.hide();
	}
	function chestShow() {
		ROS.fly.show('Przeszukaj',1,110);
	}
	function chestHide() {
		ROS.fly.hide();
	}

	return {
		area: null, // obszar na guziczki
		g11: null, // otwarcie drzwi
		g12: null, // przeszukanie
		g13: null, // koniec kolejki
		g21: null, // mechanika gry
		g22: null, // informacja o wersji		

		partLeft: null,
		partCenter: null,
		partRight: null,

		quickmenu: null,

		create: function() {
			// Obszar na HUD
			ROS.hud.partLeft = document.createElement('div');			
			var pls = ROS.hud.partLeft.style;
			pls.position = 'absolute';
		    pls.left = 0+'px';
			pls.bottom = 0+'px';
			pls.width = 613+'px';
			pls.height = 122+'px';
			pls.zIndex = 500;
			pls.background = 'url(gfx/hud5_3.png) no-repeat';
			ROS.map.well.appendChild(ROS.hud.partLeft);

			ROS.hud.partCenter = document.createElement('div');			
			var pcs = ROS.hud.partCenter.style;
			pcs.position = 'absolute';
		    pcs.left = 613+'px';
			pcs.bottom = 0+'px';
			pcs.width = 1613+'px';
			pcs.height = 122+'px';
			pcs.zIndex = 500;
			pcs.background = 'url(gfx/hud5_2.png) repeat-x';
			ROS.map.well.appendChild(ROS.hud.partCenter);
			
			ROS.hud.partRight = document.createElement('div');			
			var prs = ROS.hud.partRight.style;
			prs.position = 'absolute';
		    prs.right = 0+'px';
			prs.bottom = 0+'px';
			prs.width = 246+'px';
			prs.height = 122+'px';
			prs.zIndex = 501;
			prs.background = 'url(gfx/hud5_4.png) no-repeat';
			ROS.map.well.appendChild(ROS.hud.partRight);			


			// Obszar na guziki
			ROS.hud.area = document.createElement('div');
			var bs = ROS.hud.area.style;
			bs.position = 'absolute';
			bs.right = 0+'px';
			bs.bottom = 0+'px';
			bs.left = 0+'px'; // rozciagniety
			bs.height = 90+'px';
			bs.zIndex = 502;	
			//bs.background = 'black';		
			ROS.map.well.appendChild(ROS.hud.area);
			// W fazie graczy najechanie na obszar guzikow ukrywa obsługe pól mapy
			ROS.tools.addEvent(ROS.hud.area,'mouseover',function() {				
				ROS.menuPopup.loopStop();				
			});
			ROS.tools.addEvent(ROS.hud.area,'mouseout',function() {				
				ROS.menuPopup.loopStart();				
			});
			bs = null;

			// Guziczki
			ROS.hud.g11 = document.createElement('img');
			ROS.hud.g11.src = 'gfx/buttons/empty.png';
			var g = ROS.hud.g11.style;
			g.position = 'absolute';
			g.bottom = 10+'px';
			g.right = 180+'px';	
			g.border = 0;
			g.width = 40+'px';
			g.height = 40+'px';
			ROS.hud.area.appendChild(ROS.hud.g11);
			g = null;

			ROS.hud.g12 = document.createElement('img');
			ROS.hud.g12.src = 'gfx/buttons/empty.png';
			var g = ROS.hud.g12.style;
			g.position = 'absolute';
			g.bottom = 10+'px';
			g.right = 125+'px';	
			g.border = 0;
			g.width = 40+'px';
			g.height = 40+'px';
			ROS.hud.area.appendChild(ROS.hud.g12);
			g = null;

			ROS.hud.g21 = document.createElement('img');
			ROS.hud.g21.src = 'gfx/buttons/mechanics.png';
			var g = ROS.hud.g21.style;
			g.position = 'absolute';
			g.bottom = 10+'px';
			g.right = 70+'px';			
			g.border = 0;
			g.width = 40+'px';
			g.height = 40+'px';
			ROS.hud.area.appendChild(ROS.hud.g21);			
			ROS.tools.addEvent(ROS.hud.g21,'mousedown',function() {
				ROS.console.open();
			});
			ROS.tools.addEvent(ROS.hud.g21,'mouseover',function() {
				ROS.fly.show('Konsola',1,110);
			});
			ROS.tools.addEvent(ROS.hud.g21,'mouseout',function() {
				ROS.fly.hide();
			});								
			g = null;

			ROS.hud.g13 = document.createElement('img');
			ROS.hud.g13.src = 'gfx/buttons/end_turn.png';
			var g = ROS.hud.g13.style;
			g.position = 'absolute';
			g.bottom = 10+'px';
			g.right = 15+'px';	
			g.border = 0;
			g.width = 40+'px';
			g.height = 40+'px';
			ROS.hud.area.appendChild(ROS.hud.g13);
			ROS.tools.addEvent(ROS.hud.g13,'mousedown',function() {
				ROS.base.phaseNext(); 
				ROS.fly.hide();
			});
			ROS.tools.addEvent(ROS.hud.g13,'mouseover',function() {
				ROS.fly.show('Koniec tury',1,110);
			});
			ROS.tools.addEvent(ROS.hud.g13,'mouseout',function() {
				ROS.fly.hide();
			});			
			g = null;
			
			


			ROS.hud.g22 = document.createElement('img');
			ROS.hud.g22.src = 'gfx/buttons/gameinfo.png';
			var g = ROS.hud.g22.style;
			g.position = 'absolute';
			g.bottom = 10+'px';
			g.left = 15+'px';
			g.border = 0;
			g.width = 40+'px';
			g.height = 40+'px';
			ROS.hud.area.appendChild(ROS.hud.g22);			
			ROS.tools.addEvent(ROS.hud.g22,'mousedown',function() {
				ROS.infoScroll.show('Kraina Cieni<br><br>v. '+ROS.base.gameVersion+' ('+ROS.base.gameVersionDate+')<br>by Marcin Danysz',null,1);
			});
			ROS.tools.addEvent(ROS.hud.g22,'mouseover',function() {
				ROS.fly.show('O grze',1,80);
			});
			ROS.tools.addEvent(ROS.hud.g22,'mouseout',function() {
				ROS.fly.hide();
			});				
			g = null;








			// Menu podreczne (QUICK MENU)
			ROS.hud.quickmenu = document.createElement('div');			
			var prs = ROS.hud.quickmenu.style;
			prs.position = 'absolute';
		    prs.right = 0+'px';
			prs.top = -20+'px';
			prs.width = 94+'px';
			prs.height = 380+'px';
			prs.zIndex = 501;
			prs.background = 'url(gfx/quickmenu.png) no-repeat';
			ROS.map.well.appendChild(ROS.hud.quickmenu);

			ROS.hud.quickmenu.onmouseover = function() {				
				ROS.menuPopup.loopStop();								
				//ROS.hud.quickmenu.style.webkitTransform = 'scale(1)';
				//ROS.hud.quickmenu.style.mozTransform = 'scale(1)';
				//ROS.hud.quickmenu.style.transform = 'scale(1)';				
				//ROS.hud.quickmenu.style.right = 0+'px';
			};
			ROS.hud.quickmenu.onmouseout = function() {				
				//ROS.hud.quickmenu.style.right = -30+'px';
				//ROS.hud.quickmenu.style.webkitTransform = 'scale(0.7)';
				//ROS.hud.quickmenu.style.mozTransform = 'scale(0.7)';
				//ROS.hud.quickmenu.style.transform = 'scale(0.7)';				
				ROS.menuPopup.loopStart();
			};

			var x, c, col, row, poz;			
	
			for (x=0; x<5; x++) {				
					
				c = document.createElement("div");		
				c.id = 'quickMenuField_'+x;				
				c.style.position = 'absolute';
				c.style.zIndex = 502;				
				c.style.left = 33 + 'px';
				c.style.top = 32+(x*67) + 'px';
				c.style.width = 48+'px';
				c.style.height = 48+'px';
				//c.style.background = 'red';
				ROS.hud.quickmenu.appendChild(c);

				ROS.tools.addEvent(c,'mouseup',function(e) {				

					ROS.mouse.up(e,true); // stopPropagation na tym poziomie

					// sprawdza czy był przenoszony przedmiot
					if (ROS.flyBag.item !== null) {						
						ROS.Sound.play('drop');						

						// Jesli przedmiot ma ceche whenUse (tylko takie mozna dawac do quickmenu)
						if (ROS.flyBag.item.testActivate('whenUse')) {

							// Jesli pochodzi od gracza (z plecaka lub z ubranych)
							if (ROS.flyBag.owner instanceof ROS.Hero) {
								
								var poz = this.id.split("_")[1];

								// upewniam się czy na polu nie znajduje sie inny przedmiot
								// jesli pole jest zajęte to wywala ten ktory tam byl
								if (this.hasChildNodes()) {								
									this.innerHTML = '';
									ROS.base.activePlayer.quickmenu[poz] = 0;
								}
								
								var infoItem = ROS.hud.createQuickIcon(ROS.flyBag.item);

								// wstawia kopie do quickmenu
								this.appendChild(infoItem); // wstaw grafike przedmiotu do pola, grafika to jedyne dziecko ROS.flyBag.area								
								
								// jeszcze referencja do tabelki quickmenu
								ROS.base.activePlayer.quickmenu[poz] = ROS.flyBag.item;

								infoItem = null;
								// orginalny przedmiot zwraca do miejsa z ktorego zostal pobrany
								ROS.flyBag.giveBack();
							} else {
								ROS.flyBag.giveBack();
								ROS.infoScroll.show('Przedmiot musi pochodzić z plecaka właściciela.');
							}						
						} else {
							ROS.flyBag.giveBack();
							ROS.infoScroll.show('Przedmiot nie posiada cechy aktywowanej poprzez użycie.');							
						}	

						ROS.flyBag.clear(); // wyłaczam wodzenie bloczka za kursorem					
					}
				});				
			}			
		},

		hideQuickMenu: function() {
			ROS.hud.quickmenu.style.display = 'none';	
		},
		showQuickMenu: function() {
			ROS.hud.quickmenu.style.display = 'block';	
		},

		createQuickIcon: function(item) {
			var infoItem = item.gfx.cloneNode(true);
			infoItem.style.opacity = 0.7;
			// Podpina pod niego zdarzenia - one sie nie kopiują
			infoItem.onmouseover = function() {
				ROS.fly.show(item.itemDescription(),1,305);
			};
			infoItem.onmouseout = function() {							
            	ROS.fly.hide();
			};
			infoItem.onclick = function() {
				ROS.effects.selectTargetStart(
					ROS.base.activePlayer,
					item,
					item.effects.whenUse,
					'whenUse'
				);
			}
			
			return infoItem;
		},

		clearQuickMenu: function() {
			var x;
			for(x=0; x<ROS.base.activePlayer.quickmenu.length; x++) {
				ROS.tools.get('quickMenuField_'+x).innerHTML = '';
			}
		},

		// Sprawdza czy wszystkie przedmioty znajdujace sie w quickmenu faktycznie są w posiadaniu bohatera
		// Te których nie znajdzie u bohatera usuwa ich referencje z quickmenu
		refreshQuickMenuRef: function() {
			var x,y,ok;
			for(x=0; x<ROS.base.activePlayer.quickmenu.length; x++) {
				if (ROS.base.activePlayer.quickmenu[x] !== 0) {
					ok = false;
					// sprawdza komorki plecaka
					for (y in ROS.base.activePlayer.itemsBackpack) {
						if (ROS.base.activePlayer.itemsBackpack[y] === ROS.base.activePlayer.quickmenu[x]) {
							ok = true;
						}
					}
					// sprawdza komorki ubrane
					for (y in ROS.base.activePlayer.itemsWear) {
						if (ROS.base.activePlayer.itemsWear[y] === ROS.base.activePlayer.quickmenu[x]) {
							ok = true;
						}
					}
					if (!ok) {
						// przedmiotu juz nie ma w posiadaniu bohatera wiec usuwa z quickmenu
						ROS.tools.get('quickMenuField_'+x).innerHTML = '';
						ROS.base.activePlayer.quickmenu[x] = 0;
					}					
				}
			}
		},

		// Podmienia zawartość QuickMenu zgodnie z tabelą quickmenu aktywnego bohaterem
		refreshQuickMenu: function() {
			ROS.hud.clearQuickMenu();			
			var x;
			for(x=0; x<ROS.base.activePlayer.quickmenu.length; x++) {
				if (ROS.base.activePlayer.quickmenu[x] !== 0) {
					// wstawia obrazek przedmiotu					
					ROS.tools.get('quickMenuField_'+x).appendChild(ROS.hud.createQuickIcon(ROS.base.activePlayer.quickmenu[x]));					
				}
			}
		},		

		// Odswieża funkcjonalności
		refresh: function() {
			
			// guzik otwarcia drzwi
			if (ROS.dungeon.tileDoors[ROS.base.activePlayer.tiley][ROS.base.activePlayer.tilex] instanceof ROS.Door &&
			    ROS.dungeon.tileDoors[ROS.base.activePlayer.tiley][ROS.base.activePlayer.tilex].openable) {				
				ROS.hud.g11.src = 'gfx/buttons/open_door.png';				
				ROS.tools.addEvent(ROS.hud.g11,'mousedown',doorToggle);
				ROS.tools.addEvent(ROS.hud.g11,'mouseover',doorInfo);
				ROS.tools.addEvent(ROS.hud.g11,'mouseout',doorHide);				
			} else {
				ROS.hud.g11.src = 'gfx/buttons/empty.png';
				ROS.hud.g11.onmousedown = null;
				ROS.hud.g11.onmouseover = null;
				ROS.hud.g11.onmouseout  = null;
			}

			// guzik przeszukania
			if (ROS.dungeon.gridContainers[ROS.base.activePlayer.tiley][ROS.base.activePlayer.tilex] instanceof ROS.Container) {
				ROS.hud.g12.src = 'gfx/buttons/open_chest.png';				
				ROS.tools.addEvent(ROS.hud.g12,'mousedown',chestSearch);				
				ROS.tools.addEvent(ROS.hud.g12,'mouseover',chestShow);
				ROS.tools.addEvent(ROS.hud.g12,'mouseout' ,chestHide);
			} else {
				ROS.hud.g12.src = 'gfx/buttons/empty.png';
				ROS.hud.g12.onmousedown = null;
				ROS.hud.g12.onmouseover = null;
				ROS.hud.g12.onmouseout  = null;
			}

		},

		show: function() {
			ROS.hud.area.style.display = 'block';
		},

		hide: function() {
			ROS.hud.area.style.display = 'none';
		}

	};

})();