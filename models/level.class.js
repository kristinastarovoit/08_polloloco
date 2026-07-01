class Level {
    enemies;
    clouds;
    backgroundObjects;
    statusBars;
    level_end_x = 2100;

    constructor(enemies, clouds, backgroundObjects, statusBars) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.statusBars = statusBars;
        }
}