var Tickets = function (controller) {
    'use strict';
    var collection = [],
        compareKeys = ['all', 'bwin', 'win'],
        self = this,
        MAX_SORTED_TICKETS = 4,
        compareTickets = function(ticket1, ticket2) {
            var result = null, // null - равны, false - ticket1 < ticket2, true - ticket1 > ticket2
                jticket,
                info1 = ticket1.info, info2 = ticket2.info,
                value1, value2,
                l = compareKeys.length,
                i,
                count;

            // проверяем четырехпалубные корабли до 11 хода
            if (controller.currStage === 1) {
                if (info1.ship4 !== info2.ship4) {
                    jticket = (info1.ship4 > info2.ship4) ? ticket1 : ticket2;
                } else if (info1.ship4 > 0 && ticket1.price !== ticket2.price) {
                    jticket = (ticket1.price > ticket2.price) ? ticket1 : ticket2;
                }

                if (jticket && jticket.info.ship4 === 4) {
                    result = (jticket === ticket1);
                }
            } else { // проверяем бонус-флот и флот
                if (ticket1.cellsBombed != ticket2.cellsBombed) {
                    result = (ticket1.cellsBombed > ticket2.cellsBombed);
                } else if (ticket1.price !== ticket2.price) {
                    result = (ticket1.price > ticket2.price);
                } else {
                    result = false;
                }
            }

            if (result === null) {
                // определяем какие комбинации нужно проверять
                switch (controller.currStage) {
                    case 31: count = 1; break;
                    case 36: count = 2; break;
                    case 41: count = 3; break;
                    default: count = 0; break;
                }

                while (l--) {
                    // учитываются случаи до 11 хода
                    if (jticket && ((jticket.info.ship4 === 3 && compareKeys[l] === 'bwin') ||
                        compareKeys[l] === 'all')) {
                        // предвыигрышный четырехпалубный корабль имеет приоритет перед другими предвыигрышными комбинациями
                        // так же попадание в четырехпалубны корабль имеет приоритет перед попаданием в другие комбинации
                        result = (jticket === ticket1);
                        break;
                    }

                    i = 4;
                    while (i-- !== count) {
                        // если значения равны то проверяем номинал билета
                        value1 = info1[compareKeys[l]][i];
                        value2 = info2[compareKeys[l]][i];

                        if (value1 !== value2) {
                            result = (value1 > value2);
                            break;
                        }
                    }

                    if (result !== null) {
                        break;
                    }
                }

                if (result === null && ticket1.price !== ticket2.price) {
                    result = (ticket1.price > ticket2.price);
                }
            }

            //console.log(controller.activated.length+": "+ticket1.info.ship4+"/"+ticket2.info.ship4+" "+JSON.stringify(ticket1.info['win'])+"/"+JSON.stringify(ticket2.info['win'])+" "+JSON.stringify(ticket1.info['bwin'])+"/"+JSON.stringify(ticket2.info['bwin'])+" "+JSON.stringify(ticket1.info['all'])+"/"+JSON.stringify(ticket2.info['all'])+" "+ticket1.price+"/"+ticket2.price+": "+result);

            return result;
        },
        checkTicket = function (ticket) {
            var index = 0,
                count = self.sortedTickets.length,
                element,
                temp;

            // проверяем попадает ли данный билет в список сортировки
            if (count > 0) {
                do {
                    if (self.sortedTickets[index] === ticket || compareTickets(ticket, self.sortedTickets[index])) {
                        break;
                    }
                    index += 1;
                } while (index < count);
            }

            if (index !== MAX_SORTED_TICKETS && self.sortedTickets[index] !== ticket) {
                // билет попал в список и при этом его позиция изменилась (если он там есть)

                if (index === count) {
                    self.sortedTickets[index] = ticket;
                } else {
                    element = ticket;
                    do {
                        temp = self.sortedTickets[index];
                        self.sortedTickets[index] = element;

                        if (temp === ticket) {
                            // билет перешел на другую позицию, дальше не надо сдвигать
                            break;
                        }

                        element = temp;
                        index += 1;
                    } while (index < MAX_SORTED_TICKETS && temp);
                }
            }
        },
        addWinInfo = function (win) {
            var i = 0,
                l = self.wins.length,
                insert = false;
            while (i < l) {
                if (win.sum > self.wins[i].sum) {
                    self.wins.splice(i, 0, win);
                    insert = true;
                    break;
                }
                i += 1;
            }

            if (!insert) {
                self.wins.push(win);
            }
        };
    this.add = function (params) {
        var ticket;

        ticket = new Ticket({
            controller: controller,
            series: params.series,
            ticket_id: params.ticket_id,
            price: params.price,
            numbers: params.content.fleet,
            ships: params.content.ships
        });
        ticket.events.onWin = function (combination, sum) {
            addWinInfo({
                ticket: ticket,
                combination: combination,
                sum: sum
            });
        };

        collection.push(ticket);
        checkTicket(ticket);

        this.events.onAddTicket(ticket); // информируем о том что добавлен билет
    };
    this.sortedTickets = []; // отсортированные билеты, отображающиеся на экране (MAX_SORTED_TICKETS билетов)
    this.wins = []; // список выигрышей
    this.events = {
        onAddTicket: null,
        onActivate: null, // вызывается перед обработкой выпавшего шара
        onResultStatus: null // передает максимальный статус после выпадение шара (используется для проигрывания звуков)
    };

    controller.events.onActivate.push(function (number) {
        var i = collection.length,
            ticket,
            maxStatus = Ticket.SHIP_NOT_BOMBED,
            status;

        // информируем о том что сейчас начнется обработка выпавшего номера
        self.events.onActivate(number);

        while (i--) {
            ticket = collection[i];
            //ticket.clearWinCombinations(); // очищаем перед ходом выигрышные комбинации
            status = ticket.activateNumber(number);
            if (status > maxStatus) {
                // сохраняем максимальный по весу статус
                maxStatus = status;
            }
            checkTicket(ticket);
        }

        // не сортирую заново потому что билеты не понижают свой вес (не вызывается clearWinCombinations)
        // формируем список отсортированных билетов
        /*i = collection.length;
        while (i--) {
            checkTicket(collection[i]);
        }*/

        // информируем о статусе
        self.events.onResultStatus(maxStatus);

        //console.log(controller.activated.length + ": "+JSON.stringify(self.sortedTickets[0].info)+'/'+JSON.stringify(self.sortedTickets[1].info)+'/'+JSON.stringify(self.sortedTickets[2].info)+'/'+JSON.stringify(self.sortedTickets[3].info));
    });
    controller.events.onGameEnded.push(function () {
        collection = [];
        self.sortedTickets = [];
    });
    controller.events.onGameStarted.push(function () {
        self.wins = [];
    });
    controller.events.onBallsReset.push(function () {
        var i = collection.length,
            ticket;

        self.wins = [];
        self.sortedTickets = [];

        while (i--) {
            ticket = collection[i];

            ticket.reset();
            checkTicket(ticket);
        }
    });
};