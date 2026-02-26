import { useState } from 'react';
import WorksManager from './WorksManager.jsx';
import ProfileEditor from './ProfileEditor.jsx';
import s from './Dashboard.module.css';

export default function Dashboard({ portfolio, about, setPortfolio, setAbout, onLogout }) {
  const [tab, setTab] = useState('works');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'ok') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className={s.shell}>
      <aside className={s.side}>
        <div className={s.sideTop}>
          <p className={s.siteName}>paint</p>
          <p className={s.sideRole}>admin</p>
          <nav className={s.nav}>
            {[['works', 'Works'], ['profile', 'Profile & Contact']].map(([id, label]) => (
              <button
                key={id}
                className={`${s.navBtn} ${tab === id ? s.navOn : ''}`}
                onClick={() => setTab(id)}
              >{label}</button>
            ))}
          </nav>
        </div>
        <div className={s.sideBot}>
          <a href="/" target="_blank" rel="noopener noreferrer" className={s.viewSite}>↗ view site</a>
          <button className={s.logoutBtn} onClick={onLogout}>sign out</button>
        </div>
      </aside>

      <main className={s.main}>
        {tab === 'works' && (
          <WorksManager
            portfolio={portfolio}
            setPortfolio={setPortfolio}
            about={about}
            showToast={showToast}
          />
        )}
        {tab === 'profile' && (
          <ProfileEditor
            about={about}
            setAbout={setAbout}
            showToast={showToast}
          />
        )}
      </main>

      {toast && (
        <div className={`${s.toast} ${toast.type === 'err' ? s.toastErr : ''}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
