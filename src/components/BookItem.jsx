import React from "react";

export default function BookItem(props) {
  var book = props.book;

  function handleRemove(e) {
    e.stopPropagation();
    props.onRemove();
  }

  return (
    <li className="book-item" title={book.title}>
      <div>
        <strong>{book.title}</strong>
        <div className="muted">{book.author} ({book.year})</div>
      </div>
      <div>
        <button className="btn remove" onClick={handleRemove}>Remover</button>
      </div>
    </li>
  );
}