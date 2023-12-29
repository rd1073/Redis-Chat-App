const jwt = require("jsonwebtoken");

// Use function keyword or arrow function, not both
function generateToken(id) {
  return jwt.sign({ id }, 'abcd', { expiresIn: '30d' });
}

module.exports = generateToken;