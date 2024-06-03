import { Scene, Physics, Input, Math } from 'phaser';
import Player from '../components/Player';

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
        Player.create(this);
        // this.inputKeys = this.input.keyboard.addKeys({
        //     up: Input.Keyboard.KeyCodes.W,
        //     down: Input.Keyboard.KeyCodes.S,
        //     left: Input.Keyboard.KeyCodes.A,
        //     right: Input.Keyboard.KeyCodes.D,
        // });

        this.player = new Player({
            scene: this,
            x: 0,
            y: 0,
            texture: 'female',
            frame: 'princess_idle_1',
            inputKeys: this.inputKeys,
        }); // create sprite

        this.add.existing(this.player); // render
    }
    
    update() {
        this.player.update();
    }
}