import React, { useState, useEffect, createContext } from 'react';
import '../css/menu.css'

function Menu() {
  // Estado para almacenar el tablero
  const [tablero, setTablero] = useState(null);
  const [error, setError] = useState(null);


//   window.addEventListener("click", (event) => {
//     createContext(event.target.className)
//   });


  // useEffect para hacer la petición cuando el componente se monta
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/tableros/")
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la petición: ' + response.status);
        }
        return response.json(); // Convertir la respuesta a JSON
      })
      .then(data => {
        setTablero(data); // Guardar los datos del tablero en el estado
        console.log(data);
      })
      .catch(error => {
        setError(error.message);        // Guardar el error en el estado si ocurre
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
      <div className="App">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div id='menu' className="bg-dark text-white decoration-none">
      <ul>
        {
            tablero.map(tableros => (
                <li id='tabDesc' className={tableros.id}><i class="bi bi-journal-bookmark-fill"></i>{tableros.descripcion}</li>
            ))
        }
      </ul>
    </div>
  );
}

export default Menu;
