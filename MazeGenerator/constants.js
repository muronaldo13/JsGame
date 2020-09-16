export const WIDTH = 1000;
export const HEIGHT = 800;
export const WIDTH_PER_CELL = 20;

export const TOP = 'TOP';
export const BOTTOM = 'BOTTOM';
export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';

export function getOppositePosition(position) {
  switch (position) {
    case TOP:
      return BOTTOM;
    case LEFT:
      return RIGHT;
    case RIGHT:
      return LEFT;
    case BOTTOM:
      return TOP;
    default:
      return null;
  }
}
