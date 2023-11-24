import { GamePiece } from './types';

export type UpdateDurationPayload = {
  duration: number;
};

export type SelectPiecePayload = {
  piece: GamePiece;
};

export type PlacePiecePayload = {
  cell: number[];
};

export type SetWinnerPayload = {
  gameWinner: number;
}

export type LoginPayload = {
  id: string;
  username: string;
}

export type popupPayload = {
  message: string;
}
