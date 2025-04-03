import { useNavigate } from "react-router-dom";
import "./RegistroRepuesto.css"; // Importamos el CSS
import { useState } from "react";
import {apiClient, getCookie} from "../shared/services/apiClient";

function RegistroRepuesto() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    repuesto_id: "", //esto es opcional
    factura_codigo: "", // Ahora es editable
    nombre: "",
    cantidad: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //{withCredentials: true}
    
    try {
      const token = getCookie("jwt");
      await apiClient.post("/inventario/registrar-repuesto/", formData );
      console.log("Nuevo Repuesto Registrado:", formData);
      navigate("/existencia-repuestos");
    } catch (error) {
      console.error("Error al registrar el repuesto:", error);
      alert("Error al registrar el repuesto. Por favor, inténtelo de nuevo."); //TODO: mejorar las alertas
      
    }
    
  };

  return (
    <div className="registro-repuesto-page">
      <h2 className="title">Registro de Repuesto</h2>
      <p>Ingresa los datos del nuevo repuesto.</p>

      <form className="registro-form" onSubmit={handleSubmit}>
        <input type="number" name="repuesto_id" placeholder="ID del Repuesto" value={formData.repuesto_id} onChange={handleChange} />

        <input type="text" name="factura_codigo" placeholder="Código de Factura" required value={formData.factura_codigo} onChange={handleChange} />

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
