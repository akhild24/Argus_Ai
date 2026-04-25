import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Rocket } from 'lucide-react';
import { registerUser, loginUser, setToken } from '../services/auth';

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('signup'); // 'signup' | 'login'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const set = (key, val) => {
    setError('');
    setForm(prev => ({ ...prev, [key]: val }));
  };

  const handleSignup = async () => {
    if (!form.name.trim()) return setError('Please enter your name.');
    if (!form.email.includes('@')) return setError('Enter a valid email.');
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');

    setLoading(true);
    try {
      // Store name + email for onboarding to use later
      localStorage.setItem('udaan_signup_meta', JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }));
      // Don't register yet — register after onboarding when we have full profile
      navigate('/onboarding');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!form.email.includes('@')) return setError('Enter a valid email.');
    if (!form.password) return setError('Enter your password.');

    setLoading(true);
    setError('');
    try {
      const { access_token } = await loginUser(form.email, form.password);
      setToken(access_token);

      // Fetch profile from backend and store in localStorage
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/auth/me`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const data = await res.json();
      const profile = {
        ...data.profile,
        name: data.name,
        email: data.email,
        progress: data.progress,
      };
      localStorage.setItem('udaan_profile', JSON.stringify(profile));
      navigate('/app');
    } catch (err) {
      setError(err.message || 'Login failed. Check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 12,
    fontSize: 14,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#f0f0f5',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    fontSize: 12,
    fontWeight: 600,
    color: '#6b7280',
    marginBottom: 6,
    display: 'block',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #0d1117 60%, #0a0f1a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      position: 'relative',
    }}>

      {/* Background glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 300, borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(13,148,136,0.12) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />

      <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}>

        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 13, color: '#6b7280',
            background: 'transparent', border: 'none',
            cursor: 'pointer', marginBottom: 32, padding: 0,
          }}
        >
          <ArrowLeft size={15} /> Back
        </button>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #0d9488, #0f766e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(13,148,136,0.3)',
          }}>
            <Rocket size={16} color="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 18, color: '#ffffff' }}>Udaan</span>
        </div>

        {/* Tab switcher */}
        <div style={{
          display: 'flex',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14,
          padding: 4,
          marginBottom: 28,
        }}>
          {['signup', 'login'].map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); }}
              style={{
                flex: 1, padding: '10px', borderRadius: 10,
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                border: 'none',
                background: mode === m
                  ? 'rgba(13,148,136,0.2)'
                  : 'transparent',
                color: mode === m ? '#0d9488' : '#6b7280',
                transition: 'all 0.2s',
              }}
            >
              {m === 'signup' ? 'Create Account' : 'Log In'}
            </button>
          ))}
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24,
          padding: 28,
        }}>

          {/* Heading */}
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0f5', margin: '0 0 6px' }}>
              {mode === 'signup' ? 'Create your account' : 'Welcome back'}
            </h2>
            <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>
              {mode === 'signup'
                ? 'Sign up to start your personalised learning journey.'
                : 'Log in to continue where you left off.'}
            </p>
          </div>

          {/* Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Name — signup only */}
            {mode === 'signup' && (
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  style={inputStyle}
                  placeholder="e.g. Ravi Kumar"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  onFocus={e => e.target.style.border = '1px solid rgba(13,148,136,0.5)'}
                  onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.1)'}
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label style={labelStyle}>Email Address</label>
              <input
                style={inputStyle}
                type="email"
                placeholder="ravi@example.com"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                onFocus={e => e.target.style.border = '1px solid rgba(13,148,136,0.5)'}
                onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.1)'}
              />
            </div>

            {/* Password */}
            <div>
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  style={{ ...inputStyle, paddingRight: 44 }}
                  type={showPassword ? 'text' : 'password'}
                  placeholder={mode === 'signup' ? 'Min. 6 characters' : 'Your password'}
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (mode === 'login' ? handleLogin() : handleSignup())}
                  onFocus={e => e.target.style.border = '1px solid rgba(13,148,136,0.5)'}
                  onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.1)'}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: 14, top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent', border: 'none',
                    cursor: 'pointer', color: '#6b7280', padding: 0,
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

          </div>

          {/* Error */}
          {error && (
            <div style={{
              marginTop: 14,
              padding: '10px 14px',
              borderRadius: 10,
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              fontSize: 13,
              color: '#f87171',
            }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={mode === 'signup' ? handleSignup : handleLogin}
            disabled={loading}
            style={{
              marginTop: 20,
              width: '100%',
              padding: '13px',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              border: 'none',
              color: 'white',
              background: loading
                ? 'rgba(13,148,136,0.4)'
                : 'linear-gradient(135deg, #0d9488, #0f766e)',
              boxShadow: loading ? 'none' : '0 0 20px rgba(13,148,136,0.3)',
              transition: 'all 0.2s',
            }}
          >
            {loading
              ? 'Please wait...'
              : mode === 'signup'
                ? 'Continue to Setup'
                : 'Log In'}
          </button>

          {/* Switch mode */}
          <p style={{ textAlign: 'center', fontSize: 13, color: '#6b7280', marginTop: 16 }}>
            {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(''); }}
              style={{
                background: 'transparent', border: 'none',
                color: '#0d9488', fontWeight: 600,
                cursor: 'pointer', fontSize: 13, padding: 0,
              }}
            >
              {mode === 'signup' ? 'Log In' : 'Sign Up'}
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}