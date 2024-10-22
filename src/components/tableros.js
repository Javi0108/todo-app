import React, { useState, useEffect } from "react";
import {
  getTablero,
  añadirTablero,
  eliminarTablero,
  actualizarTablero,
} from "../services/servicesTableros";
import Toast from "./toast";
import "../css/tableros.css";

function Tableros({ onSelectTablero }) {
  const [tablero, setTablero] = useState(null);
  const [error, setError] = useState(null);
  const [descripcionTemporal, setDescripcionTemporal] = useState({});
  const [isDisabled, setIsDisabled] = useState({}); // Estado para controlar readonly
  const [toastVisible, setToastVisible] = useState(false); // State to control the visibility of toast
  const [toastMessage, setToastMessage] = useState(""); // State to control the message of toast
  const [toastColor, setToastColor] = useState(""); // State to control the color of toast
  const [toastIcon, setToastIcon] = useState(""); // State to control the icon of toast

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
      handleEvents("Board added", "success", "bi bi-check2-circle", true);
    } catch (error) {
      console.error("Error:", error);
      handleEvents(
        "Board not added",
        "danger",
        "bi bi-exclamation-circle",
        true
      );
    }
  };

  const handleEliminarTablero = async (id) => {
    try {
      await eliminarTablero(id);
      fetchTableros();
      handleEvents("Board deleted", "success", "bi bi-check2-circle", true);
    } catch (error) {
      console.error("Error:", error);
      handleEvents(
        "Board not deleted",
        "danger",
        "bi bi-exclamation-circle",
        true
      );
    }
  };

  const handleActualizarTablero = async (id, descripcion) => {
    try {
      await actualizarTablero(id, descripcion);
      fetchTableros();
      handleEvents("Board modified", "success", "bi bi-check2-circle", true);
    } catch (error) {
      console.error("Error:", error);
      handleEvents(
        "Board not modified",
        "danger",
        "bi bi-exclamation-circle",
        true
      );
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
    setIsDisabled({ ...isDisabled, [id]: true }); // Volver a poner
    document.getElementById(id).blur();
  };

  const handleEditClick = (id) => {
    setIsDisabled({ ...isDisabled, [id]: false });
    // Esperar un tick para asegurar que el DOM se actualice
    setTimeout(() => {
      document.getElementById(id).focus(); // Poner el foco en el input
    }, 0); // Usar timeout de 0 ms para dejar que React actualice el DOM primero
  };

  const handleTabClick = (event, id) => {
    if (event.target.tagName === "button") {
      return;
    }
    onSelectTablero(id); // Establece el tablero seleccionado
  };

  const handleEvents = async (msg, color, icon, visible) => {
    setToastMessage(msg);
    setToastColor(color);
    setToastIcon(icon);
    setToastVisible(visible);
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
      <h3 className="text-white px-3">DoAll - ToDo App</h3>
      <hr></hr>
      <ul className="list-group">
        {tablero.map((tableros) => (
          <li
            key={tableros.id}
            id="tabDesc"
            className="tabDesc list-group-item"
            onClick={(event) => handleTabClick(event, tableros.id)}
          >
            <i className="bi bi-journal-bookmark-fill"></i>
            <input
              type="text"
              id={tableros.id}
              className="tabDescInput"
              disabled={isDisabled[tableros.id] !== false}
              // readOnly={isReadonly[tableros.id] !== false}
              value={descripcionTemporal[tableros.id] || tableros.descripcion}
              onChange={(event) => {
                handleInputChange(event, tableros.id);
              }}
              onBlur={() => handleBlur(tableros.id)}
            ></input>
            <button
              id="tabsBtn"
              className="btn"
              onClick={() => handleEditClick(tableros.id)}
            >
              <i className="bi bi-pencil-fill"></i>
            </button>
            <button
              id="tabsBtn"
              className="btn"
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
          className="btn"
          onClick={() => handleAñadirTablero("")}
        >
          + Add board
        </button>
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

export default Tableros;
