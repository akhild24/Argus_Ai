import { useNavigate, useOutletContext } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';

const allTopics = {
  python: [
    { name: 'Variables', desc: 'Storing and using data in programs' },
    { name: 'Loops', desc: 'Repeating actions automatically' },
    { name: 'Functions', desc: 'Reusable blocks of logic' },
    { name: 'Lists', desc: 'Storing multiple items in order' },
    { name: 'If Else', desc: 'Making decisions in code' },
  ],
  data_science: [
    { name: 'What is Data', desc: 'Understanding raw information' },
    { name: 'Mean Median Mode', desc: 'Foundational statistics' },
    { name: 'CSV Files', desc: 'Reading and writing data files' },
    { name: 'Intro to ML', desc: 'How machines learn patterns' },
  ],
  govt_exam: [
    { name: 'Current Affairs', desc: 'Stay updated on national news' },
    { name: 'Reasoning Basics', desc: 'Logical and analytical thinking' },
    { name: 'Grammar', desc: 'English language fundamentals' },
    { name: 'Quant Basics', desc: 'Numbers and calculations' },
  ],
};

const subjectLabel = {
  python: 'Python Programming',
  data_science: 'Data Science',
  govt_exam: 'Govt Exam Prep',
};

export default function CoursesPage() {
    const context = useOutletContext();
    const profile = context?.profile || null;
    const navigate = useNavigate();
    if (!profile) return null;

  const topics = allTopics[profile.subject] || [];

  return (
    <div style={{ padding: '32px', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <BookOpen size={18} style={{ color: '#0d9488' }} />
          <span style={{ fontSize: 12, color: '#0d9488', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {subjectLabel[profile.subject]}
          </span>
        </div>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: '#f0f0f5', margin: 0 }}>My Courses</h1>
        <p style={{ fontSize: 13, color: '#4b5563', marginTop: 6 }}>
          Select a topic to get an AI explanation and take a quiz.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {topics.map((topic, i) => (
          <button
            key={topic.name}
            onClick={() => navigate(`/app/courses/${encodeURIComponent(topic.name)}`)}
            style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '20px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16,
              textAlign: 'left', cursor: 'pointer', color: '#f0f0f5',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.border = '1px solid rgba(13,148,136,0.35)';
              e.currentTarget.style.background = 'rgba(13,148,136,0.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15, fontWeight: 700, color: '#4b5563',
            }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: 14, color: '#f0f0f5', margin: '0 0 4px' }}>{topic.name}</p>
              <p style={{ fontSize: 12, color: '#4b5563', margin: 0 }}>{topic.desc}</p>
            </div>
            <ArrowRight size={16} style={{ color: '#374151', flexShrink: 0 }} />
          </button>
        ))}
      </div>
    </div>
  );
}