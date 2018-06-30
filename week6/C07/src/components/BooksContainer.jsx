import React, { Component } from 'react';
import { getAllBooks } from '../services/bookService'
import Book from './Book';
import ReservationModal from './ReservationModal'
import '../css/modal.css';

class BooksContainer extends Component {

  state = {
    showModal: false,
    isLoading: true,
    bookshelf: [],
  }

  showModal = (book) => {
    this.setState({ showModal: true });
    this.modal.getBook(book);
  }

  hideModal = () => {
    this.setState({ showModal: false });
  }

  componentDidMount() {
    let allBooks = []

    getAllBooks()
      .then(({ books }) => {
        if (books === undefined) window.location = '/'
        books.forEach((book) => allBooks.push(book));
      })
      .then(() => {
        this.setState({ bookshelf: allBooks });
        this.setState({ isLoading: false });
      });
  }

  render() {

    let location = this.state.bookshelf.filter(
      (book) => book.bookshelf.location.indexOf(this.props.location) !== -1);

    let filteredBookshelf = location.filter(
      (book) => book.title.toLowerCase().indexOf(this.props.filter.toLowerCase()) !== -1);

    return (
      <div className="books-wrapper">
        <div className="books-headers">
          <div id="filter-name">
            <h4 id="filter-title">New Releases</h4>
          </div>
          <div id="filter-opt">
            <h4>
              <span id="rd">Release date</span> &ensp;| &ensp;
              <span id="pop">Popularity</span>
            </h4>
          </div>
          <div id="display-opt">
            <i className="fa fa-th-large display-btn" />
            <i className="fa fa-list display-btn" />
          </div>
        </div>
        <div className="books-container" id="dyn">
          {this.state.isLoading &&
            <img src={require('../img/loading.gif')} alt="Loading..." align="middle" />}

          {filteredBookshelf.map((book) => {
            return <Book book={book} key={book.bookId} showModal={this.showModal.bind(null, book)} />
          })
          }

          <ReservationModal show={this.state.showModal} handleClose={this.hideModal} ref={ref => { this.modal = ref }} />

        </div>
      </div>
    )
  }
}

export default BooksContainer; 