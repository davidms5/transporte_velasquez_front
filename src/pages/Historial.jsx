import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiClient } from "../shared/services/apiClient";

function Historial() {
  const navigate = useNavigate();
  const [movimientos, setMovimientos] = useState(null);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await apiClient.get("/inventario/get-historial-repuestos/");
        setMovimientos(response.data.results);
      } catch (error) {
        console.error("Error al obtener el historial:", error);
      }
    };

    fetchHistorial();
  }, []);

  return (
    <div>
      <h2 className="title">Historial de Entradas y Salidas</h2>
      <p>Aquí se mostrará el historial de movimientos de repuestos.</p>

      <div>
        {!movimientos ? (
          <p>No hay movimientos registrados.</p>
        ) : (
          <ul>
            {movimientos.map((item, index) => (
              <li key={index} style={{ marginBottom: "1rem" }}>
                <strong>{item.descripcion_detalle}</strong><br />
                Repuesto: {item.repuesto.nombre} <br />
                Descripción: {item.repuesto.descripcion} <br />
                Cantidad en movimiento: {item.cantidad} ({item.estado}) <br />
                Factura: {item.repuesto.factura} <br />
                Fecha y hora: {item.timestamp}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Botón para regresar a la página de Reportes */}
      <button className="back-button" onClick={() => navigate("/reportes")}>Regresar</button>
    </div>
  );
}

export default Historial;
