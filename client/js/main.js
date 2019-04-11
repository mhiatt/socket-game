import stage from './stage';
import Player from './player';

/*****************************************************

                    Main.js

*****************************************************/

var cloudManager;
var player;

PIXI.loader
    .add('rocket', '../images/rocket.png')
    .add('playerSheet', '../images/playerSheet.json')
    .load(init);


function init()
{
    renderer.backgroundColor = 0x22A7F0;

    player = new Player();

    renderer.render(stage);

    loop();
}

function loop()
{
    player.update();

    requestAnimationFrame(loop);
    renderer.render(stage);
}
