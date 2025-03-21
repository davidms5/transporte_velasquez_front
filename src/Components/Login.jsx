import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/usuarios/login/", 
          { username, password },
          { withCredentials: true }  // Permite el uso de cookies para la sesión
      );
      console.log(response.data);
      sessionStorage.setItem('access_token', response.data.access);
      navigate("/inicio");
      //if (response.data.redirect) {
      //    // Si el backend indica que debe redirigir al admin panel
//
      //    window.location.href = `http://127.0.0.1:8000${response.data.redirect}`;
      //    return;
      //} else {
      //    // Si es un usuario normal, redirigir a su dashboard
      //    navigate("/inicio");
      //}

  } catch (error) {
      //setError("Credenciales incorrectas, inténtalo de nuevo.");
      console.error("Error de login:", error);
  }
    
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;


//FIXME: "CORREGIR QUE SALE EN BLANCO TODO"