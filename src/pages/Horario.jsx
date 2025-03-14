import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Horario.css"; // Importamos los estilos CSS

function Horario() {
  const navigate = useNavigate();

  // Estado para rutas y horarios
  const [rutas, setRutas] = useState([]);
  const [horarioData, setHorarioData] = useState({
    rutaSeleccionada: "",
    horarioSeleccionado: "",
    numeroBus: "",
  });

  // Lista de horarios disponibles
  const horarios = [
    "6 am - 8 am",
    "8 am - 10 am",
    "7 am - 10 am",
    "2 pm - 4 pm",
    "5 pm - 7 pm",
  ];

  // Cargar rutas desde localStorage
  useEffect(() => {
    const rutasGuardadas = JSON.parse(localStorage.getItem("rutas")) || [];
    setRutas(rutasGuardadas);
  }, []);

  // Manejar cambios en los campos
  const handleChange = (e) => {
    setHorarioData({ ...horarioData, [e.target.name]: e.target.value });
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Horario Asignado:
    Ruta: ${horarioData.rutaSeleccionada}
    Horario: ${horarioData.horarioSeleccionado}
    Número de Bus: ${horarioData.numeroBus}`);

    // Guardar el horario en localStorage
    const horariosGuardados = JSON.parse(localStorage.getItem("horarios")) || [];
    horariosGuardados.push(horarioData);
    localStorage.setItem("horarios", JSON.stringify(horariosGuardados));

    // Limpiar formulario
    setHorarioData({ rutaSeleccionada: "", horarioSeleccionado: "", numeroBus: "" });
  };

  return (
    <div className="horario-container">
      <div className="horario-box">
        <h2 className="horario-title">Asignación de Horarios</h2>
        <p className="horario-description">Seleccione una ruta y asigne un horario.</p>

        <form onSubmit={handleSubmit}>
          <label>Ruta:</label>
          <select name="rutaSeleccionada" value={horarioData.rutaSeleccionada} onChange={handleChange} required>
            <option value="">Seleccione una ruta</option>
            {rutas.map((ruta, index) => (
              <option key={index} value={ruta.numeroRuta}>
                {`${ruta.salida} - ${ruta.llegada} (Ruta ${ruta.numeroRuta})`}
              </option>
            ))}
          </select>

          <label>Horario:</label>
          <select name="horarioSeleccionado" value={horarioData.horarioSeleccionado} onChange={handleChange} required>
            <option value="">Seleccione un horario</option>
            {horarios.map((horario, index) => (
              <option key={index} value={horario}>{horario}</option>
            ))}
          </select>

          <label>Número de Bus:</label>
          <input type="text" name="numeroBus" value={horarioData.numeroBus} onChange={handleChange} required />

          <button type="submit" className="btn">Agregar Horario</button>
        </form>

        {/* Botón para regresar */}
        <button className="btn back-btn" onClick={() => navigate("/rutas")}>
          Regresar
        </button>
      </div>
    </div>
  );
}

export default Horario;


//TODO:"NOTA PONER QUE SEA LISTA DESPEGABLE"