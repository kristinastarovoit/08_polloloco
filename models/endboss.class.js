class Endboss extends MoveableObject {
    height = 350;
    width = 408;
    y = 100;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
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
    energy = 100;
    triggered = false;
    speed = 120;
    state = 'WALKING';
    dmg = 20;

    constructor() {
        super();
        this.loadImg(this.IMAGES_WALKING[0]); //wieso hier mit super und drunter mit this?
        this.loadImgs(this.IMAGES_WALKING);
        this.loadImgs(this.IMAGES_ALERT);
        this.loadImgs(this.IMAGES_ATTACK);
        this.loadImgs(this.IMAGES_HURT);
        this.loadImgs(this.IMAGES_DEAD);
        this.x = 2000;
        this.animate();
    }

    activateAlert() {
        this.triggered = true;
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                this.handleAttackBehavior();
            }
        }, 200);
    }

    handleAttackBehavior() {
        const now = Date.now();

        if (this.state === 'WALKING') {
            this.playAnimation(this.IMAGES_WALKING);
            if (this.triggered) {
                this.state = 'ALERT';
                this.triggeredAt = now;
            }
        }

        else if (this.state === 'ALERT') {
            this.playAnimation(this.IMAGES_ALERT);
            // Nach 3 Sekunden in den Angriffsmodus wechseln
            if (now - this.triggeredAt >= 2000) {
                this.state = 'ATTACKING';
                this.lastAttackAt = now;
            }
        }

        else if (this.state === 'ATTACKING') {
            this.playAnimation(this.IMAGES_ATTACK);
            // Alle 5 Sekunden einen Schub nach vorne
            if (now - this.lastAttackAt >= 2500) {
                // this.x -= 120; 
                this.moveLeft();
                this.lastAttackAt = now;
            }
        }
    }

}