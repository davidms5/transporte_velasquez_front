// auth.js
export function getUserRole() {
    return sessionStorage.getItem("role"); // puede devolver 'admin', 'facturacion', etc.
  }
  
  export function isAuthenticated() {
    return !!sessionStorage.getItem("jwt_token");
  }
  