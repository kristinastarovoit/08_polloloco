let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    const startscreen = document.getElementById('startscreen');
    const title = document.getElementById('title')
    world = new World(canvas, keyboard); // übergibt canvas in constructor von World
    startscreen.classList.add('d_none');
    canvas.classList.remove('d_none');
    title.classList.remove('d_none');
    console.log('my character is', world.character);
}

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
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
        if (world) {
            world.throwBottle();
        }
    }
    console.log(event);
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
    // console.log(event);
});

// const fullscreen = document.getElementById('fullscreen');

function fullscreen() {
    const fullscreen = document.getElementById('fullscreen');
    // const fullscreenButton = document.getElementById('fullscreen_button');
    // fullscreenButton.classList.toggle('d_none');
    openFullscreen(fullscreen);
}

function openFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
        // resizeCanvasFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
        element.webkitRequestFullscreen();
        // resizeCanvasFullscreen();

    } else if (element.msRequestFullscreen) { /* IE11 */
        element.msRequestFullscreen();
        // resizeCanvasFullscreen();
    }
}

function closeFullscreen() {
    // const fullscreenButton = document.getElementById('fullscreen_button');
    // fullscreenButton.classList.toggle('d_none');
    if (document.exitFullscreen) {
        document.exitFullscreen();
        // resizeCanvasNormal();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
        // resizeCanvasNormal();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
        // resizeCanvasNormal();

    }
}
// function resizeCanvasFullscreen() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
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