import { useState } from 'react';
import { isAdminLoggedIn, adminLogin, adminLogout } from './data.js';
import { useStorage } from './useStorage.js';
import LoginScreen from './admin/LoginScreen.jsx';
import Dashboard from './admin/Dashboard.jsx';

export default function AdminApp() {
  const [authed, setAuthed] = useState(isAdminLoggedIn());
  const [portfolio, setPortfolio, portfolioLoading] = useStorage('portfolio_items');
  const [about,     setAbout,     aboutLoading]     = useStorage('about_data');

  const handleLogin  = (pw) => { if (adminLogin(pw)) { setAuthed(true); return true; } return false; };
  const handleLogout = () => { adminLogout(); setAuthed(false); };

  if (!authed) return <LoginScreen onLogin={handleLogin} />;

  return (
    <Dashboard
      portfolio={portfolio || []}
      about={about}
      setPortfolio={setPortfolio}
      setAbout={setAbout}
      onLogout={handleLogout}
      loading={portfolioLoading || aboutLoading}
    />
  );
}
