import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AgregarRuta.css"; // Importamos los estilos CSS
import { apiClient } from "../shared/services/apiClient";

function AgregarRuta() {
  const navigate = useNavigate();

  // Estado para almacenar los datos del formulario
  const [rutaData, setRutaData] = useState({
    origen: "",
    destino: "",
    numero_ruta: "",
    precio: "",
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setRutaData({ ...rutaData, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiClient.post("/rutas-buses/rutas/crear/", rutaData);

      alert("Ruta agregada correctamente.");

      // Limpiar el formulario después de agregar
      setRutaData({
        origen: "",
        destino: "",
        numero_ruta: "",
        precio: "",
      });

    } catch (error) {
      console.error("Error al agregar la ruta:", error);
      alert("Error al agregar la ruta. Verifica los datos.");
    }
  };

  return (
    <div className="ruta-container">
      <div className="ruta-form-box">
        <h2 className="ruta-title">Agregar Nueva Ruta</h2>
        <p className="ruta-description">Complete los campos para agregar una nueva ruta.</p>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <label>Ruta de Salida:</label>
          <input
            type="text"
            name="origen"
            value={rutaData.origen}
            onChange={handleChange}
            required
          />

          <label>Ruta de Llegada:</label>
          <input
            type="text"
            name="destino"
            value={rutaData.destino}
            onChange={handleChange}
            required
          />

          <label>Número de Ruta:</label>
          <input
            type="text"
            name="numero_ruta"
            value={rutaData.numero_ruta}
            onChange={handleChange}
            required
          />

          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={rutaData.precio}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn">Agregar Ruta</button>
        </form>

        {/* Botón de regreso */}
        <button className="btn back-btn" onClick={() => navigate("/rutas")}>
          Regresar
        </button>
      </div>
    </div>
  );
}

export default AgregarRuta;
