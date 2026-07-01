class Bottle extends DrawableObject {
    height = 100;
    width = 100;
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]
    constructor() {
        super();
        let randomImg = this.IMAGES[Math.floor(Math.random() * this.IMAGES.length)];
        this.loadImg(randomImg);
        this.x = 300 + Math.random() * 1600;
        this.y = 330;
    }
}