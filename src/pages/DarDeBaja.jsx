import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DarDeBaja.css"; // Importamos el CSS

function DarDeBaja() {
  const navigate = useNavigate();

  // Estado inicial de los repuestos con cantidad
  const [repuestos, setRepuestos] = useState([
    { id: 1, nombre: "Filtro de aceite", cantidad: 10 },
    { id: 2, nombre: "Batería", cantidad: 5 },
    { id: 3, nombre: "Pastillas de freno", cantidad: 8 },
    { id: 4, nombre: "Alternador", cantidad: 3 },
  ]);

  // Estado para almacenar las cantidades a dar de baja
  const [bajas, setBajas] = useState({});

  // Manejar cambios en la cantidad a dar de baja
  const handleCantidadChange = (id, cantidad) => {
    setBajas((prev) => ({
      ...prev,
      [id]: Math.min(Math.max(0, cantidad), repuestos.find((r) => r.id === id).cantidad), // Limita el valor
    }));
  };

  // Confirmar la baja de los repuestos seleccionados
  const handleSubmit = () => {
    const repuestosActualizados = repuestos.map((repuesto) => {
      if (bajas[repuesto.id]) {
        return { ...repuesto, cantidad: repuesto.cantidad - bajas[repuesto.id] };
      }
      return repuesto;
    });

    alert(`Se han dado de baja:\n${Object.entries(bajas)
      .map(([id, cantidad]) => `${cantidad} de ${repuestos.find((r) => r.id == id).nombre}`)
      .join("\n")}`);

    // Filtrar los repuestos que todavía tienen existencias
    setRepuestos(repuestosActualizados.filter((r) => r.cantidad > 0));
    setBajas({});
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
