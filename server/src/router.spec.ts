import { Request, Response } from 'express';
import request from 'supertest';
import express from 'express';
import router from './router';

import { mockGames } from './mocks/mocks';

jest.mock('./controllers/game', () => ({
  getGameSession: jest.fn((req: Request, res: Response) =>
    res.status(200).send(mockGames)
  ),
  addGameSession: jest.fn((req: Request, res: Response) =>
    res
      .status(201)
      .send({ ...req.body, _id: 'thisisid', __v: 0, createdAt: 'datestring' })
  ),
}));

const app = express();
app.use(express.json());
app.use(router);

describe('Game Session Router', () => {
  const mockGameData = {
    player: 'Player1',
    winner: 1,
    duration: 30,
  };

  it('should get game sessions', async () => {
    const response = await request(app).get('/sessions');

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(mockGames)
  });

  it('should add a new game session', async () => {
    const response = await request(app).post('/sessions').send(mockGameData);

    expect(response.status).toBe(201);
    expect(response.body.player).toBe(mockGameData.player);
    expect(response.body.winner).toBe(mockGameData.winner);
    expect(response.body.duration).toBe(mockGameData.duration);
  });
});
