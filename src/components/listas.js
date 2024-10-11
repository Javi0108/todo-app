import React, { useState, useEffect } from "react";
import { getLista, añadirLista, eliminarLista, actualizarLista } from "../services/servicesListas";

import "../css/listas.css";

function Listas({ id }) {
  const [listas, setListas] = useState(null);
  const [error, setError] = useState(null);

  const fetchListas = async (idTablero) => {
    try {
      const data = await getLista(idTablero);
      setListas(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchListas(id);
  }, [id]);

  const handleAñadirLista = async (descripcion) => {
    try {
      await añadirLista(descripcion);
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

  const handleActualizarLista = async (id, descripcion) => {
    try {
      await actualizarLista(id, descripcion);
      fetchListas();
    } catch (error) {
      console.error("Error:", error);
    }
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
              <h3>{lista.nombre}</h3>
              <button className="btn btn-dark p-2 h-25" onClick={() => eliminarLista(lista.id)}>
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
          onClick={() => handleAñadirLista("Nueva lista", `${listas.tablero}`)}
        >
          + Añadir lista
        </button>
      </ul>
    </div>
  );
}

export default Listas;
