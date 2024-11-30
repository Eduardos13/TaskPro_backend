import { Router } from 'express';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserValidationSchema } from '../validation/registerUserValidationSchema.js';
import { loginUserValidationSchema } from '../validation/loginUserValidationSchema.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserValidationSchema),
  controllerWrapper(registerUserController),
);
authRouter.post(
  '/login',
  validateBody(loginUserValidationSchema),
  controllerWrapper(loginUserController),
);
authRouter.post('/logout', controllerWrapper(logoutUserController));
authRouter.post(
  '/refresh-session',
  controllerWrapper(refreshUserSessionController),
);

export default authRouter;
