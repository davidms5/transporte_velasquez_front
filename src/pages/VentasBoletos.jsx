import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VentasBoletos.css";

function VentasBoletos() {
  const navigate = useNavigate();

  // Lista de rutas predefinidas con su número de bus y precio
  const rutas = [
    { numeroRuta: "ST-1001", salida: "Ciudad A", llegada: "Ciudad B", numeroBus: "1050", precio: 250 },
    { numeroRuta: "ST-1002", salida: "Ciudad B", llegada: "Ciudad C", numeroBus: "1051", precio: 300 },
    { numeroRuta: "ST-1003", salida: "Ciudad C", llegada: "Ciudad D", numeroBus: "1052", precio: 275 },
    { numeroRuta: "ST-1004", salida: "Ciudad D", llegada: "Ciudad E", numeroBus: "1053", precio: 290 },
    { numeroRuta: "ST-1005", salida: "Ciudad E", llegada: "Ciudad F", numeroBus: "1054", precio: 260 },
    { numeroRuta: "ST-1006", salida: "Ciudad F", llegada: "Ciudad G", numeroBus: "1055", precio: 310 },
    { numeroRuta: "ST-1007", salida: "Ciudad G", llegada: "Ciudad H", numeroBus: "1056", precio: 280 },
  ];

  // Horarios predefinidos
  const horarios = [
    "8:00 AM - 10:00 AM",
    "10:30 AM - 12:30 PM",
    "1:00 PM - 3:00 PM",
    "3:30 PM - 5:30 PM",
    "6:00 PM - 8:00 PM",
    "8:30 PM - 10:30 PM",
    "11:00 PM - 1:00 AM",
  ];

  const [formData, setFormData] = useState({
    nombreCompleto: "",
    identidad: "",
    esMenor: "no",
    partidaNacimiento: "",
    responsableMenor: "",
    numeroRuta: "",
    numeroBus: "",
    precio: "",
    horario: "",
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar selección de ruta para asignar número de bus y precio
  const handleRutaChange = (e) => {
    const rutaSeleccionada = rutas.find((ruta) => ruta.numeroRuta === e.target.value);
    setFormData({
      ...formData,
      numeroRuta: e.target.value,
      numeroBus: rutaSeleccionada ? rutaSeleccionada.numeroBus : "",
      precio: rutaSeleccionada ? rutaSeleccionada.precio : "",
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("ultimaVenta", JSON.stringify(formData));
    navigate("/ventas-factura");
  };

  return (
    <div className="ventas-boletos-container">
      <div className="ventas-boletos-box">
        <h2 className="ventas-boletos-title">Venta de Boletos</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre Completo:</label>
          <input type="text" name="nombreCompleto" value={formData.nombreCompleto} onChange={handleChange} required />

          <label>Número de Identidad:</label>
          <input type="text" name="identidad" value={formData.identidad} onChange={handleChange} required />

          <label>¿Es menor de edad?</label>
          <select name="esMenor" value={formData.esMenor} onChange={handleChange} required>
            <option value="no">No</option>
            <option value="si">Sí</option>
          </select>

          {formData.esMenor === "si" && (
            <>
              <label>Número ID de la Partida de Nacimiento:</label>
              <input type="text" name="partidaNacimiento" value={formData.partidaNacimiento} onChange={handleChange} required />

              <label>Nombre del Responsable:</label>
              <input type="text" name="responsableMenor" value={formData.responsableMenor} onChange={handleChange} required />
            </>
          )}

          <label>Número de Ruta:</label>
          <select name="numeroRuta" value={formData.numeroRuta} onChange={handleRutaChange} required>
            <option value="">Seleccione una ruta</option>
            {rutas.map((ruta, index) => (
              <option key={index} value={ruta.numeroRuta}>
                {`${ruta.numeroRuta} - ${ruta.salida} a ${ruta.llegada}`}
              </option>
            ))}
          </select>

          <label>Número de Bus:</label>
          <input type="text" name="numeroBus" value={formData.numeroBus} readOnly />

          <label>Horario:</label>
          <select name="horario" value={formData.horario} onChange={handleChange} required>
            <option value="">Seleccione un horario</option>
            {horarios.map((horario, index) => (
              <option key={index} value={horario}>
                {horario}
              </option>
            ))}
          </select>

          <label>Precio:</label>
          <input type="text" name="precio" value={formData.precio} readOnly />

          <button type="submit" className="btn">Realizar Venta</button>
          <button type="button" className="btn cancel-btn" onClick={() => navigate("/ventas")}>
            Cancelar Factura
          </button>
        </form>
      </div>
    </div>
  );
}

export default VentasBoletos;