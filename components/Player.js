import { Physics, Input } from "phaser";
import { game } from "../consts";

export default class Player extends Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame } = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);
    }

    static preload(scene) {
        scene.load.atlas('female', 'assets/images/female.png', 'assets/images/female_atlas.json');
        scene.load.animation('female_anim', 'assets/images/female_anim.json');
    }

    get velocity () {
        return this.body.velocity;
    }
    static update(scene, player) {
        const { playerSpeed } = game;
        let playerVelocity = new Phaser.Math.Vector2();

        player.anims.play('idle', true);
        if (scene.inputKeys.left.isDown) {
            playerVelocity.x = -1;
        } else if (scene.inputKeys.right.isDown) {
            playerVelocity.x = 1;
        }

        if (scene.inputKeys.up.isDown) {
            playerVelocity.y = -1;
        } else if (scene.inputKeys.down.isDown) {
            playerVelocity.y = 1;
        }
        playerVelocity.normalize();
        playerVelocity.scale(playerSpeed);
        player.setVelocity(playerVelocity.x, playerVelocity.y);

        // if player is moving
        if (Math.abs(player.velocity.x) > 0.1 || Math.abs(player.velocity.y) > 0.1) {
            player.anims.play('walk', true); // FIX
        } else {
            player.anims.play('idle', true);
        }
    }
}