import * as Phaser from 'phaser';
import { DIMENSION, MOVE_KEYS, MOVE_SPEEDS} from './constants';
import { Entity, Grass, Player, Rock } from './entities';
import { getKeyByvalue, isFloating, perpendicularToDirection } from './helpers';

export class GameScene extends Phaser.Scene {
  availableKeys: string[] = [ 'UP', 'RIGHT', 'DOWN', 'LEFT' ];
  keys: Phaser.Input.Keyboard.Key[] = [];
  player: Player;
  timer: number = 0;
  rock: Rock;
  grass: Grass;
  gameSprites: Entity[] = [];
  spriteCounter: number = 0;

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
    this.add.grid(400, 300, 800, 600, DIMENSION, DIMENSION, 0x000000, 1, 0x00b456, 1);

    this.player = new Player(this, 400, 300, 'player', this.spriteCounter++);
    this.gameSprites.push(this.player);

    this.rock = new Rock(this, 400, 0, 'rock', this.spriteCounter++);
    this.gameSprites.push(this.rock);

    this.grass = new Grass(this, 400, 500, 'grass', this.spriteCounter++);
    this.gameSprites.push(this.grass);

    // adds all keys defined by availableKeys
    this.availableKeys.forEach(key => {
      this.keys.push(this.input.keyboard.addKey(key));
    }, this);

    this.keys.forEach(key => {
      key.on('down', e => {
        const { keyCode } = e;

        if (Object.values(MOVE_KEYS).includes(keyCode)) {
          this.player.direction = getKeyByvalue(MOVE_KEYS, keyCode);

          this.player.move(MOVE_SPEEDS[`${this.player.direction}`]);
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
            if (perpendicularToDirection(getKeyByvalue(MOVE_KEYS, keyCode), direction)) {
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
      rock.collidingSprite = grass.id;
      rock.stop();
      grass.body.velocity.y = 0;
    });

    // removes grass if player touches it
    this.physics.add.collider(this.player, this.grass, (player: Player, grass: Grass) => {
      this.gameSprites[grass.id] = null;
      grass.destroy();
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

    if (!this.rock.isGrounded) {
      this.rock.fall();
    } else {
      if (isFloating(this.rock, this.gameSprites)) {
        this.rock.isGrounded = false;
      }
    }

    // if (this.player.direction) {
    //   this.player.move(MOVE_SPEEDS[`${this.player.direction}`]);
    // }
  }
}
