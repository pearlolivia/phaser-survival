import { Physics, Input } from "phaser";
import { game } from "../consts";

export default class Cow extends Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame } = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);

        const { Body, Bodies } = Physics.Matter.Matter;
        const cowCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: 'cowCollider' });
        const compoundBody = Body.create({
            parts: [cowCollider],
            friction: 0,
            // isStatic: true,
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();
    }

    static preload(scene) {
        scene.load.atlas('white_cow', 'assets/images/cows/white-cows/white_cow.png', 'assets/images/cows/white-cows/white_cow_atlas.json');
        scene.load.animation('white_cow_anim', 'assets/images/cows/white-cows/white_cow_anim.json');
    }

    get velocity () {
        return this.body.velocity;
    }
    
    static update(cow) {
        const { cowSpeed } = game;
        let cowVelocity = new Phaser.Math.Vector2();

        // randomise movement + when cow hits map edge turn around
        // stop cow moving when player nearby
        cowVelocity.x = 1;
        cowVelocity.y = 0;

        cowVelocity.normalize();
        cowVelocity.scale(cowSpeed);
        cow.setVelocity(cowVelocity.x, cowVelocity.y);
        cow.anims.play('white_cow_walk', true);
    }
}