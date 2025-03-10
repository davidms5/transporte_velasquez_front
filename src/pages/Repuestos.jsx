import { useNavigate } from "react-router-dom";
import "./Repuestos.css"; // Importamos el CSS

function Repuestos() {
  const navigate = useNavigate();

  return (
    <div className="repuestos-page">
      <h2 className="title">Módulo de Repuestos</h2>
      <p>Gestiona los repuestos de la empresa.</p>

      {/* Botones de navegación */}
      <div className="buttons-container">
        <button className="module-button" onClick={() => navigate("/registro-repuesto")}>
          Registro de Repuesto
        </button>

        <button className="module-button" onClick={() => navigate("/reportes")}>
          Reportes de Entrada y Salida
        </button>

        <button className="module-button" onClick={() => navigate("/existencia-repuestos")}>
          Existencia de Repuestos
        </button>

        <button className="module-button" onClick={() => navigate("/facturacion")}>
          Facturación
        </button>

        <button className="module-button" onClick={() => navigate("/dar-de-baja")}>
          Dar de Baja
        </button>

        <button className="back-button" onClick={() => navigate("/inicio")}>
          Regresar
        </button>
      </div>
    </div>
  );
}

export default Repuestos;
