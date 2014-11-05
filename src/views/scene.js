var Scene = cc.Scene.extend({
    DEMO_MODE: null, // 1 - режим демонстрации (игра сама отображает выигрыш)
    layer: null,
    fadeLayer: null,
    errorView: null, // затемняющий фон на котором отображается ошибки
    labels: {},
    values: {},
    jackpots: [],
    winValueLabel: null,
    winValue: 0,
    ballValue: null, // значение на большом шаре
    bet: 0,
    ticketsCount: 0, // общее кол-во билетов
    coeffImages: [], // изображения отображающие коэффициенты для кораблей, бонус-флота и флота
    fadeLayers: [], // layers затеняющие коэффициенты не участвующие на текущем этапе игры
    dropNumbers: null, // node содержащая выпавшие номера
    winView: null, // view отображающая выигрыши
    linesNode: null, // node в котором отображается список выигрышей
    winLines: [], // линии в списке выигрышей
    nominalColors: [
        {r: 234, g: 234, b: 234},
        {r: 91,  g: 218, b: 255},
        {r: 0,   g: 213, b: 40},
        {r: 255, g: 198, b: 0},
        {r: 255, g: 0,   b: 0}
    ],
    shipsPositions: {
        2: [{x:20,y:243},{x:34,y:259}],
        3: [{x:18,y:231},{x:51,y:262}],
        4: [{x:22,y:211},{x:62,y:259}]
    },
    tickets: [], // views отображаемых билетов
    api: null,
    audioId: null, // идентификатор проигрываемого звука
    lang: null,
    needClear: false, // указывает что необходимо очистить сцену после игры
    getMoney: function (value) {
        var str,
            i,
            pos,
            res;
        str = "" + ~~value;
        pos = str.length;

        while (pos > 0) {
            i = pos - 3;
            if (i < 0) {
                i = 0;
            }

            if (res) {
                res = str.slice(i, pos) + ' ' + res;
            } else {
                res = str.slice(i, pos);
            }
            pos = i;
        }

        return res;
    },
    initTexts: function () {
        var fontName = "AcademyC-Italic",
            label,
            width,
            info = [
                { y: 830, key: 'step' },
                { y: 801, key: 'event' },
                { y: 774, key: 'player' },
                { y: 746, key: 'receipts' },
                { y: 718, key: 'bsum' }
            ],
            coeffKeys = ['combination', 'bfleet', 'fleet'],
            image,
            pos,
            i = info.length;

        do {
            i -= 1;

            label = cc.LabelTTF.create("", fontName, 20);
            label.anchorX = 0;
            label.x = 85;
            label.y = info[i].y;
            label.color = {r: 255, g: 245, b: 104};
            this.addChild(label);
            this.labels[info[i].key] = label;

            width = label.getContentSize().width;
            label = cc.LabelTTF.create("", fontName, 20);
            label.anchorX = 0;
            label.x = 85 + width;
            label.y = info[i].y;
            this.addChild(label);
            this.values[info[i].key] = label;
        } while (i);

        // надпись "WIN"
        label = cc.LabelTTF.create("", "AvantGardeGothicC-Demi", 30);
        label.x = 298;
        label.y = 644;
        label.color = {r: 255, g: 192, b: 2};
        //label.enableShadow(0, -3, 0.61, 0);
        this.addChild(label);
        this.labels.win = label;

        // значение выигрыша
        this.winValueLabel = cc.LabelBMFont.create("", res.Win_fnt);
        this.winValueLabel.x = 293;
        this.winValueLabel.y = 574;
        this.addChild(this.winValueLabel);

        i = 3;
        do {
            i -= 1;

            label = cc.LabelTTF.create("", "AcademyC-Bold", 14);
            label.color = {r: 255, g: 204, b: 0};
            label.y = 498;
            this.addChild(label);
            this.labels[coeffKeys[i]] = label;

            image = cc.Sprite.create(res.LeftPart_png);
            label.addChild(image);
            image = cc.Sprite.create(res.RightPart_png);
            label.addChild(image);
        } while (i);

        // отображаем номиналы (и добавляем их значения)
        i = 5;
        pos = 595;
        do {
            i -= 1;
            label = cc.LabelBMFont.create(nominals[i], res.Nominal_fnt);
            label.x = 1236;
            label.y = pos;
            this.addChild(label);

            label = cc.LabelTTF.create("", "AcademyC", 40);
            label.anchorX = 1.0;
            label.x = 1508;
            label.y = pos - 2;
            label.color = this.nominalColors[i];
            this.addChild(label);
            this.jackpots[i] = label;

            pos += 52;
        } while (i);

    },
    setLabels: function (strings) {
        var self = this,
            coeffInfo = {'combination': 500, 'bfleet': 1112, 'fleet': 1405},
            label,
            value,
            size,
            images;
        Object.keys(self.labels).forEach(function (key) {
            label = self.labels[key];
            label.setString(strings[key]);
            value = self.values[key];
            if (value) {
                value.x = 95 + label.getContentSize().width;
            }

            if (coeffInfo[key]) {
                size = label.getContentSize();
                images = label.getChildren();

                label.x = coeffInfo[key] - size.width / 2;
                images[0].x = -5 - images[0].getContentSize().width / 2;
                images[1].x = 8 + size.width + images[1].getContentSize().width / 2;
                images[0].y = images[1].y = size.height / 2;
            }
        });
    },
    setEventValue: function (gameId) {
        this.values.event.setString(gameId);
    },
    setPlayerValue: function (value) {
        this.values.player.setString(value);
    },
    setWinValue: function (value) {
        if (this.winValue !== value) {
            this.winValue = value;

            if (value) {
                this.winValueLabel.setString(this.getMoney(value));
            } else {
                this.winValueLabel.setString("");
            }
        }
    },
    setJackpotsValues: function (values) {
        var i = 5;

        do {
            i -= 1;
            this.jackpots[i].setString(this.getMoney(nominals[i] * coeff['1']['4'] + values[i]));
        } while (i);
    },
    createTickets: function (controller) {
        var i = 4,
            x = 1308;

        do {
            i -= 1;
            this.tickets[i] = new TicketView(controller, this, x, 240);
            x -= 340;
        } while (i);
    },
    // преобразуем ид билета в строку (добавляя перед значением нули в случае необходимости).
    // сохраняем значение в билете (чтобы постоянно не создавать его при сортировке).
    getTicketIdString: function (ticket) {
        var idString = ticket.idString;
        if (!idString) {
            idString = ticket.ticket_id + '';
            idString = idString.length >= 8 ? idString : new Array(8 - idString.length + 1).join('0') + idString;
            idString = ticket.series + ' ' + idString;

            ticket.idString = idString;
        }
        return idString;
    },
    createWinView: function () {
        var back,
            element,
            stencil,
            boldFont = "AcademyC-Bold",
            size = this.getContentSize(),
            green = cc.color.GREEN,
            lcolor = {r:128, g:82, b:33},
            rect = [{x:0, y:0}, {x:638, y:0}, {x:638, y:206}, {x:0, y:206}],
            info = [
                {x:156, key:'receipt'},
                {x:309, key:'bet'},
                {x:435, key:'type'},
                {x:648, key:'win'}
            ],
            i;

        this.winView = cc.LayerColor.create({r:0,g:0,b:0,a:76}, size.width, size.height);
        this.winView.visible = false;
        this.addChild(this.winView);

        back = cc.Sprite.create(res.BackWin_png);
        back.x = size.width / 2;
        back.y = size.height / 2;

        element = cc.LabelTTF.create(this.lang.current.win, "AcademyC-Italic", 60);
        element.color = {r:255, g:0, b:0};
        element.enableShadow(1, -1, 0.75, 0);
        element.x = 381;
        element.y = 286;
        back.addChild(element);

        // создаем надписи
        i = 4;
        while (i--) {
            element = cc.LabelTTF.create(this.lang.current[info[i].key], boldFont, 15);
            element.color = lcolor;
            element.x = info[i].x;
            element.y = 248;
            back.addChild(element);

            if (i === 3) {
                element.anchorX = 1.0;
            }
        }

        // область списка
        stencil = cc.DrawNode.create();
        stencil.drawPoly(rect, green, 0, green);

        element = cc.ClippingNode.create();
        element.x = 59;
        element.y = 26;
        element.stencil = stencil;
        back.addChild(element);

        this.linesNode = element;

        element = cc.Sprite.create(res.WinParts_png);
        element.anchorX = 0;
        element.anchorY = 0;
        back.addChild(element);

        element = cc.Sprite.create(res.Money_png);
        element.setAnchorPoint(0, 0);
        element.x = 38;
        element.y = -8;
        back.addChild(element);

        this.winView.addChild(back);
    },
    showWins: function (wins) {
        var self = this,
            actions = [],
            color = {r:204, g:159, b:91, a:0},
            lcolor = {r:128, g:82, b:33},
            boldFont = "AcademyC-Bold",
            values = [{x:93},{x:250},{x:376},{x:590}],
            value,
            line,
            i = this.winLines.length,
            l = wins.length,
            y = 186,
            j,
            updatePosition = cc.CallFunc.create(function () {
                var line = self.winLines[0];
                line.y = self.winLines[self.winLines.length - 1].y - 20;

                // переносим строку
                self.winLines.splice(0, 1);
                self.winLines.push(line);

                if (self.winLines.length % 2) {
                    // исправляем фоновую подсветку если количество строк нечетно
                    color.a = (line.getDisplayedOpacity() === 70) ? 0 : 70;
                    line.color = color;
                }
            });

        if (this.winView === null) {
            this.createWinView();
        } else {
            this.winView.stopAllActions();
        }

        // удаляем старые линии
        while (i--) {
            this.winLines[i].removeFromParent();
        }

        i = 0;
        do {
            color.a = (i % 2) ? 70 : 0;
            line = cc.LayerColor.create(color, 638, 20);
            line.x = 0;
            line.y = y;
            this.linesNode.addChild(line);
            this.winLines.push(line);

            values[0].text = this.getTicketIdString(wins[i].ticket);
            values[1].text = this.getMoney(wins[i].ticket.price);
            values[2].text = coeff.getCombinationName(wins[i].combination);
            values[3].text = this.getMoney(wins[i].sum);

            j = 4;
            while (j--) {
                value = cc.LabelTTF.create(values[j].text, boldFont, 14);
                value.color = lcolor;
                value.x = values[j].x;
                value.y = 12;
                line.addChild(value);

                if (j === 3) {
                    value.anchorX = 1.0;
                }
            }

            if (l > 9) {
                actions.push(cc.TargetedAction.create(line, cc.MoveBy.create(1.2, 0, 20)));
            }

            y -= 20;
            i += 1;
        } while (i < l);

        this.winView.visible = true;

        if (l > 9) {
            this.winView.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.Spawn.create(actions), updatePosition)));
        }
    },
    hideDropNumbers: function () {
        var elements = this.dropNumbers.getChildren(),
            i;

        if (elements[0].visible) {
            i = elements.length;
            while (i--) {
                elements[i].visible = false;
            }
        }
    },
    createErrorView: function () {
        var back,
            layer,
            label,
            size = this.getContentSize();

        back = cc.LayerColor.create({r:0,g:0,b:0,a:127}, size.width, size.height);
        back.setLocalZOrder(6);
        back.visible = false;
        this.addChild(back);

        // нижний блок
        layer = cc.LayerColor.create({r:255,g:0,b:0,a:230}, 756, 32);
        layer.x = (size.width - 756) / 2;
        back.addChild(layer);

        label = cc.LabelTTF.create("", "AcademyC", 25);
        label.x = 378;
        label.y = 16;
        layer.addChild(label);

        //верхний блок не создаем - его размер зависит от размера сообщения

        this.errorView = back;
    },
    showServerLostError: function () {
        var layers, layer, label;
        if (!this.errorView) {
            this.createErrorView();
        } else {
            this.errorView.stopAllActions();
        }

        layers = this.errorView.getChildren();
        if (layers.length > 1) {
            layers[layers.length - 1].removeFromParent();
        }

        layer = layers[0];
        layer.visible = true;
        label = layer.getChildren()[0];
        label.setString(this.lang.current.errorServerLost);
        this.errorView.visible = true;
    },
    showError: function (errorCode) {
        var self = this,
            layers,
            layer,
            label,
            error,
            height,
            size = this.getContentSize();
        if (!this.errorView) {
            this.createErrorView();
        } else {
            this.errorView.stopAllActions();
        }

        layers = this.errorView.getChildren();
        if (layers.length > 1) { // удаляем старый блок
            layers[layers.length - 1].removeFromParent();
        }

        layers[0].visible = false; // скрываем нижний блок

        error = "error" + errorCode;
        if (typeof this.lang.current[error] === 'string') {
            error = this.lang.current[error];
        } else {
            error = this.lang.current['errorUnknown'];
        }

        label = cc.LabelTTF.create(error, "AcademyC", 25, cc.size(746,0), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        height = label.getContentSize().height + 10;

        layer = cc.LayerColor.create({r:255,g:0,b:0,a:230}, 756, height);
        layer.x = (size.width - 756) / 2;
        layer.y = (size.height - height) / 2;

        label.x = 378;
        label.y = height / 2 + 6;
        layer.addChild(label);

        this.errorView.addChild(layer);
        this.errorView.visible = true;

        this.errorView.runAction(cc.sequence(cc.delayTime(10), cc.callFunc(function () {
            self.errorView.visible = false;
        })));
    },
    hideErrorView: function () {
        this.errorView.visible = false;
    },
    ctor: function (controller, api, tickets, lang) {
        var self = this,
            rootElement,
            layer,
            sprite,
            label,
            i,
            j,
            x = 159,
            y = 58,
            size = cc.winSize,
            coeffSettings = [
                {image: res.Stage1_png, x: 468, labels: 8},
                {image: res.StageF_png, x: 1100, labels: 1},
                {image: res.StageF_png, x: 1418, labels: 1}
            ],
            combSettings = [
                [{comb:4,x:99,y:42}, {comb:22,x:99,y:17}, {comb:23,x:264,y:42}, {comb:42,x:264,y:17}, {comb:222,x:452,y:42}, {comb:33,x:452,y:17}, {comb:43,x:643,y:42}, {comb:223,x:643,y:17}],
                [{comb:22,x:81,y:30}, {comb:23,x:245,y:42}, {comb:42,x:245,y:17}, {comb:222,x:432,y:42}, {comb:33,x:432,y:17}, {comb:43,x:623,y:42}, {comb:223,x:623,y:17}],
                [{comb:23,x:132,y:42}, {comb:42,x:132,y:17}, {comb:222,x:360,y:42}, {comb:33,x:360,y:17}, {comb:43,x:590,y:42}, {comb:223,x:590,y:17}],
                [{comb:42,x:133,y:31}, {comb:222,x:360,y:42}, {comb:33,x:360,y:17}, {comb:43,x:590,y:42}, {comb:223,x:590,y:17}],
                [{comb:43,x:239,y:31}, {comb:223,x:460,y:31}]
            ],
            layerSettings = [{x: 73, width: 793}, {x: 912, width: 296}, {x: 1222, width: 304}],
            updateTickets = function () {
                var i = self.tickets.length;
                while (i) {
                    i -= 1;
                    self.tickets[i].setModel(tickets.sortedTickets[i]);
                }
            };

        this._super();

        this.lang = lang;

        cc.spriteFrameCache.addSpriteFrames(res.Ships_json, res.Ships_png);

        rootElement = new cc.Sprite(res.Back_png);
        rootElement.setAnchorPoint(0, 0);
        this.addChild(rootElement);

        sprite = new cc.Sprite(res.Title_png);
        sprite.x = 210;
        sprite.y = 860;
        rootElement.addChild(sprite);

        this.layer = rootElement;

        this.initTexts();

        this.ballValue = cc.LabelBMFont.create("", res.Ball_fnt);
        this.ballValue.x = 801;
        this.ballValue.y = 710;
        this.addChild(this.ballValue);

        // добавляем отображение коэффициентов
        i = coeffSettings.length;
        do {
            i -= 1;
            sprite = cc.Sprite.create(coeffSettings[i].image);
            sprite.setPosition(coeffSettings[i].x, 468);
            this.addChild(sprite);
            this.coeffImages[i] = sprite;

            // затеняет панель с коэффициентамиы
            layer = cc.LayerColor.create(cc.color(0, 0, 0, 120), layerSettings[i].width, 77);
            layer.visible = false;
            layer.setPosition(layerSettings[i].x, 429.5);
            this.addChild(layer);
            this.fadeLayers[i] = layer;

            j = coeffSettings[i].labels;
            do {
                j -= 1;
                label = cc.LabelTTF.create("", "AcademyC-Bold", 24);
                label.color = {r: 255, g: 192, b: 0};
                label.anchorX = 1.0;
                label.visible = false;

                if (i > 0) { // только для бонус-флота и флота
                    label.x = 0;
                    label.y = 30;
                }

                sprite.addChild(label);
            } while (j);
        } while (i);

        // добавляем "-1" для бонус-флота
        label = cc.LabelTTF.create("-1", "AcademyC", 13);
        label.color = {r: 255, g: 192, b: 0};
        label.x = 146;
        label.y = 20;
        this.coeffImages[1].addChild(label);

        // добавляем выпадающие шары
        rootElement = cc.SpriteBatchNode.create(res.Drop_png);
        for (i = 0; i < 70; i += 1) {
            sprite = cc.Sprite.create(res.Drop_png);
            sprite.x = x;
            sprite.y = y;
            sprite.visible = false;
            rootElement.addChild(sprite);

            label = cc.LabelTTF.create("", "AcademyC", 18);
            label.x = 17;
            label.y = 28;
            label.color = (i < 10) ? {r: 255, g: 226, b: 80} : {r: 255, g: 156, b: 0};
            sprite.addChild(label);

            if (i < 9) {
                x += 36;
            } else {
                if (i === 9) {
                    x += 59;
                    j = 0;
                } else if (i === 34) {
                    x = 157;
                    y -= 36;
                    j = 0;
                } else {
                    if (j === 5) {
                        x += 57;
                        j = 0;
                    } else {
                        x += 34;
                    }
                }
                j += 1;
            }
        }
        this.addChild(rootElement);
        this.dropNumbers = rootElement;

        this.createTickets(controller);

        this.setLabels(lang.current);

        lang.events.onChange.push( function (strings) {
            self.setLabels(strings);
        });
        tickets.events.onAddTicket = function (ticket) {
            self.bet += ticket.price;
            self.ticketsCount += 1;
            self.values['bsum'].setString(self.bet);
            self.values['receipts'].setString(self.ticketsCount);

            // очищаем views перед добавлением первого билета
            if (self.ticketsCount === 1) self.clear();

            updateTickets();

            //cc.audioEngine.stopEffect(this.audioId);
            this.audioId = cc.audioEngine.playEffect(audioRes.AddTicket_mp3);
        };
        tickets.events.onResultStatus = function (status) {
            var url;

            if (controller.lastNumber) {
                // проигрываем звуки только для последнего выпавшего номера (если их выпало несколько)
                switch (status) {
                    case Ticket.SHIP_NOT_BOMBED: url = audioRes.Fire1_mp3; break;
                    case Ticket.SHIP_BOMBED: url = audioRes.Fire3_mp3; break;
                    case Ticket.SHIP_BLOWN: url = audioRes.Fire2_mp3; break;
                    case Ticket.COMBINATION_WIN: url = audioRes.Win_mp3; break;
                    case Ticket.JACKPOT_WIN: url = audioRes.Jackpot_mp3; break;
                }

                //cc.audioEngine.stopEffect(self.audioId);
                self.audioId = cc.audioEngine.playEffect(url);

                if (self.DEMO_MODE && Ticket.COMBINATION_WIN) {
                    var sum = 0,
                        i = tickets.wins.length;

                    while (i > 0) {
                        i -= 1;
                        sum += tickets.wins[i].sum;
                    }

                    self.setWinValue(sum);
                }
            }
        };
        tickets.events.onActivate = function (number) {
            var index = controller.activated.length - 1,
                element = self.dropNumbers.getChildren()[index];
            self.ballValue.setString(number);
            self.values['step'].setString((index + 1) + ' ' + lang.current['from'] + ' 70');

            element.visible = true;
            element.getChildren()[0].setString(number);
        };
        controller.events.onStageChange.push(function () {
            var sprite,
                stage = controller.currStage,
                imageIndex,
                updateCoeff = function (index, visible) {
                    var elements = self.coeffImages[index].getChildren(),
                        element,
                        i = elements.length,
                        info = combSettings[imageIndex],
                        params, value;

                    self.fadeLayers[index].visible = visible;
                    do {
                        i -= 1;
                        element = elements[i];

                        if (index == 0) {
                            if (stage < 46) {
                                params = info[i];

                                if (params) {
                                    if (stage == 1 && coeff[1].jp === params.comb) {
                                        element.setString(coeff[stage][params.comb] + "+JP");
                                    } else {
                                        element.setString("x " + coeff[stage][params.comb]);
                                    }

                                    element.x = params.x;
                                    element.y = params.y;
                                    element.visible = true;
                                } else {
                                    element.visible = false;
                                }
                            } else {
                                element.visible = false;
                            }
                        } else if (i == 0) { // только для первого элемента
                            element.visible = true;

                            value = (index === 1) ? coeff[stage].bfleet : coeff[stage].fleet;
                            if (value) {
                                element.setString("x " + value);
                            } else {
                                element.visible = false;
                            }
                        }
                    } while (i);
                };
            if (stage < 46) {
                // обновляем изображение, отображающее коэффициенты для комбинаций кораблей
                sprite = self.coeffImages[0];
                if (stage === 1) {
                    imageIndex = 0;
                } else if (stage >= 11 && stage <= 26) {
                    imageIndex = 1;
                } else if (stage === 31) {
                    imageIndex = 2;
                } else if (stage === 36) {
                    imageIndex = 3;
                } else if (stage === 41) {
                    imageIndex = 4;
                }

                sprite.setTexture("res/st" + (imageIndex + 1) + ".png");

                updateCoeff(0, false);
            } else {
                // комбинации уже не играют
                updateCoeff(0, true);
            }

            // поля с коэффициентами для бонус флота и флота
            if (stage === 1) {
                updateCoeff(1, true);
                updateCoeff(2, true);
            } else {
                updateCoeff(1, false);
                if (stage === 11) {
                    updateCoeff(2, true);
                } else {
                    updateCoeff(2, false);
                }
            }
        });
        // обновляем отображаемые билеты после завершения обработки выпавших шаров
        controller.events.onActivateFinish.push(updateTickets);
        controller.events.onGameEnded.push(function () {
            self.bet = 0;
            self.ticketsCount = 0;
            self.needClear = true;

            self.fadeLayers[1].visible = true;
            self.fadeLayers[2].visible = true;
            self.coeffImages[1].getChildren()[0].visible = false;
            self.coeffImages[2].getChildren()[0].visible = false;

            if (tickets.wins.length) {
                self.showWins(tickets.wins);
            }
        });
        controller.events.onGameStarted.push(function () {
            self.values['bsum'].setString(self.bet || '');
            self.values['receipts'].setString(self.ticketsCount || '');

            self.clear();

            //cc.audioEngine.stopEffect(this.audioId);
            this.audioId = cc.audioEngine.playEffect(audioRes.Begin_mp3);
        });
        controller.events.onBallsReset.push(function () {
            self.needClear = true;
            self.clear();
            updateTickets();
        });

        // отображаем переход из Game Selector
        layer = cc.LayerColor.create({r:0,g:0,b:0,a:0}, this.getContentSize().width, this.getContentSize().height);
        layer.setLocalZOrder(10);
        this.addChild(layer);
        this.fadeLayer = layer;
        this.api = api;

        // отображаем текущую версию игры
        label = cc.LabelTTF.create(Scene.VERSION, 'AcademyC', 11);
        label.anchorX = 1.0;
        label.anchorY = 1.0;
        label.x = size.width - 2.0;
        label.y = size.height + 4;
        this.addChild(label, 9);
    },
    clear: function () {
        var i;

        if (this.needClear) {
            i = this.tickets.length;

            if (this.winView) {
                this.winView.stopAllActions();
                this.winView.visible = false;
            }

            this.setWinValue(0);
            this.values['step'].setString('');

            this.ballValue.setString('');
            this.hideDropNumbers();

            while (i--) this.tickets[i].setModel(null);

            this.needClear = false;
        }
    },
    exitGame: function () {
        var self = this;

        this.stopAllActions();
        this.fadeLayer.runAction(cc.Sequence.create(cc.FadeIn.create(1.0), cc.CallFunc.create(function () {
            // сообщаем о том что игра завершилась
            self.api.fromJs({kind: 'exited_msg'});
        })));
    }
});

Scene.VERSION = 'v 1.0.2';