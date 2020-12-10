import * as Phaser from 'phaser';
import { Player } from './entities';

export class GameScene extends Phaser.Scene {
  player: Player;
  keyRight: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: 'game' });
  }

  preload() {
    this.load.setPath('../assets/');

    this.load.image('player', 'player.png');
  }

  create() {
    // this.player = this.physics.add.sprite(400, 300, 'player');
    this.player = new Player(this, 400, 300, 'player');

    // if (this.player.body instanceof Phaser.Physics.Arcade.Body) {
    //   this.player.body.setCollideWorldBounds(true);
    // }

    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }

  update() {
    this.player.update();

    if (this.keyRight.isDown) {
      this.player.moveRight();
    }
  }
}
