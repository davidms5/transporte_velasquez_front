import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AsignacionRutas.css"; // Importamos los estilos CSS
import { apiClient } from "../shared/services/apiClient";
import formatCurrency from "../shared/utils/convertir_divisa"; // Importa la función de formato de moneda
function AsignacionRutas() {
  const navigate = useNavigate();

  // Estado para las rutas y asignaciones
  const [rutas, setRutas] = useState([]);
  const [asignacion, setAsignacion] = useState({
    rutaSeleccionada: "",
    conductor: "",
    precio: "",
  });

  // Conductores disponibles
  //const conductores = ["Juan Pérez", "María López", "Carlos Sánchez"];
  const [conductores, setConductores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const res = await apiClient.get("/rutas-buses/rutas/datos-asignacion/");

        setRutas(res.data.rutas_sin_conductor);
        setConductores(res.data.conductores_disponibles);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        alert("Error al obtener datos de asignación.");
      }
    };

    fetchData();
  }, []);
  // Cargar rutas desde localStorage
  //useEffect(() => {
  //  const rutasGuardadas = JSON.parse(localStorage.getItem("rutas")) || [];
  //  setRutas(rutasGuardadas);
  //}, []);

  // Manejar selección de ruta
  const handleRutaChange = (e) => {
    const value = e.target.value;
    const rutaSeleccionada = rutas.find((ruta) => String(ruta.numero_ruta) === value);
  
    setAsignacion((prev) => ({
      ...prev,
      rutaSeleccionada: value,
      precio: rutaSeleccionada ? rutaSeleccionada.precio : "",
    }));
  };

  // Manejar selección de conductor y otros campos
  const handleChange = (e) => {
    setAsignacion({ ...asignacion, [e.target.name]: e.target.value });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      apiClient.put(`/rutas-buses/rutas/${asignacion.rutaSeleccionada}/asignar-conductor/`, {
        conductor: asignacion.conductor
      });

      alert("Asignación realizada correctamente.");
            // Limpiar formulario
      setRutas(rutas.filter((r) => r.numero_ruta !== asignacion.rutaSeleccionada));
      setAsignacion({ rutaSeleccionada: "", conductor: "", precio: "" });
    } catch (error) {
      console.error("Error al asignar ruta:", error);
      alert("No se pudo realizar la asignación.");
    }
    //alert(`Asignación realizada: 
    //Ruta: ${asignacion.rutaSeleccionada}, 
    //Conductor: ${asignacion.conductor}, 
    //Precio: ${asignacion.precio}`);


  };

  return (
    <div className="asignacion-container">
      <div className="asignacion-box">
        <h2 className="asignacion-title">Asignación de Rutas</h2>
        <p className="asignacion-description">Seleccione una ruta y asigne un conductor.</p>

        <form onSubmit={handleSubmit}>
          <label>Ruta:</label>
          <select name="rutaSeleccionada" value={asignacion.rutaSeleccionada} onChange={handleRutaChange} required>
            <option value="">Seleccione una ruta</option>
            {rutas.map((ruta, index) => (
              <option key={index} value={ruta.numero_ruta}>
                {`${ruta.origen} - ${ruta.destino} (Ruta ${ruta.numero_ruta})`}
              </option>
            ))}
          </select>

          <label>Nombre del Conductor:</label>
          <select name="conductor" value={asignacion.conductor} onChange={handleChange} required>
            <option value="">Seleccione un conductor</option>
            {conductores.map((conductor, index) => (
              <option key={index} value={conductor.id}>{conductor.nombre}</option>
            ))}
          </select>

          <label>Precio:</label>
          <input type="text" name="precio" value={formatCurrency(asignacion.precio || 0)} readOnly />

          <button type="submit" className="btn">Asignar Ruta</button>
        </form>

        {/* Botón para regresar */}
        <button className="btn back-btn" onClick={() => navigate("/rutas")}>
          Regresar
        </button>
      </div>
    </div>
  );
}

export default AsignacionRutas;
