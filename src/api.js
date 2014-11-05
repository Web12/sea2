var Api = function () {
    'use strict';
    var functions = [
            'init_msg',
            'auth_msg',
            'tickets_msg',
            'ticket_again_msg',
            'bets_ok_msg',
            'rand_msg',
            'exit_msg',
            'error_msg',
            'srv_lost_msg'
        ],
        callbacks = {
            fromJs: function (data) {
                window['cppObj']['fromJs'](JSON.stringify(data));
            }
        },
        log = function (text, gui) {
            console.log(text);
            if (gui !== undefined) {
                window.alert(text);
            }
            return text;
        };
    functions.forEach(function (f) {
        callbacks[f] = function (cb) {
            callbacks[f] = cb;
        };
    });
    window['toJs'] = function (str) {
        var data,
            error = {};
        try {
            data = JSON.parse(str);
        } catch (e) {
            data = undefined;
            error = e;
        }

        if (typeof data === 'object' && typeof data['kind'] === 'string') {
            return callbacks[data['kind']](data);
        } else {
            return log((error.message || 'bad json') + ' (' + str + ')');
        }
    };
    window['cppObj'] = window['cppObj'] || {};
    window['cppObj']['toJs'] = window['cppObj']['toJs'] || {};
    window['cppObj']['toJs']['connect'] = window['cppObj']['toJs']['connect'] || function () {};
    window['cppObj']['toJs']['connect'](window['toJs']);
    return callbacks;
};