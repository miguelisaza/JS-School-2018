const bookController = require('./controllers/bookController');
const userController = require('./controllers/userController');
const auth = require('./controllers/authController');
const data = require('./data/retrieveData');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cors());

const baseUrl = '/api/';

app.get(`${baseUrl}populateDB`, (req, res) => {
  data.populateDb(req, res);
});

// POST: Login
app.post(`${baseUrl}login`, (req, res) => {
  userController.logIn(req, res);
});

// POST: Register a new user
app.post(`${baseUrl}signup`, (req, res) => {
  userController.signUp(req, res);
});

// GET: get all books, or filter it by its bookshelf location
app.get(`${baseUrl}books`, auth.validateCredentials, (req, res) => {
  bookController.getAllBooksOrFind(req, res);
});

// GET: get a book by its ID
app.get(`${baseUrl}books/:id`, auth.validateCredentials, (req, res) => {
  bookController.getBookById(req, res);
});

// POST: lend a book
app.post(`${baseUrl}books/:id/lend`, auth.validateCredentials, (req, res, next) => {
  bookController.lendBook(req, res, next);
});


app.listen(8000, () => console.log('Running on port 8000'));
