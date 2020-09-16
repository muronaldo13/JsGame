export const MAX_HEIGHT_CELL = 20;
export const MAX_WIDTH_CELL = 10;
export const GAME_SPEED = 300;
export const CHARGING_SPEED = 20;
export const TURN_LEFT = -1;
export const TURN_RIGHT = 1;

export const Z_SHAPE = {
  values: [
    { x: -2, y: 4, color: 'green' },
    { x: -2, y: 5, color: 'green' },
    { x: -1, y: 5, color: 'green' },
    { x: -1, y: 6, color: 'green' },
  ],
  flipMovement: {
    currentFlipIndex: 0,
    flipList: [
      [
        { x: -1, y: -1 },
        { x: 0, y: 0 },
        { x: 1, y: -1 },
        { x: 2, y: 0 },
      ],
      [
        { x: 1, y: 1 },
        { x: 0, y: 0 },
        { x: -1, y: 1 },
        { x: -2, y: 0 },
      ],
    ],
  },
};

export const S_SHAPE = {
  values: [
    { x: -2, y: 6, color: 'red' },
    { x: -2, y: 5, color: 'red' },
    { x: -1, y: 5, color: 'red' },
    { x: -1, y: 4, color: 'red' },
  ],
  flipMovement: {
    currentFlipIndex: 0,
    flipList: [
      [
        { x: -2, y: 0 },
        { x: -1, y: -1 },
        { x: 0, y: 0 },
        { x: 1, y: -1 },
      ],
      [
        { x: 2, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 0 },
        { x: -1, y: 1 },
      ],
    ],
  },
};
export const MIRRORED_L_SHAPE = {
  values: [
    { x: -2, y: 4, color: 'orange' },
    { x: -1, y: 4, color: 'orange' },
    { x: -1, y: 5, color: 'orange' },
    { x: -1, y: 6, color: 'orange' },
  ],
  flipMovement: {
    currentFlipIndex: 0,
    flipList: [
      [
        { x: -1, y: -1 },
        { x: 0, y: -2 },
        { x: 1, y: -1 },
        { x: 2, y: 0 },
      ],
      [
        { x: -1, y: 1 },
        { x: -2, y: 0 },
        { x: -1, y: -1 },
        { x: 0, y: -2 },
      ],
      [
        { x: 1, y: 1 },
        { x: 0, y: 2 },
        { x: -1, y: 1 },
        { x: -2, y: 0 },
      ],
      [
        { x: 1, y: -1 },
        { x: 2, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 2 },
      ],
    ],
  },
};
export const L_SHAPE = {
  values: [
    { x: -2, y: 6, color: 'teal' },
    { x: -1, y: 6, color: 'teal' },
    { x: -1, y: 5, color: 'teal' },
    { x: -1, y: 4, color: 'teal' },
  ],
  flipMovement: {
    currentFlipIndex: 0,
    flipList: [
      [
        { x: 1, y: 1 },
        { x: 2, y: 0 },
        { x: 1, y: -1 },
        { x: 0, y: -2 },
      ],
      [
        { x: 1, y: -1 },
        { x: 0, y: -2 },
        { x: -1, y: -1 },
        { x: -2, y: 0 },
      ],
      [
        { x: -1, y: -1 },
        { x: -2, y: 0 },
        { x: -1, y: 1 },
        { x: 0, y: 2 },
      ],
      [
        { x: -1, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 1 },
        { x: 2, y: 0 },
      ],
    ],
  },
};
export const LINE_SHAPE = {
  values: [
    { x: -2, y: 4, color: 'purple' },
    { x: -2, y: 5, color: 'purple' },
    { x: -2, y: 6, color: 'purple' },
    { x: -2, y: 7, color: 'purple' },
  ],
  flipMovement: {
    currentFlipIndex: 0,
    flipList: [
      [
        { x: 3, y: -1 },
        { x: 2, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 2 },
      ],

      [
        { x: -3, y: 1 },
        { x: -2, y: 0 },
        { x: -1, y: -1 },
        { x: 0, y: -2 },
      ],
    ],
  },
};
export const SQUARE_SHAPE = {
  values: [
    { x: -2, y: 5, color: 'hotpink' },
    { x: -2, y: 6, color: 'hotpink' },
    { x: -1, y: 5, color: 'hotpink' },
    { x: -1, y: 6, color: 'hotpink' },
  ],
  flipMovement: {
    currentFlipIndex: 0,
    flipList: [[]],
  },
};

export const T_SHAPE = {
  values: [
    { x: -2, y: 4, color: 'yellow' },
    { x: -2, y: 5, color: 'yellow' },
    { x: -1, y: 5, color: 'yellow' },
    { x: -2, y: 6, color: 'yellow' },
  ],
  flipMovement: {
    currentFlipIndex: 0,
    flipList: [
      [
        { x: -1, y: -1 },
        { x: 0, y: 0 },
        { x: 1, y: -1 },
        { x: 1, y: 1 },
      ],
      [
        { x: -1, y: 1 },
        { x: 0, y: 0 },
        { x: -1, y: -1 },
        { x: 1, y: -1 },
      ],
      [
        { x: 1, y: 1 },
        { x: 0, y: 0 },
        { x: -1, y: 1 },
        { x: -1, y: -1 },
      ],
      [
        { x: 1, y: -1 },
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: -1, y: 1 },
      ],
    ],
  },
};

export const ALL_SHAPES = [
  Z_SHAPE,
  S_SHAPE,
  L_SHAPE,
  MIRRORED_L_SHAPE,
  LINE_SHAPE,
  SQUARE_SHAPE,
  T_SHAPE,
];
