import Joi from 'joi';

export const loginUserValidationSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .pattern(
      /^[a-zA-Z0-9!#$%^&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%^&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]{2,}$/,
    ),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9!@#$%^&*()_+=[\]{}|;:'",.<>?/-]*$/)
    .min(6) // pet 8 later
    .max(64),
});
