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
