import Joi from 'joi';

export const updateCardValidationSchema = Joi.object({
  title: Joi.string().min(3).max(10).messages({
    'string.base': 'Title should be a string',
    'string.min': 'Title should be at least 3 characters',
    'string.empty': 'Title cannot be empty',
    'string.max': 'Title should be at most 10 characters',
  }),
  description: Joi.string().min(10).max(200).messages({
    'string.base': 'Description should be a string',
    'string.min': 'Description should be at least 10 characters',
    'string.empty': 'Description cannot be empty',
    'string.max': 'Description should be at most 200 characters',
  }),
  priority: Joi.string()
    .valid('without', 'low', 'medium', 'high')
    .default('without'),
  date: Joi.date(),
});
