import * as Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  character: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super({ key: 'game' });
  }

  preload() {
    this.load.setPath('../assets/');

    this.load.image('character', 'character.png');
  }

  create() {
    this.character = this.physics.add.sprite(400, 300, 'character');

    if (this.character.body instanceof Phaser.Physics.Arcade.Body) {
      this.character.body.setCollideWorldBounds(true);
    }
  }

  update() {

  }
}
