// Singleton odpowiedzialny za przechowywanie i zarządzanie wszystkimi czasowymi efektami występującymi w grze
// Obsługuje rowniez efekty whenWear
ROS.effects = {

  selectionMode: false,



  whenHit: {
      "test": {
          "name": "Test",
          "desc": "Test",
          
          "manacost":0,

          activate: function(x,y,targets) {
              var t;
              for(t in targets) {
                  if (targets[t] instanceof ROS.Npc) {
                      ROS.tools.console('log','Cel: '+targets[t].getName()+'. When HIT '+x+' / '+y+' / '+targets[t]);  
                  } else if (targets[t] instanceof ROS.Container) {
                      ROS.tools.console('log','Cel: '+targets[t].getName()+'. When HIT '+x+' / '+y+' / '+targets[t]);  
                  } else if (targets[t] instanceof ROS.Door) {
                      ROS.tools.console('log','Cel: Drzwi. When HIT '+x+' / '+y+' / '+targets[t]);  
                  } else if (targets[t] instanceof ROS.Hero) {
                      ROS.tools.console('log','Cel: '+targets[t].getName()+'. When HIT '+x+' / '+y+' / '+targets[t]);  
                  }
              }
              
          }
      }
  },
  
  whenUse: {
      "lightstorm": {
          "name": "Świetlista burza",
          "desc": "Każdy wróg w obszarze efektu otrzymuje k6+4 obrażeń. Obszar aktywacji efektu musi być w zasięgu wzroku postaci i nie dalej niż 4 pola od niej. Koszt efektu to 5 punktów many.",

          "manacost": 5,
          "matrix": [
            [2,2,2],
            [2,1,2],
            [2,2,2]
          ],
          "distance": 4, // odleglosc pivota (punktu 1) od postaci aktywujacej
          "mustbeseen": true, // czy pole docelowe ma byc widoczne
          
          // Przekazujemy wspolrzedne wybranego pola oraz liste objetych celów 
          activate: function(x,y,targets) {

              var anim = new ROS.Animation('lightstorm'); 
              animPozx = (x * ROS.base.tileWidth) + (ROS.base.tileWidth / 2) - (anim.width / 2);
              animPozy = (y * ROS.base.tileHeight) + (ROS.base.tileHeight / 2) - (anim.height / 2);
              anim.moveAbs(animPozx,animPozy);
              anim.ignite({
                  "repetitions": 30,

                  "transform": {
                     "mode": 1, // jesli 1 to modyfikuje dla całej długosci animacji jesli 0 to dotyczy jednego powtorzenia
                     "start": {                     
                        "scale": 0.4,
                        "opacity": 1,
                        "rotate": 0
                     },
                     "end": {                     
                        "scale": 1.2,
                        "opacity": 0,
                        "rotate": 90
                     }
                  },

                  "speed": 60,            
                  "zindex": 16,
                  "angle": ROS.base.activePlayer.angle, // Kat ustawienia animacji
                  
                  "onTweenFrame": 10,                  
                  "onTween": function() {
                      var t;
                      for(t in targets) {
                        // Działa tylko na NPC
                          if (targets[t] instanceof ROS.Npc || targets[t] instanceof ROS.Container) {
                              targets[t].hurt(ROS.tools.dice(6)+4);
                          }
                      }        
                  }                   
              });              
          }
      },

      "heal": {
        "name": "Leczenie",
        "desc": "Cel odzyskuje k5+3 puktów życia. Efekt może być zaaplikowany bohaterom jak również jednostką niezależnym sąsiadującym z postaciom używającą efektu.",
        "manacost": 0,
        "matrix": [
            [1]
        ],
        "distance": 1,
        "mustbeseen": 1,

        activate: function(x,y,targets) {
           var t;
           for(t in targets) {
              // Działa tylko na Hero
              if (targets[t] instanceof ROS.Hero || targets[t] instanceof ROS.Npc) {
                  targets[t].heal(ROS.tools.dice(5)+3);
                  /*
                  ROS.effects.modifyStat({
                      "target": targets[t],
                      "actual": {
                          "life": "+|5"
                      }
                  });                  
                  */
              }
           }        
        }
     }  
  },

  whenWear: {
      "light": {
          "name": "Światłość",
          "desc": "Niosąc ten przedmiot w ręku właściciel lepiej widzi w ciemnościach (+2 do zasięgu wzroku)",
          activate: function(target) {
              ROS.effects.modifyStat({
                  "target": target,
                  "solid": {
                      "sight": "+|2"
                  },    
                  "actual": {
                      "sight": "+|2"
                  }
              });
          },
          deactivate: function(target) {
              ROS.effects.modifyStat({
                  "target": target,
                  "solid": {
                      "sight": "-|2"
                  },    
                  "actual": {
                      "sight": "-|2"
                  }
              });
          }        
      }
  },



  /**
   * Sprawdza czy postać i/lub przedmiot posiada dość many na odpalenie efektu jesli tak pobiera mane   
   */
  testMana: function(owner,item,effect,activation) {
      var lack = 0;
      var fireUp = true;      
      var mana = ROS.effects[activation][effect].manacost;

      // sprawdzam czy przedmiot posiada dosc swojej mocy
      // jesli nie posiada to moc zostanie pobrana od gracza o ile on posiada
      if (item.basic.hasOwnProperty('magic')) {        
          if (mana <= item.basic.magic.manaActual) {
              // Przedmiot posiada dość własnej many wiec pobiera tylko z niego
              item.basic.magic.manaActual -= mana;
          } else {
              // nie starczyło many w przedmiocie musi dobrac z many gracza
              // liczy ile brakło
              lack = parseInt((mana - item.basic.magic.manaActual),10);
              if (owner.actualStats.mana >= lack) {
                  item.basic.magic.manaActual = 0; // z przedmiotu sciaga wszystko
                  owner.actualStats.mana -= lack; // od gracza pozostała czesc
              } else {
                  // niestety nie ma dosc many
                  fireUp = false;
              }
          } 
      } else {
          // Jesli przedmiot nie ma wlasnej many to sciaga od bohatera
          if (mana <= owner.actualStats.mana) {                       
              // Jesli ma jej wystarczajaco to sciaga     
              owner.actualStats.mana -= mana; // pobiera mane od gracza
          } else {
              // niestety nie ma dosc many
              fireUp = false;
          }
      }

      owner.refreshIconStats(); // odswieza liniowe wykresy przy ikonie gracza
      owner.refreshBulbStats(); // odswieza liniowe wykresy przy ikonie gracza

      return fireUp;
  },




  /**
   * Modyfikacja statystyk 
   * data:  target - referencja do celu (npc lub hero)
   *        solid
   *        actual
   */
  modifyStat: function(data) {
      var c,p,newMod;
      var op = '+-^';             
      var modSight = false;
      
      // I. Modyfikuje statystyki solid
      if (data.hasOwnProperty('solid')) {
          for(c in data.solid) {
              if (c === 'sight') modSight = true;
              data.target.cloneStats[c] = ROS.tools.calculateStat(data.solid[c],data.target.cloneStats[c],op);
              // cloneStats nie mogą być nigdy niższe od zera
              if (data.target.cloneStats[c] < 0) {data.target.cloneStats[c] = 0;}                
          }
          
          // actualStats nie mogą być nigdy wyższe niż cloneStats, jesli opada cloneStats to actual tez musi
          if (data.target.actualStats[c] > data.target.cloneStats[c]) {
              data.target.actualStats[c] = data.target.cloneStats[c];
          }

          // Jesli został zmodyfikowany zakres widzenia to odświeżam tablice wzroku
          if (modSight) {
              data.target.refreshLOS();
              ROS.dungeon.createLos(false); // odswiezam zakres widzenia w przypadku jesli jakis efekt na niego wplywa           
          }
      }

      // II. Modyfikuje statystyki actual
      if (data.hasOwnProperty('actual')) {
          for(c in data.actual) {                
              data.target.actualStats[c] = ROS.tools.calculateStat(data.actual[c],data.target.actualStats[c],op);
              // actualStats nie mogą być nigdy niższe od zera
              if (data.target.actualStats[c] < 0) {data.target.actualStats[c] = 0;}
              
              // SPECJALNE MODYFIKATORY OZNACZONE SYMBOLEM ^ POZWALAJĄ NA DODAWANIE BONUSOWYCH WARTOSCI 
              // SĄ ONE PRZECHOWYWANE W OSOBNYM OBIEKCIE I DODAWANE DO CECHY ACTUALSTATS
              // DZIĘKI CZEMU WARTOŚĆ TAKIEJ CECHY MOZE PRZEKRACZAC POZIOMY MAKSYMALNE (suma actualStats + actualBonuses)
              if (data.actual[c].split('|')[0] === '^') {
                  data.target.actualBonuses[c] = ROS.tools.calculateStat(data.actual[c],data.target.actualBonuses[c],op);
              } 

              // actualStats nie mogą być nigdy wyższe niż cloneStats
              if (data.target.actualStats[c] > data.target.cloneStats[c]) {
                  data.target.actualStats[c] = data.target.cloneStats[c];
              }
          }

          if (data.target instanceof ROS.Hero) {
              data.target.refreshIconStats(); // jeśli celem była postać gracza to odświeża wykresy
              data.target.refreshBulbStats(); // jeśli celem była postać gracza to odświeża wykresy
          }
      }          
  },



  // Tablice aktywnych efektów czasowych
  "heroActiveEffects": [],
  "npcActiveEffects": [],
  "envActiveEffects": [],

  /**   
   * Każdy efekt czasowy musi mieć określony czas rozpoczęcia oraz czas trwania
   * Funkcja uruchamiana przez wywołane efekty
   * Argumenty:
   * @sourceID - jest potrzebny w przypadku jesli mam na sobie ubrany przedmiot ktory ma kilka efektow whenWear
   *            i ściagam z siebie ten przedmiot to wszystkie efekty muszą byc usuniete wiec musza byc powiazane zmienną
   */
  addEffect: function(sourceID,effect,args,mode) {    
      var d = new Date();
      var ob = {
          "source": sourceID, // identyfikator grupy efektów sluzy do grupowania efektow pochodzących z tego samego zrodla (przedmiot, wróg itp) 
          "effectName": effect, // nazwa efektu
          "effectArgs": args, // aby móc ponownie wywołać efekt z tymi samymi argumentami        
          "activateMethod": mode, // sposob aktywacji efektu np whenWear, whenUse, whenHit
          "startTurn": ROS.base.gameTurn, // numer tury w ktorej zacząl działać efekt
          "startTime": d.getTime() // ilość milisekund od 1970. Jeśli w tej samej turze odpalonch zostanie kilka efektów ich kolejnosc musi byc znana
      };

      if (args.target instanceof ROS.Hero) {
          ROS.effects.heroActiveEffects.push(ob);
          ob = null;
          return;
      }
      if (args.target instanceof ROS.Npc) {
          ROS.effects.npcActiveEffects.push(ob);
          ob = null;
          return;
      }
      
      ROS.effects.envActiveEffects.push(ob);        
      ob = null;
  },

  /**
   * Usuwa wszystkie efekty wywołane z jednego źródła. Np pochodzące z jednego przedmiotu lub od jednego wroga.
   * Funkcja bez dodatkowych testów usuwa efekt.
   * Uruchamiana jest np dla przedmiotow o działaniu whenWear w chwili gdy są ściągane
   */
  delEffects: function(sourceID) {
      if (sourceID === undefined) return;
      var e,s;

      function del(ef,nr) {
          if(ef[nr].source === sourceID) {
              ROS.effects.list[ ef[nr].effectName ].deactivate( ef[nr].effectArgs, ef[nr].activateMethod );
              ef.splice(nr,1);         
          }
      }

      e = ROS.effects.heroActiveEffects;    
      for(s=0; s < e.length; s++) { del(e,s); }
      e = ROS.effects.npcActiveEffects;    
      for(s=0; s < e.length; s++) { del(e,s); }    
      e = ROS.effects.envActiveEffects;    
      for(s=0; s < e.length; s++) { del(e,s); }
  },
  
  /**
   * Usuwa efekty zakończone  
   */
  delPastEffects: function(type) {
      var e,s;

      function del(ef,nr) {
          // Jeśli efekt nie jest aktywowany poprzez whenWear oraz posiada określony czas działania który już minął
          if ( ef[nr].activateMethod !== "whenWear" && (ef[nr].startTurn + ef[nr].effectArgs.duration <= ROS.base.gameTurn) ) {          
              ROS.effects.list[ ef[nr].effectName ].deactivate( ef[nr].effectArgs, ef[nr].activateMethod );
              ef.splice(nr,1); // usuwa efekt z tablicy  
          }
      }

      switch(type) {
          case "hero":
              e = ROS.effects.heroActiveEffects;    
              for(s=0; s < e.length; s++) { del(e,s); }
          break;
          case "npc":
              e = ROS.effects.npcActiveEffects;    
              for(s=0; s < e.length; s++) { del(e,s); }    
          break;
          default:
              e = ROS.effects.envActiveEffects;
              for(s=0; s < e.length; s++) { del(e,s); }           
          break;
      }    
  },







  /**
   *
   * Zamyka wszystkie otwarte paletki, przechodzi w tryb wyboru celu działania efektu.
   * Tworzy nową warstwe półprzeroczystą o kształcie matrixa, ktorej punktem środkowym jest pole 1 w matrixie
   * Daje możliwość obracania tej siatki o 90stopni
   * Wyjście z trybu poprzez naciśniecie klawisza ESC
   * Potwierdzenie obszaru aktywuje efekt na wszystkich objętych celach
   * Argumenty:
   * @item - referencja do przedmiotu
   */
  matrixDiv:null,
  stLoop:null,
  selectTargetStart: function(owner,item,effect,activation) {
      var x;

      // Ustawia bohatera aktywującego efekt jako aktywnego
      ROS.base.setActivePlayer(owner.tilex,owner.tiley);
      
      if (!item.canUse()) return;
                  
      // Czyści warswe
      if (ROS.effects.matrixDiv) {
          ROS.tools.clearNodes(ROS.effects.matrixDiv);
          ROS.map.area.removeChild(ROS.effects.matrixDiv);
      }
          
      pivotX = 0;
      pivotY = 0;

      // Ukrywa paletki
      for(x in ROS.base.palettes) {
          ROS.base.palettes[x].hide();
      }

      ROS.microScroll.show('<b>'+ROS.effects[activation][effect].name+'</b> (klawisze: W,S,A,D obracają maske, ESC przerywa.).','#33FF33');

      // Włącza tryb selekcji
      ROS.effects.selectionMode = true; // ustawiam że jestem w trybie wyboru

      // Maluje obszar selekcji w oparciu o tablice
      if (ROS.effects[activation][effect].hasOwnProperty('matrix')) {
          var m = ROS.effects[activation][effect].matrix;
          
          ROS.effects.matrixDiv = document.createElement('div');
          ROS.effects.matrixDiv.id = 'matrixDiv';
          var xs = ROS.effects.matrixDiv.style;
          xs.position = 'absolute';
          xs.width = (m.length * ROS.base.tileWidth) + 'px';
          xs.height = (m[0].length * ROS.base.tileHeight) + 'px';
          xs.left = -2000+'px';
          xs.top = -2000+'px';  
          xs.zIndex = 20;
          xs.mozBorderRadius = '20px';
          xs.borderRadius = '20px';
          xs.webkitBorderRadius = '20px';

          ROS.effects.matrixDiv.onmousedown = function() {              

              if (!ROS.effects.inrange) {
                ROS.infoScroll.show('<br>UWAGA:<br>Wskazany obszar jest poza zasięgiem efektu.');
                ROS.tools.console('log','Obszar poza zasięgiem!');
                return;  
              }

              if (ROS.effects[activation][effect].mustbeseen && !ROS.effects.isseen) {
                ROS.infoScroll.show('<br>UWAGA:<br>Wskazany obszar musi być w zasięgu wzroku.');
                ROS.tools.console('log','Obszar poza widokiem!');
                return;  
              }

              // W pierwszej kolejności sprawdza czy postać ma dość MANY żeby odpalić efekt
              // O ile efekt wogóle pobiera MANE
              if (!ROS.effects.testMana(owner,item,effect,activation)) {
                ROS.infoScroll.show('<br>UWAGA:<br>Nie posiadasz wystarczającej ilości many.');
                ROS.tools.console('log','Brak many!');
                return;
              }


              // sprawdza wszystkie cele znajdujące się pod maską
              var targets = [];
              var mx = (parseInt(ROS.effects.matrixDiv.style.left,10) / ROS.base.tileWidth);
              var my = (parseInt(ROS.effects.matrixDiv.style.top,10) / ROS.base.tileHeight);

              for(y=0; y<m.length; y++) {
                  for(x=0; x<m[0].length; x++) {
                      if (m[y][x] !== 0) {
                          // Jeśli tile znajduje sie nad obszarem mapy (bo przy krawedziach matrix moze wychodzic poza mape)
                          if (((my+y) >= 0 && (my+y) < ROS.base.gameSize[1]) && ((mx+x) >= 0 && (mx+x) < ROS.base.gameSize[0])) {
                              
                              // Do celów dodaje różne typy. 
                              // Efekt w metodzia activate wybiera te ktore chce
                              if (ROS.dungeon.gridHeroes[(my+y)][(mx+x)] instanceof ROS.Hero) {
                                  targets.push(ROS.dungeon.gridHeroes[(my+y)][(mx+x)]);
                              }
                              
                              if (ROS.dungeon.gridNpcs[(my+y)][(mx+x)] instanceof ROS.Npc) {
                                  targets.push(ROS.dungeon.gridNpcs[(my+y)][(mx+x)]);
                              }

                              if (ROS.dungeon.gridContainers[(my+y)][(mx+x)] instanceof ROS.Container) {
                                  targets.push(ROS.dungeon.gridContainers[(my+y)][(mx+x)]);
                              }

                          }
                      }
                  }
              }
              
              ROS.effects.selectTargetEnd();              
              
              // Obraca gracza twarzą do wskazanego celu i aktywuje efekt
              var ff = ROS.tools.frontFace(
                  owner.left,
                  owner.top,
                  ((ROS.effects.mtxtest * ROS.base.tileWidth) + (ROS.base.tileWidth/2)),
                  ((ROS.effects.mtytest * ROS.base.tileHeight) + (ROS.base.tileHeight/2))
              ); 
              if (ff !== false) {
                owner.turn(ff,function() {
                  item.useIt(); // Odpala specyficzne zachowania - np eliksir traci dawke
                  ROS.effects[activation][effect].activate(ROS.effects.mtxtest,ROS.effects.mtytest,targets);
                });
              } else {
                item.useIt(); // Odpala specyficzne zachowania - np eliksir traci dawke
                ROS.effects[activation][effect].activate(ROS.effects.mtxtest,ROS.effects.mtytest,targets);
              }
          };

          var t;
          for(y=0; y<m.length; y++) {
              for(x=0; x<m[0].length; x++) {
                  if (m[y][x] !== 0) {                      
                      // Szuka jedynki - jedynka to pivot w matrixie
                      if (m[y][x] === 1) {
                        pivotX = (x * ROS.base.tileWidth);
                        pivotY = (y * ROS.base.tileHeight);
                      }

                      // Tworzy wizualnego divka i wrzuca do matrixa
                      t = document.createElement('div');                                            
                      t.style.background = '#00FF00';                        

                      if (m[y][x] === 1) {
                        t.style.opacity = 0.2;                        
                        t.style.left = (x * ROS.base.tileWidth)-4 + 'px';
                        t.style.top = (y * ROS.base.tileHeight)-4 + 'px';                        
                        t.style.width = (ROS.base.tileWidth+8) + 'px';
                        t.style.height = (ROS.base.tileHeight+8) + 'px';                        
                        t.style.mozBorderRadius = '25px';
                        t.style.borderRadius = '25px';
                        t.style.webkitBorderRadius = '25px';
                        t.style.mozBoxShadow = '0 0 20px 10px #3d793f';
                        t.style.webkitBoxShadow = '0 0 20px 10px #3d793f';
                        t.style.boxShadow = '0 0 20px 10px #3d793f';                      
                      } else {
                        t.style.opacity = 0.3;                        
                        t.style.left = (x * ROS.base.tileWidth) + 'px';
                        t.style.top = (y * ROS.base.tileHeight) + 'px';
                        t.style.width = (ROS.base.tileWidth-8) + 'px';
                        t.style.height = (ROS.base.tileHeight-8) + 'px';                  
                        t.style.margin = '4px';
                        t.style.mozBorderRadius = '10px';
                        t.style.borderRadius = '10px';
                        t.style.webkitBorderRadius = '10px';
                        t.style.mozBoxShadow = '0 0 20px 10px #3d793f';
                        t.style.webkitBoxShadow = '0 0 20px 10px #3d793f';
                        t.style.boxShadow = '0 0 20px 10px #3d793f';
                                                                 
                      }
                      
                      t.style.position = 'absolute';
                                            
                      ROS.effects.matrixDiv.appendChild(t);
                      t = null;
                  }
              }
          }
          
          ROS.map.area.appendChild(ROS.effects.matrixDiv);      

          // Zatrzymuje tryb malowaina ścieżki i wyboru opcji
          ROS.menuPopup.loopStop();

          //var punktObrotu = (pivotX+(ROS.base.tileWidth / 2))+' '+(pivotY+(ROS.base.tileHeight / 2));      
          ROS.effects.selectTargetLoop(pivotX,pivotY, ROS.effects[activation][effect].distance, owner, ROS.effects[activation][effect].mustbeseen );
      }    
  },



  /**
   * Kończy faze wyboru obszaru dla działania efektu
   */
  selectTargetEnd: function() {
      if (ROS.effects.matrixDiv) {
          ROS.tools.clearNodes(ROS.effects.matrixDiv);
          ROS.map.area.removeChild(ROS.effects.matrixDiv);
      }
      clearTimeout(ROS.effects.stLoop);
      //ROS.microScroll.hide();
      ROS.effects.matrixDiv = null;
      ROS.effects.selectionMode = false;
      ROS.menuPopup.loopStart();
  },


  changeMatrixColor: function(type) {
    var c,x,divs;
      switch(type) {
        case "no": c = '#FF0000'; break;
        case "ok": c = '#00FF00'; break; 
      }

      // podmienia kolor wszystkich dzieci w matrixie
      if ( ROS.effects.matrixDiv.hasChildNodes() ) {
        divs = ROS.effects.matrixDiv.getElementsByTagName('div');
        for(x=0; x<divs.length; x++ ) {            
          divs[x].style.background = c;
        }
      }    
  },

  /**
   * Zajmuje się przesuwaniem matrixa za kursorem myszki
   */
  mtxtest: 0,
  mtytest: 0,
  mtx: 0,
  mty: 0,
  inrange: false,
  isseen: false,
  selectTargetLoop: function(x,y,distance,owner,mbs) {    
      var gp = ROS.mouse.gamePosition();
      var rot;

      if (gp) {
          // Jesli kursor znajduje się nad obszarem gry
          // oraz przeszukiwanie i scroll są nieaktywne
          ROS.effects.mtxtest = gp.tx;
          ROS.effects.mtytest = gp.ty;

          // Jeśli kursor przeniósł się na nowy segment
          if (ROS.effects.mtxtest !== ROS.effects.mtx || ROS.effects.mtytest !== ROS.effects.mty) {             
              ROS.effects.matrixDiv.style.left = (ROS.effects.mtxtest * ROS.base.tileWidth - x) + 'px';
              ROS.effects.matrixDiv.style.top  = (ROS.effects.mtytest * ROS.base.tileHeight - y) + 'px';

              // I - SPRAWDZA CZY WYBRANY CEL MIESCI SIE W ZASIEGU
              ROS.effects.inrange = false;
              if (ROS.tools.calculateDistance(owner.tilex,owner.tiley,ROS.effects.mtxtest,ROS.effects.mtytest) <= distance) {                  
                  ROS.effects.inrange = true;
              }

              // II - SPRAWDZA CZY WYBRANY CEL JEST WIDOCZNY PRZEZ AKTYWUJĄCEGO BOHATERA
              ROS.effects.isseen = true;
              if (mbs === true) {                                
                ROS.effects.isseen = false;
                if (ROS.tools.checkLos(owner.tilex,owner.tiley,ROS.effects.mtxtest,ROS.effects.mtytest)) {
                    ROS.effects.isseen = true;
                }
              }

              // Ustawia odpowiednio kolor
              if (ROS.effects.isseen && ROS.effects.inrange) {
                  ROS.effects.changeMatrixColor('ok');
              } else {
                  ROS.effects.changeMatrixColor('no');
              }

              ROS.effects.mtx = ROS.effects.mtxtest;
              ROS.effects.mty = ROS.effects.mtytest;
          }
      }

      // Obracanie    
      if (ROS.keyboard.isPressed(87,true)) { // W = stan 1
          ROS.tools.rotate(ROS.effects.matrixDiv,0);
      }
      if (ROS.keyboard.isPressed(68,true)) { // D = stan 2
          ROS.tools.rotate(ROS.effects.matrixDiv,90);
      }
      if (ROS.keyboard.isPressed(83,true)) { // S = stan 3
          ROS.tools.rotate(ROS.effects.matrixDiv,180);
      }
      if (ROS.keyboard.isPressed(65,true)) { // A = stan 4
          ROS.tools.rotate(ROS.effects.matrixDiv,270);
      }

      if (ROS.keyboard.isPressed(27,true)) { // ESC
          // Koniec - wycofanie
          ROS.effects.selectTargetEnd();
          return;
      }


      // Odpala cykliczne wywoływanie metody loop co 0.05 sekundy
      ROS.effects.stLoop = setTimeout(function() { ROS.effects.selectTargetLoop(x,y,distance,owner,mbs); },50);
  }

};