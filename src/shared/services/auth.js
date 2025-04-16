// auth.js
export function getUserRole() {
    return sessionStorage.getItem("rol"); // puede devolver 'admin', 'facturacion', etc.
  }
  
  export function isAuthenticated() {
    return !!sessionStorage.getItem("token");
  }
  