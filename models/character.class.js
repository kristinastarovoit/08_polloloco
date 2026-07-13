class Character extends MoveableObject {
    width = 100;
    height = 196;
    y = 235;
    speed = 8;
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
    isDeadSoundPlayed = false;
    isSnoringSoundPlayed = false;
    movementInterval;

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
        this.handleMovement();
        this.isWalkingSoundPlaying = false;
        this.startMovementSoundLoop();
        this.startAnimation()
    }

    startMovementSoundLoop() {
        setInterval(() => {
            this.updateWalkSound();
        }, 1000 / 30);
    }

    updateWalkSound() {
        const walking = this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
        if (walking && !this.isWalkingSoundPlaying) {
            SoundHub.playSound(SoundHub.CHARACTER_WALK);
            this.isWalkingSoundPlaying = true;
            SoundHub.CHARACTER_WALK.onended = () => {
                this.isWalkingSoundPlaying = false;
            };
        }
        if (!walking && this.isWalkingSoundPlaying) {
            SoundHub.CHARACTER_WALK.pause();
            this.isWalkingSoundPlaying = false;
        }
    }

    updateLastMoveTime() {
        this.lastMoveTime = Date.now();
    }

    handleMovement() {
        this.lastMoveTime = Date.now();
        this.movementInterval = setInterval(() => {
            this.handleHorizontalMovement();
            this.handleJumpMovement();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }


    handleHorizontalMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.otherDirection = false;
            this.moveRight();
            this.updateLastMoveTime();
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.otherDirection = true;
            this.moveLeft();
            this.updateLastMoveTime();
        }
    }

    handleJumpMovement() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.updateLastMoveTime();
        }
    }

    startAnimation() {
        setInterval(() => {
            this.handleAllAnimations();
        }, 200);
    }

    handleAllAnimations() {
        const inactiveTime = Date.now() - this.lastMoveTime;
        if (this.isDead()) {
            this.playDeadAnimation();
        } else if (this.isHurt()) {
            this.playHurtAnimation();
        } else if (this.isAboveGround()) {
            this.playJumpAnimation();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playWalkAnimation();
        } else if (inactiveTime > 10000) {
            this.playInactiveAnimation();
        } else {
            this.playIdleAnimation();
        }
    }

    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DYING);
        clearInterval(this.movementInterval);
    }

    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURTING);
        this.stopSnoring();
    }

    playJumpAnimation() {
        this.playAnimation(this.IMAGES_JUMPING);
        this.stopSnoring();
    }

    playWalkAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.stopSnoring();
    }

    playInactiveAnimation() {
        this.playAnimation(this.IMAGES_INACTIVE);
        if (!this.isSnoringSoundPlayed) {
            SoundHub.CHARACTER_SNORE.loop = true;
            SoundHub.playSound(SoundHub.CHARACTER_SNORE);
            this.isSnoringSoundPlayed = true;
        }
    }

    playIdleAnimation() {
        this.playAnimation(this.IMAGES_IDLE);
        this.stopSnoring();
    }

    stopSnoring() {
        SoundHub.CHARACTER_SNORE.pause();
        this.isSnoringSoundPlayed = false;
    }

    hit(dmg) {
        if (!this.isHurt()) {
            this.energy -= dmg;
            if (this.energy < 0) {
                this.energy = 0;
            }
            if (this.isDead()) {
                if (!this.isDeadSoundPlayed) {
                    SoundHub.playSound(SoundHub.CHARACTER_DEAD);
                    this.isDeadSoundPlayed = true;
                } return;
            }
            this.lastHit = new Date().getTime();
        }
    }

    pulledEndboss() {
        return this.x >= 2200;
    }
}

