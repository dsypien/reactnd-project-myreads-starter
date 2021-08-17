import React from 'react';

const BookShelfChanger = (props) => {  
   const shelf = props.book.shelf || "none";
   const { handleShelfChange } = props;
   
   return (
      <div className="book-shelf-changer">
         <select value={shelf} onChange={(e) => {handleShelfChange(e.target.value, props.book)}}>
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