import { Scene, GameObjects } from 'phaser';
import { game, items } from '../consts';

export default class InventoryScene extends Scene {
    constructor() {
        super('InventoryScene');
        this.uiScale = 1.2;
        this.gridSpacing = 30;
        this.margin = 8;
        this._tileSize = 16;
        this.inventorySlots = [];
    }

    init(data) {
        let { mainScene } = data;
        this.mainScene = mainScene;
        this.inventory = mainScene.player.inventory;
        this.maxColumns = this.inventory.maxColumns;
        this.rows = this.inventory.rows;
    }

    get tileSize() {
        return this._tileSize * this.uiScale;
    }

    refresh () {
        for (let i = 0; i < this.maxColumns * this.rows; i++) {
            let x = game.width / 2 + (i * (this.tileSize + this.gridSpacing)) - ((this.maxColumns / this.uiScale) * this.tileSize);
            let y = game.height / 2 + 150;
            let inventorySlot = this.add.sprite(x, y, 'inventory_slot', 0);
            inventorySlot.setScale(this.uiScale);
            let item = this.inventory.getItem(i);
            if (item) {
                inventorySlot.item = this.add.sprite(inventorySlot.x, inventorySlot.y, 'items', items[item.name].frame);
                inventorySlot.quantityText = this.add.text(inventorySlot.x, inventorySlot.y, item.quantity, {
                    fontSize: '10px',
                    fill: '#000000',
                }).setOrigin(0.5, 0);
            }
        }
    }

    preload() {
        this.load.image('inventory_slot', 'assets/images/moo-moo-juice/inventory_slot.png');
        this.load.image('inventory_container', 'assets/images/moo-moo-juice/inventory_container.png');
        this.load.spritesheet('items', 'assets/images/items/items.png', { frameWidth: 16, frameHeight: 16 });
    }

    create() {
        this.add.sprite(game.width / 2 + 18, game.height /2 + 150, 'inventory_container', 0);
        this.refresh();
    }
};