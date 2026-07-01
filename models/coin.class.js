class Coin extends DrawableObject {
    height = 130;
    width = 130;
    // y = 150; // obbergrenze
    // y= 300;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
    constructor() {
        super();
        this.loadImg('img/8_coin/coin_1.png');
        this.x = 200 + Math.random() * 1500;
        this.y = 150 + Math.random() * 100;
    }
}