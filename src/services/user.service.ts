import { Prisma } from '@prisma/client';
import omit from 'lodash/omit';
import { prisma } from '../db/prisma';
import { comparePasswords, hashPassword } from '../utils/bcrypt';

export async function createUser(
  input: Omit<
    Prisma.UserCreateArgs['data'],
    'updatedAt' | 'createdAt' | 'id' | 'sessions'
  >,
) {
  try {
    const hashedPassword = await hashPassword(input.password);

    const exists = await prisma.user.findFirst({
      where: {
        email: input.email,
      },
    });

    if (exists) {
      return 'user already exists';
    }

    const user = await prisma.user.create({
      data: {
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        password: hashedPassword,
      },
      select: {
        id: true,
        _count: true,
        bucketLists: true,
        createdAt: true,
        email: true,
        firstName: true,
        lastName: true,
        password: false,
        sessions: true,
        updatedAt: true,
      },
    });

    return user;
  } catch (e) {
    throw new Error(e as string);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return false;
  }

  const isValid = await comparePasswords(password, user.password);

  if (!isValid) {
    return false;
  }

  return omit(user, 'password');
}

export async function findUser({ id }: { id: string }) {
  return prisma.user.findFirst({
    where: {
      id,
    },
  });
}

export async function me({ id }: { id: string }) {
  return prisma.user.findFirst({
    where: {
      id,
    },
  });
}
