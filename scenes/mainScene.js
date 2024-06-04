import { Scene, Physics, Input, Math } from 'phaser';
import Player from '../components/Player';
// import { game } from "../consts";

export default class MainScene extends Scene {
    constructor() {
        super('MainScene');
        this.player = null;
    }

    init(data) {

    }

    preload() {
        Player.preload(this);
    }

    create() {
        this.inputKeys = this.input.keyboard.addKeys({
            up: Input.Keyboard.KeyCodes.W,
            down: Input.Keyboard.KeyCodes.S,
            left: Input.Keyboard.KeyCodes.A,
            right: Input.Keyboard.KeyCodes.D,
        });

        this.player = new Player({
            scene: this,
            x: 0,
            y: 0,
            texture: 'female',
            frame: 'princess_idle_1',
        }); // create sprite

        this.add.existing(this.player); // render
    }
    
    update (time, delta) {
        Player.update(this, this.player);
    }
}