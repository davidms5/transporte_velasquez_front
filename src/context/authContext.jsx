// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

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
    setIsAuthenticated(true);
    navigate("/inicio");
  };

  const logout = () => {
    sessionStorage.removeItem("jwt_token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto en cualquier componente
export const useAuth = () => useContext(AuthContext);
