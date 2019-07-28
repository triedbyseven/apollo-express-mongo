const jwt = require('jsonwebtoken');

// Get user token
const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, '123456');
    }
    return null;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getUser
};
