import * as Joi from 'joi';

export default {
  createUser: {
    body: Joi.object({
      name: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().required(),
      aa: Joi.string().required(),
    }),
  },
};
