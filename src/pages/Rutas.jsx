import { useNavigate } from "react-router-dom";
import "./Rutas.css"; // Importamos el CSS

function Rutas() {
  const navigate = useNavigate();

  return (
    <div className="rutas-container">
      <h1 className="rutas-title">Módulo de Rutas</h1>
      <p className="rutas-description">Gestiona las rutas del transporte.</p>

      <div className="rutas-buttons">
        <button className="rutas-button" onClick={() => navigate("/registro-ruta")}>
          Registro
        </button>
        <button className="rutas-button" onClick={() => navigate("/agregar-ruta")}>
          Agregar Ruta
        </button>
        <button className="rutas-button" onClick={() => navigate("/asignacion-rutas")}>
          Asignación de Rutas
        </button>
        <button className="rutas-button" onClick={() => navigate("/horario")}>
          Horario
        </button>
        <button className="rutas-button" onClick={() => navigate("/historial-rutas")}>
          Historial de Rutas
        </button>
        <button className="back-button" onClick={() => navigate("/inicio")}>
          Regresar
        </button>
      </div>
    </div>
  );
}

export default Rutas;
