import { useState, useEffect } from "react";
import "./Facturacion.css"; // Importamos el CSS
import { apiClient } from "../shared/services/apiClient";

function Facturacion() {
  const [facturas, setFacturas] = useState([]);
  const [facturaData, setFacturaData] = useState({
    codigo: "",
    proveedor: "",
    numero_factura: "",
    cai: "",
  });

  const [editFactura, setEditFactura] = useState(null); // Factura a editar

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const response = await apiClient.get("/inventario/facturas/");
        setFacturas(response.data.results);

      } catch (error) {
        console.error("Error al cargar las facturas:", error);
      }
    };

    fetchFacturas();
  }, []);

  const handleChange = (e) => {
    setFacturaData({ ...facturaData, [e.target.name]: e.target.value });
  };

  //const handleAgregarFactura = () => {
  //  if (facturaData.codigoFactura && facturaData.proveedor && facturaData.numeroFactura && facturaData.cai) {
  //    setFacturas([...facturas, facturaData]);
  //    setFacturaData({ codigoFactura: "", proveedor: "", numeroFactura: "", cai: "" });
  //  } else {
  //    alert("Por favor, complete todos los campos.");
  //  }
  //};

  const handleAgregarFactura = async () => {
    const { codigo, proveedor, numero_factura, cai } = facturaData;

    if (codigo && proveedor && numero_factura && cai) {
      try {
        const token = sessionStorage.getItem("jwt_token");

        const response = await apiClient.post( "/inventario/facturas/",facturaData);

        // Actualizar la tabla con la nueva factura
        setFacturas((prev) => [...prev, response.data]);

        // Resetear el formulario
        setFacturaData({
          codigo: "",
          proveedor: "",
          numero_factura: "",
          cai: "",
        });
      } catch (error) {
        console.error("Error al agregar la factura:", error);
        alert("Hubo un error al agregar la factura.");
      }
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };


    // --- EDICIÓN ---

    const abrirModalEdicion = (factura) => {
      setEditFactura({ ...factura });
    };
  
    const handleEditChange = (e) => {
      setEditFactura({ ...editFactura, [e.target.name]: e.target.value });
    };
  
    const guardarCambiosEdicion = async () => {
      try {
  
        await apiClient.patch(
          `/inventario/facturas/${editFactura.codigo}/`,
          {
            proveedor: editFactura.proveedor,
            cai: editFactura.cai,
          }
        );
  
        // Actualizar listado local
        setFacturas((prev) =>
          prev.map((f) =>
            f.codigo === editFactura.codigo
              ? { ...f, proveedor: editFactura.proveedor, cai: editFactura.cai }
              : f
          )
        );
  
        setEditFactura(null); // Cerrar modal
      } catch (error) {
        console.error("Error al editar la factura:", error);
        alert("No se pudo editar la factura.");
      }
    };
  return (
    <div className="facturacion-page">
      <h2 className="title">Facturación</h2>

      <div className="facturacion-form">
        <input type="text" name="codigo" placeholder="Código de Factura" value={facturaData.codigo} onChange={handleChange} />
        <input type="text" name="proveedor" placeholder="Nombre del Proveedor" value={facturaData.proveedor} onChange={handleChange} />
        <input type="text" name="numero_factura" placeholder="Número de Factura" value={facturaData.numero_factura} onChange={handleChange} />
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
          {facturas.map((factura) => (
              <tr key={`${factura.id}` + " " + factura.codigo}>
                <td>{factura.codigo}</td>
                <td>{factura.proveedor}</td>
                <td>{factura.numero_factura}</td>
                <td>{factura.cai}</td>
                <td>
                  <button className="edit-button" onClick={() => abrirModalEdicion(factura)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

            {/* Modal de edición */}
            {editFactura && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Editar Factura: {editFactura.codigo}</h3>
            <input
              type="text"
              name="proveedor"
              placeholder="Proveedor"
              value={editFactura.proveedor}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="cai"
              placeholder="CAI"
              value={editFactura.cai}
              onChange={handleEditChange}
            />

            <div className="modal-buttons">
              <button className="save-button" onClick={guardarCambiosEdicion}>
                Guardar
              </button>
              <button className="cancel-button" onClick={() => setEditFactura(null)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Facturacion;
