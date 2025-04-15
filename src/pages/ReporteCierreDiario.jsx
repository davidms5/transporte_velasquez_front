// src/pages/ReporteCierreDiario.jsx
import { useState } from "react";
import { toast } from "react-toastify";
import { apiClient } from "../shared/services/apiClient";
import "./ReporteCierreDiario.css";

function ReporteCierreDiario() {
  const [fecha, setFecha] = useState("");

  const generarReporte = async () => {
    if (!fecha) {
      toast.error("Seleccione una fecha para generar el reporte.");
      return;
    }

    try {
      const response = await apiClient.get(`/ventas/cierre-diario/?fecha=${fecha}`);
      // Aquí puedes manejar cómo mostrar los datos del reporte
      console.log(response.data);
      toast.success("Reporte generado correctamente.");
    } catch (error) {
      console.error("Error al generar el reporte:", error);
      toast.error("Error al generar el reporte.");
    }
  };

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

      <button className="btn generar-btn" onClick={generarReporte}>
        Generar Reporte
      </button>
    </div>
  );
}

export default ReporteCierreDiario;
