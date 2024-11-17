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
