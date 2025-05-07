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
      {[ROLES.ADMIN, ROLES.SUPERVISOR].includes(role) &&
      (<button className="module-button" onClick={() => navigate("/repuestos")}>
        Módulo de Repuestos
      </button>)}

      {/* Botón para ir al módulo de Rutas */}
      {[ROLES.ADMIN, ROLES.SUPERVISOR].includes(role) &&
      (<button className="module-button" onClick={() => navigate("/rutas")}>
        Módulo de Rutas
      </button>)}

      {/* Botón para ir al módulo de Ventas */}
      {[ROLES.ADMIN, ROLES.SUPERVISOR, ROLES.FACTURACION].includes(role) &&
        <button className="module-button" onClick={() => navigate("/ventas")}>
        Módulo de Ventas
      </button>}

      {/* ✅ Botón para el módulo de Gastos */}
      {[ROLES.ADMIN, ROLES.OPERADOR].includes(role) &&
      (<button className="module-button" onClick={() => navigate("/gastos")}>
        Módulo de Gastos
      </button>)}

      {/* ✅ Nuevo Botón para el módulo de Estadística */}
      {[ROLES.ADMIN, ROLES.SUPERVISOR].includes(role) && 
      (<button className="module-button" onClick={() => navigate("/estadistica")}>
        Módulo de Estadística
      </button>)}

      {/* ✅ Nuevo Botón para el módulo de Usuarios TODO: que solo lo pueda ver alguien con rol admin o similar*/}
      {[ROLES.ADMIN].includes(role) &&
        <button className="module-button" onClick={() => { window.location.href = `${import.meta.env.VITE_ADMIN}`}}>
        Módulo de Usuarios y admin
      </button>}

      <button className="module-button" onClick={logout}>
        log out
      </button>
    </div>
  );
}

export default Inicio;
