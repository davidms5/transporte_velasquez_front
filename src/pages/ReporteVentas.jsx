import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../shared/services/apiClient";
import { toast } from "react-toastify";
import "./ReporteVentas.css";
import * as XLSX from "xlsx"; // Importar la librería XLSX para generar archivos Excel

function ReporteVentas() {
  const navigate = useNavigate();
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const response = await apiClient.get("/ventas/reporte-dia/");
        setFacturas(response.data);
      } catch (error) {
        console.error("Error cargando facturas:", error);
        toast.error("Error al cargar las facturas.");
        setFacturas([]); // vacía en caso de error
      } finally {
        setLoading(false);
      }
    };

    fetchFacturas();
  }, []);

  // Función para generar el reporte en Excel
  const generateExcelReport = () => {
    const ws = XLSX.utils.json_to_sheet(facturas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reporte de Ventas");

    // Guardar el archivo Excel
    XLSX.writeFile(wb, "reporte_ventas.xlsx");
  };

  return (
    <div className="reporte-container">
      <div className="reporte-box">
        <h2 className="reporte-title">Reporte de Ventas</h2>

        {loading ? (
          <p>Cargando...</p>
        ) : facturas.length > 0 ? (
          <ul className="reporte-list">
            {facturas.map((factura, index) => (
              <li key={index}>
                <strong>Factura:</strong> {factura.numero_factura} |{" "}
                <strong>Ruta:</strong> {factura.numero_ruta} |{" "}
                <strong>Horario:</strong> {factura.hora_salida} - {factura.hora_llegada}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay ventas registradas para hoy.</p>
        )}

        {/* Botón para generar el reporte en Excel */}
        <button
          className="btn generate-excel-btn"
          onClick={generateExcelReport}
        >
          Generar Reporte en Excel
        </button>

        <button className="btn back-btn" onClick={() => navigate("/ventas")}>
          Regresar
        </button>
      </div>
    </div>
  );
}

export default ReporteVentas;
