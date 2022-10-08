import cors from 'cors';
import express, { Express } from 'express';
import deserializerUser from './middleware/deserializeUser';
import routes from './routes/routes';
import { isProd } from './utils/isProd';

export default function createServer(): Express {
  const app = express();

  app.use(
    cors({
      origin: !isProd ? 'http://localhost:3000' : '*',
      credentials: true,
    }),
  );

  app.use(express.json());

  app.use(deserializerUser);

  routes(app);

  return app;
}
