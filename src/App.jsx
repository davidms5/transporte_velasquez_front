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
import Gastos from "./pages/Gastos";
import Gasolina from "./pages/Gasolina";
import GastoCompras from "./pages/GastoCompras";
import HistorialGastoCompras from "./pages/HistorialGastoCompras";
import Estadistica from "./pages/Estadistica"; // ✅ Nuevo módulo de Estadística
import DashboardGastos from "./pages/DashboardGastos"; // ✅ Dashboard de Gastos
import DashboardRutas from "./pages/DashboardRutas"; // ✅ Dashboard de Rutas
import DashboardVentas from "./pages/DashboardVentas";
import ReporteCierreDiario from "./pages/ReporteCierreDiario";
import RequireAuth from "./Components/requireAuth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FacturacionRoute, FacturacionSupervisorRoute, OperadorFacturacionRoute, OperadorRoute, OperadorSupervisorRoute, SupervisorRoute } from "./pages/security/RoleRoutes";
import { useNavigate } from "react-router-dom";
function App() {

  const navigate = useNavigate();
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
                <Route path="/repuestos" element={<OperadorSupervisorRoute><Repuestos /></OperadorSupervisorRoute> } />
                <Route path="/registro-repuesto" element={<OperadorRoute><RegistroRepuesto /> </OperadorRoute> } />
                <Route path="/reportes" element={<OperadorSupervisorRoute><Reportes /> </OperadorSupervisorRoute> } />
                <Route path="/historial" element={<OperadorSupervisorRoute><Historial /> </OperadorSupervisorRoute> } />
                <Route path="/dar-de-baja" element={<SupervisorRoute> <DarDeBaja /></SupervisorRoute> } />
                <Route path="/rutas" element={<SupervisorRoute><Rutas /> </SupervisorRoute> } />
                <Route path="/registro-ruta" element={<SupervisorRoute><RegistroRuta /> </SupervisorRoute> } />
                <Route path="/agregar-ruta" element={<SupervisorRoute><AgregarRuta /> </SupervisorRoute> } />
                <Route path="/asignacion-rutas" element={<SupervisorRoute><AsignacionRutas /> </SupervisorRoute> } />
                <Route path="/horario" element={<SupervisorRoute><Horario /> </SupervisorRoute> } />
                <Route path="/historial-rutas" element={<SupervisorRoute><HistorialRutas /> </SupervisorRoute> } />
                <Route path="/existencia-repuestos" element={<OperadorSupervisorRoute>  <ExistenciaRepuestos /></OperadorSupervisorRoute>} />
                <Route path="/facturacion" element={<FacturacionSupervisorRoute><Facturacion /> </FacturacionSupervisorRoute>  } />
                <Route path="/ventas" element={<FacturacionSupervisorRoute><Ventas /></FacturacionSupervisorRoute> } />
                <Route path="/ventas-boletos" element={<FacturacionRoute><VentasBoletos /> </FacturacionRoute> } />
                <Route path="/ventas-factura" element={<VentasFactura />} />
                <Route path="/anular-facturas" element={<FacturacionRoute> <AnularFacturas /></FacturacionRoute> } />
                <Route path="/reporte-ventas" element={<ReporteVentas />} />
                <Route path="/cierre-diario" element={<FacturacionSupervisorRoute><CierreDiario /></FacturacionSupervisorRoute> } />
                <Route path="/resumen-por-ruta" element={<ResumenPorRuta />} />
                <Route path="/gastos" element={<OperadorRoute><Gastos /> </OperadorRoute> } />
                <Route path="/gastos-gasolina" element={<OperadorRoute><Gasolina /> </OperadorRoute> } />
                <Route path="/gastos-compras" element={<OperadorRoute><GastoCompras /> </OperadorRoute> } />
                <Route path="/historial-gasto-compras" element={<SupervisorRoute><HistorialGastoCompras /></SupervisorRoute> } />
                <Route path="/estadistica" element={<SupervisorRoute><Estadistica /> </SupervisorRoute> } /> {/* ✅ Ruta Estadística */}
                <Route path="/dashboard-gastos" element={<FacturacionSupervisorRoute><DashboardGastos /> </FacturacionSupervisorRoute> } /> {/* ✅ Ruta Dashboard de Gastos */}
                <Route path="/dashboard-rutas" element={<FacturacionSupervisorRoute><DashboardRutas /> </FacturacionSupervisorRoute> } /> {/* ✅ Ruta Dashboard de Rutas */}
                <Route path="/reporte-cierre-diario" element={<ReporteCierreDiario />} /> {/* ✅ Ruta Reporte De Cierre Diario */}
                <Route path="/dashboard-ventas" element={<FacturacionSupervisorRoute> <DashboardVentas/></FacturacionSupervisorRoute> }/>
                <Route path="/unauthorized" element={<><h2>No tienes permisos para ver esta página ❌</h2> <button onClick={() => navigate(-1)}> volver</button></>}/>
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
