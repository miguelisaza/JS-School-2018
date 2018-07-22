import {
  requestAllBooks,
  requestBooksByLocation,
  requestUserBooks
} from "../services/bookService";

const getAllBooks = () => {
  const booksArr = [];

  const bookshelf = requestAllBooks()
    .then(({
      books
    }) => {
      books.forEach(book => booksArr.push(book));
    })
    .then(() => booksArr)
    .catch(e => {
      if (e.response === undefined) return false;

      if (e.response.status === 401) {
        return false;
      }

      return e.response;
    });

  return bookshelf;
};

const getBooksByLocation = (location) => {
  const booksArr = [];

  const bookshelf = requestBooksByLocation(location)
    .then(({
      books
    }) => {
      books.forEach(book => booksArr.push(book));
    })
    .then(() => booksArr)
    .catch(e => {
      if (e.response.status === 401) {
        return false;
      }
      return e.response;
    });

  return bookshelf;

};

const getUserBooks = () => {
  const booksArr = [];

  const bookshelf = requestUserBooks()
    .then(({
      books
    }) => {
      books.forEach(book => booksArr.push(book[0]));
    })
    .then(() => booksArr)
    .catch(e => {
      if (e.response.status === 401) {
        return false;
      }
      return e.response;
    });


  return bookshelf;
}

export {
  getAllBooks,
  getBooksByLocation,
  getUserBooks
}