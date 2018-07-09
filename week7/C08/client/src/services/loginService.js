import Axios from 'axios';
import {
  apiUrl
} from '../config/services';

import {
  storeToken
} from '../config/session'


function doLogin(Username, Password) {

  const session = Axios({
    baseURL: apiUrl,
    url: '/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: `username=${Username}&password=${Password}`

  }).then(response => {

    if (response.status === 200) {
      const {
        token
      } = response.data;

      storeToken(token);
      return true;
    }

    return false;

  }).catch((e) => {
    if (e.response === undefined) {
      return 'can\'t connect to server!';
    };
    if (e.response.status === 401) {
      return e.response.data.message;
    }

    return false;

  });

  return session;
}


export {
  doLogin
};