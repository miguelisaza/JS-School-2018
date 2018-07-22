import React, { Component } from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as bookActions from "../../actions/bookActions";
import bookStyle from "./bookStyle";

class Book extends Component {
  static propTypes = {
    book: PropTypes.object,
    showModal: PropTypes.func,
    shape: PropTypes.string,
    classes: PropTypes.object
  };

  static defaultProps = {
    book: {},
    showModal: () => {},
    shape: "",
    classes: {}
  };

  state = {
    displayAsList: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.shape === "grid") {
      this.setState({ displayAsList: false });
    }
    if (nextProps.shape === "list") {
      this.setState({ displayAsList: true });
    }
  }

  render() {
    const { book, showModal, classes } = this.props;
    const { displayAsList } = this.state;

    const maxStars = 5;
    const star = [...Array(book.rating).keys()];
    const starO = [...Array(maxStars - book.rating).keys()];

    return (
      <div
        onClick={showModal}
        className={
          displayAsList
            ? `${classes.list} ${book.bookshelf.location}`
            : `${classes.books} ${book.bookshelf.location}`
        }
        id={book.isbn}>
        <img src={book.imageLinks.thumbnail} alt="book" />
        {book.bookshelf.isLent && (
          <img
            src="/img/borrowed.png"
            id={displayAsList ? "borrowed-list" : "borrowed-book"}
            alt="Lent"
            align="right"
          />
        )}
        <h4>{book.title}</h4>
        <h5>{book.authors[0]}</h5>
        {star.map(i => <span key={i} className="fa fa-star" />)}
        {starO.map(i => <span key={i} className="fa fa-star-o" />)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { shape } = state.bookReducer;

  return {
    shape
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(bookActions, dispatch);
}

let BookWrap = injectSheet(bookStyle)(Book);

BookWrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookWrap);

export default BookWrap;
