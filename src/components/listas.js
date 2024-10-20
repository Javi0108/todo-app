import React, { useState, useEffect } from "react";
import {
  getLista,
  añadirLista,
  eliminarLista,
  actualizarLista,
} from "../services/servicesListas";
import {
  getTareas,
  añadirTarea,
  eliminarTarea,
  actualizarTarea,
} from "../services/serviceTareas";
import "../css/listas.css";

function Listas({ id }) {
  const [listas, setListas] = useState(null);
  const [error, setError] = useState(null);
  const [descripcionTemporalLista, setDescripcionTemporalLista] = useState({});
  const [descripcionTemporalTarea, setDescripcionTemporalTarea] = useState({});

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
      await añadirLista(nombre, id);
      fetchListas();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAñadirTarea = async (descripcion, idLista) => {
    try {
      await añadirTarea(descripcion, idLista);
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

  const handleEliminarTarea = async (id) => {
    try {
      await eliminarTarea(id);
      fetchListas();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleActualizarLista = async (id) => {
    try {
      setIsDisabled({ ...isDisabled, [id]: true });
      await actualizarLista(id, descripcionTemporalLista[id]);
      fetchListas();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleActualizarTarea = async (id) => {
    try {
      setIsDisabled({ ...isDisabled, [id]: true });
      await actualizarTarea(id, descripcionTemporalTarea[id]);
      fetchListas();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClick = (id) => {
    setIsDisabled({ ...isDisabled, [id]: false });
    setTimeout(() => {
      document.getElementById(id).focus(); // Poner el foco en el input
      document.getElementById(id).select();
    }, 0);
  };

  const handleInputChangeLista = (event, id) => {
    setDescripcionTemporalLista({
      ...descripcionTemporalLista,
      [id]: event.target.value,
    });
  };

  const handleInputChangeTarea = (event, id) => {
    setDescripcionTemporalTarea({
      ...descripcionTemporalTarea,
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
            <div className="d-flex flex-row justify-content-between gap-2 mb-3">
              <input
                type="text"
                id={lista.id}
                className="listaName"
                maxLength={20}
                disabled={isDisabled[lista.id] !== false}
                value={descripcionTemporalLista[lista.id] || lista.nombre}
                onChange={(event) => {
                  handleInputChangeLista(event, lista.id);
                }}
                onBlur={() => handleActualizarLista(lista.id)}
              ></input>
              <button
                id="botonLista"
                className="p-2 h-25"
                onClick={() => handleClick(lista.id)}
              >
                <i className="bi bi-pencil-fill"></i>
              </button>
              <button
                id="botonLista"
                className="p-2 h-25"
                onClick={() => handleEliminarLista(lista.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
            <ul id="listaTareas">
              {lista.tareas.map((tareas) => (
                <li
                  key={tareas.id}
                  id="tareas"
                  className="d-flex flex-row flex-nowrap justify-content-between"
                >
                  <input 
                  type="text"
                  id={tareas.id}
                  className="tareaName"
                  maxLength={20}
                  disabled={isDisabled[tareas.id] !== false}
                  value={descripcionTemporalTarea[tareas.id] || tareas.descripcion}
                  onChange={(event) => {
                    handleInputChangeTarea(event, tareas.id);
                  }}
                  onBlur={() => handleActualizarTarea(tareas.id)}
                  ></input>
                  <div className="d-flex flex-row gap-1">
                    <button
                      id="botonTarea"
                      onClick={() => handleClick(tareas.id)}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button
                      id="botonTarea"
                      onClick={() => handleEliminarTarea(tareas.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </li>
              ))}
              <button
                id="añadirTareaBtn"
                className="btn btn-dark"
                onClick={() => handleAñadirTarea("Nueva tarea", lista.id)}
              >
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
