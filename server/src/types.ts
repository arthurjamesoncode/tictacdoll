import { Request } from 'express';
import { Types } from 'mongoose';
import { Socket } from 'socket.io';

export type JWTTokenPayload = {
  userId: string;
};

export interface RequestWithUser extends Request {
  user?: {
    userId: Types.ObjectId;
    username: string;
  };
}

export interface SocketWithUser extends Socket {
  user: {
    _id: Types.ObjectId;
    username: string;
  };
}
