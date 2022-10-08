import { Response, Request } from 'express';
import {
  createBucketlistInput,
  deleteBucketlistInput,
  getOneBucketlistInput,
  updateBucketlistInput,
} from '../schemas/bucketlist.schema';
import {
  createBucketList,
  deleteBucketList,
  findAllBucketLists,
  findOneBucketList,
  updateBucketList,
} from '../services/bucketlist.service';

export async function createBucketlistHandler(
  req: Request<{}, {}, createBucketlistInput['body']>,
  res: Response,
) {
  const userId = res.locals.user.id;

  const { body } = req;

  // error handling needed here
  const bucketlist = await createBucketList(body, userId);

  return res.send(bucketlist);
}

export async function getAllBucketListHandler(_req: Request, res: Response) {
  const userId = res.locals.user.id;

  const bucketLists = await findAllBucketLists(userId);

  return res.send(bucketLists);
}

export async function getOneBucketListHandler(
  req: Request<getOneBucketlistInput['params']>,
  res: Response,
) {
  const userId = res.locals.user.id;

  const { bucketlistId } = req.params;

  const bucketList = await findOneBucketList(userId, bucketlistId);

  if (!bucketList) {
    return res.sendStatus(404);
  }

  return res.send(bucketList);
}

export async function updateBucketlistHandler(
  req: Request<updateBucketlistInput['params'], updateBucketlistInput['body']>,
  res: Response,
) {
  const userId = res.locals.user.id;

  const bucketListId = req.params.bucketlistId;

  const update = req.body;

  const bucketList = await findOneBucketList(userId, bucketListId);

  if (!bucketList) {
    // doesn't exist or trying to access a bucketlist they don't own
    return res.sendStatus(404);
  }

  const updatedBucketList = await updateBucketList(update, bucketListId);

  return res.send(updatedBucketList);
}

export async function deleteBucketlistHandler(
  req: Request<deleteBucketlistInput['params']>,
  res: Response,
) {
  const userId = res.locals.user.id;

  const bucketListId = req.params.bucketlistId;

  const bucketList = await findOneBucketList(userId, bucketListId);

  if (!bucketList) {
    return res.sendStatus(404);
  }

  await deleteBucketList(bucketListId);

  return res.sendStatus(204);
}
