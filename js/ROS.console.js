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

// Konsola gry, przechowuje również dane techniczne
ROS.console = (function() {

	var commandsList = {
		// Zadaje obrażenia jednostce Npc o wskazanym uniqid
		// Wywołanie: kill [uniqid] [obrazenia]
		hurt: {			
			help: 'Zadaje X obrażeń wybranej jednostce Npc. Wywołanie: kill [uniqid] [obrażenia]',
			activate: function(args) {		
				if (args[0] !== '' && ROS.base.npcs[args[0]] instanceof ROS.Npc) {
					if (parseInt(args[1]) > 0) {
						ROS.base.npcs[args[0]].hurt(args[1]);
					}
				} else {
					ROS.console.addLine(' - nie podano celu<br>',true);	
				}
			}
		},
		// Odświeża strone z grą
		// Wywołanie: refresh
		reload: {
			help: 'Odświeża okno strony. Uwaga wszystkie ustawienia zostaną zapomniane. Stan gry nie zostanie zapisany.',				  
			activate: function() {
				window.location.reload();
			}
		},

		ver: {
			help: 'Pokazuje dokładny numer wersji gry wraz z datą zamknięcia kodu.',
			activate: function() {
				ROS.console.addLine(' - wersja gry: <b>'+ROS.base.gameVersion+'</b> (data zamknięcia kodu: '+ROS.base.gameVersionDate+')<br>',true);
			}
		},

		exit: {
			help: 'Zamyka okno konsoli.',
			activate: function() {
				ROS.console.close();
			}
		},

		clear: {
			help: 'Czyści okno konsoli.',
			activate: function() {
				ROS.console.inside.innerHTML = '';
			}
		},

		stat: {
			help: 'Pokazuje dane o różnych obiektach w grze.',			 	  
			activate: function() {
				var x;
				var count_heroes = 0;
				var count_npcs = 0;
				var count_containers = 0;
				var count_doors = 0;
				var count_items = 0;
				for(x in ROS.base.heroes) {count_heroes++;}
				for(x in ROS.base.npcs) {count_npcs++;}
				for(x in ROS.base.containers) {count_containers++;}
				for(x in ROS.base.doors) {count_doors++;}
				for(x in ROS.base.items) {count_items++;}
				ROS.console.addLine(' - Liczba bohaterów: <b>'+count_heroes+'</b><br>',true);
				ROS.console.addLine(' - Liczba postaci niezależnych (w tym wrogów): <b>'+count_npcs+'</b><br>',true);
				ROS.console.addLine(' - Liczba skrzyń, beczek i innych kontenerów (również ciał): <b>'+count_containers+'</b><br>',true);
				ROS.console.addLine(' - Liczba drzwi (również tajnych): <b>'+count_doors+'</b><br>',true);				
				ROS.console.addLine(' - Liczba przedmiotów: <b>'+count_items+'</b><br>',true);				
			}			  	
		},

		help: {
			help: 'Pokazuje spis wszystkich komend konsoli wraz z opisem działania.',
			activate: function() {
				var x;
				var loop = 1;
				ROS.console.addLine('Spis wszystkich komend konsoli:<br>',true);
				for(x in commandsList) {
					ROS.console.addLine(loop+'. <b><span style="color:#f00;">'+(x.toUpperCase())+'</span></b> - '+commandsList[x].help+'<br>',true);
					loop++;
				}
			}			
		},

		los: {
			help: 'Odświeża zakres widzenia postaci graczy.',
			activate: function() {
				ROS.dungeon.createLos(true);
			}
		}

	};

	return {
		area: null,
		inside: null,
		active: false,
		inputField: false,		

		activateCommand: function(c) {
			if (!c) return;

			ROS.console.inputField.value = '';

			var x,choosenCommand;
			var tab = [];			

			tab = c.split(" "); // rozbija string na słowa
			choosenCommand = tab.shift(); // wycina i zwraca pierwsze pole, pozostałe to argumenty			

			for(x in commandsList) {				
				if (choosenCommand === x) {
					ROS.console.addLine('Aktywacja: <b>'+choosenCommand+'('+tab.join(",")+')</b><br>',true);
					(commandsList[choosenCommand].activate)(tab); // Odpala metode
					return;
				}					
			}
			ROS.console.addLine('Komenda nieznana: <b>'+choosenCommand+'</b><br>',true);
		},

		// Wywoływane raz
		create: function() {
			if (ROS.console.area == null) {
				ROS.console.area = document.createElement("div");
				var fm = ROS.console.area.style;
				fm.position = 'absolute';
				fm.zIndex = 2500;
				fm.left = 0+'px';
				fm.bottom = -200+'px';
				fm.right = 0+'px';
				fm.height = 200+'px';
				fm.background = '#000000';
				fm.opacity = '0.7';
				fm.display = 'none';
				fm.overflow = 'hidden';				
				fm.borderTop = '3px solid #777';
				document.body.appendChild(ROS.console.area);
				fm = null;
								
				ROS.tools.addEvent(ROS.console.area,'mouseover',function() {				
					// najechanie na paletke zatrzymuje obliczanie sciezki na mapie
					ROS.menuPopup.loopStop();	
				});
				ROS.tools.addEvent(ROS.console.area,'mouseout',function() {				
					// zjechanie aktywuje rysowanie sciezki
					ROS.menuPopup.loopStart();	
				});
				
								
				ROS.console.inside = document.createElement("div");
				var fm = ROS.console.inside.style;
				fm.position = 'absolute';
				fm.zIndex = 2501;
				fm.left = 0+'px';
				fm.top = 0+'px';
				fm.right = 0+'px';
				fm.height = 156+'px';				
				fm.overflow = 'auto';
				fm.padding = 10+'px';
				fm.margin = 0+'px';
				fm.color = '#ffffff';
				fm.fontSize = 12+'px';	
				fm.borderBottom = '1px solid #aaaaaa';			
				ROS.console.area.appendChild(ROS.console.inside);
				fm = null;
				
				ROS.tools.addEvent(ROS.console.inside,'click',function(e) {											
					ROS.console.close();					
				});


				ROS.console.inputField = document.createElement("input");
				ROS.console.inputField.type = 'text';
				var ifs = ROS.console.inputField.style;
				ifs.position = 'absolute';
				ifs.bottom = 2+'px';
				ifs.left = 0+'px';
				ifs.right = 0+'px';
				ifs.height = 20+'px';
				ifs.background = '#000000';
				ifs.color = '#ff0000';
				ifs.border = 0+'px';
				ifs.margin = 0+'px';
				ifs.padding = 0+'px';
				ROS.console.area.appendChild(ROS.console.inputField);
				ifs = null;

				ROS.tools.addEvent(ROS.console.inputField,'keypress',function(e) {
					// Jeśli naciśnięto ENTER
					if (ROS.keyboard.isPressed(13,true)) {
						if (ROS.console.active) {
							ROS.console.activateCommand(ROS.console.inputField.value);
						}
					}
				});
			}
		},
		
		open: function() {
			if (ROS.console.active)	return;
			ROS.console.active = true;
			ROS.console.area.style.display = 'block';			
			ROS.console.inside.scrollTop = ROS.console.inside.scrollHeight; // przewija bloczek na koniec				
			ROS.console.move(-200,0,0,0.7,ROS.console.cfocus);
		},
		
		cfocus: function() {
			ROS.console.inputField.focus();			
		},

		close: function() {					
			if (!ROS.console.active) return;	
			ROS.console.active = false;
			ROS.console.inputField.blur();								
			ROS.console.move(0,-200,0.7,0,ROS.console.hide);
		},

		move: function(y1,y2,op1,op2,onFinish) {			
			if (y1 === y2) {
				if (onFinish) {					
					(onFinish)();
				}
				return;
			}
			if (y1 < y2) {
				y1 += 10;
				if (op1 < op2) {
					op1 += 0.1;
				}
			} else {
				y1 -= 10;
				if (op1 > op2) {
					op1 -= 0.1;
				}
			}
			ROS.console.area.style.opacity = op1;
			ROS.console.area.style.bottom = y1+'px';			
			setTimeout(function(){ROS.console.move(y1,y2,op1,op2,onFinish);},10);
		},

		hide: function() {					
			ROS.console.area.style.display = 'none';
			ROS.menuPopup.loopStart();			
		},

		addLine: function(txt) {
			ROS.console.inside.innerHTML += txt+'<br />';
			ROS.console.inside.scrollTop = ROS.console.inside.scrollHeight; // przewija bloczek na koniec
			if (arguments[1] === undefined) {
				ROS.microScroll.show(txt,'#ffffff',8000);	
			}
		}		
	};

})();