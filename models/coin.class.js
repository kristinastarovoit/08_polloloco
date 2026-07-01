class Coin extends DrawableObject {
    height = 130;
    width = 130;
    // y = 150; // obbergrenze
    // y= 300;
    offset = {
        top: 42,
        right: 42,
        bottom: 42,
        left: 42
    }
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
        // 'img/8_coin/coin_1.png',
        // 'img/8_coin/coin_2.png', 
        // 'img/8_coin/coin_1.png',
        // 'img/8_coin/coin_2.png'
    ]
    constructor() {
        super();
        this.loadImg('img/8_coin/coin_1.png');
        this.loadImgs(this.IMAGES_COIN);
        this.x = 200 + Math.random() * 1500;
        this.y = 150 + Math.random() * 100;
        this.playCoinAnimation();
    }

    playCoinAnimation() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 400);
    }
}
