import Phaser from "phaser";
import { game } from "./consts";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import MainScene from "./scenes/mainScene";

const gameConfig = {
  width: game.width,
  height: game.height,
  backgroundColor: '#888888',
  type: Phaser.AUTO,
  parent: 'survival-game', // id of root div in index.html
  scene: [MainScene],
  scale: {
    zoom: 2,
  },
  physics: {
    default: 'matter',
    matter: {
      debug: true, // shows us collision borders
      gravity: { y: 0 },
    },
  },
  plugins: {
    scene: [{
      plugin: PhaserMatterCollisionPlugin,
      key: 'matterCollision',
      mapping: 'matterCollision',
    }]
  },
};

new Phaser.Game(gameConfig);
