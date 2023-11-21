import { io } from '../index';
import ioClient from 'socket.io-client';
import { Socket } from 'socket.io-client';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3002;
const HOST = process.env.HOST;

console.log(PORT, HOST);

afterAll(() => {
  io.close();
});

describe.only('playerSocket', () => {
  let socket1: Socket;

  beforeEach((done) => {
    socket1 = ioClient(`http://localhost:3002/players`);
    done();
  });

  afterEach(() => {
    socket1.disconnect();
  });

  it('Should get list of joinable games (list of roomNames)', (done) => {
    socket1.on('connect', () => {
      socket1.on('currentGames', (data) => {
        expect(data).toStrictEqual([]);
        done();
      });
    });
  });
});
