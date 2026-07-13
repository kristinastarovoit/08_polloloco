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
    bottleHit = false;
    bottleRotationIntervall;
    dmg = 20;

    constructor(x, y, otherDirection = false) {
        super();
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.otherDirection = otherDirection;
        this.loadImg('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImgs(this.IMAGES_HIT);
        this.loadImgs(this.IMAGES_ROTATING);
        this.throw();
        this.animate();
        this.checkBottleGroundHit();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();

        setInterval(() => {
            this.x += this.otherDirection ? -10 : 10;
        }, 25);
    }

    checkBottleGroundHit() {
        setInterval(() => {
            if (!this.bottleHit && this.y >= 350) {
                this.bottleHit = true;
                SoundHub.playSound(SoundHub.BOTTLE_HIT);
            }
        }, 1000 / 25);
    }

    animate() {
        setInterval(() => {
            // let now = new Date().getTime();
            if (this.bottleHit) {
                this.playAnimation(this.IMAGES_HIT);
                // if (now - this.lastHit > 20) {
                //     this.bottleHit = false;
                // }
            } else {
                this.playAnimation(this.IMAGES_ROTATING);
            }
        }, 100);
    }
}