import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { apiClient } from "../shared/services/apiClient";
import "./ResumenPorRuta.css";

function ResumenPorRuta() {
  //const [rutasResumen, setRutasResumen] = useState([
  //  { ruta: "ST-1001", boletos: 12, monto: 3000 },
  //  { ruta: "ST-1002", boletos: 8, monto: 2400 },
  //  { ruta: "ST-1003", boletos: 10, monto: 2800 },
  //  { ruta: "ST-1004", boletos: 5, monto: 1500 },
  //  { ruta: "ST-1005", boletos: 9, monto: 2600 },
  //  { ruta: "ST-1006", boletos: 4, monto: 1200 },
  //  { ruta: "ST-1007", boletos: 11, monto: 3100 },
  //  { ruta: "ST-1008", boletos: 7, monto: 2100 },
  //  { ruta: "ST-1009", boletos: 3, monto: 900 },
  //  { ruta: "ST-1010", boletos: 6, monto: 1800 },
  //]);

  const [rutasResumen, setRutasResumen] = useState([]);
  const [nuevaRuta, setNuevaRuta] = useState({ numero_ruta: "", boletos_vendidos: "", monto: "" });


  useEffect(() => {
    const fetchResumen = async () => {
      try {
        const response = await apiClient.get("/ventas/resumen-por-ruta/");
        setRutasResumen(response.data);
      } catch (error) {
        console.error("Error cargando resumen:", error);
      }
    };

    fetchResumen();
  }, []);

  const handleChange = (e) => {
    setNuevaRuta({ ...nuevaRuta, [e.target.name]: e.target.value });
  };

  const fetchResumenPorFecha = async (fecha) => {
    try {
      const response = await apiClient.get(`/ventas/resumen-por-ruta/?fecha=${fecha}`);
      setRutasResumen(response.data);
    } catch (error) {
      console.error("Error cargando resumen:", error);
    }
  };

  const agregarRuta = () => {
    if (!nuevaRuta.numero_ruta || !nuevaRuta.boletos_vendidos || !nuevaRuta.monto) return;
    setRutasResumen([
      ...rutasResumen,
      {
        numero_ruta: nuevaRuta.numero_ruta,
        boletos_vendidos: parseInt(nuevaRuta.boletos_vendidos),
        monto: parseFloat(nuevaRuta.monto),
      },
    ]);
    setNuevaRuta({ numero_ruta: "", boletos_vendidos: "", monto: "" });
  };

  const descargarResumenPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Resumen por Ruta", doc.internal.pageSize.width / 2, 20, { align: "center" });

    autoTable(doc, {
      startY: 30,
      head: [["Ruta", "Boletos vendidos", "Monto total", "fecha"]],
      body: rutasResumen.map((r) => [r.numero_ruta, r.boletos_vendidos, `L ${r.precio_unitario.toFixed(2)}`, r.fecha]),
      styles: { halign: "center" },
      headStyles: { fillColor: [34, 45, 50], textColor: 255 },
    });

    doc.save("resumen_por_ruta.pdf");
  };

  return (
    <div className="resumen-container">
      <div className="resumen-box">
        <h2 className="resumen-title">Resumen por Ruta</h2>

        <div className="form-row">
          {/*<input name="numero_ruta" value={nuevaRuta.ruta} onChange={handleChange} placeholder="Ruta" />*/}
          {/*<input name="boletos_vendidos" value={nuevaRuta.boletos} onChange={handleChange} placeholder="Boletos" type="number" />*/}
          {/*<input name="monto" value={nuevaRuta.monto} onChange={handleChange} placeholder="Monto (L)" type="number" />*/}
          {/*<button className="btn" onClick={agregarRuta}>Agregar</button>*/}
          <div className="filtro-fecha">
            <label htmlFor="fecha">Filtrar por Fecha:</label>
            <input type="date" onChange={(e) => fetchResumenPorFecha(e.target.value)} className="input-fecha"/>
          </div>
        </div>

        <table className="resumen-table">
          <thead>
            <tr>
              <th>Ruta</th>
              <th>Boletos vendidos</th>
              <th>Monto total (L)</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {rutasResumen.map((r, i) => (
              <tr key={i}>
                <td>{r.numero_ruta}</td>
                <td>{r.boletos_vendidos}</td>
                <td>L {r.precio_unitario.toFixed(2)}</td>
                <td>{r.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn" onClick={descargarResumenPDF}>
          Descargar Resumen PDF
        </button>
      </div>
    </div>
  );
}

export default ResumenPorRuta;
