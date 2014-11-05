var Ticket = function (opts) {
    'use strict';
    var self = this,
        cellInfo = {},
        addCombination = function (index, length, ship, ship2, ship3) {
            var combination = {};
            combination.index = index;
            combination.length = length;
            combination.count = 0;
            ship.combinations.push(combination);
            ship2.combinations.push(combination);
            if (ship3) {
                ship3.combinations.push(combination);
            }
        },
        createCombinations = function () {
            var length = self.ships.length,
                i = 0,
                j, k,
                ship, ship2, ship3,
                combination33 = {}, // общая комбинация для трехпалубных кораблей
                combination222 = {}; // общая комбинация для всех двухпалубных кораблей
            // создаем набор комбинаций кораблей
            combination33.index = 33;
            combination222.index = 222;
            combination33.length = combination222.length = 6;
            combination33.count = combination222.count = 0;

            do {
                ship = self.ships[i];
                if (ship.length === 2) {
                    ship.combinations.push(combination222);

                    j = length;
                    do {
                        j -= 1;
                        ship2 = self.ships[j];
                        if (ship2.length === 2 && j > i) {
                            // комбинация 2+2
                            addCombination(22, 4, ship, ship2);

                            k = length;
                            do {
                                k -= 1;
                                ship3 = self.ships[k];
                                if (ship3.length === 3) {
                                    // комбинация 2+2+3
                                    addCombination(223, 7, ship, ship2, ship3);
                                }
                            } while (k);
                        } else if (ship2.length == 3) {
                            // комбинация 2+3
                            addCombination(23, 5, ship, ship2);
                        } else if (ship2.length === 4) {
                            // комбинация 4+2
                            addCombination(42, 6, ship, ship2);
                        }
                    } while (j);
                } else if (ship.length === 3) {
                    ship.combinations.push(combination33);

                    j = length;
                    do {
                        j -= 1;
                        ship2 = self.ships[j];
                        if (ship2.length === 4) {
                            // комбинация 4+3
                            addCombination(43, 7, ship, ship2);
                            break; // четырехпалубный корабль один
                        }
                    } while (j);
                }
                i += 1;
            } while (i !== length);
        },
        init = function () {
            var i,
                j,
                pos, // позиция корабля
                offset,
                length,
                currNumbers, // номера корабля
                shipData,
                ship;

            i = 6; // кол-во кораблей
            while (i) {
                i -= 1;
                shipData = opts.ships[i];
                pos = shipData.position;
                length = shipData.decks;
                offset = (shipData.orientation === 'vertical') ? 10 : 1;

                currNumbers = [];
                // получаем ячейки для корабля
                for (j = 0; j < length; j += 1) {
                    currNumbers[j] = opts.numbers[pos];
                    pos += offset;
                }

                ship = new Ship({
                    cells: currNumbers,
                    isVertical: (offset > 1)
                });
                self.ships.push(ship);
            }

            createCombinations();
        },
        updateInfoForNumber = function (number) {
            var i = self.ships.length,
                j,
                ship;

            // возвращает индекс корабля и индекс ячейки для номера
            cellInfo.shipIndex = null;
            cellInfo.cellIndex = null;

            do {
                i -= 1;
                ship = self.ships[i];
                j = ship.length;
                do {
                    j -= 1;
                    if (ship.cells[j] === number) {
                        cellInfo.shipIndex = i;
                        cellInfo.cellIndex = j;
                        break;
                    }
                } while (j);

                if (cellInfo.shipIndex !== null) {
                    break;
                }
            } while (i);
        };
    // возвращает индекс ячейки по номеру
    this.indexForNumber = function (number) {
        var i = self.numbers.length,
            index = -1;
        do {
            i -= 1;
            if (self.numbers[i] === number) {
                index = i;
                break;
            }
        } while (i);

        return index;
    };
    this.isShipNumber = function (number) {
        updateInfoForNumber(number);

        return (cellInfo.shipIndex !== null);
    };
    this.activateNumber = function (number) {
        var ship,
            combination,
            length,
            i,
            wins,
            win,
            winCombinations = [], // список выигравших комбинаций
            winSum, // только для джекпота (4х палубного корабля)
            result = Ticket.SHIP_NOT_BOMBED;

        cellInfo.index = this.indexForNumber(number);

        updateInfoForNumber(number);
        if (cellInfo.shipIndex !== null) {
            ship = this.ships[cellInfo.shipIndex];
            ship.cellBombed(cellInfo.cellIndex);

            // обновляем статус
            result = (ship.bombedCount !== ship.length) ? Ticket.SHIP_BOMBED : Ticket.SHIP_BLOWN;

            this.cellsBombed += 1;

            if (opts.controller.currStage < 46) {
                // проходим по всем комбинациям для данного корабля
                i = ship.combinations.length;
                do {
                    i -= 1;
                    combination = ship.combinations[i];
                    combination.count += 1;
                    length = combination.length;

                    if (combination.count === length - 1) {
                        // предвыигрышная комбинация
                        this.info.bwin[length - 4] += 1;
                    } else if (combination.count === length) {
                        // выигрышная комбинация
                        this.info.win[length - 4] += 1;
                        this.info.bwin[length - 4] -= 1;

                        if (coeff[opts.controller.currStage][combination.index]) {
                            // если данная комбинация играет в текущем этапе
                            winCombinations.push(combination.index);
                            result = Ticket.COMBINATION_WIN;
                        }
                    }

                    // увеличиваем общее кол-во выпадших номеров для данного типа
                    this.info.all[length - 4] += 1;
                } while (i);

                if (ship.length === 4 && opts.controller.currStage < 11) {
                    this.info.ship4 += 1;

                    if (this.info.ship4 === 4) {
                        wins = opts.controller.jackpotWins;
                        if (wins) {
                            i = wins.length;
                            while (i--) {
                                win = wins[i];
                                if (win.ticket_id === this.ticket_id && win.series === this.series && win.step === opts.controller.activated.length) {
                                    winSum = win.win_sum;
                                    break;
                                }
                            }
                        }

                        if (winSum === undefined) {
                            // игрок выиграл только фиксированную часть джекпота
                            winSum = coeff['1']['4'] * this.price;
                        }

                        winCombinations.push('jp');
                        result = Ticket.JACKPOT_WIN;
                    }
                }
            }

            // проверяем выигрыш бонус-флота и флота
            if (this.cellsBombed === 15) {
                winCombinations.push('bfleet');
                result = Ticket.COMBINATION_WIN;
            } else if (this.cellsBombed === 16) {
                winCombinations.push('fleet');
                result = Ticket.COMBINATION_WIN;
            }
        }

        if (this.events.onActivateNumber) {
            this.events.onActivateNumber(cellInfo);
        }

        i = winCombinations.length;
        if (winCombinations.length > 0) {
            while (i--) {
                combination = winCombinations[i];
                if (combination !== 'jp') {
                    this.updateWinValue(combination);
                } else {
                    // winSum отправляем только для джекпота
                    this.updateWinValue(combination, winSum);
                }
            }
        }

        return result;
    };
    this.updateWinValue = function(combination, sum) {
        var factor;
        if (!sum) {
            factor = coeff[opts.controller.currStage][combination];
            if (factor) {
                sum = factor * this.price;
            }
        }
        if (sum) {
            this.events.onWin(combination, sum);
        }
    };
    // очищает выигрышные комбинации на следующем ходу (кроме бонус-флота и флота)
    this.clearWinCombinations = function () {
        var i = 4;
        if (this.info.ship4 === 4) {
            this.info.ship4 = 0;
        }

        do {
            i -= 1;

            if (this.info.win[i] > 0) {
                this.info.all[i] -= this.info.win[i] * (i + 4);
                this.info.win[i] = 0;
            }
        } while (i);
    };
    this.reset = function () {
        var i = this.ships.length;
        this.cellsBombed = 0;
        this.info = {
            ship4: 0,
            all:  [0, 0, 0, 0],
            bwin: [0, 0, 0, 0],
            win:  [0, 0, 0, 0]
        };
        while (i--) {
            this.ships[i].reset();
        }
    };
    this.series = opts.series;
    this.ticket_id = opts.ticket_id;
    this.price = opts.price;
    this.cellsBombed = 0; // общее кол-во подбитых клеток кораблей
    // информация по комбинациям
    this.info = {
        ship4: 0, // общее кол-во подбитых клеток у четырехпалубного корабля
        // старшие комбинации имеют больший приоритет (т.е. индекс отсортированный по приоритету: 3, 2, 1, 0)
        all:  [0, 0, 0, 0], // общее кол-во подбитых клеток у комбинаций (4, 5, 6, 7)
        bwin: [0, 0, 0, 0], // кол-во предвыигрышных комбинаций
        win:  [0, 0, 0, 0]  // кол-во выигрышных комбинаций (очищается на следующем ходу)
    };
    this.events = {
        onActivateNumber: null,
        onWin: null
    };
    this.ships = [];
    this.numbers = opts.numbers; // все номера билета (в том числе принадлежащие кораблям)

    init();
};

// нет попадание в корабль
Ticket.SHIP_NOT_BOMBED = 0;
// есть попадание в корабль
Ticket.SHIP_BOMBED = 1;
// корабль взорван
Ticket.SHIP_BLOWN = 2;
// выиграла комбинация
Ticket.COMBINATION_WIN = 3;
// выиграл джекпот
Ticket.JACKPOT_WIN = 4;