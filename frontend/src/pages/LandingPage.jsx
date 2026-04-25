 import { useNavigate } from 'react-router-dom';
import { ArrowRight, Wifi, Globe, MapPin } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: 'Personalised AI',
    desc: 'Explains every concept in your preferred language and pace.',
    glow: '#0d9488',
  },
  {
    icon: Wifi,
    title: 'Learn by Doing',
    desc: 'Practice with smart quizzes after every topic you complete.',
    glow: '#7c3aed',
  },
  {
    icon: MapPin,
    title: 'Real Opportunities',
    desc: 'Discover free local events and workshops near your city.',
    glow: '#ea580c',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background:
          'radial-gradient(circle at 15% 20%, rgba(13,148,136,0.06), transparent 42%), radial-gradient(circle at 85% 80%, rgba(124,58,237,0.07), transparent 44%), #050508',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '28px 18px 24px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-140px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '820px',
          height: '460px',
          borderRadius: '9999px',
          pointerEvents: 'none',
          background: 'radial-gradient(circle at center, rgba(13,148,136,0.12), transparent 72%)',
          filter: 'blur(26px)',
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '-180px',
          bottom: '-180px',
          width: '620px',
          height: '620px',
          borderRadius: '9999px',
          pointerEvents: 'none',
          background: 'radial-gradient(circle at center, rgba(124,58,237,0.1), transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1150px',
          textAlign: 'center',
          animation: 'fadeInLanding 0.45s ease',
          paddingTop: '18px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            border: '1px solid rgba(13,148,136,0.38)',
            color: '#0d9488',
            borderRadius: '999px',
            background: 'rgba(13,148,136,0.12)',
            boxShadow: '0 0 24px rgba(13,148,136,0.14)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 700,
            padding: '8px 16px',
            marginBottom: '26px',
          }}
        >
          AI-Powered Learning
        </div>

        <h1
          style={{
            color: '#ffffff',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.01,
            margin: '0 auto',
            maxWidth: '900px',
            fontSize: 'clamp(44px, 8vw, 64px)',
            textWrap: 'balance',
          }}
        >
          Learn smarter,
          <br />
          grow faster with{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #0d9488, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Udaan
          </span>
        </h1>

        <p
          style={{
            margin: '20px auto 0',
            maxWidth: '480px',
            color: '#9ca3af',
            fontSize: '16px',
            lineHeight: 1.7,
          }}
        >
          Build confidence with AI-led lessons, local opportunities, and practical learning paths made for your journey.
        </p>

        <div
          style={{
            marginTop: '36px',
            display: 'flex',
            gap: '14px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => navigate('/auth')}
            style={{
              border: 'none',
              borderRadius: '12px',
              padding: '12px 24px',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '15px',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #0d9488, #7c3aed)',
              boxShadow: '0 0 30px rgba(13,148,136,0.4)',
              transition: 'all 0.2s ease',
              transform: 'scale(1)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(13,148,136,0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(13,148,136,0.4)';
            }}
          >
            Start Learning Free
            <ArrowRight size={17} />
          </button>

          <button
            style={{
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '12px',
              padding: '12px 24px',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '15px',
              cursor: 'pointer',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
              transform: 'scale(1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            }}
          >
            See How It Works
          </button>
        </div>

        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            color: '#9ca3af',
            fontSize: '13px',
          }}
        >
          <div style={{ display: 'flex' }}>
            {['#0d9488', '#7c3aed', '#0ea5e9'].map((color, idx) => (
              <span
                key={color}
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  marginLeft: idx === 0 ? 0 : '-7px',
                  border: '2px solid #050508',
                  background: color,
                  display: 'inline-block',
                }}
              />
            ))}
          </div>
          Join 500+ students from tier-2 cities
        </div>

        <div
          style={{
            marginTop: '54px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            alignItems: 'stretch',
          }}
        >
          {features.map(({ icon: Icon, title, desc, glow }) => (
            <div
              key={title}
              style={{
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.03)',
                padding: '20px',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(10px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px',
                  background: `${glow}1f`,
                  border: `1px solid ${glow}52`,
                }}
              >
                <Icon size={18} style={{ color: glow }} />
              </div>
              <p
                style={{
                  margin: '0 0 4px',
                  color: '#ffffff',
                  fontSize: '15px',
                  fontWeight: 700,
                }}
              >
                {title}
              </p>
              <p
                style={{
                  margin: 0,
                  color: '#9ca3af',
                  fontSize: '13px',
                  lineHeight: 1.7,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>
        {`
          @keyframes fadeInLanding {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}