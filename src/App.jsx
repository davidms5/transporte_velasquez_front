import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/styles.css";
import Login from "./Components/Login";
import Inicio from "./pages/Inicio";
import Repuestos from "./pages/Repuestos";
import RegistroRepuesto from "./pages/RegistroRepuesto";
import Reportes from "./pages/Reportes";
import Historial from "./pages/Historial";
import DarDeBaja from "./pages/DarDeBaja";
import Rutas from "./pages/Rutas";
import RegistroRuta from "./pages/RegistroRuta";
import AgregarRuta from "./pages/AgregarRuta";
import AsignacionRutas from "./pages/AsignacionRutas";
import Horario from "./pages/Horario";
import HistorialRutas from "./pages/HistorialRutas";
import ExistenciaRepuestos from "./pages/ExistenciaRepuestos";
import Facturacion from "./pages/Facturacion";
import Ventas from "./pages/Ventas";
import VentasBoletos from "./pages/VentasBoletos";
import VentasFactura from "./pages/VentasFactura";
import AnularFacturas from "./pages/AnularFacturas";
import ReporteVentas from "./pages/ReporteVentas";
import CierreDiario from "./pages/CierreDiario";
import ResumenPorRuta from "./pages/ResumenPorRuta";
import RequireAuth from "./Components/requireAuth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
        path="/*"
        element={
          <RequireAuth>
            <Routes>
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/repuestos" element={<Repuestos />} />
                <Route path="/registro-repuesto" element={<RegistroRepuesto />} />
                <Route path="/reportes" element={<Reportes />} />
                <Route path="/historial" element={<Historial />} />
                <Route path="/dar-de-baja" element={<DarDeBaja />} />
                <Route path="/rutas" element={<Rutas />} />
                <Route path="/registro-ruta" element={<RegistroRuta />} />
                <Route path="/agregar-ruta" element={<AgregarRuta />} />
                <Route path="/asignacion-rutas" element={<AsignacionRutas />} />
                <Route path="/horario" element={<Horario />} />
                <Route path="/historial-rutas" element={<HistorialRutas />} />
                <Route path="/existencia-repuestos" element={<ExistenciaRepuestos />} />
                <Route path="/facturacion" element={<Facturacion />} />
                <Route path="/ventas" element={<Ventas />} />
                <Route path="/ventas-boletos" element={<VentasBoletos />} />
                <Route path="/ventas-factura" element={<VentasFactura />} />
                <Route path="/anular-facturas" element={<AnularFacturas />} />
                <Route path="/reporte-ventas" element={<ReporteVentas />} />
                <Route path="/cierre-diario" element={<CierreDiario />} />
                <Route path="/resumen-por-ruta" element={<ResumenPorRuta />} />
            </Routes>
          </RequireAuth>
        }
        />

      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;