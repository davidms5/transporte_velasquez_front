import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";
const DashboardRutas = () => {
  const viajesPorRutaRef = useRef(null);
  const precioPorRutaRef = useRef(null);
  const topRutasHorariosRef = useRef(null);

  const viajesPorRutaChart = useRef(null);
  const precioPorRutaChart = useRef(null);
  const topRutasHorariosChart = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const rutas = ["ST-001", "ST-002", "ST-003", "ST-004", "ST-005", "ST-006", "ST-007", "ST-009", "ST-010"];
    const viajes = [20, 15, 25, 10, 30, 12, 18, 22, 16];
    const precios = [5.5, 6.0, 5.0, 4.5, 6.5, 5.2, 4.8, 6.3, 5.9];

    const colores = rutas.map(() => `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`);

    // Viajes por Ruta
    if (viajesPorRutaChart.current) viajesPorRutaChart.current.destroy();
    const ctx1 = viajesPorRutaRef.current.getContext("2d");
    viajesPorRutaChart.current = new Chart(ctx1, {
      type: "bar",
      data: {
        labels: rutas,
        datasets: [
          {
            label: "Cantidad de Viajes",
            data: viajes,
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
              label: (ctx) => `${ctx.parsed.y} viajes`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Cantidad de Viajes" },
          },
          x: {
            title: { display: true, text: "Ruta" },
          },
        },
      },
    });

    // Precio por Ruta (Gráfico Lineal)
    if (precioPorRutaChart.current) precioPorRutaChart.current.destroy();
    const ctx2 = precioPorRutaRef.current.getContext("2d");
    precioPorRutaChart.current = new Chart(ctx2, {
      type: "line",
      data: {
        labels: rutas,
        datasets: [
          {
            label: "Precio ($)",
            data: precios,
            fill: false,
            borderColor: "#36A2EB",
            tension: 0.3,
            pointBackgroundColor: "#36A2EB",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Precio ($)",
            },
          },
          x: {
            title: {
              display: true,
              text: "Ruta",
            },
          },
        },
      },
    });

    // Top 5 Rutas y Horarios Más Usados
    const horarios = ["8:00-10:00", "9:00-11:00", "1:00pm-2:00", "4:00pm", "6:00pm-7:30"];
    const topRutas = ["ST-001", "ST-002", "ST-003", "ST-004", "ST-005"];
    const combinaciones = topRutas.map((ruta, i) => `${ruta} - ${horarios[i]}`);
    const topColores = ['#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#2ECC71'];

    if (topRutasHorariosChart.current) topRutasHorariosChart.current.destroy();
    const ctx3 = topRutasHorariosRef.current.getContext("2d");
    topRutasHorariosChart.current = new Chart(ctx3, {
      type: "bar",
      data: {
        labels: combinaciones,
        datasets: [
          {
            label: "Cantidad de Viajes",
            data: [18, 15, 13, 10, 9],
            backgroundColor: topColores,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.parsed.y} viajes`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Viajes",
            },
          },
          x: {
            title: {
              display: true,
              text: "Ruta - Horario",
            },
          },
        },
      },
    });
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard de Rutas</h2>

      <div className="chart-card">
        <h3 className="chart-title">Viajes por Ruta</h3>
        <canvas ref={viajesPorRutaRef} width="400" height="250" />
      </div>

      <div className="chart-card">
        <h3 className="chart-title">Precio por Ruta</h3>
        <canvas ref={precioPorRutaRef} width="400" height="250" />
      </div>

      <div className="chart-card">
        <h3 className="chart-title">Top 5 Rutas y Horarios Más Usados</h3>
        <canvas ref={topRutasHorariosRef} width="400" height="250" />
      </div>

      <div className="flex justify-center mt-8">
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
         onClick={() => navigate("/estadistica")}>
          regresar
        </button>
      </div>
    </div>
  );
};

export default DashboardRutas;
