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

// Obsługa funkcjonalności wywoływanych podczas przesuwania kursora myszki nad obszarem gry
// Wywoływanie malowania ścieżki ruchu
// Wywoływanie informacji o skazanych wrogich jednostkach
// Obsługa kliknięć: przejdź, atakuj, menu
ROS.menuPopup = (function() {
	// przechowuje położenie tilea nad ktorym jest kursor myszki
	var mtxtest = 0;
	var mtytest = 0;
	var mtx = 0;
	var mty = 0;
	var x = 0;
	var y = 0;
	var celownik;
	var loopControl;
	var loopStatus = false;
	var gp;

	return {

		// Metoda startuje w fazie graczy
		loopStart: function() {
			if (!loopStatus && ROS.base.gamePhaseName === 'heroes' && !ROS.effects.selectionMode) {
				// Zeruje poprzednie polozenie kursora
				// aby zawsze uruchamiał metody onNewTile podczas uruchamiania loopStart
				mtx = 0;
				mty = 0;
				celownik = new ROS.Animation('aim');
				celownik.ignite({});
				ROS.menuPopup.loop();
				loopStatus = true;				
			}
		},

		// Metoda zatrzymuje wykonywanie pętli ruchu
		// Wywoływana jest na poczatku fazy wrogów
		loopStop: function() {
			if (loopStatus) {				
				clearTimeout(loopControl);
				ROS.playerPath.clearPath(); // ukrywam ścieżke ruchu
				celownik.destroy();
				celownik = null;
				loopStatus = false;
			}
		},

		// Wywołanie wymuszenia sprawdzenia pozycji kursora pomimo ze caly czas jest nad tym samym tilem
		// Ustawia zmienne na -1 dzieki czemu metoda loop() wykona sprawdzenie
		forceLoop: function() {
			mtx = 0;
			mty = 0;
		},

		// Obserwuje połozenie kursora myszki nad segmentami
		// Reaguje na naciśnięcie lewego przycisku - wyświetlając menu z akcjami do wykonania

		loop: function() {			

			gp = ROS.mouse.gamePosition();
			
			// Jesli kursor znajduje się nad obszarem gry
			// oraz przeszukiwanie i scroll są nieaktywne
			if (gp && !ROS.infoScroll.active) {


				// Sprawdza czy nastapilo wywolanie efektu z QUICKMENU
				var quickActivate = -1;			
      			if (ROS.keyboard.isPressed(49,true)) {quickActivate = 0;} // 1
      			if (ROS.keyboard.isPressed(50,true)) {quickActivate = 1;} // 2
      			if (ROS.keyboard.isPressed(51,true)) {quickActivate = 2;} // 3
      			if (ROS.keyboard.isPressed(52,true)) {quickActivate = 3;} // 4
      			if (ROS.keyboard.isPressed(53,true)) {quickActivate = 4;} // 5
      			if (quickActivate > -1 && ROS.base.activePlayer.quickmenu[quickActivate] !== 0) {      				
      				ROS.effects.selectTargetStart(
						ROS.base.activePlayer,
						ROS.base.activePlayer.quickmenu[quickActivate],
						ROS.base.activePlayer.quickmenu[quickActivate].effects.whenUse,
						'whenUse'
					);
					return; // bardzo ważne - przerywa pętle loop dla menuPopup
				}



				// Jeśli nie mam naciśniętego przycisku myszki
				// to notuj pola nad którymi znajduje się kursor
				if (ROS.mouse.buttonDown === null) {
					
					// czujnik zblizenia kursora do granicy mapy - przesuwający
					//ROS.map.borderMove(24);

					mtxtest = gp.tx;
					mtytest = gp.ty;

					// Jeśli kursor przeniósł się na nowy segment
					if (mtxtest !== mtx || mtytest !== mty) {
						ROS.playerPath.clearPath();
						mtx = mtxtest;
						mty = mtytest;


						// Przesuwa animacje celownika
						celownik.moveAbs(mtx*ROS.base.tileWidth-4, mty*ROS.base.tileWidth-4);

						// Jesli segment:
						// - nalezy do obszaru odkrytego
						// - znajduje się w zasięgu wzroku
						if (ROS.dungeon.gridVisible[mty][mtx] !== 0) {
							if (ROS.dungeon.tileMap[mty][mtx] !== 0) {
								// Jeśli postać żyje, stoi i nie wykonuje ataku
								if (!ROS.base.activePlayer.unconscious &&
									ROS.playerPath.activePlayerMoveFlag === 0 &&
									ROS.playerFight.attackFlag === 0) {									
									ROS.playerPath.onNewTile(mtx,mty); // Oblicza trasę ruchu postaci do wskazanego pola									
								}
							}
						} 
					}

				} else if (ROS.mouse.buttonDown === 1) {
				// Jeśli jest naciśnięty lewy przycisk myszki

					
					// Jeśli menu już nie było wyświetlone
					// Jesli segment nalezy do obszaru odkrytego oraz znajduje się w zasięgu wzroku
					if (!ROS.flyMenu.active &&
						!ROS.base.activePlayer.unconscious &&
						ROS.dungeon.tileMap[mty][mtx] !== 0 &&
						ROS.dungeon.gridVisible[mty][mtx] !== 0) {

						ROS.fly.hide();
						
						var li, a, aText;
						var options = 0;
						
						var menu = document.createElement("div");
                    	menu.className = 'menu';

                    	var main_ul = document.createElement("ul");
                    	menu.appendChild(main_ul);

	                   	var targetInfo = ROS.playerFight.checkAttack(mtx,mty);
                    	
                    	// Podejdź na wskazane miejsce
                    	if (ROS.playerPath.path.length > 0 &&
	                    	ROS.base.activePlayer.actualStats.movement > 0 &&
	                    	ROS.playerPath.activePlayerMoveFlag == 0) {

	                    	options++;
	                   		li = document.createElement("li"); main_ul.appendChild(li);
                        	a = document.createElement("a"); a.href = '#'; li.appendChild(a);
                        	aText = document.createTextNode('Podejdź'); a.appendChild(aText);
                        	a.onmouseup = function() {
                        		ROS.playerPath.startMove();
                        	};                        
	                   	}
	                   	
	                   	// Podejdź na wskazane miejsce i przeszukaj (tylko jesli kliknięto na kontener)
                    	if (ROS.playerPath.path.length > 0 &&
	                    	ROS.base.activePlayer.actualStats.movement > 0 &&
	                    	ROS.playerPath.activePlayerMoveFlag == 0 &&
	                    	ROS.dungeon.gridContainers[mty][mtx] instanceof ROS.Container) {
	                    	
	                    	options++;
	                   		li = document.createElement("li"); main_ul.appendChild(li);
                        	a = document.createElement("a"); a.href = '#'; li.appendChild(a);
                        	aText = document.createTextNode('Podejdź i przeszukaj'); a.appendChild(aText);
                        	a.onmouseup = function() {
                        		ROS.playerPath.startMove('search');
                        	};
                        }

	                   	// Wykonaj atak na wskazane pole bez podchodzenia
                    	if (ROS.base.activePlayer.actualStats.attacks > 0 &&  // Jeśli aktywny bohater ma niewykorzystane ataki
	                    	!ROS.playerFight.attackFlag &&  // Jeśli bohater aktualnie nie wykonuje ataku
	                    	targetInfo.canAttack) { // Jesli aktywny bohater może wykonać atak jedną bądź drugą bronią
	                    
							options++;
							li = document.createElement("li"); main_ul.appendChild(li);
                        	a = document.createElement("a"); a.href = '#'; li.appendChild(a);
                        	aText = document.createTextNode('Atakuj: '+targetInfo.name); a.appendChild(aText);
                        	a.onmouseup = ROS.tools.bind(
	                        	function(x,y) {
                        			ROS.playerFight.startFight(x,y);
                        		},
                        		mtx,mty
                        	);                        	
						}

						// Spróbuj otworzyć drzwi (tylko jesli kliknięto na drzwi)
                    	if (ROS.playerPath.activePlayerMoveFlag == 0 &&
                    		targetInfo.distance <= 1 &&
	                    	ROS.dungeon.tileDoors[mty][mtx] instanceof ROS.Door &&
	                    	ROS.dungeon.tileDoors[mty][mtx].openable) {
	                    	
	                    	options++;
	                   		li = document.createElement("li"); main_ul.appendChild(li);
                        	a = document.createElement("a"); a.href = '#'; li.appendChild(a);
                        	aText = document.createTextNode('Otwórz / Zamknij'); a.appendChild(aText);
                        	a.onmouseup = ROS.tools.bind(
	                        	function(x,y) {
                        			ROS.dungeon.tileDoors[y][x].toggle();
                        		},
                        		mtx,mty
                        	);
                        }

						// Jeśli dostępna jest wiecej niz jedna opcja to pokaz menu						
						if (options > 0) {
							ROS.flyMenu.move(ROS.mouse.x+30,ROS.mouse.y-10);
							ROS.flyMenu.fill(menu);	
							menu = null;						
						} else {
							// jesli zadfna z opcji menu nie jest dostepna to nuluje nacisniety klawisz aby sie nie wywolywalo wielokrotnie bo nie ma sensu
							ROS.mouse.buttonDown = null;
						}
												
					}

				}

			}

			// Odpala cykliczne wywoływanie metody loop co 0.05 sekundy
			loopControl = setTimeout(function() { ROS.menuPopup.loop(); },25);
		}



	};
})();