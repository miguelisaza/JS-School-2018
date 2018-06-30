async function reserveBook(id, date) {
  fetch(`http://localhost:8000/api/books/${id}/lend`, {
    method: "POST",
    cache: 'no-cache',
    mode: 'cors',
    headers: {
      'Authorization': window.sessionStorage.getItem('token'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `return_day=${date}`
  }).then(response => {

    if (response.status === 401) {
      alert('Invalid stuff!');
    }

    if (response.status === 200) {

      const data = response.json();
      data.then(res => {
        alert(`${res.message} by ${res.data.username} until ${res.data.return_day}`)
      });
    }

  }).catch(e => alert('Can\'t connect to server'));
}

export {
  reserveBook
}