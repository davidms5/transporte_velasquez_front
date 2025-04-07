import { href, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Login.css"; // Importamos los estilos CSS
import {apiClient} from "../shared/services/apiClient";
import { useAuth } from "../context/authContext";

function Login() {
  const navigate = useNavigate();
  const {login} = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post("/usuarios/login/", {
        username,
        password,
      },
      {
        withCredentials: true, 
      });
      login(response.data.access);
      //window.location.href = "http://127.0.0.1:8000/admin/";
      //navigate("/inicio"); 
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Credenciales inválidas o error en el servidor"); //TODO: mejorar las alertas
    }
    //
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit" className="btn">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
