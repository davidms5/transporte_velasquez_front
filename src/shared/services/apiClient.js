import axios from "axios";
import { toast } from "react-toastify";
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Accedemos a la variable
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("jwt_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

apiClient.interceptors.response.use(
  (response) => response, // si va todo bien, lo deja pasar
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      toast.error("Sesión expirada. Por favor, iniciá sesión nuevamente.");

      // Limpiar el token
      sessionStorage.removeItem("jwt_token");

      // Redirigir al login
      window.location.replace("/"); // o usar navigate() si estás dentro de un hook
    }

    return Promise.reject(error);
  }
);

export  {apiClient};
