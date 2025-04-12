import React, { useState } from "react";
import "./HistorialGastoCompras.css";

function HistorialGastoCompras() {
  // Datos de ejemplo, en un escenario real se recuperarían del backend
  const [historial, setHistorial] = useState([
    {
      factura: "FAC-00123",
      proveedor: "Proveedor ABC",
      cantidad: 500,
    },
    {
      factura: "FAC-00124",
      proveedor: "Proveedor XYZ",
      cantidad: 300,
    },
  ]);

  return (
    <div className="historial-gasto-compras-container">
      <h2>Historial de Gasto de Compras</h2>

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
                <td>{gasto.factura}</td>
                <td>{gasto.proveedor}</td>
                <td>{gasto.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HistorialGastoCompras;
