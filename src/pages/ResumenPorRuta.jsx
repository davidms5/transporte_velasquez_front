import { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "./ResumenPorRuta.css";

function ResumenPorRuta() {
  const [rutasResumen, setRutasResumen] = useState([
    { ruta: "ST-1001", boletos: 12, monto: 3000 },
    { ruta: "ST-1002", boletos: 8, monto: 2400 },
    { ruta: "ST-1003", boletos: 10, monto: 2800 },
    { ruta: "ST-1004", boletos: 5, monto: 1500 },
    { ruta: "ST-1005", boletos: 9, monto: 2600 },
    { ruta: "ST-1006", boletos: 4, monto: 1200 },
    { ruta: "ST-1007", boletos: 11, monto: 3100 },
    { ruta: "ST-1008", boletos: 7, monto: 2100 },
    { ruta: "ST-1009", boletos: 3, monto: 900 },
    { ruta: "ST-1010", boletos: 6, monto: 1800 },
  ]);

  const [nuevaRuta, setNuevaRuta] = useState({ ruta: "", boletos: "", monto: "" });

  const handleChange = (e) => {
    setNuevaRuta({ ...nuevaRuta, [e.target.name]: e.target.value });
  };

  const agregarRuta = () => {
    if (!nuevaRuta.ruta || !nuevaRuta.boletos || !nuevaRuta.monto) return;
    setRutasResumen([
      ...rutasResumen,
      {
        ruta: nuevaRuta.ruta,
        boletos: parseInt(nuevaRuta.boletos),
        monto: parseFloat(nuevaRuta.monto),
      },
    ]);
    setNuevaRuta({ ruta: "", boletos: "", monto: "" });
  };

  const descargarResumenPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Resumen por Ruta", doc.internal.pageSize.width / 2, 20, { align: "center" });

    autoTable(doc, {
      startY: 30,
      head: [["Ruta", "Boletos vendidos", "Monto total"]],
      body: rutasResumen.map((r) => [r.ruta, r.boletos, `L ${r.monto.toFixed(2)}`]),
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
          <input name="ruta" value={nuevaRuta.ruta} onChange={handleChange} placeholder="Ruta" />
          <input name="boletos" value={nuevaRuta.boletos} onChange={handleChange} placeholder="Boletos" type="number" />
          <input name="monto" value={nuevaRuta.monto} onChange={handleChange} placeholder="Monto (L)" type="number" />
          <button className="btn" onClick={agregarRuta}>Agregar</button>
        </div>

        <table className="resumen-table">
          <thead>
            <tr>
              <th>Ruta</th>
              <th>Boletos vendidos</th>
              <th>Monto total (L)</th>
            </tr>
          </thead>
          <tbody>
            {rutasResumen.map((r, i) => (
              <tr key={i}>
                <td>{r.ruta}</td>
                <td>{r.boletos}</td>
                <td>L {r.monto.toFixed(2)}</td>
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
