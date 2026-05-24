import React from "react";

function Alert({ mensagem, tipo }) {
  let backgroundColor = "";

  if (tipo === "ERRO") {
    backgroundColor = "#F44336";
  } else if (tipo === "SUCESSO") {
    backgroundColor = "#4CAF50";
  } else if (tipo === "ATENCAO") {
    backgroundColor = "#FFC107";
  }

  const style = {
    backgroundColor,
    color: "#fff",
    padding: "15px",
    borderRadius: "8px",
    margin: "10px 0",
    fontWeight: "bold",
  };

  return <div style={style}>{mensagem}</div>;
}

export default Alert;
