import * as Phaser from 'phaser';
import { Player } from './entities';
import { GameKey } from './helpers';

export class GameScene extends Phaser.Scene {
  availableKeys: string[] = [ 'UP', 'RIGHT', 'DOWN', 'LEFT' ];
  keys: GameKey[] = [];
  player: Player;
  playerMovements: string[] = [ 'UP', 'RIGHT', 'DOWN', 'LEFT' ];

  constructor() {
    super({ key: 'game' });
  }

  preload() {
    this.load.setPath('../assets/');

    this.load.image('player', 'player.png');
  }

  create() {
    this.player = new Player(this, 400, 300, 'player');

    this.availableKeys.forEach((type, i) => {
      this.keys.push(new GameKey(this.player, this, type));

      this.keys[i].setDown(this.playerMovements);
    }, this);
  }

  update() {
    // if (this.keyUp.isPressed) {
    //   this.player.moveUp();
    // }

    // if (this.keyRight.isPressed) {
    //   this.player.moveRight();
    // }

    // if (this.keyDown.isPressed) {
    //   this.player.moveDown();
    // }

    // if (this.keyLeft.isPressed) {
    //   this.player.moveLeft();
    // }
  }
}
