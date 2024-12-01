import Joi from 'joi';

export const createBoardValidationSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  background: Joi.string().optional(),
  icon: Joi.string().optional(),
  owner: Joi.string().optional(),
});
