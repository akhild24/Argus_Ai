import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Rocket } from 'lucide-react';
import { getMe, loginUser, setToken } from '../services/auth';

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
      // Store name + email for onboarding to use later.
      localStorage.setItem('udaan_signup_meta', JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }));
      // Register after onboarding when we have the full profile.
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

      const data = await getMe();
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

//   const inputStyle = {
//     width: '100%',
//     padding: '12px 16px',
//     borderRadius: 12,
//     fontSize: 14,
//     background: 'rgba(255,255,255,0.04)',
//     border: '1px solid rgba(255,255,255,0.1)',
//     color: '#f0f0f5',
//     outline: 'none',
//     boxSizing: 'border-box',
//   };

//   const labelStyle = {
//     fontSize: 12,
//     fontWeight: 600,
//     color: '#6b7280',
//     marginBottom: 6,
//     display: 'block',
//     textTransform: 'uppercase',
//     letterSpacing: '0.05em',
//   };

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #0a0a0f 0%, #0d1117 60%, #0a0f1a 100%)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: 24,
//       position: 'relative',
//     }}>

//       <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}>

//         {/* Back button */}
//         <button
//           onClick={() => navigate('/')}
//           style={{
//             display: 'flex', alignItems: 'center', gap: 6,
//             fontSize: 13, color: '#6b7280',
//             background: 'transparent', border: 'none',
//             cursor: 'pointer', marginBottom: 32, padding: 0,
//           }}
//         >
//           <ArrowLeft size={15} /> Back
//         </button>

//         {/* Logo */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
//           <div style={{
//             width: 36, height: 36, borderRadius: 10,
//             background: 'linear-gradient(135deg, #0d9488, #0f766e)',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             boxShadow: '0 0 20px rgba(13,148,136,0.3)',
//           }}>
//             <Rocket size={16} color="white" />
//           </div>
//           <span style={{ fontWeight: 700, fontSize: 18, color: '#ffffff' }}>Udaan</span>
//         </div>

//         {/* Tab switcher */}
//         <div style={{
//           display: 'flex',
//           background: 'rgba(255,255,255,0.04)',
//           border: '1px solid rgba(255,255,255,0.08)',
//           borderRadius: 14,
//           padding: 4,
//           marginBottom: 28,
//         }}>
//           {['signup', 'login'].map(m => (
//             <button
//               key={m}
//               onClick={() => { setMode(m); setError(''); }}
//               style={{
//                 flex: 1, padding: '10px', borderRadius: 10,
//                 fontSize: 13, fontWeight: 600, cursor: 'pointer',
//                 border: 'none',
//                 background: mode === m
//                   ? 'rgba(13,148,136,0.2)'
//                   : 'transparent',
//                 color: mode === m ? '#0d9488' : '#6b7280',
//                 transition: 'all 0.2s',
//               }}
//             >
//               {m === 'signup' ? 'Create Account' : 'Log In'}
//             </button>
//           ))}
//         </div>

//         {/* Card */}
//         <div style={{
//           background: 'rgba(255,255,255,0.03)',
//           border: '1px solid rgba(255,255,255,0.08)',
//           borderRadius: 24,
//           padding: 28,
//         }}>

//           {/* Heading */}
//           <div style={{ marginBottom: 24 }}>
//             <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0f5', margin: '0 0 6px' }}>
//               {mode === 'signup' ? 'Create your account' : 'Welcome back'}
//             </h2>
//             <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>
//               {mode === 'signup'
//                 ? 'Sign up to start your personalised learning journey.'
//                 : 'Log in to continue where you left off.'}
//             </p>
//           </div>

//           {/* Fields */}
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

//             {/* Name, signup only */}
//             {mode === 'signup' && (
//               <div>
//                 <label style={labelStyle}>Full Name</label>
//                 <input
//                   style={inputStyle}
//                   placeholder="e.g. Ravi Kumar"
//                   value={form.name}
//                   onChange={e => set('name', e.target.value)}
//                   onFocus={e => e.target.style.border = '1px solid rgba(13,148,136,0.5)'}
//                   onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.1)'}
//                 />
//               </div>
//             )}

//             {/* Email */}
//             <div>
//               <label style={labelStyle}>Email Address</label>
//               <input
//                 style={inputStyle}
//                 type="email"
//                 placeholder="ravi@example.com"
//                 value={form.email}
//                 onChange={e => set('email', e.target.value)}
//                 onFocus={e => e.target.style.border = '1px solid rgba(13,148,136,0.5)'}
//                 onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.1)'}
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label style={labelStyle}>Password</label>
//               <div style={{ position: 'relative' }}>
//                 <input
//                   style={{ ...inputStyle, paddingRight: 44 }}
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder={mode === 'signup' ? 'Min. 6 characters' : 'Your password'}
//                   value={form.password}
//                   onChange={e => set('password', e.target.value)}
//                   onKeyDown={e => e.key === 'Enter' && (mode === 'login' ? handleLogin() : handleSignup())}
//                   onFocus={e => e.target.style.border = '1px solid rgba(13,148,136,0.5)'}
//                   onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.1)'}
//                 />
//                 <button
//                   onClick={() => setShowPassword(!showPassword)}
//                   style={{
//                     position: 'absolute', right: 14, top: '50%',
//                     transform: 'translateY(-50%)',
//                     background: 'transparent', border: 'none',
//                     cursor: 'pointer', color: '#6b7280', padding: 0,
//                   }}
//                 >
//                   {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                 </button>
//               </div>
//             </div>

//           </div>

//           {/* Error */}
//           {error && (
//             <div style={{
//               marginTop: 14,
//               padding: '10px 14px',
//               borderRadius: 10,
//               background: 'rgba(239,68,68,0.08)',
//               border: '1px solid rgba(239,68,68,0.2)',
//               fontSize: 13,
//               color: '#f87171',
//             }}>
//               {error}
//             </div>
//           )}

//           {/* Submit */}
//           <button
//             onClick={mode === 'signup' ? handleSignup : handleLogin}
//             disabled={loading}
//             style={{
//               marginTop: 20,
//               width: '100%',
//               padding: '13px',
//               borderRadius: 12,
//               fontSize: 14,
//               fontWeight: 600,
//               cursor: loading ? 'not-allowed' : 'pointer',
//               border: 'none',
//               color: 'white',
//               background: loading
//                 ? 'rgba(13,148,136,0.4)'
//                 : 'linear-gradient(135deg, #0d9488, #0f766e)',
//               boxShadow: loading ? 'none' : '0 0 20px rgba(13,148,136,0.3)',
//               transition: 'all 0.2s',
//             }}
//           >
//             {loading
//               ? 'Please wait...'
//               : mode === 'signup'
//                 ? 'Continue to Setup'
//                 : 'Log In'}
//           </button>

//           {/* Switch mode */}
//           <p style={{ textAlign: 'center', fontSize: 13, color: '#6b7280', marginTop: 16 }}>
//             {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
//             <button
//               onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(''); }}
//               style={{
//                 background: 'transparent', border: 'none',
//                 color: '#0d9488', fontWeight: 600,
//                 cursor: 'pointer', fontSize: 13, padding: 0,
//               }}
//             >
//               {mode === 'signup' ? 'Log In' : 'Sign Up'}
//             </button>
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 12,
    fontSize: 14,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#f9fafb',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'all 0.2s ease',
  };

  const labelStyle = {
    fontSize: 11,
    fontWeight: 600,
    color: '#0d9488',
    marginBottom: 6,
    display: 'block',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background:
        'radial-gradient(circle at 14% 24%, rgba(13,148,136,0.07), transparent 42%), radial-gradient(circle at 82% 78%, rgba(124,58,237,0.08), transparent 45%), #050508',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        position: 'absolute',
        top: -160,
        left: '12%',
        width: 420,
        height: 420,
        borderRadius: '50%',
        pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(13,148,136,0.16) 0%, transparent 68%)',
        filter: 'blur(38px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: -180,
        right: -120,
        width: 520,
        height: 520,
        borderRadius: '50%',
        pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)',
        filter: 'blur(42px)',
      }} />

      <div className="auth-shell" style={{
        width: '100%',
        maxWidth: 1080,
        borderRadius: 28,
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(18px)',
        overflow: 'hidden',
        display: 'flex',
        position: 'relative',
        zIndex: 1,
        boxShadow: '0 26px 60px rgba(0,0,0,0.45)',
      }}>
        <div className="auth-decor" style={{
          flex: 1,
          minHeight: 620,
          position: 'relative',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          background:
            'radial-gradient(circle at 30% 35%, rgba(13,148,136,0.2), transparent 40%), radial-gradient(circle at 72% 68%, rgba(124,58,237,0.22), transparent 44%), linear-gradient(160deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
        }}>
          <div style={{
            position: 'absolute',
            inset: 26,
            borderRadius: 22,
            border: '1px solid rgba(255,255,255,0.09)',
            background: 'rgba(255,255,255,0.015)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 22,
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, #0d9488, #7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 26px rgba(13,148,136,0.3)',
              }}>
                <Rocket size={16} color="white" />
              </div>
              <span style={{ color: '#ffffff', fontWeight: 700, letterSpacing: '-0.02em' }}>Udaan</span>
            </div>
            <div>
              <p style={{
                margin: '0 0 10px',
                color: '#0d9488',
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}>
                AI-Powered Learning
              </p>
              <h2 style={{
                margin: 0,
                color: '#ffffff',
                fontSize: 'clamp(30px, 4vw, 44px)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
              }}>
                Unlock your next skill
                <br />
                with Udaan
              </h2>
              <p style={{
                margin: '14px 0 0',
                color: '#9ca3af',
                fontSize: 14,
                lineHeight: 1.7,
                maxWidth: 360,
              }}>
                Learn in your language, practice with smart quizzes, and discover opportunities near you.
              </p>
            </div>
          </div>
        </div>

        <div className="auth-form-wrap" style={{ width: '100%', maxWidth: 460, position: 'relative' }}>
          <div style={{ padding: '26px 26px 28px' }}>
            {/* Back button */}
            <button
              onClick={() => navigate('/')}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 13, color: '#9ca3af',
                background: 'transparent', border: 'none',
                cursor: 'pointer', marginBottom: 26, padding: 0,
              }}
            >
              <ArrowLeft size={15} /> Back
            </button>

            {/* Tab switcher */}
            <div style={{
              display: 'flex',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 999,
              padding: 5,
              marginBottom: 24,
            }}>
              {['signup', 'login'].map(m => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(''); }}
                  style={{
                    flex: 1, padding: '10px 12px', borderRadius: 999,
                    fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    border: 'none',
                    background: mode === m
                      ? 'linear-gradient(135deg, rgba(13,148,136,0.25), rgba(124,58,237,0.22))'
                      : 'transparent',
                    color: mode === m ? '#e8fffc' : '#9ca3af',
                    boxShadow: mode === m ? '0 0 22px rgba(13,148,136,0.2)' : 'none',
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
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 24,
              padding: 24,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
            }}>

              {/* Heading */}
              <div style={{ marginBottom: 22 }}>
                <h2 style={{ fontSize: 28, letterSpacing: '-0.02em', fontWeight: 700, color: '#f9fafb', margin: '0 0 8px' }}>
                  {mode === 'signup' ? 'Create your account' : 'Welcome back'}
                </h2>
                <p style={{ fontSize: 14, color: '#9ca3af', margin: 0, lineHeight: 1.7 }}>
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
                      onFocus={(e) => {
                        e.target.style.border = '1px solid rgba(13,148,136,0.55)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(13,148,136,0.18)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '1px solid rgba(255,255,255,0.1)';
                        e.target.style.boxShadow = 'none';
                      }}
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
                    onFocus={(e) => {
                      e.target.style.border = '1px solid rgba(13,148,136,0.55)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(13,148,136,0.18)';
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '1px solid rgba(255,255,255,0.1)';
                      e.target.style.boxShadow = 'none';
                    }}
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
                      onFocus={(e) => {
                        e.target.style.border = '1px solid rgba(13,148,136,0.55)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(13,148,136,0.18)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '1px solid rgba(255,255,255,0.1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute', right: 14, top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent', border: 'none',
                        cursor: 'pointer', color: '#9ca3af', padding: 0,
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
                    ? 'rgba(13,148,136,0.35)'
                    : 'linear-gradient(135deg, #0d9488, #7c3aed)',
                  boxShadow: loading ? 'none' : '0 0 30px rgba(13,148,136,0.4)',
                  transition: 'all 0.2s',
                  transform: 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 0 38px rgba(13,148,136,0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = loading ? 'none' : '0 0 30px rgba(13,148,136,0.4)';
                }}
              >
                {loading
                  ? 'Please wait...'
                  : mode === 'signup'
                    ? 'Continue to Setup'
                    : 'Log In'}
              </button>

              {/* Switch mode */}
              <p style={{ textAlign: 'center', fontSize: 13, color: '#9ca3af', marginTop: 16 }}>
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
      </div>
      <style>
        {`
          @media (max-width: 900px) {
            .auth-shell {
              max-width: 460px !important;
            }
            .auth-decor {
              display: none !important;
            }
            .auth-form-wrap {
              max-width: none !important;
            }
          }
        `}
      </style>
    </div>
  );
}
