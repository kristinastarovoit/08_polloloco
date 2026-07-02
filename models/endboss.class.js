class Endboss extends MoveableObject {
    height = 350;
    width = 408;
    y = 100;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    offset = {
        top: 90,
        right: 33,
        bottom: 16,
        left: 13
    };
    energy = 80;

    constructor() {
        super();
        this.loadImg(this.IMAGES_WALKING[0]); //wieso hier mit super und drunter mit this?
        this.loadImgs(this.IMAGES_WALKING);
        this.loadImgs(this.IMAGES_DEAD);
        this.x = 2000;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 1000 / 10);
    }
}