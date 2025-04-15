import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiClient } from "../shared/services/apiClient";
import * as XLSX from "xlsx";
import "./ExistenciaRepuestos.css";

function ExistenciaRepuestos() {
  const navigate = useNavigate();
  const [repuestos, setRepuestos] = useState([]);

  useEffect(() => {
    const fetchRepuestos = async () => {
      try {

        const response = await apiClient.get("/inventario/get-repuestos/");

        setRepuestos(response.data.results);
      } catch (error) {
        console.error("Error al obtener repuestos:", error);
      }
    };

    fetchRepuestos();
  }, []);

  const exportarExcel = () => {
    const datosParaExportar = repuestos.map((r, index) => ({
      ID: index + 1,
      "Código de Factura": r.factura,
      Nombre: r.nombre,
      Cantidad: r.cantidad,
      Descripción: r.descripcion,
    }));

    const worksheet = XLSX.utils.json_to_sheet(datosParaExportar);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Repuestos");

    XLSX.writeFile(workbook, "reporte_repuestos.xlsx");
  };

  return (
    <div className="existencia-page">
      <h2 className="title">Existencia</h2>
      <p>Lista de todos los repuestos disponibles en el inventario.</p>

      <div className="button-group">
        <button className="btn" onClick={exportarExcel}>
          Generar Reporte Excel
        </button>
        <button className="back-button" onClick={() => navigate("/repuestos")}>
          Regresar
        </button>
      </div>

      <div className="table-container">
        <table className="repuestos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Código de Factura</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {repuestos.length > 0 ? (
              repuestos.map((repuesto, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{repuesto.factura}</td>
                  <td>{repuesto.nombre}</td>
                  <td>{repuesto.cantidad}</td>
                  <td>{repuesto.descripcion}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No hay repuestos registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExistenciaRepuestos;
