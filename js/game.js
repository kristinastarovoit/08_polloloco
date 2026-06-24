let canvas;
let world;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    world = new World(canvas); // übergibt canvas in constructor von Worlds

    console.log('my character is', world.character);
}
