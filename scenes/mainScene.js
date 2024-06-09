import { Scene, Input } from 'phaser';
import Player from '../components/Player';
import Cow from '../components/Cow';
import Chest from '../components/Chest';

export default class MainScene extends Scene {
    constructor() {
        super('MainScene');
        this.player = null;
        this.chestOpen = false;
        this.isPlayerNearCow = false;
    }

    init(data) {

    }

    preload() {
        // run preloaders in separate components
        Player.preload(this);
        Cow.preload(this);
        Chest.preload(this);

        // load tileset images and map json
        this.load.image('water', 'assets/images/moo-moo-juice/Water.png');
        this.load.image('grass', 'assets/images/moo-moo-juice/Grass.png');
        this.load.image('biome', 'assets/images/moo-moo-juice/Basic_Grass_Biom_things.png');
        this.load.image('dirt', 'assets/images/moo-moo-juice/Tilled_Dirt.png');
        this.load.tilemapTiledJSON('map', 'assets/images/moo-moo-juice/map.json');
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

        this.deliveryBin = new Chest({
            scene: this,
            x: 350,
            y: 200,
            texture: 'chest',
            frame: 'chest_sprite_0',
            config: {
                label: 'chest',
                isStatic: true,
                onCollideCallback: () => {
                    if (this.chestOpen === false) {
                        this.chestOpen = true;
                    }
                },
                onCollideEndCallback: () => {
                    if (this.chestOpen === true) {
                        this.chestOpen = false;
                    }
                },
            },
        });

        this.player = new Player({
            scene: this,
            x: 150,
            y: 150,
            texture: 'female',
            frame: 'princess_idle_1',
        }); // create sprite

        this.cow = new Cow({
            scene: this,
            x: 250,
            y: 250,
            texture: 'white_cow',
            frame: 'white_cow_0',
        });

        this.add.existing(this.player); // render player
        this.add.existing(this.deliveryBin);

        this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            if (bodyA.label === 'playerCollider' && bodyB.label === 'cowCollider') {
                console.log('It\'s milkin time!');
                this.isPlayerNearCow = true;
            }
        });

        this.matter.world.on('collisionend', (event, bodyA, bodyB) => {
            if (bodyA.label === 'playerCollider' && bodyB.label === 'cowCollider') {
                console.log('Got em!');
                this.isPlayerNearCow = false;
            }
        });

        this.scene.launch('InventoryScene', { mainScene: this });
    }
    
    update (time, delta) {
        Player.update(this, this.player);
        Cow.update(this.cow, this.isPlayerNearCow);
        Chest.update(this.deliveryBin, this.chestOpen);
    }
}