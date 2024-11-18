import api from "../api";

export const getPromociones = async () => {
  try {
    const response = await api.get("/promociones"); // Ajusta el endpoint si es necesario
    return response.data;
  } catch (error) {
    console.error("Error obteniendo promociones:", error);
    throw error;
  }
};

// Función para obtener categorías
export const getCategorias = async () => {
    try {
      const response = await api.get("/categorias"); // Solicitud al backend
      console.log("Categorías recibidas del backend:", response.data.categorias); // Verificar JSON
      return response.data.categorias; // Extraer el array
    } catch (error) {
      console.error("Error obteniendo categorías:", error);
      throw error;
    }
  };