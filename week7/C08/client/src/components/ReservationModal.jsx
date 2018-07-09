import React, { Component } from "react";
import DatePicker from "react-date-picker";
import { reserveBook } from "../services/reservationService";
import { requestBookById } from "../services/bookService";

class ReservationModal extends Component {
  state = {
    bookId: null,
    bookData: {},
    datePickerIsShown: false,
    returnDate: new Date(),
    isLoading: true
  };

  componentWillMount() {
    const { book } = this.props;
    this.setState({
      bookId: book
    });
  }

  componentDidMount() {
    const { bookId } = this.state;

    requestBookById(bookId)
      .then(({ books }) => {
        this.loadBook(books[0]);
      })
      .catch(e => console.log(e));
  }

  loadBook = book => {
    this.setState({
      bookData: book,
      isLoading: false
    });
  };

  showDatePicker = () => this.setState({ datePickerIsShown: true });

  previewBook = () => window.open(this.state.bookData.previewLink);

  closeModal = () => {
    const { handleClose } = this.props;

    handleClose();
    this.setState({ datePickerIsShown: false });
  };

  saveDate = date => this.setState({ returnDate: date });

  reserveBook = () => {
    const { bookData, returnDate } = this.state;
    const { handleClose } = this.props;

    reserveBook(bookData.bookId, returnDate.toString());
    handleClose();
  };

  render() {
    const { isLoading, bookData, datePickerIsShown, returnDate } = this.state;

    const showHideClassName = this.props.show
      ? "modal display-block"
      : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {isLoading && (
            <img
              id="modal-loading-img"
              src={require("../img/loading.gif")}
              alt="Loading..."
              align="middle"
            />
          )}
          {!isLoading && (
            <div>
              <div className="modal-book-container">
                {" "}
                {this.getRating}
                <div className="modal-book-info">
                  <img src={bookData.imageLinks.thumbnail} alt="book" />
                  <div className="modal-book-names">
                    <h4 id="modal-title">{bookData.title}</h4>
                    <h5 id="modal-author">{bookData.authors[0]}</h5>
                    <h5 id="modal-location">{bookData.bookshelf.location}</h5>
                    {bookData.bookshelf.copies > 0 && (
                      <h5 id="modal-copies">
                        {bookData.bookshelf.copies} copies available{" "}
                      </h5>
                    )}
                    {bookData.bookshelf.copies === 0 && (
                      <h5 id="modal-na">Book not Available</h5>
                    )}
                    {datePickerIsShown && (
                      <div>
                        <h5 id="modal-location">Select your return date</h5>
                        <DatePicker
                          onChange={this.saveDate}
                          value={returnDate}
                        />
                        <button id="submit-button" onClick={this.reserveBook}>
                          {" "}
                          Confirm{" "}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-buttons">
                  <div className="modal-dyn-button">
                    <button onClick={this.previewBook}> Preview </button>
                    {bookData.bookshelf.location === "Digital" && (
                      <button> Download </button>
                    )}
                    {bookData.bookshelf.copies > 0 && (
                      <button onClick={this.showDatePicker}> Lend </button>
                    )}
                    <button onClick={this.closeModal}> Close </button>
                  </div>
                </div>
              </div>

              <div className="modal-summary">
                <h5>SUMMARY:</h5>
                <h6 id="modal-book-summary">{bookData.description} </h6>
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default ReservationModal;
