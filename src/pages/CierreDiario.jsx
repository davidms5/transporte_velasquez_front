import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./CierreDiario.css";
import { apiClient } from "../shared/services/apiClient";

function CierreDiario() {
  const navigate = useNavigate();

  const [factura, setFactura] = useState("");
  const [ruta, setRuta] = useState("");
  const [monto, setMonto] = useState("");
  const [registro, setRegistro] = useState([]);
  //const [mostrarResumen, setMostrarResumen] = useState(false);
  const [resumen, setResumen] = useState(null); // Aquí guardamos la respuesta del backend
  const [loading, setLoading] = useState(false);

  const agregarFactura = () => {
    if (factura && ruta && monto) {
      setRegistro([...registro, { numero_factura: factura, numero_ruta: ruta, monto: parseFloat(monto) }]);
      setFactura("");
      setRuta("");
      setMonto("");
    }
  };

  const cerrarDia = async () => {
    setLoading(true);

    try {
      
      const response = await apiClient.post("/ventas/cierre-del-dia/", {
        facturas_manuales: registro
      });

      setResumen(response.data);
      navigate("/reporte-cierre-diario");
    } catch (error) {
      console.error("Error al generar el cierre:", error);
      alert("Hubo un error al generar el cierre del día.");
    } finally {
      setLoading(false);
    }

    //setMostrarResumen(true);
  };

  return (
    <div className="cierre-container">
      <div className="cierre-box">
        <h2 className="cierre-title">Cierre Diario</h2>

        {/* Formulario horizontal */}
        <div className="form-horizontal">
          <input
            type="text"
            placeholder="Factura del Cliente"
            value={factura}
            onChange={(e) => setFactura(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ruta"
            value={ruta}
            onChange={(e) => setRuta(e.target.value)}
          />
          <input
            type="number"
            placeholder="Monto"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />
          <button className="btn agregar-btn" onClick={agregarFactura}>Agregar</button>
        </div>

        {/* Tabla con los datos ingresados */}
        {registro.length > 0 && (
          <table className="registro-table">
            <thead>
              <tr>
                <th>Factura</th>
                <th>Ruta</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {registro.map((item, index) => (
                <tr key={index}>
                  <td>{item.numero_factura}</td>
                  <td>{item.numero_ruta}</td>
                  <td>L {item.monto.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Botón para mostrar el resumen */}
        {registro.length > 0 && !resumen && (
          <button className="btn resumen-btn" onClick={cerrarDia} disabled={loading}>
            {loading ? "Procesando..." : "Cierre de Día"}
            </button>
        )}

        {/* Resumen final del cierre */}
        {resumen && (
          <div className="resumen-final">
          <h3>Resumen del Cierre del Día</h3>
          <p><strong>Total Facturas:</strong> {resumen.total_facturas}</p>
          <p><strong>Total Recaudado:</strong> L {parseFloat(resumen.total_monto).toFixed(2)}</p>

          {resumen.nuevas_facturas_manuales?.length > 0 && (
            <>
              <h4>Facturas Manuales Agregadas:</h4>
              <ul>
                {resumen.nuevas_facturas_manuales.map((f, index) => (
                  <li key={index}>
                    {f.numero_factura} - Ruta {f.numero_ruta} - L {parseFloat(f.monto).toFixed(2)}
                  </li>
                ))}
              </ul>
            </>
          )}

          <button className="btn back-btn" onClick={() => navigate("/ventas")}>
            Volver al Panel
          </button>
        </div>
        )}
      </div>
    </div>
  );
}

export default CierreDiario;
