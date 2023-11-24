import { Response, NextFunction } from "express"
import jwt from 'jsonwebtoken';

import User from '../models/user';
import { JWTTokenPayload, RequestWithUser } from "../types";

const PRIVATE_KEY = process.env.PRIVATE_KEY!;

export async function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.accessToken;

    if(!token) {
      return res.status(401).json({message: 'No authenication token'})
    }

    const {userId} = await jwt.verify(token, PRIVATE_KEY) as JWTTokenPayload;
    const user = await User.findById(userId);

    if(!user) throw new Error('UserId does not exist');

    req.user = {userId: user._id, username: user.username}
    next()
  } catch (error) {
    console.log(error)
    res.status(401).send({message: 'Authentication Error'});
  }
}