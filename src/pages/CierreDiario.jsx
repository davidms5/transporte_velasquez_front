import { useState } from "react";
import "./CierreDiario.css";

function CierreDiario() {
  const [factura, setFactura] = useState("");
  const [ruta, setRuta] = useState("");
  const [monto, setMonto] = useState("");
  const [registro, setRegistro] = useState([]);
  const [mostrarResumen, setMostrarResumen] = useState(false);

  const agregarFactura = () => {
    if (factura && ruta && monto) {
      setRegistro([...registro, { factura, ruta, monto: parseFloat(monto) }]);
      setFactura("");
      setRuta("");
      setMonto("");
    }
  };

  const cerrarDia = () => {
    setMostrarResumen(true);
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
                  <td>{item.factura}</td>
                  <td>{item.ruta}</td>
                  <td>L {item.monto.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Botón para mostrar el resumen */}
        {registro.length > 0 && (
          <button className="btn resumen-btn" onClick={cerrarDia}>Cierre de Día</button>
        )}

        {/* Resumen final del cierre */}
        {mostrarResumen && (
          <div className="resumen-final">
            <h3>Resumen del Cierre del Día</h3>
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
                    <td>{item.factura}</td>
                    <td>{item.ruta}</td>
                    <td>L {item.monto.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p><strong>Total Facturas:</strong> {registro.length}</p>
            <p><strong>Total Recaudado:</strong> L {registro.reduce((acc, curr) => acc + curr.monto, 0).toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CierreDiario;
