const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],
    [
        new Cloud()
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -720),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -720),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -720),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -720),
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 720),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720),
        new BackgroundObject('img/5_background/layers/air.png', 2 * 720),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2 * 720),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2 * 720),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2 * 720),
        new BackgroundObject('img/5_background/layers/air.png', 3 * 720),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 3 * 720),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 3 * 720),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 3 * 720),
    ],
    [
        new StatusBar(0, 'IMAGES_HEALTHBAR'),
        new StatusBar(50, 'IMAGES_BOTTLEBAR'),
        new StatusBar(100, 'IMAGES_COINBAR')
    ],
    [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ]
);