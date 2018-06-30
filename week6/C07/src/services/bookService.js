const baseUrl = 'http://localhost:8000/api/books'

async function getAllBooks() {
    const books = await fetch(baseUrl, {
        headers: {
            'Authorization': window.sessionStorage.getItem('token')
        }
    });
    const data = await books.json();

    return data;
}

async function getBookByID(id) {
    const books = await fetch(`${baseUrl}/${id}`, {
        headers: {
            'Authorization': window.sessionStorage.getItem('token')
        }
    });
    const data = await books.json();

    return data;
}


export {
    getAllBooks,
    getBookByID
}