import { useNavigate } from 'react-router-dom';
import { ArrowRight, Wifi, Globe, MapPin } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: 'Language-Aware Tutor',
    desc: 'Responds in Hindi, Hinglish, or English — whichever you think in.',
    glow: '#0d9488',
  },
  {
    icon: Wifi,
    title: 'Offline-First',
    desc: 'Last 5 lessons cached locally. Teaches even on 2G.',
    glow: '#7c3aed',
  },
  {
    icon: MapPin,
    title: 'Hyperlocal Opportunities',
    desc: 'Free workshops and events within 100km of your city.',
    glow: '#ea580c',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #0d1117 60%, #0a0f1a 100%)' }}
    >
      {/* Background glow blobs */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(13,148,136,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl w-full">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          UDBHAV '26 · Hackathon Project
        </div>

        {/* Headline */}
        <h1
          className="text-6xl font-bold mb-4 tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #a0a0b0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Udaan
        </h1>

        <p className="text-xl text-gray-400 mb-2 font-medium">
          Your pace. Your language. Your subject.
        </p>
        <p className="text-sm text-gray-600 mb-10">
          Built for the 2 crore students nobody built for.
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate('/auth')}
          className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white text-base"
          style={{
            background: 'linear-gradient(135deg, #0d9488, #0f766e)',
            boxShadow: '0 0 30px rgba(13,148,136,0.4)',
          }}
        >
          Start Learning
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14">
          {features.map(({ icon: Icon, title, desc, glow }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/8 p-5 text-left"
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{
                  background: `${glow}20`,
                  border: `1px solid ${glow}40`,
                }}
              >
                <Icon size={18} style={{ color: glow }} />
              </div>
              <p className="font-semibold text-white text-sm mb-1">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}