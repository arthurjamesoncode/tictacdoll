

import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';
import Game from './game'

let mongoServer : MongoMemoryServer;

beforeAll(async () => {
  await mongoose.disconnect()
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri)
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Game Model', () => {
  it('creates and saves a game instance', async () => {
    const gameData = {
      player1: 'Player1',
      player2: 'Player2',
      winner: 1,
      duration: 30,
    };

    const game = new Game(gameData);
    const savedGame = await game.save();

    expect(savedGame._id).toBeDefined();
    expect(savedGame.player1).toBe(gameData.player1);
    expect(savedGame.player2).toBe(gameData.player2);
    expect(savedGame.winner).toBe(gameData.winner);
    expect(savedGame.duration).toBe(gameData.duration);
    expect(savedGame.createdAt).toBeDefined();
  });

  it('requires player, winner, and duration fields', async () => {
    const game = new Game({}); // Missing required fields

    let error;
    try {
      await game.validate();
    } catch (e) {
      error = e as mongoose.Error.ValidationError;
    }

    expect(error).toBeDefined();
    expect(error?.errors.player1).toBeDefined();
    expect(error?.errors.player2).toBeDefined();
    expect(error?.errors.winner).toBeDefined();
    expect(error?.errors.duration).toBeDefined();
  });
});