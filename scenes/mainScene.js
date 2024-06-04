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
        this.load.image('tiles', 'assets/images/RPG Nature Tileset.png');
        this.load.tilemapTiledJSON('map', 'assets/images/map.json');
    }

    create() {
        const map = this.add.tilemap('map');
        const tileset = map.addTilesetImage('RPG Nature Tileset', 'tiles', 32, 32, 0, 0);
        const layer1 = map.createLayer('Tile Layer 1', tileset, 0, 0);
        const layer2 = map.createLayer('Tile Layer 2', tileset, 0, 0);
        const layer3 = map.createLayer('Tile Layer 3', tileset, 0, 0);

        layer1.setCollisionByProperty({ collides: true });
        layer3.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(layer1);
        this.matter.world.convertTilemapLayer(layer3);

        this.inputKeys = this.input.keyboard.addKeys({
            up: Input.Keyboard.KeyCodes.W,
            down: Input.Keyboard.KeyCodes.S,
            left: Input.Keyboard.KeyCodes.A,
            right: Input.Keyboard.KeyCodes.D,
        });

        this.player = new Player({
            scene: this,
            x: 50,
            y: 50,
            texture: 'female',
            frame: 'princess_idle_1',
        }); // create sprite

        this.testPlayer = new Player({
            scene: this,
            x: 100,
            y: 100,
            texture: 'female',
            frame: 'princess_idle_1',
        });

        this.add.existing(this.player); // render player

        this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            console.log(event, bodyA, bodyB);
        })
    }
    
    update (time, delta) {
        Player.update(this, this.player);
    }
}