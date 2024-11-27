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
  await loginUser(body);

  res.status(200).json({
    status: 200,
    message: 'User successfully logged in',
  });
};
