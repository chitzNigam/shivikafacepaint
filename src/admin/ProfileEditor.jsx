import { useState } from 'react';
import s from './ProfileEditor.module.css';

export default function ProfileEditor({ about, setAbout, showToast }) {
  const [f, setF] = useState({ ...about, contact: { ...about.contact } });
  const [newSkill, setNewSkill] = useState('');
  const [newCredit, setNewCredit] = useState('');
  const set = (k,v) => setF(p => ({...p,[k]:v}));
  const setC = (k,v) => setF(p => ({...p,contact:{...p.contact,[k]:v}}));
  const save = () => { if(!f.name.trim()){ showToast('Name required','err'); return; } setAbout(f); showToast('Profile saved'); };
  return (
    <div>
      <div className={s.hdr}><h1 className={s.title}>Profile & Contact</h1></div>
      <div className={s.card}>
        <p className={s.cardTitle}>basic info</p>
        {[['name','Your Name','name'],['title','Makeup & Hair Artist','title'],['location','London & Essex','location']].map(([k,ph,lbl]) => (
          <div key={k} className={s.fg}>
            <label className={s.label}>{lbl}</label>
            <input className={s.input} value={f[k]} placeholder={ph} onChange={e=>set(k,e.target.value)} />
          </div>
        ))}
        <div className={s.fg}>
          <label className={s.label}>bio</label>
          <textarea className={s.textarea} value={f.bio} onChange={e=>set('bio',e.target.value)} />
        </div>
      </div>
      <div className={s.card}>
        <p className={s.cardTitle}>contact</p>
        {[['email','email'],['phone','phone'],['instagram','instagram']].map(([k,lbl]) => (
          <div key={k} className={s.fg}>
            <label className={s.label}>{lbl}</label>
            <input className={s.input} value={f.contact[k]} onChange={e=>setC(k,e.target.value)} />
          </div>
        ))}
      </div>
      <div className={s.card}>
        <p className={s.cardTitle}>specialisms</p>
        <div className={s.chips}>{f.skills.map(sk=><div key={sk} className={s.chip}>{sk}<button className={s.x} onClick={()=>set('skills',f.skills.filter(x=>x!==sk))}>×</button></div>)}</div>
        <div className={s.addRow}><input className={s.input} value={newSkill} placeholder="add specialism" onChange={e=>setNewSkill(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&newSkill.trim()){set('skills',[...f.skills,newSkill.trim()]);setNewSkill('');}}} /><button className={s.addBtn} onClick={()=>{if(newSkill.trim()){set('skills',[...f.skills,newSkill.trim()]);setNewSkill('');}}}>add</button></div>
      </div>
      <div className={s.card}>
        <p className={s.cardTitle}>press & credits</p>
        <div className={s.chips}>{f.credits.map(c=><div key={c} className={s.chip}>{c}<button className={s.x} onClick={()=>set('credits',f.credits.filter(x=>x!==c))}>×</button></div>)}</div>
        <div className={s.addRow}><input className={s.input} value={newCredit} placeholder="e.g. Vogue UK" onChange={e=>setNewCredit(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&newCredit.trim()){set('credits',[...f.credits,newCredit.trim()]);setNewCredit('');}}} /><button className={s.addBtn} onClick={()=>{if(newCredit.trim()){set('credits',[...f.credits,newCredit.trim()]);setNewCredit('');}}}>add</button></div>
      </div>
      <button className={s.saveBtn} onClick={save}>save changes</button>
    </div>
  );
}
