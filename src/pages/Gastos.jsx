import { useNavigate } from "react-router-dom";
import "./Gastos.css";

function Gastos() {
  const navigate = useNavigate();

  return (
    <div className="gastos-container">
      <div className="gastos-box">
        <h2 className="gastos-title">Módulo de Gastos</h2>
        <p className="gastos-description">Seleccione una opción para continuar.</p>
        <div className="button-box">
          <button className="module-button" onClick={() => navigate("/gastos-compras")}>
            Gasto de Compras
          </button>

          <button className="module-button" onClick={() => navigate("/gastos-gasolina")}>
            Gasolina
          </button>

          <button className="module-button" onClick={() => navigate("/historial-gasto-compras")}>
            Historial Gasto de Compras
          </button>

          
        </div>

        <button className="btn back-btn" onClick={() => navigate("/inicio")}>
            Regresar
        </button>
      </div>
    </div>
  );
}

export default Gastos;
