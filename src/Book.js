import React from 'react';
import BookShelfChanger from './BookShelfChanger';

const Book = (props) => {   
   const { book, handleShelfChange } = props;

   return (
      <div className="book">
         <div className="book-top">
            <div className="book-cover" 
               style={{ width: 128, height: 193, backgroundImage: (book && book.imageLinks && book.imageLinks.thumbnail) ? `url(${book.imageLinks.thumbnail})`: "" }}></div>
            <BookShelfChanger book={book} handleShelfChange={ handleShelfChange } />              
         </div>
         <div className="book-title">{book && book.title ? book.title : ""}</div>
         <div className="book-authors">{book && book.authors ? book.authors.join(", "): ""}</div>
      </div>
   );
}

export default Book;