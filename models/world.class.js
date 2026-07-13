class World {
    character = new Character();
    canvas;
    ctx;
    keyboard;
    healthBar;
    bottleBar;
    coinBar;
    camera_x = 0;
    throwableObjects = [];
    bossBarActivated = false;

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.draw();
        this.setWorld();
        this.run();
        this.healthBar = this.level.statusBars[0];
        this.bottleBar = this.level.statusBars[1];
        this.coinBar = this.level.statusBars[2];
        this.bossBar = this.level.bossBar;
    }

    /**
    * Assigns the world instance to the character, enabling
    * cross‑access to shared game state such as keyboard input.
    */
    setWorld() {
        this.character.world = this; // Kreuzreferenz für keyboard
    }

    /**
     * Runs the main game loop at 50 FPS and triggers all core
     * collision checks, state updates, and win/lose conditions.
     */
    run() {
        setInterval(() => {
            this.checkEnemyCollisions();
            this.checkCollectableCollision();
            this.checkBottleEnemyCollision();
            this.checkDeadEnemies();
            this.checkEndbossPulled();
            this.checkGameOver();
            this.checkWin();
        }, 1000 / 50)
    }

    /**
    * Throws a bottle if enough resources are available, creating a new
    * throwable object and updating the bottle counter UI accordingly.
    */
    throwBottle() {
        if (this.character.bottles >= 20) {
            let bottle = new ThrowableObject(this.character.x, this.character.y, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.character.bottles -= 20;
            this.bottleBar.setPercentage(this.character.bottles);
        }
    }

    /**
    * Checks collisions between the character and all active enemies
    * and delegates the outcome to the appropriate collision handler.
    */
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead() && this.character.isColliding(enemy)) {
                this.resolveCollision(enemy);
            }
        });
    };

    /**
    * Determines whether the character hit the enemy from above
    * or collided normally, then triggers the matching response.
    */
    resolveCollision(enemy) {
        if (this.character.isCollidingTopToBottom(enemy)) {
            this.handleJumpOnEnemy(enemy);
        } else {
            this.handlePlayerHit(enemy);
        }
    };

    /**
 * Applies damage to the enemy when jumped on, updates boss UI if needed,
 * and adjusts the character’s vertical position and bounce effect.
 */
    handleJumpOnEnemy(enemy) {
        enemy.hit(this.character.dmg);
        SoundHub.playSound(SoundHub.CHICKEN_DEAD);
        if (enemy instanceof Endboss) {
            this.bossBar.setPercentage(enemy.energy);
        };
        let enemyTopHitbox = enemy.y + enemy.offset.top;
        this.character.y = enemyTopHitbox - this.character.height + this.character.offset.bottom;
        this.character.speedY = 20;
    };

    /**
 * Applies damage to the character when hit by an enemy
 * and updates the health bar accordingly.
 */
    handlePlayerHit(enemy) {
        SoundHub.playSound(SoundHub.CHARACTER_HURT);
        this.character.hit(enemy.dmg);
        this.healthBar.setPercentage(this.character.energy);
    };

    /**
 * Marks newly dead enemies, plays their death sound once,
 * disables their movement/damage, and removes them after a short delay.
 */
    checkDeadEnemies() {
        this.level.enemies.forEach(enemy => {
            if (enemy.isDead() && !enemy.deathTime) {
                SoundHub.playSound(SoundHub.CHICKEN_DEAD);
                enemy.deathTime = Date.now();
                enemy.speed = 0;
                enemy.dmg = 0;
            }
        });
        this.level.enemies = this.level.enemies.filter(enemy => {
            return !enemy.deathTime || Date.now() - enemy.deathTime < 1000;
        });
    }

    /**
 * Detects collisions with collectables and triggers the
 * appropriate handler before removing the collected item.
 */
    checkCollectableCollision() {
        this.level.collectables.forEach((collectable, index) => {
            if (this.character.isColliding(collectable)) {
                if (collectable instanceof Coin) {
                    this.handleCoinCollect();
                }
                if (collectable instanceof Bottle) {
                    this.handleBottleCollect();
                }
                this.level.collectables.splice(index, 1);
            }
        });
    }

    /**
    * Handles coin collection by playing a sound,
    * increasing the coin count, and updating the UI.
    */
    handleCoinCollect() {
        SoundHub.playSound(SoundHub.COIN_COLLECT);
        this.character.coins += 20;
        this.coinBar.setPercentage(this.character.coins);
    }

    /**
     * Handles bottle collection by playing a sound,
     * increasing the bottle count, and updating the UI.
     */
    handleBottleCollect() {
        SoundHub.playSound(SoundHub.BOTTLE_COLLECT);
        this.character.bottles += 20;
        this.bottleBar.setPercentage(this.character.bottles);
    }

    /**
    * Checks collisions between thrown bottles and enemies,
    * applies damage, updates boss UI, and removes the bottle.
    */
    checkBottleEnemyCollision() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bottle.isColliding(enemy) && !bottle.bottleHit) {
                    this.handleBottleEnemyHit(enemy, bottle);
                    if (enemy instanceof Endboss) {
                        this.bossBar.setPercentage(enemy.energy);
                    }
                    this.removeBottleAfterThrow(bottleIndex);
                }
            });
        });
    }

    /**
    * Removes a thrown bottle shortly after impact
    * to allow hit animations or effects to finish.
    */
    removeBottleAfterThrow(bottleIndex) {
        setTimeout(() => {
            this.throwableObjects.splice(bottleIndex, 1);
        }, 100);
    }

    /**
    * Applies bottle damage to an enemy, marks the bottle as used,
    * and plays the corresponding hit/death sounds.
    */
    handleBottleEnemyHit(enemy, bottle) {
        SoundHub.playSound(SoundHub.BOTTLE_HIT);
        bottle.bottleHit = true;
        enemy.hit(bottle.dmg);
        SoundHub.playSound(SoundHub.CHICKEN_DEAD);
    }

    /**
    * Activates the endboss encounter when the character reaches
    * the trigger zone, enabling boss UI and alert behavior.
    */
    checkEndbossPulled() {
        if (this.character.pulledEndboss()) {
            this.bossBarActivated = true;
            this.level.enemies.forEach(enemy => {
                if (enemy instanceof Endboss) {
                    if (enemy.state === 'WALKING') {
                        enemy.activateAlert();
                        SoundHub.playSound(SoundHub.ENDBOSS_ATTACK);
                    }
                }
            });
        }
    }

    /**
    * Clears the canvas, applies camera translation, draws all world objects
    * (background, character, moveables), then restores the camera and draws
    * fixed UI elements. Continuously re-renders via requestAnimationFrame.
    */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.drawMoveableObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.level.statusBars);
        if (this.bossBarActivated) {
            this.addToMap(this.level.bossBar);
        }
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
    * Draws all moveable world objects such as enemies, clouds,
    * collectables, and thrown bottles.
    */
    drawMoveableObjects() {
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.collectables);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
    * Iterates over a list of objects and draws each one.
    */
    addObjectsToMap(objects) {
        objects.forEach(o =>
            this.addToMap(o)
        )
    }


    /**
     * Draws a single object, flipping it horizontally if needed for character and bottle.
     */
    addToMap(moveableObject) {
        //  moveableObject.drawFrame(this.ctx);

        if (moveableObject.otherDirection) {
            this.flipImage(moveableObject)
        } else {
            moveableObject.draw(this.ctx);
        }
    }

    /**
    * Flips an object horizontally by translating to its center,
    * scaling the canvas, drawing the image, and restoring state.
    */
    flipImage(moveableObject) {
        this.ctx.save();
        this.ctx.translate(moveableObject.x + moveableObject.width / 2, moveableObject.y);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(
            moveableObject.img, -moveableObject.width / 2, 0, moveableObject.width, moveableObject.height);
        this.ctx.restore();
    }

    /**
    * Triggers the game‑over sequence when the character dies:
    * shows the screen, stops sounds, and clears intervals.
    */
    checkGameOver() {
        if (this.character.isDead()) {
            setTimeout(() => {
                showGameoverScreen();
                SoundHub.stopAllSounds();
            }, 1000);
            setTimeout(() => {
                this.clearAllIntervals();
            }, 1500);
        }
    }

    /**
    * Checks whether the endboss has been defeated and,
    * if so, triggers the win sequence and cleanup.
    */
    checkWin() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && enemy.isDead()) {
                setTimeout(() => {
                    showWinScreen();
                    SoundHub.stopAllSounds();
                }, 1000);
                setTimeout(() => {
                    this.clearAllIntervals();
                }, 1500);
            }
        })
    }

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }
}