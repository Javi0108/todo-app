import React, { useState, useEffect } from "react";
import "../css/menu.css";

function Menu() {
  // Estado para almacenar el tablero
  const [tablero, setTablero] = useState(null);
  const [error, setError] = useState(null);
  const [descripcionTemporal, setDescripcionTemporal] = useState({});

  // Obtiene todos los tableros
  const getTablero = () => {
    fetch("http://127.0.0.1:8000/api/tableros/")
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
  };

  useEffect(() => {
    getTablero();
  }, []);

  const eliminarTablero = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/tableros/${id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Registro eliminado exitosamente");
        getTablero();
      } else {
        console.error("Error al eliminar el registro");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const añadirTablero = async (descripcion) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/tableros/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ descripcion: descripcion }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registro añadido exitosamente:", data);
        getTablero();
      } else {
        console.error("Error al añadir el registro");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const actualizarTablero = async (id, descripcion) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/tableros/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          // Asegúrate de que 'descripcion' sea un objeto con la clave necesaria
          body: JSON.stringify({ descripcion: descripcion }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Registro actualizado exitosamente:", data);
        getTablero(); // Puedes volver a obtener el tablero actualizado
      } else {
        console.error("Error al actualizar el registro");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleInputChange = (event, id) => {
    setDescripcionTemporal({
      ...descripcionTemporal,
      [id]: event.target.value,
    });
  };

  const handleDescChange = (event, id) => {
    actualizarTablero(id, event.target.value);
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
          >
            <i className="bi bi-journal-bookmark-fill"></i>
            <input
              type="text"
              id="tabDescInput"
              value={tableros.descripcion}
              onChange={(event) => {
                handleInputChange(event, tableros.id);
              }}
              onBlur={(event) => {
                handleDescChange(event, tableros.id);
              }}
            ></input>
            <button
              id="borrarTableroBtn"
              className="btn btn-dark"
              onClick={() => {
                eliminarTablero(tableros.id);
              }}
            >
              <i className="bi bi-trash"></i>
            </button>
          </li>
        ))}
        <button
          id="añadirTablero"
          className="btn btn-dark"
          onClick={() => {
            añadirTablero("Nuevo tablero");
          }}
        >
          + Añadir tablero
        </button>
      </ul>
    </div>
  );
}

export default Menu;