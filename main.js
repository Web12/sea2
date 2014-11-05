cc.game.onStart = function() {
    'use strict';

    cc.view.setDesignResolutionSize(1600, 900, cc.ResolutionPolicy.SHOW_ALL);
	cc.view.resizeWithBrowserSize(true);

    cc.loader.load(g_resources, {}, function() {
        var lang = new Lang(), // default language
            api = new Api(),
            controller = new Controller([1, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56, 61, 66]),
            tickets = new Tickets(controller),
            scene = new Scene(controller, api, tickets, lang),
            startScene = function () {
                if (document.readyState === "complete") {
                    document.removeEventListener('readystatechange', startScene, false);

                    // инициализация тестовой игры
                    debug.init();

                    cc.director.runScene(scene);
                }
            },
            audioList,
            i;

        Network({
            api: api,
            controller: controller,
            tickets: tickets,
            scene: scene,
            lang: lang
        });

        // сохраняем в кэше аудио звуки
        audioList = Object.keys(audioRes).map(function (k) {return audioRes[k]; });
        i = audioList.length;
        while (i--) {
            cc.loader.cache[audioList[i]] = document.getElementById(audioList[i]);
        }
        audioList = null;

        // запускаем сцену после загрузки шрифтов
        document.addEventListener('readystatechange', startScene, false);
    });
};

cc.game.run();