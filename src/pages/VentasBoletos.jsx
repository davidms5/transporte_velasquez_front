import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../shared/services/apiClient";
import "./VentasBoletos.css";

function VentasBoletos() {
  const navigate = useNavigate();

  const [rutas, setRutas] = useState([]);
  const [horariosRuta, setHorariosRuta] = useState([]);
  // Lista de rutas predefinidas con su número de bus y precio
  //const rutas = [
  //  { numeroRuta: "ST-1001", salida: "Ciudad A", llegada: "Ciudad B", numeroBus: "1050", precio: 250 },
  //  { numeroRuta: "ST-1002", salida: "Ciudad B", llegada: "Ciudad C", numeroBus: "1051", precio: 300 },
  //  { numeroRuta: "ST-1003", salida: "Ciudad C", llegada: "Ciudad D", numeroBus: "1052", precio: 275 },
  //  { numeroRuta: "ST-1004", salida: "Ciudad D", llegada: "Ciudad E", numeroBus: "1053", precio: 290 },
  //  { numeroRuta: "ST-1005", salida: "Ciudad E", llegada: "Ciudad F", numeroBus: "1054", precio: 260 },
  //  { numeroRuta: "ST-1006", salida: "Ciudad F", llegada: "Ciudad G", numeroBus: "1055", precio: 310 },
  //  { numeroRuta: "ST-1007", salida: "Ciudad G", llegada: "Ciudad H", numeroBus: "1056", precio: 280 },
  //];

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
    cliente_nombre: "",
    cliente_dpi: "",
    es_adulto: true,
    partida_nacimiento_id: "",
    responsable_menor: "",
    responsable_dpi: "",
    numero_ruta: "",
    numeroBus: "",
    precio: "",
    horario: "",
    horario_ruta_id: "",
  });

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const response = await apiClient.get("/rutas-buses/rutas-con-horario/");
        setRutas(response.data);
      } catch (error) {
        console.error("Error cargando rutas:", error);
      }
    };

    fetchRutas();
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar selección de ruta para asignar número de bus y precio
  const handleRutaChange = async (e) => {
    const rutaSeleccionada = rutas.find((ruta) => ruta.numero_ruta === e.target.value);

    try {
      const response = await apiClient.get(`/rutas-buses/rutas/${e.target.value}/horarios/`);
      setHorariosRuta(response.data);
      console.log(response.data, rutaSeleccionada);
    } catch (error) {
      console.error("Error cargando horarios:", error);
      setHorariosRuta([]);
    }
    //console.log(e.target.value, rutaSeleccionada);
    setFormData({
      ...formData,
      numero_ruta: rutaSeleccionada.numero_ruta,
      numeroBus: rutaSeleccionada ? rutaSeleccionada.bus : "",
      precio: rutaSeleccionada ? rutaSeleccionada.precio : "",
      horario: "",
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("ultimaVenta", JSON.stringify(formData));

    try {
      
      const payload = {
        cliente_nombre: formData.nombreCompleto,
        cliente_dpi: formData.identidad,
        es_adulto: formData.es_adulto === "true" || formData.es_adulto === true,
        precio: parseFloat(formData.precio),
        partida_nacimiento_id: formData.partida_nacimiento_id || null,
        responsable_menor: formData.responsable_menor || null,
        responsable_dpi: formData.responsable_dpi || null,
        horario_ruta: formData.horario_ruta_id // debe ser el ID numérico del horario seleccionado
      };
      
    } catch (error) {
      console.error("Error al registrar el ticket:", error);
      alert("Ocurrió un error al registrar la venta. Intenta nuevamente.");
    }

    navigate("/ventas-factura");
  };

  return (
    <div className="ventas-boletos-container">
      <div className="ventas-boletos-box">
        <h2 className="ventas-boletos-title">Venta de Boletos</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre Completo:</label>
          <input type="text" name="cliente_nombre" value={formData.cliente_nombre} onChange={handleChange} required />

          <label>Número de Identidad:</label>
          <input type="text" name="cliente_dpi" value={formData.cliente_dpi} onChange={handleChange} required />

          <label>¿Es menor de edad?</label>
          <select name="es_adulto" value={formData.es_adulto} onChange={handleChange} required>
            <option value={false}>No</option>
            <option value={true}>Sí</option>
          </select>

          {formData.es_adulto === "true" && (
            <>
              <label>Número ID de la Partida de Nacimiento:</label>
              <input type="text" name="partida_nacimiento_id" value={formData.partida_nacimiento_id} onChange={handleChange} required />

              <label>Nombre del Responsable:</label>
              <input type="text" name="responsable_menor" value={formData.responsable_menor} onChange={handleChange} required />

              <label>DPI del Responsable:</label>
              <input type="text" name="responsable_dpi" value={formData.responsable_dpi} onChange={handleChange} required />
            </>
          )}

          <label>Número de Ruta:</label>
          <select name="numero_ruta" value={formData.numero_ruta} onChange={handleRutaChange} required>
            <option value="">Seleccione una ruta</option>
            {rutas.map((ruta, index) => (
              <option key={index} value={ruta.numero_ruta}>
                {`${ruta.numero_ruta} - ${ruta.origen} a ${ruta.destino}`}
              </option>
            ))}
          </select>

          <label>Número de Bus:</label>
          <input type="text" name="numeroBus" value={formData.numeroBus} readOnly />

          <label>Horario:</label>
          <select name="horario" value={formData.horario} onChange={handleChange} required>
            <option value="">Seleccione un horario</option>
            {horariosRuta.map((horario, index) => (
              <option key={index} value={`${horario.hora_salida} - ${horario.hora_llegada}`}>
                {`${horario.hora_salida} - ${horario.hora_llegada}`}
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