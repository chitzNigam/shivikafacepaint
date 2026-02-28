import { useState, useEffect } from 'react';
import s from './ProfileEditor.module.css';

const EMPTY_PROFILE = {
  name: '', title: '', location: '', bio: '',
  categories: [],
  credits: [],
  contact: { email: '', instagram: '', phone: '' },
};

export default function ProfileEditor({ about, setAbout, showToast }) {
  const [f, setF] = useState(EMPTY_PROFILE);
  const [newCat,    setNewCat]    = useState('');
  const [newCredit, setNewCredit] = useState('');

  // Populate form once about loads from DB
  useEffect(() => {
    if (about) {
      setF({
        ...about,
        contact:    { email: '', instagram: '', phone: '', ...about.contact },
        categories: [...(about.categories || [])],
        credits:    [...(about.credits    || [])],
      });
    }
  }, [about]);

  const set  = (k, v) => setF(p => ({ ...p, [k]: v }));
  const setC = (k, v) => setF(p => ({ ...p, contact: { ...p.contact, [k]: v } }));

  const save = () => {
    if (!f.name.trim())            { showToast('Name required', 'err'); return; }
    if (f.categories.length === 0) { showToast('Add at least one category', 'err'); return; }
    setAbout(f);
    showToast('Profile saved');
  };

  const addCat = () => {
    const val = newCat.trim();
    if (!val) return;
    if (f.categories.includes(val)) { showToast('Category already exists', 'err'); return; }
    set('categories', [...f.categories, val]);
    setNewCat('');
  };

  const removeCat    = (cat) => set('categories', f.categories.filter(x => x !== cat));
  const addCredit    = () => {
    const val = newCredit.trim();
    if (!val) return;
    set('credits', [...f.credits, val]);
    setNewCredit('');
  };

  return (
    <div>
      <div className={s.hdr}>
        <h1 className={s.title}>Profile & Contact</h1>
      </div>

      <div className={s.card}>
        <p className={s.cardTitle}>basic info</p>
        {[['name','Your Name','name'],['title','Makeup & Hair Artist','title'],['location','London & Essex · International','location']].map(([k, ph, lbl]) => (
          <div key={k} className={s.fg}>
            <label className={s.label}>{lbl}</label>
            <input className={s.input} value={f[k]} placeholder={ph} onChange={e => set(k, e.target.value)} />
          </div>
        ))}
        <div className={s.fg}>
          <label className={s.label}>bio</label>
          <textarea className={s.textarea} value={f.bio} onChange={e => set('bio', e.target.value)} />
        </div>
      </div>

      <div className={s.card}>
        <p className={s.cardTitle}>contact</p>
        {[['email','email'],['phone','phone'],['instagram','instagram']].map(([k, lbl]) => (
          <div key={k} className={s.fg}>
            <label className={s.label}>{lbl}</label>
            <input className={s.input} value={f.contact[k]} onChange={e => setC(k, e.target.value)} />
          </div>
        ))}
      </div>

      <div className={s.card}>
        <p className={s.cardTitle}>categories</p>
        <p className={s.hint}>These appear as nav items on the public site and as options when adding works.</p>
        <div className={s.chips}>
          {f.categories.map(cat => (
            <div key={cat} className={s.chip}>
              {cat}
              <button className={s.x} onClick={() => removeCat(cat)}>×</button>
            </div>
          ))}
        </div>
        <div className={s.addRow}>
          <input className={s.input} value={newCat} placeholder="e.g. BTS, Skincare..."
            onChange={e => setNewCat(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCat()} />
          <button className={s.addBtn} onClick={addCat}>add</button>
        </div>
      </div>

      <div className={s.card}>
        <p className={s.cardTitle}>press & credits</p>
        <div className={s.chips}>
          {f.credits.map(c => (
            <div key={c} className={s.chip}>
              {c}
              <button className={s.x} onClick={() => set('credits', f.credits.filter(x => x !== c))}>×</button>
            </div>
          ))}
        </div>
        <div className={s.addRow}>
          <input className={s.input} value={newCredit} placeholder="e.g. Vogue UK, BBC, LFW"
            onChange={e => setNewCredit(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCredit()} />
          <button className={s.addBtn} onClick={addCredit}>add</button>
        </div>
      </div>

      <button className={s.saveBtn} onClick={save}>save changes</button>
    </div>
  );
}
