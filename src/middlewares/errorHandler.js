import { isHttpError } from 'http-errors';
import { MongooseError } from 'mongoose';

export const errorHandlerMiddleware = (err, req, res, next) => {
  if (isHttpError(err)) {
    return res.status(err.status).json({
      status: err.status,
      message: err.name,
      error: err.message,
    });
  }

  if (err instanceof MongooseError) {
    return res.status(500).json({
      message: 'Mongoose error',
      err: err.message,
    });
  }
  res.status(500).json({
    message: 'Something went wrong on our side',
    error: err.message,
  });
};
