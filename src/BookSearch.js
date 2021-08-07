import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class BookSearch extends Component {
   state = {
      text: "",
      books: []
   }

   handleChange = (e) => {
      const text = e .target.value;
      this.setState(() => ({
         text: text
      }))

      if(e.target.value.trim() != ""){
         BooksAPI.search(encodeURI(e.target.value)).then((res) => {
            if(res.error){
               //TODO: There is an error, display something on page
            }
                        
            this.setState((prevState) => ({
               ...prevState,
               books: res.error? [] : res
            }))
         })
      }
   }
   
   render() {
      return (
         <div className="search-books">
            <div className="search-books-bar">
               <Link className="close-search" to="/">Close</Link>
               <div className="search-books-input-wrapper">
                  <input 
                     type="text" 
                     placeholder="Search by title or author" 
                     value={this.state.text}
                     onChange={this.handleChange}/>

               </div>
            </div>
            <div className="search-books-results">
               <ol className="books-grid">
                  {this.state.books.map((book) => (
                     <li key={book.id}>
                        <Book book={book} />
                     </li>
                  ))}
               </ol>
            </div>
         </div>
      )}
}

export default BookSearch;