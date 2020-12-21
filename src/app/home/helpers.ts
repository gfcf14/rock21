import { Player } from './entities';
import { GameScene } from './game';

export const DIMENSION: number = 32;
export const SPEED: number = 320;
export const GAME_KEYS: typeof Phaser.Input.Keyboard.KeyCodes = Phaser.Input.Keyboard.KeyCodes;
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

      // this.player.direction = 
    });

    this.key.on('up', e => {
      this.isPressed = false;

      this.player.stopSpeed(e.keyCode);
    });
  }
}