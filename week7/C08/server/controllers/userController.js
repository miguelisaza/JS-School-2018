const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const auth = require('./authController');

mongoose.connect('mongodb://localhost/bookshelf');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

function logIn(req, res) {
  User.findOne({
    username: req.body.username,
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(401).json({
        message: 'User not found.',
      });
    } else if (user) {
      if (!user.comparePassword(req.body.password, user.password_hash)) {
        res.status(401).json({
          message: 'Wrong password.',
        });
      } else {
        const usr = { ...user._doc };
        delete usr.password_hash;
        delete usr.__v;

        return res.json({
          username: user.username,
          name: user.full_name,
          token: jwt.sign({ ...usr }, 'BookshelfAPI2018', {
            expiresIn: '1h',
          }),
        });
      }
    }
  });
}

function signUp(req, res) {
  const newUser = new User(req.body);
  newUser.password_hash = bcrypt.hashSync(req.body.password, 10);
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    }
    user.password_hash = 'It\'s secret!';
    const response = {
      status: 201,
      message: 'User created sucessfully!',
      user_data: user,
    };
    return res.status(201).json(response);
  });
}

function getUser(req, res, sendable) {
  jwt.verify(req.headers.authorization.split(' ')[1], 'BookshelfAPI2018', (err, decode) => {
    if (err) {
      req.user = undefined;
      return res.status(401).json({
        status: 401,
        message: 'Invalid token!',
      });
    }
    req.user = decode;
  });

  const usr = { ...req.user };
  delete usr.iat;
  delete usr.exp;

  if (sendable) {
    res.send(usr);
  }

  return usr;
}


module.exports = {
  signUp,
  logIn,
  getUser,
};
