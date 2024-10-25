import React, { useState, useEffect } from "react";
import "@fontsource-variable/onest";

import {
  getTareas,
  añadirTarea,
  eliminarTarea,
  actualizarTarea,
} from "../services/serviceTareas";
import "../css/tablero.css";
import Toast from "./Toast";
import Modal from "./Modal";

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
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskMsg, setTaskMsg] = useState("");

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

  const handleAñadirTarea = async (descripcion, fecha_fin) => {
    try {
      await añadirTarea(descripcion, fecha_fin);
      fetchTareas();
      document.getElementById("tareaInput").value = "";
      document.getElementById("dateInput").value = "";
      handleEvents("Task added", "success", "bi bi-check-circle", true);
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
      handleEvents("Task deleted", "success", "bi bi-check-circle", true);
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

  const handleCompletarTarea = async (id) => {
    try {
      await eliminarTarea(id);
      fetchTareas();
      handleEvents("Task completed", "success", "bi bi-check-circle", true);
    } catch (error) {
      console.error("Error:", error);
      handleEvents(
        "Task not set to completed",
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
      handleEvents("Task modified", "success", "bi bi-check-circle", true);
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

  const openModal = (id, msg) => {
    setTaskToDelete(id);
    setTaskMsg(msg);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTaskToDelete(null);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      handleEliminarTarea(taskToDelete);
    }
    closeModal();
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
    <div className="video-container">
      <video autoPlay loop muted playsInline>
        <source src="background-video.mp4" type="video/mp4" />
      </video>
      <div className="content">
        <div id="tablero" className="tablero">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex flex-row gap-3 align-items-center mb-3">
              <img
                src="logo.png"
                alt="Logo de DoAll"
                width={120}
                height={120}
              ></img>
              <h1 id="title">
                <span style={{ color: "#FE6951" }}>Do</span>
                <span style={{ color: "#5FC3F3" }}>All</span>
              </h1>
            </div>
            <div className="d-flex flex-row gap-3">
              <input
                placeholder="Set your task name..."
                id="tareaInput"
                size={35}
              ></input>
              <input type="date" id="dateInput"></input>
              <button
                id="añadirTareaBtn"
                onClick={() =>
                  handleAñadirTarea(
                    document.getElementById("tareaInput").value,
                    document.getElementById("dateInput").value
                  )
                }
              >
                <i className="bi bi-plus-circle"></i>
              </button>
            </div>
          </div>
          <ul className="my-4">
            {tareas.map((tarea) => (
              <li key={tarea.id} id="tareas">
                <input
                  type="checkbox"
                  id="tareaCheck"
                  value={tarea.completada}
                  onClick={() => handleCompletarTarea(tarea.id)}
                ></input>
                <input
                  type="text"
                  id="tareaName"
                  maxLength={20}
                  readOnly={isDisabled[tarea.id] !== false}
                  value={
                    descripcionTemporalTarea[tarea.id] || tarea.descripcion
                  }
                  onFocus={() => handleClick(tarea.id)}
                  onChange={(event) => {
                    handleInputChangeTarea(event, tarea.id, "descripcion");
                  }}
                ></input>
                <input
                  type="date"
                  id="tareaDate"
                  value={
                    fechaTemporalTarea[tarea.id] ||
                    new Date(tarea.fecha_fin).toISOString().split("T")[0]
                  }
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
                    onClick={() => {
                      openModal(tarea.id, "Do you want to delete this task?");
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <Modal
            show={showModal}
            onClose={closeModal}
            onConfirm={confirmDelete}
            message={taskMsg}
          />
          <Toast
            msg={toastMessage}
            visible={toastVisible}
            color={toastColor}
            icon={toastIcon}
            onClose={() => setToastVisible(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default Tablero;
