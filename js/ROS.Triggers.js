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

// Klasa
ROS.Triggers = (function() {
	
	return function(x,y,z,w,h,ev) {
		var self = this;
				
		this.uniqid = 'trigger#'+ROS.tools.dice(100000);
		this.x = x;
		this.y = y;
		this.z = z;
		this.width = w;
		this.height = h;		

		// Do tablicy trigerów wpisuje referencje
		ROS.base.triggers[this.uniqid] = this;

		// Tworze graficzną interpretacje kontenera i umieszczam ją na warstwie gry
		var o = document.createElement("img");
		o.id = this.uniqid;
		o.src = 'gfx/blank.gif';
		o.style.width  = this.width + 'px';
		o.style.height = this.height + 'px';			
		o.style.left = this.x + 'px';
		o.style.top  = this.y + 'px';			
		o.style.position = 'absolute';
		o.style.zIndex   = this.z;
		
		//o.style.backgroundColor = '#ff0000';
		//o.style.opacity = .2;		

		ROS.map.area.appendChild(o);			

		if (ev.over) {ROS.tools.addEvent(o,'mouseover',ev.over);}
		if (ev.out)  {ROS.tools.addEvent(o,'mouseout',ev.out);}
		if (ev.down) {ROS.tools.addEvent(o,'mousedown',ev.down);}
		if (ev.up)   {ROS.tools.addEvent(o,'mouseup',ev.up);}

		this.obj = o;

		
		// Usuwa zdarzenie
		this.remove = function() {
			ROS.map.area.removeChild(ROS.base.triggers[this.uniqid].obj);
			delete ROS.base.triggers[this.uniqid]; // wywalam z tablicy eventów wskazany event								
		};
		
		// Przesuwa zdarzenie na nowe pole
		this.move = function(x,y,z) {		
			this.x = x;
			this.y = y;
			if (z !== undefined) {
				this.z = z;
				this.div.style.zIndex = this.z;			
			}
			this.div.style.left = this.x + 'px';
			this.div.style.top = this.y + 'px';			

		};
				
		// Przesuwa zdarzenie na nowe pole
		this.resize = function(w,h) {
			this.width = w;
			this.height = h;		
			this.div.style.width = this.width + 'px';
			this.div.style.height = this.height + 'px';			
		};
		
	};	
})();