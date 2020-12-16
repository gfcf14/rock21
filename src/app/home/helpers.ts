import { Player } from './entities';
import { GameScene } from './game';

export enum PLAYER_MOVEMENTS {
  LEFT = 37,
  UP = 38,
  RIGHT = 39,
  DOWN = 40
};

export class GameKey {
  isPressed: boolean;
  key: Phaser.Input.Keyboard.Key;
  player: Player;
  scene: GameScene;
  type: string;

  public constructor(player: Player, scene: GameScene, type: string) {
    this.scene = scene;
    this.isPressed = false;
    this.key = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[`${type}`]);
    this.player = player;
    this.type = type;
  }

  setDown(list) {
    console.log(list);
    this.key.on('down', e => {
      // this.isPressed = true;

      // if any of the arrows were pressed
      const { keyCode } = e;
      if (keyCode >= 37 && keyCode <= 40) {
        switch(keyCode) {
          case PLAYER_MOVEMENTS.LEFT :
            this.player.moveLeft();
          break;
          case PLAYER_MOVEMENTS.UP :
            this.player.moveUp();
          break;
          case PLAYER_MOVEMENTS.RIGHT :
            this.player.moveRight();
          break;
          case PLAYER_MOVEMENTS.DOWN :
            this.player.moveDown();
          break;
        }
      }
    });
  }

  setUp() {
    this.key.on('up', e => {
      // this.isPressed = false;
    });
  }
}