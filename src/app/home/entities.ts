import * as Phaser from 'phaser';
import { GameScene } from './game';

export class Entity extends Phaser.GameObjects.Sprite {
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

  moveRight() {
    this.body.velocity.x = this.getData('speed');
  }

  update() {
    if (this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.setVelocity(0, 0);
    }
  }
}