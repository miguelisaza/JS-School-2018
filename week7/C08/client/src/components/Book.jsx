import React, { Component } from "react";
import PropTypes from "prop-types";

class Book extends Component {
  static propTypes = {
    book: PropTypes.object,
    showModal: PropTypes.func
  };

  static defaultProps = {
    book: {},
    showModal: () => {}
  };

  state = {
    displayAsList: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.display === "grid") {
      this.setState({ displayAsList: false });
    }
    if (nextProps.display === "list") {
      this.setState({ displayAsList: true });
    }
  }

  render() {
    const { book } = this.props;
    const { displayAsList } = this.state;

    const maxStars = 5;
    const star = [...Array(book.rating).keys()];
    const starO = [...Array(maxStars - book.rating).keys()];

    return (
      <div
        onDoubleClick={this.props.showModal}
        className={
          displayAsList
            ? `list ${book.bookshelf.location}`
            : `books ${book.bookshelf.location}`
        }
        id={book.isbn}>
        <img src={book.imageLinks.thumbnail} alt="book" />
        {book.bookshelf.isLent && (
          <img
            src={require("../img/borrowed.png")}
            id={displayAsList ? "borrowed-list" : "borrowed-book"}
            alt="Lent"
            align="right"
          />
        )}
        <h4>{book.title}</h4>
        <h5>{book.authors[0]}</h5>
        {star.map(() => <span className="fa fa-star" />)}
        {starO.map(() => <span className="fa fa-star-o" />)}
      </div>
    );
  }
}

export default Book;
