import Axios from "axios";
import {
  apiUrl
} from '../config/services';

import {
  store
} from '../store';


async function reserveBook(id, date) {
  const {
    userReducer: {
      token
    }
  } = store.getState();

  Axios({
    baseURL: apiUrl,
    url: `/books/${id}/lend`,
    method: 'post',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: `return_day=${date}`

  }).then(response => {

    if (response.status === 200) {
      console.log(`${response.data.message}`);
    }

  }).catch((e) => {

    if (e.response.status === 401) {
      console.log(e.response.data.message);
    } else {
      console.log("can't connect to server!")
    }

  });
}

export {
  reserveBook
}