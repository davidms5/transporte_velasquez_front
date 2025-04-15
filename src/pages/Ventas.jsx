import { useNavigate } from "react-router-dom";
import "./Ventas.css"; // Importamos los estilos CSS

function Ventas() {
  const navigate = useNavigate();

  return (
    <div className="ventas-container">
      <div className="ventas-box">
        <h2 className="ventas-title">Módulo de Ventas</h2>
        <p className="ventas-description">Seleccione una opción para continuar.</p>

        {/* Submódulo: Venta de Boletos */}
        <button className="module-button" onClick={() => navigate("/ventas-boletos")}>
          Venta de Boletos
        </button>

        {/* Submódulo: Anular Facturas */}
        <button className="module-button" onClick={() => navigate("/anular-facturas")}>
          Anular Facturas
        </button>

        {/* Submódulo: Reporte de Ventas */}
        <button className="module-button" onClick={() => navigate("/reporte-ventas")}>
          Reporte de Ventas
        </button>

        {/* Submódulo: Cierre Diario */}
        <button className="module-button" onClick={() => navigate("/cierre-diario")}>
          Cierre Diario
        </button>

        {/* Submódulo: Resumen por Ruta */}
        <button className="module-button" onClick={() => navigate("/resumen-por-ruta")}>
          Resumen por Ruta
        </button>

        {/* ✅ Nuevo submódulo: Reporte de Cierre Diario */}
        <button className="module-button" onClick={() => navigate("/reporte-cierre-diario")}>
          Reporte de Cierre Diario
        </button>

        {/* Botón para regresar */}
        <button className="btn back-btn" onClick={() => navigate("/inicio")}>
          Regresar
        </button>
      </div>
    </div>
  );
}

export default Ventas;
