import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function BookDetail({ books }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (!books) return;
    var found = books.find(function (b) { return String(b.id) === String(id); });
    setBook(found || null);
  }, [id, books]);

  if (!book) {
    return (
      <div className="app-container">
        <header className="app-header"><h1>Detalhes do livro</h1></header>
        <main className="main">
          <div className="card">
            <div>Livro não encontrado.</div>
            <div style={{marginTop:12}}><Link to="/">Voltar</Link></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header"><h1>Detalhes do livro</h1></header>
      <main className="main">
        <div className="card">
          <h2>{book.title}</h2>
          <div className="muted">{book.author} ({book.year})</div>
          <div style={{marginTop:12}}>
            <strong>Descrição:</strong>
            <p style={{whiteSpace:"pre-wrap", marginTop:8}}>{book.description || "Sem descrição."}</p>
          </div>
          <div style={{marginTop:12}}>
            <Link to="/">Voltar</Link>
          </div>
        </div>
      </main>
      <footer className="app-footer" style={{padding:"12px",textAlign:"center",color:"#999"}}>© Seu Projeto</footer>
    </div>
  );
}