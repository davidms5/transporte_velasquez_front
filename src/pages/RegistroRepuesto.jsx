import { useNavigate } from "react-router-dom";
import "./RegistroRepuesto.css"; // Importamos el CSS
import { useState } from "react";

function RegistroRepuesto() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    id: "",
    codigoFactura: "", // Ahora es editable
    nombre: "",
    cantidad: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Nuevo Repuesto Registrado:", formData);
    
    navigate("/existencia-repuestos");
  };

  return (
    <div className="registro-repuesto-page">
      <h2 className="title">Registro de Repuesto</h2>
      <p>Ingresa los datos del nuevo repuesto.</p>

      <form className="registro-form" onSubmit={handleSubmit}>
        <input type="number" name="id" placeholder="ID del Repuesto" required value={formData.id} onChange={handleChange} />

        <input type="text" name="codigoFactura" placeholder="Código de Factura" required value={formData.codigoFactura} onChange={handleChange} />

        <input type="text" name="nombre" placeholder="Nombre del repuesto" required value={formData.nombre} onChange={handleChange} />

        <input type="number" name="cantidad" placeholder="Cantidad" required value={formData.cantidad} onChange={handleChange} />

        <textarea name="descripcion" placeholder="Descripción del repuesto" required value={formData.descripcion} onChange={handleChange}></textarea>

        <button type="submit" className="registro-button">
          Registrar Repuesto
        </button>
      </form>

      <button className="back-button" onClick={() => navigate("/repuestos")}>
        Regresar
      </button>
    </div>
  );
}

export default RegistroRepuesto;
