import React, { Component } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import * as booksController from "../../controllers/booksController";
import * as userActions from "../../actions/userActions";
import * as bookActions from "../../actions/bookActions";
import * as reservationActions from "../../actions/reservationActions";
import Book from "../Book/Book";
import ReservationModal from "../Reservation/ReservationModal";
import containerStyle from "./containerStyle";

class BooksContainer extends Component {
  static propTypes = {
    loadBookshelf: PropTypes.func,
    bookshelf: PropTypes.array,
    location: PropTypes.string,
    classes: PropTypes.object,
    logout: PropTypes.func,
    filterText: PropTypes.string,
    loadBookInModal: PropTypes.func,
    openReservationModal: PropTypes.func,
    closeReservationModal: PropTypes.func,
    display: PropTypes.string,
    showModal: PropTypes.bool,
    isLoggedIn: PropTypes.bool
  };

  static defaultProps = {
    loadBookshelf: () => {},
    logout: () => {},
    loadBookInModal: () => {},
    openReservationModal: () => {},
    closeReservationModal: () => {},
    bookshelf: [],
    filterText: "",
    location: "",
    display: "",
    classes: {},
    showModal: false,
    isLoggedIn: false
  };

  state = {
    isLoading: true
  };

  componentDidMount() {
    const { location } = this.props;

    if (!location) {
      this.getAllBooks();
    }
  }

  shouldComponentUpdate(nextProps) {
    const actualLoc = this.props.location;
    const nextLoc = nextProps.location;

    const isTheSame = actualLoc === nextLoc;

    if (!isTheSame) {
      this.triggerLocationChange(nextProps);
      return true;
    }

    return true;
  }

  // Async Request Methods

  getAllBooks = () => {
    const bookshelf = booksController.getAllBooks();

    bookshelf.then(response => {
      this.responseHandler(response);
    });
  };

  getBooksByLocation = location => {
    const bookshelf = booksController.getBooksByLocation(location);

    bookshelf.then(response => {
      this.responseHandler(response);
    });
  };

  getUserBooks = () => {
    const bookshelf = booksController.getUserBooks();
    bookshelf.then(response => {
      this.responseHandler(response);
    });
  };

  // Response handler for Async Methods.

  responseHandler = res => {
    const { logout, loadBookshelf } = this.props;
    if (!res) {
      logout();
    }
    if (res) {
      loadBookshelf(res);
      this.setState({ isLoading: false });
    }
  };

  // UI Methods

  triggerLocationChange = nextProps => {
    const { location } = nextProps;

    if (location === "All Books") {
      this.getAllBooks();
    }

    if (!(location === "Personal Loans" || location === "All Books")) {
      this.getBooksByLocation(location);
    }

    if (location === "Personal Loans") {
      this.getUserBooks();
    }
  };

  showModal = book => {
    const { openReservationModal, loadBookInModal } = this.props;
    openReservationModal();
    loadBookInModal(book);
  };

  hideModal = () => {
    const { closeReservationModal } = this.props;
    closeReservationModal();
  };

  displayAsGrid = () => {
    const { display } = this.props;
    display("grid");
  };

  displayAsList = () => {
    const { display } = this.props;
    display("list");
  };

  render() {
    const { isLoading } = this.state;

    const {
      location,
      classes,
      isLoggedIn,
      filterText,
      bookshelf,
      showModal
    } = this.props;

    const filteredBookshelf = bookshelf.filter(
      book => book.title.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
    );

    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <div className={classes.booksWrapper}>
        <div className={classes.booksHeader}>
          <div className={classes.filterName}>
            <h4 className={classes.filterTitle}>
              {filterText ? `${filterText} in ` : ""}
              {location || "All Books"}
            </h4>
          </div>
          <div className={classes.filterOpt}>
            <h4>
              <span id="rd">Release date</span> &ensp;| &ensp;
              <span className={classes.pop}>Popularity</span>
            </h4>
          </div>
          <div className={classes.displayOpt}>
            <i
              onClick={this.displayAsGrid}
              className="fa fa-th-large display-btn"
            />
            <i
              onClick={this.displayAsList}
              className="fa fa-list display-btn"
            />
          </div>
        </div>
        <div className={classes.booksContainer} id="dyn">
          {isLoading && (
            <img src="/img/loading.gif" alt="Loading..." align="middle" />
          )}

          {filteredBookshelf.map(book => (
            <Book
              book={book}
              key={book.bookId}
              showModal={this.showModal.bind(null, book.bookId)}
            />
          ))}

          {showModal && (
            <ReservationModal show={showModal} handleClose={this.hideModal} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isLoggedIn } = state.userReducer;
  const { bookshelf, filterText, location, shape } = state.bookReducer;
  const { showModal } = state.reservationReducer;

  return {
    isLoggedIn,
    bookshelf,
    filterText,
    location,
    shape,
    showModal
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...userActions,
      ...bookActions,
      ...reservationActions
    },
    dispatch
  );
}

let Container = injectSheet(containerStyle)(BooksContainer);

Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export default Container;
