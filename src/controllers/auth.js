import { ACCESS_TOKEN_LIVE_TIME } from '../constants/index.js';
import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from '../services/auth.js';

const setupSessionCookies = (session, res) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ACCESS_TOKEN_LIVE_TIME),
  });

  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ACCESS_TOKEN_LIVE_TIME),
  });
};

export const registerUserController = async (req, res) => {
  const { body } = req;
  const user = await registerUser(body);

  ///
  const session = await loginUser({
    email: body.email,
    password: body.password,
  });
  setupSessionCookies(session, res);

  ///

  res.status(200).json({
    status: 200,
    message: 'User successfully registered',
    data: { user, accessToken: session.accessToken },
  });
};

export const loginUserController = async (req, res) => {
  const { body } = req;
  const { session, user } = await loginUser(body);

  setupSessionCookies(session, res);

  res.status(200).json({
    status: 200,
    message: 'User successfully logged in',
    data: { accessToken: session.accessToken, user },
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshSession(
    req.cookies.sessionId,
    req.cookies.sessionToken,
  );

  setupSessionCookies(session, res);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session',
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res) => {
  await logoutUser(req.cookies.sessionId, req.cookies.sessionToken);

  res.clearCookie('sessionId');
  res.clearCookie('sessionToken');

  res.status(204).send();
};
