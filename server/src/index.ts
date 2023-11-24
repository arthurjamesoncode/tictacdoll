import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './router';
import setupWebSocket from './sockets';

const corsConfig = {
  credentials: true,
  origin: true,
};

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true,
  },
});

app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());
app.use(router);

setupWebSocket(io);

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3002;
const HOST = process.env.HOST ? process.env.HOST : 'localhost';

httpServer.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`); // eslint-disable-line no-console
});

export { io, httpServer };
