var Lang = function () {
    'use strict';
    this.current = langs['def'];
    this.events = {
        onChange: []
    };
    this.changeLanguage = function (lang) {
        var newStrings = langs[lang];
        if (newStrings && newStrings !== this.current) {
            this.current = newStrings;
            this.events.onChange.forEach(function (f) {f(newStrings); });
        }
    };
};