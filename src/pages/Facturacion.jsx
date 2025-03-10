import { useState } from "react";
import "./Facturacion.css"; // Importamos el CSS

function Facturacion() {
  const [facturas, setFacturas] = useState([]);
  const [facturaData, setFacturaData] = useState({
    codigoFactura: "",
    proveedor: "",
    numeroFactura: "",
    cai: "",
  });

  const handleChange = (e) => {
    setFacturaData({ ...facturaData, [e.target.name]: e.target.value });
  };

  const handleAgregarFactura = () => {
    if (facturaData.codigoFactura && facturaData.proveedor && facturaData.numeroFactura && facturaData.cai) {
      setFacturas([...facturas, facturaData]);
      setFacturaData({ codigoFactura: "", proveedor: "", numeroFactura: "", cai: "" });
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <div className="facturacion-page">
      <h2 className="title">Facturación</h2>

      <div className="facturacion-form">
        <input type="text" name="codigoFactura" placeholder="Código de Factura" value={facturaData.codigoFactura} onChange={handleChange} />
        <input type="text" name="proveedor" placeholder="Nombre del Proveedor" value={facturaData.proveedor} onChange={handleChange} />
        <input type="text" name="numeroFactura" placeholder="Número de Factura" value={facturaData.numeroFactura} onChange={handleChange} />
        <input type="text" name="cai" placeholder="CAI" value={facturaData.cai} onChange={handleChange} />

        <button className="add-button" onClick={handleAgregarFactura}>Agregar Factura</button>
      </div>

      <div className="facturacion-table">
        <table>
          <thead>
            <tr>
              <th>Código Factura</th>
              <th>Proveedor</th>
              <th>Número Factura</th>
              <th>CAI</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((factura, index) => (
              <tr key={index}>
                <td>{factura.codigoFactura}</td>
                <td>{factura.proveedor}</td>
                <td>{factura.numeroFactura}</td>
                <td>{factura.cai}</td>
                <td>
                  <button className="edit-button">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Facturacion;
