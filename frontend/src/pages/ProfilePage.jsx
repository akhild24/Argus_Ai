import { useOutletContext } from 'react-router-dom';
import { Brain, Globe, Layers, Star, Award, MapPin } from 'lucide-react';

const subjectLabel = {
  python: 'Python Programming',
  data_science: 'Data Science',
  dsa: 'Data Structures & Algorithms',
  accounting: 'Accountancy & Tally',
  govt_exam: 'Govt Exam Prep',
  finance: 'Finance & Banking',
};

export default function ProfilePage() {
  const context = useOutletContext();
  const profile = context?.profile || null;
  if (!profile) return null;

  const details = [
    { icon: Brain, label: 'Learning Style', value: `${profile.style}-first`, color: '#7c3aed' },
    { icon: Layers, label: 'Level', value: profile.level, color: '#2563eb' },
    { icon: Globe, label: 'Language', value: profile.language, color: '#0d9488' },
    { icon: MapPin, label: 'City', value: profile.city || 'Not set', color: '#f97316' },
    { icon: Star, label: 'Hidden Strength', value: profile.hiddenSkill, color: '#eab308' },
    { icon: Award, label: 'Subject', value: subjectLabel[profile.subject], color: '#10b981' },
  ];

  return (
    <div className="u-page" style={{ maxWidth: 760 }}>
      <h1 style={{ fontSize: 30, fontWeight: 800, color: '#f0f0f5', marginBottom: 28 }}>Profile</h1>

      <div className="u-card profile-hero" style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
        <div className="u-avatar" style={{ width: 72, height: 72, fontSize: 28 }}>
          {profile.name?.[0]?.toUpperCase()}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#f0f0f5', margin: '0 0 4px' }}>{profile.name}</h2>
          <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 14px', textTransform: 'capitalize' }}>
            {profile.level} / {profile.language} / {subjectLabel[profile.subject]}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="u-progress-track" style={{ flex: 1 }}>
              <div className="u-progress-fill" style={{ width: `${profile.progress}%` }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#0d9488' }}>{profile.progress}%</span>
          </div>
        </div>
      </div>

      <div className="u-topic-grid">
        {details.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="u-metric-card" style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: `${color}20`, border: `1px solid ${color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon size={16} style={{ color }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <p className="u-label" style={{ margin: '0 0 3px' }}>{label}</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#f0f0f5', textTransform: 'capitalize', margin: 0, overflowWrap: 'anywhere' }}>{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
