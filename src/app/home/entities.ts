import * as Phaser from 'phaser';
import { GameScene } from './game';
import { GAME_KEYS, SPEED } from './helpers';

export class Entity extends Phaser.GameObjects.Sprite {
  speed: number;
  scene: GameScene;

  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData('type', type);

    this.speed = SPEED;
  }
}

export class Player extends Entity {
  // direction: string;
  scene: GameScene;

  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'player');

    // this.direction = '';
  }

  moveUp() {
    this.body.velocity.y = -this.speed;
  }
  moveRight() {
    this.body.velocity.x = this.speed;
  }
  moveDown() {
    this.body.velocity.y = this.speed;
  }
  moveLeft() {
    this.body.velocity.x = -this.speed;
  }

  stopSpeed(keyCode) {
    if (keyCode == GAME_KEYS.LEFT || keyCode == GAME_KEYS.RIGHT) {
      this.body.velocity.x = 0;
    } else if (keyCode == GAME_KEYS.UP || keyCode == GAME_KEYS.DOWN) {
      this.body.velocity.y = 0;
    }
  }

  update() {
  }
}

export class Rock extends Entity {
  scene: GameScene;

  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'rock');
  }

  fall() {
    this.body.velocity.y = this.speed;
  }
}