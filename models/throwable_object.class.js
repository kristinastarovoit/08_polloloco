class ThrowableObject extends MoveableObject {
    constructor(x,y) {
        super();
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
        this.loadImg('img/6_salsa_bottle/salsa_bottle.png');
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25)
    }
}