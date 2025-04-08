import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "./VentasFactura.css";

function VentasFactura() {
  const navigate = useNavigate();
  const [venta, setVenta] = useState(null);
  const [total, setTotal] = useState(0);
  const [isv, setIsv] = useState(0);
  const [numeroFactura, setNumeroFactura] = useState("");

  useEffect(() => {
    const ultimaVenta = JSON.parse(localStorage.getItem("ultimaVenta"));
    if (ultimaVenta) {
      const subTotal = parseFloat(ultimaVenta.precio);
      const impuesto = subTotal * 0.12; // 12% ISV
      setIsv(impuesto.toFixed(2));
      setTotal((subTotal + impuesto).toFixed(2));
      console.log("ultima venbta",ultimaVenta);
      // Obtener el último número de factura
      let facturasGuardadas = JSON.parse(localStorage.getItem("facturas")) || [];
      let nuevoNumero = facturasGuardadas.length + 1;
      let numeroFormateado = ultimaVenta.numeroFactura//`000-${String(nuevoNumero).padStart(4, "0")}`;
      setNumeroFactura(numeroFormateado);

      setVenta({ ...ultimaVenta, numeroFactura: numeroFormateado });
    }
  }, []);

  // ✅ Función para generar y descargar el PDF
  const handleDownloadPDF = () => {
    if (!venta) return;

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");

    // ✅ Título centrado
    doc.setFontSize(20);
    doc.text("Factura de Venta", doc.internal.pageSize.width / 2, 20, { align: "center" });

    // ✅ Detalles generales
    doc.setFontSize(12);
    doc.text(`Número de Factura: ${numeroFactura}`, 20, 30);
    doc.text(`CAI: ${venta.CAI}`, 20, 35);
    doc.text("Empresa: Transporte Velásquez", 20, 40);
    doc.text("Fecha: " + new Date().toLocaleDateString(), 140, 40);

    // ✅ Guardar la factura en localStorage
    let facturasGuardadas = JSON.parse(localStorage.getItem("facturas")) || [];
    facturasGuardadas.push(venta);
    localStorage.setItem("facturas", JSON.stringify(facturasGuardadas));

    // ✅ Generar tabla con los datos de la factura
    const bodyData = [
      ["Nombre", venta.cliente_nombre],
      ["Identidad", venta.cliente_dpi],
      ["Número de Factura", numeroFactura],
      ["Ruta", venta.numero_ruta],
      ["Número de Bus", venta.numeroBus],
      ["Horario", venta.horario],  // ✅ Se incluye el horario en la factura
      ["Sub Total", `L ${parseFloat(venta.precio).toFixed(2)}`],
      ["I.S.V (12%)", `L ${isv}`],
      ["Total", `L ${total}`],
    ];

    if (venta.esMenor === "si") {
      bodyData.splice(3, 0, ["Partida de Nacimiento", venta.partidaNacimiento]);
      bodyData.splice(4, 0, ["Responsable del Menor", venta.responsableMenor]);
    }

    autoTable(doc, {
      startY: 50,
      head: [["Descripción", "Detalle"]],
      body: bodyData,
      theme: "grid",
      styles: { halign: "center", fontSize: 12 },
      headStyles: { fillColor: [44, 62, 80], textColor: 255, fontSize: 14 },
      columnStyles: { 0: { fontStyle: "bold" } }
    });
    console.log(venta)
    // ✅ Descargar el PDF con un nombre dinámico
    doc.save(`Factura_${venta.cliente_nombre.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="factura-container">
      <div className="factura-box">
        <h2 className="factura-title">Factura de Venta</h2>
        {venta ? (
          <div className="factura-content">
            <p><strong>Número de Factura:</strong> {numeroFactura}</p>
            <p><strong>Nombre:</strong> {venta.cliente_nombre}</p>
            <p><strong>Identidad:</strong> {venta.cliente_dpi}</p>

            {venta.esMenor === "si" && (
              <>
                <p><strong>Número ID de la Partida de Nacimiento:</strong> {venta.partidaNacimiento}</p>
                <p><strong>Nombre del Responsable:</strong> {venta.responsableMenor}</p>
              </>
            )}

            <p><strong>Ruta:</strong> {venta.numero_ruta}</p>
            <p><strong>Número de Bus:</strong> {venta.numeroBus}</p>
            <p><strong>Horario:</strong> {venta.horario}</p>
            <p><strong>Sub Total:</strong> L {parseFloat(venta.precio).toFixed(2)}</p>
            <p><strong>I.S.V (12%):</strong> L {isv}</p>
            <p><strong>Total:</strong> <span className="total-price">L {total}</span></p>

            {/* ✅ Botón corregido para generar PDF */}
            <button className="btn pdf-btn" onClick={handleDownloadPDF}>Descargar PDF</button>
          </div>
        ) : (
          <p>No hay datos de venta disponibles.</p>
        )}
        <button className="btn back-btn" onClick={() => navigate("/ventas")}>Regresar</button>
      </div>
    </div>
  );
}

export default VentasFactura;
