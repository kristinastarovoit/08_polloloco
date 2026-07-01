class Bottle extends DrawableObject {
    height = 80;
    width = 80;
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    offset = {
        top: 13,
        right: 21,
        bottom: 0,
        left: 21
    }
    constructor() {
        super();
        let randomImg = this.IMAGES[Math.floor(Math.random() * this.IMAGES.length)];
        this.loadImg(randomImg);
        this.x = 300 + Math.random() * 1600;
        this.y = 350;
    }
}