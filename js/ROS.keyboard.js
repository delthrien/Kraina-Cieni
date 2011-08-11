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