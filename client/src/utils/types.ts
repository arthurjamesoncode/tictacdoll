import { Vector3 } from '@react-three/fiber';

export type GameState = {
  gameEnded: boolean;
  isInGame: boolean;
  duration: number;
  startTime: null | number;

  cells: (null | number)[][];

  allPieces: GamePiece[];
  placedPieceIds: number[];

  currentPlayer: number;
  activePiece: undefined | GamePiece;
  winner: null | number;
};

export type GamePiece = {
  id: number;
  position: Vector3;
  size: number;
  player: number;
};

export type NewGameSession = {
  player1: string;
  player2: string;
  winner: number;
  duration: number;
};

export type GameSession = NewGameSession & {
  _id: string;
  createdAt: Date;
};

export type movePieceData = {
  pieceId: number;
  cell: number[];
  newPosition: Vector3;
};
