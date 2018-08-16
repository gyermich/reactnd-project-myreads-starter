import React from 'react'
import BookDetail from './BookDetail'


class BooksGrid extends React.Component {
    render() {
        const books = this.props.books;

        return (
          <ol className="books-grid">

          {books.map(book =>
            <BookDetail book={book}/>
          )}

          </ol>
    )
  }
}

export default BooksGrid
