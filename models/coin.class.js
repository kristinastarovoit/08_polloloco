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
    constructor() {
        super();
        this.loadImg('img/8_coin/coin_1.png');
        this.x = 200 + Math.random() * 1500;
        this.y = 150 + Math.random() * 100;
    }
}