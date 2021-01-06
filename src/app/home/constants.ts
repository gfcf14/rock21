export const DIMENSION: number = 32;
export const SPEED: number = 320;
export const GAME_KEYS: typeof Phaser.Input.Keyboard.KeyCodes = Phaser.Input.Keyboard.KeyCodes;

export const MOVE_KEYS = {
  'LEFT': 37,
  'UP': 38,
  'RIGHT': 39,
  'DOWN': 40
};

export const MOVE_SPEEDS = {
  'LEFT': { x: -SPEED, y: 0  },
  'UP': { x: 0, y: -SPEED },
  'RIGHT': { x: SPEED, y: 0 },
  'DOWN': { x: 0, y: SPEED }
};