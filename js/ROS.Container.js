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

// Singleton zawierający spis elementów

// UWAGA: Ciała NPC muszą mieć opcje empty:true aby nie znikały po zabiciu NPC jesli nic sie w nich nie wylosuje
ROS.containers = {
	"chest": {
		"name":"Skrzynia",
		"capacity":8, // pojemnosc
		"empty": true, // czy może istnieć będąc pustym (znikna po opróżnieniu)
		"autoadd": true, // czy ma brać pod uwage ten kontener podczas tworzenia mapy
		"seethrou": false, // czy można z odległości rozpoznać co jest wewnątrz,		
		"lockable": true, // czy kontener moze byc zamykalny
		"destructable": true, // czy mozna go zniszczyc, jesli nie to wszelkie ataki nie odnoszą efektów
		"size":4, // okresla łatwosc trafienia zcelu z broni zasiegowej
		"icon":"gfx/mapLayers/stuff/chest.png",
		"iconDestroy":"gfx/mapLayers/stuff/chestDestroy.png", // ważne tylko jesli jest opcja destructable: true
		"iconBig":"gfx/mapLayers/stuff/chestIcon.png",
		"hitanim":"smoke",
		"stats": {
			"life": 10, // ilosc punktow "zycia" jesli spadnie do zera kontener jest zniszczony
			"toughness": 10 // wytrzymalosc kontenera
		}
	},
	"barrel": {
		"name":"Beczka",
		"capacity":4,
		"empty": true,
		"autoadd": true,
		"seethrou": false,
		"lockable": true, // czy kontener moze byc zamykalny
		"destructable": true, // czy mozna go zniszczyc, jesli nie to wszelkie ataki nie odnoszą efektów
		"size":4, // okresla łatwosc trafienia zcelu z broni zasiegowej
		"icon":"gfx/mapLayers/stuff/barrel.png",
		"iconDestroy":"gfx/mapLayers/stuff/barrelDestroy.png",		
		"iconBig":"gfx/mapLayers/stuff/barrelIcon.png",
		"hitanim":"smoke",
		"stats": {
			"life": 7, // ilosc punktow "zycia" jesli spadnie do zera kontener jest zniszczony
			"toughness": 8 // wytrzymalosc kontenera
		}
	},
	"dustpile": {
		"name":"Brud i śmieci",
		"capacity":2,
		"empty": false,
		"autoadd": true,
		"seethrou": true,
		"lockable": false, // czy kontener moze byc zamykalny
		"destructable": false, // czy mozna go zniszczyc, jesli nie to wszelkie ataki nie odnoszą efektów
		"size":2, // okresla łatwosc trafienia zcelu z broni zasiegowej
		"icon":"gfx/mapLayers/stuff/dustpile.png",
		"iconDestroy":"gfx/mapLayers/stuff/dustpile.png",		
		"iconBig":"gfx/mapLayers/stuff/dustpileIcon.png",
		"hitanim":"smoke",
		"stats": {
			"life": 0, // ilosc punktow "zycia" jesli spadnie do zera kontener jest zniszczony
			"toughness": 0 // wytrzymalosc kontenera
		}
	},
	"deadSpider": {
		"name":"Martwy pająk",
		"capacity":1,
		"empty": true,
		"autoadd": true,
		"seethrou": false,
		"lockable": false, // czy kontener moze byc zamykalny
		"destructable": false, // czy mozna go zniszczyc, jesli nie to wszelkie ataki nie odnoszą efektów
		"size":2, // okresla łatwosc trafienia zcelu z broni zasiegowej
		"icon":"gfx/npc/spider/dead.png",
		"iconDestroy":"gfx/npc/spider/dead.png",
		"iconBig":"gfx/npc/spider/deadIcon.png",
		"hitanim":"blood",
		"stats": {
			"life": 0, // ilosc punktow "zycia" jesli spadnie do zera kontener jest zniszczony
			"toughness": 0 // wytrzymalosc kontenera
		}
	},
	"deadBlackwidow": {
		"name":"Martwa Czarna Wdowa",
		"capacity":1,
		"empty": true,
		"autoadd": true,
		"seethrou": false,
		"lockable": false, // czy kontener moze byc zamykalny
		"destructable": false, // czy mozna go zniszczyc, jesli nie to wszelkie ataki nie odnoszą efektów
		"size":2, // okresla łatwosc trafienia zcelu z broni zasiegowej
		"icon":"gfx/npc/blackwidow/dead.png",
		"iconDestroy":"gfx/npc/blackwidow/dead.png",
		"iconBig":"gfx/npc/blackwidow/deadIcon.png",
		"hitanim":"blood",
		"stats": {
			"life": 0, // ilosc punktow "zycia" jesli spadnie do zera kontener jest zniszczony
			"toughness": 0 // wytrzymalosc kontenera
		}
	},
	"deadDummy": {
		"name":"Sterta desek",
		"capacity":3,
		"empty": true,
		"autoadd": true,
		"seethrou": true,
		"lockable": false, // czy kontener moze byc zamykalny
		"destructable": false, // czy mozna go zniszczyc, jesli nie to wszelkie ataki nie odnoszą efektów
		"size":3, // okresla łatwosc trafienia zcelu z broni zasiegowej
		"icon":"gfx/npc/dummy/dead.png",
		"iconDestroy":"gfx/npc/dummy/dead.png",
		"iconBig":"gfx/npc/dummy/deadIcon.png",
		"hitanim":"smoke",
		"stats": {
			"life": 0, // ilosc punktow "zycia" jesli spadnie do zera kontener jest zniszczony
			"toughness": 0 // wytrzymalosc kontenera
		}
	},
	"deadGhost": {
		"name":"Ektoplazma",
		"capacity":1,
		"empty": true,
		"autoadd": true,
		"seethrou": false,
		"lockable": false, // czy kontener moze byc zamykalny
		"destructable": false, // czy mozna go zniszczyc, jesli nie to wszelkie ataki nie odnoszą efektów
		"size":2, // okresla łatwosc trafienia zcelu z broni zasiegowej
		"icon":"gfx/npc/ghost/dead.png",
		"iconDestroy":"gfx/npc/ghost/dead.png",
		"iconBig":"gfx/npc/ghost/deadIcon.png",
		"hitanim":false,
		"stats": {
			"life": 0, // ilosc punktow "zycia" jesli spadnie do zera kontener jest zniszczony
			"toughness": 0 // wytrzymalosc kontenera
		}
	},
	"miscStuff": {
		"name":"Różne przedmioty",
		"capacity":9,
		"empty": false,
		"autoadd": false,
		"seethrou": true,
		"lockable": false, // czy kontener moze byc zamykalny
		"destructable": false, // czy mozna go zniszczyc, jesli nie to wszelkie ataki nie odnoszą efektów
		"size":2, // okresla łatwosc trafienia zcelu z broni zasiegowej
		"icon":"gfx/mapLayers/stuff/miscstuff.png",
		"iconDestroy":"gfx/mapLayers/stuff/miscstuff.png",
		"iconBig":"gfx/mapLayers/stuff/miscstuffIcon.png",
		"hitanim":false,
		"stats": {
			"life": 0, // ilosc punktow "zycia" jesli spadnie do zera kontener jest zniszczony
			"toughness": 0 // wytrzymalosc kontenera
		}
	}
};

// Klasa zajmuje się tworzeniem obiektów mogących przechowywać przedmioty
// Np: skrzynie, kufry, paki, wory, ciała, beczki itp itd
ROS.Container = (function() {

	return function(type,x,y) {
		
		var self = this;		

		this.container = ROS.tools.clone(ROS.containers[type]);
		
		// Statystyki bazowe dla cech
		// Ulegają zmianie tylko w przypadku awansu na wyższy poziom
		// Przechowują stany naturalne cech, czyli bez wpływu zewnętznych czynników
		// Wykorzystywane w celu odtworzenia stanu orginalnego cechy np: po uleczeniu
		this.solidStats = ROS.tools.clone(this.container.stats);

		// Kopia statystyk bazowych
		// Te statystyki zmieniają się w zależnosci od wpływu zewnetrznych czynników np: eliksir siły może zwiększych czasowo siłe
		this.cloneStats = ROS.tools.clone(this.container.stats);

		// Tworzy dodatkowe pola na charakterystyki które się wyczerpują,
		// przechowuja aktualny stan danej cechy. Na początku ustalane są na maksymalne wartości.
		this.actualStats = {
			"life": this.container.stats.life			
		};

		this.uniqid = 'container#'+ROS.tools.dice(100000);		

		// W tablicy gridContainers znajduje sie referencja obiektu kontenera
		// Dzieje sie tak podczas tworzenia mapy podziemia
		// ROS.dungeon.gridContainers[y][x] = this;

		// Do tablicy kontenerów wpisuje referencje
		ROS.base.containers[this.uniqid] = this;

		this.items = []; // tablica przchowujaca obiekty przedmiotów				
		for(var t=0; t<this.container.capacity; t++) {
			this.items[t] = 0;
		}

		this.width = 48;
		this.height = 48;
		this.left = x*ROS.base.tileWidth;
		this.top = y*ROS.base.tileHeight;
		this.tilex = x;
		this.tiley = y;				
		

		// Tworze graficzną interpretacje kontenera i umieszczam ją na warstwie gry
		var o = document.createElement("img");	
		o.src = 'gfx/blank.gif';
		o.style.width = this.width+'px';
		o.style.height = this.height+'px';
		o.style.position = 'absolute';
		o.style.zIndex = 16;
		o.style.left = this.left+'px';
		o.style.top = this.top+'px';	
		o.style.backgroundImage = 'url('+this.container.icon+')';
		ROS.map.area.appendChild(o);

		
		

		ROS.tools.addEvent(o,'mouseover',function() {
			
			// WAŻNA linijka - jesli najedziemy na cel podczas wyboru opcji z menu podrecznego to nie wywoluje dymka
			// automatycznie onTarget tez nie jest wywolywany zeby nie zmodyfikowac danych ustawionych przez checkAttack
			if (ROS.flyMenu.active) return;

			var info = '';
			var info2 = '';
			var x;
			var i = '';
			var ilosc = 0;
			if (!ROS.map.moving) {
				info = '<b>'+self.getName()+'</b>'+(self.isDestroy() ? ' (obiekt zniszczony)' : '')+'<br />';

				// jesli kontener znajduje sie w zasiegu wzroku bohaterow i posiada ceche seethrou
				if (ROS.dungeon.gridVisible[self.tiley][self.tilex] > 0) {					

					if (self.container.seethrou) {
					
						for(x in self.items) {
							if (self.items[x] !== 0) {
								ilosc++;
								info2 += '<img src="'+self.items[x].basic.icon+'" width="30" height="30" style="margin:2px; float:left;">';
							}
						}
						if (ilosc == 0) {
							info += 'Nie widzisz niczego ciekawego.<br />';
						} else {
							info += 'Z odległości dostrzegasz:<br />'+info2;
						}
					} else {
						info += 'Może coś zawierać.<br />';
					}

				} else {
					info += 'Niestety stoisz za daleko, aby dostrzec szczegóły.<br />';
				}
				
				if (!self.isDestroy() && self.isDestructable()) {
					i = ROS.playerFight.onTarget(self)+'<br />';						
				}

				ROS.fly.show(info+i,1,300);

			}
		});

		ROS.tools.addEvent(o,'mouseout',function() {
			ROS.fly.hide();
		});


		this.obj = o;		
		o = null;

		// Tworzy paletke na przedmioty
		// Kazdy kontener ma własną paletke
		this.palette = new ROS.Palette(300,195,this.container.name);		
		this.palette.pDiv.style.background = 'url(gfx/palettebg_small.gif)';
	
		// usuwa kontener
		this.destroy = function() {
			// usuwa przedmioty ktore były w kontenerze o ile jakies byly
			var x;
			for(x=0; x<this.items.length; x++) {
				if (this.items[x] instanceof ROS.Item) {
					this.items[x].destroy();
					this.items[x] = 0;
				}
			}

			this.palette.destroy();
			this.palette = null;
			ROS.map.area.removeChild(this.obj);
			this.obj = null;
			ROS.dungeon.gridContainers[this.tiley][this.tilex] = 0;
			delete ROS.base.containers[this.uniqid];
		};

		// Zwraca informacje o ilosci przedmiotów znajdujących się w kontenerze
		this.countItems = function() {
			var x;
			var count = 0;

			for(x=0; x<this.items.length; x++) {
				if (this.items[x] instanceof ROS.Item) {
					count++;
				}
			}
			return count;
		};

		// Tworzy puste komórki na przedmioty		
		this.createGrid = function() {
			var x, c, col, row, poz;			
	
			// Tworzy div przechowujący komórki kontenera
			var searchGrid = document.createElement("div");
			searchGrid.style.position = 'absolute';
			searchGrid.style.zIndex = 40;
			searchGrid.style.left = 147+'px';
			searchGrid.style.top = 5+'px';
			searchGrid.style.width = 145+'px';
			searchGrid.style.height = 145+'px';			
			searchGrid.style.overflow = 'hidden';
			this.palette.insertNodes(searchGrid);

			// Obrazek przedstawiający przeszukiwany kontener
			var icon = document.createElement("img");
			icon.src = this.container.iconBig;
			icon.style.position = 'absolute';
			icon.style.border = 0;			
			icon.style.top = 5+'px';
			icon.style.left = 5+'px';	
			this.palette.insertNodes(icon);

					
			for (x=0; x<this.items.length; x++) {				
				row = Math.floor(x/3); // zero dla pierwszego rzedu, jeden dla drugiego itd
				col = x-(row*3); 
					
				c = document.createElement("div");		
				c.id = 'searchGridField_'+self.uniqid+'_'+x;
				c.className = 'containerField';				
				c.style.zIndex = '41';				
				c.style.left = (col*48) + 'px';
				c.style.top = (row*48) + 'px';				
				searchGrid.appendChild(c);

				ROS.tools.addEvent(c,'mousedown',function(e) {

					// Sprawdza czy w komórce znajduje się przedmiot		                    					
					if (!this.hasChildNodes()) { return; } // jesli sie nie znajduje to nic nie robi i nie zatrzymuje propagacji

					ROS.mouse.down(e,true); // stopPropagation na tym poziomie
					
					switch(ROS.mouse.buttonDown) {
		                case 1: // Lewy przycisk myszki - Podniesienie przedmiotu z komórki		                    
		                    		                    	
	                    	ROS.Sound.play('take'); 
	                    	
	                    	var poz = this.id.split("_")[2];
	                    	ROS.fly.hide();

	                    	// tworzy nową referencje do obiektu przedmiotu
		                    var field = this;			                    
		                    
		                    ROS.flyBag.owner = self;
		                    ROS.flyBag.from = 'container';
		                    ROS.flyBag.item = self.items[poz];
		                    ROS.flyBag.giveBack = function() {
		                      	// Wraca obrazek na stare pole
		                        field.appendChild(ROS.flyBag.area.firstChild);
		                        ROS.flyBag.area.innerHTML = null;									
		                        
		                        // Przepisuje referencje na stare pole
								self.items[poz] = ROS.flyBag.item;
								ROS.flyBag.item = null;
								field = null;
		                    }
		                    
		                    // Przedmiot moze byc przekazany innym bohaterom
		                    // lub kontenerom będącym w styku z tym bohaterem
		                    // Odswieza liste odbiorców:			                    
		                    ROS.flyBag.setTargets(self.tilex,self.tiley);
		                    
		                    // przekłada ikonke z komórki do latającego diva
		                    ROS.flyBag.area.appendChild(this.firstChild);                    
		                    ROS.flyBag.show();

		                    // Usuwa referencje z tablicy
		                    // Jedyną referencja przedmiotu znajduje się w tech chwili w obiekcie ROS.flyBag.item
							self.items[poz] = 0;										                
		                break;
		            }
				});
				// puszczenie klawisza myszki przenoszącego przedmiot spowoduje wsadzenie go w komórke
				ROS.tools.addEvent(c,'mouseup',function(e) {				

					ROS.mouse.up(e,false); // nie zatrzymuje propadacji aby puszczenie myszki wywołało przerwanie przesuwania paletki kontenera

					// sprawdza czy był przenoszony przedmiot
					if (ROS.flyBag.item !== null) {						
						ROS.Sound.play('drop');						
						// upewniam się czy na polu nie znajduje sie inny przedmiot
						if (this.hasChildNodes()) { // pole zajęte
							var poz = this.id.split("_")[2];
							
							// Obsługa łaczenia złota na jednym polu
							if (ROS.flyBag.item.basic.type === 13 && self.items[poz].basic.type === 13) {	
								self.items[poz].basic.typeSpecific.howmuch += ROS.flyBag.item.basic.typeSpecific.howmuch; // dodaje wartosc przenoszonego zlota do zlota lezacego
							} else {														
								// W kazdym innym przypadku zwraca ikonke na pole z ktorego została podniesiona
								ROS.flyBag.giveBack();
							}
									
						} else {				
							// Sprawdza czy cel jest dozwolony
							if (ROS.flyBag.inTargets(self.uniqid)) {
								this.appendChild(ROS.flyBag.area.firstChild); // wstaw grafike przedmiotu do pola, grafika to jedyne dziecko ROS.flyBag.area	
							
								// Wstawia na nowe
								var poz = this.id.split("_")[2];							
								self.items[poz] = ROS.flyBag.item;
							} else {
								// wraca ikonke na pole z ktorego została podniesiona
								ROS.flyBag.giveBack();
								ROS.infoScroll.show('Obiekty znajdują się zbyt daleko od siebie, aby możliwa była wymiana przedmiotów.');							
							}
						}	
						ROS.flyBag.clear(); // wyłaczam wodzenie bloczka za kursorem	
						
						ROS.hud.refreshQuickMenuRef();				
					}
				});				
			}

			c = null;
			icon = null;
			searchGrid = null;
		};


		// wywołuje konstruktor
		this.createGrid();


		// Otwiera kontener pokazując jego zawartość
		this.startSearch = function() {
			this.fillGrid();
			ROS.base.activePlayer.showSheet('backpack');
			this.palette.show();			
		};


		// Rozkłada ikony przedmiotów w komórkach		
		this.fillGrid = function() {
			var x,p;
			for (x=0; x<this.items.length; x++) {
				p = ROS.tools.get('searchGridField_'+this.uniqid+'_'+x); // taki id mają komórki reprezentujące pola przeszukiwanego miejsca
				if (this.items[x] !== 0) {
					p.appendChild(this.items[x].gfx);					
				} else if (p.hasChildNodes()) {
					p.removeChild(p.firstChild);					
				}	
				p = null;			
			}	
		};



		// Dodaje przedmiot do skrzyni
		// Wywołuje się w przypadkach jesli przedmiot jest dodany NIE w trakcie przeszukiwania
		// argument moze byc stringiem - nazwa przedmiotu (wtedy tworzy nowy)
		// argument moze byc obiektem - przedmiotem
		this.addItem = function(item) {
			var x;
			for(x=0; x<this.items.length; x++) {
				// na pierwsze puste pole wstawia przedmiot
				if (this.items[x] == 0) {	
					if (item instanceof ROS.Item) {
						this.items[x] = item;
					} else {					
						this.items[x] = new ROS.Item(item);					
					}
					return true;
				}
			}
			ROS.tools.console("warn",'Brak miejsca w kontenerze ('+this.uniqid+')');
			ROS.infoScroll.show('<br>UWAGA:<br>Brak miejsca na przedmiot.');
                
			return false;
		};

		// Wypełnia kontener przedmioty z okreslonego przedzialu rzadkości - rarity
		this.addItems = function(rarity) {
			// losuje przedmioty i wkłada do skrzyni
            var cap = this.container.capacity; // pojemnosc
            var nit = (ROS.tools.dice(cap)-1); // max = capacity, min = 0
            var y,r,rt,i,itemNr;
            var ile_dodanych = 0;

            for (y=0; y<nit; y++) {

                // każdy przedmiot ma inną rzadkość występowania.
                // skala rzadkości jest od 1 - 20
                // wykonuje rzut k20 który okresli z jakiej puli przedmiot to będzie
                r = ROS.tools.dice(rarity);                
                
                //ROS.tools.console('log',r);

                // Przelatuje po wszystkich przedmiotach i wybiera tylko te ktore mają RARITY <= r
                rt = [];
                for (i in ROS.items) {
                    if (ROS.items[i].rarity <= r) {
                        rt.push(i);
                        //ROS.tools.console('log','tab '+i);
                    }
                }
                // jesli takie znalazl to wylosowuje z nich jeden
                if (rt.length > 0) {
                    itemNr = (ROS.tools.dice(rt.length)-1); // losuje numer przedmiotu
                    this.addItem(rt[itemNr]);
                    //ROS.tools.console('log','2tab '+rt[itemNr]); 
                    ile_dodanych++;                   
                }
            }

            return ile_dodanych;
		};





		this.hurt = function(wounds) {
			
			// Animacja jest odtwarzana tylko jesli obiekt znajduje sie w zasiegu wzroku
			// Animacje efektu uderzenia widać bez wzgledu na to czy przedmiot jest zniszczony, zniszczalny czy cokolwiek, skoro przywalisz to widac ;)
			if (ROS.dungeon.gridVisible[this.tiley][this.tilex] > 0) {				
				
				if (this.container.hitanim) {
					var anim = new ROS.Animation(this.container.hitanim);
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
								"scale": 1,
								"opacity": 0,
								"rotate": 10
							}
						},

						"speed": 70,
						"zindex": 18
					});						
				}
			}


			if (!this.container.destructable) return;

			if (wounds > 0) {
				this.actualStats.life -= wounds;			
			}				
				
			// Animacja jest odtwarzana tylko jesli obiekt znajduje sie w zasiegu wzroku
			if (ROS.dungeon.gridVisible[this.tiley][this.tilex] > 0) {				
								
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

			// sprawdzamy czy obrazenia zadane przez atak spowodowaly śmierć
			if (this.actualStats.life <= 0) {				
				this.die(wounds); // CEL GINIE (jesli gracz to nieprzytomny)
				return;
			}	
			
		};

		this.die = function(wounds) {			
			this.actualStats.life = 0;			
			// podmieniam ikone na wersje zniszczoną
			this.obj.style.background = 'url('+this.container.iconDestroy+')';
			this.container.seethrou = true; // zniszczony kontener = widac co zawiera
			ROS.console.addLine('<b>'+this.getName()+'</b> - <span style="color:#ff0000">obiekt zniszczony !</span>');
		};

		this.getName = function() {
			return this.container.name;
		};
		this.getSize = function() {
			return this.container.size;
		};
		this.getToughness = function() {
			return this.cloneStats.toughness;
		};
		this.getArmour = function() {
			return 0;
		};
		this.isDestroy = function() {
			if (this.container.destructable && this.actualStats.life <= 0)	{
				return true;
			}		
			return false;
		};
		this.isDestructable = function() {
			return this.container.destructable;
		}
		
	};

})();