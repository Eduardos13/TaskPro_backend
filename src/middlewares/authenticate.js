import createHttpError from 'http-errors';
import { sessionModel } from '../db/models/session.js';
import { userModel } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('authorization');

  if (!authHeader) {
    return next(createHttpError(401, 'AuthHeader is required'));
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'AuthHeader must be of type Bearer'));
  }

  const session = await sessionModel.findOne({ accessToken: token });

  if (!session) {
    return next(
      createHttpError(401, 'Auth token is not associated with any session'),
    );
  }

  if (session.accessTokenValidUntil < new Date()) {
    return next(createHttpError(401, 'Auth token is expired'));
  }

  const user = await userModel.findById(session.userId);

  if (!user) {
    return next(
      createHttpError(401, 'Auth user is not associated with any session'),
    );
  }

  req.user = user;

  next();
};
