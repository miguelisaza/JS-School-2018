function bookNotFoundExc() {
  const error = {
    status: 404,
    description: 'Not found',
    message: 'There is no book with this id',
  };

  return error;
}

function lentBookExc() {
  const error = {
    status: 404,
    description: 'Not found',
    message: 'This book is already lent!',
  };

  return error;
}


function lentDigitalExc() {
  const error = {
    status: 401,
    description: 'Forbidden',
    message: 'You cant lent a digital book!',
  };

  return error;
}

module.exports = {
  bookNotFoundExc,
  lentBookExc,
  lentDigitalExc,
};
