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

module.exports = {
  bookNotFoundExc,
  lentBookExc,
};

