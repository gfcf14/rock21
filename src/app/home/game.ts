import * as Phaser from 'phaser';
import { Player, Rock } from './entities';
import { DIMENSION, getKeyByvalue, MOVE_KEYS, MOVE_SPEEDS } from './helpers';

export class GameScene extends Phaser.Scene {
  availableKeys: string[] = [ 'UP', 'RIGHT', 'DOWN', 'LEFT' ];
  keys: Phaser.Input.Keyboard.Key[] = [];
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
    this.availableKeys.forEach(key => {
      this.keys.push(this.input.keyboard.addKey(key));
    }, this);

    this.keys.forEach(key => {
      key.on('down', e => {
        const { keyCode } = e;

        if (Object.values(MOVE_KEYS).includes(keyCode)) {
          this.player.direction = getKeyByvalue(MOVE_KEYS, keyCode);
        }
      });

      key.on('up', e => {
        const { keyCode } = e;

        if (Object.values(MOVE_KEYS).includes(keyCode)) {
          this.player.direction = '';
          this.player.stop();
        }
      });
    });

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

  update() {
    this.timer++;

    if (typeof this.rock !== 'undefined') {
      this.rock.fall();
    }

    if (this.player.direction) {
      this.player.move(MOVE_SPEEDS[`${this.player.direction}`]);
    }
  }
}
