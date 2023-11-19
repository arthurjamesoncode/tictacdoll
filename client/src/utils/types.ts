import { Vector3 } from '@react-three/fiber';

export type GameState = {
  gameEnded: boolean;
  isInGame: boolean;
  duration: number;
  intervalId?: NodeJS.Timeout;
  startTime: null | number;

  cells: (null | number)[][];

  pieces: GamePiece[];

  currentPlayer: number;
  activePiece: undefined | GamePiece;
  winner: null | string;
};

export type GamePiece = {
  id: number;
  position: Vector3;
  hasMoved: boolean;
  size: number;
  player: number;
};

export type NewGameSession = {
  player: string;
  winner: number;
  duration: number;
};

export type GameSession = NewGameSession & {
  _id: string;
  createdAt: Date;
};
