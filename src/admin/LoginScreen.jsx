import { useState } from 'react';
import s from './LoginScreen.module.css';

export default function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true); setErr('');
    setTimeout(() => {
      if (!onLogin(pw)) { setErr('Incorrect password.'); setPw(''); }
      setLoading(false);
    }, 500);
  };

  return (
    <div className={s.page}>
      <form className={s.form} onSubmit={submit}>
        <p className={s.logo}>paint</p>
        <p className={s.sub}>admin</p>
        <div className={s.field}>
          <input type="password" className={`${s.input} ${err ? s.err : ''}`}
            value={pw} onChange={e => { setPw(e.target.value); setErr(''); }}
            placeholder="password" autoFocus autoComplete="current-password" />
        </div>
        {err && <p className={s.errMsg}>{err}</p>}
        <button type="submit" className={s.btn} disabled={loading || !pw}>
          {loading ? '...' : 'enter'}
        </button>
      </form>
    </div>
  );
}
