class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', -720),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -720),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -720),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -720),
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 720),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720),
        new BackgroundObject('img/5_background/layers/air.png', 2 * 720),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2 * 720),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2 * 720),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2 * 720),
        new BackgroundObject('img/5_background/layers/air.png', 3*720),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 3*720),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 3*720),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 3*720),
    ];
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
    }
    setWorld() {
        this.character.world = this;
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
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
        if (moveableObject.otherDirection) {
            this.ctx.save();
            // Ursprung an die Position des Characters setzen -> Mitte der Breite, nicht obere linke Ecke, deshalb width / 2
            this.ctx.translate(moveableObject.x + moveableObject.width / 2, moveableObject.y);
            this.ctx.scale(-1, 1);
            // Zeichne relativ zum neuen Ursprung (Mitte linksbündig)
            this.ctx.drawImage(
                moveableObject.img, -moveableObject.width / 2, 0, moveableObject.width, moveableObject.height);
            this.ctx.restore();
        } else {
            this.ctx.drawImage(moveableObject.img, moveableObject.x, moveableObject.y, moveableObject.width, moveableObject.height);
        }

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