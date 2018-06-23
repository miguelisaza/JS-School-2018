const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost/bookshelf');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

function logIn(req, res) {
  User.findOne({
    username: req.body.username,
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(401).json({ message: 'User not found.' });
    } else if (user) {
      if (!user.comparePassword(req.body.password, user.password_hash)) {
        res.status(401).json({ message: 'Authentication failed: Wrong password.' });
      } else {
        return res.json({
          username: user.username,
          name: user.full_name,
          token: jwt.sign({
            username: user.username,
            full_name: user.full_name,
            _id: user._id,
            role: user.role,
          }, 'BookshelfAPI2018', {
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

module.exports = {
  signUp,
  logIn,
};
