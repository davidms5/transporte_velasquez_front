import React, { useState } from "react";
import "./GastoCompras.css";

function GastoCompras() {
  const [factura, setFactura] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [cantidad, setCantidad] = useState("");

  const handleAgregar = () => {
    if (!factura || !proveedor || !cantidad) {
      alert("Por favor complete todos los campos.");
      return;
    }

    // Simulación de envío de datos
    console.log("Registro de Gasto de Compras:", {
      factura,
      proveedor,
      cantidad,
    });

    // Limpiar campos
    setFactura("");
    setProveedor("");
    setCantidad("");
  };

  return (
    <div className="gasto-compras-container">
      <div className="gasto-compras-form">
        <h2>Registro de Gasto de Compras</h2>

        <label htmlFor="factura">Número de Factura</label>
        <input
          id="factura"
          type="text"
          value={factura}
          onChange={(e) => setFactura(e.target.value)}
          placeholder="Ej. FAC-00123"
        />

        <label htmlFor="proveedor">Nombre del Proveedor</label>
        <input
          id="proveedor"
          type="text"
          value={proveedor}
          onChange={(e) => setProveedor(e.target.value)}
          placeholder="Ej. Proveedor ABC"
        />

        <label htmlFor="cantidad">Cantidad</label>
        <input
          id="cantidad"
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          placeholder="Ej. 500"
        />

        <button onClick={handleAgregar}>Añadir</button>
      </div>
    </div>
  );
}

export default GastoCompras;
