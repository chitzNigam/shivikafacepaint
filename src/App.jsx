import { useState, useEffect } from 'react';
import { DEFAULT_PORTFOLIO, DEFAULT_ABOUT } from './data.js';
import { useStorage } from './useStorage.js';
import './App.css';

export default function App() {
  const [portfolio] = useStorage('portfolio_items', DEFAULT_PORTFOLIO);
  const [about]     = useStorage('about_data', DEFAULT_ABOUT);

  // Derive live categories from about — fallback to DEFAULT_ABOUT.categories
  const categories = (about.categories && about.categories.length > 0)
    ? about.categories
    : DEFAULT_ABOUT.categories;

  const [active, setActive]   = useState(categories[0]);
  const [lightbox, setLightbox] = useState(null);
  const [entering, setEntering] = useState(false);

  // If categories change and active is no longer valid, reset to first
  useEffect(() => {
    if (!categories.includes(active)) {
      setActive(categories[0]);
    }
  }, [categories]);

  const items = portfolio.filter(i => i.category === active);

  const switchCat = (cat) => {
    if (cat === active) return;
    setEntering(true);
    setTimeout(() => { setActive(cat); setEntering(false); }, 180);
  };

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  return (
    <div className="site">

      {/* ── NAV ─────────────────────────────────────── */}
      <header className="nav">
        <a className="nav-logo" href="/" onClick={e => { e.preventDefault(); switchCat(categories[0]); }}>
          paint
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
        <a className="nav-contact" href={`mailto:${about.contact.email}`}>
          contact
        </a>
      </header>

      {/* ── GRID ─────────────────────────────────────── */}
      <main className={`grid-wrap${entering ? ' grid-wrap--out' : ''}`}>
        <div className="cat-label">{active.toLowerCase()}</div>
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
          {items.length === 0 && (
            <p className="empty">No works in this category yet.</p>
          )}
        </div>
      </main>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer className="footer">
        <span className="footer-name">{about.name} — {about.title}</span>
        <span className="footer-contact">{about.contact.instagram} &nbsp;·&nbsp; {about.contact.phone}</span>
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
