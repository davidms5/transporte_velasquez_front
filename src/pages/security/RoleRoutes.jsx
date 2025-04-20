import ProtectedRoute from "./ProtectedRoute";
import { ROLES } from "../../shared/constants/roles";

export const FacturacionRoute = ({children}) => {
    return <ProtectedRoute roles={[ROLES.ADMIN, ROLES.FACTURACION]}>{children}</ProtectedRoute>
}

export const SupervisorRoute = ({children}) => {
    return <ProtectedRoute roles={[ROLES.ADMIN, ROLES.SUPERVISOR]}>{children}</ProtectedRoute>
}

export const FacturacionSupervisorRoute = ({children}) => {
    return <ProtectedRoute roles={[ROLES.ADMIN, ROLES.SUPERVISOR, ROLES.FACTURACION]}>{children}</ProtectedRoute>
}

export const OperadorRoute = ({children}) => {
    return <ProtectedRoute roles={[ROLES.ADMIN, ROLES.OPERADOR]}>{children}</ProtectedRoute>
}

export const OperadorSupervisorRoute = ({children}) => {
    return <ProtectedRoute roles={[ROLES.ADMIN, ROLES.SUPERVISOR, ROLES.OPERADOR]}>{children}</ProtectedRoute>
}

export const OperadorFacturacionRoute = ({children}) => {
    return <ProtectedRoute roles={[ROLES.ADMIN, ROLES.FACTURACION, ROLES.OPERADOR]}>{children}</ProtectedRoute>
}