import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

// function currying
const validate =
  (schema: AnyZodObject) =>
  // eslint-disable-next-line consistent-return, @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line consistent-return
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      return res.status(400).send(e.errors);
    }
  };
export default validate;
