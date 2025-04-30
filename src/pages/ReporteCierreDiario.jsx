// src/pages/ReporteCierreDiario.jsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { apiClient } from "../shared/services/apiClient";
import * as XLSX from "xlsx"; // <--- Importamos XLSX
import "./ReporteCierreDiario.css";

function ReporteCierreDiario() {
  const [fecha, setFecha] = useState(() => {
    return new Date().toLocaleDateString('es-HN', {
      timeZone: 'America/Tegucigalpa',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).split('/').reverse().join('-');
  });
  const [datosReporte, setDatosReporte] = useState(null);

  const generarReporte = async () => {
    if (!fecha) {
      toast.error("Seleccione una fecha para generar el reporte.");
      return;
    }

    try {
      const response = await apiClient.get(`/ventas/cierre-diario/generar/?fecha=${fecha}`);
      setDatosReporte(response.data);
      toast.success("Reporte generado correctamente.");
    } catch (error) {
      console.error("Error al generar el reporte:", error);
      toast.error("Error al generar el reporte.");
      setDatosReporte(null);
    }
  };

  const exportarExcel = () => {
    if (!datosReporte) {
      toast.error("No hay datos para exportar.");
      return;
    }

    const data = [
      {
        Fecha: datosReporte.fecha,
        "Total de Facturas": datosReporte.total_facturas,
        "Total en Lempiras": datosReporte.total_monto,
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Cierre Diario");

    XLSX.writeFile(workbook, `reporte_cierre_diario_${fecha}.xlsx`);
  };

  useEffect(() => {
    generarReporte(); // carga automática con la fecha actual
  }, []);

  return (
    <div className="reporte-cierre-page">
      <h2 className="title">Reporte de Cierre Diario</h2>
      <p>Seleccione una fecha para generar el reporte.</p>

      <div className="form-group">
        <label htmlFor="fecha">Fecha:</label>
        <input
          type="date"
          id="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </div>

      {datosReporte && (
        <div className="resultado-reporte">
          <h4>Resultado:</h4>
          <p><strong>Fecha:</strong> {datosReporte.fecha}</p>
          <p><strong>Total de facturas:</strong> {datosReporte.total_facturas}</p>
          <p><strong>Total en Lempiras:</strong> L {Number(datosReporte.total_monto).toFixed(2)}</p>
        </div>
      )}

      <div className="botones-reporte">
        <button className="btn generar-btn" onClick={generarReporte}>
          Generar Reporte
        </button>
        {datosReporte && (
          <button className="btn excel-btn" onClick={exportarExcel}>
            Exportar a Excel
          </button>
        )}
      </div>
    </div>
  );
}

export default ReporteCierreDiario;
