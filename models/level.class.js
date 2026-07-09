class Level {
    enemies;
    clouds;
    backgroundObjects;
    statusBars;
    collectables;
    bossBar;
    level_end_x = 2100;

    constructor(enemies, clouds, backgroundObjects, statusBars, bossBar, collectables) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.statusBars = statusBars;
        this.bossBar = bossBar;
        this.collectables = collectables;
        }
}