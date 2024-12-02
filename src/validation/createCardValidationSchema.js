import Joi from 'joi';

export const createCardValidationSchema = Joi.object({
  title: Joi.string().required().min(3).max(20).messages({
    'string.base': 'Title should be a string',
    'string.min': 'Title should be at least 3 characters',
    'string.empty': 'Title cannot be empty',
    'string.max': 'Title should be at most 10 characters',
    'any.required': 'Title is required',
  }),
  description: Joi.string().required().min(10).max(200).messages({
    'string.base': 'Description should be a string',
    'string.min': 'Description should be at least 10 characters',
    'string.empty': 'Description cannot be empty',
    'string.max': 'Description should be at most 200 characters',
    'any.required': 'Description is required',
  }),
  priority: Joi.string()
    .required()
    .valid('without', 'low', 'medium', 'high')
    .default('without')
    .messages({
      'any.required': 'Priority is required',
    }),
  date: Joi.date().optional().messages({
    'any.required': 'Date is required',
  }),
  columnId: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/),
});
