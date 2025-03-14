import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AgregarRuta.css"; // Importamos los estilos CSS

function AgregarRuta() {
  const navigate = useNavigate();

  // Estado para almacenar los datos del formulario
  const [rutaData, setRutaData] = useState({
    salida: "",
    llegada: "",
    numeroRuta: "",
    precio: "",
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setRutaData({ ...rutaData, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Ruta Agregada: 
    Salida: ${rutaData.salida}, 
    Llegada: ${rutaData.llegada}, 
    Número de Ruta: ${rutaData.numeroRuta},
    Precio: ${rutaData.precio}`);

    // Guardar la ruta en localStorage
    const rutasGuardadas = JSON.parse(localStorage.getItem("rutas")) || [];
    rutasGuardadas.push(rutaData);
    localStorage.setItem("rutas", JSON.stringify(rutasGuardadas));

    // Limpiar formulario
    setRutaData({ salida: "", llegada: "", numeroRuta: "", precio: "" });
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
            name="salida"
            value={rutaData.salida}
            onChange={handleChange}
            required
          />

          <label>Ruta de Llegada:</label>
          <input
            type="text"
            name="llegada"
            value={rutaData.llegada}
            onChange={handleChange}
            required
          />

          <label>Número de Ruta:</label>
          <input
            type="number"
            name="numeroRuta"
            value={rutaData.numeroRuta}
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
