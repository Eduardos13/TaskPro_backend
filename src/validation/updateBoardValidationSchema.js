import Joi from 'joi';

export const updateBoardValidationSchema = Joi.object({
  title: Joi.string().min(3).max(30),
  background: Joi.string().optional(),
  icon: Joi.string().optional(),
  owner: Joi.string().optional(),
}).min(1);
