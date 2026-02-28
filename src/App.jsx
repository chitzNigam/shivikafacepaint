import { useState, useEffect } from 'react';
import { useStorage } from './useStorage.js';
import './App.css';

export default function App() {
  const [portfolio, , portfolioLoading] = useStorage('portfolio_items');
  const [about,     , aboutLoading]     = useStorage('about_data');

  const loading = portfolioLoading || aboutLoading;

  const categories = about?.categories?.length > 0 ? about.categories : [];
  const [active, setActive]     = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [entering, setEntering] = useState(false);

  // Set active category once categories load
  useEffect(() => {
    if (categories.length > 0 && !active) setActive(categories[0]);
    if (active && !categories.includes(active)) setActive(categories[0] ?? null);
  }, [categories]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  const switchCat = (cat) => {
    if (cat === active) return;
    setEntering(true);
    setTimeout(() => { setActive(cat); setEntering(false); }, 180);
  };

  const items = (portfolio || []).filter(i => i.category === active);

  // Show nothing until DB data is ready
  if (loading) return (
    <div className="site">
      <div className="loading-screen">
        <span className="loading-dot" />
      </div>
    </div>
  );

  return (
    <div className="site">

      {/* ── NAV ─────────────────────────────────────── */}
      <header className="nav">
        <a className="nav-logo" href="/" onClick={e => { e.preventDefault(); if (categories[0]) switchCat(categories[0]); }}>
          {about?.name ? about.name.split(' ')[0].toLowerCase() : 'paint'}
        </a>
        <nav className="nav-cats">
          {categories.map(cat => (
            <button
              key={cat}
              className={`nav-cat${active === cat ? ' nav-cat--on' : ''}`}
              onClick={() => switchCat(cat)}
            >
              {cat.toLowerCase()}
            </button>
          ))}
        </nav>
        {about?.contact?.email && (
          <a className="nav-contact" href={`mailto:${about.contact.email}`}>contact</a>
        )}
      </header>

      {/* ── GRID ─────────────────────────────────────── */}
      <main className={`grid-wrap${entering ? ' grid-wrap--out' : ''}`}>
        {active && <div className="cat-label">{active.toLowerCase()}</div>}
        <div className="grid" data-count={items.length}>
          {items.map((item, i) => (
            <figure
              key={item.id}
              className="cell"
              style={{ animationDelay: `${i * 40}ms` }}
              onClick={() => setLightbox(item)}
            >
              <div className="cell-inner">
                {item.type === 'video'
                  ? <video src={item.src} muted loop playsInline />
                  : <img src={item.src} alt={item.title} loading="lazy" />
                }
              </div>
              <figcaption className="cell-caption">{item.title}</figcaption>
            </figure>
          ))}
          {items.length === 0 && active && (
            <p className="empty">No works in this category yet.</p>
          )}
        </div>
      </main>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer className="footer">
        {about?.name && <span className="footer-name">{about.name}{about.title ? ` — ${about.title}` : ''}</span>}
        {about?.contact && (
          <span className="footer-contact">
            {about.contact.instagram && <>{about.contact.instagram}</>}
            {about.contact.instagram && about.contact.phone && <> &nbsp;·&nbsp; </>}
            {about.contact.phone && <>{about.contact.phone}</>}
          </span>
        )}
      </footer>

      {/* ── LIGHTBOX ─────────────────────────────────── */}
      {lightbox && (
        <div className="lb" onClick={() => setLightbox(null)}>
          <button className="lb-close" onClick={() => setLightbox(null)}>×</button>
          <div className="lb-frame" onClick={e => e.stopPropagation()}>
            {lightbox.type === 'video'
              ? <video src={lightbox.src} className="lb-media" controls autoPlay />
              : <img src={lightbox.src} alt={lightbox.title} className="lb-media" />
            }
            <p className="lb-title">{lightbox.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}
