import { PieceSize, PiecePlayer } from '../models/enums';
import { GamePiece } from '../utils/types';

export const mockGames = [
  {
    player1: 'Alice',
    player2: 'Steve',
    winner: 1,
    duration: 45,
    createdAt: new Date().toISOString(),
  },
  {
    player1: 'Bob',
    player2: 'Steve',
    winner: 2,
    duration: 30,
    createdAt: new Date().toISOString(),
  },
  {
    player1: 'Charlie',
    player2: 'Steve',
    winner: 1,
    duration: 50,
    createdAt: new Date().toISOString(),
  },
  {
    player1: 'David',
    player2: 'Steve',
    winner: 2,
    duration: 20,
    createdAt: new Date().toISOString(),
  },
  {
    player1: 'Eva',
    player2: 'Steve',
    winner: 1,
    duration: 35,
    createdAt: new Date().toISOString(),
  },
  {
    player1: 'Frank',
    player2: 'Steve',
    winner: 2,
    duration: 40,
    createdAt: new Date().toISOString(),
  },
  {
    player1: 'Grace',
    player2: 'Steve',
    winner: 1,
    duration: 55,
    createdAt: new Date().toISOString(),
  },
  {
    player1: 'Henry',
    player2: 'Steve',
    winner: 2,
    duration: 25,
    createdAt: new Date().toISOString(),
  },
  {
    player1: 'Ivy',
    player2: 'Steve',
    winner: 1,
    duration: 42,
    createdAt: new Date().toISOString(),
  },
  {
    player1: 'Jack',
    player2: 'Steve',
    winner: 2,
    duration: 28,
    createdAt: new Date().toISOString(),
  },
  {
    player1: 'Kate',
    player2: 'Steve',
    winner: 1,
    duration: 48,
    createdAt: new Date().toISOString(),
  },
  {
    player1: 'Leo',
    player2: 'Steve',
    winner: 2,
    duration: 18,
    createdAt: new Date().toISOString(),
  },
  {
    player1: 'Mia',
    player2: 'Steve',
    winner: 1,
    duration: 37,
    createdAt: new Date().toISOString(),
  },
  {
    player1: 'Noah',
    player2: 'Steve',
    winner: 2,
    duration: 32,
    createdAt: new Date().toISOString(),
  },
  {
    player1: 'Olivia',
    player2: 'Steve',
    winner: 1,
    duration: 53,
    createdAt: new Date().toISOString(),
  },
  {
    player1: 'Peter',
    player2: 'Steve',
    winner: 2,
    duration: 22,
    createdAt: new Date().toISOString(),
  },
];

export const mockNewGames = [
  {
    player1: 'Alice',
    player2: 'Steve',
    winner: 1,
    duration: 45,
  },
  {
    player1: 'Bob',
    player2: 'Steve',
    winner: 2,
    duration: 30,
  },
  {
    player1: 'Charlie',
    player2: 'Steve',
    winner: 1,
    duration: 50,
  },
  {
    player1: 'David',
    player2: 'Steve',
    winner: 2,
    duration: 20,
  },
  {
    player1: 'Eva',
    player2: 'Steve',
    winner: 1,
    duration: 35,
  },
  {
    player1: 'Frank',
    player2: 'Steve',
    winner: 2,
    duration: 40,
  },
  {
    player1: 'Grace',
    player2: 'Steve',
    winner: 1,
    duration: 55,
  },
  {
    player1: 'Henry',
    player2: 'Steve',
    winner: 2,
    duration: 25,
  },
  {
    player1: 'Ivy',
    player2: 'Steve',
    winner: 1,
    duration: 42,
  },
  {
    player1: 'Jack',
    player2: 'Steve',
    winner: 2,
    duration: 28,
  },
  {
    player1: 'Kate',
    player2: 'Steve',
    winner: 1,
    duration: 48,
  },
  {
    player1: 'Leo',
    player2: 'Steve',
    winner: 2,
    duration: 18,
  },
  {
    player1: 'Mia',
    player2: 'Steve',
    winner: 1,
    duration: 37,
  },
  {
    player1: 'Noah',
    player2: 'Steve',
    winner: 2,
    duration: 32,
  },
  {
    player1: 'Olivia',
    player2: 'Steve',
    winner: 1,
    duration: 53,
  },
  {
    player1: 'Peter',
    player2: 'Steve',
    winner: 2,
    duration: 22,
  },
];

export const mockPiece1 : GamePiece = {
  id: 2,
  position: [15, 1.5, 3],
  size: PieceSize.LARGE,
  player: PiecePlayer.PLAYER1,
};

export const mockPiece2 : GamePiece = {
  id: 5,
  position: [12, 0.9, 3],
  size: PieceSize.MEDIUM,
  player: PiecePlayer.PLAYER1,
};

