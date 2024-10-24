import React, { useState, useEffect } from "react";
import {
  getTareas,
  añadirTarea,
  eliminarTarea,
  actualizarTarea,
} from "../services/serviceTareas";
import "../css/listas.css";
import Toast from "./toast";

function Tablero() {
  const [tareas, setTareas] = useState(null);
  const [error, setError] = useState(null);
  const [descripcionTemporalTarea, setDescripcionTemporalTarea] = useState({});
  const [fechaTemporalTarea, setFechaTemporalTarea] = useState({});
  const [toastVisible, setToastVisible] = useState(false); // State to control the visibility of toast
  const [toastMessage, setToastMessage] = useState(""); // State to control the message of toast
  const [toastColor, setToastColor] = useState(""); // State to control the color of toast
  const [toastIcon, setToastIcon] = useState(""); // State to control the icon of toast
  const [isDisabled, setIsDisabled] = useState({}); // State to control inputs

  const fetchTareas = async () => {
    try {
      const data = await getTareas();
      setTareas(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchTareas();
  }, []);

  const handleAñadirTarea = async (descripcion, idLista) => {
    try {
      await añadirTarea(descripcion, idLista);
      fetchTareas();
      document.getElementById("tareaInput").value = "";
      document.getElementById("dateInput").value = "";
      handleEvents("Task added", "success", "bi bi-check2-circle", true);
    } catch (error) {
      console.error("Error:", error);
      handleEvents(
        "Task not added",
        "danger",
        "bi bi-exclamation-circle",
        true
      );
    }
  };

  const handleEliminarTarea = async (id) => {
    try {
      await eliminarTarea(id);
      fetchTareas();
      handleEvents("Task deleted", "success", "bi bi-check2-circle", true);
    } catch (error) {
      console.error("Error:", error);
      handleEvents(
        "Task not deleted",
        "danger",
        "bi bi-exclamation-circle",
        true
      );
    }
  };

  const handleActualizarTarea = async (id) => {
    try {
      setIsDisabled({ ...isDisabled, [id]: true });
      await actualizarTarea(
        id,
        descripcionTemporalTarea[id],
        fechaTemporalTarea[id]
      );
      fetchTareas();
      handleEvents("Task modified", "success", "bi bi-check2-circle", true);
    } catch (error) {
      console.error("Error:", error);
      handleEvents(
        "Task not modified",
        "danger",
        "bi bi-exclamation-circle",
        true
      );
    }
  };

  const handleEvents = async (msg, color, icon, visible) => {
    setToastMessage(msg);
    setToastColor(color);
    setToastIcon(icon);
    setToastVisible(visible);
  };

  const handleClick = (id) => {
    setIsDisabled({ ...isDisabled, [id]: false });
  };

  const handleInputChangeTarea = (event, id, field) => {
    if (field === "descripcion") {
      setDescripcionTemporalTarea({
        ...descripcionTemporalTarea,
        [id]: event.target.value,
      });
    } else if (field === "fecha") {
      setFechaTemporalTarea({
        ...fechaTemporalTarea,
        [id]: event.target.value,
      });
    }
  };
  

  if (error) {
    return (
      <div className="App">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!tareas) {
    return (
      <div id="loadTablero" className="loadTablero">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div id="tablero" className="tablero">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="d-flex flex-row gap-3 align-items-center mb-3">
          <img src="logo.jpg" alt="Logo de DoAll" width={60} height={60}></img>
          <h1>DoAll</h1>
        </div>
        <div className="d-flex flex-row gap-3">
          <input
            placeholder="Introduce el nombre de tu tarea..."
            id="tareaInput"
            size={50}
          ></input>
          <input type="date" id="dateInput"></input>
          <button
            id="añadirTareaBtn"
            onClick={() => handleAñadirTarea(document.getElementById("tareaInput").value, document.getElementById("dateInput").value)}
          >
            <i className="bi bi-plus-circle"></i>
          </button>
        </div>
      </div>
      <ul>
        {tareas.map((tarea) => (
          <li
            key={tarea.id}
            id="tareas"
            className="d-flex flex-row flex-nowrap gap-5 justify-content-center align-items-baseline"
          >
            <input
              type="text"
              id="tareaName"
              maxLength={20}
              readOnly={isDisabled[tarea.id] !== false}
              value={descripcionTemporalTarea[tarea.id] || tarea.descripcion}
              onFocus={() => handleClick(tarea.id)}
              onChange={(event) => {
                handleInputChangeTarea(event, tarea.id, "descripcion");
              }}
            ></input>
            <input
              type="date"
              id="tareaDate"
              value={fechaTemporalTarea[tarea.id] || new Date(tarea.fecha_fin).toISOString().split('T')[0]}
            ></input>
            <div className="d-flex flex-row gap-1">
              <button
                id="botonTarea"
                onClick={() => handleActualizarTarea(tarea.id)}
              >
                <i className="bi bi-pencil-fill"></i>
              </button>
              <button
                id="botonTarea"
                onClick={() => handleEliminarTarea(tarea.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Toast
        msg={toastMessage}
        visible={toastVisible}
        color={toastColor}
        icon={toastIcon}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}

export default Tablero;
