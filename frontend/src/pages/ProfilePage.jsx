import { useOutletContext } from 'react-router-dom';
import { Brain, Globe, Layers, Star, Award, MapPin } from 'lucide-react';

const subjectLabel = {
  python: 'Python Programming',
  data_science: 'Data Science',
  govt_exam: 'Govt Exam Prep',
};

export default function ProfilePage() {
    const context = useOutletContext();
    const profile = context?.profile || null;
    if (!profile) return null;

  const details = [
    { icon: Brain, label: 'Learning Style', value: `${profile.style}-first`, color: '#7c3aed', bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.15)' },
    { icon: Layers, label: 'Level', value: profile.level, color: '#2563eb', bg: 'rgba(37,99,235,0.08)', border: 'rgba(37,99,235,0.15)' },
    { icon: Globe, label: 'Language', value: profile.language, color: '#0d9488', bg: 'rgba(13,148,136,0.08)', border: 'rgba(13,148,136,0.15)' },
    { icon: MapPin, label: 'City', value: profile.city || 'Not set', color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.15)' },
    { icon: Star, label: 'Hidden Strength', value: profile.hiddenSkill, color: '#eab308', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.15)' },
    { icon: Award, label: 'Subject', value: subjectLabel[profile.subject], color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.15)' },
  ];

  return (
    <div style={{ padding: '32px', maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ fontSize: 30, fontWeight: 700, color: '#f0f0f5', marginBottom: 28 }}>Profile</h1>

      {/* Hero card */}
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20, padding: 24,
        display: 'flex', alignItems: 'center', gap: 20,
        marginBottom: 20,
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #0d9488, #7c3aed)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, fontWeight: 700, color: 'white',
        }}>
          {profile.name?.[0]?.toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0f5', margin: '0 0 4px' }}>{profile.name}</h2>
          <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 14px', textTransform: 'capitalize' }}>
            {profile.level} · {profile.language} · {subjectLabel[profile.subject]}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 99, height: 6 }}>
              <div style={{
                width: `${profile.progress}%`, height: 6, borderRadius: 99,
                background: 'linear-gradient(90deg, #0d9488, #7c3aed)',
              }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#0d9488' }}>{profile.progress}%</span>
          </div>
        </div>
      </div>

      {/* Detail grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {details.map(({ icon: Icon, label, value, color, bg, border }) => (
          <div key={label} style={{
            background: bg, border: `1px solid ${border}`,
            borderRadius: 14, padding: '16px',
            display: 'flex', alignItems: 'flex-start', gap: 12,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: `${color}20`, border: `1px solid ${color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon size={16} style={{ color }} />
            </div>
            <div>
              <p style={{ fontSize: 11, color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 3px' }}>{label}</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f5', textTransform: 'capitalize', margin: 0 }}>{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}