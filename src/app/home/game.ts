import * as Phaser from 'phaser';
import { Player } from './entities';

export class GameScene extends Phaser.Scene {
  player: Player;
  keyUp: Phaser.Input.Keyboard.Key;
  keyRight: Phaser.Input.Keyboard.Key;
  keyDown: Phaser.Input.Keyboard.Key;
  keyLeft: Phaser.Input.Keyboard.Key;

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

    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    this.keyUp.on('down', e => {
      this.player.moveUp();
    });
    this.keyRight.on('down', e => {
      this.player.moveRight();
    });
    this.keyDown.on('down', e => {
      this.player.moveDown();
    });
    this.keyLeft.on('down', e => {
      this.player.moveLeft();
    });
  }

  update() {
    
  }
}
