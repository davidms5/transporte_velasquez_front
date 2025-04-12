// src/pages/Estadistica.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Estadistica.css";

function Estadistica() {
  const navigate = useNavigate();

  return (
    <div className="estadistica-container">
      <div className="estadistica-box">
        <h2 className="estadistica-title">Módulo de Estadísticas</h2>
        <p className="estadistica-description">Seleccione un dashboard para visualizar los datos.</p>

        <button className="module-button" onClick={() => navigate("/dashboard-gastos")}>
          Dashboard de Gastos
        </button>

        <button className="module-button" onClick={() => navigate("/dashboard-rutas")}>
          Dashboard de Rutas
        </button>

        <button className="module-button" onClick={() => navigate("/dashboard-ventas")}>
          Dashboard de Ventas
        </button>

        <button className="btn back-btn" onClick={() => navigate("/inicio")}>
          Regresar
        </button>
      </div>
    </div>
  );
}

export default Estadistica;
