import stage from './stage';
import { Graphics, RenderTexture, Sprite } from 'pixi.js';

const directions = {
    NORTH: 'NORTH',
    SOUTH: 'SOUTH',
    EAST: 'EAST',
    WEST: 'WEST'
};

class Player {
    constructor() {
        const circle = new Graphics();

        circle.beginFill(0x000000);
        circle.lineStyle(0);
        circle.drawCircle(75, 75, 75)
        circle.endFill();

        const circleTexture = RenderTexture.create(circle.width, circle.height);

        renderer.render(circle, circleTexture);

        this.sprite = new Sprite(circleTexture);

        this.sprite.height = 75;
        this.sprite.width = 75;
        this.sprite.x = 100;
        this.sprite.position.set(45, renderer.height - 120);


        stage.addChild(this.sprite);
    }

    update() {

    }
}

export default Player;
