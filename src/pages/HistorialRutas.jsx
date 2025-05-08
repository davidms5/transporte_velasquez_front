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

  const [numeroRutaFiltro, setNumeroRutaFiltro] = useState("");

  const [paginationInfo, setPaginationInfo] = useState({
    rutas_agregadas: { total_pages: 1 },
    asignaciones_rutas: { total_pages: 1 },
    horarios_asignados: { total_pages: 1 }
  });

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

  const fetchHistorial = async (paginaRutas = 1, paginaAsignaciones = 1, paginaHorarios = 1) => {
    const url = "/rutas-buses/historial/rutas/";
    try {
      const response = await apiClient.get(url, {params: {page: 1, page_size: elementosPorPagina, numero_ruta: numeroRutaFiltro.trim() || undefined}});
      const data = response.data;
      console.log(data)

      setRutas(data.rutas_agregadas || []);
      setAsignaciones(data.asignaciones_rutas || []);
      setHorarios(data.horarios_asignados || []);
      setPaginationInfo(data.pagination || {});

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

  const cambiarPaginaRutas = (nuevaPagina) => {
    setPaginaRutas(nuevaPagina);
    fetchHistorial(nuevaPagina, paginaAsignaciones, paginaHorarios);
  };
  
  const cambiarPaginaAsignaciones = (nuevaPagina) => {
    setPaginaAsignaciones(nuevaPagina);
    fetchHistorial(paginaRutas, nuevaPagina, paginaHorarios);
  };
  
  const cambiarPaginaHorarios = (nuevaPagina) => {
    setPaginaHorarios(nuevaPagina);
    fetchHistorial(paginaRutas, paginaAsignaciones, nuevaPagina);
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

        <div className="filtro-section" style={{ marginBottom: "20px" }}>
          <label>
            Filtrar por número de ruta:{" "}
            <input
              type="text"
              value={numeroRutaFiltro}
              onChange={(e) => setNumeroRutaFiltro(e.target.value)}
              placeholder="Ej: B-504"
            />
          </label>
          <button
            className="btn"
            style={{ marginLeft: "10px" }}
            onClick={() => fetchHistorial(1, 1, 1)} // resetea paginación
          >
            Buscar
          </button>
        </div>

        {/* Rutas Agregadas */}
        <div className="historial-section">
          <h3>Rutas Agregadas:</h3>
          {rutas.length > 0 ? (
            <>
              <ul>
                {rutas.map((ruta, index) => (
                  <li key={index}>
                    {`Ruta ${ruta.numero_ruta}: ${ruta.origen} - ${ruta.destino}, Precio: ${ruta.precio}`}
                  </li>
                ))}
              </ul>
              <div className="pagination">
                <button onClick={() => cambiarPaginaRutas(paginaRutas - 1)} disabled={paginaRutas === 1}>Anterior</button>
                <span>Página {paginaRutas}</span>
                <button
                  onClick={() => cambiarPaginaRutas(paginaRutas + 1)}
                  disabled={paginaRutas >= paginationInfo.rutas_agregadas.total_pages}
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
                {asignaciones.map((asignacion, index) => (
                  <li key={index}>
                    {`Ruta ${asignacion.numero_ruta}, Conductor: ${asignacion.conductor}`}
                  </li>
                ))}
              </ul>
              <div className="pagination">
                <button onClick={() => cambiarPaginaAsignaciones(paginaAsignaciones - 1)} disabled={paginaAsignaciones === 1}>Anterior</button>
                <span>Página {paginaAsignaciones}</span>
                <button
                  onClick={() => cambiarPaginaAsignaciones(paginaAsignaciones + 1)}
                  disabled={paginaAsignaciones >= paginationInfo.asignaciones_rutas.total_pages}
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
                {horarios.map((horario, index) => (
                  <li key={index}>
                    {`${horario.ruta}, ${horario.bus}, Día: ${diasMap[horario.dia]}, ${horario.hora_salida} - ${horario.hora_llegada}`}
                  </li>
                ))}
              </ul>
              <div className="pagination">
                <button onClick={() => cambiarPaginaHorarios(paginaHorarios - 1)} disabled={paginaHorarios === 1}>Anterior</button>
                <span>Página {paginaHorarios}</span>
                <button
                  onClick={() => cambiarPaginaHorarios(paginaHorarios + 1)}
                  disabled={paginaHorarios >= paginationInfo.horarios_asignados.total_pages}
                >
                  Siguiente
                </button>
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
