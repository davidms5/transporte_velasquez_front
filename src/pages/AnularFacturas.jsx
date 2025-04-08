import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../shared/services/apiClient";
import { toast } from 'react-toastify';

import "./AnularFacturas.css";

function AnularFacturas() {
  const navigate = useNavigate();
  const [facturas, setFacturas] = useState([]);
  const [facturaSeleccionada, setFacturaSeleccionada] = useState("");

  useEffect(() => {
    //const facturasGuardadas = JSON.parse(localStorage.getItem("facturas")) || [];
    //setFacturas(facturasGuardadas);
    const fetchFacturas = async () => {
      try {
        const response = await apiClient.get("/ventas/facturas-activas/");
        setFacturas(response.data.results);
      } catch (error) {
        console.error("Error al cargar facturas activas:", error);
        alert("No se pudieron cargar las facturas.");
      }
    };

    fetchFacturas();

  }, []);

  const handleDeleteFactura = async() => {
    if (!facturaSeleccionada) return;

    try {
      await apiClient.delete(`/ventas/facturas/${facturaSeleccionada}/anular/`);
      toast.success("Factura anulada correctamente.");

      const nuevasFacturas = facturas.filter(factura => factura.numero_factura !== facturaSeleccionada);
      setFacturas(nuevasFacturas);
      setFacturaSeleccionada("");
    } catch (error) {
      console.error("Error al anular factura:", error);
      toast.error("No se pudo anular la factura.");
      return;
    }
    //const nuevasFacturas = facturas.filter(factura => factura.numeroFactura !== facturaSeleccionada);
    //localStorage.setItem("facturas", JSON.stringify(nuevasFacturas));
    //setFacturas(nuevasFacturas);
    //setFacturaSeleccionada("");
    //alert("Factura eliminada exitosamente.");
  };

  return (
    <div className="anular-facturas-container">
      <div className="anular-facturas-box">
        <h2 className="anular-facturas-title">Anular Facturas</h2>
        <p className="anular-facturas-description">Seleccione una factura para eliminar.</p>

        <select value={facturaSeleccionada} onChange={(e) => setFacturaSeleccionada(e.target.value)} required>
          <option value="">Seleccione una factura</option>
          {facturas.map((factura, index) => (
            <option key={index} value={factura.numero_factura}>
              {`${factura.numero_factura} - ${factura.cliente_nombre}`}
            </option>
          ))}
        </select>

        <button className="btn delete-btn" onClick={handleDeleteFactura}>Eliminar Factura</button>
        <button className="btn back-btn" onClick={() => navigate("/ventas")}>Regresar</button>
      </div>
    </div>
  );
}

export default AnularFacturas;
