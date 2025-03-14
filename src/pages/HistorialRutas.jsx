import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HistorialRutas.css"; // Importamos los estilos CSS

function HistorialRutas() {
  const navigate = useNavigate();

  // Estado para almacenar datos de rutas, asignaciones y horarios
  const [rutas, setRutas] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [horarios, setHorarios] = useState([]);

  // Cargar datos desde localStorage al cargar el componente
  useEffect(() => {
    const rutasGuardadas = JSON.parse(localStorage.getItem("rutas")) || [];
    const asignacionesGuardadas = JSON.parse(localStorage.getItem("asignaciones")) || [];
    const horariosGuardados = JSON.parse(localStorage.getItem("horarios")) || [];

    setRutas(rutasGuardadas);
    setAsignaciones(asignacionesGuardadas);
    setHorarios(horariosGuardados);
  }, []);

  return (
    <div className="historial-container">
      <div className="historial-box">
        <h2 className="historial-title">Historial de Rutas</h2>
        <p className="historial-description">Visualiza el historial completo de las rutas, asignaciones y horarios.</p>

        {/* Mostrar Rutas */}
        <div className="historial-section">
          <h3>Rutas Agregadas:</h3>
          {rutas.length > 0 ? (
            <ul>
              {rutas.map((ruta, index) => (
                <li key={index}>
                  {`Ruta ${ruta.numeroRuta}: ${ruta.salida} - ${ruta.llegada}, Precio: ${ruta.precio}`}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay rutas agregadas.</p>
          )}
        </div>

        {/* Mostrar Asignaciones */}
        <div className="historial-section">
          <h3>Asignaciones de Rutas:</h3>
          {asignaciones.length > 0 ? (
            <ul>
              {asignaciones.map((asignacion, index) => (
                <li key={index}>
                  {`Ruta ${asignacion.rutaSeleccionada}, Conductor: ${asignacion.conductor}, Precio: ${asignacion.precio}`}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay asignaciones registradas.</p>
          )}
        </div>

        {/* Mostrar Horarios */}
        <div className="historial-section">
          <h3>Horarios Asignados:</h3>
          {horarios.length > 0 ? (
            <ul>
              {horarios.map((horario, index) => (
                <li key={index}>
                  {`Ruta ${horario.rutaSeleccionada}, Horario: ${horario.horarioSeleccionado}, Número de Bus: ${horario.numeroBus}`}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay horarios asignados.</p>
          )}
        </div>

        {/* Botón para regresar */}
        <button className="btn back-btn" onClick={() => navigate("/rutas")}>
          Regresar
        </button>
      </div>
    </div>
  );
}

export default HistorialRutas;
