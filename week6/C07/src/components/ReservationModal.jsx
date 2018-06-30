import React, { Component } from 'react';
import DatePicker from 'react-date-picker'
import { reserveBook } from '../services/reservationService'


class ReservationModal extends Component {

  state = {
    bookId: null,
    bookData: {},
    modalIsShown: false,
    datePickerIsShown: false,
    returnDate: new Date(),
    isLoading: true,
  }

  getBook = (book) => {
    this.setState({
      bookId: book.bookId,
      bookData: book,
      modalIsShown: true,
    })
  }

  showDatePicker = () => this.setState({ datePickerIsShown: true })

  previewBook = () => window.open(this.state.bookData.previewLink)

  closeModal = () => {
    this.props.handleClose();
    this.setState({ datePickerIsShown: false })
  }

  saveDate = date => this.setState({ returnDate: date })

  reserveBook = () => {
    reserveBook(this.state.bookData.bookId, this.state.returnDate.toString())
  }

  render() {

    const showHideClassName = this.props.show ? 'modal display-block' : 'modal display-none';
    return (
      <div className={showHideClassName}>
        <section className='modal-main'>
          {this.state.modalIsShown &&
            <div className="modal-book-container"> {this.getRating}
              <div className="modal-book-info">
                <img src={this.state.bookData.imageLinks.thumbnail} alt="book"></img>
                <div className="modal-book-names">
                  <h4 id="modal-title">{this.state.bookData.title}</h4>
                  <h5 id="modal-author">{this.state.bookData.authors[0]}</h5>
                  <h5 id="modal-location">{this.state.bookData.bookshelf.location}</h5>
                  {(this.state.bookData.bookshelf.copies > 0) &&
                    <h5 id="modal-copies">{this.state.bookData.bookshelf.copies} copies available </h5>}
                  {(this.state.bookData.bookshelf.copies === 0) &&
                    <h5 id="modal-na">Book not Available</h5>}
                  {this.state.datePickerIsShown &&
                    <div>
                      <h5 id="modal-location">Select your return date</h5>
                      <DatePicker onChange={this.saveDate} value={this.state.returnDate} />
                      <button id="submit-button" onClick={this.reserveBook}> Confirm </button>
                    </div>}

                </div>
              </div>
              <div className="modal-buttons">

                {this.state.modalIsShown &&
                  <div className="modal-dyn-button">
                    <button onClick={this.previewBook}> Preview </button>
                    {(this.state.bookData.bookshelf.location === 'Digital') &&
                      <button> Download </button>}
                    {(this.state.bookData.bookshelf.copies > 0) &&
                      <button onClick={this.showDatePicker}> Lend </button>}
                    <button onClick={this.closeModal}> Close </button>
                  </div>
                }
              </div>
            </div>}

          <div className="modal-summary">
            <h5>SUMMARY:</h5>
            <h6 id="modal-book-summary">{this.state.bookData.description} </h6>
          </div>

        </section>
      </div>
    );

  }
}



export default ReservationModal; 