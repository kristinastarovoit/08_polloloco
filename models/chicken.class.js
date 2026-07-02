class Chicken extends MoveableObject {
    y = 360;
    height = 60;
    width = 60;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    
    offset = {
        top: 3,
        right: 4,
        bottom: 6,
        left: 4
    };
    energy = 20;
    dmg = 10;
    // isDead;

    constructor() {
        super();
        this.loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImgs(this.IMAGES_WALKING);
        this.x = 300 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            if (this.isDead()) {
                this.loadImg(this.IMAGE_DEAD)
            }
            else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}