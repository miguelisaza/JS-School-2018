const fetch = require('node-fetch');
const Books = require('../models/book');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const fs = require('fs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookshelf');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


async function getBooksFromJSON() {
  const books = JSON.parse(fs.readFileSync('data/bookshelf.json', 'utf8'));
  return books;
}

async function getBook(isbn) {
  const apiKey = 'AIzaSyDirtPnHHm5gGIDuEZntIFlu_55xRsl3Jw';
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`);

  const data = await response.json();

  return data.items[0].volumeInfo;
}


function populateDb(req, res) {
  const allBooks = [];

  getBooksFromJSON()
    .then(({
      books,
    }) => {
      books.forEach((book) => {
        allBooks.push(book);
      });
    })
    .then(() => {
      const promises = [];
      allBooks.forEach((book) => {
        const promise = getBook(book.isbn)
          .then((response) => {
            const all = {
              ...book,
              ...response,
            };
            return all;
          });
        promises.push(promise);
      });
      return Promise.all(promises);
    })
    .then((resolve) => {
      resolve.forEach((book) => {
        const newBook = new Books(book);
        newBook.save();
      });
      res.send('db populated');
    });


  // creating new user
  const staticUser = {
    username: 'admin',
    password: 'admin',
    full_name: 'Miguel Isaza',
    role: 'admin',
    occupation: 'engineer',
    age: '23',
  };

  const newUser = new User(staticUser);
  newUser.password_hash = bcrypt.hashSync(staticUser.password, 10);
  newUser.save((err, user) => {
    if (err) {
      console.log(err);
    }
    console.log(user);
  });
}


module.exports = {
  populateDb,
};
