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

// Singleton zawierający zestaw uzytecznych narzędzi
ROS.tools = (function() {

  return {

    // Jeśli wtyczka firebug jest zamknieta lub nie zainstalowana obiekt
    // console wogole nie istnieje i odwołanie do niego powoduje bląd skryptu
    // Poniższa metoda sprawdza czy obiekt istenieje zanim z niego skorzysta
    console: function(type,txt) {
      if (typeof window.console !== 'undefined' &&
          typeof window.console[type] !== 'undefined') {
        console[type](txt);
      }
    },

    windowSize: function() {
        var myWidth = 0, myHeight = 0;
      if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
      } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
      } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
      }
      return {
        "x":myWidth,
        "y":myHeight
      };
    },

    windowScroll: function() {
      var scrOfX = 0, scrOfY = 0;
      if( typeof( window.pageYOffset ) == 'number' ) {
        //Netscape compliant
        scrOfY = window.pageYOffset;
        scrOfX = window.pageXOffset;
      } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
        //DOM compliant
        scrOfY = document.body.scrollTop;
        scrOfX = document.body.scrollLeft;
      } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
        //IE6 standards compliant mode
        scrOfY = document.documentElement.scrollTop;
        scrOfX = document.documentElement.scrollLeft;
      }
      return {
        "x":scrOfX,
        "y":scrOfY
      }
    },

    // Funckja miesza położenie komórek w tablicy. Metoda fisherYates
    shuffleArray: function(o) {
      // Krotki zapis: for(var j, x, i = o.length; i; j = parseInt(Math.random() * i,10), x = o[--i], o[i] = o[j], o[j] = x);
      var j,x;
      var i = o.length;
      if ( i === 0 ) {
          return o;
      }
      while ( i ) {
          j = parseInt(Math.random() * i,10);
          x = o[--i];
          o[i] = o[j];
          o[j] = x;
      }
      return o;
    },

    // Sprawdza czy obiekt jest tablicą
    isArray: function(o) {
      if (o == null) { return false; }
      if (o.constructor.toString().indexOf("Array") == -1) {
        return false;
      }
      return true;
    },

    randomColor: function() {
      return '#'+(function(h){return new Array(7-h.length).join("0")+h})((Math.random()*0x1000000<<0).toString(16));
      // 16777215 == ffffff;
      //return '#'+Math.floor(Math.random()*16777215).toString(16);
    },

    clone: function(obj) {
      var c = ROS.tools.isArray(obj) ? [] : {};
      for (var i in obj) {
          var prop = obj[i];
          if (typeof prop === 'object') {
             if (ROS.tools.isArray(prop)) {
                 c[i] = [];
                 for (var j = 0; j < prop.length; j++) {
                     if (typeof prop[j] !== 'object') {
                         c[i].push(prop[j]);
                     } else {
                         c[i].push(ROS.tools.clone(prop[j]));
                     }
                 }
             } else {
                 c[i] = ROS.tools.clone(prop);
             }
          } else {c[i] = prop;}
      }
      return c;
    },

    // BindArgument: http://www.ejball.com/EdAtWork/2005/03/31/JavaScriptBindingFunctionArguments.aspx
    bind: function(fn) {
      var args = [];
      for (var n = 1; n < arguments.length; n++) {
          args.push(arguments[n]);
      }
      return function () {
          return fn.apply(this, args);
      };
    },

    // Ujednolica obsluge zdarzen
    addEvent: function(el, type, fn) {
      if (window.addEventListener) {
        el.addEventListener(type, fn, false);
      } else if (document.attachEvent) {
        el.attachEvent('on' + type, fn);
      }
    },

    removeEvent: function(el, type, fn) {
      if (window.removeEventListener) {
        el.removeEventListener(type, fn, false);
      } else if (document.detachEvent) {
        el.detachEvent('on' + type, fn);
      }
    },

    // Skraca document.getElementById()
    get: function(v,o) {
      return ( (typeof(o) === 'object' ? o : document).getElementById(v) );
    },

    // Rzut koscia X-ścienną
    dice: function(x) {
      if (x === 0) return 0;
      return Math.floor(Math.random()*x+1); // zwarca licze z przedzialu 1-x (http://www.shawnolson.net/a/789/make-javascript-mathrandom-useful.html)
    },

    // Oblicza wartosci stringów w stylu 1d3+4 lub 3d6
    // Jesli przesle w argumencie maxmin wartosc MAX lub MIN to zwraca maksymalns lub minimalna wartosc z podanego stringu
    numberReader: function(number,maxmin) {
      if (isNaN(number)) {
          var numb;
          var numbMin;
          var numbMax;
          var t = number.split("d"); // zalozenie : jesli podany number nie jest liczba to znaczy ze na 100% posiada w sobie literke d !
          var t2 = [];

          // dX traktuje jak 1dX
          if (t[0] === '') {
              t[0] = 1;
          }

          var p = new RegExp("\\+"); // sprawdza czy czesc stringu na prawo od 'd' nie posiada znaku +
          if (p.test(t[1])) {
              t2 = t[1].split("+");
              numb = t[0] * ROS.tools.dice(t2[0]) + parseInt(t2[1],10); // parseInt zeby wynikiem byla liczba inaczej dodaje jak do stringu w stylu 4+2 = 42 :P
              numbMax = t[0] * parseInt(t2[0],10) + parseInt(t2[1],10);
              numbMin = t[0] * 1 + parseInt(t2[1],10);
          } else {
              numb = t[0] * ROS.tools.dice(t[1]);
              numbMax = t[0] * parseInt(t[1],10);
              numbMin = t[0] * 1;
          }

          switch(maxmin) {
            case 'max': return numbMax;
            case 'min': return numbMin;
            default: return numb;
          }

      } else {
          return number;
      }
    },

    // Funkcja odmienia słowo na podstawie wielkosci liczby
    odmianaTury: function(numer) {
      switch(numer) {
       case 1: return 'tura';
       case 2: case 3: case 4: return 'tury';
       default: return 'tur';
      }
    },

    // Dodaje obrazek do strony, wykorzystane przy konstrukcji mapy
    addImage: function(parentDiv, filename, x, y, height, width, id) {
      var el = document.createElement("img");
      el.src = filename;
      el.id = id;
      el.style.position = 'absolute';
      el.style.display = 'block';
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.style.width = width + 'px';
      el.style.height = height + 'px';
      el.style.right = x + width + 'px';
      el.style.bottom = y + height + 'px';
      parentDiv.appendChild(el);
      return el;
    },

    // Oblicza odleglosc pomiedzy dwoma polami w postaci ilosci pol przez jakie trzeba przejsc aby dotrzec z jednego punktu do drugiego
    // jest to linia prosta przechodząca przez ściany :P przydaje się przy sprawdzaniu zasięgu dla broni strzeleckich
    calculateDistance: function(sX,sY,eX,eY) {
      var rx,ry,dis;
          rx = Math.abs(sX - eX); // zamieniam znak na dodatni
          ry = Math.abs(sY - eY);
          dis = (rx >= ry ? rx : ry); // odległość od celu
      return dis;
    },

    // Funkcja oblicza nową wartość współczynnika na podstawie kodu modyfikatora
    // ostatnia zmienna zawiera dostepne operacje np: '+-*^' moze dodawac odejmowac i mnozyc
    calculateStat: function(mod,stat,op) {
      var s = parseInt(stat,10);
      var p = mod.split('|');
      var v;

      // sprawdza i oblicza wartość losową dla modyfikatora w stylu +|2d4
      var t = new RegExp("d");
      if (t.test(p[1])) {
        v = ROS.tools.numberReader(p[1]);
      } else {
        v = parseInt(p[1],10);
      }

      switch(p[0]) {
          case '^': if (op.search(/\^/) > -1) {s+=v;} break; // dodawanie specjalne (pozwala przekraczac granice maksymalne współczynników)
          case '+': if (op.search(/\+/) > -1) {s+=v;} break; // dodaje
          case '-': if (op.search(/\-/) > -1) {s-=v;} break; // odejmuje
          case '*': if (op.search(/\*/) > -1) {s*=v;} break; // mnoży
      }
      return s;
    },

    // Jeśli przeglądarka to Firefox to zwraca TRUE jesli nie firefox to FALSE
    browserTest: function() {
      var op,sa,ch,ff,ie,ko;
      var browser=navigator.appName;
      var b_version=navigator.appVersion;
      var version=parseFloat(b_version);
      var nua = navigator.userAgent;

      ch=(nua.indexOf('Chrome')!==-1);
      op=(nua.indexOf('Opera')!==-1);
      sa=(nua.indexOf('Safari')!==-1);
      ko=(!saf && (nua.indexOf('Konqueror')!==-1) ) ? true : false;
      ff=( (!sa && !ko ) && ( nua.indexOf('Gecko')!==-1 ) ) ? true : false;
      ie=((nua.indexOf('MSIE')!==-1)&&!op);

      if (ff) {
        return ['Firefox',version];
      }
      if (ch) {
        return ['Chrome',version];
      }
      return false;      
    },

    // Funkcja zwraca tablice 2D zawierającą wspolrzedne wszystkich segmentów po ktorych nalezy przejsc miedzy punktem startowym a docelowym w postaci:
    // [ [x,y], [x,y], ... ]
    AStar: function(Grid,Start,Goal,GoalFree){

        // jesli argument GoalFree zostanie ustawiony na 1 to uwalniam pole celu w tablicy dzieki czemu będzie ono osiagalne o ile po drodze nei wystąpi przeszkoda
        // dzieki temu pozniej wystarczy z tablicy wynikowej trasy wywalic pole celu i bedziemy mieli trase zakonczoną przy punkcie celu - dziko sie to tlumaczy ale jest ok :)
        // uwaga podstawianie 1 podstawia je do komórki w tablicy ROS.dungeon.tileAccess !!!!! bo Grid jest jej referencją !
        if (GoalFree === 1) {
            Grid[Goal[1]][Goal[0]] = 1;
        }

        // Grid[y][x]
        var cols = Grid[0].length; // szerokosc tablicy (ilosc kolumn) - na podstawie wartosci pierwszej komorki a w pierwszej komorce znajduje sie tablica z iloscia column
        var rows = Grid.length; // wysokosc tablicy (ilosc rzędów)
        var limit = cols*rows;

        // Lokalna funkcja zwraca TRUE jesli w komorce Grid[y][x] jest wartosc przeslana w value
        function $Grid(x,y,value) {
            switch(value) {
                case 0: return Grid[y][x] === 0;
                case 1: return Grid[y][x] === 1;
                case 2: return Grid[y][x] === 2;
            }
            return false;
        }

        // Lokalna funkcja sprawdza odległość w osi X oraz Y pomiedzy Punktem a Celem i zwraca wiekszą z tych dwóch wartosci
        // function Distance(Point,Goal) { return  Math.max(Math.abs(Point.x-Goal.x), Math.abs(Point.y-Goal.y)); };
        function Distance(Point,Goal) {
            return Math.sqrt(Math.pow(Point.x-Goal.x,2)+Math.pow(Point.y-Goal.y,2));
        }

        // Lokalna funkcja generuje obiekt
        function Node(Parent,Point) {
            return {
                Parent : Parent,
                value  : Point.x+(Point.y*cols),
                x : Point.x,
                y : Point.y,
                f : 0,
                g : 0
            };
        }

        // Lokalna funkcja
        function Path(){
            var $Start = Node(null,{x:Start[0],y:Start[1]});
            var $Goal =  Node(null,{x:Goal[0],y:Goal[1]});
            var AStar = new Array(limit);
            var Open = [$Start];
            var Closed=[];
            var result=[];
            var $Successors, $Node, $Path, length, max, min, i, j;

            while(length = Open.length) {
                max = limit;
                min = -1;
                for(i=0; i<length; i++) {
                    if ( Open[i].f < max ) {
                        max = Open[i].f;
                        min = i;
                    }
                }
                $Node = Open.splice(min,1)[0];
                if($Node.value === $Goal.value) {
                    // Ścieżka została znaleziona
                    $Path=Closed[Closed.push($Node)-1];
                    do {
                    result.push([$Path.x,$Path.y]);
                    } while ($Path = $Path.Parent);
                    AStar = Closed = Open = [];
                    result.reverse();
                } else {
                    $Successors = Successors($Node.x,$Node.y);
                    for(i=0,j=$Successors.length;i<j;i++) {
                        $Path = Node($Node,$Successors[i]);
                        if ( !AStar[$Path.value] ) {
                            $Path.g = $Node.g + Distance($Successors[i],$Node);
                            $Path.f = $Path.g + Distance($Successors[i],$Goal);
                            Open.push($Path);
                            AStar[$Path.value]=true;
                        }
                    }

                    Closed.push($Node);
                }
            }
            return result;
        }

        // Lokalna funkcja
        function Successors(x,y) {
            var N = y - 1;
            var S = y + 1;
            var E = x + 1;
            var W = x - 1;

            // sprawdzam gdzie moge isc
            // jeśli pole nie jest poza granicami mapy
            var $N = N > -1; // pod $N podstawiam TRUE lub FALSE
            var $S = S < rows;
            var $E = E < cols;
            var $W = W > -1;

            // czyszcze tablice result
            var result = [];

            // wstawiam do tablicy osiagalne cztery pola w liniach prostych wokół mnie
            if ($N && $Grid(x,N,1) && !ROS.tools.testGridRelationship({x:x,y:y},{x:x,y:N},[2,3])) {
                result.push({x:x,y:N});
            }
            if ($E && $Grid(E,y,1) && !ROS.tools.testGridRelationship({x:x,y:y},{x:E,y:y},[2,3])) {
                result.push({x:E,y:y});
            }
            if ($S && $Grid(x,S,1) && !ROS.tools.testGridRelationship({x:x,y:y},{x:x,y:S},[2,3])) {
                result.push({x:x,y:S});
            }
            if ($W && $Grid(W,y,1) && !ROS.tools.testGridRelationship({x:x,y:y},{x:W,y:y},[2,3])) {
                result.push({x:W,y:y});
            }

            // sprawdza czy pola przekatne sa osiagalne
            // NE
            if ($N && $E && $Grid(E,N,1) && !ROS.tools.testGridRelationship({x:x,y:y},{x:E,y:N},[2,3])) { // jesli na N i E nie ma konca mapy oraz pole po przekatnej zawiera cyfre 1 a wiec jest przechodne
                // jesli na E jest pole ktore moge ominąć i na N jest pole na ktore moge wejsc LUB
                // jesli na N jest pole ktore moge ominąć i na E jest pole na ktore moge wejsc LUB
                // jesli na N jest pole ktore moge ominąć i na E jest pole ktore moge ominąć TO MOGE WEJSC na NE
                if ( ($Grid(E,y,2) && $Grid(x,N,1)) || 
                     ($Grid(E,y,1) && $Grid(x,N,2)) || 
                     ($Grid(E,y,2) && $Grid(x,N,2)) || 
                     ($Grid(E,y,1) && $Grid(x,N,1)) ) {
                    result.push({x:E,y:N});
                }
            }
            // NW
            if ($N && $W && $Grid(W,N,1) && !ROS.tools.testGridRelationship({x:x,y:y},{x:W,y:N},[2,3])) {
                if ( ($Grid(W,y,2) && $Grid(x,N,1)) || 
                     ($Grid(W,y,1) && $Grid(x,N,2)) || 
                     ($Grid(W,y,2) && $Grid(x,N,2)) || 
                     ($Grid(W,y,1) && $Grid(x,N,1)) ) {
                    result.push({x:W,y:N});
                }
            }
            // SE
            if ($S && $E && $Grid(E,S,1) && !ROS.tools.testGridRelationship({x:x,y:y},{x:E,y:S},[2,3])) {
                if ( ($Grid(E,y,2) && $Grid(x,S,1)) || 
                     ($Grid(E,y,1) && $Grid(x,S,2)) || 
                     ($Grid(E,y,2) && $Grid(x,S,2)) || 
                     ($Grid(E,y,1) && $Grid(x,S,1)) ) {
                    result.push({x:E,y:S});
                }
            }
            // SW
            if ($S && $W && $Grid(W,S,1) && !ROS.tools.testGridRelationship({x:x,y:y},{x:W,y:S},[2,3])) {
                if ( ($Grid(W,y,2) && $Grid(x,S,1)) || 
                     ($Grid(W,y,1) && $Grid(x,S,2)) || 
                     ($Grid(W,y,2) && $Grid(x,S,2)) || 
                     ($Grid(W,y,1) && $Grid(x,S,1)) ) {
                    result.push({x:W,y:S});
                }
            }

            return result;
        }

        return Path();
    },

    // Maluje wykres słupkowy poziomy na podstawie podanych danych
    show_wykres: function(actual,full,color,size) {
      return '<div style="position: relative; width:'+(size*100)+'px; height:6px; border:1px solid #6e5438;">'+
        '<div style="position: absolute; left:0; top:0px; background:url(gfx/wykresbg'+color+'.gif); height:6px; width:'+Math.ceil(((actual * 100) / full) * size)+'px"></div>'+
      '</div>';
    },

    // funkcja zwraca kierunek w ktory powinien byc skierowany punkt x,y aby patrzyl na punkt x2,y2 w ośmiostopniowej skali obrotu
    // argumenty przesylane są w pikselach ! nie w polach
    frontFace: function(x,y,px,py) {
      
      // Jesli start i koniec wskazuje na tego samego tile'a to

      // Oblicza miare kąta w oparciu o funkcje trygonometryczne kąta skierowanego      
      // skoro argument x,y są położeniem postaci to środek wirtualnego układu współrzednych powinien się znajdowac w środku pola postaci
      var centrumX = x + (ROS.base.tileWidth/2);
      var centrumY = y + (ROS.base.tileHeight/2);
      var cwiartka;
      var kat;
      var miaraX = px - centrumX;
      var miaraY = centrumY - py;
      var r;
      var sinAlfa;
      var stopnie;
      var radiany;
      var rotate; // okresla przekrecenie postaci css3



      // pamietamy ze faktyczne centrum (punkt 0,0) to górny lewy róg mapy i w oparciu o niego obliczamy cwiartki
      if (px > centrumX  && py <= centrumY) cwiartka = 1;
      if (px <= centrumX  && py < centrumY) cwiartka = 2;
      if (px < centrumX  && py >= centrumY) cwiartka = 3;
      if (px >= centrumX  && py > centrumY) cwiartka = 4;      
      if (px == centrumX  && py == centrumY) return false;

      // r obliczam ze wzoru pitagorasa dla trójkąta prostokątnego: r = pierwiastek z (X do potegi drugiej + Y do potęgi drugiej)
      r = Math.sqrt( Math.pow(miaraX,2) + Math.pow(miaraY,2) );
      // Wzór na miare kąta w oparciu o oś OX oraz punkt jest nastepujacy: sinus ALFA = y / r
      sinAlfa = miaraY / r;
      // nastepnie oblicza ARCUS SINUS (zwraca kąt w radianach) dla wyliczonej liczby Y / R
      radiany = Math.asin( sinAlfa );
      // wzór na zamiane radianów na stopnie to: stopnie = (radiany * 180) / PI
      stopnie = (radiany * 180) / Math.PI;
      // usuwam znak ze stopni Math.asin zwraca kąt ujemny dla katów 3 i 4 cwiartce a ja chce dodatni zawsze
      stopnie = Math.abs(stopnie);

      switch(cwiartka) {
        case 1: kat = stopnie; break;
        case 2: kat = 90 + (90-stopnie); break;
        case 3: kat = 180 + stopnie; break;
        case 4: kat = 270 + (90-stopnie); break;
      }

      /*
      // Mam już kąt z przedzialu 0-360
      // w oparciu o ten kat wyliczam w którą stronę obrócic postac
      if (kat >= 0 && kat < 22.5) {rotate=0;}
      else if (kat >= 22.5 && kat < 67.5) {rotate=315;}
      else if (kat >= 67.5 && kat < 112.5) {rotate=270;}
      else if (kat >= 112.5 && kat < 157.5) {rotate=225;}
      else if (kat >= 157.5 && kat < 202.5) {rotate=180;}
      else if (kat >= 202.5 && kat < 247.5) {rotate=135;}
      else if (kat >= 247.5 && kat < 292.5) {rotate=90;}
      else if (kat >= 292.5 && kat < 337.5) {rotate=45;}
      else if (kat >= 337.5 && kat < 360) {rotate=0;}
      */

      return (360-kat);
    },


    clearNodes: function(node) {
      if ( node.hasChildNodes() ) {
        while ( node.childNodes.length >= 1 ) {
          node.removeChild( node.firstChild );       
        } 
      }
    },

    // Funkcja sumuje poziomy wszystkich graczy
    // zwraca zaokrągloną wartosć ogólnego poziomu drużyny
    warriorsLevel: function() {
      var x;
      var sumLvl = 0;
      var heroQuantity = 0;
      for (x in ROS.base.heroes) {
        sumLvl += ROS.base.heroes[x].level;
        heroQuantity++;
      }
      return Math.round(sumLvl / heroQuantity);
    },

    rotate: function(obj,deg,origin) {
      obj.style.MozTransform = 'rotate('+deg+'deg)';
      obj.style.WebkitTransform = 'rotate('+deg+'deg)';
      obj.style.OTransform = 'rotate('+deg+'deg)';
      obj.style.msTransform = 'rotate('+deg+'deg)';
      obj.style.transform = 'rotate('+deg+'deg)';
      if (origin) {
        obj.style.MozTransformOrigin = origin;
        obj.style.WebkitTransformOrigin = origin;
        obj.style.OTransformOrigin = origin;
        obj.style.msTransformOrigin = origin;
        obj.style.transformOrigin = origin;
      }
    },

    // Przyjmuje dwa parametry: dec: liczba decymalna; pos: wartość na wskazanaej pozycji po przekonwertowaniu do ciągu binarnego 0,1
    conv2bin: function(dec,pos) {
      dec = parseInt(dec,10);
      dec = '0000000000000000'+dec.toString(2); // zamiana na binarke z konwersją do stringu oraz wypelnia pierwsze pola zerami (aby nie pominal wiodących zer podczas konwersji)
      dec = dec.slice(-16); // wycina ostatnie 16 znakow
      if (pos === undefined) return dec;
      return parseInt(dec.charAt(pos)); // zwraca 0 lub 1 z podanej pozycji
    },

    conv2dec: function(bin) {
      bin.replace(/ /g,''); // usun spacje
      bin = parseInt(bin,2);
      return bin.toString(10);
    },

    convHex2RGB: function(hex) {
      var cutHash = (hex.charAt(0) === '#') ? hex.substring(1,7) : hex;
      var R = parseInt(cutHash.substring(0,2),16);
      var G = parseInt(cutHash.substring(2,4),16);
      var B = parseInt(cutHash.substring(4,6),16);
      return [R,G,B];
    },

    // t1 - tile startowy
    // t2 - tile docelowy
    // rel - rodzaj relacji jaka nas interesuje (1 - blokuje widocznosc, 2 - blokuje przechodniosc, 3 - blokuje obie)
    // Zwraca flase jesli nie ma blokady wskazanej relacji
    // Zwraca true jesli jest blokada wskazanej relacji
    testGridRelationship: function(t1,t2,rel) {
      var p,rv;
      // Sprawdza relacje miedzy polami.
      // Pierwsze pole nie ma być z czym sprawdzane 
      // (potrzebne jest aktualne i poprzednie pole aby sprawdzic miedzy nimi relacje)
      if (t1.x !== t2.x || t1.y !== t2.y) {
        // Sprawdza czy widać z poprzedniego pola do aktualnego
        if (t2.x > t1.x && t2.y > t1.y) {
          p = 3; // widok na SE
        } else if (t2.x > t1.x && t2.y === t1.y) {
          p = 2; // widok na E
        } else if (t2.x > t1.x && t2.y < t1.y) {
          p = 1; // widok na NE
        } else if (t2.x === t1.x && t2.y < t1.y) {
          p = 0; // widok na N
        } else if (t2.x === t1.x && t2.y > t1.y) {
          p = 4; // widok na S
        } else if (t2.x < t1.x && t2.y > t1.y) {
          p = 5; // widok na SW
        } else if (t2.x < t1.x && t2.y === t1.y) {
          p = 6; // widok na S
        } else if (t2.x < t1.x && t2.y < t1.y) {
          p = 7; // widok na NW
        }

        rv = parseInt(ROS.dungeon.gridRelationship[t1.y][t1.x].charAt(p),10);

        if (ROS.tools.inArray(rv,rel)) {
          return true; // blokada  
        }
        return false; // brak blokady
      }
      return false; // brak blokady
    },

    inArray: function(needle, haystack) {
      var length = haystack.length;
      for(var i = 0; i < length; i++) {
          if(haystack[i] == needle) return true;
      }
      return false;
    },

    // Funkcja porównuje położenie graczy w1 oraz w2, przylegli zwraca true jesli nie - false
    // distance to cyfra : 1 - gracze muszą przylegać do siebie, 2 - gracze mogą być oddaleni o jedno pole itd
    adjacent: function(w1,w2,distance) {
      if (w2.tilex >= (w1.tilex-distance) && w2.tilex <= (w1.tilex+distance) &&
          w2.tiley >= (w1.tiley-distance) && w2.tiley <= (w1.tiley+distance)) return true;
      else return false;
    },

    // Sprawdza linie dla broni strzeleckiej pomiedzy dwoma polami
    // Jeśli linia może byc przeprowadzona zwraca TRUE jeśli nie zwraca FALSE
    checkLos: function(x1, y1, x2, y2) {

        // UWAGA WAŻNE: checkSteps MUSI być liczbą NIEPARZYSTĄ aby poprawnie obliczać przecięcia po skosie
        var checkSteps = 129; // określamy dokładność linii czym większa tym więcej liczenia
        var tempX,tempY,currentX,currentY;

        var last_tx = x1; 
        var last_ty = y1;

        // jesli pole jest poza zasiegiem mapy gry
        if (x2 < 0 || x2 >= ROS.base.gameSize[0] || y2 < 0 || y2 >= ROS.base.gameSize[1]) return false;

        // jeśli pole nie jest posadzka podziemia
        if (ROS.dungeon.tileMap[y2][x2] == 0) return false;

        // okreslam srodek pola startowego w px
        var startX = (x1 * ROS.base.tileWidth) + (ROS.base.tileWidth / 2);
        var startY = (y1 * ROS.base.tileHeight) + (ROS.base.tileHeight / 2);

        var endX = (x2 * ROS.base.tileWidth) + (ROS.base.tileWidth / 2);
        var endY = (y2 * ROS.base.tileHeight) + (ROS.base.tileHeight / 2);

        // określam siatke nachylenia linii wzroku.
        // Tworze wirtualny prostokąt którego jeden narożnik to punk startowy, a przeciwległy narożnik to punk końcowy i dziele ten prostokąt na 61 kolumn i 61 rzędów
        // w ten sposób otrzymuje wysokść i szerokość jednej kosteczki tego posiatkowanego prostokąta, wymiary podstawiam pod slopeX i slopeY
        var slopeX = (endX - startX) / checkSteps;
        var slopeY = (endY - startY) / checkSteps;

        // teraz sprawdzam czy każda z przekatnych kosteczek prowadzących z punktu startowego do końcowego nie leży na polu z przeszkodą
        for(var i = 0; i < checkSteps; i++) {
            
            // pobieram położenie kolejnych kosteczek
            currentX = startX + (slopeX * i);
            currentY = startY + (slopeY * i);

            // zamieniam położenie kosteczki na numer rzędu i kolumny tile'sa na której leży
            tempX = Math.floor(currentX / ROS.base.tileWidth);
            tempY = Math.floor(currentY / ROS.base.tileHeight);

            // sprawdzam czy ten tiles ma przeszkode wzrokową
            if (ROS.dungeon.gridLos[tempY][tempX] === 1) {
                return false;
            }

            // Sprawdza relacje miedzy polami.
            if (ROS.tools.testGridRelationship({x:last_tx,y:last_ty},{x:tempX,y:tempY},[1,3])) {
                return false;
            }
            
            last_tx = tempX;
            last_ty = tempY;
        }

        // TRUE - widać cel
        return true;
    }





  };


})();


