import { useNavigate } from "react-router-dom";
import "./Inicio.css"; // Importamos el CSS

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="inicio-page">
      {/* Título principal arriba */}
      <h1 className="main-title">Bienvenido Transporte Velásquez</h1>

      {/* Subtítulo con la instrucción */}
      <h2 className="subtitle">Seleccione el módulo que desea acceder</h2>

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
