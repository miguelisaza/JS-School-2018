const Books = require('../models/book');

const exception = require('./exceptionHandler');
const validate = require('./validationHandler');
const auth = require('./authController');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookshelf');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

function getAllBooksOrFind(req, res) {
  const location = req.query.location;
  console.log(location);

  if (location) {
    const query = Books.find({ 'bookshelf.location': location }).exec();
    query.then((data) => {
      const result = validate.validateBookshelf(location, data);
      res.status(result.status).send(result);
    });
  } else {
    const query = Books.find().exec();
    query.then((data) => {
      res.status(200).send(data);
    });
  }
}

function getBookById(req, res) {
  const id = req.params.id;
  const query = Books.find({ bookId: id }).exec();
  query.then((result) => {
    if (!result.length) {
      res.status(404).send(exception.bookNotFoundExc());
    }
    res.send(result);
  });
}

function lendBook(req, res, next) {
  const id = req.params.id;
  const body = req.body;
  const query = Books.find({ bookId: id }).exec();

  query.then((result) => {
    const user = auth.validateCredentials(req, res, next);
    const book = result[0];
    if (book.bookshelf.isLent) {
      res.status(404).send(exception.lentBookExc());
    }

    if (body.return_day) {
      book.bookshelf.isLent = true;
      const response = {
        status: 200,
        message: 'OK, book lent',
        data: {
          book,
          username: user.username,
          return_day: body.return_day,
        },
      };
      res.json(response);
    }
    res.status(400).json({ status: 400, message: 'Please enter a valid body key', valid_key: 'return_day' });
  }).catch(() => {
    res.status(404).send(exception.bookNotFoundExc());
  });
}

module.exports = {
  getAllBooksOrFind,
  getBookById,
  lendBook,
};
