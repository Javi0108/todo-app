const API_URL = "http://127.0.0.1:8000/api/tableros/";

// Obtiene todos los tableros
export const getTablero = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error en la petición: " + response.status)
    }
    return await response.json();

  } catch (error) {
    throw error;
  }
};

export const eliminarTablero = async (id) => {
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

export const añadirTablero = async (descripcion) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ descripcion }),
    });
    if (!response.ok) {
      throw new Error("Error al añadir el registro");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const actualizarTablero = async (id, descripcion) => {
  try {
    const response = await fetch(`${API_URL}${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ descripcion }),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el registro");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};