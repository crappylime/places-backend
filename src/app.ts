import debug from 'debug';
import { config } from 'dotenv';
import express from 'express';
import { Server } from 'http';
import createError from 'http-errors';
import { errorHandler, middlewares } from './middlewares';
import router from './routes';

config();

const app = express();
let server: Server;
const log = debug('places:server');
const port = +(process.env.PORT ?? 8080);

middlewares(app);
app.use('/api', router);
app.use((req, res, next) => next(createError(404)));
app.use(errorHandler);

export function startServer(): void {
  server = app.listen(port, () => {
    log(`Server listening on port ${port}`);
  });

  server.on('error', (error: Error) => {
    log(`Error occurred while starting the server: ${error}`);
    process.exit(1);
  });

  const handleTermination = () => {
    stopServer().then(() => {
      process.exit(0);
    });
  };

  process.on('SIGTERM', handleTermination);
  process.on('SIGINT', handleTermination);
}

export async function stopServer(): Promise<Server> {
  log('Stopping server...');
  return server.close((err?: Error) => {
    if (err) {
      log(`Error while stopping server: ${err.message}`);
    } else {
      log('Server stopped');
    }
  });
}
