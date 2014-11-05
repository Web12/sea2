var Network = function (opts) {
    'use strict';
    var serverLostError = false, // указывает что получено сообщение srv_lost_msg
        updatePlayer = function(data) {
            opts.scene.setPlayerValue(data['nickname']);
        },
        updateData = function(data, initMsg) {
            var state = data['game_state'];

            if (data['game_id']) {
                opts.scene.setEventValue(data['game_id']);
            }
            if (typeof data['total_win'] === 'number') {
                opts.scene.setWinValue(data['total_win']);
            }
            if ((typeof data['jp_list'] === 'object') && (data['jp_list'].length === 5)) {
                opts.scene.setJackpotsValues(data['jp_list']);
            }
            if (typeof data['jp_wins'] === 'object') {
                // сохраняем информацию о выигрышах джекпота
                opts.controller.jackpotWins = data['jp_wins'];
            }

            if (!initMsg && typeof data['balls'] === 'object') {
                if (data['balls'].length > 0) {
                    if (state === 2) {
                        opts.controller.activate(data['balls']);
                    } else if (state === 1) {
                        // конец игры
                        opts.controller.gameEnded();
                    }
                } else if (state === 2) {
                    // конец приема ставок (или произошел откат)
                    opts.controller.gameStarted();
                }
            }
        };
    opts.api['init_msg'](function (data) {
        if (serverLostError) {
            serverLostError = false;

            // посылаем команду которая убирает сообщение с экрана
            opts.scene.hideErrorView();
        }

        opts.tickets.wins = []; // специально очищаем выигрыши
        opts.controller.gameEnded();

        if (typeof data['lang'] === 'string') {
            opts.lang.changeLanguage(data['lang']);
        }
        if (typeof data['auth'] === 'object') {
            updatePlayer(data['auth']);
        }
        if (typeof data['tickets'] === 'object') {
            data['tickets'].forEach(function (ticket) {
                opts.tickets.add(ticket);
            });
        }
        if (typeof data['game_data'] === 'object') {
            updateData(data['game_data'], true);
        }
    });
    opts.api['tickets_msg'](function (data) {
        if (serverLostError) {
            return;
        }
        if (typeof data['tickets'] === 'object') {
            data['tickets'].forEach(function (ticket) {
                opts.tickets.add(ticket);
            });
        }
    });
    opts.api['rand_msg'](function (data) {
        if (serverLostError) {
            return;
        }
        if (typeof data['game_data'] === 'object') {
            updateData(data['game_data']);
        }
    });
    opts.api['auth_msg'](function (data) {
        if (serverLostError) {
            return;
        }
        if (typeof data['auth'] === 'object') {
            updatePlayer(data['auth']);
        }
    });
    opts.api['exit_msg'](function () {
        opts.scene.exitGame();
    });
    opts.api['error_msg'](function (data) {
        if (serverLostError) {
            return;
        }

        if (data['error_code']) {
            opts.scene.showError(data['error_code']);
        }
    });
    opts.api['srv_lost_msg'](function () {
        serverLostError = true;

        opts.scene.showServerLostError();
    });
};