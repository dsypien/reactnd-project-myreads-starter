import React from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';

const BookList = (props) => {
   const { shelves, handleShelfChange } = props;
   

   return (
      <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map((s)=> (
            <BookShelf key={s.id} shelf={s} handleShelfChange={ handleShelfChange } />
          ))}                             
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
   );
}

export default BookList;