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
  keyCode: number;
  player: Player;
  scene: GameScene;
  type: string;

  public constructor(player: Player, scene: GameScene, type: string) {
    this.scene = scene;
    this.isPressed = false;
    this.keyCode = Phaser.Input.Keyboard.KeyCodes[`${type}`];
    this.key = this.scene.input.keyboard.addKey(this.keyCode);
    this.player = player;
    this.type = type;

    this.setEvents();
  }

  setEvents() {
    this.key.on('down', e => {
      this.isPressed = true;
    });

    this.key.on('up', e => {
      this.isPressed = false;
    });
  }
}