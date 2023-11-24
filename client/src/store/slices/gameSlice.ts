import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PieceSize, PiecePlayer } from '../../models/enums';
import { GameState } from '../../utils/types';

import {
  PlacePiecePayload,
  SelectPiecePayload,
  SetWinnerPayload,
  UpdateDurationPayload,
} from '../../utils/payloadTypes';

export const initialState: GameState = {
  gameEnded: false,
  isInGame: false,
  duration: 0,
  startTime: null,

  cells: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],

  allPieces: [
    {
      id: 0,
      position: [15, 1.5, 0],
      size: PieceSize.LARGE,
      player: PiecePlayer.PLAYER2,
    },
    {
      id: 1,
      position: [15, 1.5, 3],
      size: PieceSize.LARGE,
      player: PiecePlayer.PLAYER2,
    },
    {
      id: 2,
      position: [15, 1.5, 6],
      size: PieceSize.LARGE,
      player: PiecePlayer.PLAYER2,
    },
    {
      id: 3,
      position: [12, 0.9, 0],
      size: PieceSize.MEDIUM,
      player: PiecePlayer.PLAYER2,
    },
    {
      id: 4,
      position: [12, 0.9, 3],
      size: PieceSize.MEDIUM,
      player: PiecePlayer.PLAYER2,
    },
    {
      id: 5,
      position: [12, 0.9, 6],
      size: PieceSize.MEDIUM,
      player: PiecePlayer.PLAYER2,
    },
    {
      id: 6,
      position: [10, 0.57, 0],
      size: PieceSize.SMALL,
      player: PiecePlayer.PLAYER2,
    },
    {
      id: 7,
      position: [10, 0.57, 3],
      size: PieceSize.SMALL,
      player: PiecePlayer.PLAYER2,
    },
    {
      id: 8,
      position: [10, 0.57, 6],
      size: PieceSize.SMALL,
      player: PiecePlayer.PLAYER2,
    },
    {
      id: 9,
      position: [-15, 1.5, 0],
      size: PieceSize.LARGE,
      player: PiecePlayer.PLAYER1,
    },
    {
      id: 10,
      position: [-15, 1.5, -3],
      size: PieceSize.LARGE,
      player: PiecePlayer.PLAYER1,
    },
    {
      id: 11,
      position: [-15, 1.5, -6],
      size: PieceSize.LARGE,
      player: PiecePlayer.PLAYER1,
    },
    {
      id: 12,
      position: [-12, 0.9, 0],
      size: PieceSize.MEDIUM,
      player: PiecePlayer.PLAYER1,
    },
    {
      id: 13,
      position: [-12, 0.9, -3],
      size: PieceSize.MEDIUM,
      player: PiecePlayer.PLAYER1,
    },
    {
      id: 14,
      position: [-12, 0.9, -6],
      size: PieceSize.MEDIUM,
      player: PiecePlayer.PLAYER1,
    },
    {
      id: 15,
      position: [-10, 0.57, 0],
      size: PieceSize.SMALL,
      player: PiecePlayer.PLAYER1,
    },
    {
      id: 16,
      position: [-10, 0.57, -3],
      size: PieceSize.SMALL,
      player: PiecePlayer.PLAYER1,
    },
    {
      id: 17,
      position: [-10, 0.57, -6],
      size: PieceSize.SMALL,
      player: PiecePlayer.PLAYER1,
    },
  ],

  placedPieceIds: [],

  currentPlayer: PiecePlayer.PLAYER1,
  activePiece: undefined,
  winner: null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.isInGame = true;
      state.startTime = Date.now();
    },

    endGame: (state, { payload }: PayloadAction<SetWinnerPayload>) => {
      const { gameWinner } = payload;

      state.gameEnded = true;
      state.isInGame = false;

      state.winner = gameWinner;
    },

    updateDuration: (
      state,
      { payload }: PayloadAction<UpdateDurationPayload>
    ) => {
      const { duration } = payload;
      state.duration = duration;
    },

    selectPiece: (state, { payload }: PayloadAction<SelectPiecePayload>) => {
      const { piece } = payload;

      return { ...state, activePiece: piece };
    },

    unselectPiece: (state) => {
      state.activePiece = undefined;
    },

    placePiece: (state, { payload }: PayloadAction<PlacePiecePayload>) => {
      const { cell } = payload;

      const [cellX, cellY] = cell;

      state.cells[cellX][cellY] = state.activePiece!.id;
      state.placedPieceIds.push(state.activePiece!.id);

      state.currentPlayer =
        state.activePiece!.player === PiecePlayer.PLAYER2
          ? PiecePlayer.PLAYER1
          : PiecePlayer.PLAYER2;
    },

    resetGame: () => {
      return initialState;
    }
  },
});

// 导出 action creators
export const {
  startGame,
  selectPiece,
  unselectPiece,
  placePiece,
  updateDuration,
  endGame,
  resetGame,
} = gameSlice.actions;

// 导出 reducer
export default gameSlice.reducer;
