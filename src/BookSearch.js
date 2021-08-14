import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class BookSearch extends Component {
   state = {
      text: "",
      books: [],
      error: false
   }

   handleChange = (e) => {
      const text = e.target.value;
      this.setState(() => ({
         text: text
      }))

      if(e.target.value.trim() !== ""){
         BooksAPI.search(encodeURI(e.target.value)).then((res) => {
            if(res.error){
               this.setState((prevState) => ({
                  ...prevState,
                  error: true,
                  books: []
               }))
            }
            else {
               this.setState((prevState) => {
                  res.forEach(book => {
                     const index = this.props.books.findIndex( b => b.id === book.id);
                     
                     if(index > -1){
                        book.shelf = this.props.books[index].shelf;
                     }
                  })

                  return {
                     ...prevState,
                     error: false,
                     books: res
               }})
            }                       
         })
      }
      else {
         this.setState((prevState) => ({
            ...prevState,
            error: false,
            books: []
         }))
      }
   }

   handleShelfChange = (shelf, book) => {
      this.setState((prevState) => {
         let books = prevState.books;

         const index = prevState.books.findIndex(b => b.id === book.id);
         books[index].shelf = shelf;
         
         return {
            ...prevState,
            books
         }
      })

      this.props.handleShelfChange(shelf, book);
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
                        <Book book={book} handleShelfChange={this.handleShelfChange} />
                     </li>
                  ))}
               </ol>
               {this.state.error && <h2>No book matches search criteria.</h2>}
               
            </div>
         </div>
      )}
}

export default BookSearch;