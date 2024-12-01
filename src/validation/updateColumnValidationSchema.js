import Joi from 'joi';

export const updateColumnValidationSchema = Joi.object({
  title: Joi.string().min(3).max(20),
});
