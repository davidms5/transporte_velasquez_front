import React, { useState } from "react";
import "./Gasolina.css";
import { toast } from "react-toastify";
import { apiClient } from "../shared/services/apiClient";

function Gasolina() {
  const [factura, setFactura] = useState("");
  const [monto, setMonto] = useState("");
  const [bus, setBus] = useState("");

  const handleAgregar = async () => {
    if (!factura || !monto || !bus) {
      toast.error("Por favor complete todos los campos.");
      return;
    }

    try {
      
      const response = await apiClient.post("ventas/gastos/combustible-registrar/", {
        numero_factura: factura,
        precio_combustible: parseFloat(monto),
        numero_bus: bus,
      })

      toast.success(response.data.mensaje || "Gasolina actualizada correctamente ✅");
      //console.log("Respuesta:", response.data);
      // Limpiar campos
      setFactura("");
      setMonto("");
      setBus("");

    } catch (error) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Error inesperado al actualizar.");
      }
      console.error("Error:", error);
    }


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
