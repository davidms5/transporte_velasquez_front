import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HistorialRutas.css"; // Importamos los estilos CSS
import { apiClient } from "../shared/services/apiClient";

function HistorialRutas() {
  const navigate = useNavigate();

  // Estado para almacenar datos de rutas, asignaciones y horarios
  const [rutas, setRutas] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  // Cargar datos desde localStorage al cargar el componente
  //useEffect(() => {
  //  const rutasGuardadas = JSON.parse(localStorage.getItem("rutas")) || [];
  //  const asignacionesGuardadas = JSON.parse(localStorage.getItem("asignaciones")) || [];
  //  const horariosGuardados = JSON.parse(localStorage.getItem("horarios")) || [];
//
  //  setRutas(rutasGuardadas);
  //  setAsignaciones(asignacionesGuardadas);
  //  setHorarios(horariosGuardados);
  //}, []);
  const fetchHistorial = async () => {
  
    let url = "/rutas-buses/historial/rutas/";
    const params = [];

    if (desde) params.push(`desde=${desde}`);
    if (hasta) params.push(`hasta=${hasta}`);
    if (params.length > 0) url += `?${params.join("&")}`;

    try {
      
      const response = await apiClient.get(url);

      const data = response.data;
      setRutas(data.rutas_agregadas || []);
      setAsignaciones(data.asignaciones_rutas || []);
      setHorarios(data.horarios_asignados || []);
    } catch (error) {
      console.error("Error cargando historial:", error);
    }
  };

  const diasMap = { //TODO: mover despues a utils
    LUN: "Lunes",
    MAR: "Martes",
    MIE: "Miércoles",
    JUE: "Jueves",
    VIE: "Viernes",
    SAB: "Sábado",
    DOM: "Domingo"
  };

  useEffect(() => {
  
    fetchHistorial();
  }, []);

  return (
    <div className="historial-container">
      <div className="historial-box">
        <h2 className="historial-title">Historial de Rutas</h2>
        <p className="historial-description">Visualiza el historial completo de las rutas, asignaciones y horarios.</p>

        <div className="historial-filtros">
          <label>Desde:</label>
          <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />

          <label>Hasta:</label>
          <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />

          <button className="btn" onClick={fetchHistorial}>Filtrar</button>
        </div>

        {/* Mostrar Rutas */}
        <div className="historial-section">
          <h3>Rutas Agregadas:</h3>
          {rutas.length > 0 ? (
            <ul>
              {rutas.map((ruta, index) => (
                <li key={index}>
                  {`Ruta ${ruta.numero_ruta}: ${ruta.origen} - ${ruta.destino}, Precio: ${ruta.precio}`}
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
                  {`Ruta ${asignacion.numero_ruta}, Conductor: ${asignacion.conductor}`}
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
                  {`${horario.ruta}, ${horario.bus}, Día: ${diasMap[horario.dia]}, ${horario.hora_salida} - ${horario.hora_llegada}`}
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
