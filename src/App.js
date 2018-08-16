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
    query: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.input)
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
       // get list of distinct shelves
      const shelves = books.map(book => book.shelf)
        .filter((value, index, self) => self.indexOf(value) === index)
      // add books and shelves to state
      this.setState({ shelves, books })
      console.log(books);
    })
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }
  clearQuery = () => {
    this.updateQuery('')
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
                */}
                <input type="text" placeholder="Search by title or author" onSubmit={this.handleSubmit}/>

              </div>
            </div>
            <div className="search-books-results">
              <BooksGrid books={this.state.books}/>
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
              <BookShelf shelf={shelf} books={this.state.books.filter((book) => book.shelf === shelf)}/>
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
