import stage from './stage';
import { Graphics, RenderTexture, Sprite } from 'pixi.js';

const directions = {
    NORTH: 'NORTH',
    SOUTH: 'SOUTH',
    EAST: 'EAST',
    WEST: 'WEST'
};

class Controls {
    constructor() {
        const circle = new Graphics();
        const circleOrigin = new Graphics();

        circle.beginFill(0x000000);
        circle.lineStyle(0);
        circle.drawCircle(75, 75, 75)
        circle.endFill();


        const circleTexture = RenderTexture.create(circle.width, circle.height);

        circleTexture.defaultAnchor.x = 0.5;
        circleTexture.defaultAnchor.y = 0.5;

        renderer.render(circle, circleTexture);

        this.sprite = new Sprite(circleTexture);

        this.sprite.height = 100;
        this.sprite.width = 100;
        this.sprite.position.set(100, renderer.height - 100);

        this.sprite.interactive = true;

        this.movement = {};
        // this.onTouch = this.onTouch.bind(this);
        // this.setAngle = this.setAngle.bind(this);

        this.cX = this.sprite.position.x;
        this.cY = this.sprite.position.y;


        // circleOrigin.beginFill(0xFEEB77);
        circleOrigin.lineStyle(2, 0xFEEB77, 1);
        circleOrigin.drawCircle(100, renderer.height - 100, 100);
        circleOrigin.endFill();

        // this.sprite.on('touchmove', (event) => {
        //     console.log(event);
        // });

        // this.sprite.on('touchend', (event) => {
        //     console.log(event);
        // });

        // this.sprite.addChild(circleOrigin);

        this.sprite.on('touchstart', this.onTouch.bind(this));
        this.sprite.on('touchmove', this.onTouch.bind(this));
        this.sprite.on('touchend', this.onTouchEnd.bind(this));

        circleOrigin.addChild(this.sprite);

        stage.addChild(circleOrigin);
    }

    update() {

    }

    onStart() {

    }

    onTouch(event) {
        event.stopPropagation();

        const touch = event.currentTarget;

        if (touch) {
            const angle = this.setAngle(this.cX, this.cY, event.data.global.x, event.data.global.y);

            let radius = Math.sqrt(Math.pow(event.data.global.x - 100, 2) + Math.pow(event.data.global.y - (renderer.height - 100), 2));
            radius = radius < 50 ? radius : 50;

            const y = radius * Math.cos(angle);
            const x = radius * Math.sin(angle);

            this.movement = {
                angle,
                radius,
                x,
                y
            };

            this.sprite.position.set(this.cX + x, this.cY - y);
        }
    }

    onTouchEnd() {
        this.sprite.position.set(this.cX, this.cY);
    }

    setAngle(cX, cY, pX, pY) {
        const angle = Math.PI / 2 + Math.atan2(pY - cY, pX - cX);

        // console.log(50 * Math.cos(angle));
        // console.log(50 * Math.sin(angle));
        return angle;
    }

    get movement() {
        return this._movement;
    }

    set movement(movement) {
        return this._movement = movement;
    }
}

export default Controls;
