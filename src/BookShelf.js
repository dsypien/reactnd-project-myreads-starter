import React from 'react';
import Book from './Book';

const BookShelf = (props) => {
   const { name, books } = props.shelf;

   return (
      <div>
         <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books">
               <ol className="books-grid">
                     { books.map((book) => (
                        <li key={book.id}>
                           <Book book={book} />
                        </li>      
                     ))}
               </ol>
            </div>
         </div>
      </div>
   )
};

export default BookShelf;