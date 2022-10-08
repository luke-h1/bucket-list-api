import { Request, Response, NextFunction } from 'express';
import get from 'lodash/get';
import { reIssueAccessToken } from '../services/session.service';
import { verifyJwt } from '../utils/jwt';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // cookie based auth
  // const accessToken =
  //   get(req, 'cookies.accessToken') ||
  //   get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

  // const refreshToken =
  //   get(req, 'cookies.refreshToken') || get(req, 'headers.x-refresh');

  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    '',
  );

  const refreshToken = get(req, 'headers.x-refresh');

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);

      // cookie auth
      // res.cookie('accessToken', accessToken, {
      //   maxAge: 900000, // 15 mins
      //   httpOnly: true, // cookie can only be accesed via http (not js)
      //   domain: 'localhost', // change this domain in production
      //   path: '/',
      //   sameSite: 'strict',
      //   secure: false, // set to true in prod (cookie can only be used over https)
      // });
    }

    const result = verifyJwt(newAccessToken as string);

    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;
