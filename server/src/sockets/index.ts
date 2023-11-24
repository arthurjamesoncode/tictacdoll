import {Server as SocketIOServer} from 'socket.io';
import playerSocket from './player';
import { socketAuthMiddleware } from '../middlewares/authSocket';

export default function setupWebSocket(io: SocketIOServer) {
  const playerNameSpace = io.of('/players')

  playerNameSpace.use(socketAuthMiddleware)
  playerSocket(playerNameSpace);
}