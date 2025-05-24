import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import './DashboardVentas.css';
import { useNavigate } from "react-router-dom";

Chart.register(...registerables, ChartDataLabels);

function DashboardVentas() {
  const navigate = useNavigate();

  const barChartRutaRef = useRef(null);
  const barChartHorarioRef = useRef(null);  // Nuevo gráfico para horarios
  const doughnutChartRef = useRef(null);

  const ventas = [
    { factura: "F-20250417-107735", ruta: "ST-3005", cantidad: 115.00 },
    { factura: "F-20250417-107736", ruta: "ST-3004", cantidad: 175.00 },
    { factura: "F-20250417-107737", ruta: "ST-3007", cantidad: 125.00 },
    { factura: "F-20250417-107738", ruta: "ST-3003", cantidad: 110.00 },
    { factura: "F-20250417-107739", ruta: "ST-3002", cantidad: 145.00 },
    { factura: "F-20250417-107740", ruta: "ST-3001", cantidad: 150.00 },
    { factura: "F-20250417-107741", ruta: "ST-3004", cantidad: 175.00 },
    { factura: "F-20250417-107742", ruta: "ST-3007", cantidad: 125.00 },
    { factura: "F-20250417-107743", ruta: "ST-3005", cantidad: 115.00 },
    { factura: "F-20250417-107744", ruta: "ST-3003", cantidad: 110.00 },
    { factura: "F-20250417-107745", ruta: "ST-3002", cantidad: 145.00 },
    { factura: "F-20250417-107746", ruta: "ST-3001", cantidad: 150.00 },
    { factura: "F-20250417-107747", ruta: "ST-3004", cantidad: 175.00 },
    { factura: "F-20250417-107748", ruta: "ST-3007", cantidad: 125.00 },
    { factura: "F-20250417-107749", ruta: "ST-3005", cantidad: 115.00 },
    { factura: "F-20250417-107750", ruta: "ST-3003", cantidad: 110.00 }
  ];

  const rutas = ventas.reduce((acc, venta) => {
    acc[venta.ruta] = (acc[venta.ruta] || 0) + venta.cantidad;
    return acc;
  }, {});

  const totalVentas = ventas.reduce((acc, v) => acc + v.cantidad, 0);

  const horarios = [
    "06:00 - 08:00", "06:00 - 08:00", "07:00 - 08:00", 
    "14:00 - 15:30", "07:00 - 08:20"
  ];

  const horarioCount = horarios.reduce((acc, horario) => {
    acc[horario] = (acc[horario] || 0) + 1;
    return acc;
  }, {});

  const horarioLabels = Object.keys(horarioCount);
  const horarioData = Object.values(horarioCount);

  useEffect(() => {
    const destroyChart = (ref) => {
      if (ref.current && ref.current._chartInstance) {
        ref.current._chartInstance.destroy();
      }
    };

    // Chart 2: Rutas más Usadas
    destroyChart(barChartRutaRef);
    const ctx2 = barChartRutaRef.current.getContext("2d");
    barChartRutaRef.current._chartInstance = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: Object.keys(rutas),
        datasets: [{
          label: "Rutas más Usadas",
          data: Object.values(rutas),
          backgroundColor: "#4BC0C0",
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: "#fff" } },
        }
      }
    });

    // Chart 3: Top 5 Horarios Más Usados
    destroyChart(barChartHorarioRef);
    const ctx3 = barChartHorarioRef.current.getContext("2d");
    barChartHorarioRef.current._chartInstance = new Chart(ctx3, {
      type: "bar",
      data: {
        labels: horarioLabels,
        datasets: [{
          label: "Top 5 Horarios Más Usados",
          data: horarioData,
          backgroundColor: "#FFCE56",
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: "#fff" } },
        },
        scales: {
          y: {
            ticks: {
              color: "#ffffff",
              callback: (value) => `${value}`,
            }
          },
          x: {
            ticks: {
              color: "#ffffff",
            }
          }
        }
      }
    });

    // Chart 4: Total de Boletos Vendidos por Mes
    destroyChart(doughnutChartRef);
    //const ctx4 = doughnutChartRef.current.getContext("2d");
    //doughnutChartRef.current._chartInstance = new Chart(ctx4, {
    //  type: "bar",
    //  data: {
    //    labels: ["Marzo", "Abril"],
    //    datasets: [{
    //      label: "Total de Boletos Vendidos por Mes",
    //      data: [7480, 6345],
    //      backgroundColor: ["#36A2EB", "#FFCE56"],
    //    }]
    //  },
    //  options: {
    //    responsive: true,
    //    plugins: {
    //      legend: {
    //        labels: { color: "#ffffff" }
    //      },
    //      datalabels: {
    //        color: "#ffffff",
    //        font: { weight: "bold", size: 16 },
    //        formatter: value => `L${value}`
    //      }
    //    },
    //    scales: {
    //      y: {
    //        ticks: {
    //          color: "#ffffff",
    //          callback: value => `L${value}`
    //        }
    //      },
    //      x: {
    //        ticks: {
    //          color: "#ffffff"
    //        }
    //      }
    //    }
    //  }
    //});

    return () => {
      destroyChart(barChartRutaRef);
      destroyChart(barChartHorarioRef);
    };
  }, [ventas]);

  return (
    <div className="dashboard-ventas">
      <h2>Dashboard de Ventas</h2>
      <div className="chart-container">
        <div className="chart-item">
          <h3>Rutas más Usadas</h3>
          <canvas ref={barChartRutaRef}></canvas>
        </div>
        <div className="chart-item">
          <h3>Top 5 Horarios Más Usados</h3>
          <canvas ref={barChartHorarioRef}></canvas>
        </div>

      </div>
      <button className="btn back-btn" onClick={() => navigate("/estadistica")}>
        Regresar
      </button>
    </div>
  );
}

export default DashboardVentas;
