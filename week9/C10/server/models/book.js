const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookshelf');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const booksSchema = mongoose.Schema({
  bookId: Number,
  isbn: String,
  acquisitionDate: String,
  bookshelf: {
    location: String,
    copies: Number,
    isLent: Boolean,
  },
  rating: Number,
}, { strict: false });

const Books = mongoose.model('books', booksSchema);

module.exports = Books;
