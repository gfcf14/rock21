import * as Phaser from 'phaser';
import { Player, Rock } from './entities';
import { DIMENSION, GameKey } from './helpers';

export class GameScene extends Phaser.Scene {
  availableKeys: string[] = [ 'UP', 'RIGHT', 'DOWN', 'LEFT' ];
  gameKeys: typeof Phaser.Input.Keyboard.KeyCodes;
  keys: GameKey[] = [];
  player: Player;
  timer: number = 0;
  rock: Rock;

  constructor() {
    super({ key: 'game' });

    this.gameKeys = Phaser.Input.Keyboard.KeyCodes;
  }

  preload() {
    this.load.setPath('../assets/');

    this.load.image('player', 'player.png');
    this.load.image('rock', 'rock.png');
    this.load.image('explosion', 'explosion.png');
  }

  create() {
    this.player = new Player(this, 400, 300, 'player');
    this.rock = new Rock(this, 400, 0, 'rock');

    // adds all keys defined by availableKeys
    this.availableKeys.forEach(type => {
      this.keys.push(new GameKey(this.player, this, type));
    }, this);

    this.physics.add.collider(this.player, this.rock, (player: Player, rock: Rock) => {
      const { x, y } = player;

      rock.destroy();
      player.destroy();

      this.setBoom(x - DIMENSION, y - DIMENSION);
    });
  }

  setBoom(x, y) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.add.sprite(x + (DIMENSION * i), y + (DIMENSION * j), 'explosion');
      }
    }
  }

  fireEvent(keyCode) {
    switch(keyCode) {
      case this.gameKeys.UP:
        this.player.moveUp();
      break;
      case this.gameKeys.RIGHT:
        this.player.moveRight();
      break;
      case this.gameKeys.DOWN:
        this.player.moveDown();
      break;
      case this.gameKeys.LEFT:
        this.player.moveLeft();
      break;
      default:
        console.log('Non-implemented stroke');
      break;
    }
  }

  update() {
    this.timer++;

    // execute once every 12 frames
    if (this.timer % 4 == 0) {
      this.rock.fall();

      this.keys.forEach(key => {
        if (key.isPressed) {
          this.fireEvent(key.keyCode);
        }
      });
    }
  }
}
