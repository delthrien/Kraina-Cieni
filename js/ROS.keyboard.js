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

// Obsługa klawiszy klawiatury
ROS.keyboard = (function() {

	var keyPressedOnce = [];	
	var keyPressed = [];

	return {
	
		// przechwytuje naciśniete klawisze
		// noyuje ich stan
		down: function(e) {
			if (keyPressedOnce[e.which] == 1) {
				return;
			} else {
				keyPressed[e.which] = 1;					
				keyPressedOnce[e.which] = 1;	
				//ROS.tools.console('log','Naciśnięto: '+e.which);
			}						
		},

		// przechwytuje puszczone klawisze
		// zeruje ich stan
		up: function(e) {
			keyPressed[e.which] = 0;
			keyPressedOnce[e.which] = 0;
		},

		// sprawdza czy został naciśniety przycisk jesli tak zwraca true
		// jesli argument once jest true to natychmiast zwalnia przycisk po tescie
		isPressed: function(number,once) {
			if (keyPressed[number] == 1) {				
				if (once) {
					keyPressed[number] = 0;
				}
				return true;
			} else {
				return false;
			}
		}
	};

})();