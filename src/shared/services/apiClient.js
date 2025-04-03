import axios from "axios";

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
} //TODO: remover despues

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

export  {apiClient, getCookie};
