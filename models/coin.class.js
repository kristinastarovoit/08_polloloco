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
    // IMAGES_COLLECTING = [
    //     'img/8_coin/coin_1.png',
    //     'img/8_coin/coin_2.png',
    //     'img/8_coin/coin_1.png',
    //     'img/8_coin/coin_2.png', 'img/8_coin/coin_1.png',
    //     'img/8_coin/coin_2.png'
    // ]
    constructor() {
        super();
        this.loadImg('img/8_coin/coin_1.png');
        // this.loadImgs(this.IMAGES_COLLECTING);
        this.x = 200 + Math.random() * 1500;
        this.y = 150 + Math.random() * 100;
    }

    // playCollectAnimation() {
    //     setInterval(() => {
    //         this.playAnimation(this.IMAGES_COLLECTING);
    //     }, 50);
    // }
}