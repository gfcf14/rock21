import { Entity, Rock } from './entities';

export const getKeyByvalue = (obj, val) => {
  return Object.keys(obj).find(key => obj[key] === val);
};

export const isFloating = (sprite: Entity, gameSprites: Entity[]) => {
  if (sprite instanceof Rock) {
    return !gameSprites[sprite.collidingSprite];
  }

  return false;
};

export const perpendicularToDirection = (newDir: string, curDir: string) => {
  if (newDir === 'UP' || newDir === 'DOWN') {
    return curDir === 'LEFT' || curDir === 'RIGHT';
  }

  return curDir === 'UP' || curDir === 'DOWN';
}
