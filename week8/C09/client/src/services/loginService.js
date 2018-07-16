import Axios from 'axios';
import {
  apiUrl
} from '../config/services';

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
    const {
      token
    } = response.data;

    const res = {
      isLoggedIn: false,
      token
    }

    if (response.status === 200) {
      res.isLoggedIn = true;
      res.token = `Bearer ${token}`;

      return res;
    }

    return res;

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