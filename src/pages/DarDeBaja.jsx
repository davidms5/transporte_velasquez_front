import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DarDeBaja.css"; // Importamos el CSS
import { apiClient } from "../shared/services/apiClient";
import { toast } from "react-toastify";

function DarDeBaja() {
  const navigate = useNavigate();
  
  // Estado inicial de los repuestos con cantidad
  const [repuestos, setRepuestos] = useState([
    //{ id: 1, nombre: "Filtro de aceite", cantidad: 10 },
    //{ id: 2, nombre: "Batería", cantidad: 5 },
    //{ id: 3, nombre: "Pastillas de freno", cantidad: 8 },
    //{ id: 4, nombre: "Alternador", cantidad: 3 },
  ]);

  // Estado para almacenar las cantidades a dar de baja
  const [bajas, setBajas] = useState({});

  useEffect(() => {
    const fetchRepuestos = async () => {
      try {
        const response = await apiClient.get("/inventario/get-repuestos/");

        setRepuestos(response.data.results);
      } catch (error) {
        console.error("Error al obtener repuestos:", error);
      }
    };

    fetchRepuestos();
  }, []);

  // Manejar cambios en la cantidad a dar de baja
  const handleCantidadChange = (id, cantidad) => {
    setBajas((prev) => ({
      ...prev,
      [id]: Math.min(Math.max(0, cantidad), repuestos.find((r) => r.id === id).cantidad), // Limita el valor
    }));
  };

  // Confirmar la baja de los repuestos seleccionados
  const handleSubmit = async () => {
    //const repuestosActualizados = repuestos.map((repuesto) => {
    //  if (bajas[repuesto.id]) {
    //    return { ...repuesto, cantidad: repuesto.cantidad - bajas[repuesto.id] };
    //  }
    //  return repuesto;
    //});
//
    //alert(`Se han dado de baja:\n${Object.entries(bajas)
    //  .map(([id, cantidad]) => `${cantidad} de ${repuestos.find((r) => r.id == id).nombre}`)
    //  .join("\n")}`);
//
    //// Filtrar los repuestos que todavía tienen existencias
    //setRepuestos(repuestosActualizados.filter((r) => r.cantidad > 0));
    //setBajas({});

    const itemsABajar = Object.entries(bajas).filter(([_, cantidad]) => cantidad > 0);

    try {
      for (const [id, cantidad] of itemsABajar) {
        const repuesto = repuestos.find((r) => r.id === parseInt(id));

        await apiClient.post(
          "/inventario/registrar-repuesto/", //TODO: cambiar esta logica en el backend
          {
            repuesto_id: repuesto.id,
            nombre: repuesto.nombre, // requerido por el serializer
            cantidad,
            estado: "OUT",
            factura_codigo: repuesto.factura, // es obligatorio
          }
        );
      }

      toast(`Se han dado de baja:\n${itemsABajar
        .map(([id, cantidad]) => `${cantidad} de ${repuestos.find((r) => r.id == id).nombre}`)
        .join("\n")}`);

      // Refrescar lista
      const nuevosRepuestos = repuestos.map((r) => {
        const cantidadBaja = bajas[r.id] || 0;
        if (cantidadBaja > 0) {
          return {
            ...r,
            cantidad: r.cantidad - cantidadBaja,
          };
        }
        return r;
      }).filter((r) => r.cantidad > 0); // Quitamos los que ya no tienen stock
      
      setRepuestos(nuevosRepuestos);
      setBajas({});

    } catch (error) {
      console.error("Error al dar de baja:", error);
      alert("Hubo un error al realizar la baja.");
    }
  };

  return (
    <div className="dar-de-baja-page">
      <h2 className="title">Dar de Baja Repuestos</h2>
      <p>Seleccione los repuestos y la cantidad que desea dar de baja:</p>

      <ul className="repuestos-list">
        {repuestos.map((repuesto) => (
          <li key={repuesto.id} className="repuesto-item">
            <span>{repuesto.nombre} (Disponible: {repuesto.cantidad})</span>
            <input
              type="number"
              min="0"
              max={repuesto.cantidad}
              value={bajas[repuesto.id] || ""}
              onChange={(e) => handleCantidadChange(repuesto.id, parseInt(e.target.value) || 0)}
            />
          </li>
        ))}
      </ul>

      <button className="submit-button" onClick={handleSubmit} disabled={Object.values(bajas).every((val) => !val)}>
        Confirmar Baja
      </button>

      <button className="back-button" onClick={() => navigate("/repuestos")}>
        Regresar
      </button>
    </div>
  );
}

export default DarDeBaja;
