import debug from 'debug';
import { config } from 'dotenv';
import express from 'express';
import { Server } from 'http';
import { errorHandler, middlewares } from './middlewares';
import router from './routes';

config();

const app = express();
let server: Server;
const log = debug('places:server');
const port = +(process.env.PORT ?? 8080);

middlewares(app);
app.use('/api', router);
app.use(errorHandler);

export function startServer(): void {
  server = app.listen(port, () => {
    log(`Server listening on port ${port}`);
  });

  server.on('error', (error: Error) => {
    log(`Error occurred while starting the server: ${error}`);
    process.exit(1);
  });

  process.on('SIGINT', () => {
    stopServer();
  });
}

export async function stopServer(): Promise<void> {
  log('Stopping server...');
  server.close((err?: Error) => {
    if (err) {
      log(`Error while stopping server: ${err.message}`);
    } else {
      log('Server stopped');
    }
  });
}
