import React from "react";
import BookItem from "./BookItem";

export default function BookList(props) {
  var books = props.books;

  return (
    <div className="book-list card">
      <h3>Lista</h3>
      <ul role="list">
        {books.length === 0 ? (                                   //Apenas checa se a quantidade de livros é 0.
          <li className="empty">Nenhum livro na lista.</li>
        ) : (
          books.map(function (b) {                                //caso contrario, coloca os livros.
            return (
              <BookItem key={b.id} book={b} onRemove={function () { props.onRemoveBook(b.id); }} />
            );
          })
        )}
      </ul>
    </div>
  );
}