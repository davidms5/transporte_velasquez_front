import { useNavigate } from "react-router-dom";
import "./Gastos.css";
import { getUserRole } from "../shared/services/auth";
import { ROLES } from "../shared/constants/roles";

function Gastos() {
  const navigate = useNavigate();
  const roles = getUserRole();

  return (
    <div className="gastos-container">
      <div className="gastos-box">
        <h2 className="gastos-title">Módulo de Gastos</h2>
        <p className="gastos-description">Seleccione una opción para continuar.</p>
        <div className="button-box">

          {[ROLES.ADMIN, ROLES.OPERADOR].includes(roles) &&
          (<button className="module-button" onClick={() => navigate("/gastos-compras")}>
            Gasto de Compras
          </button>)}

          {[ROLES.ADMIN, ROLES.OPERADOR].includes(roles) &&
          (<button className="module-button" onClick={() => navigate("/gastos-gasolina")}>
            Gasolina
          </button>)}

          {[ROLES.ADMIN,ROLES.SUPERVISOR].includes(roles) &&
          (<button className="module-button" onClick={() => navigate("/historial-gasto-compras")}>
            Historial Gasto de Compras
          </button>)}

          
        </div>

        <button className="btn back-btn" onClick={() => navigate("/inicio")}>
            Regresar
        </button>
      </div>
    </div>
  );
}

export default Gastos;
