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

        circle.beginFill(0x009900);
        circle.lineStyle(0);
        circle.drawCircle(75, 75, 75)
        circle.endFill();

        const circleTexture = RenderTexture.create(circle.width, circle.height);

        renderer.render(circle, circleTexture);

        this.sprite = new Sprite(circleTexture);

        this.sprite.height = 75;
        this.sprite.width = 75;
        this.sprite.position.set(renderer.height * 0.5, renderer.height * 0.5);

        this.lastMovement = {};

        stage.addChild(this.sprite);
    }

    update(movement) {

        if (movement !== this.lastMovement) {
            const changeX = movement.x * 0.3;
            const changeY = movement.y * 0.3;

            this.sprite.position.set(this.sprite.position.x + changeX, this.sprite.position.y - changeY);

            this.lastMovement = movement;
        }
    }
}

export default Player;
