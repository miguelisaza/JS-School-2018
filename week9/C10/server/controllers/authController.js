const jwt = require('jsonwebtoken');

const validateCredentials = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    jwt.verify(req.headers.authorization.split(' ')[1], 'BookshelfAPI2018', (err, decode) => {
      if (err) {
        req.user = undefined;
        return res.status(401).json({
          status: 401,
          message: 'Invalid token!',
        });
      }
      req.user = decode;
      next();
    });
    // res.end();
    return req.user;
  }
  req.user = undefined;
  return res.status(401).json({
    status: 401,
    message: 'You must be authenticated to access this endpoint!',
  });
};

module.exports = {
  validateCredentials,
};
