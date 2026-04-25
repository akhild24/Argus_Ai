import { useState } from 'react';
import { generateQuiz, reExplainConcept } from '../services/api';

export default function QuizCard({ topic, onPass }) {
  const [quiz, setQuiz] = useState(null);
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState(null);
  const [reExplain, setReExplain] = useState('');
  const [loading, setLoading] = useState(false);

  const getProfile = () => JSON.parse(localStorage.getItem('udaan_profile'));

  const loadQuiz = async () => {
    setResult(null);
    setSelected('');
    setReExplain('');
    const profile = getProfile();
    setLoading(true);
    const data = await generateQuiz(topic, profile.level, profile.language);
    setQuiz(data);
    setLoading(false);
  };

  const submitAnswer = async () => {
    if (!selected) return;
    const profile = getProfile();
    if (selected === quiz.correct_answer) {
      const updated = { ...profile, progress: Math.min(profile.progress + 10, 100) };
      localStorage.setItem('udaan_profile', JSON.stringify(updated));
      setResult('pass');
      if (onPass) onPass();
    } else {
      setResult('fail');
      setLoading(true);
      const data = await reExplainConcept(topic, profile, 'example');
      setLoading(false);
      setReExplain(data.explanation);
    }
  };

  if (!quiz && !loading) {
    return (
      <button
        onClick={loadQuiz}
        style={{
          width: '100%', padding: '14px', borderRadius: 16, fontSize: 13,
          fontWeight: 600, cursor: 'pointer',
          background: 'rgba(13,148,136,0.1)',
          border: '1px solid rgba(13,148,136,0.25)',
          color: '#0d9488',
        }}
      >
        Take Quiz on This Topic
      </button>
    );
  }

  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 20, padding: 20,
    }}>
      <p style={{ fontWeight: 600, fontSize: 14, color: '#f0f0f5', marginBottom: 16 }}>
        Feynman Quiz
      </p>

      {loading && (
        <p style={{ fontSize: 13, color: '#6b7280' }}>Loading quiz...</p>
      )}

      {quiz && !loading && (
        <>
          <p style={{ fontSize: 13, color: '#d1d5db', marginBottom: 14, lineHeight: 1.6 }}>
            {quiz.question}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {quiz.options.map(opt => (
              <button
                key={opt.id}
                onClick={() => !result && setSelected(opt.id)}
                style={{
                  padding: '12px 16px', borderRadius: 12, fontSize: 13, textAlign: 'left',
                  cursor: result ? 'default' : 'pointer',
                  background: selected === opt.id ? 'rgba(13,148,136,0.1)' : 'rgba(255,255,255,0.03)',
                  border: selected === opt.id
                    ? '1px solid rgba(13,148,136,0.35)'
                    : '1px solid rgba(255,255,255,0.07)',
                  color: '#f0f0f5',
                }}
              >
                <span style={{ fontWeight: 600, textTransform: 'uppercase' }}>{opt.id}.</span> {opt.text}
              </button>
            ))}
          </div>

          {result === 'pass' && (
            <div style={{
              background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: 12, padding: 16,
            }}>
              <p style={{ fontWeight: 700, color: '#10b981', fontSize: 13, margin: '0 0 6px' }}>
                Correct — +10% Progress
              </p>
              <p style={{ fontSize: 13, color: '#6b7280', margin: 0, lineHeight: 1.6 }}>
                {quiz.explanation}
              </p>
            </div>
          )}

          {result === 'fail' && (
            <div style={{
              background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)',
              borderRadius: 12, padding: 16,
            }}>
              <p style={{ fontWeight: 700, color: '#ef4444', fontSize: 13, margin: '0 0 8px' }}>
                Not quite — here is a different explanation:
              </p>
              {loading && <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>Getting new explanation...</p>}
              {reExplain && (
                <>
                  <p style={{ fontSize: 13, color: '#9ca3af', margin: '0 0 12px', lineHeight: 1.6 }}>
                    {reExplain}
                  </p>
                  <button
                    onClick={loadQuiz}
                    style={{
                      padding: '8px 16px', borderRadius: 10, fontSize: 12, fontWeight: 600,
                      background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.25)',
                      color: '#0d9488', cursor: 'pointer',
                    }}
                  >
                    Try New Quiz
                  </button>
                </>
              )}
            </div>
          )}

          {!result && (
            <button
              onClick={submitAnswer}
              disabled={!selected}
              style={{
                width: '100%', padding: '12px', borderRadius: 12,
                fontSize: 13, fontWeight: 600, cursor: selected ? 'pointer' : 'not-allowed',
                background: selected ? '#0d9488' : 'rgba(255,255,255,0.04)',
                border: 'none',
                color: selected ? 'white' : '#4b5563',
              }}
            >
              Submit Answer
            </button>
          )}
        </>
      )}
    </div>
  );
}