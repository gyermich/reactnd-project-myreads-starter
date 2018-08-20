import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookDetail from './BookDetail'
import './App.css'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'
import BookShelf from './BookShelf'


class Search extends React.Component {
    state = {
      query: '',
      searchResults: [],
    }

    search = (query) => {
      this.setState({ query: query });

      BooksAPI.search(query).then((results) => {
        if (results.error) {
          results = []
        }
        // update search results to include data about book shelf
        results.forEach(result => (this.props.books.filter(book => book.id === result.id).map(book => result.shelf = book.shelf)))
        this.setState({ searchResults: results})
      }).catch(err => {
        this.setState({ searchResults: []})
      })
    }

    moveBookToShelf = (book_to_update, shelf) => {
        this.props.moveBookToShelf(book_to_update, shelf);
        this.state.searchResults.forEach((book, index) => {
            if(book.id === book_to_update.id) {
                book.shelf = shelf;
            }
        });
    }

    render() {
        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link
                  className='close-search'
                  to='/'>
                    Close
                </Link>

                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" onChange={(e) => this.search(e.target.value.trim())}/>

                </div>
              </div>
              <div className="search-books-results">
                <BooksGrid books={this.state.searchResults} moveBookToShelf={this.moveBookToShelf}/>
              </div>
            </div>
        )
    }
}

export default Search
