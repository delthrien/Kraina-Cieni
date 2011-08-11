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

// Singleton zawierający spis elementów
ROS.doors = {
	"wooden_door": {
		"name":"Drewniane drzwi",		
		"destructable": true,
		"openable": true,
		"transparent":false,
		"transitivity":false,
		"iconSet":"gfx/mapLayers/doors/",
		"iconDestroy":['woodDestroy1.png','woodDestroy2.png','woodDestroy3.png','woodDestroy4.png'],
		"iconClose" :['woodClose1.png','woodClose2.png','woodClose3.png','woodClose4.png'],
		"hitanim":"smoke",
		"stats": {
			"life": 50, // ilosc punktow "zycia" jesli spadnie do zera drzwi są zniszczone
			"toughness": 8 // wytrzymalosc drzwi
		}
	},
	"spider_web": {
		"name":"Pajęcza sieć",		
		"destructable": true,
		"openable": false,
		"transparent":true,
		"transitivity":false,
		"iconSet":"gfx/mapLayers/doors/",
		"iconDestroy":['webDestroy1.png','webDestroy2.png','webDestroy3.png','webDestroy4.png'],
		"iconClose" :['webClose1.png','webClose2.png','webClose3.png','webClose4.png'],
		"hitanim":false,
		"stats": {
			"life": 5, // ilosc punktow "zycia" jesli spadnie do zera drzwi są zniszczone
			"toughness": 2 // wytrzymalosc drzwi
		}
	},
	"steel_grating": {
		"name":"Stalowa krata",		
		"destructable": true,
		"openable": true,
		"transparent":true,
		"transitivity":false,
		"iconSet":"gfx/mapLayers/doors/",
		"iconDestroy":['gratingDestroy1.png','gratingDestroy2.png','gratingDestroy3.png','gratingDestroy4.png'],
		"iconClose" :['gratingClose1.png','gratingClose2.png','gratingClose3.png','gratingClose4.png'],
		"hitanim":"smoke",
		"stats": {
			"life": 5, // ilosc punktow "zycia" jesli spadnie do zera drzwi są zniszczone
			"toughness": 6 // wytrzymalosc drzwi
		}
	}
}

// Klasa zajmuje się tworzeniem drzwi
ROS.Door = (function() {

	return function(type,rotate,x,y) {

		var self = this;
		var door = ROS.tools.clone(ROS.doors[type]);
		var stan = 0; // zamkniete
		var actionFlag = 0; // zapobiega kilkukrotnemu wywołaniu animacji przed zakonczeniem poprzedinej

		this.uniqid = 'door#'+ROS.tools.dice(100000);

		ROS.base.doors[this.uniqid] = this;

		// Statystyki bazowe dla cech
		// Przechowują stany naturalne cech, czyli bez wpływu zewnętznych czynników
		// Wykorzystywane w celu odtworzenia stanu orginalnego cechy np: po uleczeniu
		this.solidStats = ROS.tools.clone(door.stats);

		// Kopia statystyk bazowych
		// Te statystyki zmieniają się w zależnosci od wpływu zewnetrznych czynników np: eliksir siły może zwiększych czasowo siłe
		this.cloneStats = ROS.tools.clone(door.stats);

		// Tworzy dodatkowe pola na charakterystyki które się wyczerpują,
		// przechowuja aktualny stan danej cechy. Na początku ustalane są na maksymalne wartości.
		this.actualStats = {
			"life": door.stats.life			
		};

		this.tilex = x; // reprezentuje górne lewe pole obiektu
		this.tiley = y; // reprezentuje górne lewe pole obiektu
		this.left = x*ROS.base.tileWidth;
		this.top = y*ROS.base.tileHeight;
		this.width = 96;
		this.height = 96;
		this.rotate = rotate;
		this.transparent = door.transparent; // widocznosc
		this.transitivity = door.transitivity; // przechodniosc
		this.destructable = door.destructable;
		this.openable = door.openable;
		this.destroyed = false;
		this.size = 6; // Wszystkie drzwi mają rozmiar wielki (ulatwia trafienie z broni zasiegowej)
		this.hitanim = door.hitanim;

		var tt = 0; // nic nie ogranicza
		if (door.transparent === false && door.transitivity === false) {
			tt = 3; // ogranicza widocznosc i przechodzenie
		} else if (door.transparent === false && door.transitivity === true) {
			tt = 1; // ogranicza widocznosc
		} else if (door.transparent === true && door.transitivity === false) {
			tt = 2; // ogranicza przechodzenie
		}


		// Wewnetrzna siatka obiektu
		this.gridObj = [];
		for(y=0; y<2; y++) {
			this.gridObj[y] = [];
			for(x=0; x<2; x++) {
				this.gridObj[y][x] = 0;
			}
		}

		// Tworze graficzną interpretacje drzwi i umieszczam ją na warstwie gry
		// Drzwi składają się z 4 elementów i zajmują przestrzeń 2x2 tile
		var c = document.createElement("div");
		c.style.width = this.width+'px';
		c.style.height = this.height+'px';
		c.style.position = 'absolute';
		c.style.zIndex = 16;
		c.style.left = this.left+'px';
		c.style.top = this.top+'px';
		c.style.overflow = 'hidden';
		ROS.map.area.appendChild(c);

		ROS.tools.addEvent(c,'mouseover',function(e) {			
			
			// WAŻNA linijka - jesli najedziemy na cel podczas wyboru opcji z menu podrecznego to nie wywoluje dymka
			// automatycznie onTarget tez nie jest wywolywany zeby nie zmodyfikowac danych ustawionych przez checkAttack
			if (ROS.flyMenu.active) return;

			var info = '';
			var i = '';			
			if (!ROS.map.moving) {
				info = '<b>'+self.getName()+'</b>'+(self.isDestroy() ? ' (obiekt zniszczony)' : '')+'<br />';

				if (!self.isDestroy() && self.isDestructable()) {
					i = ROS.playerFight.onTarget(self)+'<br />';						
				}

				ROS.fly.show(info+i,1,300);	
			}
		});

		ROS.tools.addEvent(c,'mouseout',function() {
			ROS.fly.hide();
		});

		this.obj = c;		
		ROS.tools.rotate(c,rotate);
		c = null;

		


		var o1 = document.createElement("img");
		var o1s = o1.style;
		o1.src = 'gfx/blank.gif';
		o1s.width = ROS.base.tileWidth+'px';
		o1s.height = ROS.base.tileHeight+'px';
		o1s.position = 'absolute';
		o1s.zIndex = 16;
		o1s.left = 0+'px';
		o1s.top = 0+'px';
		o1s.backgroundImage = 'url('+door.iconSet+door.iconClose[0]+')';
		this.obj.appendChild(o1);		

		var o2 = document.createElement("img");
		var o2s = o2.style;
		o2.src = 'gfx/blank.gif';
		o2s.width = ROS.base.tileWidth+'px';
		o2s.height = ROS.base.tileHeight+'px';
		o2s.position = 'absolute';
		o2s.zIndex = 16;
		o2s.left = 48+'px';
		o2s.top = 0+'px';
		o2s.backgroundImage = 'url('+door.iconSet+door.iconClose[1]+')';
		this.obj.appendChild(o2);		

		var o3 = document.createElement("img");
		var o3s = o3.style;
		o3.src = 'gfx/blank.gif';
		o3s.width = ROS.base.tileWidth+'px';
		o3s.height = ROS.base.tileHeight+'px';
		o3s.position = 'absolute';
		o3s.zIndex = 16;
		o3s.left = 0+'px';
		o3s.top = 48+'px';
		o3s.backgroundImage = 'url('+door.iconSet+door.iconClose[2]+')';
		this.obj.appendChild(o3);

		var o4 = document.createElement("img");
		var o4s = o4.style;
		o4.src = 'gfx/blank.gif';
		o4s.width = ROS.base.tileWidth+'px';
		o4s.height = ROS.base.tileHeight+'px';
		o4s.position = 'absolute';
		o4s.zIndex = 16;
		o4s.left = 48+'px';
		o4s.top = 48+'px';
		o4s.backgroundImage = 'url('+door.iconSet+door.iconClose[3]+')';
		this.obj.appendChild(o4);
		
		// Wypełnia siatke grafikami
		if (this.rotate === 0) {
			// 1 2
			// 3 4
			this.gridObj[0][0] = o1;
			this.gridObj[0][1] = o2;
			this.gridObj[1][0] = o3;
			this.gridObj[1][1] = o4;

			ROS.dungeon.gridRelationship[this.tiley][this.tilex]     = '0'+tt+''+tt+''+tt+'0000';
			ROS.dungeon.gridRelationship[this.tiley][this.tilex+1]   = '00000'+tt+''+tt+''+tt;
			ROS.dungeon.gridRelationship[this.tiley+1][this.tilex]   = '0'+tt+''+tt+''+tt+'0000';
			ROS.dungeon.gridRelationship[this.tiley+1][this.tilex+1] = '00000'+tt+''+tt+''+tt;

		} else {
			// siatka przekręca sie zgodnie z ruchem zegara o 90 stopni w prawo
			// 3 1
			// 4 2
			this.gridObj[0][0] = o3;
			this.gridObj[0][1] = o1;
			this.gridObj[1][0] = o4;
			this.gridObj[1][1] = o2;

			ROS.dungeon.gridRelationship[this.tiley][this.tilex]     = '000'+tt+''+tt+''+tt+'00';
			ROS.dungeon.gridRelationship[this.tiley][this.tilex+1]   = '000'+tt+''+tt+''+tt+'00';
			ROS.dungeon.gridRelationship[this.tiley+1][this.tilex]   = tt+''+tt+'00000'+tt;
			ROS.dungeon.gridRelationship[this.tiley+1][this.tilex+1] = tt+''+tt+'00000'+tt;
		}

		o1 = null;
		o2 = null;
		o3 = null;
		o4 = null;

		// -- Koniec Konstruktora --


		// Ustawia widoczność wskazanego kawałka obiektu
		this.setVisibility = function(x,y,d,o) {
			var innerx = (x - this.tilex);
			var innery = (y - this.tiley);

			this.gridObj[innery][innerx].style.display = d;
			this.gridObj[innery][innerx].style.opacity = o;
		};
		

		this.close = function() {
			if (this.rotate === 0) {
				ROS.dungeon.gridRelationship[this.tiley][this.tilex]     = '0'+tt+''+tt+''+tt+'0000';
				ROS.dungeon.gridRelationship[this.tiley][this.tilex+1]   = '00000'+tt+''+tt+''+tt;
				ROS.dungeon.gridRelationship[this.tiley+1][this.tilex]   = '0'+tt+''+tt+''+tt+'0000';
				ROS.dungeon.gridRelationship[this.tiley+1][this.tilex+1] = '00000'+tt+''+tt+''+tt;
			} else {
				ROS.dungeon.gridRelationship[this.tiley][this.tilex]     = '000'+tt+''+tt+''+tt+'00';
				ROS.dungeon.gridRelationship[this.tiley][this.tilex+1]   = '000'+tt+''+tt+''+tt+'00';
				ROS.dungeon.gridRelationship[this.tiley+1][this.tilex]   = tt+''+tt+'00000'+tt;
				ROS.dungeon.gridRelationship[this.tiley+1][this.tilex+1] = tt+''+tt+'00000'+tt;
			}

			self.closeAnim(39);
		};

		this.closeAnim = function(loop) {
			if (loop >= 0) {
				if (self.rotate === 0) {
					this.gridObj[0][0].style.top = -loop + 'px';
					this.gridObj[0][1].style.top = -loop + 'px';
					this.gridObj[1][0].style.top = (loop + 48) + 'px';
					this.gridObj[1][1].style.top = (loop + 48) + 'px';
				} else {
					this.gridObj[0][0].style.top = (loop + 48) + 'px';
					this.gridObj[0][1].style.top = -loop + 'px';
					this.gridObj[1][0].style.top = (loop + 48) + 'px';
					this.gridObj[1][1].style.top = -loop + 'px';
				}

				setTimeout(function() { self.closeAnim(loop-1); },50);
			} else {
				ROS.dungeon.createLos(true);

				stan = 0;
				actionFlag = 0;
			}
		};

		this.open = function() {
			if (ROS.tools.dice(2) == 1) { ROS.Sound.play('dooropen1'); }
            else { ROS.Sound.play('dooropen2'); }

			// w zaleznosci od rodzaju efekt jest rozny nie wszystkie da sie otworzyc
			// niektore tylko zniszczyc
			ROS.dungeon.gridRelationship[this.tiley][this.tilex]     = '00000000';
			ROS.dungeon.gridRelationship[this.tiley][this.tilex+1]   = '00000000';
			ROS.dungeon.gridRelationship[this.tiley+1][this.tilex]   = '00000000';
			ROS.dungeon.gridRelationship[this.tiley+1][this.tilex+1] = '00000000';
			//this.obj.style.display = 'none';

			self.openAnim(0);
		};

		this.openAnim = function(loop) {
			if (loop < 40) {
				if (self.rotate === 0) {
					this.gridObj[0][0].style.top = -loop + 'px';
					this.gridObj[0][1].style.top = -loop + 'px';
					this.gridObj[1][0].style.top = (loop + 48) + 'px';
					this.gridObj[1][1].style.top = (loop + 48) + 'px';
				} else {
					this.gridObj[0][0].style.top = (loop + 48) + 'px';
					this.gridObj[0][1].style.top = -loop + 'px';
					this.gridObj[1][0].style.top = (loop + 48) + 'px';
					this.gridObj[1][1].style.top = -loop + 'px';
				}

				// w polowie otwarcia widac juz co jest za nimi
				if (loop == 20) {
					ROS.dungeon.createLos(true);
				}

				setTimeout(function() { self.openAnim(loop+1); },50);
			} else {				
				stan = 1;
				actionFlag = 0;
			}
		};

		this.toggle = function() {
			// otwierac mozna tylko przegrody które na to pozwalają
			if (door.openable) {
				if (actionFlag === 0) {
					actionFlag = 1;
					if (stan === 0) {
						self.open();
					} else {
						self.close();
					}
				}
			} else {
				ROS.console.addLine("Nic z tego.");
			}
		};



		this.hurt = function(wounds) {
			if (!door.destructable) return;

			if (wounds > 0) {
				this.actualStats.life -= wounds;			
			}				
				
			// Animacja jest odtwarzana tylko jesli chociaz jeden element drzwi znajduje sie w zasiegu wzroku
			if (ROS.dungeon.gridVisible[this.tiley][this.tilex] > 0 ||
				ROS.dungeon.gridVisible[this.tiley][this.tilex+1] > 0 ||
				ROS.dungeon.gridVisible[this.tiley+1][this.tilex] > 0 ||
				ROS.dungeon.gridVisible[this.tiley+1][this.tilex+1] > 0) {				
				
				if (this.hitanim) {
					var anim = new ROS.Animation(this.hitanim);
					var aPozx = (this.left+(this.width/2))-(anim.width/2);
					var aPozy = (this.top+(this.height/2))-(anim.height/2);
					anim.moveAbs(aPozx,aPozy);
					anim.ignite({
						"repetitions": 1,

						"transform": {
							"mode": 0, // jesli 1 to modyfikuje dla całej długosci animacji jesli 0 to dotyczy jednego powtorzenia
							"start": {
								"scale": 1,
								"opacity": 1,
								"rotate": 0
							},
							"end": {
								"scale": 2.5,
								"opacity": 0,
								"rotate": 10
							}
						},

						"speed": 70,
						"zindex": 18
					});						
				}

				// animacja wartości zadanych obrażeń
				var woundsAnim = new ROS.Animation('wounds');
				var aPozx = (this.left+(this.width/2))-(woundsAnim.width/2);
				var aPozy = (this.top+(this.height/2))-(woundsAnim.height/2);
				woundsAnim.moveAbs(aPozx,aPozy);
				woundsAnim.innerObj.innerHTML = '<span style="color:#fff; background:#333; border-radius:2px; font-size:18px; font-weight:bold; opacity:0.7;">-'+wounds+'</span>';
				woundsAnim.igniteMove({
					"repetitions": 30,
					"transform": {
	                     "mode": 1, // jesli 1 to modyfikuje dla całej długosci animacji jesli 0 to dotyczy jednego powtorzenia
	                     "start": {                     
	                        "scale": 0.8,
	                        "opacity": 1
	                     },
	                     "end": {                     
	                        "scale": 1.5,
	                        "opacity": 0                  
	                     }
	                },
	                
					"start_x": aPozx,
					"start_y": aPozy,
					"stop_x": aPozx,
					"stop_y": self.top-50,
					"zindex": 100,
					"speed": 70					
				});	
			}

			// sprawdzamy czy obrazenia zadane przez atak spowodowaly zniszczenie
			if (this.actualStats.life <= 0) {				
				this.die(wounds); // CEL GINIE (jesli gracz to nieprzytomny)
				return;
			}	
			
		};

		this.die = function(wounds) {			
			this.actualStats.life = 0;			
			// podmieniam ikone na wersje zniszczoną
			
			// Wypełnia siatke grafikami
			if (this.rotate === 0) {
				// 1 2
				// 3 4
				this.gridObj[0][0].style.background = 'url('+door.iconSet+door.iconDestroy[0]+')';
				this.gridObj[0][1].style.background = 'url('+door.iconSet+door.iconDestroy[1]+')';
				this.gridObj[1][0].style.background = 'url('+door.iconSet+door.iconDestroy[2]+')';
				this.gridObj[1][1].style.background = 'url('+door.iconSet+door.iconDestroy[3]+')';

				// Ustawiam w stan zamkniety
				this.gridObj[0][0].style.top = 0+'px';
				this.gridObj[0][1].style.top = 0+'px';
				this.gridObj[1][0].style.top = 48+'px';
				this.gridObj[1][1].style.top = 48+'px';				
			} else {				
				// 3 1
				// 4 2
				this.gridObj[0][0].style.background = 'url('+door.iconSet+door.iconDestroy[2]+')';
				this.gridObj[0][1].style.background = 'url('+door.iconSet+door.iconDestroy[0]+')';
				this.gridObj[1][0].style.background = 'url('+door.iconSet+door.iconDestroy[3]+')';
				this.gridObj[1][1].style.background = 'url('+door.iconSet+door.iconDestroy[1]+')';				

				// Ustawiam w stan zamkniety
				this.gridObj[0][0].style.top = 48+'px';
				this.gridObj[0][1].style.top = 0+'px';
				this.gridObj[1][0].style.top = 48+'px';
				this.gridObj[1][1].style.top = 0+'px';
			}



			ROS.dungeon.gridRelationship[this.tiley][this.tilex]     = '00000000';
			ROS.dungeon.gridRelationship[this.tiley][this.tilex+1]   = '00000000';
			ROS.dungeon.gridRelationship[this.tiley+1][this.tilex]   = '00000000';
			ROS.dungeon.gridRelationship[this.tiley+1][this.tilex+1] = '00000000';

			// ustawienia dla zniszczonych drzwi
			door.destructable = false;
			door.openable = false;
			door.transparent = true;
			door.transitivity = true;
			door.destroyed = true;

			// odświeża zakresy widzenia			
			ROS.dungeon.createLos(true); // globalny dla wszystkich

			// odswieża guziki hud (chodzi o guzik otwarcia drzwi - po zniszczeniu drzwi znika)
			ROS.hud.refresh();

			ROS.console.addLine('<b>'+this.getName()+'</b> - <span style="color:#ff0000">obiekt zniszczony !</span>');
		};

		this.getName = function() {
			return door.name;
		};
		this.getSize = function() {
			return this.size;
		};
		this.getToughness = function() {
			return this.cloneStats.toughness;
		};
		this.getArmour = function() {
			return 0;
		};
		this.isDestroy = function() {
			return door.destroyed;
		};
		this.isDestructable = function() {
			return door.destructable;
		}

	};

})();