var Ship = function (opts) {
    'use strict';
    this.cellBombed = function (cellIndex) {
        this.states[cellIndex] = true;
        this.bombedCount += 1;
    };
    this.reset = function () {
        var i = opts.cells.length;
        this.bombedCount = 0;
        while (i--) this.states[i] = false;
        i = this.combinations.length;
        while (i--) this.combinations[i].count = 0;
    };
    this.cells = opts.cells;
    this.length = opts.cells.length;
    this.states = []; // массив состояний, false - клетка корабля не подбита
    this.isVertical = opts.isVertical;
    this.bombedCount = 0; // кол-во подбитых клеток корабля
    this.combinations = []; // список комбинаций в которых участвует данный корабль

    var length = opts.cells.length;
    while (length--) this.states.push(false);
};