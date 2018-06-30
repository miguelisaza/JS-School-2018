import React, { Component } from 'react';

class Book extends Component {

  render() {
    const maxStars = 5;
    const star = [...Array(this.props.book.rating).keys()];
    const starO = [...Array(maxStars - this.props.book.rating).keys()]

    return (
      <div onDoubleClick={this.props.showModal} className={`books ${this.props.book.bookshelf.location}`} id={this.props.book.isbn} >
        <img src={this.props.book.imageLinks.thumbnail} alt="book"></img>
        {this.props.book.bookshelf.isLent &&
          <img src={require('../img/borrowed.png')} id="borrowed" alt="Lent" align="right" />}
        <h4>{this.props.book.title}</h4>
        <h5>{this.props.book.authors[0]}</h5>
        {star.map(() => <span className="fa fa-star"></span>)}
        {starO.map(() => <span className="fa fa-star-o"></span>)}


      </div>
    )
  }
}

export default Book;
