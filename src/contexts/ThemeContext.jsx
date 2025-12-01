import React, { createContext, useEffect, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export var ThemeContext = createContext({
  theme: "dark",
  toggleTheme: function () {}
});

export function ThemeProvider(props) {
  var storageKey = "books_app_theme";

  var pair = useLocalStorage(storageKey, "light", { store: "local" });
  var theme = pair[0];
  var setTheme = pair[1];

  //seta o tema 
  useEffect(function () {
    var root = document && document.documentElement;
    if (!root) {
      return;
    }

    root.classList.remove("theme-light");
    root.classList.remove("theme-dark");

    if (theme === "dark") {
      root.classList.add("theme-dark");
    } else {
      root.classList.add("theme-light");
    }
  }, [theme]);

  
  //salva o tema no localstorage
  useEffect(function () {
    function onStorage(e) {
      if (!e) {
        return;
      }

      if (e.key !== storageKey) {
        return;
      }

      var newRaw = e.newValue;
      if (newRaw === null || newRaw === undefined) {
        return;
      }

      var parsed = JSON.parse(newRaw);

      if (parsed === "dark" || parsed === "light") {
        setTheme(parsed);
        return;
      }

      if (newRaw === "dark" || newRaw === "light") {
        setTheme(newRaw);
      }
    }
    window.addEventListener("storage", onStorage);
    return function cleanup() {
      window.removeEventListener("storage", onStorage);
    };
  }, [setTheme]);

  //função para alternar o tema
  function toggleTheme() {
    setTheme(function (previous) {
      var next = "light";
      if (previous === "dark") {
        next = "light";
      } else {
        next = "dark";
      }
      return next;
    });
  }

  //memoriza o valor do contexto
  var contextValue = useMemo(function () {
    return { theme: theme, toggleTheme: toggleTheme };
  }, [theme]);

  ThemeContext.displayName = "ThemeContext";
  ThemeProvider.displayName = "ThemeProvider";

  return (
    <ThemeContext.Provider value={contextValue}>
      {props.children}
    </ThemeContext.Provider>
  );
}