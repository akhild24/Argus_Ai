import { useOutletContext, useNavigate } from 'react-router-dom';
import { BookOpen, MapPin, TrendingUp, Brain, ArrowRight, Layers } from 'lucide-react';

const subjectLabel = {
  python: 'Python Programming',
  data_science: 'Data Science',
  govt_exam: 'Govt Exam Prep',
};

const quickTopics = {
  python: [
    { name: 'Variables', desc: 'Storing data' },
    { name: 'Loops', desc: 'Repeating actions' },
    { name: 'Functions', desc: 'Reusable blocks' },
  ],
  data_science: [
    { name: 'What is Data', desc: 'Understanding information' },
    { name: 'Mean Median Mode', desc: 'Basic statistics' },
    { name: 'CSV Files', desc: 'Working with data files' },
  ],
  govt_exam: [
    { name: 'Current Affairs', desc: 'Stay updated' },
    { name: 'Reasoning Basics', desc: 'Logical thinking' },
    { name: 'Grammar', desc: 'English rules' },
  ],
};

export default function DashboardPage() {
    const context = useOutletContext();
    const profile = context?.profile || null;
    const navigate = useNavigate();
    if (!profile) return null;

  const topics = quickTopics[profile.subject] || [];

  return (
    <div style={{ padding: '32px', maxWidth: 900, margin: '0 auto' }}>

      {/* Greeting */}
      

<p style={{ fontSize: 14, color: '#4b5563', marginTop: 4 }}>
  {subjectLabel[profile.subject] || profile.subject || 'Choose a subject'} · {profile.language || 'English'} · {profile.level || 'Beginner'}
</p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          {
            icon: TrendingUp,
            label: 'Progress',
            value: `${profile.progress}%`,
            color: '#0d9488',
            bg: 'rgba(13,148,136,0.08)',
            border: 'rgba(13,148,136,0.15)',
            hasBar: true,
          },
          {
            icon: Brain,
            label: 'Learning Style',
            value: `${profile.style}-first`,
            color: '#7c3aed',
            bg: 'rgba(124,58,237,0.08)',
            border: 'rgba(124,58,237,0.15)',
          },
          {
            icon: Layers,
            label: 'Level',
            value: profile.level,
            color: '#2563eb',
            bg: 'rgba(37,99,235,0.08)',
            border: 'rgba(37,99,235,0.15)',
          },
        ].map(({ icon: Icon, label, value, color, bg, border, hasBar }) => (
          <div
            key={label}
            style={{
              background: bg,
              border: `1px solid ${border}`,
              borderRadius: 16,
              padding: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <Icon size={14} style={{ color }} />
              <span style={{ fontSize: 11, color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {label}
              </span>
            </div>
            <p style={{ fontSize: 24, fontWeight: 700, color: '#f0f0f5', textTransform: 'capitalize', margin: 0 }}>
              {value}
            </p>
            {hasBar && (
              <div style={{ marginTop: 10, background: 'rgba(255,255,255,0.08)', borderRadius: 99, height: 4 }}>
                <div style={{ width: `${profile.progress}%`, height: 4, borderRadius: 99, background: `linear-gradient(90deg, ${color}, #7c3aed)` }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Start */}
      <div
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 20,
          padding: 24,
          marginBottom: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <BookOpen size={16} style={{ color: '#0d9488' }} />
            <span style={{ fontWeight: 600, color: '#f0f0f5', fontSize: 15 }}>Quick Start</span>
          </div>
          <button
            onClick={() => navigate('/app/courses')}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              fontSize: 12, color: '#0d9488', background: 'transparent',
              border: 'none', cursor: 'pointer', fontWeight: 500,
            }}
          >
            All topics <ArrowRight size={12} />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {topics.map((t) => (
            <button
              key={t.name}
              onClick={() => navigate(`/app/courses/${encodeURIComponent(t.name)}`)}
              style={{
                padding: '16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14,
                textAlign: 'left',
                cursor: 'pointer',
                color: '#f0f0f5',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.border = '1px solid rgba(13,148,136,0.4)';
                e.currentTarget.style.background = 'rgba(13,148,136,0.06)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              }}
            >
              <p style={{ fontWeight: 600, fontSize: 13, color: '#f0f0f5', margin: '0 0 4px' }}>{t.name}</p>
              <p style={{ fontSize: 11, color: '#4b5563', margin: 0 }}>{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities Banner */}
      <div
        onClick={() => navigate('/app/opportunities')}
        style={{
          background: 'linear-gradient(135deg, rgba(234,88,12,0.15), rgba(234,88,12,0.05))',
          border: '1px solid rgba(234,88,12,0.2)',
          borderRadius: 20,
          padding: '20px 24px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'rgba(234,88,12,0.15)',
            border: '1px solid rgba(234,88,12,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <MapPin size={18} style={{ color: '#f97316' }} />
          </div>
          <div>
            <p style={{ fontWeight: 600, color: '#f0f0f5', fontSize: 14, margin: '0 0 2px' }}>
              Opportunities Near {profile.city}
            </p>
            <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>
              Free workshops this week — nobody told you these existed
            </p>
          </div>
        </div>
        <ArrowRight size={18} style={{ color: '#f97316', flexShrink: 0 }} />
      </div>
    </div>
  );
}