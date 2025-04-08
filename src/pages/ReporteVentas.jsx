import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../shared/services/apiClient";
import { toast } from "react-toastify";
import "./ReporteVentas.css";

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
    //const facturasGuardadas = JSON.parse(localStorage.getItem("facturas")) || [];
    //setFacturas(facturasGuardadas);
  }, []);

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

        
        <button className="btn back-btn" onClick={() => navigate("/ventas")}>Regresar</button>
      </div>
    </div>
  );
}

export default ReporteVentas;
