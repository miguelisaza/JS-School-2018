function validateBookshelf(loc, res) {
  console.log(loc);
  if (loc === 'Cartagena' || loc === 'Quito' || loc === 'Medellin' || loc === 'Digital') {
    const result = {
      status: 200,
      message: 'OK',
      books: res,
    };

    return result;
  }

  const result = {
    status: 400,
    message: 'Enter a valid location!',
    valid_locations: ['Cartagena', 'Medellin', 'Quito', 'Digital'],
  };

  return result;
}

module.exports = {
  validateBookshelf,
};
