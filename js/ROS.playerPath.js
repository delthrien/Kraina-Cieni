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

// Singleton odpowiedzialny za obliczanie i rysowanie ścieżki ruchu gracza
ROS.playerPath = {
		
	"activePlayerMoveFlag": 0,
	"path": [],
	"action": null,

	startMove: function(onFinish) {		
				
		if (onFinish) {
			ROS.playerPath.actionOnFinish = onFinish;
		}

		ROS.playerPath.activePlayerMoveFlag = 1;				
		
		ROS.hud.hide();
		
		ROS.base.activePlayer.moveStart({
			path:ROS.playerPath.path,
			onfinish:function() {
				// Po zatrzymaniu postaci:
				ROS.playerPath.clearPath();
				ROS.playerPath.activePlayerMoveFlag = 0;
				ROS.playerPath.path = []; // ważne
				ROS.hud.refresh();				
				ROS.hud.show();				
				ROS.menuPopup.forceLoop();
				if (ROS.playerPath.actionOnFinish === 'search') {
					ROS.dungeon.gridContainers[ROS.base.activePlayer.tiley][ROS.base.activePlayer.tilex].startSearch();
				}
				ROS.playerPath.actionOnFinish = null;
			}
		});		
	},


	// Metoda usuwa symbole ścieżki
	clearPath: function() {
		ROS.playerPath.path = [];
		ROS.map.pathLayer.style.display = 'none';
		ROS.tools.clearNodes(ROS.map.pathLayer);					
	},

	// Rysuje proponowaną ścieżke ruchu dla aktywnej postaci
	drawPath: function() {		
		var points = ROS.playerPath.path;
		var pozX,pozY,img,x,opac,pt,p1,p2,p3;
		var pcn,dcn,rotate; // Pierwszy i drugi człon nazwy			
		
		for(x=0;x<points.length;x++) {
			// robi obrazek i podpina go w okreslone miejsce
			pozX = points[x][0];
			pozY = points[x][1];

			// sciezka poza zasiegiem punktow ruchu jest ledwo widoczna
			if (ROS.base.activePlayer.actualStats.movement >= x+1) opac = 0.5;
			else opac = 0.2;
			
			// okreslam trzy pola, poprzednie (p1), aktualne (p2) i kolejne (p3) w celu okeslenie grafiki ścieżki
			if (x == 0) p1 = [ROS.base.activePlayer.tilex , ROS.base.activePlayer.tiley]; // pierwszy obieg
			else p1 = [points[x-1][0] , points[x-1][1]];
			
			p2 = [pozX , pozY];
			
			if (x+1 < points.length) p3 = [points[x+1][0] , points[x+1][1]];
			else p3 = null;
			
			// na podstawie trzech pol okreslam grafike
			if (p1[0] < p2[0] && p1[1] < p2[1]) pcn = 'NW';
			if (p1[0] == p2[0] && p1[1] < p2[1]) pcn = 'N';
			if (p1[0] > p2[0] && p1[1] < p2[1]) pcn = 'NE';
			if (p1[0] < p2[0] && p1[1] == p2[1]) pcn = 'W';
			if (p1[0] > p2[0] && p1[1] == p2[1]) pcn = 'E';
			if (p1[0] < p2[0] && p1[1] > p2[1]) pcn = 'SW';
			if (p1[0] == p2[0] && p1[1] > p2[1]) pcn = 'S';
			if (p1[0] > p2[0] && p1[1] > p2[1]) pcn = 'SE';
			
			if (p3 == null) dcn = 'END';
			else {
				if (p3[0] < p2[0] && p3[1] < p2[1]) dcn = 'NW';
				if (p3[0] == p2[0] && p3[1] < p2[1]) dcn = 'N';
				if (p3[0] > p2[0] && p3[1] < p2[1]) dcn = 'NE';
				if (p3[0] < p2[0] && p3[1] == p2[1]) dcn = 'W';
				if (p3[0] > p2[0] && p3[1] == p2[1]) dcn = 'E';
				if (p3[0] < p2[0] && p3[1] > p2[1]) dcn = 'SW';
				if (p3[0] == p2[0] && p3[1] > p2[1]) dcn = 'S';
				if (p3[0] > p2[0] && p3[1] > p2[1]) dcn = 'SE';
			}
			
			if (pcn === 'W') {
				rotate = 0;
				switch(dcn) {
					case 'NW':  pt = 'ostry-lewo';   break;
					case 'N':   pt = 'zakret';       break;
					case 'NE':  pt = 'lekki-lewo';   break;
					case 'E':   pt = 'linia';        break;
					case 'SE':  pt = 'lekki-prawo';  break;
					case 'S':   pt = 'zakret'; 	  rotate = 270; break;
					case 'SW':  pt = 'ostry-prawo';  break;
					case 'END': pt = 'linia-koniec'; break;
				}
			} else if (pcn === 'NW') {					
				rotate = 0;
				switch(dcn) {					
					case 'N':   pt = 'ostry-prawo'; rotate = 90; break;
					case 'NE':  pt = 'kolano';      rotate = 90; break;
					case 'E':   pt = 'lekki-prawo'; rotate = 180; break;
					case 'SE':  pt = 'skos'; 		 break;
					case 'S':   pt = 'lekki-lewo';  rotate = 270; break;
					case 'SW':  pt = 'kolano'; 	 break;
					case 'W':   pt = 'ostry-lewo';  break;
					case 'END': pt = 'skos-koniec'; break;
				}
			} else if (pcn === 'N') {				
				rotate = 90;
				switch(dcn) {										
					case 'NE':  pt = 'ostry-lewo';   break;
					case 'E':   pt = 'zakret';       break;
					case 'SE':  pt = 'lekki-lewo';   break;
					case 'S':   pt = 'linia';        break;
					case 'SW':  pt = 'lekki-prawo';  break;
					case 'W':   pt = 'zakret';       rotate = 0; break;
					case 'NW':  pt = 'ostry-prawo';  break;
					case 'END': pt = 'linia-koniec'; break;
				}
			} else if (pcn === 'NE') {				
				rotate = 90;
				switch(dcn) {															
					case 'E':   pt = 'ostry-prawo';  rotate = 180; break;
					case 'SE':  pt = 'kolano';       rotate = 180; break;
					case 'S':   pt = 'lekki-prawo';  rotate = 270; break;
					case 'SW':  pt = 'skos'; 		  break;
					case 'W':   pt = 'lekki-lewo';   rotate = 0; break;
					case 'NW':  pt = 'kolano';  	  break;
					case 'N':   pt = 'ostry-lewo';   break;
					case 'END': pt = 'skos-koniec';  break;
				}
			} else if (pcn === 'E') {				
				rotate = 180;
				switch(dcn) {																				
					case 'SE':  pt = 'ostry-lewo';   break;
					case 'S':   pt = 'zakret';       break;
					case 'SW':  pt = 'lekki-lewo';   break;
					case 'W':   pt = 'linia';        rotate = 0; break;
					case 'NW':  pt = 'lekki-prawo';  break;
					case 'N':   pt = 'zakret';       rotate = 90; break;
					case 'NE':  pt = 'ostry-prawo';  break;
					case 'END': pt = 'linia-koniec'; break;
				}
			} else if (pcn === 'SE') {				
				rotate = 180;
				switch(dcn) {																									
					case 'S':   pt = 'ostry-prawo';  rotate = 270; break;
					case 'SW':  pt = 'kolano';       rotate = 270; break;
					case 'W':   pt = 'lekki-prawo';  rotate = 0; break;
					case 'NW':  pt = 'skos';         rotate = 0; break;
					case 'N':   pt = 'lekki-lewo';   rotate = 90; break;
					case 'NE':  pt = 'kolano';       break;
					case 'E':   pt = 'ostry-lewo';   break;
					case 'END': pt = 'skos-koniec';  break;
				}
			} else if (pcn === 'S') {				
				rotate = 270;
				switch(dcn) {																														
					case 'SW':  pt = 'ostry-lewo';   break;
					case 'W':   pt = 'zakret';       break;
					case 'NW':  pt = 'lekki-lewo';   break;
					case 'N':   pt = 'linia';        rotate = 90; break;
					case 'NE':  pt = 'lekki-prawo';  break;
					case 'E':   pt = 'zakret';       rotate = 180; break;
					case 'SE':  pt = 'ostry-prawo';  break;
					case 'END': pt = 'linia-koniec'; break;
				}
			} else if (pcn === 'SW') {				
				rotate = 270;
				switch(dcn) {																														
					case 'W':   pt = 'ostry-prawo';  rotate = 0; break;
					case 'NW':  pt = 'kolano';       rotate = 0; break;
					case 'N':   pt = 'lekki-prawo';  rotate = 90; break;
					case 'NE':  pt = 'skos';         rotate = 90; break;
					case 'E':   pt = 'lekki-lewo';   rotate = 180; break;
					case 'SE':  pt = 'kolano';       break;
					case 'S':   pt = 'ostry-lewo';   break;
					case 'END': pt = 'skos-koniec';  break;
				}
			}
			
			img = ROS.tools.addImage(ROS.map.pathLayer, 'gfx/path/'+pt+'.png', pozX*48, pozY*48, 48, 48, 'sciezka'+x);
			img.style.display = 'block';
			img.style.opacity = opac;
			img.style.pointerEvents = 'none'; // aby nie zasłaniał przed kliknieciami na elementy znajdujace sie pod nim
			ROS.tools.rotate(img,rotate);
			img = null;

		}

		ROS.map.pathLayer.style.display = 'block';
	},

	// Metoda uruchamiana raz podczas każdego wjazdu na tile'a
	onNewTile: function(x,y) {					
		// Oblicza ścieżke (AStar)
		ROS.playerPath.path = ROS.tools.AStar(ROS.dungeon.tileAccess,[ROS.base.activePlayer.tilex,ROS.base.activePlayer.tiley],[x,y],0);			
		// Jesli możliwe jest utworzenie ścieżki do wskazanego segmentu
		if (ROS.playerPath.path.length > 0) {
			// Sprawdza czy sciezka przechodzi przez pola nieodkryte lub niewidoczne jesli tak przerywa
			var x,px,py;
			for(x=0;x<ROS.playerPath.path.length;x++) {
				px = ROS.playerPath.path[x][0];
				py = ROS.playerPath.path[x][1];
				if (ROS.dungeon.gridVisible[py][px] === 0) {
					ROS.playerPath.path = [];
					return; // Przerywa
				}
			}
					
			// Odrzuca pierwszy element ponieważ wskazuje on pozycje, z ktorej startuje bohater,
			// Skrypt potrzebuje pierwszą pozycję na która ma wejść
			ROS.playerPath.path.shift();					
			// wyrysowuje pełną ścieżke
			ROS.playerPath.drawPath();
			// wycina fragment ktory moge przejsc (limit punktów ruchu)
			ROS.playerPath.path = ROS.playerPath.path.slice(0,ROS.base.activePlayer.actualStats.movement);
		}					
	}
};