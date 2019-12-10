const Joi = require('@hapi/joi');

/**
 * Returns any errors if the user logging in user submits incorrect credentials.
 * @param {String} username - A value that will have the users unique username.
 * @param {String} password - A value that will have the users password.
 */
async function validateLoginUser(username, password) {
  return await userLoginSchema.validate({
    username: username,
    password: password
  });
}

/**
 * Returns any errors if the user regestering for an account submits any incorrect credentials.
 * @param {String} username - A value that will have the users unique username.
 * @param {String} email - A value that will have the users unique email.
 * @param {String} password - A value that will have the users password.
 */
async function validateRegisteredUser(username, email, password) {
  return await userRegisterSchema.validate(
    { username: username, email: email, password: password },
    { abortEarly: false }
  );
}

// Joi schemas
const userRegisterSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(5)
    .max(20)
    .required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] }
  }),

  password: Joi.string().regex(/^[a-zA-Z0-9!@#]{0,30}$/)
});

const userLoginSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(5)
    .max(20)
    .required(),

  password: Joi.string().regex(/^[a-zA-Z0-9!@#]{0,30}$/)
});

module.exports = {
  validateLoginUser,
  validateRegisteredUser
};
