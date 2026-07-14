class Cloud extends MoveableObject {
    y = 20;
    width = 500;
    height = 280;
    constructor() {
        super().loadImg('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 1900;
        this.animate();

    }

    /**
     * Runs a simple movement loop that continuously moves the object left
     * at a fixed update rate (60 FPS).
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}