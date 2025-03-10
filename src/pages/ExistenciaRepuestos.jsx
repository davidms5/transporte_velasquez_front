import { useNavigate } from "react-router-dom";
import "./ExistenciaRepuestos.css"; // Importamos el CSS

function ExistenciaRepuestos() {
  const navigate = useNavigate();

  // Datos de repuestos (Ejemplo, esto puede venir de una API)
  const repuestos = [
    { id: 1, codigoFactura: "FACT-1234", nombre: "Filtro de aire", cantidad: 10, descripcion: "Filtro para motor diésel" },
    { id: 2, codigoFactura: "FACT-5678", nombre: "Batería 12V", cantidad: 5, descripcion: "Batería para sistema eléctrico" },
    { id: 3, codigoFactura: "FACT-9101", nombre: "Aceite lubricante", cantidad: 20, descripcion: "Aceite sintético para motor" },
    { id: 4, codigoFactura: "FACT-1121", nombre: "Pastillas de freno", cantidad: 8, descripcion: "Juego de pastillas de freno delanteras" },
  ];

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
            {repuestos.map((repuesto) => (
              <tr key={repuesto.id}>
                <td>{repuesto.id}</td>
                <td>{repuesto.codigoFactura}</td>
                <td>{repuesto.nombre}</td>
                <td>{repuesto.cantidad}</td>
                <td>{repuesto.descripcion}</td>
              </tr>
            ))}
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
