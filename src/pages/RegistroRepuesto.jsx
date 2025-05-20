import { useNavigate } from "react-router-dom";
import "./RegistroRepuesto.css";
import { useState } from "react";
import { apiClient } from "../shared/services/apiClient";
import { toast } from "react-toastify";

function RegistroRepuesto() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    repuesto_id_unico: "", // Esto es opcional
    factura_codigo: "",
    nombre: "",
    cantidad: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiClient.post("/inventario/registrar-repuesto/", formData);
      toast("Nuevo Repuesto Registrado");

      // Preguntar al usuario si desea continuar o salir
      const continuar = window.confirm("¿Desea continuar registrando repuestos? (Cancelar para salir del módulo)");

      if (continuar) {
        // Limpiar el formulario para nuevo registro
        setFormData({
          repuesto_id_unico: "",
          factura_codigo: "",
          nombre: "",
          cantidad: "",
          descripcion: "",
        });
      } else {
        // Salir del módulo
        navigate("/repuestos");
      }

    } catch (error) {
      if(error.response.data) {
        toast.error(`${error.response.data[0]}`);
      } else {
        console.error("Error al registrar el repuesto:", error);
        toast.error("Error al registrar el repuesto. Por favor, inténtelo de nuevo.");
      }
      
    }
  };

  return (
    <div className="registro-repuesto-page">
      <h2 className="title">Registro de Repuesto</h2>
      <p>Ingresa los datos del nuevo repuesto.</p>

      <form className="registro-form" onSubmit={handleSubmit}>
        <input
          type="number"
          name="repuesto_id_unico"
          placeholder="ID del Repuesto"
          required
          value={formData.repuesto_id_unico}
          onChange={handleChange}
        />

        <input
          type="text"
          name="factura_codigo"
          placeholder="Código de Factura"
          required
          value={formData.factura_codigo}
          onChange={handleChange}
        />

        <input
          type="text"
          name="nombre"
          placeholder="Nombre del repuesto"
          required
          value={formData.nombre}
          onChange={handleChange}
        />

        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          required
          value={formData.cantidad}
          onChange={handleChange}
        />

        <textarea
          name="descripcion"
          placeholder="Descripción del repuesto"
          required
          value={formData.descripcion}
          onChange={handleChange}
        ></textarea>

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
