const allBooks = [];

async function getBooks() {
  const books = await fetch('data/bookshelf.json');
  const data = await books.json();

  return data;
}

async function getBook(isbn) {
  const apiKey = 'AIzaSyDirtPnHHm5gGIDuEZntIFlu_55xRsl3Jw';
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`);
  const data = await response.json();

  return data.items[0].volumeInfo;
}

function renderBooks(books) {
  const stars = 5;
  let bookHTML = '';

  books.forEach((book) => {
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

    bookHTML +=
    `<div class="books ${book.bookshelf.location}" id="${book.isbn}">
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
    html: '#book-info',

  });
}

// Main Execution
getBooks()
  .then(({
    books,
  }) => {
    books.forEach((book) => {
      allBooks.push(book);
    });
  })
  .then(() => {
    const promises = [];
    allBooks.forEach((book) => {
      const promise = getBook(book.isbn)
        .then((response) => {
          const all = {
            ...book,
            ...response,
          };
          return all;
        });
      promises.push(promise);
    });
    return Promise.all(promises);
  })
  .then((resolve) => {
    renderBooks(resolve);

    renderTooltips();
  });

