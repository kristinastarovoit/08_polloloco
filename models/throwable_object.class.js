class ThrowableObject extends MoveableObject {
    IMAGES_ROTATING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_HIT = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    bottleHit;
    bottleRotationIntervall;
    dmg = 20;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.loadImg('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImgs(this.IMAGES_HIT);
        this.loadImgs(this.IMAGES_ROTATING);
        this.throw();
        this.animate();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25)
    }

    animate() {
        setInterval(() => {
            let now = new Date().getTime();
            if (this.bottleHit) {
                this.playAnimation(this.IMAGES_HIT);
                if (now - this.lastHit > 20) {
                    this.bottleHit = false;
                }
            } else {
                this.playAnimation(this.IMAGES_ROTATING);
            }
        }, 100);
    }

    animateBottleHit() {
        clearInterval(this.bottleRotationIntervall);
        setInterval(() => {
            this.playAnimation(this.IMAGES_HIT);
        }, 100);
    }
}