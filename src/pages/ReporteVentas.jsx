import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReporteVentas.css";

function ReporteVentas() {
  const navigate = useNavigate();
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    const facturasGuardadas = JSON.parse(localStorage.getItem("facturas")) || [];
    setFacturas(facturasGuardadas);
  }, []);

  return (
    <div className="reporte-container">
      <div className="reporte-box">
        <h2 className="reporte-title">Reporte de Ventas</h2>
        {facturas.length > 0 ? (
          <ul className="reporte-list">
            {facturas.map((factura, index) => (
              <li key={index}>
                <strong>Factura:</strong> {factura.numeroFactura} |
                <strong> Ruta:</strong> {factura.numeroRuta} |
                <strong> Horario:</strong> {factura.horario}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay ventas registradas.</p>
        )}
        <button className="btn back-btn" onClick={() => navigate("/ventas")}>Regresar</button>
      </div>
    </div>
  );
}

export default ReporteVentas;
