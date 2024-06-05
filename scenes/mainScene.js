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
        // this.load.image('tiles', 'assets/images/RPG Nature Tileset.png');
        // this.load.tilemapTiledJSON('map', 'assets/images/map.json');
        this.load.image('water', 'assets/images/moo-moo-juice/Water.png');
        this.load.image('grass', 'assets/images/moo-moo-juice/Grass.png');
        this.load.image('biome', 'assets/images/moo-moo-juice/Basic_Grass_Biom_things.png');
        this.load.image('dirt', 'assets/images/moo-moo-juice/Tilled_Dirt.png');
        this.load.tilemapTiledJSON('map', 'assets/images/moo-moo-juice/map.json');

        this.load.atlas('chest', 'assets/images/chest/chest.png', 'assets/images/chest/chest_atlas.json');
        this.load.animation('chest_anim', 'assets/images/chest/chest_anim.json');
    }

    create() {
        const map = this.add.tilemap('map');
        // png name + loaded image key + px width + height + x + y
        const waterTileset = map.addTilesetImage('Water', 'water', 16, 16, 0, 0);
        const grassTileset = map.addTilesetImage('Grass', 'grass', 16, 16, 0, 0);
        const biomeTileset = map.addTilesetImage('Basic_Grass_Biom_things', 'biome', 16, 16, 0, 0);
        const dirtTileset = map.addTilesetImage('Tilled_Dirt', 'dirt', 16, 16, 0, 0);

        // layer name in map + created tileset + x + y
        const layer1 = map.createLayer('Water', waterTileset, 0, 0);
        const layer2 = map.createLayer('Island', grassTileset, 0, 0);
        const layer3 = map.createLayer('Island Edges', grassTileset, 0, 0);
        const layer4 = map.createLayer('Nature', biomeTileset, 0, 0);
        const layer5 = map.createLayer('Tilled Ground', dirtTileset, 0, 0);

        layer3.setCollisionByProperty({ collides: true });
        layer4.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(layer3);
        this.matter.world.convertTilemapLayer(layer4);

        this.inputKeys = this.input.keyboard.addKeys({
            up: Input.Keyboard.KeyCodes.W,
            down: Input.Keyboard.KeyCodes.S,
            left: Input.Keyboard.KeyCodes.A,
            right: Input.Keyboard.KeyCodes.D,
        });

        this.deliveryBin = new Physics.Matter.Sprite(
            this.matter.world,
            350,
            200,
            'chest',
            'chest_sprite_0',
            {
                label: 'chest',
                isStatic: true,
                circleRadius: 12,
                onCollideCallback: () => this.deliveryBin.anims.play('open'),
                onCollideEndCallback: () => this.deliveryBin.anims.play('close'),
            }
        );
        this.deliveryBin.setSize(12, 12);

        this.player = new Player({
            scene: this,
            x: 150,
            y: 150,
            texture: 'female',
            frame: 'princess_idle_1',
        }); // create sprite

        this.testPlayer = new Player({
            scene: this,
            x: 200,
            y: 300,
            texture: 'female',
            frame: 'princess_idle_1',
        });

        this.add.existing(this.player); // render player
        this.add.existing(this.deliveryBin);

        // this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
        //     console.log(event, bodyA, bodyB);
        // })
    }
    
    update (time, delta) {
        Player.update(this, this.player);
    }
}