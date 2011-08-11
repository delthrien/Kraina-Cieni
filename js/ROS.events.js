
ROS.events = {
	list: {
		'newNpc':{
			'name':'Nowi wrogowie',
			'chance': 80			
		},
		'collapse':{
			'name':'Trzęsienie ziemi',
			'chance': 50
		}
	},

	choosenEvent: null,

	startPhase: function() {		
		var x;
		var rzut = ROS.tools.dice(100); // Sprawdza szanse
		var ev = [];		

		// Tworzy liste wszystkich zdarzeń które mają szanse wiekszą lub równą rzutowi
		for(x in ROS.events.list) {
			if (ROS.events.list[x].chance >= rzut) {
				ev.push(x);
			}
		}
		if (ev.length > 0) {			
			ROS.events.choosenEvent = ev[ROS.tools.dice(ev.length)-1];
			ROS.microScroll.show('Trwa tura zdarzeń: <b>'+ROS.events.list[ROS.events.choosenEvent].name+'</b>','#ff0000');
			ROS.console.addLine('<b>'+ROS.events.list[ROS.events.choosenEvent].name+'</b> (rzut: <span style="color:#ff0000">'+rzut+'</span>)<br>');
			// Odpalamy
			(ROS.events[ROS.events.choosenEvent])(ROS.events.endPhase);
		} else {
			ROS.console.addLine('<b>Brak zdarzeń tym razem cisza i spokój</b> (rzut: <span style="color:#ff0000">'+rzut+'</span>)<br>');
			ROS.events.endPhase();
		}
	},
	endPhase: function() {
		//ROS.microScroll.hide();
		ROS.base.phaseNext(); // przechodzi do kolejnej fazy po fazie zdarzeń
	},




	newNpc: function(onFinish) {
		// var lvl = ROS.tools.warriorsLevel(); // określam średni poziom drużyny
		// Losuje ile
		var min_npc = 1;
		var max_npc = ROS.tools.dice(10);		
		ROS.dungeon.createNPC(min_npc,max_npc,true);

		if (onFinish) {
			(onFinish)();
		}	
	},




	collapse: function(onFinish) {
		var sila = 8; // siła drgania (px)
		var ilosc = 35; // ile wstrząsów 		
		var x = parseInt(ROS.map.area.style.left,10);
		var y = parseInt(ROS.map.area.style.top,10);
		var xs = x+sila;
		var ys = y+sila;
		ROS.events.collapseShake(xs,ys,ilosc,sila,onFinish,x,y);
	},
	collapseShake: function(x,y,ilosc,sila,onFinish,xorg,yorg) {		
		if (ilosc == 0) {
			ROS.map.area.style.left = xorg + 'px';
			ROS.map.area.style.top = yorg + 'px';

			// Kazdy z graczy cierpi rany po trzesieniu
			for(x in ROS.base.heroes) {
				ROS.base.heroes[x].hurt(ROS.tools.dice(4)-1); // 0-3 obrazenia
			} 

			if (onFinish) {
				(onFinish)();
			}				
		} else {
			var mx = ROS.tools.dice(sila*2);
			var my = ROS.tools.dice(sila*2);
			ROS.map.area.style.left = (x-mx) + 'px';
			ROS.map.area.style.top = (y-my) + 'px';
			
			setTimeout(function() { ROS.events.collapseShake(x,y,(ilosc-1),sila,onFinish,xorg,yorg); },80);
		}
	}

};