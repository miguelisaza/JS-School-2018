const allBooks = [];

async function getBooks(){
    const books = await fetch('data/bookshelf.json');
    const data = await books.json();

    return data; 
}

async function getGoogleBook(info){
    /*another apy key if the free quota is fullfilled. 
    /const apiKey = "AIzaSyBJxjkA2EQrQ_fcAumzTmyrGDKIi3ifB30";*/
    const apiKey = "AIzaSyDirtPnHHm5gGIDuEZntIFlu_55xRsl3Jw";
    const response = await fetch(`${info}&key=${apiKey}`);
    
    data = await response.json();
    return data.items[0].volumeInfo; 
}

function renderHtml(books){
    const stars = 5; 
    let bookHTML ="";

    books.forEach(book => {
        const star = book.rating;
        const starO = stars - star; 

        let sTemplate = ""
        let sOTemplate = "";

        for(st = 0; st < star; st++){
            sTemplate +=`<span class="fa fa-star"></span>
            `
        }
        for(so = 0;so < starO; so++){
            sOTemplate +=`<span class="fa fa-star-o"></span>
            `
        }
        starTemplate = sTemplate + sOTemplate;

        if(!book.isLent){
            
            bookHTML += 
            `<div class="books" id="${book.isbn}">
                <img src="${book.imageLinks.thumbnail}">
                <h4>${ book.title }</h4>
                <h5>${book.authors[0]}</h5>
                ${starTemplate}
            </div>

            `
        }
        else {
            bookHTML += 
            `<div class="books lent" id="${book.isbn}">
                <img src="${book.imageLinks.thumbnail}">
                <img src="img/borrowed.png" id="borrowed" align="right">
                <h4>${ book.title }</h4>
                <h5>${book.authors[0]}</h5>
                ${starTemplate}
            </div>

            `
        }
    })

    document.getElementById("dyn").innerHTML = bookHTML;
    return bookHTML;

}

function renderTooltips(){

    tippy('.books', {
        arrow: true,
        touchHold: true,
        delay: [150, 100],
        animation: 'scale',
        placement: 'right',
        flip: true,
        html: '#book-info'

        //todo: dynamic tooltips
      
      })

}

getBooks()
    .then(({ books }) => {
        books.forEach(book =>{
            allBooks.push(book);
        })
    })
    .then(() => {
        let promises = [];
        allBooks.forEach( book  => {
           let promise = getGoogleBook(book.fullBookInfo)
            .then(response => {
                let all = {
                    ...book,
                    ...response,
                }
                return all;
            })
            promises.push(promise);
        }) 
        return Promise.all(promises)
    })
    .then((resolve) => {
        renderHtml(resolve);

        renderTooltips();
    })