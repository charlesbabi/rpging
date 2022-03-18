class Sprite {
    constructor(config) {
        this.image = new Image();
        this.image.src = config.image;
        this.image.onload = () => {
            this.isLoaded = true;
        };

        //Shadows
        this.shadow = new Image();
        this.useShadow = config.useShadow || true;
        if (this.useShadow) {
            this.shadow.src = "./assets/images/characters/shadow.png";
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        };

        //Configuracion de la animacion y estado inicial
        this.animations = config.animations || {
            "idle-down": [[0, 0]],
            "idle-up": [[0, 2]],
            "idle-left": [[0, 3]],
            "idle-right": [[0, 1]],
            "walk-down": [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
            ],
            "walk-right": [
                [0, 1],
                [1, 1],
                [2, 1],
                [3, 1],
            ],
            "walk-up": [
                [0, 2],
                [1, 2],
                [2, 2],
                [3, 2],
            ],
            "walk-left": [
                [0, 3],
                [1, 3],
                [2, 3],
                [3, 3],
            ],
        };
        this.currentAnimation = config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;

        this.animationFrameLimit = config.animationFrameLimit || 16;
        this.animationFrameProgress = this.animationFrameLimit;

        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][
            this.currentAnimationFrame
        ];
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress() {
        //down tick frame progeress
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress--;
            return;
        }

        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if (this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
    }

    draw(ctx) {
        const x = this.gameObject.x - 8;
        const y = this.gameObject.y - 18;

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

        const [frameX, frameY] = this.frame;

        if (this.isLoaded) {
            ctx.drawImage(
                this.image,
                frameX * 32,
                frameY * 32,
                32,
                32,
                x,
                y,
                32,
                32
            );
        }

        this.updateAnimationProgress();
    }
}
