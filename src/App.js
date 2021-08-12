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

        shelves.forEach( shelf => {
          shelf.books = books.filter( b => b.shelf === shelf.id);
        }); 

        return  {
          ...prevState,
          books: books,
          shelves: shelves
        }});
    });
  }

  
  handleShelfChange = (shelf, book) => {
    BooksAPI.update(book, shelf).then( (res) => {
      this.setState((prevState) => {
        let shelves = [...prevState.shelves];
        let books = [...prevState.books];

        const index = prevState.books.findIndex( b => b.id === book.id );

        if(index === -1){
          book.shelf = shelf;
          books.push(book);          
        }
        else {
          if(shelf === "none") {
            books.splice(index, 1);
          }
          else{
            books[index].shelf = shelf;
          }          
        }

        shelves.forEach( shelf => {
          shelf.books = books.filter(b => res[shelf.id].includes(b.id))
        })

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
              <BookList shelves={this.state.shelves} books={this.state.books} handleShelfChange={ this.handleShelfChange }/>    
            </Route>
            <Route path="/search">
              <BookSearch handleShelfChange={ this.handleShelfChange } books={this.state.books}/>
            </Route>
          </Switch>
        </Router>  
      </div>
    )
  }
}

export default BooksApp
