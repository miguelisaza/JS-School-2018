async function doLogin(Username, Password) {

  fetch("http://localhost:8000/api/login", {
    method: "POST",
    cache: 'no-cache',
    mode: 'cors',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `username=${Username}&password=${Password}`
  }).then(response => {

    if (response.status === 401) {
      alert('Invalid Username or Password!');
    }

    if (response.status === 200) {

      const data = response.json();

      data.then(res => {
        const bearer = `Bearer ${res.token}`;
        console.log(bearer);
        window.sessionStorage.setItem('token', bearer)
      });
      window.location = '/main'
    }

  }).catch(e => alert('Can\'t connect to server'));
}

export {
  doLogin
}