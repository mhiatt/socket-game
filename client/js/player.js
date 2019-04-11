import stage from './stage';

class Player {
    constructor() {
        this.sheet = PIXI.loader.resources['playerSheet'].spritesheet;
        // this.sprite = new PIXI.Sprite(PIXI.loader.resources['playerSheet'].textures['SouthWalk1']);
        this.sprite = new PIXI.extras.AnimatedSprite(this.sheet.animations['walkNorth']);

        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(renderer.width * 0.2, renderer.height * 0.4);
        this.sprite.scale.set(2.4, 2.4);

        this.keyState = {32: false, 37: false, 38: false, 39: false, 40: false};
        this.keyCodes = {37: -1, 38: -1, 39: 1, 40: 1};

        this.directionX = 0;
        this.directionY = 0;
        this.speed = 10;

        this.fireSpeed = 10;
        this.fireCooldown = 0;

        this.mouse = {
            x: 0,
            y: 0
        };

        stage.addChild(this.sprite);

        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
        window.addEventListener('mousemove', this.mouseMove.bind(this));
    }

    update() {
        let nextX = this.sprite.position.x + this.directionX * this.speed;
        let nextY = this.sprite.position.y + this.directionY * this.speed;

        // Prevent from leaving the screen
        if (nextX > 0 && nextX < renderer.width) {
            this.sprite.position.x = nextX;
        }
        if (nextY > 0 && nextY < renderer.height) {
            this.sprite.position.y = nextY;
        }

        //  this.updateFire();
        this.updatePlayerDirection();
    }

    updateFire() {
        if (this.fireCooldown < this.fireSpeed)
            this.fireCooldown++;

        if (this.keyState[32] && this.fireCooldown >= this.fireSpeed)
        {
            let rocket = new Rocket(this.sprite.position.x, this.sprite.position.y);
            this.fireCooldown = 0;
        }
    }

    onKeyDown(key) {
        this.keyState[key.keyCode] = true;

        if (key.keyCode === 37) {
            this.sprite.textures = this.sheet.animations['walkWest'];
            this.sprite.play();
            this.directionX = this.keyCodes[key.keyCode];
        } else if (key.keyCode === 39) {
            this.sprite.textures = this.sheet.animations['walkEast'];
            this.sprite.play();
            this.directionX = this.keyCodes[key.keyCode];
        } else if (key.keyCode == 38) {
            this.sprite.textures = this.sheet.animations['walkNorth'];
            this.sprite.play();
            this.directionY = this.keyCodes[key.keyCode];
        } else if (key.keyCode === 40) {
            this.sprite.textures = this.sheet.animations['walkSouth'];
            this.sprite.play();
            this.directionY = this.keyCodes[key.keyCode];
        } else if (key.keyCode === 32) {
            this.death();
        }
    }

    onKeyUp(key) {
        this.keyState[key.keyCode] = false;

        if (!this.keyState[37] && this.keyState[39])
            this.directionX = this.keyCodes[39];
        else if (this.keyState[37] && !this.keyState[39])
            this.directionX = this.keyCodes[37];
        else {
            this.directionX = 0;
            // this.sprite.stop();
        }

        if (!this.keyState[38] && this.keyState[40]) {
            this.directionY = this.keyCodes[40];
        } else if (this.keyState[38] && !this.keyState[40]) {
            this.directionY = this.keyCodes[38];
            // this.sprite.stop();
        } else {
            this.directionY = 0;
            // this.sprite.stop();
        }
    }

    mouseMove(event) {
        this.mouse.bounds = stage.getBounds();

        this.mouse.x = event.pageX - this.mouse.bounds.left - scrollX;
        this.mouse.y = event.pageY - this.mouse.bounds.top - scrollY;
    }

    updatePlayerDirection() {
        const dx =  this.sprite.position.x - this.mouse.x;
        const dy = this.sprite.position.y - this.mouse.y;
        let radians = Math.atan2(dy, dx);

        // http://www.somethinghitme.com/2013/11/13/snippets-i-always-forget-movement/

        // this.sprite.rotation = radians;
    }



    death() {
        this.sprite.textures = this.sheet.animations['death'];
        this.sprite.play();
        this.sprite.onComplete = () => {
            this.sprite.stop();
        } ;
    }
}

export default Player;
