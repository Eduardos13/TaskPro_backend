import { ACCESS_TOKEN_LIVE_TIME } from '../constants/index.js';
import { loginUser, registerUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const { body } = req;
  const user = await registerUser(body);

  res.status(200).json({
    status: 200,
    message: 'User successfully registered',
    data: { user },
  });
};

export const loginUserController = async (req, res) => {
  const { body } = req;
  const session = await loginUser(body);

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ACCESS_TOKEN_LIVE_TIME),
  });

  res.cookie('sessionToken', session.accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ACCESS_TOKEN_LIVE_TIME),
  });

  res.status(200).json({
    status: 200,
    message: 'User successfully logged in',
    data: { accessToken: session.accessToken },
  });
};
