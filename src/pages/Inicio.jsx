import { useNavigate } from "react-router-dom";
import "./Inicio.css"; // Importamos el CSS

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="inicio-page">
      <h2 className="title">Bienvenido a la Página de Inicio</h2>
      <p className="description">¡Selecciona un módulo para continuar!</p>

      {/* Botón para ir al módulo de Repuestos */}
      <button className="module-button" onClick={() => navigate("/repuestos")}>
        Módulo de Repuestos
      </button>

      {/* Botón para ir al módulo de Rutas */}
      <button className="module-button" onClick={() => navigate("/rutas")}>
        Módulo de Rutas
      </button>
    </div>
  );
}

export default Inicio;
