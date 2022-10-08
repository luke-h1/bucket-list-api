import { Request, Response } from 'express';
import { CreateUserInput } from '../schemas/user.schema';
import { createUser } from '../services/user.service';
import isErrorLike from '../utils/isErrorLike';
import logger from '../utils/logger';

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response,
) {
  try {
    const user = await createUser(req.body);

    if (user === 'user already exists') {
      return res.status(400).json({
        message: user,
      });
    }

    return res.status(201).json({
      user,
    });
  } catch (e) {
    logger.error(e);
    const error = isErrorLike(e) ? e.message : 'Failed to create user';
    return res.status(409).json({ error }); // user already exists
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getCurrentUserHandler(_req: Request, res: Response) {
  return res.send(res.locals.user);
}
