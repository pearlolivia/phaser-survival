import { Physics, Input } from "phaser";
import { game } from "../consts";

export default class Chest extends Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame, config } = data;
        super(scene.matter.world, x, y, texture, frame, config);
        this.scene.add.existing(this);

        const { Body, Bodies } = Physics.Matter.Matter;
        const chestCollider = Bodies.rectangle(this.x, this.y, 16, 16, { ...config, isSensor: false })
        const compoundBody = Body.create({
            parts: [chestCollider],
            frictionAir: 0.35,
            isStatic: true,
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();
    }

    static preload(scene) {
        scene.load.atlas('chest', 'assets/images/chest/chest.png', 'assets/images/chest/chest_atlas.json');
        scene.load.animation('chest_anim', 'assets/images/chest/chest_anim.json');
    }
    
    static update(deliveryBin, isChestOpen) {
        if (isChestOpen === true) {
            deliveryBin.anims.play('close');
        }
        if (isChestOpen === false) {
            deliveryBin.anims.play('open');
        }
    }
}