import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DarDeBaja.css";
import { apiClient } from "../shared/services/apiClient";
import { toast } from "react-toastify";

function DarDeBaja() {
  const navigate = useNavigate();

  const [repuestos, setRepuestos] = useState([]);
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

  const handleCantidadChange = (id, cantidad) => {
    setBajas((prev) => ({
      ...prev,
      [id]: Math.min(Math.max(0, cantidad), repuestos.find((r) => r.id === id).cantidad),
    }));
  };

  const handleSubmit = async () => {
    const itemsABajar = Object.entries(bajas).filter(([_, cantidad]) => cantidad > 0);

    try {
      for (const [id, cantidad] of itemsABajar) {
        const repuesto = repuestos.find((r) => r.id === parseInt(id));

        await apiClient.post("/inventario/registrar-repuesto/", {
          repuesto_id: repuesto.id,
          nombre: repuesto.nombre,
          cantidad,
          estado: "OUT",
          factura_codigo: repuesto.factura,
        });
      }

      toast(`Se han dado de baja:\n${itemsABajar
        .map(([id, cantidad]) => `${cantidad} de ${repuestos.find((r) => r.id == id).nombre}`)
        .join("\n")}`);

      const nuevosRepuestos = repuestos
        .map((r) => {
          const cantidadBaja = bajas[r.id] || 0;
          if (cantidadBaja > 0) {
            return {
              ...r,
              cantidad: r.cantidad - cantidadBaja,
            };
          }
          return r;
        })
        .filter((r) => r.cantidad > 0);

      setRepuestos(nuevosRepuestos);
      setBajas({});
    } catch (error) {
      console.error("Error al dar de baja:", error);
      alert("Hubo un error al realizar la baja.");
    }
  };

  // 🔐 Nueva función para pedir código antes de permitir la baja
  const handleProtectedSubmit = () => {
    const codigo = prompt("Ingrese el código de autorización para dar de baja:");
    if (codigo === "2025") {
      handleSubmit();
    } else {
      alert("Código incorrecto. No se realizó la baja.");
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
              onChange={(e) =>
                handleCantidadChange(repuesto.id, parseInt(e.target.value) || 0)
              }
            />
          </li>
        ))}
      </ul>

      <button
        className="submit-button"
        onClick={handleProtectedSubmit}
        disabled={Object.values(bajas).every((val) => !val)}
      >
        Confirmar Baja
      </button>

      <button className="back-button" onClick={() => navigate("/repuestos")}>
        Regresar
      </button>
    </div>
  );
}

export default DarDeBaja;
