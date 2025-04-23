import { useState, useEffect } from "react";
import "./Facturacion.css";
import { apiClient } from "../shared/services/apiClient";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

function Facturacion() {
  const [facturas, setFacturas] = useState([]);
  const [facturaData, setFacturaData] = useState({
    codigo: "",
    proveedor: "",
    numero_factura: "",
    cai: "",
    fecha: "",
  });
  const [editFactura, setEditFactura] = useState(null);
  const [fechaFiltro, setFechaFiltro] = useState("");

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

    setFacturaData({ ...facturaData, [e.target.name]: e.target.value.replace(/\s+/g, '') });
  };

  const handleAgregarFactura = async () => {
    const { codigo, proveedor, numero_factura, cai, fecha } = facturaData;

    if (codigo && proveedor && numero_factura && cai && fecha) {
      try {
        const response = await apiClient.post("/inventario/facturas/", facturaData);
        setFacturas((prev) => [...prev, response.data]);

        setFacturaData({
          codigo: "",
          proveedor: "",
          numero_factura: "",
          cai: "",
          fecha: "",
        });
      } catch (error) {
        console.error("Error al agregar la factura:", error);
        toast("Hubo un error al agregar la factura.");
      }
    } else {
      toast("Por favor, complete todos los campos.");
    }
  };

  const abrirModalEdicion = (factura) => {
    setEditFactura({ ...factura });
  };

  const handleEditChange = (e) => {
    setEditFactura({ ...editFactura, [e.target.name]: e.target.value });
  };

  const guardarCambiosEdicion = async () => {
    try {
      await apiClient.patch(`/inventario/facturas/${editFactura.codigo}/`, {
        proveedor: editFactura.proveedor,
        cai: editFactura.cai,
        fecha: editFactura.fecha,
      });

      setFacturas((prev) =>
        prev.map((f) =>
          f.codigo === editFactura.codigo
            ? { ...f, proveedor: editFactura.proveedor, cai: editFactura.cai, fecha: editFactura.fecha }
            : f
        )
      );

      setEditFactura(null);
    } catch (error) {
      console.error("Error al editar la factura:", error);
      alert("No se pudo editar la factura.");
    }
  };

  const exportarExcel = () => {
    if (!fechaFiltro) {
      toast.warn("Debes seleccionar una fecha para generar el reporte.");
      return;
    }

    const datosExportar = facturasFiltradas.map((f) => ({
      "Código Factura": f.codigo,
      "Proveedor": f.proveedor,
      "Número Factura": f.numero_factura,
      "CAI": f.cai,
      "Fecha": f.fecha || "No disponible",
    }));

    const worksheet = XLSX.utils.json_to_sheet(datosExportar);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Facturas");

    XLSX.writeFile(workbook, "reporte_facturas.xlsx");
  };

  const facturasFiltradas = fechaFiltro
    ? facturas.filter((f) => f.fecha?.startsWith(fechaFiltro))
    : facturas;

  return (
    <div className="facturacion-page">
      <h2 className="title">Facturación</h2>

      <div className="facturacion-form">
        <input
          type="text"
          name="codigo"
          placeholder="Código de Factura"
          value={facturaData.codigo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="proveedor"
          placeholder="Nombre del Proveedor"
          value={facturaData.proveedor}
          onChange={handleChange}
        />
        <input
          type="vachar"
          name="numero_factura"
          placeholder="Número de Factura"
          value={facturaData.numero_factura}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cai"
          placeholder="CAI"
          value={facturaData.cai}
          onChange={handleChange}
        />
        <input
          type="date"
          name="fecha"
          placeholder="Fecha"
          value={facturaData.fecha}
          onChange={handleChange}
        />
        <button className="add-button" onClick={handleAgregarFactura}>
          Agregar Factura
        </button>
      </div>

      <div className="filtros">
        <label>Filtrar por Fecha:</label>
        <input
          type="date"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
        />
        <button className="btn-exportar" onClick={exportarExcel}>
          Generar Reporte Excel
        </button>
      </div>

      <div className="facturacion-table">
        <table>
          <thead>
            <tr>
              <th>Código Factura</th>
              <th>Proveedor</th>
              <th>Número Factura</th>
              <th>CAI</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {facturasFiltradas.map((factura) => (
              <tr key={`${factura.id}-${factura.codigo}`}>
                <td>{factura.codigo}</td>
                <td>{factura.proveedor}</td>
                <td>{factura.numero_factura}</td>
                <td>{factura.cai}</td>
                <td>{factura.fecha || "N/D"}</td>
                <td>
                  <button className="edit-button" onClick={() => abrirModalEdicion(factura)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
            <input
              type="date"
              name="fecha"
              value={editFactura.fecha || ""}
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
