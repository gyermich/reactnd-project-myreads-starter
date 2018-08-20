import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
  state = {
    shelves: [],
    books: [],
    searchResults: [],
  }

  search = (e) => {
    e.preventDefault();
    const query = e.target.value.trim();

    BooksAPI.search(query).then((results) => {
      if (results.error) {
        results = []
      }
      this.setState({ searchResults: results})
    }).catch(err => {
      this.setState({ searchResults: []})
    })
  }

  sortBooksByShelf = (books) => {
    // get list of distinct shelves
    const shelve_names = books.map(book => book.shelf)
      .filter((value, index, self) => self.indexOf(value) === index)
    // add books and shelves
    const shelvesWithBooks = shelve_names.map(shelf_name => {
      return {
        name: shelf_name,
        books: books.filter(book => book.shelf === shelf_name)
      }
    });
    return shelvesWithBooks
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      const shelves = this.sortBooksByShelf(books);
      this.setState({shelves, books})
    })
  }

  moveBookToShelf = (book_to_update, shelf)  => {
    BooksAPI.update(book_to_update, shelf).then((updated_book) => {
      BooksAPI.getAll().then((books) => {
        const shelves = this.sortBooksByShelf(books);
        this.setState({shelves, books})
      })
    })

  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link
                className='close-search'
                to='/'>
                  Close
              </Link>

              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                  { this.searchResults ? <BooksGrid books={this.state.searchResults}/> : 'No results' }
                */}
                <input type="text" placeholder="Search by title or author" onChange={this.search}/>

              </div>
            </div>
            <div className="search-books-results">
              <BooksGrid books={this.state.searchResults} moveBookToShelf={this.moveBookToShelf}/>
            </div>
          </div>
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            { this.state.shelves.map(shelf =>
              <BookShelf shelf={shelf.name} books={shelf.books} moveBookToShelf={this.moveBookToShelf}/>
            )}

            </div>
            <div className="open-search">
              <Link
                className='open-search'
                to='/search'>
                  Add a book
              </Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
