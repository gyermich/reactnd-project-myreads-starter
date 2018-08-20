import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'
import BookShelf from './BookShelf'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    shelves: [],
    books: [],
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
          <Search books={this.state.books} moveBookToShelf={this.moveBookToShelf}/>
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
