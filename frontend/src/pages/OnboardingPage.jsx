import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, setToken } from '../services/auth';
import { buildProfile } from '../utils/profileLogic';

const TOTAL_STEPS = 7;

const subjectsByDegree = {
  btech: [
    { value: 'python', label: 'Python Programming' },
    { value: 'data_science', label: 'Data Science & ML' },
    { value: 'dsa', label: 'Data Structures & Algorithms' },
  ],
  bcom: [
    { value: 'accounting', label: 'Accountancy & Tally' },
    { value: 'govt_exam', label: 'Government Exam Prep' },
    { value: 'finance', label: 'Finance & Banking' },
  ],
};

const levelQuestions = {
  btech: {
    question: 'What does this code print?   for i in range(3): print(i)',
    options: [
      { value: 'beginner', label: 'I am not sure — I am new to code' },
      { value: 'intermediate', label: '0, 1, 2 — I know basic loops' },
      { value: 'advanced', label: '0, 1, 2 — and I know why range starts at 0' },
    ],
  },
  bcom: {
    question: 'What is the accounting equation?',
    options: [
      { value: 'beginner', label: 'I have not studied this yet' },
      { value: 'intermediate', label: 'Assets = Liabilities + Capital' },
      { value: 'advanced', label: 'Assets = Liabilities + Equity, and I know how it applies to balance sheets' },
    ],
  },
};

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', degree: '', subject: '', style: '',
    level: '', language: '', experience: '', city: '',
  });

  const set = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));
  const next = () => setStep(s => s + 1);

  const finish = async (lastKey, lastValue) => {
    const finalData = { ...formData, [lastKey]: lastValue };
    const profile = buildProfile(finalData);
    localStorage.setItem('udaan_profile', JSON.stringify(profile));
  
    try {
      const meta = JSON.parse(localStorage.getItem('udaan_signup_meta') || '{}');
      const payload = {
        name:        meta.name || finalData.name,
        email:       meta.email || `${finalData.name.toLowerCase().replace(/\s/g, '')}@udaan.app`,
        password:    meta.password || 'udaan2026',
        level:       profile.level,
        style:       profile.style,
        language:    profile.language,
        subject:     profile.subject,
        city:        finalData.city || '',
        degree:      finalData.degree || '',
        hiddenSkill: profile.hiddenSkill,
        experience:  finalData.experience,
      };
      const { access_token } = await registerUser(payload);
      setToken(access_token);
      localStorage.removeItem('udaan_signup_meta'); // clean up
    } catch (err) {
      console.warn('Backend offline — running locally:', err.message);
    }
  
    navigate('/app');
  };

  const progress = Math.round(((step - 1) / TOTAL_STEPS) * 100);
  const subjects = subjectsByDegree[formData.degree] || [];
  const levelQ = levelQuestions[formData.degree] || levelQuestions.btech;

  const cardStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 24, padding: 32,
  };

  const btnBase = {
    width: '100%', marginBottom: 10, padding: '13px 16px',
    borderRadius: 12, fontSize: 13, textAlign: 'left',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#f0f0f5', cursor: 'pointer',
  };

  const title = (text) => (
    <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f0f0f5', margin: '0 0 6px' }}>{text}</h2>
  );
  const sub = (text) => (
    <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 20px' }}>{text}</p>
  );

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px', background: '#0a0a0f',
    }}>
      <div style={{ width: '100%', maxWidth: 480 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <p style={{ fontSize: 13, color: '#0d9488', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Udaan
          </p>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6b7280', marginBottom: 8 }}>
            <span>Step {step} of {TOTAL_STEPS}</span>
            <span>{progress}%</span>
          </div>
          <div style={{ width: '100%', background: 'rgba(255,255,255,0.06)', borderRadius: 99, height: 3 }}>
            <div style={{
              width: `${progress}%`, height: 3, borderRadius: 99,
              background: 'linear-gradient(90deg, #0d9488, #7c3aed)',
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>

        <div style={cardStyle}>

          {/* Step 1 — Name */}
          {step === 1 && (
            <div>
              {title("What's your name?")}
              {sub("So we can personalise your experience")}
              <input
                autoFocus
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: 14,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#f0f0f5', outline: 'none', boxSizing: 'border-box',
                }}
                placeholder="e.g. Ravi"
                value={formData.name}
                onChange={e => set('name', e.target.value)}
                onKeyDown={e => e.key === 'Enter' && formData.name.trim() && next()}
              />
              <button
                onClick={next}
                disabled={!formData.name.trim()}
                style={{
                  marginTop: 14, width: '100%', padding: '13px', borderRadius: 12,
                  fontSize: 14, fontWeight: 600,
                  cursor: formData.name.trim() ? 'pointer' : 'not-allowed',
                  background: formData.name.trim() ? '#0d9488' : 'rgba(255,255,255,0.05)',
                  border: 'none',
                  color: formData.name.trim() ? 'white' : '#4b5563',
                }}
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2 — Degree */}
          {step === 2 && (
            <div>
              {title("What are you studying?")}
              {sub("Choose your degree")}
              {[
                {
                  value: 'btech',
                  label: 'B.Tech / B.E.',
                  desc: 'Engineering — CS, IT, ECE, Mechanical',
                },
                {
                  value: 'bcom',
                  label: 'B.Com / BBA / BA',
                  desc: 'Commerce, Business, or Arts stream',
                },
              ].map(opt => (
                <div
                  key={opt.value}
                  onClick={() => { set('degree', opt.value); next(); }}
                  style={{
                    ...btnBase,
                    padding: '16px',
                    display: 'flex', flexDirection: 'column', gap: 4,
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
                  <span style={{ fontWeight: 600, fontSize: 14, color: '#f0f0f5' }}>{opt.label}</span>
                  <span style={{ fontSize: 12, color: '#6b7280' }}>{opt.desc}</span>
                </div>
              ))}
            </div>
          )}

          {/* Step 3 — Subject */}
          {step === 3 && (
            <div>
              {title("Which subject do you want to focus on?")}
              {sub(`Relevant to your ${formData.degree === 'btech' ? 'B.Tech' : 'B.Com'} degree`)}
              {subjects.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => { set('subject', opt.value); next(); }}
                  style={btnBase}
                  onMouseEnter={e => {
                    e.currentTarget.style.border = '1px solid rgba(13,148,136,0.4)';
                    e.currentTarget.style.background = 'rgba(13,148,136,0.06)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Step 4 — Learning Style */}
          {step === 4 && (
            <div>
              {title("How do you understand things best?")}
              {sub("Pick the explanation that feels clearer")}
              {[
                {
                  value: 'definition',
                  label: 'Give me the definition first',
                  sub: formData.degree === 'btech'
                    ? '"A variable stores a value — like x = 5"'
                    : '"Revenue is income earned from business operations"',
                },
                {
                  value: 'example',
                  label: 'Show me an example first',
                  sub: formData.degree === 'btech'
                    ? '"Think of a variable like a named box that holds a value"'
                    : '"Think of revenue like a shopkeeper counting cash at end of day"',
                },
              ].map(opt => (
                <div
                  key={opt.value}
                  onClick={() => { set('style', opt.value); next(); }}
                  style={{ ...btnBase, padding: '16px', display: 'flex', flexDirection: 'column', gap: 4 }}
                  onMouseEnter={e => {
                    e.currentTarget.style.border = '1px solid rgba(13,148,136,0.4)';
                    e.currentTarget.style.background = 'rgba(13,148,136,0.06)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: 13, color: '#f0f0f5' }}>{opt.label}</span>
                  <span style={{ fontSize: 12, color: '#6b7280' }}>{opt.sub}</span>
                </div>
              ))}
            </div>
          )}

          {/* Step 5 — Level Detection */}
          {step === 5 && (
            <div>
              {title("Quick knowledge check")}
              {sub("No pressure — this just helps us set your starting level")}
              <div style={{
                background: 'rgba(13,148,136,0.06)',
                border: '1px solid rgba(13,148,136,0.15)',
                borderRadius: 12, padding: '12px 16px', marginBottom: 18,
              }}>
                <p style={{ fontSize: 13, color: '#a0f0e8', margin: 0, fontFamily: 'monospace', lineHeight: 1.6 }}>
                  {levelQ.question}
                </p>
              </div>
              {levelQ.options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => { set('level', opt.value); next(); }}
                  style={btnBase}
                  onMouseEnter={e => {
                    e.currentTarget.style.border = '1px solid rgba(13,148,136,0.4)';
                    e.currentTarget.style.background = 'rgba(13,148,136,0.06)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Step 6 — Language */}
          {step === 6 && (
            <div>
              {title("Which language do you think in?")}
              {sub("Your AI tutor will respond in this language")}
              {[
                { value: 'English', desc: 'Responses in English' },
                { value: 'Hindi', desc: 'जवाब हिंदी में मिलेंगे' },
                { value: 'Hinglish', desc: 'Mix of Hindi and English' },
              ].map(lang => (
                <div
                  key={lang.value}
                  onClick={() => { set('language', lang.value); next(); }}
                  style={{ ...btnBase, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.border = '1px solid rgba(13,148,136,0.4)';
                    e.currentTarget.style.background = 'rgba(13,148,136,0.06)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#f0f0f5' }}>{lang.value}</span>
                  <span style={{ fontSize: 12, color: '#6b7280' }}>{lang.desc}</span>
                </div>
              ))}
            </div>
          )}

          {/* Step 7 — City + Background */}
          {step === 7 && (
            <div>
              {title("Last step")}
              {sub("This helps us find opportunities near you")}
              <input
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: 13,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#f0f0f5', outline: 'none', marginBottom: 18, boxSizing: 'border-box',
                }}
                placeholder="Your city — e.g. Indore, Bhopal, Surat"
                value={formData.city}
                onChange={e => set('city', e.target.value)}
              />
              <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>
                What do you do outside college?
              </p>
              {[
                { value: 'delivery', label: 'Delivery work' },
                { value: 'farming', label: 'Farming or agriculture' },
                { value: 'shop', label: 'Family shop or business' },
                { value: 'other', label: 'Other' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => finish('experience', opt.value)}
                  style={btnBase}
                  onMouseEnter={e => {
                    e.currentTarget.style.border = '1px solid rgba(13,148,136,0.4)';
                    e.currentTarget.style.background = 'rgba(13,148,136,0.06)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}