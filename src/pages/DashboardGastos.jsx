import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import './DashboardGastos.css';
import { useNavigate } from "react-router-dom";

Chart.register(...registerables, ChartDataLabels);

function DashboardGastos() {
  const navigate = useNavigate();

  const barChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const barChartAllRef = useRef(null);

  const gastos = [
    { factura: "FAC-000101", proveedor: "Rendillantas", cantidad: 750 },
    { factura: "FAC-000102", proveedor: "Toyota", cantidad: 320 },
    { factura: "FAC-000103", proveedor: "Rendillantas", cantidad: 580 },
    { factura: "FAC-000104", proveedor: "Super Repuestos", cantidad: 1050 },
    { factura: "FAC-000105", proveedor: "Shell", cantidad: 410 },
    { factura: "FAC-000106", proveedor: "Toyota", cantidad: 920 },
    { factura: "FAC-000107", proveedor: "Rendillantas", cantidad: 295 },
    { factura: "FAC-000108", proveedor: "Autorepuestos", cantidad: 670 },
    { factura: "FAC-000109", proveedor: "Super Repuestos", cantidad: 360 },
    { factura: "FAC-000110", proveedor: "Shell", cantidad: 830 },
    { factura: "FAC-000111", proveedor: "Toyota", cantidad: 440 },
    { factura: "FAC-000112", proveedor: "Autorepuestos", cantidad: 1200 },
    { factura: "FAC-000113", proveedor: "Autorepuestos", cantidad: 560 },
    { factura: "FAC-000114", proveedor: "Super Repuestos", cantidad: 770 },
    { factura: "FAC-000115", proveedor: "Rendillantas", cantidad: 615 },
  ];

  const proveedores = gastos.reduce((acc, gasto) => {
    acc[gasto.proveedor] = (acc[gasto.proveedor] || 0) + gasto.cantidad;
    return acc;
  }, {});

  const proveedoresOrdenados = Object.entries(proveedores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const totalGastado = gastos.reduce((acc, g) => acc + g.cantidad, 0);
  const presupuesto = 300000;
  const porcentajeGastado = ((totalGastado / presupuesto) * 100).toFixed(2);

  useEffect(() => {
    const destroyChart = (ref) => {
      if (ref.current && ref.current._chartInstance) {
        ref.current._chartInstance.destroy();
      }
    };

    // Chart 1: Top 3 Proveedores
    destroyChart(barChartRef);
    const ctx1 = barChartRef.current.getContext("2d");
    barChartRef.current._chartInstance = new Chart(ctx1, {
      type: "bar",
      data: {
        labels: proveedoresOrdenados.map((p) => p[0]),
        datasets: [{
          label: "Gasto por Proveedor",
          data: proveedoresOrdenados.map((p) => p[1]),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: "#fff" } },
        }
      }
    });

    // Chart 2: Todos los proveedores
    destroyChart(barChartAllRef);
    const ctx2 = barChartAllRef.current.getContext("2d");
    barChartAllRef.current._chartInstance = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: Object.keys(proveedores),
        datasets: [{
          label: "Gasto por Proveedor",
          data: Object.values(proveedores),
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

    // Chart 3: Línea total por factura
    destroyChart(lineChartRef);
    const ctx3 = lineChartRef.current.getContext("2d");
    lineChartRef.current._chartInstance = new Chart(ctx3, {
      type: "line",
      data: {
        labels: gastos.map(g => g.factura),
        datasets: [{
          label: "Total Gastado",
          data: gastos.map(g => g.cantidad),
          borderColor: "#36A2EB",
          tension: 0.2,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: "#fff" } },
        }
      }
    });

    // Chart 4: Doughnut presupuesto
    destroyChart(doughnutChartRef);
    const ctx4 = doughnutChartRef.current.getContext("2d");
    doughnutChartRef.current._chartInstance = new Chart(ctx4, {
      type: "doughnut",
      data: {
        labels: ["Gastado", "Disponible"],
        datasets: [{
          data: [porcentajeGastado, 100 - porcentajeGastado],
          backgroundColor: ["#36A2EB", "#2b2b2b"]
        }]
      },
      options: {
        plugins: {
          datalabels: {
            color: "white",
            font: { weight: "bold", size: 18 },
            formatter: () => `${porcentajeGastado}%`,
          },
          legend: { labels: { color: "#fff" } },
        }
      }
    });

    // Cleanup on unmount
    return () => {
      destroyChart(barChartRef);
      destroyChart(barChartAllRef);
      destroyChart(lineChartRef);
      destroyChart(doughnutChartRef);
    };
  }, []);

  return (
    <div className="dashboard-gastos">
      <h2>Dashboard de Gastos</h2>
      <div className="chart-container">
        <div className="chart-item">
          <h3>Top 3 Proveedores</h3>
          <canvas ref={barChartRef}></canvas>
        </div>
        <div className="chart-item">
          <h3>Gasto por Proveedor</h3>
          <canvas ref={barChartAllRef}></canvas>
        </div>
      </div>
      <button className="btn back-btn" onClick={() => navigate("/inicio")}>
        Regresar
      </button>
    </div>
  );
}

export default DashboardGastos;
