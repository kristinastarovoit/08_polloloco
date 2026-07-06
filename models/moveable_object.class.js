class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (this.y > 235) {
                this.y = 235;
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { //throwableobject should always fall out of map
            return true;
        } else {
            return this.y < 235;
        }
    }

    // character.isColliding(chicken)
    isColliding(moveableObject) {
        return this.x + this.width - this.offset.right > moveableObject.x + moveableObject.offset.left &&
            this.y + this.height - this.offset.bottom > moveableObject.y + moveableObject.offset.top &&
            this.x + this.offset.left < moveableObject.x + moveableObject.width - moveableObject.offset.right &&
            this.y + this.offset.top < moveableObject.y + moveableObject.height - moveableObject.offset.bottom;
    }

    isCollidingTopToBottom(moveableObject) {
        // return this.x + this.width > moveableObject.x &&
        //     this.x < moveableObject.x + moveableObject.width && this.y + this.height > moveableObject.y && this.speedY < 0;
        // return this.x + this.width - this.offset.right > moveableObject.x &&
        //     this.x < moveableObject.x + moveableObject.width - moveableObject.offset.right && 
        //     this.y + this.height - this.offset.bottom > moveableObject.y && this.speedY < 0;
        return this.x + this.width - this.offset.right > moveableObject.x + moveableObject.offset.left &&
            this.x + this.offset.left < moveableObject.x + moveableObject.width - moveableObject.offset.right &&
            this.y + this.height - this.offset.bottom > moveableObject.y + moveableObject.offset.top &&
            this.speedY < 0;
    }

    hit(dmg) {
        console.log(this.constructor.name, "bekommt", dmg, "Schaden");
        this.energy -= dmg;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime(); //Zeitpunkt der Verletzung in Zahlenform gespeichert
        }
        console.log("Neue Energie:", this.energy);

    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // converts ms to seconds
        // console.log('isHurt()', { timepassed, lastHit: this.lastHit });
        return timepassed < 1; // true if last hit was less than 1 seconds ago
    }

    isDead() {
        return this.energy == 0;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}