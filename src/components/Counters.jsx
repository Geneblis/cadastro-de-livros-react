import React from "react";

export default function Counters(props) {
  return (
    <div className="counters card">
      <div>Total: <strong>{props.total}</strong></div>
      <div>Filtrados: <strong>{props.filtered}</strong></div>
    </div>
  );
}