import stage from './stage';
import Player from './playerVersion2';
import Controls from './controls';

/*****************************************************

                    Main.js

*****************************************************/

var cloudManager;
var controls;

PIXI.loader
    .add('playerSheet', '../images/playerSheet.json')
    .load(init);


function init() {
    renderer.backgroundColor = 0x22A7F0;

    controls = new Controls();

    renderer.render(stage);

    loop();
}

function loop() {
    // player.update();

    requestAnimationFrame(loop);
    renderer.render(stage);
}
