import { Prisma } from '@prisma/client';
import { prisma } from '../db/prisma';

export async function createBucketList(
  input: Omit<Prisma.BucketListCreateInput, 'user' | 'createdAt' | 'updatedAt'>,
  userId: string,
) {
  try {
    const bucketlist = await prisma.bucketList.create({
      data: {
        ...input,
        userId,
      },
    });
    return bucketlist;
  } catch (e) {
    throw new Error(e as string);
  }
}

export async function updateBucketList(
  input: Omit<
    Prisma.BucketListUpdateArgs['data'],
    'user' | 'createdAt' | 'updatedAt'
  >,
  id: string,
) {
  try {
    const updatedBucketList = await prisma.bucketList.update({
      data: {
        ...input,
      },
      where: {
        id,
      },
    });
    return updatedBucketList;
  } catch (e) {
    throw new Error(e as string);
  }
}

export async function findAllBucketLists(userId: string) {
  try {
    const bucketlists = await prisma.bucketList.findMany({
      where: {
        userId,
      },
    });
    return bucketlists;
  } catch (e) {
    throw new Error(e as string);
  }
}

export async function findOneBucketList(userId: string, id: string) {
  try {
    return prisma.bucketList.findFirst({
      where: {
        id,
        userId,
      },
    });
  } catch (e) {
    throw new Error(e as string);
  }
}

export async function deleteBucketList(bucketListId: string) {
  try {
    return prisma.bucketList.delete({
      where: {
        id: bucketListId,
      },
    });
  } catch (e) {
    throw new Error(e as string);
  }
}
