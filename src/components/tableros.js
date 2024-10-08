import React, { useState, useEffect, useContext } from "react";

import "../css/tablero.css";

function Tablero() {
  // Estado para almacenar el tablero
  const [tablero, setTablero] = useState(null);
  const [error, setError] = useState(null);

  // useEffect para hacer la petición cuando el componente se monta
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/tableros/1/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la petición: " + response.status);
        }
        return response.json(); // Convertir la respuesta a JSON
      })
      .then((data) => {
        setTablero(data); // Guardar los datos del tablero en el estado
        console.log(data);
      })
      .catch((error) => {
        setError(error.message); // Guardar el error en el estado si ocurre
      });
  }, []); // El array vacío hace que useEffect solo se ejecute una vez, al montar el componente

  if (error) {
    return (
      <div className="App">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!tablero) {
    return (
      <div id="loadTablero" className="loadTablero">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div id="tablero" className="tablero">
      <h1 id="tituloTablero">{tablero.descripcion}</h1>
      <ul id="listas">
        {tablero.listas.map((lista) => (
          <li key={lista.id} id="elementosListas">
            <h3>{lista.nombre}</h3>
            <ul>
              {lista.tareas.map((tareas) => (
                <li key={tareas.id}>{tareas.descripcion}</li>
              ))}
              <button>+</button>
            </ul>
          </li>
        ))}
        <button>+</button>
      </ul>
    </div>
  );
}

export default Tablero;
