import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HistorialRutas.css";
import { apiClient } from "../shared/services/apiClient";
import * as XLSX from "xlsx";

function HistorialRutas() {
  const navigate = useNavigate();

  const [rutas, setRutas] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [horarios, setHorarios] = useState([]);

  const [paginaRutas, setPaginaRutas] = useState(1);
  const [paginaAsignaciones, setPaginaAsignaciones] = useState(1);
  const [paginaHorarios, setPaginaHorarios] = useState(1);
  const elementosPorPagina = 5;

  const diasMap = {
    LUN: "Lunes",
    MAR: "Martes",
    MIE: "Miércoles",
    JUE: "Jueves",
    VIE: "Viernes",
    SAB: "Sábado",
    DOM: "Domingo"
  };

  const fetchHistorial = async () => {
    const url = "/rutas-buses/historial/rutas/";
    try {
      const response = await apiClient.get(url);
      const data = response.data;
      setRutas(data.rutas_agregadas || []);
      setAsignaciones(data.asignaciones_rutas || []);
      setHorarios(data.horarios_asignados || []);
      setPaginaRutas(1);
      setPaginaAsignaciones(1);
      setPaginaHorarios(1);
    } catch (error) {
      console.error("Error cargando historial:", error);
    }
  };

  const paginar = (datos, pagina) => {
    const inicio = (pagina - 1) * elementosPorPagina;
    return datos.slice(inicio, inicio + elementosPorPagina);
  };

  const generarReporteExcel = () => {
    const wb = XLSX.utils.book_new();

    const hojaRutas = rutas.map(ruta => ({
      "Número de Ruta": ruta.numero_ruta,
      "Origen": ruta.origen,
      "Destino": ruta.destino,
      "Precio": ruta.precio
    }));
    const wsRutas = XLSX.utils.json_to_sheet(hojaRutas);
    XLSX.utils.book_append_sheet(wb, wsRutas, "Rutas Agregadas");

    const hojaAsignaciones = asignaciones.map(asig => ({
      "Número de Ruta": asig.numero_ruta,
      "Conductor": asig.conductor
    }));
    const wsAsignaciones = XLSX.utils.json_to_sheet(hojaAsignaciones);
    XLSX.utils.book_append_sheet(wb, wsAsignaciones, "Asignaciones");

    const hojaHorarios = horarios.map(horario => ({
      "Ruta": horario.ruta,
      "Bus": horario.bus,
      "Día": diasMap[horario.dia],
      "Hora de Salida": horario.hora_salida,
      "Hora de Llegada": horario.hora_llegada
    }));
    const wsHorarios = XLSX.utils.json_to_sheet(hojaHorarios);
    XLSX.utils.book_append_sheet(wb, wsHorarios, "Horarios");

    const fecha = new Date().toLocaleDateString("es-PE").replace(/\//g, "-");
    XLSX.writeFile(wb, `Historial_Rutas_${fecha}.xlsx`);
  };

  useEffect(() => {
    fetchHistorial();
  }, []);

  return (
    <div className="historial-container">
      <div className="historial-box">
        <h2 className="historial-title">Historial de Rutas</h2>
        <p className="historial-description">Visualiza el historial completo de las rutas, asignaciones y horarios.</p>

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
                <button onClick={() => setPaginaRutas(paginaRutas + 1)} disabled={paginaRutas * elementosPorPagina >= rutas.length}>Siguiente</button>
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
                <button onClick={() => setPaginaAsignaciones(paginaAsignaciones + 1)} disabled={paginaAsignaciones * elementosPorPagina >= asignaciones.length}>Siguiente</button>
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
                <button onClick={() => setPaginaHorarios(paginaHorarios + 1)} disabled={paginaHorarios * elementosPorPagina >= horarios.length}>Siguiente</button>
              </div>
            </>
          ) : (
            <p>No hay horarios asignados.</p>
          )}
        </div>

        {/* Botones de acción */}
        <div style={{ marginTop: "20px" }}>
          <button className="btn" onClick={generarReporteExcel}>Generar Reporte Excel</button>
          <button className="btn back-btn" onClick={() => navigate("/rutas")}>Regresar</button>
        </div>
      </div>
    </div>
  );
}

export default HistorialRutas;
