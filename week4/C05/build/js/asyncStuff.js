var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

let getBooks = (() => {
  var _ref = _asyncToGenerator(function* () {
    const books = yield fetch('data/bookshelf.json');
    const data = yield books.json();

    return data;
  });

  return function getBooks() {
    return _ref.apply(this, arguments);
  };
})();

let getBook = (() => {
  var _ref2 = _asyncToGenerator(function* (isbn) {
    /* another apy key if the free quota is fullfilled.
      /const apiKey = "AIzaSyBJxjkA2EQrQ_fcAumzTmyrGDKIi3ifB30"; */
    const apiKey = 'AIzaSyDirtPnHHm5gGIDuEZntIFlu_55xRsl3Jw';
    const response = yield fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`);
    const data = yield response.json();

    return data.items[0].volumeInfo;
  });

  return function getBook(_x) {
    return _ref2.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const allBooks = [];

function renderBooks(books) {
  const stars = 5;
  let bookHTML = '';

  books.forEach(book => {
    const star = book.rating;
    const starO = stars - star;

    let sTemplate = '';
    let sOTemplate = '';

    for (let st = 0; st < star; st++) {
      sTemplate += '<span class="fa fa-star"></span>';
    }
    for (let so = 0; so < starO; so++) {
      sOTemplate += '<span class="fa fa-star-o"></span>';
    }
    const starTemplate = sTemplate + sOTemplate;

    let lent = '';

    if (!book.bookshelf.isLent) {
      lent = '';
    } else {
      lent = '<img src="img/borrowed.png" id="borrowed" align="right">';
    }

    bookHTML += `<div class="books ${book.bookshelf.location}" id="${book.isbn}">
        <img src="${book.imageLinks.thumbnail}">
        ${lent}
        <h4>${book.title}</h4>
        <h5>${book.authors[0]}</h5>
        ${starTemplate}
    </div>`;
  });

  document.getElementById('dyn').innerHTML = bookHTML;

  return bookHTML;
}

function renderTooltips() {
  tippy('.books', {
    arrow: true,
    touchHold: true,
    delay: [150, 100],
    animation: 'scale',
    placement: 'right',
    flip: true,
    html: '#book-info'

  });
}

// Main Execution
getBooks().then(({
  books
}) => {
  books.forEach(book => {
    allBooks.push(book);
  });
}).then(() => {
  const promises = [];
  allBooks.forEach(book => {
    const promise = getBook(book.isbn).then(response => {
      const all = _extends({}, book, response);
      return all;
    });
    promises.push(promise);
  });
  return Promise.all(promises);
}).then(resolve => {
  renderBooks(resolve);

  renderTooltips();
});