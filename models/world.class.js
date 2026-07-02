class World {
    character = new Character();
    level = level1;
    // enemies = level1.enemies;
    // clouds = level1.clouds;
    // backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx;
    keyboard;
    healthBar;
    bottleBar;
    coinBar;
    camera_x = 0;
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.healthBar = this.level.statusBars[0]; // erkennt die einzelnen StatusBars
        this.bottleBar = this.level.statusBars[1];
        this.coinBar = this.level.statusBars[2];
    }
    setWorld() {
        this.character.world = this; // Kreuzreferenz für keyboard
    }

    run() {
        setInterval(() => {
            this.checkEnemyCollisions();
            this.checkCollectableCollision();
            this.checkBottleEnemyCollision();
        }, 1000 / 50)
    }

    // erstellt bottle wenn D gedrückt wird und der Character mindestens 20 Flaschen hat
    throwBottle() {
        if (this.character.bottles >= 20) {
            let bottle = new ThrowableObject(this.character.x, this.character.y);
            this.throwableObjects.push(bottle);
            this.character.bottles -= 20;
            this.bottleBar.setPercentage(this.character.bottles);
        }
    }

    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                // console.log('Collision with character', enemy);
                this.character.hit(enemy.dmg);
                console.log('energy is', this.character.energy);
                this.healthBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollectableCollision() {
        this.level.collectables.forEach((collectable, index) => {
            if (this.character.isColliding(collectable)) {
                if (collectable instanceof Coin) {
                    this.character.coins += 20;
                    this.coinBar.setPercentage(this.character.coins);
                }
                if (collectable instanceof Bottle) {
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
                if (bottle.isColliding(enemy)) {
                    enemy.hit();
                    bottle.bottleHit = true;
                    bottle.lastHit = new Date().getTime();
                    setTimeout(() => {
                        this.throwableObjects.splice(bottleIndex, 1);
                    }, 100);
                }
            });
        });
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
        moveableObject.drawFrame(this.ctx);

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