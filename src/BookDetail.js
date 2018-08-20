import React from 'react'


class BookDetail extends React.Component {
    updateBook(book, new_shelf) {
      this.props.moveBookToShelf(book, new_shelf)
    }

    render() {
      const book = this.props.book;
      return (
        <li>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193,
                backgroundImage: `url(${ book.imageLinks !== undefined ? book.imageLinks.thumbnail : '' })` }}></div>
              <div className="book-shelf-changer">
                <select value={book.shelf !== undefined ? book.shelf : `none`} onChange={(e) => this.updateBook(book, e.target.value)}>>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{ book.title }</div>
            {
              book.authors !== undefined ? book.authors.map(author => <div className="book-authors" >{author}</div>) : ''
            }

          </div>
        </li>
      )
  }
}

export default BookDetail
