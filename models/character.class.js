class Character extends MoveableObject {
    width = 100;
    height = 196;
    y = 235;
    speed = 10;
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_INACTIVE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURTING = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DYING = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    offset = {
        top: 88,
        right: 30,
        bottom: 12,
        left: 22
    }
    world;
    coins;
    bottles;
    dmg = 10;
    lastMoveTime;

    constructor() {
        super();
        this.loadImg('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImgs(this.IMAGES_IDLE);
        this.loadImgs(this.IMAGES_INACTIVE);
        this.loadImgs(this.IMAGES_WALKING);
        this.loadImgs(this.IMAGES_JUMPING);
        this.loadImgs(this.IMAGES_HURTING);
        this.loadImgs(this.IMAGES_DYING);
        this.coins = 0;
        this.bottles = 0;
        this.applyGravity();
        this.animate();
    }

    animate() {
        this.lastMoveTime = Date.now();

        const movement = setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.otherDirection = false;
                this.moveRight();
                this.lastMoveTime = Date.now();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.otherDirection = true;
                this.moveLeft();
                this.lastMoveTime = Date.now();
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.lastMoveTime = Date.now();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            const inactiveTime = Date.now() - this.lastMoveTime;
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DYING);
                clearInterval(movement);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURTING);
            }
            else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);

            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // Walk animation
                this.playAnimation(this.IMAGES_WALKING);
            }
            else if (inactiveTime > 10000) {
                // 5 Sekunden nichts gemacht → Spezial-Idle
                this.playAnimation(this.IMAGES_INACTIVE);
            }
            else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 200);
    }

    hit(dmg) {
        if (!this.isHurt()) { // immunity für eine sekunde
            this.energy -= dmg;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime(); //Zeitpunkt der Verletzung in Zahlenform gespeichert
            }
        }
    }
    pulledEndboss() {
        return this.x >= 1700;
    }
}

