import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { userModel } from '../db/models/user.js';
import { sessionModel } from '../db/models/session.js';
import {
  ACCESS_TOKEN_LIVE_TIME,
  REFRESH_TOKEN_LIVE_TIME,
} from '../constants/index.js';

const createSession = () => ({
  accessToken: crypto.randomBytes(16).toString('base64'),
  refreshToken: crypto.randomBytes(16).toString('base64'),
  accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_LIVE_TIME),
  refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_LIVE_TIME),
});

const findUserByEmail = async (email) => await userModel.findOne({ email });

export const registerUser = async (payload) => {
  let user = await findUserByEmail(payload.email);

  if (user) {
    throw createHttpError(409, 'Email is already in use ');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  user = await userModel.create({ ...payload, password: hashedPassword });

  return user;
};

export const loginUser = async (payload) => {
  const user = await findUserByEmail(payload.email);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const arePasswordsEqual = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!arePasswordsEqual) {
    throw createHttpError(401, 'User email or password is incorrect');
  }

  await sessionModel.deleteOne({ userId: user._id });

  const session = sessionModel.create({
    userId: user._id,
    ...createSession(),
  });

  return { session, user };
};

export const refreshSession = async (sessionId, sessionToken) => {
  const session = await sessionModel.findOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session is not found');
  }

  const now = new Date();

  if (session.refreshTokenValidUntil < now) {
    throw createHttpError(401, 'Refresh token is expired');
  }

  await sessionModel.deleteOne({ _id: sessionId, refreshToken: sessionToken });

  const newSession = sessionModel.create({
    userId: session.userId,
    ...createSession(),
  });

  return newSession;
};

export const logoutUser = async (sessionId, sessionToken) => {
  await sessionModel.deleteOne({ _id: sessionId, refreshToken: sessionToken });
};
