import { useNavigate } from "react-router-dom";
import "./Reportes.css"; // Importamos el CSS

function Reportes() {
  const navigate = useNavigate();

  return (
    <div className="reportes-page">
      <h2 className="title">  Historial Entrada y Salida Repuesto</h2>
      <p>Aquí puedes ver los reportes de entradas y salidas de repuestos.</p>

      {/* Botón para ir al Historial */}
      <button className="module-button" onClick={() => navigate("/historial")}>
        Ver Historial
      </button>

      {/* Botón para regresar al Módulo de Repuestos */}
      <button className="back-button" onClick={() => navigate("/repuestos")}>
        Regresar
      </button>
    </div>
  );
}

export default Reportes;
