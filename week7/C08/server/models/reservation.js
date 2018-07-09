const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookshelf');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const reservationSchema = mongoose.Schema({
  bookId: Number,
  userId: Number,
  returnDate: Date,
});

const Reservations = mongoose.model('reservations', reservationSchema);

module.exports = Reservations;
