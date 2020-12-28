import * as Phaser from 'phaser';
import { Grass, Player, Rock } from './entities';
import { DIMENSION, getKeyByvalue, MOVE_KEYS, MOVE_SPEEDS } from './helpers';

export class GameScene extends Phaser.Scene {
  availableKeys: string[] = [ 'UP', 'RIGHT', 'DOWN', 'LEFT' ];
  keys: Phaser.Input.Keyboard.Key[] = [];
  player: Player;
  timer: number = 0;
  rock: Rock;
  grass: Grass;

  constructor() {
    super({ key: 'game' });
  }

  preload() {
    this.load.setPath('../assets/');

    this.load.image('player', 'player.png');
    this.load.image('rock', 'rock.png');
    this.load.image('explosion', 'explosion.png');
    this.load.image('grass', 'grass.png');
  }

  create() {
    this.player = new Player(this, 400, 300, 'player');
    this.rock = new Rock(this, 400, 0, 'rock');
    this.grass = new Grass(this, 400, 500, 'grass');

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
          const { direction } = this.player;

          if (!direction || direction === getKeyByvalue(MOVE_KEYS, keyCode)) {
            this.player.stop(true, true);
            this.player.direction = '';
          } else {
            if (this.perpendicularToDirection(getKeyByvalue(MOVE_KEYS, keyCode), direction)) {
              const { x, y } = this.player.body.velocity;

              // stops velocities for whichever is active
              this.player.stop(x != 0, y != 0);
            }
          }

        }
      });
    });

    // kills player if rock falls on them
    this.physics.add.collider(this.player, this.rock, (player: Player, rock: Rock) => {
      // check if player is below rock as well
      if (!rock.isGrounded) {
        const { x, y } = player;

        rock.destroy();
        player.destroy();

        this.setBoom(x - DIMENSION, y - DIMENSION);
      }
    });

    // stops rock from falling when touching grass
    this.physics.add.collider(this.rock, this.grass, (rock: Rock, grass: Grass) => {
      rock.isGrounded = true;
      grass.body.velocity.y = 0;
    });

    // kills grass if player touches it
    this.physics.add.collider(this.player, this.grass, (player: Player, grass: Grass) => {
      grass.destroy();
    });
  }

  perpendicularToDirection(newDir, curDir) {
    if (newDir === 'UP' || newDir === 'DOWN') {
      return curDir === 'LEFT' || curDir === 'RIGHT';
    }

    return curDir === 'UP' || curDir === 'DOWN';
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
