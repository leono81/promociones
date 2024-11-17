import axios from "axios";

// Configura la URL base de la API
const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // Reemplaza con tu URL real
});

export default api;
