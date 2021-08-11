import React from 'react';
import * as BooksAPI from './BooksAPI';

const BookShelfChanger = (props) => {  
   const shelf = props.book.shelf || "none";

   const handleShelfChange = (e) => {
      BooksAPI.update(props.book, e.target.value).then( (res) => {
         console.log(res);
      });
   }

   return (
      <div className="book-shelf-changer">
         <select value={shelf} onChange={(e) => {handleShelfChange(e)}}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
         </select>
      </div>
   )
}

export default BookShelfChanger;