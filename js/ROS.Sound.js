// Klasa tworząca oraz zarządzająca dźwiękiem
ROS.Sound = (function() {
	
	var sounds = [];

	return {
		
		createSound: function(obj) {
			sounds.push(obj);
		},

		play: function(id) {
			
		}

	};

})();


// Inicjalizuje wszystkie dźwięki 
ROS.Sound.createSound({id:'take',url:'snd/take.mp3',volume:50});
ROS.Sound.createSound({id:'drop',url:'snd/drop.mp3',volume:50});
ROS.Sound.createSound({id:'use',url:'snd/use.mp3',volume:50});

ROS.Sound.createSound({id:'dooropen1',url:'snd/dooropen1.mp3',volume:20});
ROS.Sound.createSound({id:'dooropen2',url:'snd/dooropen2.mp3',volume:20});

ROS.Sound.createSound({id:'chest_open',url:'snd/chest_open.mp3',volume:40});
ROS.Sound.createSound({id:'chest_close',url:'snd/chest_close.mp3',volume:40});

ROS.Sound.createSound({id:'bookopen',url:'snd/bookopen2.mp3',volume:50});	
ROS.Sound.createSound({id:'bookclose',url:'snd/bookclose.mp3'});
ROS.Sound.createSound({id:'pageflip',url:'snd/pageflip.mp3',volume:50});

// Odgłosy poruszania po różnym terenie
ROS.Sound.createSound({id:'footstep1',url:'snd/footstep1.mp3'});
ROS.Sound.createSound({id:'footstep2',url:'snd/footstep2.mp3'});
ROS.Sound.createSound({id:'footstep_water',url:'snd/footstep_water.mp3',volume:60});
ROS.Sound.createSound({id:'footstep_lava',url:'snd/footstep_lava.mp3',volume:60});	

ROS.Sound.createSound({id:'jump',url:'snd/jump.mp3',volume:50});


ROS.Sound.createSound({id:'scream1',url:'snd/wounds/hero_scream1.mp3',volume:50});
ROS.Sound.createSound({id:'scream2',url:'snd/wounds/hero_scream2.mp3',volume:50});

ROS.Sound.createSound({id:'hero_bleed1',url:'snd/wounds/hero_bleed1.mp3',volume:50});
ROS.Sound.createSound({id:'hero_bleed2',url:'snd/wounds/hero_bleed2.mp3',volume:50});
ROS.Sound.createSound({id:'hero_bleed3',url:'snd/wounds/hero_bleed3.mp3',volume:50});

// Ataki wrógów
// PAJĄKI
ROS.Sound.createSound({id:'spider_attack1',url:'snd/attacks/npc/spider_attack1.mp3',volume:50});
ROS.Sound.createSound({id:'spider_attack2',url:'snd/attacks/npc/spider_attack2.mp3',volume:50});
// Śmierci wrógów
ROS.Sound.createSound({id:'splash',url:'snd/wounds/splash.mp3',volume:50});


// Ataki brońmi
// MIECZE - BRONIE SIECZNE
ROS.Sound.createSound({id:'sword1',url:'snd/attacks/weapons/sword1.mp3',volume:50});
ROS.Sound.createSound({id:'sword2',url:'snd/attacks/weapons/sword2.mp3',volume:50});
ROS.Sound.createSound({id:'sword_hit1',url:'snd/attacks/weapons/sword_hit1.mp3',volume:50});
ROS.Sound.createSound({id:'sword_hit2',url:'snd/attacks/weapons/sword_hit2.mp3',volume:50});
ROS.Sound.createSound({id:'sword_hit3',url:'snd/attacks/weapons/sword_hit3.mp3',volume:50});

// PIĘŚCI - BRONIE OBUCHOWE
ROS.Sound.createSound({id:'fist1',url:'snd/attacks/weapons/fist1.mp3',volume:50});
ROS.Sound.createSound({id:'fist_hit1',url:'snd/attacks/weapons/fist_hit1.mp3',volume:50});
ROS.Sound.createSound({id:'fist_hit2',url:'snd/attacks/weapons/fist_hit2.mp3',volume:50});

// ŁUKI - BRONIE STRZELECKIE
ROS.Sound.createSound({id:'bow1',url:'snd/attacks/weapons/bow1.mp3',volume:100});
ROS.Sound.createSound({id:'bow_hit1',url:'snd/attacks/weapons/bow_hit1.mp3',volume:80});
ROS.Sound.createSound({id:'bow_hit2',url:'snd/attacks/weapons/bow_hit2.mp3',volume:80});
ROS.Sound.createSound({id:'bow_hit3',url:'snd/attacks/weapons/bow_hit3.mp3',volume:80});

// TŁO
ROS.Sound.createSound({id:'ambient_battle',url:'snd/ambient_battle2.mp3',volume:10,
	onfinish: function() { 
		this.play(); 			
	}
});
ROS.Sound.createSound({id:'ambient2',url:'snd/ambient2.mp3',volume:30,
	onfinish: function() { 			
		this.play(); 			
	}
});
