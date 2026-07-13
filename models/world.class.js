class World {
    character = new Character();
    // level = createLevel1();
    // level = createLevel1();
    // enemies = level1.enemies;
    // clouds = level1.clouds;
    // backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx;
    keyboard;
    healthBar;
    bottleBar;
    coinBar;
    // bossBar;
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
        this.healthBar = this.level.statusBars[0]; // erkennt die einzelnen StatusBars
        this.bottleBar = this.level.statusBars[1];
        this.coinBar = this.level.statusBars[2];
        this.bossBar = this.level.bossBar;
        // this.bossBar = this.level.statusBars[3];
    }
    setWorld() {
        this.character.world = this; // Kreuzreferenz für keyboard
    }

    run() {
        setInterval(() => {
            this.checkEnemyCollisions();
            this.checkCollectableCollision();
            this.checkBottleEnemyCollision();
            // this.checkCharacterTopToBottomCollision();
            this.checkDeadEnemies();
            this.checkEndbossPulled();
            this.checkGameOver();
            this.checkWin();
        }, 1000 / 50)
    }


    // erstellt bottle wenn D gedrückt wird und der Character mindestens 20 Flaschen hat
    throwBottle() {
        if (this.character.bottles >= 20) {
            let bottle = new ThrowableObject(this.character.x, this.character.y, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.character.bottles -= 20;
            this.bottleBar.setPercentage(this.character.bottles);
        }
    }



    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead() && this.character.isColliding(enemy)) {
                this.resolveCollision(enemy);
            }
        });
    };

    resolveCollision(enemy) {
        if (this.character.isCollidingTopToBottom(enemy)) {
            this.handleJumpOnEnemy(enemy);
        } else {
            this.handlePlayerHit(enemy);
        }
    };

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

    handlePlayerHit(enemy) {
        SoundHub.playSound(SoundHub.CHARACTER_HURT);
        this.character.hit(enemy.dmg);
        this.healthBar.setPercentage(this.character.energy);
    };



    checkDeadEnemies() {
        this.level.enemies.forEach(enemy => {
            if (enemy.isDead() && !enemy.deathTime) {
                SoundHub.playSound(SoundHub.CHICKEN_DEAD);
                enemy.deathTime = Date.now();
                enemy.speed = 0;
                enemy.dmg = 0;
            }
        });
        // removes dead enemy after 1 second, so animation can finish
        this.level.enemies = this.level.enemies.filter(enemy => {
            return !enemy.deathTime || Date.now() - enemy.deathTime < 1000;
        });
    }


    checkCollectableCollision() {
        this.level.collectables.forEach((collectable, index) => {
            if (this.character.isColliding(collectable)) {
                if (collectable instanceof Coin) {
                    SoundHub.playSound(SoundHub.COIN_COLLECT);
                    this.character.coins += 20;
                    this.coinBar.setPercentage(this.character.coins);
                }
                if (collectable instanceof Bottle) {
                    SoundHub.playSound(SoundHub.BOTTLE_COLLECT);
                    this.character.bottles += 20;
                    this.bottleBar.setPercentage(this.character.bottles);
                }
                this.level.collectables.splice(index, 1);
            }
        });
    }

    checkBottleEnemyCollision() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bottle.isColliding(enemy) && !bottle.bottleHit) {
                    SoundHub.playSound(SoundHub.BOTTLE_HIT);
                    bottle.bottleHit = true;
                    enemy.hit(bottle.dmg);
                    SoundHub.playSound(SoundHub.CHICKEN_DEAD);
                    if (enemy instanceof Endboss) {
                        this.bossBar.setPercentage(enemy.energy);
                    }
                    setTimeout(() => {
                        this.throwableObjects.splice(bottleIndex, 1);
                    }, 100);
                }
            });
        });
    }

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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //  Kamera aktivieren
        this.ctx.translate(this.camera_x, 0);

        // Welt zeichnen
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.collectables);
        this.addObjectsToMap(this.throwableObjects);

        //  Kamera deaktivieren
        this.ctx.translate(-this.camera_x, 0);

        // fixe UI Elemente
        this.addObjectsToMap(this.level.statusBars);
        if (this.bossBarActivated) {
            this.addToMap(this.level.bossBar);
        }

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    addObjectsToMap(objects) {
        objects.forEach(o =>
            this.addToMap(o)
        )
    }

    addToMap(moveableObject) {
        //  moveableObject.drawFrame(this.ctx);

        if (moveableObject.otherDirection) {
            this.flipImage(moveableObject)
        } else {
            moveableObject.draw(this.ctx);
        }
    }

    flipImage(moveableObject) {
        this.ctx.save();
        // Ursprung an die Position des Characters setzen -> Mitte der Breite, nicht obere linke Ecke, deshalb width / 2
        this.ctx.translate(moveableObject.x + moveableObject.width / 2, moveableObject.y);
        this.ctx.scale(-1, 1);
        // Zeichnet relativ zum neuen Ursprung (Mitte linksbündig)
        this.ctx.drawImage(
            moveableObject.img, -moveableObject.width / 2, 0, moveableObject.width, moveableObject.height);
        this.ctx.restore();
    }

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

//     if (moveableObject.otherDirection) {
//         this.ctx.save();
//         this.ctx.translate(moveableObject.width, 0);
//         this.ctx.scale(-1, 1);
//         moveableObject.x = moveableObject.x * -1;
//     }
//     this.ctx.drawImage(moveableObject.img, moveableObject.x, moveableObject.y, moveableObject.width, moveableObject.height);
//     if (moveableObject.otherDirection) {
//         moveableObject.x = moveableObject.x * -1;
//         this.ctx.restore();
//     }

// draw() {
//     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     this.ctx.translate(this.camera_x, 0);
//     this.addObjectsToMap(this.level.backgroundObjects);
//     this.addToMap(this.character);
//     // this.addObjectsToMap(this.bottle);
//     this.addObjectsToMap(this.level.enemies);
//     this.addObjectsToMap(this.level.clouds);
//     this.addObjectsToMap(this.level.collectables);
//     this.addObjectsToMap(this.throwableObjects);
//     this.ctx.translate(-this.camera_x, 0); //reset camera
//     //space for fixed objects
//     this.addObjectsToMap(this.level.statusBars);
//     this.ctx.translate(this.camera_x, 0);   //reset camera
//     this.ctx.translate(-this.camera_x, 0);

//     let self = this;
//     requestAnimationFrame(function () {
//         self.draw();
//     })
// }

// checkEnemyCollisions() {
//     this.level.enemies.forEach((enemy) => {
//         if (enemy.isDead()) {
//             return;
//         }
//         if (this.character.isColliding(enemy)) {
//             if (this.character.isCollidingTopToBottom(enemy)) {
//                 enemy.hit(this.character.dmg);
//                 let enemyTopHitbox = enemy.y + enemy.offset.top;
//                 this.character.y = enemyTopHitbox - this.character.height + this.character.offset.bottom;
//                 this.character.speedY = 20;
//             }
//             else {
//                 this.character.hit(enemy.dmg);
//                 this.healthBar.setPercentage(this.character.energy);
//             }
//         }
//     });
// }

// checkEnemyCollisions() {
//     this.level.enemies.forEach((enemy) => {
//         if (enemy.isDead()) { return; }
//         if (this.character.isCollidingTopToBottom(enemy)) {
//             return;
//         }
//         if (this.character.isColliding(enemy)) {
//             this.character.hit(enemy.dmg);
//             this.healthBar.setPercentage(this.character.energy);
//         }
//     });
// }

// checkCharacterTopToBottomCollision() {
//     this.level.enemies.forEach((enemy, enemyIndex) => {
//         if (enemy.isDead()) {
//             return;
//         }
//         if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
//             if (this.character.isCollidingTopToBottom(enemy)) {
//                 enemy.hit(this.character.dmg);
//                 this.character.speedY = 20;
//             }
//         }
//     })
// }