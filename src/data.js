// Admin authentication — change the password here
export const ADMIN_PASSWORD = "changeme123";

export function isAdminLoggedIn() {
  return sessionStorage.getItem('paint_admin') === 'true';
}
export function adminLogin(pw) {
  if (pw === ADMIN_PASSWORD) { sessionStorage.setItem('paint_admin', 'true'); return true; }
  return false;
}
export function adminLogout() {
  sessionStorage.removeItem('paint_admin');
}
