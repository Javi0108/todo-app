const API_URL = "http://127.0.0.1:8000/api/listas/";

// Obtiene todos los tableros
export const getLista = async (idTablero) => {
  try {
    const response = await fetch(`${API_URL}tablero/${idTablero}`);
    if (!response.ok) {
      throw new Error("Error en la petición: " + response.status)
    }
    return await response.json();

  } catch (error) {
    throw error;
  }
};

export const eliminarLista = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el registro");
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const añadirLista = async (nombre, tablero) => {
  console.log(tablero);
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre: nombre, tablero: tablero }),
    });
    if (!response.ok) {
      console.log(response);
      throw new Error("Error al añadir el registro");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const actualizarLista = async (id, nombre) => {
  try {
    const response = await fetch(`${API_URL}${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre: nombre}),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el registro");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};