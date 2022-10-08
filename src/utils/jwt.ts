import { Session, User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import logger from './logger';

export const signJwt = (object: Object, options?: jwt.SignOptions): string => {
  const token = jwt.sign(object, process.env.JWT_SECRET as string, {
    issuer: 'bucketlist-server',
    ...options,
  });
  return token;
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e) {
    logger.error(`Failed to verify JWT, ${e}`);
    return {
      valid: false,
      expired: (e as { message: string }).message === 'jwt expired',
      decoded: null,
    };
  }
};

export const createAccessToken = (
  user: Partial<User>,
  sessionId: Session['id'],
): string => {
  return signJwt(
    { ...user, session: sessionId },
    {
      expiresIn: '4w',
    },
  );
};

export const createRefreshToken = (
  user: Partial<User>,
  sessionId: Session['id'],
): string => {
  return signJwt(
    { ...user, session: sessionId },
    {
      expiresIn: '15m',
    },
  );
};
