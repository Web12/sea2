var Controller = function (stages) {
    'use strict';
    var gameStarted; // флаг указывает запустилась ли игра (используется для определения отката)
    this.currStage = 0;
    this.lastNumber = false; // указывает что текущий шар является последним в списке полученных
    this.activated = []; // список выпавших номеров
    this.jackpotWins = null; // список выигрышей джекпота полученных с сервера
    this.activate = function (balls) {
        var step,
            number,
            l = balls.length,
            i;

        for (step = 0; step < l; step++) {
            number = balls[step];

            this.lastNumber = (step === l - 1);

            if (this.activated[step] !== number) {
                if (step === this.activated.length) {
                    // обновляем (при необходимости) текущий этап
                    i = stages.length;
                    do {
                        i -= 1;
                        if (step + 1 === stages[i]) {
                            this.currStage = step + 1;
                            this.events.onStageChange.forEach(function (f) {f(step + 1); });
                            break;
                        }
                    } while (i);

                    this.activated.push(number);
                    this.events.onActivate.forEach(function (f) {f(number); });
                } else {
                    // выпавшие номера не совпали - необходимо обновить экран игры
                    this.resetBalls(balls);
                    break;
                }
            }
        }
        this.events.onActivateFinish.forEach(function (f) {f(); });
    };
    this.isNumberActivated = function (number) {
        var i = this.activated.length,
            result = false;

        while (i) {
            i -= 1;
            if (this.activated[i] === number) {
                result = true;
                break;
            }
        }

        return result;
    };
    this.clear = function () {
        this.currStage = 0;
        this.activated = [];
        this.jackpotWins = null;
    };
    this.resetBalls = function (balls) {
        this.clear();
        this.events.onBallsReset.forEach(function (f) {f(); });

        if (balls && balls.length > 0) {
            this.activate(balls);
        }
    };
    this.gameStarted = function () {
        if (gameStarted === false) {
            gameStarted = true;
            this.events.onGameStarted.forEach(function (f) {f(); });
        } else {
            // произошел откат
            this.resetBalls();
        }
    };
    this.gameEnded = function () {
        gameStarted = false;
        this.clear();
        this.events.onGameEnded.forEach(function (f) {f(); });
    };
    this.events = {
        onStageChange: [], // смена этапа
        onActivate: [], // выпал номер
        onActivateFinish: [], // обработка выпавших номеров завершена
        onGameStarted: [],
        onGameEnded: [],
        onBallsReset: [] // если последовательность шаров изменилась
    };
};