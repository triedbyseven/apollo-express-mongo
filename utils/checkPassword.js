const bcrypt = require('bcrypt');

const checkPassword = async (password, hash) => {
  // Check password against hashed password
  return await bcrypt.compare(password, hash);
};

module.exports = {
  checkPassword
};
