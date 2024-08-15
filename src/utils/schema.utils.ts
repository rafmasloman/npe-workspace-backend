import Joi from 'joi';

export const userValidationSchema = Joi.object({
  username: Joi.string().alphanum().min(6).max(20).required(),
  password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  email: Joi.string().email().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  role: Joi.string().valid('ADMIN', 'STAFF', 'PROJECT_MANAGER').required(),
  memberId: Joi.string(),
});
