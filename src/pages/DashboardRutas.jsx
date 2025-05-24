import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import "../pages/DashboardRutas.css";
import { useNavigate } from "react-router-dom";

const DashboardRutas = () => {
  const viajesPorRutaRef = useRef(null);
  const conductorPorRecorridosRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const rutas = ["ST-3007", "ST-3005", "ST-3004", "ST-3003", "ST-3002"];
    const precios = [125.00, 115.00, 175.00, 110.00, 145.00];

    const conductores = [
      { nombre: "David", dni: "77884455", recorridos: 3 },
      { nombre: "Manuel", dni: "88882222", recorridos: 3 },
      { nombre: "Ricardo", dni: "54882227", recorridos: 4 },
      { nombre: "Luis", dni: "88882227", recorridos: 2 },
      { nombre: "Daniel", dni: "85682212", recorridos: 2 },
    ];

    const colores = rutas.map(() => `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`);

    // Gráfico 1: Rutas Existentes según el Precio (De más caro a más barato)
    if (!viajesPorRutaRef.current.chart) {
      const ctx1 = viajesPorRutaRef.current.getContext("2d");
      viajesPorRutaRef.current.chart = new Chart(ctx1, {
        type: "bar",
        data: {
          labels: rutas,
          datasets: [
            {
              label: "Precio por Ruta",
              data: precios,
              backgroundColor: colores,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => `L${ctx.parsed.y}`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: "Precio ($)" },
              ticks: {color: "cyan"},
              
            },
            x: {
              title: { display: true, text: "Ruta" },
               ticks: {color: "cyan"},
            },
          },
        },
      });
    }

    // Gráfico 2: Conductor que hace más recorridos
    const nombresConductores = conductores.map((c) => `${c.nombre} (${c.dni})`);
    const recorridos = conductores.map((c) => c.recorridos);

    if (!conductorPorRecorridosRef.current.chart) {
      const ctx2 = conductorPorRecorridosRef.current.getContext("2d");
      conductorPorRecorridosRef.current.chart = new Chart(ctx2, {
        type: "bar",
        data: {
          labels: nombresConductores,
          datasets: [
            {
              label: "Recorridos por Conductor",
              data: recorridos,
              backgroundColor: colores,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.parsed.y} recorridos`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: "Cantidad de Recorridos" },
              ticks: {color: "cyan"},
            },
            x: {
              title: { display: true, text: "Conductor" },
              ticks: {color: "cyan"},
            },
          },
        },
      });
    }
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard de Rutas</h2>

      <div className="chart-card">
        <h3 className="chart-title">Rutas Existentes según el Precio</h3>
        <canvas ref={viajesPorRutaRef} width="500" height="300" />
      </div>

      <div className="chart-card">
        <h3 className="chart-title">Conductores con mas rutas</h3>
        <canvas ref={conductorPorRecorridosRef} width="500" height="300" />
      </div>

      <div className="flex justify-center mt-8">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
          onClick={() => navigate("/estadistica")}
        >
          Regresar
        </button>
      </div>
    </div>
  );
};

export default DashboardRutas;
