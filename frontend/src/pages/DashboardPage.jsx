import { useEffect, useRef } from 'react';
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

function DotCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      dotsRef.current = [];
      const cols = Math.floor(canvas.width / 48);
      const rows = Math.floor(canvas.height / 48);
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          dotsRef.current.push({
            ox: c * 48, oy: r * 48,
            x: c * 48, y: r * 48,
          });
        }
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouse.current.x, my = mouse.current.y;
      dotsRef.current.forEach(d => {
        const dx = mx - d.ox, dy = my - d.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let tx = d.ox, ty = d.oy;
        if (dist < 100 && dist > 0) {
          const force = (1 - dist / 100) * 20;
          tx = d.ox + (dx / dist) * force;
          ty = d.oy + (dy / dist) * force;
        }
        d.x += (tx - d.x) * 0.12;
        d.y += (ty - d.y) * 0.12;
        const closeness = Math.max(0, 1 - dist / 100);
        const alpha = 0.08 + closeness * 0.5;
        const size = 1.4 + closeness * 2.2;
        ctx.beginPath();
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(13,148,136,${alpha})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    const onMove = e => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', top: 0, left: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0,
    }} />
  );
}

export default function DashboardPage() {
  const context = useOutletContext();
  const profile = context?.profile || null;
  const navigate = useNavigate();
  if (!profile) return null;

  const topics = quickTopics[profile.subject] || [];
  const subject = subjectLabel[profile.subject] || profile.subject || 'Choose a subject';

  return (
    <>
      <DotCanvas />
      <div className="u-page" style={{ maxWidth: 960, position: 'relative', zIndex: 1 }}>
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
    </>
  );
}