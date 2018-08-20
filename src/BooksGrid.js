import React from 'react'
import BookDetail from './BookDetail'


class BooksGrid extends React.Component {
    render() {
        const books = this.props.books;
        const moveBookToShelf = this.props.moveBookToShelf;

        return (
          <ol className="books-grid">

          {books.map(book =>
            <BookDetail book={book} moveBookToShelf={moveBookToShelf}/>
          )}

          </ol>
    )
  }
}

export default BooksGrid
