import { useState } from 'react';
import { isAdminLoggedIn, adminLogin, adminLogout, DEFAULT_PORTFOLIO, DEFAULT_ABOUT } from './data.js';
import { useStorage } from './useStorage.js';
import LoginScreen from './admin/LoginScreen.jsx';
import Dashboard from './admin/Dashboard.jsx';

export default function AdminApp() {
  const [authed, setAuthed] = useState(isAdminLoggedIn());
  const [portfolio, setPortfolio] = useStorage('portfolio_items', DEFAULT_PORTFOLIO);
  const [about, setAbout] = useStorage('about_data', DEFAULT_ABOUT);

  const handleLogin = (pw) => { if (adminLogin(pw)) { setAuthed(true); return true; } return false; };
  const handleLogout = () => { adminLogout(); setAuthed(false); };

  if (!authed) return <LoginScreen onLogin={handleLogin} />;
  return <Dashboard portfolio={portfolio} about={about} setPortfolio={setPortfolio} setAbout={setAbout} onLogout={handleLogout} />;
}
