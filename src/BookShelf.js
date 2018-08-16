import React from 'react'
import BooksGrid from './BooksGrid'


class BookShelf extends React.Component {
    render() {
        const shelf = this.props.shelf;
        const books = this.props.books;
        return (
            <div>
              <div className="bookshelf">
              {/*
                inject space before the upper case letters
              */}
                <h2 className="bookshelf-title" style={{textTransform: 'capitalize' }} >{shelf.replace(/([A-Z])/g, (match) => ` ${match}`)}</h2>
                <div className="bookshelf-books">
                  <BooksGrid books={books}/>
                </div>
              </div>
            </div>
        )
    }
}

export default BookShelf
