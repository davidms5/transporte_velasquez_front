import { useNavigate } from "react-router-dom";
import "./Inicio.css"; // Importamos el CSS
import { useAuth } from "../context/authContext";

function Inicio() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="inicio-page">
      {/* Título principal arriba */}
      <h1 className="main-title">Bienvenido Transporte Velásquez</h1>

      {/* Subtítulo con la instrucción */}
      <h2 className="subtitle">Seleccione el módulo que desea acceder</h2>

      {/* Botón para ir al módulo de Repuestos */}
      <button className="module-button" onClick={() => navigate("/repuestos")}>
        Módulo de Repuestos
      </button>

      {/* Botón para ir al módulo de Rutas */}
      <button className="module-button" onClick={() => navigate("/rutas")}>
        Módulo de Rutas
      </button>

      {/* Botón para ir al módulo de Ventas */}
      <button className="module-button" onClick={() => navigate("/ventas")}>
        Módulo de Ventas
      </button>

      {/* ✅ Botón para el módulo de Gastos */}
      <button className="module-button" onClick={() => navigate("/gastos")}>
        Módulo de Gastos
      </button>

      {/* ✅ Nuevo Botón para el módulo de Usuarios */}
      <button className="module-button" onClick={() => navigate("/usuarios")}>
        Módulo de Usuarios
      </button>

      <button className="module-button" onClick={logout}>
        log out
      </button>
    </div>
  );
}

export default Inicio;
