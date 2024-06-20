import express from 'express';
import { authRouter } from './auth.router.js';
import { usersRouter } from './users.router.js';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';

const apiRouter = express.Router();

// '/auth' 경로에 대해 authRouter를 사용
apiRouter.use('/auth', authRouter);

// '/users' 경로에 대해 usersRouter를 사용
apiRouter.use('/users', usersRouter);

export { apiRouter };
