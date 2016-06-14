(function() {
    start.addEventListener('click', function start() {
        init();
    }, false);

    var bolid = document.getElementById('bolid'),
        posBolidX = 0,
        posBolidY = bolid.style.bottom;
    var points = 0;
    var speedStartGame = 5000;
    var speedShowLine = 5;
    var speedInitCar = 5;
    var stage = 0;

    function init() {
        var car = document.createElement('div');
        car.id = "car";
        track.appendChild(car);
        var posCarY = 0;
        var arrX = ['0', '80', '160'];
        var posCarX = Math.floor(Math.random() * arrX.length);
        car.style.left = arrX[posCarX] + 'px';
        var carCol = ['img/car.png', 'img/car2.png', 'img/car3.png'];
        var col = Math.floor(Math.random() * carCol.length);
        car.style.background = 'URL(' + carCol[col] + ') center no-repeat';
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
        var draw = function() {
            showLine();
            initCar();
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

        var initCar = function() {

            if (posBolidX == arrX[posCarX] && posBolidY == 0 && posCarY == 241) {
                track.removeChild(car);
                alert("Game over. You have " + points + " points");
                window.location.reload();
            }
            if (posCarY == 420) {
                track.removeChild(car);
                init();
            }

            posCarY = Math.floor(posCarY + stage + 1);
            car.style.top = posCarY + 'px';

        };
        points = Math.floor(points + 100);
        document.getElementById('points').innerHTML = 'Points: ' + points;

        reset.addEventListener('click', function() {
            clearInterval(timerDraw);
            window.location.reload();
            document.getElementById('points').innerHTML = '';
            bolid.style.left = 0;
        }, false);

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