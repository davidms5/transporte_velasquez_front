import React, { useState, useEffect } from "react";
import { apiClient } from "../shared/services/apiClient";
import * as XLSX from "xlsx"; // Importar la librería XLSX para generar archivos Excel
import "./HistorialGastoCompras.css";

function HistorialGastoCompras() {
  const [historial, setHistorial] = useState([]);
  const [fecha, setFecha] = useState(() => new Date().toISOString().split("T")[0]);

  const getHistorial = async () => {
    try {
      const response = await apiClient.get("ventas/combustible/historial/", {
        params: { fecha },
      });
      setHistorial(response.data);
    } catch (error) {
      console.error("Error al obtener historial:", error);
    }
  };

  useEffect(() => {
    getHistorial();
  }, [fecha]);

  // Función para generar el reporte en Excel
  const generateExcelReport = () => {
    const ws = XLSX.utils.json_to_sheet(historial);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Historial de Gastos");

    // Guardar el archivo Excel
    XLSX.writeFile(wb, "historial_gastos_compras.xlsx");
  };

  return (
    <div className="historial-gasto-compras-container">
      <h2>Historial de Gasto de Compras</h2>

      <div className="filtro-fecha">
        <label>Filtrar por fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </div>

      {historial.length === 0 ? (
        <p>No hay registros de gasto de compras.</p>
      ) : (
        <table className="historial-gasto-compras-table">
          <thead>
            <tr>
              <th>Número de Factura</th>
              <th>Proveedor</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((gasto, index) => (
              <tr key={index}>
                <td>{gasto.numero_factura}</td>
                <td>{gasto.proveedor}</td>
                <td>{gasto.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Botón para generar el reporte en Excel */}
      <button
        className="btn generate-excel-btn"
        onClick={generateExcelReport}
      >
        Generar Reporte en Excel
      </button>
    </div>
  );
}

export default HistorialGastoCompras;
