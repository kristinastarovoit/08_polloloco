let canvas;
let world;
let keyboard = new Keyboard();
let currentLevelNumber = 1;

function startGame(levelNumber) {
    currentLevelNumber = levelNumber;

    if (levelNumber === 1) init(createLevel1());
    if (levelNumber === 2) init(createLevel2());
    SoundHub.playSound(SoundHub.BG_MUSIC);
}

function restartCurrentLevel() {
    document.getElementById('gameover_screen').classList.add('d_none');
    document.getElementById('win_screen').classList.add('d_none');
    world.clearAllIntervals();
    startGame(currentLevelNumber);
}

function init(level) {
    canvas = document.getElementById('canvas');
    const startscreen = document.getElementById('startscreen');
    const title = document.getElementById('title')
    world = new World(canvas, keyboard, level); // übergibt canvas in constructor von World
    startscreen.classList.add('d_none');
    canvas.classList.remove('d_none');
    title.classList.remove('d_none');
    document.getElementById('win_screen').classList.add('d_none');
    SoundHub.playSound(SoundHub.GAME_START);
}

document.getElementById('btn_left').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
});

document.getElementById('btn_left').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
});

document.getElementById('btn_right').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
});

document.getElementById('btn_right').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
});

document.getElementById('btn_jump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
    SoundHub.playSound(SoundHub.CHARACTER_JUMP);
});

document.getElementById('btn_jump').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
});

document.getElementById('btn_throw').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.D = true;
    if (world) {
        world.throwBottle();
    }
});

document.getElementById('btn_throw').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.D = false;
});


window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
        SoundHub.playSound(SoundHub.CHARACTER_JUMP);
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
        if (world) {
            world.throwBottle();
        }
    }
});

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});


function goHome() {
    world.clearAllIntervals();  // removes win and gameoverscreen check
    document.getElementById('startscreen').classList.remove('d_none');
    document.getElementById('canvas').classList.add('d_none');
    document.getElementById('gameover_screen').classList.add('d_none');
    document.getElementById('win_screen').classList.add('d_none');
}

function openDialog() {
    const dialog = document.getElementById('controls_dialog');
    dialog.showModal();
}

function closeDialog() {
    const dialog = document.getElementById('controls_dialog');
    dialog.close();
}

function showGameoverScreen() {
    const gameoverScreen = document.getElementById('gameover_screen');
    gameoverScreen.classList.remove('d_none');
    canvas = document.getElementById('canvas');
}

function showWinScreen() {
    const winScreen = document.getElementById('win_screen');
    winScreen.classList.remove('d_none');
    const level2Button = document.getElementById('level_2_btn');

    if (currentLevelNumber === 1) {
        level2Button.classList.remove('d_none');
    } else if (currentLevelNumber === 2) {
        level2Button.classList.add('d_none');
    }
}
