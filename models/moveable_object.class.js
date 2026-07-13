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
            if (this instanceof Character && this.y > 235) {
                this.y = 235;
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 235;
        }
    }

    isColliding(moveableObject) {
        return this.x + this.width - this.offset.right > moveableObject.x + moveableObject.offset.left &&
            this.y + this.height - this.offset.bottom > moveableObject.y + moveableObject.offset.top &&
            this.x + this.offset.left < moveableObject.x + moveableObject.width - moveableObject.offset.right &&
            this.y + this.offset.top < moveableObject.y + moveableObject.height - moveableObject.offset.bottom;
    }

    isCollidingTopToBottom(moveableObject) {
        if (!this.isColliding(moveableObject)) {
            return false;
        }
        if (this.speedY >= 0) {
            return false;
        }
        let characterBottom = this.y + this.height - this.offset.bottom;
        let enemyTop = moveableObject.y + moveableObject.offset.top;
        let enemyCenter = enemyTop + (moveableObject.height / 2);
        return characterBottom < enemyCenter;
    }

    hit(dmg) {
        this.energy -= dmg;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }

    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = timepassed / 1000; 
        return timepassed < 1; 
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