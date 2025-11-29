import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import SearchBar from "./SearchBar";
import NewBookForm from "./NewBookForm";

export default function BookDetail({ books }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);


  useEffect(() => {
    if (!books) return; //checa se books está disponível
    var found = books.find(function (b) { return String(b.id) === String(id); });
    setBook(found || null);
  }, [id, books]);


  function noop() {}
  return (
    <div className="app-container">
      <Header />
      <main className="main">
        <SearchBar value={""} onChange={noop} autoFocus={false} />
        <div className="layout-grid">
          <section className="left-col">
            <NewBookForm onAddBook={noop} />
          </section>

          <section className="right-col">
            {book ? (//book encontrado    
              <div className="card detail-card">
                <h2>{book.title}</h2>
                <div className="muted">{book.author} ({book.year || "—"})</div>

                <div className="detail-desc" style={{ marginTop: 12 }}>
                  <strong>Descrição</strong>
                  <p className="desc-text" style={{ marginTop: 8 }}>
                    {book.description && String(book.description).trim().length > 0 ? book.description : "Sem descrição."}
                  </p>
                </div>

                <div className="detail-actions" style={{ marginTop: 12 }}>
                  <Link to="/" className="btn neutral">Voltar ao catálogo</Link>
                </div>
              </div>
            ) 
            : (//book não encontrado
              <div className="card">
                <div>Livro não encontrado.</div>
                <div style={{ marginTop: 12 }}>
                  <Link to="/" className="btn neutral">Voltar</Link>
                </div>
              </div>
            )}

          </section>
        </div>
      </main>

      <footer className="app-footer" style={{ padding: "12px", textAlign: "center", color: "var(--muted)" }}> © Catalogo de Livros </footer>
    </div>
  );
}