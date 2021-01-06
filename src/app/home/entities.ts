import * as Phaser from 'phaser';
import { GameScene } from './game';
import { SPEED } from './constants';

export class Entity extends Phaser.GameObjects.Sprite {
  id: number;
  speed: number;
  scene: GameScene;

  constructor(scene, x, y, key, type, id) {
    super(scene, x, y, key);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData('type', type);
    this.id = id;

    this.speed = SPEED;
  }
}

export class Player extends Entity {
  direction: string;
  scene: GameScene;

  constructor(scene, x, y, key, id) {
    super(scene, x, y, key, 'player', id);

    this.direction = '';
  }

  move(newVelocity) {
    if (typeof this.body !== 'undefined') {
      const { x, y } = newVelocity;

      // this.body.velocity.x = x;
      // this.body.velocity.y = y;
      this.scene.physics.moveTo(this, this.x + x, this.y + y, SPEED * 2);
    }
  }

  stop(stopX, stopY) {
    if (typeof this.body !== 'undefined') {
      if (stopX) {
        this.body.velocity.x = 0;
      }

      if (stopY) {
        this.body.velocity.y = 0;
      }
    }
  }

  update() {
  }
}

export class Rock extends Entity {
  collidingSprite: number;
  isGrounded: boolean;
  scene: GameScene;

  constructor(scene, x, y, key, id) {
    super(scene, x, y, key, 'rock', id);

    this.isGrounded = false;
  }

  fall() {
    if (typeof this.body !== 'undefined') {
      this.body.velocity.y = this.speed;
    }
  }

  stop() {
    this.body.velocity.y = 0;
    this.isGrounded = true;
  }
}

export class Grass extends Entity {
  scene: GameScene;

  constructor(scene, x, y, key, id) {
    super(scene, x, y, key, 'grass', id);
  }
}