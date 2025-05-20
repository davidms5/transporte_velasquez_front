import { useNavigate } from "react-router-dom";
import "./Rutas.css"; // Importamos el CSS
import { ROLES } from "../shared/constants/roles";
import { getUserRole } from "../shared/services/auth";

function Rutas() {
  const navigate = useNavigate();
  const roles = getUserRole();
  return (
    <div className="rutas-container">
      <h1 className="rutas-title">Módulo de Rutas</h1>
      <p className="rutas-description">Gestiona las rutas del transporte.</p>

      <div className="rutas-buttons">

        {[ROLES.ADMIN, ROLES.SUPERVISOR].includes(roles) &&
        (<button className="rutas-button" onClick={() => navigate("/registro-ruta")}>
          Registro
        </button>)}

        {[ROLES.ADMIN, ROLES.SUPERVISOR].includes(roles) &&
        (<button className="rutas-button" onClick={() => navigate("/agregar-ruta")}>
          Agregar Ruta
        </button>)}

        {[ROLES.ADMIN, ROLES.SUPERVISOR].includes(roles) &&
        (<button className="rutas-button" onClick={() => navigate("/asignacion-rutas")}>
          Asignación de Rutas
        </button>)}

        {[ROLES.ADMIN, ROLES.SUPERVISOR].includes(roles) &&
        (<button className="rutas-button" onClick={() => navigate("/horario")}>
          Horario
        </button>)}

        {[ROLES.ADMIN, ROLES.SUPERVISOR].includes(roles) &&
        (<button className="rutas-button" onClick={() => navigate("/historial-rutas")}>
          Historial de Rutas
        </button>)}

        <button className="back-button"
        style={{backgroundColor: "#ffcc00"}}
         onClick={() => navigate("/inicio")}>
          Regresar
        </button>
      </div>
    </div>
  );
}

export default Rutas;
