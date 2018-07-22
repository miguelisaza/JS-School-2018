import Axios from 'axios';
import {
  apiUrl
} from '../config/services';

import {
  store
} from '../store';


async function privateGETRequest(url) {

  const {
    userReducer: {
      token
    }
  } = store.getState();


  const request = await Axios({
    baseURL: apiUrl,
    url,
    method: 'get',
    headers: {
      'Authorization': token
    }
  });

  return request.data;
}

async function requestAllBooks() {

  const books = privateGETRequest('/books');

  return books;
}

async function requestBookById(id) {
  const book = privateGETRequest(`/books/${id}`);

  return book;
}

async function requestBooksByLocation(location) {
  const books = privateGETRequest(`/books?location=${location}`);

  return books;
}

async function requestUserBooks() {
  const books = privateGETRequest(`/user/loans`);

  return books;

}


export {
  requestAllBooks,
  requestBookById,
  requestBooksByLocation,
  requestUserBooks
};