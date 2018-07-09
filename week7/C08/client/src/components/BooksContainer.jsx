import React, { Component } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import * as booksController from "../controllers/booksController";
import Book from "./Book";
import ReservationModal from "./ReservationModal";
import "../css/modal.css";

class BooksContainer extends Component {
  static propTypes = {
    filter: PropTypes.string,
    location: PropTypes.string
  };

  static defaultProps = {
    filter: "",
    location: ""
  };

  state = {
    backToLogin: false,
    showModal: false,
    bookInModal: null,
    isLoading: true,
    bookshelf: [],
    display: "grid"
  };

  componentDidMount() {
    const { location } = this.props;

    if (!location) {
      this.getAllBooks();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoading: true,
      bookshelf: []
    });

    // this will be improved soon.
    if (!(nextProps.location === "Personal Loans")) {
      this.getBooksByLocation(nextProps);
    }

    if (nextProps.location === "Personal Loans") {
      this.getUserBooks();
    }
  }

  shouldComponentUpdate(nextProps) {
    const keepsTheSame = nextProps === this.props;
    return keepsTheSame;
  }

  getAllBooks = () => {
    const bookshelf = booksController.getAllBooks();

    bookshelf.then(response => {
      this.responseHandler(response);
    });
  };

  getBooksByLocation = ({ location }) => {
    const bookshelf = booksController.getBooksByLocation(location);

    bookshelf.then(response => {
      this.responseHandler(response);
    });
  };

  getUserBooks = () => {
    this.setState({ isLoading: true });
    const bookshelf = booksController.getUserBooks();
    bookshelf.then(response => {
      this.responseHandler(response);
    });
  };

  responseHandler = res => {
    if (!res) {
      this.setState({ backToLogin: true });
    }

    this.setState({ bookshelf: res });
    this.setState({ isLoading: false });
  };

  showModal = book => {
    this.setState({
      showModal: true,
      bookInModal: book
    });
  };

  hideModal = () => {
    this.setState({
      showModal: false,
      bookInModal: null
    });
  };

  displayAsGrid = () =>{
    this.setState({display: "grid"})

  }

  displayAsList = () => {
    this.setState({display: "list"})

  }

  render() {
    const {
      isLoading,
      bookshelf,
      showModal,
      bookInModal,
      backToLogin,
      display
    } = this.state;

    const { location, filter } = this.props;

    const filteredBookshelf = bookshelf.filter(
      book => book.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    );

    if (backToLogin) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="books-wrapper">
        <div className="books-headers">
          <div id="filter-name">
            <h4 id="filter-title">
              {filter ? `${filter} in ` : ""}
              {location || "All Books"}
            </h4>
          </div>
          <div id="filter-opt">
            <h4>
              <span id="rd">Release date</span> &ensp;| &ensp;
              <span id="pop">Popularity</span>
            </h4>
          </div>
          <div id="display-opt">
            <i onClick={this.displayAsGrid} className="fa fa-th-large display-btn" />
            <i onClick={this.displayAsList}  className="fa fa-list display-btn" />
          </div>
        </div>
        <div className="books-container" id="dyn">
          {isLoading && (
            <img
              src={require("../img/loading.gif")}
              alt="Loading..."
              align="middle"
            />
          )}

          {filteredBookshelf.map(book => (
            <Book
              book={book}
              key={book.bookId}
              showModal={this.showModal.bind(null, book.bookId)}
              display={display}
            />
          ))}

          {showModal && (
            <ReservationModal
              show={showModal}
              handleClose={this.hideModal}
              book={bookInModal}
            />
          )}
        </div>
      </div>
    );
  }
}

export default BooksContainer;
