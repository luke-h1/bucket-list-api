import 'dotenv/config';
import { connect } from './db/prisma';
import createServer from './server';
import logger from './utils/logger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process');

const app = createServer();

app.listen(8000, async () => {
  logger.info(`Server is listening on http://localhost:8000`);

  await exec('npm run prisma:migrate');
  logger.info('Ran migrations');
  await connect();
});
