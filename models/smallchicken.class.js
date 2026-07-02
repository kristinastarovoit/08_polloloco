class SmallChicken extends Chicken {
    height = 45;
    width = 45;
    y = 375;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    offset = {
        top: 3,
        right: 4,
        bottom: 6,
        left: 4
    };
    energy = 10;
    dmg = 5;

    constructor() {
        super();
        this.loadImg('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImgs(this.IMAGES_WALKING);
        this.speed = 0.25 + Math.random() * 0.25;
    }


}