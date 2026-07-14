const canvas = document.getElementById('canvas');
let world;
let keyboard = new Keyboard();
let currentLevelNumber = 1;
const winScreen = document.getElementById('win_screen');
const gameOverScreen = document.getElementById('gameover_screen');
const startscreen = document.getElementById('startscreen');
const title = document.getElementById('title')
const dialog = document.getElementById('controls_dialog');
const level2Button = document.getElementById('level_2_btn');
const btnLeft = document.getElementById('btn_left');
const btnRight = document.getElementById('btn_right');
const btnJump = document.getElementById('btn_jump');
const btnThrow = document.getElementById('btn_throw');



/**
 * Starts the selected game level by initializing the world with
 * the corresponding level configuration.
 *
 * @param {number} levelNumber - The level to start (1 or 2).
 */
function startGame(levelNumber) {
    currentLevelNumber = levelNumber;
    if (levelNumber === 1) init(createLevel1());
    if (levelNumber === 2) init(createLevel2());
}

/**
 * Restarts the currently active level by resetting screens,
 * clearing intervals, and reloading the same level.
 */
function restartCurrentLevel() {
    gameOverScreen.classList.add('d_none');
    winScreen.classList.add('d_none');
    world.clearAllIntervals();
    startGame(currentLevelNumber);
}

/**
 * Initializes the game world, hides the start screen,
 * shows the canvas, loads mute state, and plays start sounds.
 *
 * @param {Object} level - The level configuration object.
 */
function init(level) {
    world = new World(canvas, keyboard, level);
    startscreen.classList.add('d_none');
    canvas.classList.remove('d_none');
    title.classList.remove('d_none');
    winScreen.classList.add('d_none');
    SoundHub.loadMuteState();
    if (!SoundHub.isMuted) {
        SoundHub.unmuteAll();
        SoundHub.playSound(SoundHub.GAME_START);
        SoundHub.playSound(SoundHub.BG_MUSIC);
    }
}

/**
 * Handles all player input for desktop (keyboard) and mobile (touch).
 * Touch events map directly to keyboard flags so movement logic stays unified.
 */
/* ---------------------- TOUCH CONTROLS ---------------------- */

btnLeft.addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
});

btnLeft.addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
});

btnRight.addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
});

btnRight.addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
});

btnJump.addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
    SoundHub.playSound(SoundHub.CHARACTER_JUMP);
});

btnJump.addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
});

btnThrow.addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.D = true;
    if (world) {
        world.throwBottle();
    }
});

btnThrow.addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.D = false;
});

/* ---------------------- KEYBOARD CONTROLS ---------------------- */
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
        if (event.repeat) return;
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

/**
 * Returns the player to the home/start screen and clears
 * all running intervals from the world.
 */
function goHome() {
    world.clearAllIntervals();  // removes win and gameoverscreen check
    startscreen.classList.remove('d_none');
    canvas.classList.add('d_none');
    gameOverScreen.classList.add('d_none');
    winScreen.classList.add('d_none');
}

/**
 * Opens the controls dialog modal.
 */
function openDialog() {
    dialog.showModal();
}

/**
 * Closes the controls dialog modal.
 */
function closeDialog() {
    const dialog = document.getElementById('controls_dialog');
    dialog.close();
}

/**
 * Displays the game‑over screen.
 */
function showGameoverScreen() {
    gameOverScreen.classList.remove('d_none');
}

/**
 * Displays the win screen and reveals the level 2 button
 * only when finishing level 1.
 */
function showWinScreen() {
    winScreen.classList.remove('d_none');
    if (currentLevelNumber === 1) {
        level2Button.classList.remove('d_none');
    } else if (currentLevelNumber === 2) {
        level2Button.classList.add('d_none');
    }
}
