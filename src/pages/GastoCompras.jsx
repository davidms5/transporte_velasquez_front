import React, { useState } from "react";
import "./GastoCompras.css";
import { toast } from "react-toastify";
import { apiClient } from "../shared/services/apiClient";

function GastoCompras() {
  const [factura, setFactura] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [cantidad, setCantidad] = useState("");

  const handleAgregar = async () => {
    if (!factura || !proveedor || !cantidad) {
      toast("Por favor complete todos los campos.");
      return;
    }

    // Simulación de envío de datos
    //console.log("Registro de Gasto de Compras:", {
    //  factura,
    //  proveedor,
    //  cantidad,
    //});
    try {
      
      const response = await apiClient.post("ventas/gastos/ingresar-gasto/", {
        numero_factura: factura,
        proveedor: proveedor,
        cantidad: parseFloat(cantidad),
      });

      const data = response.data;

      toast.success(`✅ Combustible registrado. UUID: ${data.uuid_combustible}`);
      //console.log("Respuesta de Django:", data);

      setFactura("");
      setProveedor("");
      setCantidad("");
    } catch (error) {
      console.error("Error al registrar combustible:", error);
      if (error.response?.data?.numero_factura?.[0] === "Combustible with this Numero factura already exists.") {
        toast.error("❌ Ya existe un registro con ese número de factura.");
      } else {
        toast.error("❌ Ocurrió un error al registrar el gasto.");
      }
    }
    // Limpiar campos

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
