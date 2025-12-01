import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import NewBookForm from "./components/NewBookForm";
import BookList from "./components/BookList";
import Counters from "./components/Counters";
import BookDetail from "./components/BookDetail";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  var [books, setBooks] = useState([]);
  var [loading, setLoading] = useState(true);
  var [fetchError, setFetchError] = useState("");
  var [searchQuery, setSearchQuery] = useLocalStorage("books_app_search", "");
  var [nextIdCounter, setNextIdCounter] = useState(1000);

  useEffect(function () { //carrega o site com os livros do arquivo books.json
    var isMounted = true;

    async function loadBooks() {
      setLoading(true);
      setFetchError("");

      try {
        var response = await fetch("/books.json");
        if (!response.ok) {
          throw new Error("Falha ao buscar arquivo de livros.");
        }

        var jsonData = await response.json();

        if (!isMounted) {
          return;
        }

        if (Array.isArray(jsonData)) {
          setBooks(jsonData);
        } else {
          setBooks([]);
        }

        var highestExistingId = 0;
        if (Array.isArray(jsonData) && jsonData.length > 0) {
          for (var i = 0; i < jsonData.length; i++) {
            var numericId = Number(jsonData[i].id);
            if (Number.isFinite(numericId) && numericId > highestExistingId) {
              highestExistingId = numericId;
            }
          }
        }

        setNextIdCounter(highestExistingId + 1);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        var finalMessage = "Erro desconhecido ao carregar livros.";
        if (err && err.message) {
          finalMessage = err.message;
        }

        setFetchError(finalMessage);
        setBooks([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadBooks();

    return function cleanup() {
      isMounted = false;
    };
  }, []);

  function handleAddBook(payload) {
    var newId = String(nextIdCounter);
    var newBook = {
      id: newId,
      title: String(payload.title).trim(),
      author: String(payload.author).trim(),
      year: Number(payload.year),
      description: String(payload.description || "").trim()
    };

    setBooks(function (previousBooks) {
      var newBooksList = previousBooks.slice();
      newBooksList.push(newBook);
      return newBooksList;
    });

    setNextIdCounter(function (counter) {
      return counter + 1;
    });
  }

  function handleRemoveBook(bookId) {
    setBooks(function (previousBooks) {
      var remainingBooks = [];

      for (var i = 0; i < previousBooks.length; i++) {
        if (previousBooks[i].id !== bookId) {
          remainingBooks.push(previousBooks[i]);
        }
      }

      return remainingBooks;
    });
  }

  function handleSearchChange(newSearchValue) {
    setSearchQuery(newSearchValue);
  }

  function computeFilteredBooks() {
    var normalizedQuery = String(searchQuery || "").trim().toLowerCase();

    if (normalizedQuery === "") {
      return books.slice();
    }

    var matchedBooks = [];

    for (var i = 0; i < books.length; i++) {
      var bookTitle = String(books[i].title || "").toLowerCase();
      var bookAuthor = String(books[i].author || "").toLowerCase();

      var titleMatches = bookTitle.indexOf(normalizedQuery) !== -1;
      var authorMatches = bookAuthor.indexOf(normalizedQuery) !== -1;

      if (titleMatches || authorMatches) {
        matchedBooks.push(books[i]);
      }
    }

    return matchedBooks;
  }

  var filteredBooks = computeFilteredBooks();

  var mainContent = null;

  if (loading) {
    mainContent = <div className="loading">Carregando...</div>;
  } else {
    if (fetchError && fetchError.length > 0) {
      mainContent = <div className="error">Erro: {fetchError}</div>;
    } else {
      var noBooksFound = filteredBooks.length === 0;

      mainContent = (
        <div>
          <BookList books={filteredBooks} onRemoveBook={handleRemoveBook} />
          {noBooksFound ? (
            <div className="empty">Nenhum livro encontrado.</div>
          ) : null}
        </div>
      );
    }
  }

  var appLayout = (
    <div className="app-container">
      <Header />
      <main className="main">
        <SearchBar value={searchQuery} onChange={handleSearchChange} autoFocus />
        <div className="layout-grid">
          <section className="left-col">
            <NewBookForm onAddBook={handleAddBook} />
          </section>
          <section className="right-col">
            {mainContent}
            <Counters total={books.length} filtered={filteredBooks.length} />
          </section>
        </div>
      </main>
      <footer className="app-footer" style={{ padding: "12px", textAlign: "center", color: "var(--muted)" }}> © Catalogo de Livros </footer>
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={appLayout} />
        <Route path="/book/:id" element={<BookDetail books={books} />} />
      </Routes>
    </BrowserRouter>
  );
}
