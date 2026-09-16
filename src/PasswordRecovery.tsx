import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, KeyRound, Lock, Mail, ShieldCheck } from 'lucide-react';

const meta = (name: string) => document.querySelector<HTMLMetaElement>(`meta[name="auth-${name}"]`)?.content || '';
const backend = () => (meta('backend') || import.meta.env.VITE_BACKEND_URL ||
  (['localhost', '127.0.0.1'].includes(window.location.hostname) ? 'http://127.0.0.1:9000' : 'https://crm.cybals.com')).replace(/\/$/, '');

export function PasswordRecovery({ reset }: { reset: boolean }) {
  const [email, setEmail] = useState(() => meta('email') || new URLSearchParams(window.location.search).get('email') || '');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [complete, setComplete] = useState(false);
  const requiresNavigation = import.meta.env.PROD && window.location.origin !== new URL(backend()).origin;

  useEffect(() => {
    if (requiresNavigation) window.location.replace(`${backend()}/forgot-password`);
  }, [requiresNavigation]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (busy || (reset && complete)) return;
    const validation: Record<string, string> = {};
    if (!email.trim()) validation.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) validation.email = 'Please enter a valid email address.';
    if (reset && !password) validation.password = 'Please enter a new password.';
    if (reset && password !== confirmation) validation.password_confirmation = 'Passwords do not match.';
    setErrors(validation);
    setStatus('');
    if (Object.keys(validation).length) return;
    setBusy(true);
    try {
      const csrf = await fetch(`${backend()}/auth/csrf-token`, { credentials: 'include', cache: 'no-store', headers: { Accept: 'application/json' } });
      if (!csrf.ok) throw new Error('Unable to start your request. Please try again.');
      const { token: csrfToken } = await csrf.json();
      const response = await fetch(`${backend()}/${reset ? 'reset-password' : 'forgot-password'}`, {
        method: 'POST', credentials: 'include', redirect: 'error',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
        body: JSON.stringify({ email: email.trim(), ...(reset ? {
          token: meta('token'), password, password_confirmation: confirmation,
        } : {}) }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.status === 422 && data.errors) {
        setErrors(Object.fromEntries(Object.entries(data.errors).map(([key, value]) => [key, Array.isArray(value) ? String(value[0]) : String(value)])));
        return;
      }
      if (!response.ok) throw new Error(response.status === 429 ? 'Too many attempts. Please wait before trying again.' : response.status === 419 ? 'Your session expired. Refresh this page and try again.' : 'Unable to complete your request. Please try again later.');
      setComplete(true);
      setPassword('');
      setConfirmation('');
      setStatus(reset ? 'Your password has been reset. You can now sign in with your new password.' : 'Password reset link sent. Check your inbox and spam folder.');
    } catch (error) {
      setErrors({ form: error instanceof Error ? error.message : 'Unable to connect. Please try again.' });
    } finally { setBusy(false); }
  }

  if (requiresNavigation) return <main className="saas-auth-root"><p role="status">Opening account recovery…</p></main>;

  return <main className="saas-auth-root">
    <div className="saas-auth-layout">
      <section className="saas-auth-form-panel">
        <div className="saas-auth-top-nav">
          <a className="saas-auth-brand" href={meta('frontend') || '/'}>
            <img src={`${import.meta.env.BASE_URL}images/bizsync-logo-white.png`} alt="BizSync" className="saas-brand-logo-img" />
            <span className="saas-brand-badge">Enterprise</span>
          </a>
          <a className="saas-auth-back-link" href={`${backend()}/login`}><ArrowLeft size={14} /> Back to sign in</a>
        </div>
        <div className="saas-auth-form-content">
          <div className="saas-auth-header">
            <h1 className="saas-auth-title">{reset ? 'Set a new password' : 'Forgot your password?'}</h1>
            <p className="saas-auth-subtitle">{reset ? 'Choose a strong password for your workspace.' : 'Enter your work email and we’ll send you a link to reset your password.'}</p>
          </div>
          <form className="saas-form" noValidate onSubmit={submit}>
            <div className="saas-field">
              <label className="saas-label" htmlFor="recovery-email">Work Email</label>
              <div className="saas-input-shell"><Mail size={16} className="saas-input-icon" />
                <input id="recovery-email" className="saas-input" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'recovery-email-error' : undefined} required />
              </div>
              {errors.email && <p id="recovery-email-error" className="saas-auth-error" role="alert">{errors.email}</p>}
            </div>
            {reset && <>
              <div className="saas-field">
                <label className="saas-label" htmlFor="new-password">New password</label>
                <div className="saas-input-shell"><Lock size={16} className="saas-input-icon" />
                  <input id="new-password" className="saas-input" type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} aria-invalid={Boolean(errors.password)} required />
                </div>
                <p className="saas-auth-subtitle">Use at least 12 characters with uppercase and lowercase letters, a number and a symbol.</p>
                {errors.password && <p className="saas-auth-error" role="alert">{errors.password}</p>}
              </div>
              <div className="saas-field">
                <label className="saas-label" htmlFor="confirm-password">Confirm new password</label>
                <div className="saas-input-shell"><Lock size={16} className="saas-input-icon" />
                  <input id="confirm-password" className="saas-input" type="password" autoComplete="new-password" value={confirmation} onChange={e => setConfirmation(e.target.value)} aria-invalid={Boolean(errors.password_confirmation)} required />
                </div>
                {errors.password_confirmation && <p className="saas-auth-error" role="alert">{errors.password_confirmation}</p>}
              </div>
            </>}
            {errors.form && <p className="saas-auth-error" role="alert">{errors.form}</p>}
            {status && <p className="saas-auth-status" role="status">{status}</p>}
            {!(reset && complete) && <button className="saas-submit-btn" type="submit" disabled={busy}>
              {busy ? 'Please wait…' : reset ? 'Reset password' : 'Send reset link'}<ArrowRight size={16} />
            </button>}
            {reset && errors.email && <a className="saas-switch-action" href={`${backend()}/forgot-password`}>Request a new reset link</a>}
          </form>
          <div className="saas-form-footer"><a className="saas-switch-action" href={`${backend()}/login`}>Back to sign in</a></div>
        </div>
        <div className="saas-security-footer"><span><ShieldCheck size={14} /> Secure account recovery</span></div>
      </section>
      <aside className="saas-auth-showcase-panel">
        <div className="saas-showcase-backdrop" />
        <div className="saas-showcase-content">
          <div className="saas-showcase-badge"><KeyRound size={14} /> WORKSPACE ACCESS</div>
          <h2 className="saas-showcase-title">Get back to <em>your workspace.</em></h2>
          <p className="saas-auth-subtitle">Your CRM, inventory, orders and team stay right where you left them.</p>
          <div className="saas-trial-perks-banner">
            <div className="saas-trial-perk-item"><Mail size={18} /><span>Reset link delivered to your account email</span></div>
            <div className="saas-trial-perk-item"><ShieldCheck size={18} /><span>Time-limited link that can be used once</span></div>
            <div className="saas-trial-perk-item"><CheckCircle2 size={18} /><span>Sign in with your new password after resetting</span></div>
          </div>
        </div>
      </aside>
    </div>
  </main>;
}
