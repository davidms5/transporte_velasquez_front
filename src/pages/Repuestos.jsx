import { useNavigate } from "react-router-dom";
import "./Repuestos.css"; // Importamos el CSS
import { ROLES } from "../shared/constants/roles";
import { getUserRole } from "../shared/services/auth";

function Repuestos() {
  const navigate = useNavigate();
 const roles = getUserRole();
  return (
    <div className="repuestos-page">
      <h2 className="title">Módulo de Repuestos</h2>
      <p>Gestiona los repuestos de la empresa.</p>

      {/* Botones de navegación */}
      <div className="buttons-container">

        {[ROLES.ADMIN, ROLES.OPERADOR].includes(roles) &&
        (<button className="module-button" onClick={() => navigate("/registro-repuesto")}>
          Registro de Repuesto
        </button>)}

        {[ROLES.ADMIN, ROLES.SUPERVISOR, ROLES.OPERADOR].includes(roles) &&
        (<button className="module-button" onClick={() => navigate("/reportes")}>
          Reportes de Entrada y Salida
        </button>)}

        {[ROLES.ADMIN, ROLES.SUPERVISOR, ROLES.OPERADOR].includes(roles) &&
        (<button className="module-button" onClick={() => navigate("/existencia-repuestos")}>
          Existencia de Repuestos
        </button>)}

        {[ROLES.ADMIN, ROLES.SUPERVISOR, ROLES.FACTURACION].includes(roles) &&
        (<button className="module-button" onClick={() => navigate("/facturacion")}>
          Facturación
        </button>)}

        {[ROLES.ADMIN, ROLES.SUPERVISOR].includes(roles) &&
        (<button className="module-button" onClick={() => navigate("/dar-de-baja")}>
          Dar de Baja
        </button>)}

        <button className="back-button" 
        style={{backgroundColor: "#FF4500"}}
        onClick={() => navigate("/inicio")}>
          Regresar
        </button>
      </div>
    </div>
  );
}

export default Repuestos;
