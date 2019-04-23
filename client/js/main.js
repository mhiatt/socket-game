import stage from './stage';
import Player from './playerVersion2';
import Controls from './controls';

/*****************************************************

                    Main.js

*****************************************************/

var cloudManager;
let controls;
let player;

PIXI.loader
    .add('playerSheet', '../images/playerSheet.json')
    .load(init);


function init() {
    renderer.backgroundColor = 0x22A7F0;

    controls = new Controls();
    player = new Player();

    renderer.render(stage);

    loop();
}

function loop() {
    console.log(controls.movement);
    player.update(controls.movement);

    requestAnimationFrame(loop);
    renderer.render(stage);
}
