import { Physics, Math, Input } from "phaser";
import { game } from "../consts";

export default class Player extends Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame, inputKeys } = data;
        super(scene.matter.world, x, y, texture, frame, inputKeys);
        this.scene.add.existing(this);
        this.inputKeys = null;
    }

    static preload(scene) {
        scene.load.atlas('female', 'assets/images/female.png', 'assets/images/female_atlas.json');
        scene.load.animation('female_anim', 'assets/images/female_anim.json');
    }

    static create(scene) {
        this.inputKeys = scene.input.keyboard.addKeys({
            up: Input.Keyboard.KeyCodes.W,
            down: Input.Keyboard.KeyCodes.S,
            left: Input.Keyboard.KeyCodes.A,
            right: Input.Keyboard.KeyCodes.D,
        });
    }

    update(time, delta) {
        const { playerSpeed } = game;
        let playerVelocity = new Math.Vector2();

        this.anims.play('idle', true);
        if (this.inputKeys.left.isDown) {
            playerVelocity.x = -1;
        } else if (this.inputKeys.right.isDown) {
            playerVelocity.x = 1;
        }

        if (this.inputKeys.up.isDown) {
            playerVelocity.y = -1;
        } else if (this.inputKeys.down.isDown) {
            playerVelocity.y = 1;
        }
        playerVelocity.normalize();
        playerVelocity.scale(playerSpeed);
        this.setVelocity(playerVelocity.x, playerVelocity.y);
    }
}