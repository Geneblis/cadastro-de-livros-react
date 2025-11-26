import React, { useEffect, useRef } from "react";

export default function SearchBar({ value, onChange, autoFocus = false }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className="search-bar">
      <label>
        Buscar:
        <input
          ref={inputRef}
          type="text"
          placeholder="Título ou autor"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}