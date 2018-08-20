import React from 'react'
import BooksGrid from './BooksGrid'


class BookShelf extends React.Component {
    formatCamelCaseToSentence(shelf) {
        // inject space before the upper case letters
        return shelf.replace(/([A-Z])/g, (match) => ` ${match}`)
    }
    render() {
        const shelf = this.props.shelf;
        const books = this.props.books;
        const moveBookToShelf = this.props.moveBookToShelf;
        return (
            <div>
              <div className="bookshelf">
              {/*
                inject space before the upper case letters
              */}
                <h2 className="bookshelf-title" style={{textTransform: 'capitalize' }} >{this.formatCamelCaseToSentence(shelf)}</h2>
                <div className="bookshelf-books">
                  <BooksGrid books={books} moveBookToShelf={moveBookToShelf}/>
                </div>
              </div>
            </div>
        )
    }
}

export default BookShelf
