const jwt = require('jsonwebtoken');

const User = require('../models/user');
const secret = require('../../config');

const loggedIn = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.status(422).json({ message: 'Failed to Verify the Token', error });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({ message: 'No Token Provided on Header' });
  }
};

module.exports = loggedIn;
