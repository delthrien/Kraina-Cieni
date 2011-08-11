/**
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

// Klasa tworząca oraz zarządzająca obiektami animowanymi
ROS.Animation = (function(){
    
    // Zmienne prywatne ustawiane jeden raz podczas stworzenia klasy    
    // JSON
    var anims = {
        "playerMark": {
            "width"  : 48,
            "height" : 48,            
            "order"  : [0,1,2,3,4],
            "sprite" : "playermark.png"
        },
        "aim": {
            "width"  : 56,
            "height" : 56,            
            "order"  : [0,1,2,3,2,1],
            "sprite" : "aim.png"
        },
        "blood": {
            "width"  : 48,
            "height" : 48,
            "order"  : [0,1,2,3,4],    
            "sprite" : "blood.png"            
        },   
        "wounds": {
            "width"  : 30,
            "height" : 20,
            "order"  : [0],    
            "sprite" : "blank.gif"
        },        
        "microScrollInfo": {
            "width"  : 380,
            "height" : 'auto',
            "order"  : [0],    
            "sprite" : "blank.gif"
        }, 
        "swing": {
            "width"  : 48,
            "height" : 48,
            "order"  : [0],    
            "sprite" : "swing.png"
        },
        "slash": {
            "width"  : 60,
            "height" : 60,
            "order"  : [0,1,2,3,4],    
            "sprite" : "slash.png"
        },
        "arrow": {
            "width"  : 20,
            "height" : 20,
            "order"  : [0],    
            "sprite" : "arrow.png"
        },
        "lightstorm": {
            "width"  : 200,
            "height" : 200,
            "order"  : [0],    
            "sprite" : "lightstorm.png"
        },
        "smoke": {
            "width"  : 128,
            "height" : 128,
            "order"  : [0,1,2,3,4,5,4,3],    
            "sprite" : "smoke.png"
        }  
    };
    
    var BASE = 'gfx/sprites/';
    
    function createAnimDiv(id,w,h) {
        var s,s2,o,o2;

        o = document.createElement("div");        
        o.id = id+'_'+ROS.tools.dice(10000);
        s = o.style;
        s.width = (w === 'auto' ? 'auto' : w+'px');
        s.height = (h === 'auto' ? 'auto' : h+'px');
        s.position = 'absolute';
        s.zIndex = 16;
        s.left = -2000+'px';
        s.top = -2000+'px';
        s.backgroundImage = 'url(gfx/blank.gif)';
        s.display = 'none';
        s.pointerEvents = 'none';
        ROS.map.area.appendChild(o);     

        o2 = document.createElement("div");        
        o2.id = id+'_inner_'+ROS.tools.dice(10000);
        s2 = o2.style;
        s2.width = (w === 'auto' ? 'auto' : w+'px');
        s2.height = (h === 'auto' ? 'auto' : h+'px');
        s2.position = 'absolute';
        s2.zIndex = 16;
        s2.left = 0+'px';
        s2.top = 0+'px';
        s2.display = 'block';
        s2.pointerEvents = 'none';
        o.appendChild(o2);

        return [o,o2];
    }
    
    // KONSTRUKTOR
    return function(id) {
        // PYWATNE: ustawiane przy każdym tworzeniu obiektu klasy
        var self = this;        
        
        var x = -2000;
        var y = -2000;
        
        var anim = ROS.tools.clone(anims[id]);
        var klatki = anim.order.length;
        var order = anim.order;      

        var repetitions = 0; // liczba powtórzeń animacji przed zakonczeniem, 0 = nieskonczonosc
        var currentRepetition = 0;

        var angle = 0; // obrót głównego boxa wewnatrz ktorego jest animacja         
        
        // do poruszania animacją po mapie
        var aMoveControl, aControl, speed, cFrame, aFrame, slopeX, slopeY, startX, startY, steps, speedMove;
        var cPos = 0;
        
        // Zdarzenia
        var onFinish = null;                
        var onTween = null;        
        var onTweenFrame;        
        var onFinishMove = null; // Zdarzenie wywoływane w chwili gdy animacja osiagnie cel (jesli sie przesuwa)        
        
        var allFrames = 0;
        var transform = null;

        this.width = anim.width;
        this.height = anim.height;


        var ad = createAnimDiv(id,this.width,this.height);
        
        this.obj = ad[0];
        this.innerObj = ad[1];
        
        ad = null;
        

        this.setTransform = function(daneStart,daneEnd,percent) {
            var trans = [];
            var val,x;
            var s = this.innerObj.style;

            for(x in daneStart) {
                
                if (daneEnd === undefined && percent === undefined) {
                    val = daneStart[x];
                } else {
                    if (daneEnd[x] >= daneStart[x]) {                    
                        val = daneStart[x] + (((daneEnd[x] - daneStart[x]) / 100) * percent);
                    } else {
                        val = daneStart[x] - (((daneStart[x] - daneEnd[x]) / 100) * percent);
                    }
                }

                switch(x) {
                    case "scale":
                        trans.push('scale('+val+')');                    
                    break;
                    case "rotate":
                        trans.push('rotate('+val+'deg)');                    
                    break;
                    case "opacity":
                        s.opacity = val;
                    break;
                }            

            }

            if (trans.length > 0) {
                x = trans.join(' ');
                s.MozTransform = x;
                s.WebkitTransform = x;
                s.OTransform = x;
                s.msTransform = x;
                s.transform = x;
            }
        };


        // Wywolanie tej funkcji przywraca ustawienia defaultowe i aktywuje animacje
        this.ignite = function(args) {            
            cFrame = 0; // klatka z danego powtorzenia
            aFrame = 0; // ogólna klatka przy wielu powtorzeniach
                       
            speed = args.speed || 50;                  
            onFinish = args.onFinish || null;
            onTween = args.onTween || null;
            onTweenFrame = args.onTweenFrame || -1;
            angle = args.angle || 0;
            repetitions = args.repetitions || 0;

            // Jeśli ilosc powtorzen jest skonczona (czyli > 0 bo dla 0 oznacza nieskonczone)
            if (repetitions > 0) {
                // to ustalam ile animacja bedzie miala wszystkich klatek
                allFrames = (repetitions * order.length);                
            }

            // TRANSFORMACJE
            // USTAWIA WARTOSCI STARTOWE            
            if (args.transform) {
                transform = args.transform;
                // jesli ustawione jest przeprowadzenie transformacji dla całej animacji to musi miec skonczoną dlugosc
                // jesli jest ustawione przeprowadzenie transformacji dla każdego powtorzenia to moze byc nieskonczona
                if ((args.transform.mode > 0 && repetitions > 0) || args.transform.mode === 0) {                    
                    this.setTransform(args.transform.start);
                } else {
                    transform = null;
                }
            } else {
                transform = null;
            }
            
            this.obj.style.zIndex = args.zindex || 16;

            this.innerObj.style.backgroundImage = 'url('+ BASE + anim.sprite +')';
            this.innerObj.style.backgroundPosition = '0px 0px';

            ROS.tools.rotate(this.obj,angle);            
            
            this.show();
            this.start();

            args = null;
        };
        

        this.igniteMove = function(args) {
            var sX,sY,w;

            var x1 = args.start_x;
            var y1 = args.start_y;
            var x2 = args.stop_x;
            var y2 = args.stop_y;
            
            sX = Math.abs(x2 - x1);
            sY = Math.abs(y2 - y1);
            if (sX > sY) {
                w = sX;
            } else {
                w = sY;
            }
            
            onFinishMove = args.onFinishMove || null;
            speedMove = args.speed || 50;
            
            cPos = 0; // current position
            steps = Math.floor(w / 3); // obliczam ilosc krokow
            slopeX = (x2 - x1) / steps;
            slopeY = (y2 - y1) / steps;
            startX = x1;
            startY = y1;
            
            this.moveAbs(x1,y1);            
            this.ignite(args); // wlaczam odtwarzanie animacji ciągłe = defaultowe opcje            
            this.startMove(); // wlaczam przesuwanie animacji

            args = null;
        };
         

        this.start = function() {   
            var percent;

            // jesli animacja nie jest zapetlona w nieskonczonosc i jesli dotarł do ustalonego momentu              
            if (aFrame === onTweenFrame && repetitions > 0 && onTween) {
                onTween();
                onTween = null;
            }
            
            // jesli odtworzył ostatnią klatke animacji
            if (cFrame === klatki) {
                cFrame = 0; 
                currentRepetition += 1;
                // jesli mial odtworzyc tylko jedna
                if (currentRepetition === repetitions) { 
                    if (onFinish) {
                        onFinish();
                        onFinish = null;
                    }            
                    this.destroy();
                    return;
                }
            }
                        
            this.innerObj.style.backgroundPosition = -(order[cFrame]*this.width) + 'px 0px';            


            // Transformacje
            if (transform) {                
                switch(transform.mode) {
                    case 1: // okresem zmiany jest całkowita dlugosc animacji
                        percent = (aFrame * 100) / allFrames;        
                        this.setTransform(transform.start,transform.end,percent);                                 
                    break;
                    case 0: // okresem zmiany jest jedno powtórzenie
                        percent = (cFrame * 100) / order.length;
                        this.setTransform(transform.start,transform.end,percent);                                 
                    break;
                    case 2:
                        if (aFrame >= transform.startFrame && aFrame <= transform.endFrame) {
                            percent = ((aFrame-transform.startFrame) * 100) / (transform.endFrame - transform.startFrame);        
                            this.setTransform(transform.start,transform.end,percent);                                 
                        }
                    break;
                }                       
            }


            cFrame += 1;  
            aFrame += 1;  

            aControl = setTimeout(function() { self.start(); },speed);
        };
        

        this.startMove = function() {            
            // jesli dolecial do celu
            if (cPos >= steps) {
                cPos = 0;            
                if (onFinishMove) {
                    onFinishMove();
                    onFinishMove = null;
                } 
                this.destroy();                
                return;
            }
            
            var currentX = startX + (slopeX * cPos);
            var currentY = startY + (slopeY * cPos);       
           
            cPos += 1;
            
            this.moveAbs(currentX,currentY);            
            aMoveControl = setTimeout(function() { self.startMove(); },speedMove);
        };
    

        this.hide = function() { 
            this.obj.style.display = 'none'; 
        };
        
        this.show = function() { 
            this.obj.style.display = 'block'; 
        };
        
        this.opacity = function(opac) { 
            this.obj.style.opacity = opac; 
        };
               
        this.destroy = function() {
            
            if (aControl) clearTimeout(aControl);
            if (aMoveControl) clearTimeout(aMoveControl);  
            //this.innerObj.innerHTML = ''; 
            //ROS.tools.console('log',anim.sprite);                     
            //ROS.tools.clearNodes(this.obj);            
            //ROS.tools.console('log',this.obj);
            this.obj.parentNode.removeChild(this.obj);
            //ROS.map.area.removeChild(this.obj);
            this.innerObj = null;
            this.obj = null;              
        };
        
        this.moveRel = function(mx,my) {
            x += mx;
            y += my;
            this.obj.style.left = x+'px';
            this.obj.style.top = y+'px';   
        };
            
        this.moveAbs = function(mx,my) {
            x = mx;
            y = my;
            this.obj.style.left = x+'px';
            this.obj.style.top = y+'px';   
        };     
    };
})();


/*

ROS.microAnim = (function() {
    
    // jesli nie ma podanej wartosci to zwraca wartosc aktualną stylu opacity elementu
    // jesli ma podaną wartosc to podstawia
    // wartosc jest podawana w skali 0-100
    function opacity(obj,val) {  
        val = parseInt(val); 
        if(isNaN(val)){
            return Math.round((obj.style.opacity ? parseFloat(obj.style.opacity) : 1) * 100);               
        } else {
            val = Math.min(100, Math.max(0, val));              
            obj.style.opacity = val / 100;                
        }
    };

    return function(obj,style,) {
        
        fade: function(obj,startVal,stopVal,steps,onFinish) {
            clearTimeout(timeoutFade);
            opacity(obj,startVal);
            ROS.microAnim.fadeLoop();
        },
        fadeLoop: function() {
            if (opacity(obj)) === stopVal) {
                if (onFinish) {
                    (onFinish)();
                }
                ROS.microScroll.area.style.display = 'none';
                ROS.microScroll.active = false;
            } else {
                timeoutFadeOut = setTimeout(ROS.microAnim.fadeLoop,50);
            }
        },


        moveTo: function() {
            
        }
    };
})();
*/