import { useNavigate } from 'react-router-dom';
import { ArrowRight, Wifi, Globe, MapPin } from 'lucide-react';
import hero from '../assets/hero.png';

const features = [
  {
    icon: Globe,
    title: 'Language-Aware Tutor',
    desc: 'Responds in Hindi, Hinglish, or English - whichever you think in.',
    glow: '#0d9488',
  },
  {
    icon: Wifi,
    title: 'Resilient Learning',
    desc: 'Smart fallbacks keep the demo useful even if the network shakes.',
    glow: '#7c3aed',
  },
  {
    icon: MapPin,
    title: 'Hyperlocal Opportunities',
    desc: 'Free workshops and events near the learner, linked to their subject.',
    glow: '#ea580c',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-shell">
      <img className="landing-bg" src={hero} alt="" />
      <div className="landing-overlay" />

      <div className="landing-content">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/30 text-xs text-gray-300 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          UDBHAV '26 / Hackathon Project
        </div>

        <h1 className="landing-title">Udaan</h1>
        <p className="text-xl text-gray-200 mb-2 font-semibold">
          Your pace. Your language. Your subject.
        </p>
        <p className="text-sm text-gray-400 mb-10">
          Built for the students nobody built for.
        </p>

        <button className="u-primary-btn landing-cta" onClick={() => navigate('/auth')}>
          Start Learning <ArrowRight size={18} />
        </button>

        <div className="landing-features">
          {features.map(({ icon: Icon, title, desc, glow }) => (
            <div key={title} className="landing-feature">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${glow}20`, border: `1px solid ${glow}40` }}
              >
                <Icon size={18} style={{ color: glow }} />
              </div>
              <p className="font-semibold text-white text-sm mb-1">{title}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
