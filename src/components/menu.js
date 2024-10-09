import React, { useState, useEffect } from "react";
import "../css/menu.css";

function Menu() {
  // Estado para almacenar el tablero
  const [tablero, setTablero] = useState(null);
  const [error, setError] = useState(null);

  //   window.addEventListener("click", (event) => {
  //     createContext(event.target.className)
  //   });

  // Obtiene todos los tableros
  useEffect(() => {
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
  }, []); // El array vacío hace que useEffect solo se ejecute una vez, al montar el componente

  const eliminarTablero = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tableros/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Registro eliminado exitosamente');
        window.location.reload();
        // Aquí podrías hacer algo, como actualizar el estado en React
      } else {
        console.error('Error al eliminar el registro');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const añadirRegistro = async (nuevoRegistro) => {
  try {
    const response = await fetch('http://tu-api.com/api/tumodelo/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Si usas autenticación, agrega el token en los headers
        // 'Authorization': `Token ${token}`,
      },
      body: JSON.stringify(nuevoRegistro),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Registro añadido exitosamente:', data);
      // Aquí puedes actualizar el estado o hacer algo con el nuevo registro
    } else {
      console.error('Error al añadir el registro');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
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
          <li key={tableros.id} id="tabDesc" className="list-group-item bg-dark text-white">
            <i class="bi bi-journal-bookmark-fill"></i>
            <input id="tabDescInput" value={tableros.descripcion}></input>
            <button id="borrarTableroBtn" className="btn btn-dark" onClick={() => {eliminarTablero(tableros.id)}}><i class="bi bi-trash"></i></button>
          </li>
        ))}
        <button id="añadirTablero" className="btn btn-dark">+ Añadir tablero</button>
      </ul>
    </div>
  );
}

export default Menu;
