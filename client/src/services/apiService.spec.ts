import { fetchGamedata, addGamedata } from './apiService';
import { mockGames, mockNewGames } from '../mocks/mocks';


const url = 'http://localhost:3002'

describe('apiService.ts', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('fetchGamedata should make a GET request to sessions endpoint', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockGames),
      })
    ) as jest.Mock;

    const result = await fetchGamedata();

    expect(fetch).toHaveBeenCalledWith(`${url}/sessions`);
    expect(result).toEqual(mockGames);
  });

  it('addGamedata should make a POST request to the correct endpoint', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockGames[0]),
      })
    ) as jest.Mock;

    const mockGameData = mockNewGames[0];
    const result = await addGamedata(mockGameData);

    expect(fetch).toHaveBeenCalledWith(`${url}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockGameData),
    });
    expect(result).toEqual(mockGames[0]);
  });
});
