import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiClient } from "../shared/services/apiClient";
import "./ExistenciaRepuestos.css"; // Importamos el CSS

function ExistenciaRepuestos() {
  const navigate = useNavigate();
  const [repuestos, setRepuestos] = useState([]);

  //TODO: capaz hay unha mejor manera de manejar las calls a la api, pero por ahora se hara asi
  useEffect(() => {
    const fetchRepuestos = async () => {
      try {
        const token = sessionStorage.getItem("jwt_token");
        const response = await apiClient.get("/inventario/get-repuestos/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRepuestos(response.data.results);
      } catch (error) {
        console.error("Error al obtener repuestos:", error);
      }
    };

    fetchRepuestos();
  }, []);
  // Datos de repuestos (Ejemplo, esto puede venir de una API)
  //const repuestos = [
  //  { id: 1, codigoFactura: "FACT-1234", nombre: "Filtro de aire", cantidad: 10, descripcion: "Filtro para motor diésel" },
  //  { id: 2, codigoFactura: "FACT-5678", nombre: "Batería 12V", cantidad: 5, descripcion: "Batería para sistema eléctrico" },
  //  { id: 3, codigoFactura: "FACT-9101", nombre: "Aceite lubricante", cantidad: 20, descripcion: "Aceite sintético para motor" },
  //  { id: 4, codigoFactura: "FACT-1121", nombre: "Pastillas de freno", cantidad: 8, descripcion: "Juego de pastillas de freno delanteras" },
  //];

  return (
    <div className="existencia-page">
      <h2 className="title">Existencia</h2>
      <p>Lista de todos los repuestos disponibles en el inventario.</p>

      {/* Tabla de repuestos */}
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

      {/* Botón para regresar */}
      <button className="back-button" onClick={() => navigate("/repuestos")}>
        Regresar
      </button>
    </div>
  );
}

export default ExistenciaRepuestos;
