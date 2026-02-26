import { useState, useRef } from 'react';
import { CATEGORIES } from '../data.js';
import s from './WorksManager.module.css';

export default function WorksManager({ portfolio, setPortfolio, showToast }) {
  const fileRef = useRef();
  const [form, setForm] = useState({ title: '', category: CATEGORIES[0], type: 'image', src: '', tags: '' });
  const [preview, setPreview] = useState('');
  const [filterCat, setFilterCat] = useState('all');

  const handleFile = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const isVideo = file.type.startsWith('video/');
    const reader = new FileReader();
    reader.onload = (ev) => { setPreview(ev.target.result); setForm(f => ({ ...f, src: ev.target.result, type: isVideo ? 'video' : 'image' })); };
    reader.readAsDataURL(file);
  };

  const clear = () => { setForm({ title:'', category: CATEGORIES[0], type:'image', src:'', tags:'' }); setPreview(''); if(fileRef.current) fileRef.current.value=''; };

  const add = () => {
    if (!form.title.trim()) { showToast('Add a title', 'err'); return; }
    if (!form.src.trim())   { showToast('Add an image or URL', 'err'); return; }
    const item = { id: Date.now().toString(), category: form.category, type: form.type, src: form.src.trim(), title: form.title.trim(), tags: form.tags.split(',').map(t=>t.trim()).filter(Boolean) };
    setPortfolio([item, ...portfolio]);
    showToast(`"${item.title}" added`);
    clear();
  };

  const remove = (id, title) => {
    if (!confirm(`Remove "${title}"?`)) return;
    setPortfolio(portfolio.filter(i => i.id !== id));
    showToast(`"${title}" removed`);
  };

  const move = (id, dir) => {
    const idx = portfolio.findIndex(i => i.id === id);
    if (idx === -1) return;
    const next = [...portfolio]; const swap = idx + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    setPortfolio(next);
  };

  const displayed = filterCat === 'all' ? portfolio : portfolio.filter(i => i.category === filterCat);

  return (
    <div>
      <div className={s.hdr}>
        <h1 className={s.title}>Works</h1>
        <p className={s.sub}>{portfolio.length} items</p>
      </div>

      {/* ADD */}
      <div className={s.card}>
        <p className={s.cardTitle}>Add work</p>
        <div className={s.uploader} onClick={() => !preview && fileRef.current?.click()}>
          <input type="file" accept="image/*,video/*" ref={fileRef} onChange={handleFile} className={s.fileInput} />
          {preview
            ? <div className={s.previewBox}>
                {form.type==='video' ? <video src={preview} className={s.previewImg} muted /> : <img src={preview} alt="" className={s.previewImg} />}
                <button className={s.clearBtn} onClick={e=>{e.stopPropagation();clear();}}>clear</button>
              </div>
            : <><span className={s.uploaderIcon}>+</span><span className={s.uploaderText}>upload image or video</span></>
          }
        </div>
        <div className={s.orRow}><span>or paste url</span></div>
        <input className={s.input} value={form.src.startsWith('data:') ? '' : form.src}
          placeholder="https://" onChange={e => { setForm(f=>({...f,src:e.target.value})); setPreview(e.target.value); }} />
        <div className={s.row2}>
          <div className={s.fg}>
            <label className={s.label}>title</label>
            <input className={s.input} value={form.title} placeholder="e.g. Soft Ceremony"
              onChange={e => setForm(f=>({...f,title:e.target.value}))} />
          </div>
          <div className={s.fg}>
            <label className={s.label}>category</label>
            <select className={s.input} value={form.category} onChange={e => setForm(f=>({...f,category:e.target.value}))}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className={s.actions}>
          <button className={s.addBtn} onClick={add}>Add to site</button>
          <button className={s.ghostBtn} onClick={clear}>clear</button>
        </div>
      </div>

      {/* LIST */}
      <div className={s.card}>
        <div className={s.listHdr}>
          <p className={s.cardTitle}>All works</p>
          <div className={s.filters}>
            <button className={`${s.chip} ${filterCat==='all' ? s.chipOn : ''}`} onClick={() => setFilterCat('all')}>all</button>
            {CATEGORIES.map(c => (
              <button key={c} className={`${s.chip} ${filterCat===c ? s.chipOn : ''}`} onClick={() => setFilterCat(c)}>{c.toLowerCase()}</button>
            ))}
          </div>
        </div>
        <div className={s.grid}>
          {displayed.map(item => {
            const gi = portfolio.findIndex(i => i.id === item.id);
            return (
              <div key={item.id} className={s.wCard}>
                <div className={s.wThumb}>
                  <img src={item.src.startsWith('data:video') ? '' : item.src} alt={item.title}
                    onError={e => { e.target.style.background='#e0e0e0'; }} />
                </div>
                <div className={s.wInfo}>
                  <p className={s.wTitle}>{item.title}</p>
                  <p className={s.wCat}>{item.category}</p>
                </div>
                <div className={s.wAct}>
                  <button className={s.moveBtn} onClick={() => move(item.id,-1)} disabled={gi===0}>↑</button>
                  <button className={s.moveBtn} onClick={() => move(item.id,1)} disabled={gi===portfolio.length-1}>↓</button>
                  <button className={s.removeBtn} onClick={() => remove(item.id, item.title)}>remove</button>
                </div>
              </div>
            );
          })}
          {displayed.length === 0 && <p className={s.empty}>nothing here yet</p>}
        </div>
      </div>
    </div>
  );
}
