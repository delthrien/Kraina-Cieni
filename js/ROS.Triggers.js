
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