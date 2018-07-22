const bookController = require('./controllers/bookController');
const userController = require('./controllers/userController');
const reservationController = require('./controllers/reservationController');
const auth = require('./controllers/authController');
const data = require('./data/retrieveData');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const baseUrl = '/api/';
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// set socketIo for use in another parts of the app
app.set('socketIo', io);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cors());

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

app.get(`${baseUrl}user`, (req, res) => {
  userController.getUser(req, res, true);
});

app.get(`${baseUrl}user/loans`, (req, res) => {
  reservationController.getUserLoans(req, res);
});


// GET: get all books, or filter it by its bookshelf location
app.get(`${baseUrl}books`, auth.validateCredentials, (req, res) => {
  bookController.getAllBooksOrFind(req, res);
});

// GET: get a book by its ID
app.get(`${baseUrl}books/:id`, auth.validateCredentials, (req, res) => {
  bookController.getBookById(req, res, true);
});

// POST: lend a book
app.post(`${baseUrl}books/:id/lend`, auth.validateCredentials, (req, res, next) => {
  bookController.lendBook(req, res, next);
});


http.listen(8000, () => console.log('Running on port 8000'));
