import * as Phaser from 'phaser';
import { GameScene } from './game';

export class Entity extends Phaser.GameObjects.Sprite {
  displacement: number = 32;
  scene: GameScene;

  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData('type', type);
  }
}

export class Player extends Entity {
  scene: GameScene;

  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');

    this.setData('speed', 32);
  }

  moveUp() {
    this.y -= this.displacement;
  }
  moveRight() {
    this.x += this.displacement;
  }
  moveDown() {
    this.y += this.displacement;
  }
  moveLeft() {
    this.x -= this.displacement;
  }

  update() {
  }
}