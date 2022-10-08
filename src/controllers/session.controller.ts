import { Request, Response } from 'express';
import {
  createSession,
  findSessions,
  updateSession,
} from '../services/session.service';
import { validatePassword } from '../services/user.service';
import { createAccessToken, createRefreshToken } from '../utils/jwt';

export async function createUserSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send('Invalid credentials');
  }

  // create new session
  const session = await createSession(user.id, req.get('user-agent') || '');

  // create access token
  const accessToken = createAccessToken(user, session.id);

  // create refresh token
  const refreshToken = createRefreshToken(user, session.id);

  // cookie auth
  // res.cookie('accessToken', accessToken, {
  //   maxAge: 900000, // 15 mins
  //   httpOnly: true, // cookie can only be accesed via http (not js)
  //   domain: 'localhost', // change this domain in production
  //   path: '/',
  //   sameSite: 'strict',
  //   secure: false, // set to true in prod (cookie can only be used over https)
  // });
  // res.cookie('refreshToken', refreshToken, {
  //   maxAge: 3.154e10, // 1 year
  //   httpOnly: true, // cookie can only be accesed via http (not js)
  //   domain: 'localhost', // change this domain in production
  //   path: '/',
  //   sameSite: 'strict',
  //   secure: false, // set to true in prod (cookie can only be used over https)
  // });

  // return refresh + access token for jwt authentication
  return res.send({
    accessToken,
    refreshToken,
  });
}

export async function getUserSessionsHandler(_req: Request, res: Response) {
  const userId = res.locals.user.id;

  const sessions = await findSessions(userId, true);

  return res.send(sessions);
}

export async function deleteUserSessionHandler(_req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({
    id: sessionId,
    valid: false,
  });

  // cookie auth
  // res.clearCookie('accessToken');
  // res.clearCookie('refreshToken');

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
