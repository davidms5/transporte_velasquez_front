import React, { useState } from "react";
import "./Gasolina.css";

function Gasolina() {
  const [factura, setFactura] = useState("");
  const [monto, setMonto] = useState("");
  const [bus, setBus] = useState("");

  const handleAgregar = () => {
    if (!factura || !monto || !bus) {
      alert("Por favor complete todos los campos.");
      return;
    }

    // Simulación de envío de datos
    console.log("Registro de gasolina:", {
      factura,
      monto,
      bus,
    });

    // Limpiar campos
    setFactura("");
    setMonto("");
    setBus("");
  };

  return (
    <div className="gasolina-container">
      <div className="gasolina-form">
        <h2>Registro de Gasolina</h2>

        <label htmlFor="factura">Número de Factura</label>
        <input
          id="factura"
          type="text"
          value={factura}
          onChange={(e) => setFactura(e.target.value)}
          placeholder="Ej. FAC-00123"
        />

        <label htmlFor="monto">Monto de Gasolina</label>
        <input
          id="monto"
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          placeholder="Ej. 250.00"
        />

        <label htmlFor="bus">Número de Bus</label>
        <input
          id="bus"
          type="text"
          value={bus}
          onChange={(e) => setBus(e.target.value)}
          placeholder="Ej. BUS-10"
        />

        <button onClick={handleAgregar}>Agregar</button>
      </div>
    </div>
  );
}

export default Gasolina;
