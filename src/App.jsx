import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/styles.css";
import Login from "./components/Login";
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
import Facturacion from "./pages/Facturacion"; // ⚠️ Nueva importación

function App() {
  return (
    <Router>
      <div className="container">
        <h1 className="title">¡Bienvenido a Transporte Velásquez!</h1>
        <Routes>
          <Route path="/" element={<Login />} />
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
          <Route path="/facturacion" element={<Facturacion />} /> {/* ⚠️ Nueva Ruta */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
