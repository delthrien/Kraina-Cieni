ROS.dungeon = (function() {


    // SEGMENTY (id jest nazwą pliku)
    /* ID: [        
        2/1/0 = mozna ominąć,ale nie mozna wejsc / mozna wejsc / nie mozna wejsc ani ominac,
        ilosc punktów życia odebranych postaci która stanie na polu,
        kategoria dzwieku,
        kolor punktu na minimapie
        box-shadow
        rotacja (4 = (NESW), 2 = (EW), 360 = free)
       ]
    */
    var gfxFolder = 'gfx/mapLayers/';

    var Segments = {
      "map": {
        'stone1':{
            'file':'stone1.png',
            'transitions':1,
            'danger':0,
            'sound':'def',
            'minimap':'#1F1306',
            'shadow':null,
            'rotation':4
        },
        'stone2': {
            'file':'stone2.png',
            'transitions':1,
            'danger':0,
            'sound':'def',
            'minimap':'#1F1306',
            'shadow':null,
            'rotation':4
        },
        'stone3': {
            'file':'stone3.png',
            'transitions':1,
            'danger':0,
            'sound':'def',
            'minimap':'#1F1306',
            'shadow':null,
            'rotation':4
        },
        'stone4': {
            'file':'stone4.png',
            'transitions':1,
            'danger':0,
            'sound':'def',
            'minimap':'#1F1306',
            'shadow':null,
            'rotation':4
        },
        
        'dirt1': {
            'file':'dirt1.png',
            'transitions':1,
            'danger':0,
            'sound':'def',
            'minimap':'#3F2904',
            'shadow':null,
            'rotation':4
        },        
        'dirt2': {
            'file':'dirt2.png',
            'transitions':1,
            'danger':0,
            'sound':'def',
            'minimap':'#3F2904',
            'shadow':null,
            'rotation':4
        },
        
        'grass1': {
            'file':'grass1.png',
            'transitions':1,
            'danger':0,
            'sound':'def',
            'minimap':'#B5CF4D',
            'shadow':null,
            'rotation':4
        },
        
        'lava1': {
            'file':'lava1.png',
            'transitions':1,
            'danger':4,
            'sound':'hot',
            'minimap':'#FF6E1F',
            'shadow':'0 0 20px 0px #FA7602',
            'rotation':4
        },
        'lava2': {
            'file':'lava2.png',
            'transitions':1,
            'danger':0,
            'sound':'def',
            'minimap':'#1F1306',
            'shadow':null,
            'rotation':4
        },

        'water1': {
            'file':'water1.png',
            'transitions':1,
            'danger':0,
            'sound':'wet',
            'minimap':'#3398CF',
            'shadow':'0 0 20px 5px #3c4553',
            'rotation':4
        },
        'water2': {
            'file':'water2.png',
            'transitions':1,
            'danger':0,
            'sound':'wet',
            'minimap':'#3398CF',
            'shadow':'0 0 20px 5px #01caff',
            'rotation':4
        },
        
        'acid1': {
            'file':'acid1.png',
            'transitions':1,
            'danger':2,
            'sound':'wet',
            'minimap':'#74BF23',
            'shadow':'0 0 20px 5px #3d793f',
            'rotation':4
        },

        'ice1': {
            'file':'ice1.png',
            'transitions':1,
            'danger':0,
            'sound':'def',
            'minimap':'#effcff',
            'shadow':'0 0 20px 5px #dff3f5',
            'rotation':4
        },
        'ice2': {
            'file':'ice2.png',
            'transitions':1,
            'danger':0,
            'sound':'def',
            'minimap':'#effcff',
            'shadow':null,
            'rotation':4
        }
      },

      // Wartości w tablicy: (id jest nazwa pliku)      
      // - oznaczeniem przechodniości (2/1/0 = mozna ominąć,ale nie mozna wejsc / mozna wejsc / nie mozna wejsc ani ominac)
      // - ograniczeniem linii wzroku (1 - zasłania / 0 - nie zasłania
      // - rotacja (4 = (NESW), 2 = (EW), 360 = free)
      "stuff": {
        'stonewall1': {
            'file':'stonewall1.png',
            'transitions':0,
            'blockLOS':1,
            'rotation':4,
            'minimap':'#53493f'
        },
        'stonewall2':{
            'file':'stonewall2.png',
            'transitions':0,
            'blockLOS':1,
            'rotation':4,
            'minimap':'#53493f'
        },

        'lavawall1':{
            'file':'lavawall1.png',
            'transitions':0,
            'blockLOS':1,
            'rotation':4,
            'minimap':'#8f7065'
        },
        
        'icewall1':{
            'file':'icewall1.png',
            'transitions':0,
            'blockLOS':1,
            'rotation':4,
            'minimap':'#8f7065'
        },
        'icewall2':{
            'file':'icewall2.png',
            'transitions':0,
            'blockLOS':1,
            'rotation':4,
            'minimap':'#8f7065'
        },

        'column1':{
            'file':'column1.png',
            'transitions':2,
            'blockLOS':1,
            'rotation':360,
            'minimap':'#6d6d6d'
        }        
      }
    };


    var mapThemes = [
        {
            "name": "Kamienny loch",
            "bg":"gfx/bg.jpg",
            "floors":  ['stone4'],
            "walls":   ['stonewall1'],
            "liquids": ['water1']
        },
        {
            "name": "Stara grota",
            "bg":"gfx/bg.jpg",
            "floors":  ['dirt1','dirt2'],
            "walls":   ['stonewall1'],
            "liquids": ['lava1']
        },
        {
            "name": "Piekło",
            "bg":"gfx/bg_lava.jpg",
            "floors":  ['lava2'],
            "walls":   ['lavawall1'],
            "liquids": ['lava1','acid1']
        },
        {
            "name": "Lodowa jaskinia",
            "bg":"gfx/bg_ice.jpg",
            "floors":  ['ice1','ice2'],
            "walls":   ['icewall2'],
            "liquids": ['water2']
        }
    ];


    var mapX, mapY;
    var roomTiles = [];
    var roomTilesSections = []; // przechowuje tablice 2d zawierającą identyfikatory sekcji
    var p;
    var sections = {};
    var doorsCandidates = []; // tablica 2D zawierająca 0,1,2 | 1:korytarze łączące punkty sekcji | 2:łączniki na sekretne drzwi
    var startTile;

    

    // sprawdza otoczenie tilea
    // usuwa sasiadujące pola wskazane w argumentach
    function clearAdjacent(x,y,N,E,S,W) {
        if (W == 1 && x > 0) {
            roomTiles[y][x-1] = 0;
            roomTilesSections[y][x-1] = 0;
            doorsCandidates[y][x-1] = 0;
        }
        if (E == 1 && x < (roomTiles[0].length-1)) {
            roomTiles[y][x+1] = 0;
            roomTilesSections[y][x+1] = 0;
            doorsCandidates[y][x+1] = 0;
        }
        if (N == 1 && y > 0) {
            roomTiles[y-1][x] = 0;
            roomTilesSections[y-1][x] = 0;
            doorsCandidates[y-1][x] = 0;
        }
        if (S == 1 && y < (roomTiles.length-1)) {
            roomTiles[y+1][x] = 0;
            roomTilesSections[y+1][x] = 0;
            doorsCandidates[y+1][x] = 0;
        }
    }

    // usuwa sekcje o wskazanym id
    function delSection(id) {
        var x,y;
        for(y in roomTiles) {
            y = y*1;
            for(x in roomTiles[y]) {
                x = x*1;
                if (roomTilesSections[y][x] === id) {
                    roomTilesSections[y][x] = 0;
                    roomTiles[y][x] = 0;
                    doorsCandidates[y][x] = 0;
                }
            }
        }
        delete sections[id];
    }

    // wybiera pole startowe
    function setStartTile() {
        var x,y,ok;
        var candidates = [];

        for(y in roomTiles) {
            y = y*1;
            for(x in roomTiles[y]) {
                x = x*1;
                if (roomTiles[y][x] == 1 && doorsCandidates[y][x] == 0) {
                    ok = false;
                    // pole startowe musi przynajmniej jedną krawedzia stykac sie ze scianą
                    if (y > 0 && roomTiles[y-1][x] == 0) { ok = true; }
                    if (x > 0 && roomTiles[y][x-1] == 0) { ok = true; }
                    if (y < (roomTiles.length-1) && roomTiles[y+1][x] == 0) { ok = true; }
                    if (x < (roomTiles[0].length-1) && roomTiles[y][x+1] == 0) { ok = true; }
                    if (ok) {
                        candidates.push({x:x,y:y});
                    }
                }
            }
        }
        var id = ROS.tools.dice(candidates.length)-1;
        startTile = candidates[id];
    }








    // Wstaw polaczenie pomiedzy dwoma losowymi tile'ami dwóch różnych sekcji
    function calculateTilesForCorridor(startx,starty,endx,endy) {
        var x,y;
        var tempTab = [];
        var lastSid = roomTilesSections[starty][startx];
        var finalSid = roomTilesSections[endy][endx];

        // Działanie algorytmu budującego korytarz łączący sekcje.

        // Założenie:
        //   Sekcje są bardzo nieregularne
        //   Pole startowe korytarza moze zostać wylosowane w środku sekcji
        //   Korytarz zmierzając do celu może wyjść poza sekcje a następnie wrócić do tej samej sekcji przed osiagnie cel.

        // Cel:
        //   Korytarz nie powinien zostać zbudowany na odcinkach które nic nie wnoszą !

        // Rozwiązanie:
        //   System sprawdza identyfikatory sekcji podczas określania pól na ktorych zostanie zbudowany korytarz
        //   Jeśli pola przechodzą przez tą samą sekcje korytarz nie będzie budowany.
        //   Nawet jeśli korytarz opuści sekcje, a następnie do niej wróci,
        //   ale nie wejdzie po drodze na obszar innej sekcji to cały ten odcinek zostanie udrzucony.

        //   UWAGA 1: Korytarz nie musi wejść na pole innej sekcji aby ją połączyć !
        //     Aby tego uniknąć pola po obu stronach korytarza są czyszczone !

        //   UWAGA 2: Jeśli korytarz połączy już sekcje startową z docelową, moze się okazać że będzie dalej budowany
        //     aż osiągnie punkt końcowy w tej sekcji. Nie ma to sensu. Dlatego zaraz po osiągnięciu sekcji docelowej,
        //     skrypt jest przerywany.


        // w lewo lub w prawo
        if (startx < endx) {
            for(x = startx; x <= endx; x++) {
                // jesli pole nalezy do jakiejs sekcji
                if (roomTilesSections[starty][x] !== 0) {
                    // sprawdza czy to ta sama sekcja co ostatnio
                    if (roomTilesSections[starty][x] == lastSid) {
                        // jesli tak czyści tablice i rozpoczyna budowanie korytarza od nowa
                        tempTab = []; // clear
                    } else if (roomTilesSections[starty][x] == finalSid) {
                        return tempTab;
                    }
                    lastSid = roomTilesSections[starty][x];
                } else {
                    // jesli jest po pole "wolne"
                    tempTab.push({x:x,y:starty});
                    // usuń pola po bokach korytarza - nie może się stykac z przypadkowymi sekcjami lub innymi korytarzami
                    clearAdjacent(x,starty,1,0,1,0);
                }
            }
        } else if (startx > endx) {
            for(x = startx; x >= endx; x--) {
                if (roomTilesSections[starty][x] !== 0) {
                    if (roomTilesSections[starty][x] == lastSid) { tempTab = []; }
                    else if (roomTilesSections[starty][x] == finalSid) { return tempTab; }
                    lastSid = roomTilesSections[starty][x];
                } else {
                    tempTab.push({x:x,y:starty});
                    clearAdjacent(x,starty,1,0,1,0);
                }
            }
        }

        // w gore lub w dół
        if (starty < endy) {
            for(y = starty; y <= endy; y++) {
                if (roomTilesSections[y][endx] !== 0) {
                    if (roomTilesSections[y][endx] == lastSid) { tempTab = []; }
                    else if (roomTilesSections[y][endx] == finalSid) { return tempTab; }
                    lastSid = roomTilesSections[y][endx];
                } else {
                    tempTab.push({x:endx,y:y});
                    clearAdjacent(endx,y,0,1,0,1);
                }
            }
        } else if (starty > endy) {
            for(y = starty; y >= endy; y--) {
                if (roomTilesSections[y][endx] !== 0) {
                    if (roomTilesSections[y][endx] == lastSid) { tempTab = []; }
                    else if (roomTilesSections[y][endx] == finalSid) { return tempTab; }
                    lastSid = roomTilesSections[y][endx];
                } else {
                    tempTab.push({x:endx,y:y});
                    clearAdjacent(endx,y,0,1,0,1);
                }
            }
        }
    }

    // Usuwa miejsca w których fragmenty sekcji stykają się narożnikami
    function removeCornerJoins() {
        var x,y;
        for(y in roomTiles) {
            y = y*1;
            for(x in roomTiles[y]) {
                x = x*1;

                // Bierze pod uwage 4 pole 2x2 i sprawdza czy nie wystepuje w nich wzorzec zetkniecia narożnikowego
                // Przy sprawdzaniu pomija ostatni rząd i kolumne
                // ponieważ są one sprawdzane przy testach przed-ostatniego rzędu i kolumny
                if (x < (roomTiles[0].length-1) && y < (roomTiles.length-1)) {
                    if (roomTiles[y][x] == 1 && roomTiles[y][x+1] == 0 &&
                        roomTiles[y+1][x] == 0 && roomTiles[y+1][x+1] == 1) {
                        // X 0
                        // 0 X
                        if (ROS.tools.dice(2) == 1) {
                            // 0 0
                            // 0 X
                            roomTiles[y][x] = 0;
                            roomTilesSections[y][x] = 0;
                            doorsCandidates[y][x] = 0;
                        } else {
                            // X 0
                            // 0 0
                            roomTiles[y+1][x+1] = 0;
                            roomTilesSections[y+1][x+1] = 0;
                            doorsCandidates[y+1][x+1] = 0;
                        }
                    } else if (roomTiles[y][x] == 0 && roomTiles[y][x+1] == 1 &&
                               roomTiles[y+1][x] == 1 && roomTiles[y+1][x+1] == 0) {
                        // 0 X
                        // X 0
                        if (ROS.tools.dice(2) == 1) {
                            // 0 0
                            // X 0
                            roomTiles[y][x+1] = 0;
                            roomTilesSections[y][x+1] = 0;
                            doorsCandidates[y][x+1] = 0;
                        } else {
                            // 0 X
                            // 0 0
                            roomTiles[y+1][x] = 0;
                            roomTilesSections[y+1][x] = 0;
                            doorsCandidates[y+1][x] = 0;
                        }
                    }
                }
            }
        }
    }

    // Rozpoznaje wszystkie pola sekcji oraz oznacza je przesłanym identyfikatorem
    // x,y - współrzędne tile'a od którego rozpoczyna się rozpoznanie
    // sid - id sekcji
    // q - ilość tilów sekcji
    function markSection(x,y,sid,q) {
        roomTilesSections[y][x] = sid; // oznacza pierwszy tile identyfikatorem
        // zakłada jego własność w obiekcie jesli jeszcze nie miał
        if (!sections.hasOwnProperty(sid)) {
            sections[sid] = [];
        }
        // wkłada do tabelki obiekt ze współrzędnymi tile'a
        sections[sid].push({
            'x':x,
            'y':y
        });

        // sprawdza cztery tile wokoło
        // - jeśli są częścią pomieszczenia
        // - jeśli nie należą do tej sekcji
        // to przyłącz do tej sekcji
        if (y > 0) {
            if (roomTiles[y-1][x] == 1 && roomTilesSections[y-1][x] !== sid) {
                q = markSection(x,y-1,sid,++q);
            }
        }
        if (y < (roomTiles.length-1)) {
            if (roomTiles[y+1][x] == 1 && roomTilesSections[y+1][x] !== sid) {
                q = markSection(x,y+1,sid,++q);
            }
        }
        if (x > 0) {
            if (roomTiles[y][x-1] == 1 && roomTilesSections[y][x-1] !== sid) {
                q = markSection(x-1,y,sid,++q);
            }
        }
        if (x < (roomTiles[0].length-1)) {
            if (roomTiles[y][x+1] == 1 && roomTilesSections[y][x+1] !== sid) {
                q = markSection(x+1,y,sid,++q);
            }
        }
        return q; // zwraca ilosc tilów
    }

    // dzieli calości na niepowiązane sekcje i łączy je korytarzami
    function groupSections() {
        var sid,x,y,ssz;
        var randTile;
        var sectionsQuantity = 0;
        var marks = [];
        var wybranePola;
        var tid;

        // I - Czyści informacje o sekcjach
        sections = {};
        roomTilesSections = [];
        for(y = 0; y < mapY; y++) {
            roomTilesSections[y] = [];
            for(x = 0; x < mapX; x++) {
                roomTilesSections[y][x] = 0;
            }
        }

        // II - Usuwa miejsca w których pomieszczenia stykają się narożnikami
        //      Robi to teraz, przed liczeniem sekcji ponieważ usunięcie może wpłynąć na podział sekcji
        removeCornerJoins();

        // III - Rozpoznaje sekcje, przydziela im id, usuwa małe sekcje
        for(y in roomTiles) {
            y = y*1;
            for(x in roomTiles[y]) {
                x = x*1;
                if (roomTiles[y][x] == 1 && roomTilesSections[y][x] == 0) { // Nowa niesprawdzona sekcja
                    //sid = ROS.tools.dice(100000); // losuje dla niej id
                    sid = ROS.tools.randomColor();
                    ssz = markSection(x,y,sid,1); // przydziela wszystkim jej tile'om sid, poznaje jej rozmiar
                    if (ssz < 8) { // jesli rozmiar sekcji jest mniejszy niż 8 tile'ów
                        delSection(sid); // usuń sekcje
                    } else {
                        sectionsQuantity++; // zwiększ zmienną przechowującą ilość sekcji
                    }
                }
            }
        }


        // V - Połącz wybrane tile'y korytarzami
        if(sectionsQuantity > 1) {
            do {
                // Wybiera po jednym losowym tile'u z każdej sekcji
                marks = []; // clear
                for(x in sections) {
                    randTile = ROS.tools.dice(sections[x].length)-1;
                    marks.push({
                        'randx': sections[x][randTile].x,
                        'randy': sections[x][randTile].y
                    });
                }

                wybranePola = calculateTilesForCorridor(marks[0].randx,marks[0].randy,marks[1].randx,marks[1].randy);
            } while (wybranePola === undefined);

            // Jedno pole w korytarzu wybiera jako kandydata na drzwi
            // Tak aby każdy korytarz mógł miec max 1 drzwi
            if (wybranePola.length > 0) {
                randTile = ROS.tools.dice(wybranePola.length)-1;
                doorsCandidates[wybranePola[randTile].y][wybranePola[randTile].x] = 1;
            }

            // wypelnia wybrane pola korytarzem
            for(tid in wybranePola) {
                x = wybranePola[tid].x;
                y = wybranePola[tid].y;

                // pola korytarza nienależące do sekcji oznacza jako sekcja
                if (roomTiles[y][x] == 0) {
                    roomTiles[y][x] = 1; // przydziela pola korytarzy do sekcji
                }
            }

            // Po zbudowaniu korytarza odświeża stan sekcji ponownie wywołujac tą funkcje.
            // Moze sie zdarzyc, że korytarz zmienił ilość sekcji (połączył kilka lub podzieli).
            // Powtarza to tak długo aż całe podziemie zmieni się w jedną sekcje.
            groupSections();
        }
    }

    // Łączy ze sobą niektóre pomieszczenia stykające sie scianami (tworzy w ten sposób nowe przejscia)
    // Niektóre z nich mogą być sekretnymi przejsciami
    // Wywoływane przed dodaniem scian i przed zagęszczeniem rozdzielczości
    function joinNearRooms() {
        var x,y;
        for(y in roomTiles) {
            y = y*1;
            for(x in roomTiles[y]) {
                x = x*1;

                // Bierze pod uwage 5 pól 3x3 bez naroznikow (+) i sprawdza czy nie wystepuje w nich wzorzec zetkniecia komnat
                if (x < (roomTiles[0].length-2) && y < (roomTiles.length-2)) {

                    if ((                         roomTiles[y][x+1]   == 1 &&
                        roomTiles[y+1][x] == 0 && roomTiles[y+1][x+1] == 0 && roomTiles[y+1][x+2] == 0 &&
                                                  roomTiles[y+2][x+1] == 1)
                        //   X
                        // 0 0 0
                        //   X

                        ||
                        (                         roomTiles[y][x+1]   == 0 &&
                        roomTiles[y+1][x] == 1 && roomTiles[y+1][x+1] == 0 && roomTiles[y+1][x+2] == 1 &&
                                                  roomTiles[y+2][x+1] == 0)) {
                        //   0
                        // X 0 X
                        //   0

                        switch(ROS.tools.dice(12)) {
                            case 1:
                                roomTiles[y+1][x+1] = 1;
                                doorsCandidates[y+1][x+1] = 2; // Kandydat na sekretne przejscie
                            break;
                            case 2:
                            case 3:
                            case 4:
                                roomTiles[y+1][x+1] = 1;
                            break;
                        }
                    }
                }
            }
        }
    }

       // Z wybranych kandydatów na drzwi
    // Wybiera fragmenty przechodnie czyli nie bierze pod uwage zakończeń korytarzy
    function addDoors() {
        var x,y;
        var test;

        // Przelatuje po wszystkich korytarzach
        for(y in doorsCandidates) {
            y = y*1;
            for(x in doorsCandidates[y]) {
                x = x*1;
                if (doorsCandidates[y][x] !== 0) {
                    test = 0;
                    // sprawdza czy drzwi znajdują sie w korytarzy pionowym czy poziomym
                    if (y > 0) {
                        if (roomTiles[y-1][x] == 0 && doorsCandidates[y-1][x] == 0) { test += 3; }
                    } else {
                        test += 3;
                    }
                    if (y < (roomTiles.length-1)) {
                        if (roomTiles[y+1][x] == 0 && doorsCandidates[y+1][x] == 0) { test += 4; }
                    } else {
                        test += 4;
                    }
                    if (x > 0) {
                        if (roomTiles[y][x-1] == 0 && doorsCandidates[y][x-1] == 0) { test += 15; }
                    } else {
                        test += 15;
                    }
                    if (x < (roomTiles[0].length-1)) {
                        if (roomTiles[y][x+1] == 0 && doorsCandidates[y][x+1] == 0) { test += 31; }
                    } else {
                        test += 31;
                    }

                    // oznacza
                    if (test == 7 || test == 46) {

                        // Normalne drzwi
                        if (doorsCandidates[y][x] == 1) {
                            // 50% szansy na drzwi w korytarzu
                            //if ( ROS.tools.dice(2) == 1 ) {
                                if (test == 7) {
                                    // korytarz poziomy
                                    doorsCandidates[y][x] = 31;
                                    // pola sąsiadujące z drzwiami oznacza jako niekandydujące aby dwie pary drzwi nie pojawily sie obok siebie
                                    doorsCandidates[y][x-1] = 0;
                                    doorsCandidates[y][x+1] = 0;
                                } else {
                                    // korytarz pionowy
                                    doorsCandidates[y][x] = 32;
                                    // pola sąsiadujące z drzwiami oznacza jako niekandydujące aby dwie pary drzwi nie pojawily sie obok siebie
                                    doorsCandidates[y-1][x] = 0;
                                    doorsCandidates[y+1][x] = 0;
                                }
                            //}
                        }

                        // Sekretne przejscia
                        if (doorsCandidates[y][x] == 2) {
                            // 50% szansy na sekretne przejscie
                            if ( ROS.tools.dice(2) == 1 ) {
                                if (test == 7) {
                                    // korytarz poziomy
                                    doorsCandidates[y][x] = 41;
                                } else {
                                    // korytarz pionowy
                                    doorsCandidates[y][x] = 42;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // Rozsypuje po mapie pomieszczenia
    function addRooms(number,maxRoomSize) {
        var lp,psx,psy, lpx,lpy, startx,starty;
        for(lp = 0; lp < number; lp++) {
            // losuj rozmiar pokoju (3x3 - 5x5)
            psx = ROS.tools.dice(maxRoomSize);
            psy = ROS.tools.dice(maxRoomSize);
            // losuj pozycje pomieszczenia
            startx = ROS.tools.dice(mapX-psx-1); // calkowity wymiar podziemi minus wymiar pokoju zeby wszedł na mapę
            starty = ROS.tools.dice(mapY-psy-1);
            // wstaw pomieszczenie na mapę
            for(lpy = 0; lpy < psy; lpy++) {
                for(lpx = 0; lpx < psx; lpx++) {
                    roomTiles[starty+lpy][startx+lpx] = 1;
                }
            }
        }
    }

    // Przpisuje tablice na większe zagęszczenie. Kazde pole zamienia na 4 pola (2x2)
    function rewriteResolution() {
        var x,y,id;
        var doorObj = null;

        for(y in roomTiles) {
            y = y*1;
            for(x in roomTiles[y]) {
                x = x*1;
                if (roomTiles[y][x] == 1) {

                    // Losuje posadzke z dozwolonych w tym themeie
                    id = mapThemes[ROS.dungeon.activeTheme].floors[(ROS.tools.dice(mapThemes[ROS.dungeon.activeTheme].floors.length)-1)];

                    ROS.dungeon.tileMap[y*2+1][x*2+1] = id;
                    ROS.dungeon.tileMap[y*2+1][x*2+2] = id;
                    ROS.dungeon.tileMap[y*2+2][x*2+1] = id;
                    ROS.dungeon.tileMap[y*2+2][x*2+2] = id;

                    // Pozycje startową przepisuje na nową rozdzielczosc
                    // Jest to lewe gorne pole czteropolowej przetrzeni startowej
                    if (x == startTile.x && y == startTile.y) {
                        startTile = []; // zmienia typ zmiennej z obiektu na tablice
                        startTile.push({'x':x*2+1,'y':y*2+1});
                        startTile.push({'x':x*2+2,'y':y*2+1});
                        startTile.push({'x':x*2+1,'y':y*2+2});
                        startTile.push({'x':x*2+2,'y':y*2+2});
                    }

                    doorObj = 0;
                    switch(doorsCandidates[y][x]) {
                        // Normalne
                        case 31: doorObj = new ROS.Door('wooden_door',0,x*2+1,y*2+1); break;
                        case 32: doorObj = new ROS.Door('wooden_door',90,x*2+1,y*2+1); break;
                        // Sekretne
                        case 41: doorObj = new ROS.Door('spider_web',0,x*2+1,y*2+1); break;
                        case 42: doorObj = new ROS.Door('spider_web',90,x*2+1,y*2+1); break;                    
                    }

                    ROS.dungeon.tileDoors[y*2+1][x*2+1] = doorObj;
                    ROS.dungeon.tileDoors[y*2+1][x*2+2] = doorObj;
                    ROS.dungeon.tileDoors[y*2+2][x*2+1] = doorObj;
                    ROS.dungeon.tileDoors[y*2+2][x*2+2] = doorObj;
                    doorObj = null;
                }
            }
        }
    }

    // Dodaje ściany po zmianie rozdzielczosci
    function addBorders() {
        var x,y,walls;
        for(y in ROS.dungeon.tileMap) {
            y = y*1;
            for(x in ROS.dungeon.tileMap[y]) {
                x = x*1;

                walls = mapThemes[ROS.dungeon.activeTheme].walls[(ROS.tools.dice(mapThemes[ROS.dungeon.activeTheme].walls.length)-1)];
                // Bierze pod uwage 4 pole 2x2 i sprawdza czy nie wystepuje w nich krawędź sekcji
                // Przy sprawdzaniu pomija ostatni rząd i kolumne
                // ponieważ są one sprawdzane przy testach przed-ostatniego rzędu i kolumny
                if (x < (ROS.dungeon.tileMap[0].length-1) && y < (ROS.dungeon.tileMap.length-1)) {

                    if (ROS.dungeon.tileMap[y][x]   != 0 && ROS.dungeon.tileMap[y][x+1]   == 0 &&
                        ROS.dungeon.tileMap[y+1][x] == 0 && ROS.dungeon.tileMap[y+1][x+1] == 0) {
                        // X 0
                        // 0 0
                        //na
                        // X B
                        // B B
                        ROS.dungeon.tileStuff[y][x+1] = walls;
                        ROS.dungeon.tileStuff[y+1][x] = walls;
                        ROS.dungeon.tileStuff[y+1][x+1] = walls;
                    } else if (ROS.dungeon.tileMap[y][x]   == 0 && ROS.dungeon.tileMap[y][x+1]   != 0 &&
                               ROS.dungeon.tileMap[y+1][x] == 0 && ROS.dungeon.tileMap[y+1][x+1] == 0) {
                        // 0 X
                        // 0 0
                        //na
                        // B X
                        // B B
                        ROS.dungeon.tileStuff[y][x] = walls;
                        ROS.dungeon.tileStuff[y+1][x] = walls;
                        ROS.dungeon.tileStuff[y+1][x+1] = walls;
                    } else if (ROS.dungeon.tileMap[y][x]   == 0 && ROS.dungeon.tileMap[y][x+1]   == 0 &&
                               ROS.dungeon.tileMap[y+1][x] == 0 && ROS.dungeon.tileMap[y+1][x+1] != 0) {
                        // 0 0
                        // 0 X
                        //na
                        // B B
                        // B X
                        ROS.dungeon.tileStuff[y][x] = walls;
                        ROS.dungeon.tileStuff[y][x+1] = walls;
                        ROS.dungeon.tileStuff[y+1][x] = walls;
                    } else if (ROS.dungeon.tileMap[y][x]   == 0 && ROS.dungeon.tileMap[y][x+1]   == 0 &&
                               ROS.dungeon.tileMap[y+1][x] != 0 && ROS.dungeon.tileMap[y+1][x+1] == 0) {
                        // 0 0
                        // X 0
                        //na
                        // B B
                        // X B
                        ROS.dungeon.tileStuff[y][x] = walls;
                        ROS.dungeon.tileStuff[y][x+1] = walls;
                        ROS.dungeon.tileStuff[y+1][x+1] = walls;



                    } else if (ROS.dungeon.tileMap[y][x]   != 0 && ROS.dungeon.tileMap[y][x+1]   != 0 &&
                               ROS.dungeon.tileMap[y+1][x] == 0 && ROS.dungeon.tileMap[y+1][x+1] == 0) {
                        // X X
                        // 0 0
                        //na
                        // X X
                        // B B
                        ROS.dungeon.tileStuff[y+1][x] = walls;
                        ROS.dungeon.tileStuff[y+1][x+1] = walls;
                    } else if (ROS.dungeon.tileMap[y][x]   != 0 && ROS.dungeon.tileMap[y][x+1]   == 0 &&
                               ROS.dungeon.tileMap[y+1][x] != 0 && ROS.dungeon.tileMap[y+1][x+1] == 0) {
                        // X 0
                        // X 0
                        //na
                        // X B
                        // X B
                        ROS.dungeon.tileStuff[y][x+1] = walls;
                        ROS.dungeon.tileStuff[y+1][x+1] = walls;
                    } else if (ROS.dungeon.tileMap[y][x]   == 0 && ROS.dungeon.tileMap[y][x+1]   != 0 &&
                               ROS.dungeon.tileMap[y+1][x] == 0 && ROS.dungeon.tileMap[y+1][x+1] != 0) {
                        // 0 X
                        // 0 X
                        //na
                        // B X
                        // B X
                        ROS.dungeon.tileStuff[y][x] = walls;
                        ROS.dungeon.tileStuff[y+1][x] = walls;
                    } else if (ROS.dungeon.tileMap[y][x]   == 0 && ROS.dungeon.tileMap[y][x+1]   == 0 &&
                               ROS.dungeon.tileMap[y+1][x] != 0 && ROS.dungeon.tileMap[y+1][x+1] != 0) {
                        // 0 0
                        // X X
                        //na
                        // B B
                        // X X
                        ROS.dungeon.tileStuff[y][x] = walls;
                        ROS.dungeon.tileStuff[y][x+1] = walls;




                    } else if (ROS.dungeon.tileMap[y][x]   != 0 && ROS.dungeon.tileMap[y][x+1]   != 0 &&
                               ROS.dungeon.tileMap[y+1][x] == 0 && ROS.dungeon.tileMap[y+1][x+1] != 0) {
                        // X X
                        // 0 X
                        //na
                        // X X
                        // B X
                        ROS.dungeon.tileStuff[y+1][x] = walls;
                    } else if (ROS.dungeon.tileMap[y][x]   != 0 && ROS.dungeon.tileMap[y][x+1]   != 0 &&
                               ROS.dungeon.tileMap[y+1][x] != 0 && ROS.dungeon.tileMap[y+1][x+1] == 0) {
                        // X X
                        // X 0
                        //na
                        // X X
                        // X B
                        ROS.dungeon.tileStuff[y+1][x+1] = walls;
                    } else if (ROS.dungeon.tileMap[y][x]   == 0 && ROS.dungeon.tileMap[y][x+1]   != 0 &&
                               ROS.dungeon.tileMap[y+1][x] != 0 && ROS.dungeon.tileMap[y+1][x+1] != 0) {
                        // 0 X
                        // X X
                        //na
                        // B X
                        // X X
                        ROS.dungeon.tileStuff[y][x] = walls;
                    } else if (ROS.dungeon.tileMap[y][x]   != 0 && ROS.dungeon.tileMap[y][x+1]   == 0 &&
                               ROS.dungeon.tileMap[y+1][x] != 0 && ROS.dungeon.tileMap[y+1][x+1] != 0) {
                        // X 0
                        // X X
                        //na
                        // X B
                        // X X
                        ROS.dungeon.tileStuff[y][x+1] = walls;
                    }
                }
            }
        }
    }



    function addLOSBlockers() {
        var x,y;
        for(y in ROS.dungeon.tileStuff) {
            y = y*1;
            for(x in ROS.dungeon.tileStuff[y]) {
                x = x*1;
                ROS.dungeon.gridLos[y][x] = ROS.dungeon.getSegment('stuff',ROS.dungeon.tileStuff[y][x],'blockLOS'); 
            }
        }
    }


    // dodaje rzeke lawy,wody,kwasu
    function addLiquid(v,type,maxsize) {
        var x,y,px,py,t,r,proc,quantity,test;

        var STL = startTile.length;        
        var STLi = 0;
        
        quantity = v;
        for(t = 1; t <= quantity; t++) {

            r = 2+ROS.tools.dice(maxsize);

            px = ROS.tools.dice(ROS.base.gameSize[0]-r)-1;
            py = ROS.tools.dice(ROS.base.gameSize[1]-r)-1;

            for(y in ROS.dungeon.tileMap) {
                y = y*1;
                for(x in ROS.dungeon.tileMap[y]) {
                    x = x*1;
                    // Jeśli posadzka jest kamienna to na 80% w wybranej przestrzeni jeziorka pojawi sie wskazany typ płynu
                    if (ROS.dungeon.tileMap[y][x] !== 0 && 
                        ROS.tools.dice(100) <= 80 &&
                        x >= px && x <= px+r && 
                        y >= py && y <= py+r) {
                        // nie wypełniam narożników aby wylosowana przestrzeń nie była taka kwadratowa
                        if (!(x == px   && y == py) &&
                            !(x == px+r && y == py) &&
                            !(x == px   && y == py+r) &&
                            !(x == px+r && y == py+r)) {
                                // sprawdza czy pole nie jest polem startowym
                                if (!testStartPosition(x,y)) {
                                   ROS.dungeon.tileMap[y][x] = type;                                
                                }
                        }
                    }
                }
            }
        }
    }


    // sprawdza czy podane wspolzedne leza na chociaz jednym z pól startowych
    function testStartPosition(x,y) {
        var STL = startTile.length;        
        var STLi = 0;
        var test = false;
        for(STLi=0; STLi<STL; STLi++) {
            if (startTile[STLi].x == x && 
                startTile[STLi].y == y) {                
                test = true;
            }
        }
        return test;
    }

    // Funkcja umieszcza w gotowym podziemiu kontenery ze skarbami
    function createContainers(min,max) {
        var x,y,p;

        var cont_number = min + ROS.tools.dice(max-min);

        // Wyznacza miejsca dla skrzyn
        // Miejsca określa w oparciu o tablice tileMap ktora zawiera posadzki
        // Losuje z pól o okreslonych rodzajach posadzek
        var candidates = [];
        for(y = 0; y < ROS.base.gameSize[1]; y++) {
            for(x = 0; x < ROS.base.gameSize[0]; x++) {
                if (ROS.dungeon.tileMap[y][x] && // jeśli pole jest wnetrzem pomieszczenia
                    ROS.dungeon.getSegment('map',ROS.dungeon.tileMap[y][x],'transitions') === 1 && // jeśli na pole wolno wejsc
                    ROS.dungeon.getSegment('map',ROS.dungeon.tileMap[y][x],'danger') === 0 &&      // jeśli pole nie zadaje obrażeń                    
                    !ROS.dungeon.tileStuff[y][x] && // jeśli na polu nie ma już czegoś
                    !ROS.dungeon.tileDoors[y][x] && // jeśli pole nie leży w styku z drzwiami
                    !testStartPosition(x,y)) { // pole nie moze byc polem startowym                        
                        candidates.push(x+'-'+y);
                }
            }
        }

        //ROS.tools.console('info',candidates.length);

        // Losuje z kandydatów tylu ile bedzie skrzyń
        var winners = [];
        for (x=0; x<cont_number; x++) {
            p = ROS.tools.dice(candidates.length)-1;
            winners.push( candidates[p].toString() ); // zwracam i wstawiam do winners wylosowaną pozycje
            candidates.splice(p,1); // usuwam wylosowaną pozycje z candidates aby w kolejnym obiegu petli juz jej nie bylo
        }

        
        // okresla ilosc wszystkich rodzajow przedmiotów w grze
        var itemsQuantity=0;
        for(x in ROS.items) {itemsQuantity++;}

        var containersType = [];
        for(x in ROS.containers) {
            if (ROS.containers[x].autoadd) {
                containersType.push(x);
            }
        }

        // we wszystkich zwycieskich lokalizacjach tworzy skrzynie i wypełnia je przedmiotami
        var itemNr,nit,xy,cap,nct,i,itemCount;
        for (x in winners) {
            xy = winners[x].split("-");

            // Ważne zamiana stringów na liczby
            xy[0] = parseInt(xy[0],10);
            xy[1] = parseInt(xy[1],10);

            // tworzy kontenery
            // losuje rodzaj kontenera (skrzynia, beczka itp)
            nct = (ROS.tools.dice(containersType.length)-1);
            ROS.dungeon.gridContainers[xy[1]][xy[0]] = new ROS.Container(containersType[nct],xy[0],xy[1]);

            // z okresleniem rarity 1-20
            var itemCount = ROS.dungeon.gridContainers[xy[1]][xy[0]].addItems(ROS.tools.dice(20)); 
            
            // jesli kontenerowi nie zostały przydzielone przedmioty (czyli jest pusty)
            // i jednoczesnie jest to kontener ktory nie moze byc pusty to go usuwa
            if (itemCount == 0 && !ROS.dungeon.gridContainers[xy[1]][xy[0]].container.empty) {
                ROS.dungeon.gridContainers[xy[1]][xy[0]].destroy();
            }           
        }
    }

    





    return {
        tileMap: [],
        tileStuff: [],
        tileDoors: [], // tablica dla pól zawierajacych drzwi przechowuje odpowiednie cyferki 1-4 dla pionowych zamknietych 5-8 dla poziomych zamknietych oraz odpowiednio 51-54 dla otwartych i 55-58 poziomych otwartych, reszta to zera

        tileAccess: [], // każde pole ma numer : 0 - nie wolno wejsc i nie mozna ominąć po skosie / 1 - wolno wejsc / 2 - nie wolno wejsc ale mozna ominąć po skosie (do algorytmu ASTAR)
        tileAccessNoMonsters: [], // każde pole ma numer : 0 - nie wolno wejsc i nie mozna ominąć po skosie / 1 - wolno wejsc / 2 - nie wolno wejsc ale mozna ominąć po skosie TABLICA NIE UWZGLĘDNIA POZYCJI POTWORÓW I GRACZY

        // tabela zawiera relacje pomiedzy sąsiadującymi tilami 
        // np: czy wolno przejsc z jednego na drugi (oba tily moga byc przechodnie ale to nie znaczy ze mozna przejsc z jednego na drugi :)
        gridRelationship: [], // przechowuje string (8 pól) 0:nie ogranicza | 1:ogranicza widocznosc | 2:ogranicza przechodzenie | 3:ogranicza oba
        

        gridLos: [], // przechowuje inforacje o polach które ograniczają linie wzroku (0 - nie ogranicza / 1 - ogranicza i nie jest widoczne)
        gridVisible: [], // przechowuje informacje o tym ktore tile są widoczne dla graczy w danej chwili, tablice wypełnia algorytm LOS
        gridFogOfWar: [], // przechowuje informacje o polach ktore juz były widziane. Takie pola zawsze juz sa widoczne. Tak jak w grach strategicznych.

        gridMiniMap:[], // pola oznaczone 1 sa widoczne na mini mapie, 0 nie

        gridNpcs: [], // przechowuje referencje do obiektów potworów w komórkach w których się znajdują
        gridHeroes: [], // przechowuje referencje do obiektów graczy w komórkach w których się znajdują

        gridContainers: [], // przechowuje referencje do obiektów zawierających przedmioty: skrzynie, paki, wory, beczki itp

        activeTheme: 0, // wybrany Theme dla podziemi


        // Funkcja zeruje pola wszystkich tabelek
        prepareClearMap: function() {
            var x,y;

            ROS.dungeon.tileMap = [];
            ROS.dungeon.tileStuff = [];
            ROS.dungeon.tileDoors = [];

            ROS.dungeon.tileAccess = [];
            ROS.dungeon.tileAccessNoMonsters = [];

            ROS.dungeon.gridRelationship = [];

            ROS.dungeon.gridLos = [];
            ROS.dungeon.gridVisible = [];
            ROS.dungeon.gridFogOfWar = [];

            ROS.dungeon.gridMiniMap = [];

            ROS.dungeon.gridNpcs = [];
            ROS.dungeon.gridHeroes = [];
            ROS.dungeon.gridContainers = [];

            // wypełniam całą przestrzeń zerami
            for(y=0; y<ROS.base.gameSize[1]; y++) {
                ROS.dungeon.tileMap[y] = [];
                ROS.dungeon.tileStuff[y] = [];
                ROS.dungeon.tileDoors[y] = [];

                ROS.dungeon.tileAccess[y] = [];
                ROS.dungeon.tileAccessNoMonsters[y] = [];
                
                ROS.dungeon.gridRelationship[y] = [];

                ROS.dungeon.gridLos[y] = [];
                ROS.dungeon.gridVisible[y] = [];
                ROS.dungeon.gridFogOfWar[y] = [];

                ROS.dungeon.gridMiniMap[y] = [];

                ROS.dungeon.gridNpcs[y] = [];
                ROS.dungeon.gridHeroes[y] = [];
                ROS.dungeon.gridContainers[y] = [];

                for(x=0; x<ROS.base.gameSize[0]; x++) {
                    ROS.dungeon.tileMap[y][x] = 0;
                    ROS.dungeon.tileStuff[y][x] = 0;
                    ROS.dungeon.tileDoors[y][x] = 0;

                    ROS.dungeon.tileAccess[y][x] = 0;
                    ROS.dungeon.tileAccessNoMonsters[y][x] = 0;
                    
                    ROS.dungeon.gridRelationship[y][x] = '00000000';

                    ROS.dungeon.gridLos[y][x] = 0;
                    ROS.dungeon.gridVisible[y][x] = 0;
                    ROS.dungeon.gridFogOfWar[y][x] = 0;

                    ROS.dungeon.gridMiniMap[y][x] = 0;

                    ROS.dungeon.gridNpcs[y][x] = 0;
                    ROS.dungeon.gridHeroes[y][x] = 0;
                    ROS.dungeon.gridContainers[y][x] = 0;
                }
            }
        },

        // Zwraca informacje o segmencie
        getSegment: function(type,name,attribute) {            
            if (attribute === 'file') {
                if (name === 0) {
                    return 'gfx/blank.gif';
                } else {
                    return gfxFolder + type + '/' + Segments[type][name].file;
                }
            } else {
                if (name === 0) {
                    return false;
                } else {
                    return Segments[type][name][attribute];
                }
            }            
        },


        // Tworzy Tablice pól które widać i takich których nie ma być widać w oparciu o wynik algorytmu linii wzroku przechowywany przez kazdego gracza w jego wlasnej tablicy ROS.gridVisible
        createLos: function(refreshHeroLos) {
            var p,x,y;
            var disp,opac,dispM,opacM;

            if (refreshHeroLos) {
                for(p in ROS.base.heroes) {
                    ROS.base.heroes[p].refreshLOS();
                }
            }
                        
            // dla każdego gracza określa co widzi i łączy zakresy widzenia w globalnej tablicy
            for(y=0; y<ROS.base.gameSize[1]; y++) {
                for(x=0; x<ROS.base.gameSize[0]; x++) {
                    // Do testu bierze tylko komórki na których znajdują się podziemia lub sciany
                    if (ROS.dungeon.tileMap[y][x] !== 0 || ROS.dungeon.tileStuff[y][x] !== 0) {
                        ROS.dungeon.gridVisible[y][x] = 0; // czysci komórke

                        // od każdego gracza sprawdza czy widzi sprawdzane pole, jeśli chociaż jeden je widzi to zaznacza ze jest widoczne
                        // pole jest widoczne w skali najlepszej widocznosci czyli jesli jeden gracz widzi to pole na 0.4 a drugi widzi to pole na 0.7
                        // to pierwszeństwo ma gracz widzący na 0.7
                        for(p in ROS.base.heroes) {
                            // bierze pod uwage tylko graczy przytomnych
                            if (!ROS.base.heroes[p].unconscious) {
                                if (ROS.dungeon.gridVisible[y][x] < ROS.base.heroes[p].gridVisible[y][x]) {
                                    ROS.dungeon.gridVisible[y][x] = ROS.base.heroes[p].gridVisible[y][x];
                                }
                            }
                        }

                        switch(ROS.dungeon.gridVisible[y][x]) {
                            case 0:
                                if (ROS.dungeon.gridFogOfWar[y][x] === 0) {
                                    dispM = disp = 'none';
                                    opacM = opac = 1;
                                } else {
                                    disp = 'block';
                                    opac = .3;
                                    // Potworów nie widac w FOW
                                    dispM = 'none';
                                    opacM = 1;
                                }
                            break; // PELNE UKRYCIE (pełna widoczność i wyłączam)
                            case 1: dispM = disp = 'block'; opacM = opac = .5; break;
                            case 2: dispM = disp = 'block'; opacM = opac = .7; break;
                            case 3: dispM = disp = 'block'; opacM = opac = 1; break; // PEŁNA WIDOCZNOŚĆ
                        }


                        
                        if (ROS.dungeon.tileMap[y][x] !== 0) {
                            ROS.base.preloadImages['map'+x+'-'+y].style.display = disp;
                            ROS.base.preloadImages['map'+x+'-'+y].style.opacity = opac;
                        }
                        if (ROS.dungeon.tileStuff[y][x] !== 0) {
                            ROS.base.preloadImages['stuff'+x+'-'+y].style.display = disp;
                            ROS.base.preloadImages['stuff'+x+'-'+y].style.opacity = opac;
                        }
                        if (ROS.dungeon.tileDoors[y][x] instanceof ROS.Door) {
                            ROS.dungeon.tileDoors[y][x].setVisibility(x,y,disp,opac);
                        }
                        if (ROS.dungeon.gridNpcs[y][x] !== 0) {
                            ROS.dungeon.gridNpcs[y][x].obj.style.display = dispM;
                            ROS.dungeon.gridNpcs[y][x].obj.style.opacity = opacM;
                        }
                        if (ROS.dungeon.gridContainers[y][x] instanceof ROS.Container) {
                            ROS.dungeon.gridContainers[y][x].obj.style.display = disp;
                            ROS.dungeon.gridContainers[y][x].obj.style.opacity = opac;
                        }
                    }
                }
            }
        },

        

        // Funkcja losuje i umieszcza NPC na mapie podczas tworzenia mapy
        createNPC: function(min,max,duringGameplay) {           
            var enemy_number = min + ROS.tools.dice(max-min);            
            var x,y,p,i,xy,eRandom,loop;
            

            var candidates = [];     
            for(y = 0; y < ROS.base.gameSize[1]; y++) {
                for(x = 0; x < ROS.base.gameSize[0]; x++) {
                    // jeśli na pole wolno wejsc i nie zadaje ono obrażeń to jest kandydatem na potwora (o ile coś już tam nie stoi)            
                    if (ROS.dungeon.tileMap[y][x] && // jeśli pole jest wnetrzem pomieszczenia
                        ROS.dungeon.getSegment("map",ROS.dungeon.tileMap[y][x],'transitions') === 1 && // jeśli na pole wolno wejsc
                        ROS.dungeon.getSegment("map",ROS.dungeon.tileMap[y][x],'danger') === 0 && // jeśli pole nie zadaje obrażeń             
                        !ROS.dungeon.tileStuff[y][x] && // jeśli na polu nie ma już czegoś
                        !ROS.dungeon.tileDoors[y][x] && // jeśli pole nie leży w styku z drzwiami  
                        !ROS.dungeon.gridContainers[y][x] && // Jeśli na polu nie stoi kontener            
                        !testStartPosition(x,y)) { // jesli pole nie jest polem startowym

                            // Jesli jest ustawiona zmienna duringGameplay to sprawdza dodatkowe cechy
                            // Ta opcja służy dodawaniu wrogów w trakcie rozgrywki dlatego musi sprawdzic czy:
                            // - jest to pole niewidoczne przez graczy (tylko na takich dodaje potworki)
                            // - na polu nie stoi już inny npc (może stać jakiś który był dodany wcześniej)
                            // - na polu nie ma bohatera (bohaterowie już są na mapie wiec trzeba na nich zwrocic uwage)
                            if (duringGameplay) {
                                if (ROS.dungeon.gridVisible[y][x] === 0 && 
                                    ROS.dungeon.gridNpcs[y][x] === 0 &&
                                    ROS.dungeon.gridHeroes[y][x] === 0) {
                                    candidates.push(x+'-'+y);    
                                }
                            } else {
                                candidates.push(x+'-'+y);
                            }
                    }
                }
            }
            
            if (candidates.length === 0) return;
                                
            var winners = [];
            for (x=0;x<enemy_number;x++) {
                // pozycja
                p = ROS.tools.dice(candidates.length)-1;
                winners.push( candidates[p].toString() ); // zwracam i wstawiam do winners wylosowaną pozycje 
                candidates.splice(p,1); // usuwam wylosowaną pozycje z candidates aby w kolejnym obiegu petli juz jej nie bylo
            }
            
            // okresla ilosc wszystkich rodzajow wrogów w grze
            var npcQuantity=0;
            for(x in ROS.npcs) {npcQuantity++;}

            var npc = null;
            for (x=0;x<winners.length;x++) {
                xy = winners[x].split("-");

                // Ważne zamiana stringów na liczby
                xy[0] = parseInt(xy[0],10);
                xy[1] = parseInt(xy[1],10);

                // losuje i tworzy jednostke wroga            
                eRandom = ROS.tools.dice(npcQuantity);
                loop = 1;
                for (i in ROS.npcs) {
                    if (loop == eRandom) {
                        npc = new ROS.Npc(i); // w konstruktorze wrzuca referencje do tablicy ROS.base.npcs
                        npc.setStartPosition(xy[0],xy[1]); // wrzuca referencje do ROS.dungeon.gridNpcs 
                        npc = null;                   
                        break;
                    }
                    loop++;
                }
            }        
        },



        createLayers: function() {
            var m = document.createElement("div");
            m.id = 'Layer_Dungeon';
            m.style.position = 'absolute';
            m.style.zIndex = 10;
            m.style.left = 0+'px';
            m.style.top = 0+'px';
            m.style.width = (ROS.base.gameSize[0] * ROS.base.tileWidth)+'px';
            m.style.height = (ROS.base.gameSize[1] * ROS.base.tileHeight)+'px';
            ROS.map.area.appendChild(m);
            
            var s = document.createElement("div");
            s.id = 'Layer_Stuff';
            s.style.position = 'absolute';
            s.style.zIndex = 12;
            s.style.left = 0+'px';
            s.style.top = 0+'px';
            s.style.width = (ROS.base.gameSize[0] * ROS.base.tileWidth)+'px';
            s.style.height = (ROS.base.gameSize[1] * ROS.base.tileHeight)+'px';
            ROS.map.area.appendChild(s);

            var p = document.createElement("div");
            p.id = 'Layer_Path';
            p.style.position = 'absolute';
            p.style.zIndex = 17;
            p.style.left = 0+'px';
            p.style.top = 0+'px';
            p.style.width = (ROS.base.gameSize[0] * ROS.base.tileWidth)+'px';
            p.style.height = (ROS.base.gameSize[1] * ROS.base.tileHeight)+'px';
            p.style.pointerEvents = 'none';
            ROS.map.area.appendChild(p);            
            ROS.map.pathLayer = p;
            p = null;
            
            var bs = null;
            var ro = null;
            for(y = 0; y < ROS.base.gameSize[1]; y++) {
                for(x = 0; x < ROS.base.gameSize[0]; x++) {
                    if (ROS.dungeon.tileMap[y][x] !== 0) {
                        ROS.base.preloadImages['map'+x+'-'+y] = ROS.tools.addImage(m, ROS.dungeon.getSegment("map",ROS.dungeon.tileMap[y][x],'file'), x * ROS.base.tileWidth, y * ROS.base.tileHeight, ROS.base.tileWidth, ROS.base.tileHeight, 'map'+x+'-'+y);
                        ROS.base.preloadImages['map'+x+'-'+y].style.display = 'none';                                                

                        bs = ROS.dungeon.getSegment("map",ROS.dungeon.tileMap[y][x],'shadow'); 
                        if (bs) {
                            ROS.base.preloadImages['map'+x+'-'+y].style.mozBoxShadow = bs;
                            ROS.base.preloadImages['map'+x+'-'+y].style.webkitBoxShadow = bs;
                            ROS.base.preloadImages['map'+x+'-'+y].style.boxShadow = bs;
                            ROS.base.preloadImages['map'+x+'-'+y].style.zIndex = '+1';
                        }

                        ro = ROS.dungeon.getSegment("map",ROS.dungeon.tileMap[y][x],'rotation'); 
                        if (ro) {
                            switch(ro) {
                                case 2:                                     
                                    ro = ROS.tools.dice(2);
                                    if (ro === 1) {
                                        ro = 0;
                                    } else {
                                        ro = 180;
                                    }
                                break;
                                case 4: ro = (ROS.tools.dice(4)*90); break;
                                case 360: ro = ROS.tools.dice(360); break;
                            }
                            ROS.tools.rotate(ROS.base.preloadImages['map'+x+'-'+y],ro);                            
                        }

                    }
                    if (ROS.dungeon.tileStuff[y][x] != 0) {
                        ROS.base.preloadImages['stuff'+x+'-'+y] = ROS.tools.addImage(s, ROS.dungeon.getSegment("stuff",ROS.dungeon.tileStuff[y][x],'file'), x * ROS.base.tileWidth, y * ROS.base.tileHeight, ROS.base.tileWidth, ROS.base.tileHeight, 'stuff'+x+'-'+y);
                        ROS.base.preloadImages['stuff'+x+'-'+y].style.display = 'none';
                        
                        ro = ROS.dungeon.getSegment("stuff",ROS.dungeon.tileStuff[y][x],'rotation'); 
                        if (ro) {
                            switch(ro) {
                                case 2:                                     
                                    ro = ROS.tools.dice(2);
                                    if (ro === 1) {
                                        ro = 0;
                                    } else {
                                        ro = 180;
                                    }
                                break;
                                case 4: ro = (ROS.tools.dice(4)*90); break;
                                case 360: ro = ROS.tools.dice(360); break;
                            }
                            ROS.tools.rotate(ROS.base.preloadImages['stuff'+x+'-'+y],ro);                            
                        }
                    }
                }
            }

            m = null;
            s = null;
        },

        // Odświeża tablice z oznakowanymi polami na ktore wolno wejść
        setAccessTable: function() {
            var x,y,p,len;

            for(y = 0; y < ROS.base.gameSize[1]; y++) {
                for(x = 0; x < ROS.base.gameSize[0]; x++) {
                    ROS.dungeon.tileAccess[y][x] = 0;

                    if (ROS.dungeon.tileMap[y][x] !== 0) {
                        ROS.dungeon.tileAccess[y][x] = ROS.dungeon.getSegment("map",ROS.dungeon.tileMap[y][x],'transitions');
                        ROS.dungeon.tileAccessNoMonsters[y][x] = ROS.dungeon.getSegment("map",ROS.dungeon.tileMap[y][x],'transitions');
                    }
                    if (ROS.dungeon.tileStuff[y][x] !== 0) {
                        ROS.dungeon.tileAccess[y][x] = ROS.dungeon.getSegment("stuff",ROS.dungeon.tileStuff[y][x],'transitions');
                        ROS.dungeon.tileAccessNoMonsters[y][x] = ROS.dungeon.getSegment("stuff",ROS.dungeon.tileStuff[y][x],'transitions');
                    }
                    if (ROS.dungeon.gridNpcs[y][x] !== 0) {
                        ROS.dungeon.tileAccess[y][x] = 2; // nie wolno wejsc na pole zajete przez potwora ale wolno go ominac
                    }
                    if (ROS.dungeon.gridHeroes[y][x] !== 0) {
                        ROS.dungeon.tileAccess[y][x] = 2; // nie wolno wejsc na pole zajete przez gracza ale wolno go ominac
                    }
                }
            }
        },

        generateMap: function(size) {
            var tx,ty,rooms,maxRoomSize,lavaPools,waterPools,min_containers,max_containers,min_npc,max_npc;

            
            switch(size) {
                case 1: // 10-15
                    mapX = 9+ROS.tools.dice(5);
                    mapY = 9+ROS.tools.dice(5);
                    rooms = 4;
                    maxRoomSize = 3;
                    lavaPools = 3;
                    waterPools = 3;
                    min_containers = 6;
                    max_containers = 10;
                    min_npc = 15; // 7
                    max_npc = 20; // 12
                break;
                case 2: // 15-25
                    mapX = 14+ROS.tools.dice(10);
                    mapY = 14+ROS.tools.dice(10);
                    rooms = 6;
                    maxRoomSize = 4;
                    lavaPools = 4;
                    waterPools = 4;
                    min_containers = 10;
                    max_containers = 15;
                    min_npc = 20; // 12
                    max_npc = 30; // 20
                break;                
            }

            // clear
            roomTiles = [];
            roomTilesSections = [];
            doorsCandidates = [];

            // pierwszy posiew
            for(ty = 0; ty < mapY; ty++) {
                roomTiles[ty] = [];
                roomTilesSections[ty] = [];
                doorsCandidates[ty] = [];
                //ROS.tools.console('log',ty);
                for(tx = 0; tx < mapX; tx++) {
                    roomTiles[ty][tx] = (ROS.tools.dice(2)-1); // 0/1
                    roomTilesSections[ty][tx] = 0;
                    doorsCandidates[ty][tx] = 0;
                }
            }

            // Stworzenie i zerowanie tablic o podwójnej rozdzielczości
            ROS.dungeon.prepareClearMap();

            // rozrzucenie dodatkowych przetrzeni-pomieszczeń
            addRooms(rooms,maxRoomSize);

            // podziel mapę na niepowiązane sekcje i połącz je korytarzami
            groupSections();

            // łączy pomieszczenia oddzielone jedną scianką
            joinNearRooms();

            // wstaw drzwi do korytarzy
            addDoors();

            // ustal pole startowe
            setStartTile();

            // przepisuje na tablce o podwójnym zagęszczeniu
            rewriteResolution();

            // dodaje ściany
            addBorders();

            // dodaje płyny  (ALBO KWAS ALBO LAWA) I WODA ZAWSZE
            var liq;
            for(liq in mapThemes[ROS.dungeon.activeTheme].liquids) {
                addLiquid(lavaPools,mapThemes[ROS.dungeon.activeTheme].liquids[liq],8);
            }
            
            // Dodaje beczki skrzynie i skarby
            createContainers(min_containers,max_containers);

            // Dodaje jednostki wrogów (MUSI BYĆ PO createContainers)
            ROS.dungeon.createNPC(min_npc,max_npc,false);

            // tworzy tablice pól ograniczających widocznosc na podstawie tablicy stuff
            addLOSBlockers();

            // Tworze graficzą interpretacje podziemia
            ROS.dungeon.createLayers();

            ROS.map.area.style.background = 'url('+mapThemes[ROS.dungeon.activeTheme].bg+')';
        },

        putHeroesIntoDungeon: function() {
            var x,y;
            var ile = (arguments.length > 4 ? 4 : arguments.length);
            for (var i = 0; i < ile; i++) {
                x = startTile[i].x;
                y = startTile[i].y;
                if (arguments[i] instanceof ROS.Hero) {
                    arguments[i].setStartPosition(x,y);

                    // Usatwenie położenia kół ze statystykami w HUD
                    switch(i) {
                        case 0: 
                            arguments[i].bulb.style.left = 100+'px'; 
                            arguments[i].choosenBulb.style.left = 83+'px'; 
                        break;
                        case 1: 
                            arguments[i].bulb.style.left = 205+'px'; 
                            arguments[i].choosenBulb.style.left = 188+'px'; 
                        break;
                        case 2: 
                            arguments[i].bulb.style.left = 311+'px'; 
                            arguments[i].choosenBulb.style.left = 294+'px'; 
                        break;
                        case 3: 
                            arguments[i].bulb.style.left = 416+'px'; 
                            arguments[i].choosenBulb.style.left = 399+'px'; 
                        break;
                    }

                    arguments[i] = null;
                } else {
                    ROS.dungeon.console('info','Argument nr:'+i+' nie jest obiektem bohatera !');
                }
            }            
            ROS.dungeon.createLos(false);
        },

        create: function() {
            // Ustalam rozmiar i wybiera theme
            ROS.dungeon.activeTheme = (ROS.tools.dice(mapThemes.length)-1);            
            ROS.dungeon.generateMap(ROS.tools.dice(2));
        }


        


    }

})();