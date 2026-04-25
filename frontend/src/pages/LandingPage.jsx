//  import { useNavigate } from 'react-router-dom';
// import { ArrowRight, Wifi, Globe, MapPin } from 'lucide-react';

// const features = [
//   {
//     icon: Globe,
//     title: 'Personalised AI',
//     desc: 'Explains every concept in your preferred language and pace.',
//     glow: '#0d9488',
//   },
//   {
//     icon: Wifi,
//     title: 'Learn by Doing',
//     desc: 'Practice with smart quizzes after every topic you complete.',
//     glow: '#7c3aed',
//   },
//   {
//     icon: MapPin,
//     title: 'Real Opportunities',
//     desc: 'Discover free local events and workshops near your city.',
//     glow: '#ea580c',
//   },
// ];

// export default function LandingPage() {
//   const navigate = useNavigate();

//   return (
//     <div
//       style={{
//         minHeight: '100vh',
//         position: 'relative',
//         overflow: 'hidden',
//         background:
//           'radial-gradient(circle at 15% 20%, rgba(13,148,136,0.06), transparent 42%), radial-gradient(circle at 85% 80%, rgba(124,58,237,0.07), transparent 44%), #050508',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: '28px 18px 24px',
//         fontFamily: 'Inter, sans-serif',
//       }}
//     >
//       <div
//         style={{
//           position: 'absolute',
//           top: '-140px',
//           left: '50%',
//           transform: 'translateX(-50%)',
//           width: '820px',
//           height: '460px',
//           borderRadius: '9999px',
//           pointerEvents: 'none',
//           background: 'radial-gradient(circle at center, rgba(13,148,136,0.12), transparent 72%)',
//           filter: 'blur(26px)',
//           opacity: 0.9,
//         }}
//       />
//       <div
//         style={{
//           position: 'absolute',
//           right: '-180px',
//           bottom: '-180px',
//           width: '620px',
//           height: '620px',
//           borderRadius: '9999px',
//           pointerEvents: 'none',
//           background: 'radial-gradient(circle at center, rgba(124,58,237,0.1), transparent 70%)',
//           filter: 'blur(30px)',
//         }}
//       />

//       <div
//         style={{
//           position: 'relative',
//           zIndex: 1,
//           width: '100%',
//           maxWidth: '1150px',
//           textAlign: 'center',
//           animation: 'fadeInLanding 0.45s ease',
//           paddingTop: '18px',
//         }}
//       >
//         <div
//           style={{
//             display: 'inline-flex',
//             alignItems: 'center',
//             border: '1px solid rgba(13,148,136,0.38)',
//             color: '#0d9488',
//             borderRadius: '999px',
//             background: 'rgba(13,148,136,0.12)',
//             boxShadow: '0 0 24px rgba(13,148,136,0.14)',
//             fontSize: '11px',
//             letterSpacing: '0.1em',
//             textTransform: 'uppercase',
//             fontWeight: 700,
//             padding: '8px 16px',
//             marginBottom: '26px',
//           }}
//         >
//           AI-Powered Learning
//         </div>

//         <h1
//           style={{
//             color: '#ffffff',
//             fontWeight: 800,
//             letterSpacing: '-0.03em',
//             lineHeight: 1.01,
//             margin: '0 auto',
//             maxWidth: '900px',
//             fontSize: 'clamp(44px, 8vw, 64px)',
//             textWrap: 'balance',
//           }}
//         >
//           Learn smarter,
//           <br />
//           grow faster with{' '}
//           <span
//             style={{
//               background: 'linear-gradient(135deg, #0d9488, #7c3aed)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//             }}
//           >
//             Udaan
//           </span>
//         </h1>

//         <p
//           style={{
//             margin: '20px auto 0',
//             maxWidth: '480px',
//             color: '#9ca3af',
//             fontSize: '16px',
//             lineHeight: 1.7,
//           }}
//         >
//           Build confidence with AI-led lessons, local opportunities, and practical learning paths made for your journey.
//         </p>

//         <div
//           style={{
//             marginTop: '36px',
//             display: 'flex',
//             gap: '14px',
//             justifyContent: 'center',
//             flexWrap: 'wrap',
//           }}
//         >
//           <button
//             onClick={() => navigate('/auth')}
//             style={{
//               border: 'none',
//               borderRadius: '12px',
//               padding: '12px 24px',
//               color: '#ffffff',
//               fontWeight: 600,
//               fontSize: '15px',
//               cursor: 'pointer',
//               background: 'linear-gradient(135deg, #0d9488, #7c3aed)',
//               boxShadow: '0 0 30px rgba(13,148,136,0.4)',
//               transition: 'all 0.2s ease',
//               transform: 'scale(1)',
//               display: 'inline-flex',
//               alignItems: 'center',
//               gap: '8px',
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = 'scale(1.02)';
//               e.currentTarget.style.boxShadow = '0 0 40px rgba(13,148,136,0.55)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = 'scale(1)';
//               e.currentTarget.style.boxShadow = '0 0 30px rgba(13,148,136,0.4)';
//             }}
//           >
//             Start Learning Free
//             <ArrowRight size={17} />
//           </button>

//           <button
//             style={{
//               border: '1px solid rgba(255,255,255,0.15)',
//               borderRadius: '12px',
//               padding: '12px 24px',
//               color: '#ffffff',
//               fontWeight: 600,
//               fontSize: '15px',
//               cursor: 'pointer',
//               background: 'rgba(255,255,255,0.03)',
//               backdropFilter: 'blur(8px)',
//               transition: 'all 0.2s ease',
//               transform: 'scale(1)',
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = 'scale(1.02)';
//               e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = 'scale(1)';
//               e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
//             }}
//           >
//             See How It Works
//           </button>
//         </div>

//         <div
//           style={{
//             marginTop: '20px',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             gap: '10px',
//             flexWrap: 'wrap',
//             color: '#9ca3af',
//             fontSize: '13px',
//           }}
//         >
//           <div style={{ display: 'flex' }}>
//             {['#0d9488', '#7c3aed', '#0ea5e9'].map((color, idx) => (
//               <span
//                 key={color}
//                 style={{
//                   width: '22px',
//                   height: '22px',
//                   borderRadius: '50%',
//                   marginLeft: idx === 0 ? 0 : '-7px',
//                   border: '2px solid #050508',
//                   background: color,
//                   display: 'inline-block',
//                 }}
//               />
//             ))}
//           </div>
//           Join 500+ students from tier-2 cities
//         </div>

//         <div
//           style={{
//             marginTop: '54px',
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
//             gap: '16px',
//             alignItems: 'stretch',
//           }}
//         >
//           {features.map(({ icon: Icon, title, desc, glow }) => (
//             <div
//               key={title}
//               style={{
//                 borderRadius: '16px',
//                 border: '1px solid rgba(255,255,255,0.07)',
//                 background: 'rgba(255,255,255,0.03)',
//                 padding: '20px',
//                 textAlign: 'left',
//                 transition: 'all 0.2s ease',
//                 backdropFilter: 'blur(10px)',
//                 boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
//                 e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
//                 e.currentTarget.style.transform = 'translateY(-3px)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
//                 e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
//                 e.currentTarget.style.transform = 'translateY(0)';
//               }}
//             >
//               <div
//                 style={{
//                   width: '40px',
//                   height: '40px',
//                   borderRadius: '10px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   marginBottom: '12px',
//                   background: `${glow}1f`,
//                   border: `1px solid ${glow}52`,
//                 }}
//               >
//                 <Icon size={18} style={{ color: glow }} />
//               </div>
//               <p
//                 style={{
//                   margin: '0 0 4px',
//                   color: '#ffffff',
//                   fontSize: '15px',
//                   fontWeight: 700,
//                 }}
//               >
//                 {title}
//               </p>
//               <p
//                 style={{
//                   margin: 0,
//                   color: '#9ca3af',
//                   fontSize: '13px',
//                   lineHeight: 1.7,
//                 }}
//               >
//                 {desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <style>
//         {`
//           @keyframes fadeInLanding {
//             from {
//               opacity: 0;
//               transform: translateY(10px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Wifi, Globe, MapPin, Zap, BookOpen, Trophy } from 'lucide-react';

const TYPING_WORDS = ['Hindi', 'Hinglish', 'English', 'आपकी भाषा में'];

const CHAT_SIMULATION = [
  { from: 'user', text: 'Explain If-Else to me', delay: 0 },
  { from: 'ai', text: 'Suno bhai — agar tum subah uthte ho aur bahar rain ho, toh tum umbrella lete ho. Nahi toh nahi lete. Yahi hai if-else! ☂️', delay: 900 },
  { from: 'quiz', text: 'Quick Quiz: If condition is FALSE, which block runs?', delay: 1800 },
  { from: 'pass', text: '✅ Sahi jawab! +10 Progress', delay: 2700 },
  { from: 'event', text: '📍 Free Python Workshop — Indore, This Saturday', delay: 3400 },
];

const CITIES = ['Indore', 'Sagar', 'Ujjain', 'Ratlam', 'Dewas', 'Bhopal', 'Kota', 'Ajmer', 'Surat', 'Vadodara', 'Nashik', 'Aurangabad', 'Jodhpur', 'Bikaner', 'Jabalpur', 'Gwalior'];

const STATS = [
  { value: '600M+', label: 'Underserved Students' },
  { value: '3', label: 'Languages' },
  { value: '200+', label: 'Exams Covered' },
  { value: '₹0', label: 'Forever Free' },
];

function TypeWriter() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = TYPING_WORDS[wordIdx];
    let timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1400);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % TYPING_WORDS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIdx]);

  return (
    <span style={{
      background: 'linear-gradient(135deg, #0d9488, #7c3aed)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}>
      {displayed}
      <span style={{
        WebkitTextFillColor: '#0d9488',
        animation: 'blink 1s step-end infinite',
      }}>|</span>
    </span>
  );
}

function ChatSimulation() {
  const [visible, setVisible] = useState([]);
  const [started, setStarted] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    setVisible([]);
    CHAT_SIMULATION.forEach((msg, i) => {
      setTimeout(() => setVisible(v => [...v, i]), msg.delay);
    });
  }, [started]);

  return (
    <div ref={ref} style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 20,
      padding: '20px',
      minHeight: 280,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        paddingBottom: 12,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        marginBottom: 4,
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: '#0d9488',
          boxShadow: '0 0 8px #0d9488',
          animation: 'pulse 2s infinite',
        }} />
        <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>
          Ask Udaan — If Else
        </span>
      </div>

      {CHAT_SIMULATION.map((msg, i) => {
        if (!visible.includes(i)) return null;
        if (msg.from === 'user') return (
          <div key={i} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{
              background: 'linear-gradient(135deg, #0d9488, #0f766e)',
              color: '#fff', borderRadius: '14px 14px 4px 14px',
              padding: '9px 14px', fontSize: 13, maxWidth: '75%',
              animation: 'fadeUp 0.3s ease',
            }}>{msg.text}</div>
          </div>
        );
        if (msg.from === 'ai') return (
          <div key={i} style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#e5e7eb', borderRadius: '14px 14px 14px 4px',
              padding: '9px 14px', fontSize: 13, maxWidth: '80%',
              lineHeight: 1.6, animation: 'fadeUp 0.3s ease',
            }}>{msg.text}</div>
          </div>
        );
        if (msg.from === 'quiz') return (
          <div key={i} style={{
            background: 'rgba(124,58,237,0.08)',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: 12, padding: '10px 14px',
            fontSize: 12, color: '#a78bfa',
            animation: 'fadeUp 0.3s ease',
          }}>⚡ {msg.text}</div>
        );
        if (msg.from === 'pass') return (
          <div key={i} style={{
            background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: 12, padding: '10px 14px',
            fontSize: 12, color: '#34d399',
            fontWeight: 600, animation: 'fadeUp 0.3s ease',
          }}>{msg.text}</div>
        );
        if (msg.from === 'event') return (
          <div key={i} style={{
            background: 'rgba(249,115,22,0.08)',
            border: '1px solid rgba(249,115,22,0.2)',
            borderRadius: 12, padding: '10px 14px',
            fontSize: 12, color: '#fb923c',
            animation: 'fadeUp 0.3s ease',
          }}>{msg.text}</div>
        );
        return null;
      })}
    </div>
  );
}

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target.replace(/\D/g, '')) || 0;
        if (num === 0) { setCount(target); return; }
        let start = 0;
        const step = Math.ceil(num / 40);
        const timer = setInterval(() => {
          start += step;
          if (start >= num) { setCount(target); clearInterval(timer); }
          else setCount(start + (target.includes('+') ? '+' : '') + suffix);
        }, 35);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, suffix]);

  return <span ref={ref}>{count || '0'}</span>;
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050508',
      fontFamily: 'Inter, sans-serif',
      overflowX: 'hidden',
      color: '#f0f0f5',
    }}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%,100% { opacity: 1; } 50% { opacity: 0; }
        }
        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        @keyframes scrollX {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-10px); }
        }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 30px rgba(13,148,136,0.4); }
          50%     { box-shadow: 0 0 55px rgba(13,148,136,0.7); }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px 60px',
        position: 'relative',
        textAlign: 'center',
      }}>
        {/* Glow blobs */}
        <div style={{
          position: 'absolute', top: '-100px', left: '50%',
          transform: `translateX(-50%) translateY(${scrollY * 0.15}px)`,
          width: 900, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,148,136,0.13), transparent 70%)',
          filter: 'blur(40px)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: '-200px', top: '20%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.09), transparent 70%)',
          filter: 'blur(50px)', pointerEvents: 'none',
        }} />

        {/* Eyebrow */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          border: '1px solid rgba(13,148,136,0.35)',
          color: '#0d9488', borderRadius: 999,
          background: 'rgba(13,148,136,0.1)',
          fontSize: 11, letterSpacing: '0.1em',
          textTransform: 'uppercase', fontWeight: 700,
          padding: '8px 18px', marginBottom: 28,
          animation: 'fadeInUp 0.4s ease',
        }}>
          <Zap size={11} />
          AI-Powered Learning for Bharat
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(42px, 8vw, 72px)',
          fontWeight: 800, letterSpacing: '-0.03em',
          lineHeight: 1.05, maxWidth: 900,
          margin: '0 auto 12px',
          animation: 'fadeInUp 0.5s ease 0.1s both',
        }}>
          Learn anything,
          <br />
          <TypeWriter />
        </h1>

        <p style={{
          fontSize: 17, color: '#9ca3af',
          maxWidth: 460, margin: '16px auto 0',
          lineHeight: 1.7,
          animation: 'fadeInUp 0.5s ease 0.2s both',
        }}>
          The first AI tutor that speaks your language, knows your background,
          and finds free opportunities near your city — built for every Indian student.
        </p>

        {/* CTAs */}
        <div style={{
          marginTop: 36, display: 'flex',
          gap: 14, justifyContent: 'center', flexWrap: 'wrap',
          animation: 'fadeInUp 0.5s ease 0.3s both',
        }}>
          <button
            onClick={() => navigate('/auth')}
            style={{
              border: 'none', borderRadius: 14,
              padding: '14px 28px', color: '#fff',
              fontWeight: 700, fontSize: 15, cursor: 'pointer',
              background: 'linear-gradient(135deg, #0d9488, #7c3aed)',
              animation: 'glowPulse 2.5s ease infinite',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Start Learning Free <ArrowRight size={17} />
          </button>
          <button
            style={{
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 14, padding: '14px 28px',
              color: '#fff', fontWeight: 600, fontSize: 15,
              cursor: 'pointer', background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(8px)', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            See How It Works
          </button>
        </div>

        {/* Trust row */}
        <div style={{
          marginTop: 22, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          gap: 10, color: '#6b7280', fontSize: 13,
          animation: 'fadeInUp 0.5s ease 0.4s both',
        }}>
          <div style={{ display: 'flex' }}>
            {['#0d9488', '#7c3aed', '#0ea5e9', '#f97316'].map((c, i) => (
              <span key={c} style={{
                width: 24, height: 24, borderRadius: '50%',
                marginLeft: i === 0 ? 0 : -8,
                border: '2px solid #050508',
                background: c, display: 'inline-block',
              }} />
            ))}
          </div>
          Join <strong style={{ color: '#f0f0f5' }}>500+</strong> students from tier-2 cities
        </div>

        {/* Feature cards */}
        <div style={{
          marginTop: 60,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16, width: '100%', maxWidth: 900,
          animation: 'fadeInUp 0.6s ease 0.5s both',
        }}>
          {[
            { icon: Globe, title: 'Personalised AI', desc: 'Explains in your language, at your level, in your style.', glow: '#0d9488' },
            { icon: BookOpen, title: 'Feynman Loop', desc: 'Failed a quiz? We re-explain with a completely new analogy.', glow: '#7c3aed' },
            { icon: MapPin, title: 'Real Opportunities', desc: 'Free local events near your city, generated live by AI.', glow: '#ea580c' },
          ].map(({ icon: Icon, title, desc, glow }) => (
            <div key={title}
              style={{
                borderRadius: 18, border: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.03)', padding: '22px 20px',
                textAlign: 'left', transition: 'all 0.2s',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.border = `1px solid ${glow}44`; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: `${glow}22`, border: `1px solid ${glow}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 14,
              }}>
                <Icon size={18} style={{ color: glow }} />
              </div>
              <p style={{ margin: '0 0 6px', fontWeight: 700, fontSize: 15, color: '#fff' }}>{title}</p>
              <p style={{ margin: 0, color: '#9ca3af', fontSize: 13, lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LIVE SIMULATION (THE EXTRAORDINARY SECTION) ── */}
      <section style={{
        padding: '80px 24px',
        maxWidth: 1100, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 48, alignItems: 'center',
      }}>
        <div>
          <p style={{
            fontSize: 11, fontWeight: 700, color: '#0d9488',
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14,
          }}>
            Watch Ravi Learn — Live
          </p>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800,
            letterSpacing: '-0.025em', margin: '0 0 16px', lineHeight: 1.1,
          }}>
            This is not a chatbot.
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #0d9488, #7c3aed)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              This teaches.
            </span>
          </h2>
          <p style={{ color: '#9ca3af', fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
            Ravi asks a question in Hindi. Udaan explains using a chai shop analogy.
            He fails the quiz — Udaan explains again with a <em>different</em> analogy.
            Then shows him a free workshop 3km away.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: '🗣️', text: 'Responds in Hindi, Hinglish, or English' },
              { icon: '🔄', text: 'New analogy every time you struggle' },
              { icon: '📍', text: 'Local events after every completed topic' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#d1d5db' }}>
                <span style={{ fontSize: 18 }}>{icon}</span> {text}
              </div>
            ))}
          </div>
        </div>

        {/* Animated Chat */}
        <ChatSimulation />
      </section>

      {/* ── STATS ── */}
      <section style={{
        padding: '60px 24px',
        background: 'rgba(255,255,255,0.015)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 24, textAlign: 'center',
        }}>
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p style={{
                fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 800,
                margin: '0 0 6px',
                background: 'linear-gradient(135deg, #0d9488, #7c3aed)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                <CountUp target={value} />
              </p>
              <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CITIES SCROLL ── */}
      <section style={{ padding: '48px 0', overflow: 'hidden' }}>
        <p style={{
          textAlign: 'center', fontSize: 12, color: '#4b5563',
          fontWeight: 600, textTransform: 'uppercase',
          letterSpacing: '0.1em', marginBottom: 20,
        }}>
          Built for students from
        </p>
        <div style={{ display: 'flex', overflow: 'hidden' }}>
          <div style={{
            display: 'flex', gap: 32, whiteSpace: 'nowrap',
            animation: 'scrollX 18s linear infinite',
          }}>
            {[...CITIES, ...CITIES].map((city, i) => (
              <span key={i} style={{
                fontSize: 15, fontWeight: 600, color: '#374151',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#0d9488', display: 'inline-block',
                }} />
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── RAVI STORY CARD (THE EMOTIONAL HOOK) ── */}
      <section style={{ padding: '80px 24px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{
          borderRadius: 24,
          background: 'linear-gradient(135deg, rgba(13,148,136,0.06), rgba(124,58,237,0.06))',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: 'clamp(28px, 5vw, 52px)',
          position: 'relative', overflow: 'hidden',
          textAlign: 'center',
        }}>
          <div style={{
            position: 'absolute', top: -80, right: -80,
            width: 300, height: 300, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.12), transparent)',
            pointerEvents: 'none',
          }} />
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'linear-gradient(135deg, #0d9488, #7c3aed)',
            margin: '0 auto 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, animation: 'floatY 3s ease-in-out infinite',
          }}>
            🚀
          </div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#0d9488', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
            Meet Ravi
          </p>
          <h2 style={{
            fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 800,
            letterSpacing: '-0.02em', margin: '0 0 16px', lineHeight: 1.2,
          }}>
            Nobody told Ravi this existed.
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #0d9488, #7c3aed)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Now you know.
            </span>
          </h2>
          <p style={{
            color: '#9ca3af', fontSize: 15, lineHeight: 1.8,
            maxWidth: 560, margin: '0 auto 28px',
          }}>
            Ravi is 21. BCom student in Indore. Delivers food on weekends.
            Nobody told him that managing 40 deliveries a day is logistics optimization —
            the same skill Amazon pays lakhs for. Nobody told him there's a free workshop
            3km away this Saturday. <strong style={{ color: '#f0f0f5' }}>Udaan tells him both.</strong>
          </p>
          <button
            onClick={() => navigate('/auth')}
            style={{
              border: 'none', borderRadius: 14,
              padding: '14px 32px', color: '#fff',
              fontWeight: 700, fontSize: 15, cursor: 'pointer',
              background: 'linear-gradient(135deg, #0d9488, #7c3aed)',
              boxShadow: '0 0 30px rgba(13,148,136,0.35)',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Start Ravi's Journey <ArrowRight size={17} />
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '28px 24px',
        textAlign: 'center',
        color: '#374151', fontSize: 13,
      }}>
        Built with ❤️ for UDBHAV26 · Udaan — Your pace. Your language. Your subject.
      </footer>
    </div>
  );
}