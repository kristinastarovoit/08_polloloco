class Level {
    enemies;
    clouds;
    backgroundObjects;
    statusBars;
    collectables;
    level_end_x = 2100;

    constructor(enemies, clouds, backgroundObjects, statusBars, collectables) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.statusBars = statusBars;
        this.collectables = collectables;
        }
}