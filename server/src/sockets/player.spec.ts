import { io } from '../index';
import ioClient from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { httpServer } from '../index';

afterAll(() => {
  io.close();
  httpServer.close();
});

describe.only('playerSocket', () => {
  let socket1: Socket;
  let socket2: Socket;

  beforeEach((done) => {
    socket1 = ioClient(`http://localhost:3002/players`, {
      auth: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTViOWNjNzNiMmJhYjlmYTUzY2U5NDQiLCJpYXQiOjE3MDA1ODc3NzZ9.pCIYANB3_EKSnGAWLKmMQ9VOkj_MI0hMzMetuV82mzA',
      },
    });

    socket2 = ioClient(`http://localhost:3002/players`, {
      auth: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTViOWNjNzNiMmJhYjlmYTUzY2U5NDQiLCJpYXQiOjE3MDA1ODc3NzZ9.pCIYANB3_EKSnGAWLKmMQ9VOkj_MI0hMzMetuV82mzA',
      },
    });
    done();
  });

  afterEach(() => {
    socket1.disconnect();
    socket2.disconnect();
  });

  it('Should get list of joinable games (list of roomNames)', (done) => {
    socket1.on('connect', () => {
      console.log('Socket1 connected');
      socket1.emit('joinGame', 'test');
    });
    socket2.on('connect', () => {
      socket2.emit('joinGame', 'best');
    });
  });
});
