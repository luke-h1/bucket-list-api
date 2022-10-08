import get from 'lodash/get';
import { prisma } from '../db/prisma';
import { createAccessToken, verifyJwt } from '../utils/jwt';
import { findUser } from './user.service';

export async function createSession(userId: string, userAgent: string) {
  const session = await prisma.session.create({
    data: {
      userAgent,
      userId,
      valid: true,
    },
  });
  return session;
}

export async function findSessions(userId: string, valid: boolean) {
  const session = await prisma.session.findFirst({
    where: {
      userId,
      valid,
    },
  });
  return session;
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, 'session')) {
    return false;
  }

  const session = await prisma.session.findFirst({
    where: {
      id: get(decoded, 'session'),
    },
  });

  if (!session || !session.valid) {
    return false;
  }

  const user = await findUser({ id: session.userId });

  if (!user) {
    return false;
  }

  const accessToken = createAccessToken(user, session.id);
  return accessToken;
}

export async function updateSession({
  id,
  valid,
}: {
  id: string;
  valid: boolean;
}) {
  return prisma.session.update({
    data: {
      valid,
    },
    where: {
      id,
    },
  });
}
