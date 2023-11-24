import { Router } from 'express';
import gameSession from './controllers/game';
import userController from './controllers/user';
import { authMiddleware } from './middlewares/auth';
import { RequestWithUser } from './types';

const router = Router();

router.post('/user/register', userController.registerUser);
router.post('/user/login', userController.login);

router.get('/sessions', gameSession.getGameSession);
router.post('/sessions', gameSession.addGameSession);

router.get('/auth', authMiddleware, (req: RequestWithUser, res) => {
  res.status(200).send({ username: req.user!.username })
}
);
router.post('/user/logout', authMiddleware, userController.logout);

export default router;
