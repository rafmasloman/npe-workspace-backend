import Joi from 'joi';

const authSchema = {
  changePasswordSchema: Joi.object({
    oldPassword: Joi.string().required().messages({
      'required-message': 'Mohon masukkan password lama',
      'type-message': 'Input tidak valid',
    }),
    newPassword: Joi.string().required().messages({
      'required-message': 'Mohon masukkan password baru',
      'type-message': 'Input tidak valid',
    }),
  }),
};

export default authSchema;
