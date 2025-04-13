import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HistorialRutas.css";
import { apiClient } from "../shared/services/apiClient";

function HistorialRutas() {
  const navigate = useNavigate();

  const [rutas, setRutas] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  // Estados de paginación
  const [paginaRutas, setPaginaRutas] = useState(1);
  const [paginaAsignaciones, setPaginaAsignaciones] = useState(1);
  const [paginaHorarios, setPaginaHorarios] = useState(1);
  const elementosPorPagina = 5;

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

      // Reiniciar páginas al filtrar
      setPaginaRutas(1);
      setPaginaAsignaciones(1);
      setPaginaHorarios(1);
    } catch (error) {
      console.error("Error cargando historial:", error);
    }
  };

  const diasMap = {
    LUN: "Lunes",
    MAR: "Martes",
    MIE: "Miércoles",
    JUE: "Jueves",
    VIE: "Viernes",
    SAB: "Sábado",
    DOM: "Domingo"
  };

  const paginar = (datos, pagina) => {
    const inicio = (pagina - 1) * elementosPorPagina;
    return datos.slice(inicio, inicio + elementosPorPagina);
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

        {/* Rutas Agregadas */}
        <div className="historial-section">
          <h3>Rutas Agregadas:</h3>
          {rutas.length > 0 ? (
            <>
              <ul>
                {paginar(rutas, paginaRutas).map((ruta, index) => (
                  <li key={index}>
                    {`Ruta ${ruta.numero_ruta}: ${ruta.origen} - ${ruta.destino}, Precio: ${ruta.precio}`}
                  </li>
                ))}
              </ul>
              <div className="pagination">
                <button onClick={() => setPaginaRutas(paginaRutas - 1)} disabled={paginaRutas === 1}>Anterior</button>
                <span>Página {paginaRutas}</span>
                <button
                  onClick={() => setPaginaRutas(paginaRutas + 1)}
                  disabled={paginaRutas * elementosPorPagina >= rutas.length}
                >
                  Siguiente
                </button>
              </div>
            </>
          ) : (
            <p>No hay rutas agregadas.</p>
          )}
        </div>

        {/* Asignaciones */}
        <div className="historial-section">
          <h3>Asignaciones de Rutas:</h3>
          {asignaciones.length > 0 ? (
            <>
              <ul>
                {paginar(asignaciones, paginaAsignaciones).map((asignacion, index) => (
                  <li key={index}>
                    {`Ruta ${asignacion.numero_ruta}, Conductor: ${asignacion.conductor}`}
                  </li>
                ))}
              </ul>
              <div className="pagination">
                <button onClick={() => setPaginaAsignaciones(paginaAsignaciones - 1)} disabled={paginaAsignaciones === 1}>Anterior</button>
                <span>Página {paginaAsignaciones}</span>
                <button
                  onClick={() => setPaginaAsignaciones(paginaAsignaciones + 1)}
                  disabled={paginaAsignaciones * elementosPorPagina >= asignaciones.length}
                >
                  Siguiente
                </button>
              </div>
            </>
          ) : (
            <p>No hay asignaciones registradas.</p>
          )}
        </div>

        {/* Horarios */}
        <div className="historial-section">
          <h3>Horarios Asignados:</h3>
          {horarios.length > 0 ? (
            <>
              <ul>
                {paginar(horarios, paginaHorarios).map((horario, index) => (
                  <li key={index}>
                    {`${horario.ruta}, ${horario.bus}, Día: ${diasMap[horario.dia]}, ${horario.hora_salida} - ${horario.hora_llegada}`}
                  </li>
                ))}
              </ul>
              <div className="pagination">
                <button onClick={() => setPaginaHorarios(paginaHorarios - 1)} disabled={paginaHorarios === 1}>Anterior</button>
                <span>Página {paginaHorarios}</span>
                <button
                  onClick={() => setPaginaHorarios(paginaHorarios + 1)}
                  disabled={paginaHorarios * elementosPorPagina >= horarios.length}
                >
                  Siguiente
                </button>
              </div>
            </>
          ) : (
            <p>No hay horarios asignados.</p>
          )}
        </div>

        <button className="btn back-btn" onClick={() => navigate("/rutas")}>
          Regresar
        </button>
      </div>
    </div>
  );
}

export default HistorialRutas;
