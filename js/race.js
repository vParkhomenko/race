(function() {
    //  vars:
    var bolid = document.getElementById('bolid'),
        posBolidX = 0,
        posBolidY = bolid.style.bottom,
        points = 0,
        stage = 0,
        arrLine = null,
        arrCar = null,
        arrX = null,
        posX = 0,
        arrCol = null,
        col = 0,
        timerDraw = null,
        points = 0,
        stage = 0
    document.getElementById('points').innerHTML = 'Points: ' + points;

    // init the game resources
    initRace();

    // functions:
    function initRace() {
        initLine();
        initCar();

        // set handlers
        reset.addEventListener('click', resetRace, false);
        document.addEventListener('keydown', keyContol, false);
        start.addEventListener('click', startRace, false);
    }

    function initLine() {
        arrLine = [{
            el: null,
            lineY: 104
        }, {
            el: null,
            lineY: 208
        }, {
            el: null,
            lineY: 312
        }, {
            el: null,
            lineY: 416
        }, {
            el: null,
            lineY: 520
        }];

        for (var i = 0; i < arrLine.length; i++) {
            arrLine[i].el = document.createElement('div');
            arrLine[i].el.id = "line" + i;
            arrLine[i].el.className = "line";
            track.appendChild(arrLine[i].el);
        }
    }

    function initCar() {
        arrCar = [{
            el: null,
            posCarX: null,
            posCarY: 0,
            colCar: null
        }];
        arrX = ['0', '80', '160'];
        arrCol = ['img/car.png', 'img/car2.png', 'img/car3.png'];


        for (var i = 0; i < arrCar.length; i++) {
            posX = Math.floor(Math.random() * arrX.length);
            col = Math.floor(Math.random() * arrCol.length);



            arrCar[i].el = document.createElement('div');
            arrCar[i].el.id = "car" + i;
            arrCar[i].el.className = "car";
            track.appendChild(arrCar[i].el);

            arrCar[i].posCarX = arrX[posX];
            arrCar[i].el.style.left = arrCar[i].posCarX + 'px';

            arrCar[i].colCar = arrCol[col];
            arrCar[i].el.style.background = 'URL(' + arrCol[col] + ') center no-repeat';
        }
    }

    function draw() {
        showLine();
        showCar();
    }

    function showLine() {

        arrLine[0].lineY = Math.floor(arrLine[0].lineY + stage + 3);
        arrLine[0].el.style.top = arrLine[0].lineY + 'px';

        arrLine[1].lineY = Math.floor(arrLine[1].lineY + stage + 3);
        arrLine[1].el.style.top = arrLine[1].lineY + 'px';

        arrLine[2].lineY = Math.floor(arrLine[2].lineY + stage + 3);
        arrLine[2].el.style.top = arrLine[2].lineY + 'px';

        arrLine[3].lineY = Math.floor(arrLine[3].lineY + stage + 3);
        arrLine[3].el.style.top = arrLine[3].lineY + 'px';

        arrLine[4].lineY = Math.floor(arrLine[4].lineY + stage + 3);
        arrLine[4].el.style.top = arrLine[4].lineY + 'px';

        for (var i = 0; i < arrLine.length; i++) {
            if (arrLine[i].lineY >= 420) {
                arrLine[i].lineY = 0;

            }
        }
    }

    function showCar() {
        for (var i = 0; i < arrCar.length; i++) {
            arrCar[i].posCarY = Math.floor(arrCar[i].posCarY + stage + 1);
            arrCar[i].el.style.top = arrCar[i].posCarY + 'px';
            if (arrCar[i].posCarY >= 420) {
                points = Math.floor(points + 100);
                document.getElementById('points').innerHTML = 'Points: ' + points;

                if (points % 1000 == 0) {
                    stage = stage + 1;
                }

                posX = Math.floor(Math.random() * arrX.length);
                arrCar[i].posCarX = arrX[posX];
                arrCar[i].el.style.left = arrCar[i].posCarX + 'px';

                col = Math.floor(Math.random() * arrCol.length);
                arrCar[i].colCar = arrCol[col];
                arrCar[i].el.style.background = 'URL(' + arrCol[col] + ') center no-repeat';

                arrCar[i].posCarY = 0;
            }
            if (arrCar[i].posCarY >= 241 && arrCar[i].posCarY <= 400) {
                if (posBolidX == arrX[posX] && posBolidY == 0) {
                    clearInterval(timerDraw);
                    alert("Game over. You have " + points + " points");
                    resetRace();
                }
            }
        }
    }

    function keyContol(e) {
        if (posBolidX >= 0 && posBolidX <= 80) {
            if (e.keyCode == 39) {
                posBolidX = Math.floor(posBolidX + 80);
            }
        };
        if (posBolidX != 0) {
            if (e.keyCode == 37) {
                posBolidX = Math.floor(posBolidX - 80);
            }
        };
        bolid.style.left = posBolidX + 'px';
    }


    function startRace() {
        start.removeEventListener('click', startRace, false);

        timerDraw = setInterval(function() {
            draw();
        }, 10);
    }


    function resetRace() {
        clearInterval(timerDraw);
        track.removeChild(arrCar[0].el);

        for (var i = 0; i < arrLine.length; i++) {
            track.removeChild(arrLine[i].el);
        }
        initRace();
    }
})();