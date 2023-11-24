import { Request, Response } from 'express';
import eventController from './game';
import Game from '../models/game';
import mongoose from '../models';
import { mockGames } from '../mocks/mocks';

jest.mock('../models/game');

const dbName: string = 'TicTacDollDB';

beforeAll(async () => {
  await mongoose.connect(`mongodb://localhost:27017/${dbName}`);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('getGameSession Controller', () => {
  it('should return game sessions and status 200 if successful', async () => {
    (Game.find as jest.Mock).mockResolvedValue(mockGames);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await eventController.getGameSession(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockGames);
    return true;
  });

  it('should return status 500 and error message if an error occurs', async () => {
    const errorMessage = 'Internal Server Error';
    (Game.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await eventController.getGameSession(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
    return true;
  });
});

describe('addGameSession', () => {
  const mockedBody = {
    player: 'Player',
    winner: 12,
    duration: 50,
  };

  const mockedGame = {
    _id: '456787656',
    player: 'Player',
    winner: 12,
    duration: 50,
    createdAt: new Date(),
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add a game session successfully', async () => {
    const mockRequest: Partial<Request> = {
      body: mockedBody,
    };

    const mockResponse: Partial<Response> = {
      status: jest.fn((code: number) => {
        return { ...mockResponse, statusCode: code } as Response<
          any,
          Record<string, any>
        >;
      }),
      json: jest.fn(),
      send: jest.fn(),
    };

    (Game.create as jest.Mock).mockResolvedValue(mockedGame);

    await eventController.addGameSession(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Object));
    expect(Game.create).toHaveBeenCalledWith(mockRequest.body);
  });

  it('should handle errors and send a 500 response', async () => {
    const mockRequest: Partial<Request> = {
      body: mockedBody,
    };

    const mockResponse: Partial<Response> = {
      status: jest.fn((code: number) => {
        return { ...mockResponse, statusCode: code } as Response<
          any,
          Record<string, any>
        >;
      }),
      send: jest.fn(),
    };

    (Game.create as jest.Mock).mockRejectedValue(new Error('Some error'));

    await eventController.addGameSession(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith({
      message: 'Internal Server Error',
    });
  });
});
