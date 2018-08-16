import React from 'react'
import BooksGrid from './BooksGrid'


class BookShelf extends React.Component {
    render() {
        return (
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <BooksGrid/>
                </div>
              </div>
            </div>
        )
    }
}

export default BookShelf
