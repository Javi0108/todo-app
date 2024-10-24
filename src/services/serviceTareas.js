const API_URL = "http://127.0.0.1:8000/api/tareas/";

// Obtiene todos los tableros
export const getTareas = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      throw new Error("Error en la petición: " + response.status)
    }
    return await response.json();

  } catch (error) {
    throw error;
  }
};

export const eliminarTarea = async (id) => {
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

export const añadirTarea = async (descripcion, fecha_fin) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ descripcion: descripcion, fecha_fin: fecha_fin, completada: false }),
    });
    if (!response.ok) {
      throw new Error("Error al añadir el registro");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const actualizarTarea = async (id, descripcion, fecha_fin) => {
  try {
    const response = await fetch(`${API_URL}${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, descripcion, fecha_fin }),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el registro");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};