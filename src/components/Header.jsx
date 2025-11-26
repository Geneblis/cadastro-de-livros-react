import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Header() {
  var temaCont = useContext(ThemeContext);

  function handleToggle() {
    try {
      if (temaCont && typeof temaCont.toggleTheme === "function") {
        temaCont.toggleTheme();
      }
    } catch (e) { // isso tava dando mt problema.
      console.error(e);
    }
  }

  var themeIsDark = false;
  if (temaCont && temaCont.theme === "dark") {
    themeIsDark = true;
  } else {
    themeIsDark = false;
  }

  var label = "Claro";
  if (themeIsDark) {
    label = "Escuro";
  } else {
    label = "Claro";
  }

  return (
    <header className="app-header">
      <h1>Catálogo de Livros</h1>
      <div>
        <button
          className="btn theme"
          onClick={handleToggle}
          title="Alternar tema"
          aria-pressed={themeIsDark ? "true" : "false"}
        >
          Tema: {label}
        </button>
      </div>
    </header>
  );
}
