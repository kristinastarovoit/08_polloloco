class SmallChicken extends Chicken {
    height = 50;
    width = 50;
    y = 375;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
    energy = 10;
    dmg = 10;

    constructor() {
        super();
        this.loadImg('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImgs(this.IMAGES_WALKING);
        this.speed = 0.25 + Math.random() * 0.25;
    }
}