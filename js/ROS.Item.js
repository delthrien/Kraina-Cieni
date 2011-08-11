/*!
 *  Copyright (C) 2011 Marcin Danysz (skrzynkapanamarcina@gmail.com)    
 *
 *  @Kraina Cieni is Browser-Based Dungeon-Crawl game
 *  @Link: http://www.krainacieni.pl
 *
 *  This file is part of Kraina Cieni.
 *
 *  Kraina Cieni is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
 *  Kraina Cieni is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License along with Kraina Cieni. If not, see <http://www.gnu.org/licenses/>.
 */

/*
Typy
0 - hełm 
1 - naszyjnik 
2 - płaszcz 
3 - zbroja
4 - broń do walki wręcz 
    - hand
    - range
    - damage
    - sounds
    - animate
    
5 - broń do walki zasięgowej 
    - hand
    - range
    - damage
    - sounds
    - animate
    - animateMove

6 - tarcza 
7 - pas 
8 - pierscien 
9 - rękawice 
10 - buty 
11 - eliksiry
    - portion (dawki)
    
12 - ekwipunek pomocniczy : liny, latarnie, inne 
13 - złoto
    - howmuch (ilosc)
*/


// Obiekt przedmiotów
ROS.items = {

    "hands": {
        "rarity": 21, // poza skalą niegdy nie są wylosowane
        "basic": {
            "name": "Pięści",
            "cost": 0,
            "icon": "gfx/blank.gif",
            "type": 4, // bron
            "typeSpecific": {
                "hand": 1, // 1 lub 2
                "range": 1, // zasieg
                "damage": 0, // Pięści nic nie dodają liczy sie tylko sila postaci + dorzut
                "magic": false, // czy broń zadaje magiczne obrażenia 
                "conditionMax": 99999, // maksymalna kondycja broni
                "sounds": {
                    "attack": "fist1", // dzwiek ataku
                    "hit": "fist_hit1,fist_hit2" // dzwiek trafienia
                },
                "animate": "slash" // katalog z plikami graficznymi animujacymi atak bronią
            }
        }
    },

    "dagger": {
        "rarity": 4, 
        "basic": {
            "name": "Nóż", 
            "priceMax": 75,
            "icon": "gfx/items/dagger.png",
            "type": 4, // bron
            "typeSpecific": {
                "hand": 1, // 1 lub 2
                "range": 1, // zasieg (jeden czyli cel musi stac na polu sasiadujacym z bohaterem)
                "damage": "1d4", // ilosc zadanych obrazen
                "magic": false, // czy broń zadaje magiczne obrażenia 
                "conditionMax": 50, // maksymalna kondycja broni
                "sounds": {
                    "attack": "sword1", // dzwiek ataku
                    "hit": "sword_hit1,sword_hit2,sword_hit3" // dzwiek trafienia
                },
                "animate": "slash" // katalog z plikami graficznymi animujacymi atak bronią
            }
        }
    },

    "magicDagger": {
        "rarity": 15, 
        // Dane podstawowe
        "basic": {
            "name": "Sztylet światła",
            "priceMax": 150,
            "icon": "gfx/items/magicdagger.png",
            "magic": { // okresla czy przedmiot jest magiczny
                "manaMax": 12, // pojemnosc mocy magicznej
                "manaAutoRestore": 2 // czy mana sama sie odnawia (jesli > 0 to okresla ilosc odzyskiwanych punktow many na ture)
            }, 
            "type": 4, // bron
            "typeSpecific": {
                "hand": 1, // ilureczna
                "range": 1, // zasieg (jeden czyli cel musi stac na polu sasiadujacym z bohaterem)
                "damage": "1d6", // obrazenia    
                "magic": true, // czy broń zadaje magiczne obrażenia               
                "conditionMax": 150, // maksymalna kondycja broni
                "sounds": {
                    "attack": "sword1", // dzwiek ataku
                    "hit": "sword_hit1,sword_hit2,sword_hit3" // dzwiek trafienia
                },
                "animate": "slash" // katalog z plikami graficznymi animujacymi atak bronią
            }
        },
        
        "effects": {            
            "whenUse":  "lightstorm",
            "whenWear": "light"
        }
    },
    
    // Aby wypic eliksir należy go użyc na celu (na sobie lub innej osobie)        
    // Jeśli eliksir posiada magiczne wlasciwości, koniecznosc poboru magicznej mocy jest niezależna od ilości dawek
    // Np: Eliksir ma 2 dawki magicznego wywaru, 
    "potionHeal": {
        "rarity": 7,
        "basic": {
            "name": "Eliksir leczenia",
            "priceMax": 300,
            "icon": "gfx/items/potion_wounds.png",
            "type": 11, // eliksir  
            "typeSpecific": {
                "portionMax": 3, // ilośc dawek w buteleczce
                "icon2": "gfx/items/potion_empty.png"
            }
        },
        
        "effects": {
            "whenUse": "heal"            
        }                                 
    },

    "shield": { 
        "rarity": 4, 
        "basic": {
            "name": "Tarcza", 
            "priceMax": 30, 
            "icon": "gfx/items/shield.png",                
            "type": 6, // tarcza 
            "typeSpecific": {
                "hand": 1,
                "armour": 2,
                "conditionMax": 40 // maksymalna kondycja zbroi
            }                                        
        }    
    },

    "gold": {
        "rarity": 3, 
        "basic": {
            "name": "Złoto", 
            "priceMax": 0, 
            "icon": "gfx/items/gold.png",                
            "type": 13, // złoto
            "typeSpecific": {
                "howmuch":"1d12"
            }                                        
        }
    },


    "goldPile": {
        "rarity": 8, 
        "basic": {
            "name": "Dużo złota", 
            "priceMax": 0, 
            "icon": "gfx/items/goldpile.png",                
            "type": 13, // złoto
            "typeSpecific": {
                "howmuch":"2d12+5"
            }                                        
        }
    },


    "bow": { 
        "rarity": 4, 
        "basic": {
            "name": "Łuk",
            "priceMax": 75,
            "icon": "gfx/items/bow.png",
            "type": 5,
            "typeSpecific": {
                "hand": 2,
                "range": 5, // zasięg broni ilość pól wokół gracza - tylko dla broni
                "damage": "3d8+10",
                "magic": false, // czy broń zadaje magiczne obrażenia 
                "conditionMax": 50, // maksymalna kondycja broni
                "sounds": {
                    "attack": "bow1", // dzwiek ataku
                    "hit": "bow_hit1,bow_hit2,bow_hit3" // dzwiek trafienia
                },
                "animate": "arrow", // katalog z plikami graficznymi animujacymi atak bronią
                "animateMove": true // czy animacja ma sie przesuwac w kierunku celu
            }
        },

        "effects": {
            "whenHit": "test"            
        }                     
    },
    

    "crossbow": { 
        "rarity": 5, 
        "basic": {
            "name": "Kusza powtarzalna",
            "priceMax": 75,
            "icon": "gfx/items/crossbow.png",
            "type": 5, 
            "typeSpecific": {
                "hand": 1,
                "range": 5, // zasięg broni ilość pól wokół gracza - tylko dla broni
                "damage": "3d8+10",
                "magic": false, // czy broń zadaje magiczne obrażenia 
                "conditionMax": 60, // maksymalna kondycja broni
                "sounds": {
                    "attack": "bow1", // dzwiek ataku
                    "hit": "bow_hit1,bow_hit2,bow_hit3" // dzwiek trafienia
                },
                "animate": "arrow", // katalog z plikami graficznymi animujacymi atak bronią
                "animateMove": true // czy animacja ma sie przesuwac w kierunku celu
            }
        }            
    }
};





// Klasa PRZEDMIOT
ROS.Item = (function() {
    
    return function(id){
        
        if (!ROS.items.hasOwnProperty(id)) {
            ROS.tools.console("warn",'Nie ma przedmiotu: '+id);
        }

        this.uniqid = id+'#'+ROS.tools.dice(100000);

        // Do tablicy items wpisuje referencje
        ROS.base.items[this.uniqid] = this;

                
        var self = this;
        
        var item = ROS.items[id]; // pobiera dane przedmiotu
        
        this.basic = ROS.tools.clone(item.basic);
        
        this.rarity = item.rarity;

        // Przedmioty magiczne
        // Każdy magiczny przedmiot musi miec przechowywany stan aktualny poziomu mocy magicznej
        // Domyślnie tworząc obiekt przedmiotu przydziela mu losowy stan mocy
        if (item.basic.hasOwnProperty('magic')) {
            this.basic.magic.manaActual = ROS.tools.dice(item.basic.magic.manaMax);
        } 

        // Eliksiry
        // Każdy eliksir musi miec przechowywany stan aktualny poziomu pozostałych dawek
        // Domyślnie tworząc obiekt eliksiru zakłada sie ze jest on "pełny" dawek
        if (item.basic.type == 11) {            
            this.basic.typeSpecific.portionActual = ROS.tools.dice(item.basic.typeSpecific.portionMax);
        }

        // Skarby
        // Tworząc skarb określana jest jego wartość zgodnie z rzutem przypisanym do specyfikacji
        if (item.basic.type == 13) {
            this.basic.typeSpecific.howmuch = ROS.tools.numberReader(this.basic.typeSpecific.howmuch);
        }

        // Bronie i zbroje
        // Tworząc broń lub broń ustalana jest ich kondycja
        if (item.basic.type == 4 || item.basic.type == 5 || item.basic.type == 6) {
            this.basic.typeSpecific.conditionActual = ROS.tools.dice(this.basic.typeSpecific.conditionMax);
        }

        // Wyjątek - dłonie
        if (id === 'hands') {
            this.basic.typeSpecific.conditionActual = this.basic.typeSpecific.conditionMax;
        }

        // Klonuje efekty
        this.effects = ( item.hasOwnProperty('effects') ? ROS.tools.clone(item.effects) : false );        

        this.getName = function() {
            return this.basic.name;    
        };

        this.getType = function() {
            return this.basic.type;    
        };

        this.isWeapon = function() {
            if (this.basic.type === 4 || this.basic.type === 5) {
                return true;
            }
            return false;
        };

        this.destroy = function() {
            delete ROS.base.items[this.uniqid];
            if (this.gfx.perentNode) {
                this.gfx.perentNode.removeChild(this.gfx);
            }
            this.gfx = null;  
        };

        // Metoda testuje czy przedmiot ma zdolności wywoływane poprzez metode np: whenUse, whenWear
        this.testActivate = function(m) {
            if (self.effects && self.effects.hasOwnProperty(m)) {return true;}            
            return false;
        };

        // Metoda zwraca czytelny opis właściwości przedmiotu
        this.itemDescription = function() {
            // PO NAJECHANIU NA PRZEDMIOT WYSWIETLA JEGO PEŁNY OPIS
            var kod,x,y,z,efekt;
            var kodCena = '';
            var kodTab0 = '';
            var kodTab1 = '';
            var kodTab2 = '';
            var kodTab3 = '';
            
            // lokalna funkcja pomocnicza
            function convertItemDesc(stat,name) {                       
                if (stat) {                     
                    var i;
                    var n = ROS.base.statsNames[name];
                    var p = stat.split('|');    
                    switch(p[0]) {
                        case '+': i = 'zwiększa o'; break;
                        case '-': i = 'zmniejsza o'; break;                        
                    }
                    return n+': '+i+' <b>'+p[1]+'</b><br>';
                } 
                return '';
            }
            
            // Informacje podstawowe            
            if (self.basic.hasOwnProperty('magic')) {                
                kodTab1  = '<tr><td>Magia:&nbsp;</td><td>'+ROS.tools.show_wykres(self.basic.magic.manaActual,self.basic.magic.manaMax,3,1.5)+'</td><td>'+self.basic.magic.manaActual+' / '+self.basic.magic.manaMax+'</td></tr>';
                kodTab1 += '<tr><td>Regeneracja:&nbsp;</td><td colspan="2">'+self.basic.magic.manaAutoRestore+'p. mocy/ture</td></tr>';                
            }

            // typeSpecific:
            switch(self.basic.type) {
                case 4:
                case 5: // BROŃ: hand, range, damage
                    kodCena += self.basic.priceActual;
                    kodTab2 += '<tr><td colspan="3">'+(self.basic.typeSpecific.hand == 1 ? 'Broń jednoręczna' : 'Broń dwuręczna')+'</td></tr>';
                    kodTab2 += '<tr><td>Zasięg:&nbsp;</td><td colspan="2">'+self.basic.typeSpecific.range+'</td></tr>';
                    kodTab2 += '<tr><td>Kondycja:&nbsp;</td><td colspan="2"><b>'+self.basic.typeSpecific.conditionActual+'</b> / '+self.basic.typeSpecific.conditionMax+'</td></tr>';
                    kodTab2 += '<tr><td>Obrażenia:&nbsp;</td><td colspan="2">'+self.basic.typeSpecific.damage+' '+(self.basic.typeSpecific.magic ? 'magiczne' : '')+'</td></tr>';
                break;
                case 6:
                    kodCena += self.basic.priceActual;
                    kodTab2 += '<tr><td>Kondycja:&nbsp;</td><td colspan="2"><b>'+self.basic.typeSpecific.conditionActual+'</b> / '+self.basic.typeSpecific.conditionMax+'</td></tr>';
                break;
                case 11: // ELIKSIR: portion
                    kodCena += self.basic.priceActual;
                    kodTab2 += '<tr><td>Dawki:&nbsp;</td><td>'+ROS.tools.show_wykres(self.basic.typeSpecific.portionActual,self.basic.typeSpecific.portionMax,3,1.5)+'</td><td>'+self.basic.typeSpecific.portionActual+' / '+self.basic.typeSpecific.portionMax+'</td></tr>';
                break;
                case 13: // SKARB: howmuch
                    kodTab2 += '<tr><td>Ilość:&nbsp;</td><td colspan="2">'+self.basic.typeSpecific.howmuch+'</td></tr>';
                break;
                default:
                    kodCena += self.basic.priceActual;
                break;
            }

            kod += '</table>';
      
            // Informcaje o efektach
            if (self.effects) {                
                // Sprawdzam rodzaje aktywacji
                for(x in self.effects) {
                    efekt = self.effects[x];
                    switch(x) {
                        case "whenHit":                              
                            kodTab0 += '<tr><td colspan="3"><br /><span style="font-size:12px;"><b>'+ROS.effects.whenHit[efekt].name+'</b></span> (gdy trafi):</td></tr>'+                            
                            '<tr><td colspan="3">'+ROS.effects.whenHit[efekt].desc+'</td></tr>';                        
                        break;
                        case "whenUse":                             
                            kodTab0 += '<tr><td colspan="3"><br /><span style="font-size:12px;"><b>'+ROS.effects.whenUse[efekt].name+'</b></span> (gdy użyty):</td></tr>'+
                            '<tr><td colspan="3">'+ROS.effects.whenUse[efekt].desc+'</td></tr>';
                        break;
                        case "whenWear": 
                            kodTab0 += '<tr><td colspan="3"><br /><span style="font-size:12px;"><b>'+ROS.effects.whenWear[efekt].name+'</b></span> (gdy założony):</td></tr>'+
                            '<tr><td colspan="3">'+ROS.effects.whenWear[efekt].desc+'</td></tr>';
                        break;
                    }                    
                }
            }
            
            kod = '<table cellpadding=2 cellspacing=0 style="margin:2px; width:300px;">';
            kod += '<tr><td colspan="3" style="font-size:15px;"><strong>'+self.getName()+(kodCena != '' ? ' ('+kodCena+' zm)' : '')+'</strong>'+(self.basic.typeSpecific.conditionActual < 1 ? '<br><span style="color:red;"><i>Przedmiot zepsuty !</i></span>' : '')+'</td></tr>';            
            kod += '</table>';
        
            if (kodTab2 != '') {                
                kod += '<table cellpadding=1 cellspacing=0 style="background:#f3ddb3; border:1px solid black; margin:2px; width:300px;">';
                kod += '<tr><td colspan="3" style="font-size:14px;"><strong>Cechy podstawowe przedmiotu:</strong></td></tr>';                
                kod += kodTab2;
                kod += kodTab1;
                kod += '</table>';
            }

            if (kodTab0 != '') {                
                kod += '<table cellpadding=1 cellspacing=0 style="background:#f3ddb3; border:1px solid black; margin:2px; width:300px;">';
                kod += '<tr><td colspan="3" style="font-size:14px;"><strong>Efekty specjalne przedmiotu:</strong></td></tr>';                
                kod += kodTab0;
                kod += '</table>';
            }

            try {
                return kod;
            } finally {
                kod = null;
            }
            
        };




        // Tworzę graficzną interpretacje przedmiotu
        // Grafika
        this.gfx = document.createElement("img");
        this.gfx.src = item.basic.icon;
        this.gfx.id = 'itemicon#' + this.uniqid;
        this.gfx.style.position = 'absolute';
        this.gfx.style.zIndex = 100;
        this.gfx.style.left = 0 + 'px';
        this.gfx.style.top = 0 + 'px';
        this.gfx.style.width = 48 + 'px';
        this.gfx.style.height = 48 + 'px';
                
        ROS.tools.addEvent(this.gfx,'mouseover',function() { 
            // aby nie pojawial sie opis przedmiotu jesli kursor na niego najedzie (na przykład podczas szybkiego przesuwania paletki)
            if (!ROS.mouse.buttonDown) {       
                ROS.fly.show(self.itemDescription(),1,305); 
            }
        });
        ROS.tools.addEvent(this.gfx,'mouseout',function() {                
            ROS.fly.hide(); 
        });

        

        this.canUse = function() {
            switch(item.basic.type) {
                case 11: // Eliksir
                    if (this.basic.typeSpecific.portionActual === 0) {
                        ROS.infoScroll.show('<br>Buteleczka jest już pusta.');
                        ROS.tools.console('log','Butelka jest pusta!');
                        return false;
                    }
                break;
            }
            return true;
        };


        // Metoda odpowiedzalna za obsługe cechSpecjalnych przedmiotów
        this.useIt = function() {
            switch(item.basic.type) {
                case 11: // Eliksir
                    if (this.basic.typeSpecific.portionActual > 0) {
                        this.basic.typeSpecific.portionActual -= 1;  
                        if (this.basic.typeSpecific.portionActual === 0) {
                            this.gfx.src = item.basic.typeSpecific.icon2;
                        }
                    }
                    this.setPrice(this.basic.typeSpecific.portionActual,this.basic.typeSpecific.portionMax);
                break;
            }
        };


        // Zmienia kondycje broni o wskazaną wartosc
        this.changeCondition = function(value,chance) {
            if (value === undefined) return;

            var v = value.toString();
            
            if (chance === undefined) {
                chance = 101;
            }

            // jesli wartosc zaczyna sie od + lub - to zmienia relatywnie
            // jesli jest to czysta wartosc to podstawia
            if (v.charAt(0) === '+' || v.charAt(0) === '-') {
                // szansa na zmiane kondycji przedmiotu o przekazaną wartość
                if (ROS.tools.dice(100) < chance) {
                    this.basic.typeSpecific.conditionActual += value;
                }
            } else {
                this.basic.typeSpecific.conditionActual = value;
            }

            if (this.basic.typeSpecific.conditionActual < 1) {
                this.basic.typeSpecific.conditionActual = 0;
                this.gfx.style.background = 'url(gfx/items/damagedItem.png)';
            } else {
                this.gfx.style.background = 'transparent';
            }

            this.setPrice(this.basic.typeSpecific.conditionActual,this.basic.typeSpecific.conditionMax);
        };


        this.setPrice = function(valAct,valMax) {
            // Ustawienie wartości przedmiotu
            var percent = (valAct * 100) / valMax;
            this.basic.priceActual = Math.ceil(this.basic.priceMax * (percent / 100));    
        };






        /**
         * Wywołanie w konstruktorze 
         * Ustala cene przedmiotu na podstawie kondycji / dawek
         */
        if (this.basic.typeSpecific.conditionActual) {
            this.setPrice(this.basic.typeSpecific.conditionActual,this.basic.typeSpecific.conditionMax);
        }

        if (this.basic.typeSpecific.portionActual) {
            this.setPrice(this.basic.typeSpecific.portionActual,this.basic.typeSpecific.portionMax);
        }
        

    };
})();