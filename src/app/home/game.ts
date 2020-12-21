import * as Phaser from 'phaser';
import { Player, Rock } from './entities';
import { DIMENSION, GAME_KEYS, GameKey } from './helpers';

export class GameScene extends Phaser.Scene {
  availableKeys: string[] = [ 'UP', 'RIGHT', 'DOWN', 'LEFT' ];
  keys: GameKey[] = [];
  player: Player;
  timer: number = 0;
  rock: Rock;

  constructor() {
    super({ key: 'game' });
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
    console.log(keyCode);
    switch(keyCode) {
      case GAME_KEYS.UP:
        this.player.moveUp();
      break;
      case GAME_KEYS.RIGHT:
        this.player.moveRight();
      break;
      case GAME_KEYS.DOWN:
        this.player.moveDown();
      break;
      case GAME_KEYS.LEFT:
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
      if (typeof this.rock !== 'undefined') {
        this.rock.fall();
      }

      this.keys.forEach(key => {
        if (key.isPressed) {
          this.fireEvent(key.keyCode);
        } else {
          // this.stopMovement(key.keyCode);
        }
      });
    }
  }
}
