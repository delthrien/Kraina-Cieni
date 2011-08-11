// Klasa obsługująca mysz

ROS.mouse = (function() {
	
	return {
		x: 0,
		y: 0,
	 	buttonUp: null,
	 	buttonDown: null,

		position: function(e) {					
			ROS.mouse.x = e.pageX;
			ROS.mouse.y = e.pageY;			
		},

		center: function() {
			ROS.mouse.x = Math.floor(ROS.base.wSize[0]/2);
			ROS.mouse.y = Math.floor(ROS.base.wSize[1]/2);				
		},

		// Metoda sprawdza czy kursor myszki znajduje się nad obszarem okna gry
		overwell: function() {
			if ((ROS.mouse.x >= 0 && ROS.mouse.x <= ROS.base.wSize[0]) && 
			    (ROS.mouse.y >= 0 && ROS.mouse.y <= ROS.base.wSize[1])) return true;
			return false;
		},

		// Metoda sprawdza czy kursor myszki znajduje się nad obszarem okna gry, 
		// Jesli tak to zwraca obiekt współrzędnych tile'a, jesli nie zwraca false
		gamePosition: function() {
			var xGra = false;
			var yGra = false;
			var xGraTile = false;
			var yGraTile = false;

			// pozycja kursora dla gry interesuje nas jedynie wtedy jeśli znajduje się nad obszarem okna gry
			if (ROS.mouse.overwell()) {		
				xGra = ROS.mouse.x - parseInt(ROS.map.area.style.left,10);
				yGra = ROS.mouse.y - parseInt(ROS.map.area.style.top,10);	
				xGraTile = Math.floor(xGra / ROS.base.tileWidth);
				yGraTile = Math.floor(yGra / ROS.base.tileWidth);
				if (xGraTile < 0 || xGraTile >= ROS.base.gameSize[0]) {
					xGraTile = 0;
				}
				if (yGraTile < 0 || yGraTile >= ROS.base.gameSize[1]) {
					yGraTile = 0;			
				}				
				return {
					"x" : xGra,
					"y" : yGra,
					"tx": xGraTile,
					"ty": yGraTile
				};
			}
			
			return false;
		},

		// Metoda uruchamiana w chwili naciśnięcia przycisku myszki na obszarze dokumentu
		down: function(e,stopPropagation) {

			if (stopPropagation === undefined) {
				stopPropagation = true;
			}

			// Wyłącza domyślne zachowania wbudowane w przegląderke
			if (e.preventDefault) {
		       e.preventDefault();
		    } else {
		       e.returnValue = false;
		    }
			
			if (stopPropagation) {
				// Powstrzymuje Event.bubbling czyli odpalanie wszystkich eventow rodziców w zagnieżdzonych elementach
				if (e.stopPropagation) {
		            e.stopPropagation();
	        	} else {
		            e.cancelBubble = true;
	        	}
			}

			ROS.mouse.buttonUp = null
			ROS.mouse.buttonDown = e.which;						
		},
		
		// Metoda uruchamiana w chwili puszczenia przycisku myszki na obszarze dokumentu
		up: function(e,stopPropagation) { 
			if (e.preventDefault) {
		       e.preventDefault();
		    } else {
		       e.returnValue = false;
		    }
			
			
			if (stopPropagation === undefined) {
				stopPropagation = true;
			}

			if (stopPropagation) {
				// Powstrzymuje Event.bubbling czyli odpalanie wszystkich eventow rodziców w zagnieżdzonych elementach
				if (e.stopPropagation) {
		            e.stopPropagation();
	        	} else {
		            e.cancelBubble = true;
	        	}
			}
			
			ROS.mouse.buttonDown = null;		
			ROS.mouse.buttonUp = e.which;			
		}	
	};

})();
