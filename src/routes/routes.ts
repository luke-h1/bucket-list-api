import { Express, Request, Response } from 'express';
import {
  createBucketlistHandler,
  deleteBucketlistHandler,
  getAllBucketListHandler,
  getOneBucketListHandler,
  updateBucketlistHandler,
} from '../controllers/bucketlist.controller';
import {
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionsHandler,
} from '../controllers/session.controller';
import {
  createUserHandler,
  getCurrentUserHandler,
} from '../controllers/user.controller';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import {
  createBucketlistSchema,
  deleteBucketlistSchema,
  updateBucketlistSchema,
} from '../schemas/bucketlist.schema';
import { createSessionSchema } from '../schemas/session.schema';
import { createUserSchema } from '../schemas/user.schema';

export default function routes(app: Express) {
  app.get('/api/health', (_req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // users
  app.post('/api/users', validateResource(createUserSchema), createUserHandler);

  app.get('/api/users/me', requireUser, getCurrentUserHandler);

  // sessions
  app.post(
    '/api/sessions',
    validateResource(createSessionSchema),
    createUserSessionHandler,
  );

  app.get('/api/sessions', requireUser, getUserSessionsHandler);

  app.delete('/api/sessions', requireUser, deleteUserSessionHandler);

  // bucket lists

  app.post(
    '/api/bucketlist',
    [requireUser, validateResource(createBucketlistSchema)],
    createBucketlistHandler,
  );

  app.get('/api/bucketlist', requireUser, getAllBucketListHandler);

  app.get(
    '/api/bucketlist/:bucketlistId',
    requireUser,
    getOneBucketListHandler,
  );

  app.put(
    '/api/bucketlist/:bucketlistId',
    [requireUser, validateResource(updateBucketlistSchema)],
    updateBucketlistHandler,
  );

  app.delete('/api/bucketlist/:bucketlistId', [
    requireUser,
    validateResource(deleteBucketlistSchema),
    deleteBucketlistHandler,
  ]);
}
