import Joi from 'joi';

export const createColumnValidationSchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
});
