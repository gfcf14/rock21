import { Entity, Rock } from './entities';

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

export const getKeyByvalue = (obj, val) => {
  return Object.keys(obj).find(key => obj[key] === val);
};

export const isFloating = (sprite: Rock, spriteList: Entity[]) => {
  console.log(`typeof: ${typeof spriteList[sprite.collidingSprite]}`);
  return typeof spriteList[sprite.collidingSprite] === 'undefined';
};
