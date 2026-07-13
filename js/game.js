let canvas;
let world;
let keyboard = new Keyboard();
let currentLevelNumber = 1;

function startGame(levelNumber) {
    currentLevelNumber = levelNumber;

    if (levelNumber === 1) init(createLevel1());
    if (levelNumber === 2) init(createLevel2());
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
    // const gameoverScreen = document.getElementById('gameover_screen');
    // gameoverScreen.classList.add('d_none');
    // setupMobileControls();
}

// function setupMobileControls() {
//     const setupButton = (id, key) => {
//         const btn = document.getElementById(id);
//         if (btn) {
//             btn.addEventListener('touchstart', (e) => {
//                 e.preventDefault();
//                 keyboard[key] = true;
//             });
//             btn.addEventListener('touchend', (e) => {
//                 e.preventDefault();
//                 keyboard[key] = false;
//             });
//             // btn.addEventListener('touchcancel', (e) => {
//             //     e.preventDefault();
//             //     keyboard[key] = false;
//             // });
//         }
//     };

//     setupButton('btn_left', 'LEFT');
//     setupButton('btn_right', 'RIGHT');
//     setupButton('btn_jump', 'SPACE');
//     setupButton('btn_throw', 'D');
// }

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

// const fullscreen = document.getElementById('fullscreen');

// function fullscreen() {
//     const fullscreen = document.getElementById('fullscreen');
//     // const fullscreenButton = document.getElementById('fullscreen_button');
//     // fullscreenButton.classList.toggle('d_none');
//     openFullscreen(fullscreen);
// }

// function openFullscreen(element) {
//     if (element.requestFullscreen) {
//         element.requestFullscreen();
//         resizeCanvasFullscreen();
//     } else if (element.webkitRequestFullscreen) { /* Safari */
//         element.webkitRequestFullscreen();
//         resizeCanvasFullscreen();

//     } else if (element.msRequestFullscreen) { /* IE11 */
//         element.msRequestFullscreen();
//         resizeCanvasFullscreen();
//     }
// }

// function closeFullscreen() {
//     // const fullscreenButton = document.getElementById('fullscreen_button');
//     // fullscreenButton.classList.toggle('d_none');
//     if (document.exitFullscreen) {
//         document.exitFullscreen();
//         resizeCanvasNormal();
//     } else if (document.webkitExitFullscreen) { /* Safari */
//         document.webkitExitFullscreen();
//         resizeCanvasNormal();
//     } else if (document.msExitFullscreen) { /* IE11 */
//         document.msExitFullscreen();
//         resizeCanvasNormal();

//     }
// }
// function resizeCanvasFullscreen() {
//     console.log('innerWidth:', window.innerWidth, 'innerHeight:', window.innerHeight);
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     canvas.style.transform = 'translate(0, 0)';  // ← Entferne die Zentrierung
//     canvas.style.left = '0';
//     canvas.style.top = '0';
//     console.log('Canvas width:', canvas.width, 'Canvas height:', canvas.height);

//     // canvas.style.width = '100%';
//     // canvas.style.height = '100%';
// }

// function resizeCanvasNormal() {
//     canvas.width = 720;
//     canvas.height = 480;
// }

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
    // canvas.classList.add('d_none');
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

// intervalle alle stoppen, in ein array 
// function restartGame() {

//     document.getElementById('gameover_screen').classList.add('d_none');
//     document.getElementById('win_screen').classList.add('d_none');
//     world.clearAllIntervals();
//     world = new World(canvas, keyboard, createLevel1());
// }


// document.getElementById('mute_button').addEventListener("click", () => {
//     SoundHub.stopAllSounds();
// });

