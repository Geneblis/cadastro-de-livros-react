import React, { useState } from "react";

export default function NewBookForm(props) {
  var [title, setTitle] = useState("");
  var [author, setAuthor] = useState("");
  var [yearText, setYearText] = useState("");

  function clearFields() {
    setTitle("");
    setAuthor("");
    setYearText("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    var trimmedTitle = String(title).trim();
    var trimmedAuthor = String(author).trim();
    var yearNumber = Number(yearText);

    if (trimmedTitle === "" || trimmedAuthor === "" || !Number.isFinite(yearNumber) || yearNumber <= 0) {
      window.alert("Preencha título, autor e ano.");
      return;
    }

    props.onAddBook({ title: trimmedTitle, author: trimmedAuthor, year: yearNumber });
    clearFields();
  }

  return (
    <form className="new-book-form" onSubmit={handleSubmit}>
      <h2>Novo livro</h2>
      <div className="form-row">
        <label>
          Título
          <input value={title} onChange={function (e) { setTitle(e.target.value); }} />
        </label>
        <label>
          Autor
          <input value={author} onChange={function (e) { setAuthor(e.target.value); }} />
        </label>
        <label>
          Ano
          <input value={yearText} onChange={function (e) { setYearText(e.target.value); }} />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn add">Adicionar</button>
      </div>
    </form>
  );
}