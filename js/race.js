(function() {
    start.addEventListener('click', function start() {
        init();
    }, false);

    var bolid = document.getElementById('bolid'),
        posBolidX = 0,
        posBolidY = bolid.style.bottom;
    var speedStartGame = 5000;
    var speedShowLine = 5;
    var speedInitCar = 5;

    function init() {
    var points = 0;
        var stage = 0;

        var arrLine = [{
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


        var showLine = function() {

            arrLine[0].lineY = Math.floor(arrLine[0].lineY + 5);
            arrLine[0].el.style.top = arrLine[0].lineY + 'px';

            arrLine[1].lineY = Math.floor(arrLine[1].lineY + 5);
            arrLine[1].el.style.top = arrLine[1].lineY + 'px';

            arrLine[2].lineY = Math.floor(arrLine[2].lineY + 5);
            arrLine[2].el.style.top = arrLine[2].lineY + 'px';

            arrLine[3].lineY = Math.floor(arrLine[3].lineY + 5);
            arrLine[3].el.style.top = arrLine[3].lineY + 'px';

            arrLine[4].lineY = Math.floor(arrLine[4].lineY + 5);
            arrLine[4].el.style.top = arrLine[4].lineY + 'px';

            for (var i = 0; i < arrLine.length; i++) {
                if (arrLine[i].lineY >= 420) {
                    arrLine[i].lineY = 0;

                }
            }

        };

        var arrCar = [{
            el : null, 
            posCarX : null,
            posCarY : 0, 
            colCar : null
        }];
        var arrX = ['0', '80', '160'];
        var posX = Math.floor(Math.random() * arrX.length);
        var arrCol = ['img/car.png', 'img/car2.png', 'img/car3.png'];
        var col = Math.floor(Math.random() * arrCol.length);

        for (var i = 0; i < arrCar.length; i++) {
            arrCar[i].el = document.createElement('div');
            arrCar[i].el.id = "car" + i;
            arrCar[i].el.className = "car";
            track.appendChild(arrCar[i].el);

            arrCar[i].posCarX = arrX[posX];
            arrCar[i].el.style.left = arrCar[i].posCarX + 'px';

            arrCar[i].colCar = arrCol[col];
            arrCar[i].el.style.background = 'URL(' + arrCol[col] + ') center no-repeat';
        }

        var initCar = function() {
            for (var i = 0; i < arrCar.length; i++) {
            arrCar[i].posCarY = Math.floor(arrCar[i].posCarY + stage + 1);
            arrCar[i].el.style.top = arrCar[i].posCarY + 'px';
                if (arrCar[i].posCarY >= 420) {
                    arrCar[i].posCarY = 0;
                }
                if ( arrCar[i].posCarY >= 241 && arrCar[i].posCarY <= 320) {
                    if (posBolidX == arrX[posX] && posBolidY == 0) {
                    clearInterval(timerDraw);
                    alert("Game over. You have " + points + " points");
                    track.removeChild(arrCar[i].el);
                    window.location.reload();
                    }
                }
            }

        };

        document.getElementById('points').innerHTML = 'Points: ' + points;

        reset.addEventListener('click', function() {
            clearInterval(timerDraw);
            window.location.reload();
            document.getElementById('points').innerHTML = '';
        }, false);

        var draw = function() {
/*        stage = Math.floor(stage + 1);*/
        points = Math.floor(points + 100);
            showLine();
            initCar();
        }

        var timerDraw = setInterval(function() {
            draw();
        }, 10);
    };

    document.addEventListener('keydown', function(e) {
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
    }, false);
})();