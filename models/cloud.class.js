class Cloud extends MoveableObject {
    y = 20;
    width = 500;
    height = 280;
    constructor() {
        super().loadImg('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.animate();

    }
    animate() {
        this.moveLeft();
    }
}