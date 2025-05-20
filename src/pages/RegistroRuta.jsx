import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistroRuta.css"; // Importamos el CSS
import { apiClient } from "../shared/services/apiClient";
import { toast } from "react-toastify";

function RegistroRuta() {
  const navigate = useNavigate();

  //const [registroData, setRegistroData] = useState({
  //  chofer: "",
  //  numeroBus: "",
  //  placa: "",
  //});

  const [registroData, setRegistroData] = useState({
    conductor: {
      nombre: "",
      numero_licencia: "",
      dpi: "",
      expiracion_licencia: "",
    },
    bus: {
      numero_id: "",
      modelo: "",
    }
  });

  //const handleChange = (e) => {
  //  setRegistroData({ ...registroData, [e.target.name]: e.target.value });
  //};

  const handleChange = (e, grupo) => {
    setRegistroData((prev) => ({
      ...prev,
      [grupo]: {
        ...prev[grupo],
        [e.target.name]: e.target.value
      }
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post(
        "/rutas-buses/registro/conductor-bus/",  // Cambia la URL según tu backend
        registroData
      );
  
      toast("Registro exitoso: " + response.data.message);
      setRegistroData({
        conductor: {
          nombre: "",
          numero_licencia: "",
          dpi: "",
          expiracion_licencia: "",
        },
        bus: {
          numero_id: "",
          modelo: "",
        },
      });
    } catch (error) {
      console.error("Error al registrar:", error);
      //alert("Error al registrar. Revisa los datos.");
      if (error.response && error.response.status === 400) {
        const errores = error.response.data;
        for (const key in errores) {
          if (typeof errores[key] === 'string') {
            toast.error(`${key}: ${errores[key]}`);
          } else if (Array.isArray(errores[key])) {
            errores[key].forEach((msg) => toast.error(`${key}: ${msg}`));
          } else {
            toast.error(`${key}: Error desconocido`);
          }
        }
      } else {
        toast.error("Error inesperado al registrar conductor y bus.");
      }
    }

    //alert(`Registro Guardado: 
    //Chofer: ${registroData.chofer}, 
    //Número de Bus: ${registroData.numeroBus}, 
    //Placa: ${registroData.placa}`);

    //setRegistroData({ chofer: "", numeroBus: "", placa: "" });
  };

  return (
    <div className="registro-container">
      <div className="form-box">
        <h2 className="registro-title">Registro del Conductor</h2>
        <p className="registro-description">Complete los datos del chofer y del bus.</p>

        <form onSubmit={handleSubmit}>
        <div className="form-row">
          {/* Columna del Conductor */}
          <div className="form-section">
            <h3>Datos del Conductor</h3>
            <label>Nombre:</label>
            <input type="text" name="nombre" value={registroData.conductor.nombre} onChange={(e) => handleChange(e, "conductor")} required />

            <label>No. de Licencia:</label>
            <input type="text" name="numero_licencia" value={registroData.conductor.numero_licencia} onChange={(e) => handleChange(e, "conductor")} required />

            <label>DPI:</label>
            <input type="text" name="dpi" value={registroData.conductor.dpi} onChange={(e) => handleChange(e, "conductor")} required />

            <label>Fecha de Expiración:</label>
            <input type="date" name="expiracion_licencia" value={registroData.conductor.expiracion_licencia} onChange={(e) => handleChange(e, "conductor")} required />
          </div>

          {/* Columna del Bus */}
          <div className="form-section">
            <h3>Datos del Bus</h3>
            <label>Número del Bus:</label>
            <input type="text" name="numero_id" value={registroData.bus.numero_id} onChange={(e) => handleChange(e, "bus")} required />

            <label>Modelo:</label>
            <input type="text" name="modelo" value={registroData.bus.modelo} onChange={(e) => handleChange(e, "bus")} required />
          </div>
        </div>

          <button type="submit" className="btn">Registrar</button>
        </form>

        <button className="btn back-btn" onClick={() => navigate("/rutas")}>
          Regresar
        </button>
      </div>
    </div>
  );
}

export default RegistroRuta;
