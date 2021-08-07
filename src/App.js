import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css'
import * as BooksAPI from './BooksAPI';
import BookList from './BookList';
import BookSearch from './BookSearch';

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: [
      {"id": "currentlyReading",
       "name": "Currently Reading",
       "books": []},
      {"id": "wantToRead",
       "name": "Want to Read",
       "books": []},
      {"id": "read",
       "name": "Read",
       "books": []}
    ]
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      console.log(books);

      this.setState((prevState) => {
        let shelves = [...prevState.shelves];

        this.state.shelves.forEach( shelf => {
          shelf.books = books.filter( b => b.shelf === shelf.id);
        }); 

        return  {
          ...prevState,
          books: books,
          shelves: shelves
        }});
    });
  }

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/">
              <BookList shelves={this.state.shelves} />    
            </Route>
            <Route path="/search">
              <BookSearch />
            </Route>
          </Switch>
        </Router>  
      </div>
    )
  }
}

export default BooksApp
