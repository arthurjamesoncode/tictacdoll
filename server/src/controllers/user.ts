import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { RequestWithUser } from '../types';

const PRIVATE_KEY = process.env.PRIVATE_KEY!;

async function registerUser(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send({ message: 'Username already exists' });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      passwordHash,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, username: newUser.username }, PRIVATE_KEY);

    res.cookie('accessToken', token);
    res.status(201).send({username});
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error', error });
  }
}

async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send({ message: 'User does not exist' });
    }

    const correctCredentials = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!correctCredentials) {
      return res
        .status(401)
        .send({ message: 'Incorrect username or password' });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, PRIVATE_KEY);

    res.cookie('accessToken', token);
    res.status(200).send({username: user.username, id: user._id});
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
}

async function logout(req: RequestWithUser, res: Response) {
  try {
    res.clearCookie('accessToken');
    res.status(204).send()
  } catch (error) {
    console.log(error)
    res.status(500).send({message: 'Internal Server Error'})
  }
}

export default { registerUser, login, logout };
