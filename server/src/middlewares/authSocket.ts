import jwt from 'jsonwebtoken';
import { SocketWithUser, JWTTokenPayload } from '../types';
import {Socket} from 'socket.io'
import User from '../models/user';

const PRIVATE_KEY = process.env.PRIVATE_KEY!

export async function socketAuthMiddleware(socket: Socket, next: (err?: Error) => void) {
  try {
    const token = socket.handshake.auth.token as string | undefined;
    console.log(token);
    if(!token) throw new Error('Autherntication error')

    const decodedToken = (await jwt.verify(
      token,
      PRIVATE_KEY
    )) as JWTTokenPayload;

    const user = await User.findById(decodedToken.userId);
    console.log(user);
    if(!user) throw new Error('Authenication error');

    (socket as SocketWithUser).user = {_id: user._id, username: user.username};
    next();
  } catch (error) {
    console.log(error);
    return next(new Error('Authentication Error'));
  }
}
