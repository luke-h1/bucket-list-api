import { Request, Response, NextFunction } from 'express';

export default function requireUser(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const { user } = res.locals;

  if (!user) {
    return res.sendStatus(403);
  }
  return next();
}
