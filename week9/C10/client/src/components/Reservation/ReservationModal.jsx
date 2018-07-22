import React, { Component } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import DatePicker from "react-date-picker";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reserveBook } from "../../services/reservationService";
import { requestBookById } from "../../services/bookService";
import modalStyle from "./modalStyle";
import * as reservationActions from "../../actions/reservationActions";

class ReservationModal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    classes: PropTypes.object,
    handleClose: PropTypes.func,
    bookInModal: PropTypes.number
  };

  static defaultProps = {
    show: false,
    classes: {},
    handleClose: () => {},
    bookInModal: null
  };

  state = {
    bookData: {},
    datePickerIsShown: false,
    returnDate: new Date(),
    isLoading: true
  };

  componentDidMount() {
    const { bookInModal } = this.props;

    requestBookById(bookInModal).then(({ books }) => {
      this.loadBook(books[0]);
    });
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

    const { show, classes } = this.props;

    const today = new Date();

    const showHideClassName = show
      ? `${classes.background} ${classes.display}`
      : `${classes.background} ${classes.hide}`;
    return (
      <div className={showHideClassName}>
        <section className={classes.main}>
          {isLoading && (
            <img
              id="modal-loading-img"
              src="../img/loading.gif"
              alt="Loading..."
              align="middle"
            />
          )}
          {!isLoading && (
            <div>
              <div className={classes.bookContainer}>
                {" "}
                {this.getRating}
                <div className={classes.bookInfo}>
                  <img src={bookData.imageLinks.thumbnail} alt="book" />
                  <div className={classes.bookLabels}>
                    <h4 className={classes.label} id="modal-title">
                      {bookData.title}
                    </h4>
                    <h5 className={classes.label} id="modal-author">
                      {bookData.authors[0]}
                    </h5>
                    <h5 className={classes.label} id="modal-location">
                      {bookData.bookshelf.location}
                    </h5>
                    {bookData.bookshelf.copies > 0 && (
                      <h5 className={classes.label} id="modal-copies">
                        {bookData.bookshelf.copies} copies available{" "}
                      </h5>
                    )}
                    {bookData.bookshelf.copies === 0 && (
                      <h5 className={classes.label} id="modal-na">
                        Book not Available
                      </h5>
                    )}
                    {datePickerIsShown && (
                      <div className={classes.reservation}>
                        <h5 className={classes.label} id="modal-location">
                          Select your return date
                        </h5>
                        <DatePicker
                          onChange={this.saveDate}
                          value={returnDate}
                          minDate={today}
                        />
                        <button
                          type="submit"
                          id="submit-button"
                          onClick={this.reserveBook}>
                          {" "}
                          Confirm{" "}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className={classes.buttons}>
                  <div className={classes.dynButtons}>
                    <button type="button" onClick={this.previewBook}>
                      {" "}
                      Preview{" "}
                    </button>
                    {bookData.bookshelf.location === "Digital" && (
                      <button type="button"> Download </button>
                    )}
                    {bookData.bookshelf.copies > 0 && (
                      <button type="button" onClick={this.showDatePicker}>
                        {" "}
                        Lend{" "}
                      </button>
                    )}
                    <button type="button" onClick={this.closeModal}>
                      {" "}
                      Close{" "}
                    </button>
                  </div>
                </div>
              </div>

              <div className={classes.summary}>
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

const mapStateToProps = state => {
  const { bookInModal } = state.reservationReducer;

  return {
    bookInModal
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(reservationActions, dispatch);
}

let ModalWrap = injectSheet(modalStyle)(ReservationModal);

ModalWrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWrap);

export default ModalWrap;
