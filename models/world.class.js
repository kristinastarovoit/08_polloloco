class World {
    character = new Character();
    level = level1;
    // enemies = level1.enemies;
    // clouds = level1.clouds;
    // backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }
    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    console.log('Collision with character', enemy);
                }
            });
        }, 200)
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);

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
        // Zeichne relativ zum neuen Ursprung (Mitte linksbündig)
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