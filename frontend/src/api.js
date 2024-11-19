import axios from "axios";

// Configura la URL base de la API
const api = axios.create({
  baseURL: "https://api-promociones.onrender.com", // Reemplaza con tu URL real
});

export default api;
