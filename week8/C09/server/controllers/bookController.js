const Book = require('../models/book');
const reservationController = require('./reservationController');
const exception = require('./exceptionHandler');
const validate = require('./validationHandler');
const auth = require('./authController');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookshelf');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

function getAllBooksOrFind(req, res) {
  const location = req.query.location;

  if (location) {
    const query = Book.find({
      'bookshelf.location': location,
    }).exec();
    query.then((data) => {
      const result = validate.validateBookshelf(location, data);
      res.status(result.status).send(result);
    });
  } else {
    const query = Book.find().exec();
    query.then((data) => {
      const response = {
        status: 200,
        message: 'OK, All books!',
        books: data,
      };

      res.status(200).send(response);
    });
  }
}

function getBookById(req, res, sendable) {
  const id = req.params.id;
  const query = Book.find({
    bookId: id,
  }).exec();
  query.then((result) => {
    if (!result.length) {
      res.status(404).send(exception.bookNotFoundExc());
    }
    const response = {
      status: 200,
      message: 'OK, Single book',
      books: result,
    };
    if (sendable) {
      res.send(response);
    }

    return result;
  });
}

function lendBook(req, res, next) {
  const id = req.params.id;
  const body = req.body;
  Book.findOne({
    bookId: id,
  }, (err, book) => {
    if (book) {
      const user = auth.validateCredentials(req, res, next);

      if (book.bookshelf.location === 'Digital') {
        return res.status(403).send(exception.lentDigitalExc());
      }

      if (body.return_day) {
        if (book.bookshelf.copies > 0) {
          book.bookshelf.copies -= 1;
        }

        if (book.bookshelf.isLent) {
          return res.status(404).send(exception.lentBookExc());
        }

        if (book.bookshelf.copies === 0) {
          book.bookshelf.isLent = true;
        }


        const reservation = reservationController.newReservation(req, res, id, user);
        book.save();

        const response = {
          status: 200,
          message: 'OK, book lent',
          data: {
            book,
            reservation,
          },
        };
        res.json(response);
      } else {
        res.status(400).json({
          status: 400,
          message: 'Please enter a valid body key',
          valid_key: 'return_day',
        });
      }
    }

    if (err) {
      console.log('ERRRRRRRRRRRRRRRRRRRORRRR', err);
      res.status(404).send(exception.bookNotFoundExc());
    }
  });
}

module.exports = {
  getAllBooksOrFind,
  getBookById,
  lendBook,
};
