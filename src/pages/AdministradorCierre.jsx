import { useState, useEffect } from "react";
import "./CierreDiario.css";

function AdministradorCierre() {
  const [datosCierre, setDatosCierre] = useState([]);

  // Cargar datos desde localStorage
  useEffect(() => {
    const cierreGuardado = JSON.parse(localStorage.getItem("cierreDiario")) || [];
    setDatosCierre(cierreGuardado);
  }, []);

  // Eliminar registro
  const handleEliminar = (index) => {
    const copia = [...datosCierre];
    copia.splice(index, 1);
    setDatosCierre(copia);
    localStorage.setItem("cierreDiario", JSON.stringify(copia));
  };

  // Editar un campo
  const handleEditar = (index, campo, valor) => {
    const copia = [...datosCierre];
    copia[index][campo] = valor;
    setDatosCierre(copia);
    localStorage.setItem("cierreDiario", JSON.stringify(copia));
  };

  return (
    <div className="admin-cierre-container">
      <div className="admin-cierre-box">
        <h2>Administrador de Cierre Diario</h2>

        {datosCierre.length === 0 ? (
          <p>No hay datos registrados.</p>
        ) : (
          <table className="admin-cierre-table">
            <thead>
              <tr>
                <th>Factura</th>
                <th>Ruta</th>
                <th>Monto (L)</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datosCierre.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={item.factura}
                      onChange={(e) => handleEditar(index, "factura", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.ruta}
                      onChange={(e) => handleEditar(index, "ruta", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.monto}
                      onChange={(e) => handleEditar(index, "monto", e.target.value)}
                    />
                  </td>
                  <td className="admin-cierre-actions">
                    <button className="delete-btn" onClick={() => handleEliminar(index)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdministradorCierre;
