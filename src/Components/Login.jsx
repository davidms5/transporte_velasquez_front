import { useNavigate } from "react-router-dom";
import "./Login.css"; // Importamos los estilos CSS

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/inicio"); // Redirige a la página de inicio sin autenticación
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Usuario" required />
          <input type="password" placeholder="Contraseña" required />
          <button type="submit" className="btn">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
