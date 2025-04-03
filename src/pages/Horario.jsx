import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Horario.css"; // Importamos los estilos CSS
import { apiClient } from "../shared/services/apiClient";

function Horario() {
  const navigate = useNavigate();

  // Estado para rutas y horarios
  const [rutas, setRutas] = useState([]);
  const [buses, setBuses] = useState([]);
  const [horarioData, setHorarioData] = useState({
    ruta: "",
    bus: "",
    dia: "",
    hora_salida: "",
    hora_llegada: "",
  });
  //const [horarioData, setHorarioData] = useState({
  //  rutaSeleccionada: "",
  //  horarioSeleccionado: "",
  //  numeroBus: "",
  //});
  
  const diasSemana = [
    { label: "Lunes", value: "LUN" },
    { label: "Martes", value: "MAR" },
    { label: "Miércoles", value: "MIE" },
    { label: "Jueves", value: "JUE" },
    { label: "Viernes", value: "VIE" },
    { label: "Sábado", value: "SAB" },
    { label: "Domingo", value: "DOM" },
  ];
  // Lista de horarios disponibles
  const horarios = [
    { label: "6 am - 8 am", salida: "06:00", llegada: "08:00" },
    { label: "8 am - 10 am", salida: "08:00", llegada: "10:00" },
    { label: "7 am - 10 am", salida: "07:00", llegada: "10:00" },
    { label: "2 pm - 4 pm", salida: "14:00", llegada: "16:00" },
    { label: "5 pm - 7 pm", salida: "17:00", llegada: "19:00" },
  ];

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const res = await apiClient.get("/rutas-buses/horarios/rutas-disponibles/");
        setRutas(res.data.rutas_sin_horario);
        setBuses(res.data.buses_disponibles);
      } catch (err) {
        console.error("Error cargando rutas:", err);
      }
    };

    fetchRutas();
  }, []);
  // Cargar rutas desde localStorage
  //useEffect(() => {
  //  const rutasGuardadas = JSON.parse(localStorage.getItem("rutas")) || [];
  //  setRutas(rutasGuardadas);
  //}, []);

  // Manejar cambios en los campos
  const handleChange = (e) => {
    setHorarioData({ ...horarioData, [e.target.name]: e.target.value });
  };

  const handleHorarioChange = (e) => {
    const selected = horarios.find(h => h.label === e.target.value);
    if (selected) {
      setHorarioData({
        ...horarioData,
        hora_salida: selected.salida,
        hora_llegada: selected.llegada,
      });
    }
  };
  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiClient.post("/rutas-buses/horarios/asignar/", horarioData);

      alert("Horario asignado correctamente.");
      setHorarioData({ ruta: "", bus: "", dia: "", hora_salida: "", hora_llegada: "" });
    } catch (err) {
      console.error(err);
      alert("Error al asignar horario.");
    }
    //alert(`Horario Asignado:
    //Ruta: ${horarioData.rutaSeleccionada}
    //Horario: ${horarioData.horarioSeleccionado}
    //Número de Bus: ${horarioData.numeroBus}`);

    // Guardar el horario en localStorage
    //const horariosGuardados = JSON.parse(localStorage.getItem("horarios")) || [];
    //horariosGuardados.push(horarioData);
    //localStorage.setItem("horarios", JSON.stringify(horariosGuardados));

    // Limpiar formulario
    //setHorarioData({ rutaSeleccionada: "", horarioSeleccionado: "", numeroBus: "" });
  };

  return (
    <div className="horario-container">
      <div className="horario-box">
        <h2 className="horario-title">Asignación de Horarios</h2>
        <p className="horario-description">Seleccione una ruta y asigne un horario.</p>

        <form onSubmit={handleSubmit}>
          <label>Ruta:</label>
          <select name="ruta" value={horarioData.ruta} onChange={handleChange} required>
            <option value="">Seleccione una ruta</option>
            {rutas.map((ruta, index) => (
              <option key={index} value={ruta.numero_ruta}>
                {`${ruta.origen} - ${ruta.destino} (Ruta ${ruta.numero_ruta})`}
              </option>
            ))}
          </select>

          <label>Día:</label>
          <select name="dia" value={horarioData.dia} onChange={handleChange} required>
            <option value="">Seleccione un día</option>
            {diasSemana.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>

          <label>Horario:</label>
          <select name="horarioSeleccionado" onChange={handleHorarioChange} required>
            <option value="">Seleccione un horario</option>
            {horarios.map((horario, index) => (
              <option key={index} value={horario.label}>{horario.label}</option>
            ))}
          </select>

          {/*<label>Número de Bus:</label>*/}
          {/*<input type="text" name="numeroBus" value={horarioData.bus} onChange={handleChange} required />*/}
          <label>Número de Bus:</label>
            <select name="bus" value={horarioData.bus} onChange={handleChange} required>
              <option value="">Seleccione un bus</option>
              {buses.map((b) => (
                <option key={b.numero_id} value={b.numero_id}>
                  {`${b.numero_id} - ${b.modelo}`}
                </option>
              ))}
            </select>

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