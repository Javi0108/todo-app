import React, { useState, useEffect } from "react";
import {
  getLista,
  añadirLista,
  eliminarLista,
  actualizarLista,
} from "../services/servicesListas";

import "../css/listas.css";

function Listas({ id }) {
  const [listas, setListas] = useState(null);
  const [error, setError] = useState(null);
  const [descripcionTemporal, setDescripcionTemporal] = useState({});
  const [isDisabled, setIsDisabled] = useState({}); // Estado para controlar readonly


  const fetchListas = async () => {
    try {
      const data = await getLista(id);
      setListas(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchListas(id);
  }, [id]);

  const handleAñadirLista = async (nombre) => {
    try {
      console.log(id);
      await añadirLista(nombre, id);
      fetchListas();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEliminarLista = async (id) => {
    try {
      await eliminarLista(id);
      fetchListas();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDoubleClick = (id) => {
    setIsDisabled({ ...isDisabled, [id]: false });
    // Esperar un tick para asegurar que el DOM se actualice
    setTimeout(() => {
      document.getElementById(id).focus(); // Poner el foco en el input
      document.getElementById(id).select();
    }, 0);
  }

  const handleActualizarLista = async (id, descripcion) => {
    try {
      setIsDisabled({ ...isDisabled, [id]: true });
      await actualizarLista(id, descripcionTemporal[id]);
      fetchListas();
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



  if (error) {
    return (
      <div className="App">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!listas) {
    return (
      <div id="loadTablero" className="loadTablero">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div id="tablero" className="tablero">
      <h1 id="tituloTablero">{listas.descripcion}</h1>
      <ul id="listas">
        {listas.map((lista) => (
          <li key={lista.id} id="elementosListas">
            <div className="d-flex flex-row justify-content-between">
              <input
                type="text"
                id={lista.id}
                className="listaName"
                maxLength={20}
                disabled={isDisabled[lista.id] !== false}
                value={descripcionTemporal[lista.id] || lista.nombre}
                onChange={(event) => {
                  handleInputChange(event, lista.id);
                }}
                onDoubleClick={(event) => handleDoubleClick(event, lista.id)}
                onBlur={() => handleActualizarLista(lista.id)}
              ></input>
              <button
                className="btn btn-dark p-2 h-25"
                onClick={() => handleEliminarLista(lista.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>

            <ul id="listaTareas">
              {lista.tareas.map((tareas) => (
                <li key={tareas.id} id="tareas">
                  {tareas.descripcion}
                </li>
              ))}
              <button id="añadirTareaBtn" className="btn btn-dark">
                + Añadir tarea
              </button>
            </ul>
          </li>
        ))}
        <button
          className="btn btn-dark"
          onClick={() => handleAñadirLista("Nueva lista")}
        >
          + Añadir lista
        </button>
      </ul>
    </div>
  );
}

export default Listas;
