// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { saveEncryptItem } from "../shared/services/secureStorage";
import { apiClient } from "../shared/services/apiClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkToken = () => {
    const token = sessionStorage.getItem("jwt_token");
    if (!token) return false;

    try {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        logout();
        return false;
      }
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  useEffect(() => {
    setIsAuthenticated(checkToken());
  }, []);

  const login = (token) => {
    sessionStorage.setItem("jwt_token", token);
    sessionStorage.setItem("role", jwtDecode(token).role) //sav
    setIsAuthenticated(true);
    navigate("/inicio");
  };

  const logout = async () => {

    try {
      
      await apiClient.post("/usuarios/logout/");

      sessionStorage.removeItem("jwt_token");
      sessionStorage.removeItem("role");
      setIsAuthenticated(false);
      navigate("/");

    } catch (error) {
      if (error.response?.status === 401) {
        // Token expirado o no enviado
        toast.warning("Sesión expirada");
      } else {
        toast.error("Error al cerrar sesión");
      }
    }

    
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto en cualquier componente
export const useAuth = () => useContext(AuthContext);
