import GameSessions from "../models/game";
import { Request, Response } from "express"

async function getGameSession(req: Request, res: Response): Promise<void> {
  try {
    const games = await GameSessions.find();
    res.status(200).json(games);
  } catch (e) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(e);
  }
}

async function addGameSession(req: Request, res: Response): Promise<void> {
  try {
    const newGamedata = await GameSessions.create(req.body);
    res.status(201).json(newGamedata);
  } catch (e) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(e);
  }
}

export default { getGameSession, addGameSession };
