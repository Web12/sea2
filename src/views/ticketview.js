var TicketView = function (controller, parent, xPos, yPos) {
    'use strict';
    var model = null,
        viewSprite,
        numbers,
        ships,
        parts = [],
        partIndex,
        idLabel,
        init = function () {
            var node,
                element,
                i = 6,
                j = 16,
                x = 20,
                y = 260;

            viewSprite = cc.Sprite.create(res.Grid_png);
            viewSprite.x = xPos;
            viewSprite.y = yPos;
            viewSprite.visible = false;
            parent.addChild(viewSprite);

            // добавляем корабли на билет
            node = cc.Node.create();
            ships = node.getChildren();

            do {
                i -= 1;
                element = cc.Sprite.create("#sh2");
                node.addChild(element);
            } while (i);

            viewSprite.addChild(node);

            // части кораблей (отображающих подбитую клетку) храним в отдельном массиве
            do {
                j -= 1;
                parts.push(cc.Sprite.create("#sh2-0"));
            } while (j);

            // добавляем номера на билет
            node = cc.Node.create();
            numbers = node.getChildren();

            i = 90;
            j = 0;
            do {
                element = cc.LabelTTF.create("", "AcademyC-Bold", 18);
                element.enableShadow(0, -1, 0.23, 0);
                element.x = x;
                element.y = y;

                node.addChild(element);

                j += 1;
                if (j === 10) { // следующая строка
                    x = 20;
                    y -= 30;
                    j = 0;
                } else {
                    x += 30;
                }

                i -= 1;
            } while (i);

            viewSprite.addChild(node);

            idLabel = cc.LabelTTF.create("", "AcademyC-Bold", 20);
            idLabel.x = viewSprite.getContentSize().width / 2;
            idLabel.y = 296;
            viewSprite.addChild(idLabel);
        },
        addPart = function (ship, sprite, index) {
            var length = ship.length,
                frameIndex = ship.isVertical ? index : length - 1 - index,
                element;

            // клетка корабля подбита
            element = parts[partIndex];
            element.removeFromParent(false);
            element.setSpriteFrame("sh" + length + "-" + frameIndex);
            element.x = sprite.getContentSize().width / 2;
            element.y = sprite.getContentSize().height / 2;
            sprite.addChild(element);
            partIndex += 1;
        },
        setSpriteFrame = function (ship, sprite) {
            var i = ship.length,
                name = "sh" + i,
                elements;

            if (ship.bombedCount === i) {
                name += "b";
                // удаляем куски если они есть
                elements = sprite.getChildren();
                while(elements.length > 0) {
                    elements[0].removeFromParent(false);
                }
            } else {
                do {
                    i -= 1;
                    if (ship.states[i]) {
                        addPart(ship, sprite, i);
                    }
                } while (i);
            }

            sprite.setRotation(ship.isVertical ? 0 : 90);
            sprite.setSpriteFrame(name);
        },
        numberActivated = function (cellInfo) {
            var shipIndex = cellInfo.shipIndex,
                ship,
                sprite,
                elements;

            if (shipIndex !== null) { // номер принадлежит кораблю
                ship = model.ships[shipIndex];
                sprite = ships[shipIndex];

                if (ship.bombedCount != ship.length) {
                    addPart(ship, sprite, cellInfo.cellIndex);
                } else {
                    // корабль уничтожен
                    elements = sprite.getChildren();
                    while(elements.length > 0) {
                        elements[0].removeFromParent(false);
                    }
                    sprite.setSpriteFrame("sh" + ship.length + "b");
                }
            } else {
                numbers[cellInfo.index].color = {r:233, g:201, b:148};
            }
        };
    this.setModel = function (ticket) {
        var i,
            number,
            element,
            ship,
            index,
            row,
            col,
            length;

        if (model !== ticket) {
            if (model && model.events.onActivateNumber === numberActivated) {
                model.events.onActivateNumber = undefined;
            }

            if (ticket) {
                model = ticket;
                viewSprite.visible = true;

                // отображаем серию и номер билета
                idLabel.setString(parent.getTicketIdString(model));
                i = nominals.indexOf(model.price); // индекс номинала билета
                if (i > -1) {
                    idLabel.color = parent.nominalColors[i];
                }

                i = model.ships.length;
                partIndex = 0;
                do {
                    i -= 1;
                    ship = model.ships[i];
                    index = model.indexForNumber(ship.cells[0]);
                    row = ~~(index / 10);
                    col = index - (row * 10);
                    index = ship.isVertical ? 0 : 1;
                    length = ship.length;
                    element = ships[i];
                    element.x = parent.shipsPositions[length][index].x + col * 30;
                    element.y = parent.shipsPositions[length][index].y - row * 30;

                    setSpriteFrame(ship, element);
                } while (i);

                // удаляем оставшиеся части
                i = partIndex;
                while (i < 16) {
                    parts[i].removeFromParent(false);
                    i += 1;
                }

                for (i = 0; i < 90; i += 1) {
                    number = model.numbers[i];
                    element = numbers[i];
                    element.setString(number);

                    if (model.isShipNumber(number)) { // принадлежит ли номер кораблю
                        element.color = {r:255, g:255, b:255};
                    } else {
                        if (controller.isNumberActivated(number)) {
                            element.color = {r:233, g:201, b:148};
                        } else {
                            element.color = {r:114, g:102, b:106};
                        }
                    }
                }

                model.events.onActivateNumber = numberActivated;
            } else {
                model = null;
                viewSprite.visible = false;
            }
        }
    };
    init();
};