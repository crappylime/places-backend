import compression from 'compression';
import cors, { CorsOptions } from 'cors';
import {
  Application,
  NextFunction,
  Request,
  Response,
  json,
  urlencoded,
} from 'express';
import helmet from 'helmet';
import createError from 'http-errors';
import morgan from 'morgan';

const corsOptions: CorsOptions = {
  origin: process.env.FRONTEND_URL ?? 'https://localhost:3000',
  optionsSuccessStatus: 200,
};

export function middlewares(app: Application): void {
  process.env.NODE_ENV !== 'production' && app.use(morgan('dev'));
  app.use(cors(corsOptions));
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(helmet());
  app.use(compression());
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof createError.HttpError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    const error = createError(500, err.message || 'Internal Server Error');
    res.status(error.statusCode).json({
      message: error.message,
      ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
    });
  }
}
