ROS.spells = {

	fireblast: { 	
		"name":'Ognista iskra', 
		"icon":'gfx/spells/fireblast.png',	
		
		"attack_sfx": 'sword_hit1,sword_hit2,sword_hit3',			
		"attack_gfx": 'spell', // katalog z plikami graficznymi reprezentującymi rzut czaru
		
		// dzialanie czaru	
		"armour_pierce":1, // przenikanie zbroi
		"damage":'2d12+6',		
		"range":10 // zasięg zaklecia	
	}
	
};


ROS.Spell = (function() {

	return function(id) {	
		var self = this;
		
		this.id = id;
		this.uniqid = id+'#'+ROS.tools.dice(10000);
		
		var s = ROS.spells[this.id];
		
		this.name = s.name;
		this.icon = s.icon;
		
		this.attack_sfx = s.attack_sfx;	
		this.attack_gfx = s.attack_gfx;
		
		this.armour_pierce = s.armour_pierce; // przebicie zbroi
		this.range = s.range; // zasięg 
		this.damage = s.damage; // obrażenia
	}

})();
