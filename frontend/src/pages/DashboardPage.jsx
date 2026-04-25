import { useOutletContext, useNavigate } from 'react-router-dom';
import { BookOpen, MapPin, TrendingUp, Brain, ArrowRight, Layers } from 'lucide-react';

const subjectLabel = {
  python: 'Python Programming',
  data_science: 'Data Science',
  dsa: 'Data Structures & Algorithms',
  accounting: 'Accountancy & Tally',
  govt_exam: 'Govt Exam Prep',
  finance: 'Finance & Banking',
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
  dsa: [
    { name: 'Arrays', desc: 'Store ordered values' },
    { name: 'Stacks and Queues', desc: 'Common data flows' },
    { name: 'Searching', desc: 'Find values efficiently' },
  ],
  accounting: [
    { name: 'Accounting Equation', desc: 'Assets, liabilities, capital' },
    { name: 'Journal Entries', desc: 'Record transactions' },
    { name: 'Trial Balance', desc: 'Check account totals' },
  ],
  govt_exam: [
    { name: 'Current Affairs', desc: 'Stay updated' },
    { name: 'Reasoning Basics', desc: 'Logical thinking' },
    { name: 'Grammar', desc: 'English rules' },
  ],
  finance: [
    { name: 'Simple Interest', desc: 'Money growth basics' },
    { name: 'Banking Terms', desc: 'Common finance vocabulary' },
    { name: 'Budgeting', desc: 'Plan income and expenses' },
  ],
};

export default function DashboardPage() {
  const context = useOutletContext();
  const profile = context?.profile || null;
  const navigate = useNavigate();
  if (!profile) return null;

  const topics = quickTopics[profile.subject] || [];
  const subject = subjectLabel[profile.subject] || profile.subject || 'Choose a subject';

  return (
    <div className="u-page" style={{ maxWidth: 960 }}>
      <div className="u-dashboard-hero">
        <div>
          <p className="u-eyebrow">Today&apos;s path</p>
          <h1 style={{ margin: '0 0 8px', color: '#f0f0f5', fontSize: 30, fontWeight: 800 }}>
            Welcome back, {profile.name || 'learner'}
          </h1>
          <p style={{ fontSize: 14, color: '#9ca3af', margin: 0 }}>
            {subject} / {profile.language || 'English'} / {profile.level || 'Beginner'}
          </p>
        </div>
        <button className="u-primary-btn" onClick={() => navigate('/app/courses')}>
          Continue Learning <ArrowRight size={14} />
        </button>
      </div>

      <div className="u-stats-grid">
        {[
          { icon: TrendingUp, label: 'Progress', value: `${profile.progress}%`, color: '#0d9488', hasBar: true },
          { icon: Brain, label: 'Learning Style', value: `${profile.style}-first`, color: '#7c3aed' },
          { icon: Layers, label: 'Level', value: profile.level, color: '#2563eb' },
        ].map(({ icon: Icon, label, value, color, hasBar }) => (
          <div className="u-metric-card" key={label}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <Icon size={14} style={{ color }} />
              <span className="u-label">{label}</span>
            </div>
            <p style={{ fontSize: 24, fontWeight: 800, color: '#f0f0f5', textTransform: 'capitalize', margin: 0 }}>
              {value}
            </p>
            {hasBar && (
              <div className="u-progress-track" style={{ marginTop: 10 }}>
                <div className="u-progress-fill" style={{ width: `${profile.progress}%` }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="u-card">
        <div className="u-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <BookOpen size={16} style={{ color: '#0d9488' }} />
            <span style={{ fontWeight: 700, color: '#f0f0f5', fontSize: 15 }}>Quick Start</span>
          </div>
          <button className="u-text-action" onClick={() => navigate('/app/courses')}>
            All topics <ArrowRight size={12} />
          </button>
        </div>
        <div className="u-topic-grid compact">
          {topics.map((t) => (
            <button className="u-topic-tile" key={t.name} onClick={() => navigate(`/app/courses/${encodeURIComponent(t.name)}`)}>
              <p style={{ fontWeight: 700, fontSize: 13, color: '#f0f0f5', margin: '0 0 4px' }}>{t.name}</p>
              <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="u-opportunity-banner" onClick={() => navigate('/app/opportunities')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div className="u-orange-icon"><MapPin size={18} style={{ color: '#f97316' }} /></div>
          <div>
            <p style={{ fontWeight: 700, color: '#f0f0f5', fontSize: 14, margin: '0 0 2px' }}>
              Opportunities Near {profile.city || 'You'}
            </p>
            <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>
              Free workshops this week - nobody told you these existed.
            </p>
          </div>
        </div>
        <ArrowRight size={18} style={{ color: '#f97316', flexShrink: 0 }} />
      </div>
    </div>
  );
}
