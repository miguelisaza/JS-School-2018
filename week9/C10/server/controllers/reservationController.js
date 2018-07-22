const Reservation = require('../models/reservation');
const Book = require('../models/book');
const userController = require('./userController');

// const io = require('./sockets');

/* io.sockets.on('connection', (socket) => {
  socket.emit('reservation', 'sup');
});
 */

/* io.on('connection', (socket) => {
  console.log('new connection');

  socket.emit('reservation', 'sup');
}); */

function newReservation(req, res, ...params) {
  const data = {
    bookId: params[0],
    userId: params[1]._id,
    returnDate: req.body.return_day,
  };

  const newRes = new Reservation(data);

  newRes.save((err, reservation) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    return reservation;
  });
}


function getUserLoans(req, res) {
  const user = userController.getUser(req, res, false);

  const { _id } = user;
  const query = Reservation.find({ userId: _id }).exec();

  const promises = [];

  const pr = query.then((leanBooks) => {
    leanBooks.forEach(async (book) => {
      const bookQuery = Book.find({
        bookId: book.bookId,
      }).exec();

      promises.push(bookQuery);
    });
    return promises;
  });

  pr.then((bookPromises) => {
    Promise.all(bookPromises).then((books) => {
      const response = {
        user,
        books,
      };
      res.send(response);
    });
  });
}


module.exports = {
  newReservation,
  getUserLoans,
};
