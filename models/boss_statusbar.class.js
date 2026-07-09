class BossBar extends StatusBar {
    IMAGES_BOSSBAR = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];

    constructor() {
        super(500, 10, 'IMAGES_BOSSBAR', 100);
        // this.x = 500;
        // this.y = 10;
        // this.loadImgs(this.IMAGES_BOSSBAR);
    }
}