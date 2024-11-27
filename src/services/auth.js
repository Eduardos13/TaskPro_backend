import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { userModel } from '../db/models/user.js';

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
};
