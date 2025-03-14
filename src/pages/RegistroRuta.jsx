import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistroRuta.css"; // Importamos el CSS

function RegistroRuta() {
  const navigate = useNavigate();

  const [registroData, setRegistroData] = useState({
    chofer: "",
    numeroBus: "",
    placa: "",
  });

  const handleChange = (e) => {
    setRegistroData({ ...registroData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registro Guardado: 
    Chofer: ${registroData.chofer}, 
    Número de Bus: ${registroData.numeroBus}, 
    Placa: ${registroData.placa}`);

    setRegistroData({ chofer: "", numeroBus: "", placa: "" });
  };

  return (
    <div className="registro-container">
      <div className="form-box">
        <h2 className="registro-title">Registro del Conductor</h2>
        <p className="registro-description">Complete los datos del chofer y del bus.</p>

        <form onSubmit={handleSubmit}>
          <label>Nombre del Chofer:</label>
          <input
            type="text"
            name="chofer"
            value={registroData.chofer}
            onChange={handleChange}
            required
          />

          <label>Número de Bus:</label>
          <input
            type="number"
            name="numeroBus"
            value={registroData.numeroBus}
            onChange={handleChange}
            required
          />

          <label>Placa:</label>
          <input
            type="text"
            name="placa"
            value={registroData.placa}
            onChange={handleChange}
            required
          />

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
