import React, { useState, useEffect } from "react";
import {
  getTablero,
  añadirTablero,
  eliminarTablero,
  actualizarTablero,
} from "../services/servicesTableros";
import "../css/tableros.css";

function Tableros({ onSelectTablero }) {
  const [tablero, setTablero] = useState(null);
  const [error, setError] = useState(null);
  const [descripcionTemporal, setDescripcionTemporal] = useState({});
  const [isReadonly, setIsReadonly] = useState({}); // Estado para controlar readonly

  const fetchTableros = async () => {
    try {
      const data = await getTablero();
      setTablero(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchTableros();
  }, []);

  const handleAñadirTablero = async (descripcion) => {
    try {
      await añadirTablero(descripcion);
      fetchTableros();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEliminarTablero = async (id) => {
    try {
      await eliminarTablero(id);
      fetchTableros();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleActualizarTablero = async (id, descripcion) => {
    try {
      await actualizarTablero(id, descripcion);
      fetchTableros();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (event, id) => {
    setDescripcionTemporal({
      ...descripcionTemporal,
      [id]: event.target.value,
    });
  };

  const handleBlur = (id) => {
    handleActualizarTablero(id, descripcionTemporal[id]);
    setIsReadonly({ ...isReadonly, [id]: true }); // Volver a poner en modo readonly
  };

  const handleEditClick = (id) => {
    setIsReadonly({ ...isReadonly, [id]: false }); // Hacer editable
  };

  const handleTabClick = (event, id) => {
    if (event.target.tagName === "INPUT" || event.target.tagName === "BUTTON") {
      return;
    }
    onSelectTablero(id); // Establece el tablero seleccionado
  };

  if (error) {
    return (
      <div className="App">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!tablero) {
    return (
      <div className="App">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div id="menu">
      <ul className="list-group">
        {tablero.map((tableros) => (
          <li
            key={tableros.id}
            id="tabDesc"
            className="list-group-item bg-dark text-white"
            onClick={(event) => handleTabClick(event, tableros.id)}
          >
            <i className="bi bi-journal-bookmark-fill"></i>
            <input
              type="text"
              id="tabDescInput"
              readOnly={isReadonly[tableros.id] !== false}
              value={descripcionTemporal[tableros.id] || tableros.descripcion}
              onChange={(event) => {
                handleInputChange(event, tableros.id);
              }}
              onBlur={() => handleBlur(tableros.id)}
            ></input>
            <button
              id="tabsBtn"
              className="btn btn-dark"
              onClick={() => handleEditClick(tableros.id)}
            >
              <i className="bi bi-pencil-fill"></i>
            </button>
            <button
              id="tabsBtn"
              className="btn btn-dark"
              onClick={() => {
                handleEliminarTablero(tableros.id);
              }}
            >
              <i className="bi bi-trash"></i>
            </button>
          </li>
        ))}
        <button
          id="añadirTablero"
          className="btn btn-dark"
          onClick={() => handleAñadirTablero("Nuevo tablero")}
        >
          + Añadir tablero
        </button>
      </ul>
    </div>
  );
}

export default Tableros;
