import React, { useState } from "react";
import "./HistorialGastoCompras.css";

function HistorialGastoCompras() {
  const [historial, setHistorial] = useState([
    { factura: "FAC-000101", proveedor: "Proveedor ABC", cantidad: 750 },
    { factura: "FAC-000102", proveedor: "Proveedor XYZ", cantidad: 320 },
    { factura: "FAC-000103", proveedor: "Proveedor ABC", cantidad: 580 },
    { factura: "FAC-000104", proveedor: "Suministros Globales", cantidad: 1050 },
    { factura: "FAC-000105", proveedor: "Proveedor Express", cantidad: 410 },
    { factura: "FAC-000106", proveedor: "Proveedor XYZ", cantidad: 920 },
    { factura: "FAC-000107", proveedor: "Proveedor ABC", cantidad: 295 },
    { factura: "FAC-000108", proveedor: "Repuestos Modernos", cantidad: 670 },
    { factura: "FAC-000109", proveedor: "Suministros Globales", cantidad: 360 },
    { factura: "FAC-000110", proveedor: "Proveedor Express", cantidad: 830 },
    { factura: "FAC-000111", proveedor: "Proveedor XYZ", cantidad: 440 },
    { factura: "FAC-000112", proveedor: "Central de Compras", cantidad: 1200 },
    { factura: "FAC-000113", proveedor: "Repuestos Modernos", cantidad: 560 },
    { factura: "FAC-000114", proveedor: "Central de Compras", cantidad: 770 },
    { factura: "FAC-000115", proveedor: "Proveedor ABC", cantidad: 615 },
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
