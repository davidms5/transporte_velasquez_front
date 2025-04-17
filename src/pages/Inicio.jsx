import { useNavigate } from "react-router-dom";
import "./Inicio.css"; // Importamos el CSS
import { useAuth } from "../context/authContext";
import { getUserRole } from "../shared/services/auth";
import { ROLES } from "../shared/constants/roles";

function Inicio() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const role = getUserRole();
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
      {[ROLES.ADMIN, ROLES.OPERADOR].includes(role) &&
      (<button className="module-button" onClick={() => navigate("/gastos")}>
        Módulo de Gastos
      </button>)}

      {/* ✅ Nuevo Botón para el módulo de Estadística */}
      {[ROLES.ADMIN, ROLES.FACTURACION].includes(role) && 
      (<button className="module-button" onClick={() => navigate("/estadistica")}>
        Módulo de Estadística
      </button>)}

      {/* ✅ Nuevo Botón para el módulo de Usuarios TODO: que solo lo pueda ver alguien con rol admin o similar*/}
      <button className="module-button" onClick={() => { window.open(import.meta.env.VITE_ADMIN, "_blank")}}>
        Módulo de Usuarios y admin
      </button>

      <button className="module-button" onClick={logout}>
        log out
      </button>
    </div>
  );
}

export default Inicio;
