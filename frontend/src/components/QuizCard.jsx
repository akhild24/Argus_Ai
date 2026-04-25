import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { generateQuiz, reExplainConcept } from '../services/api';
import { patchProgress } from '../services/auth';

export default function QuizCard({ topic, onPass }) {
  const [quiz, setQuiz] = useState(null);
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState(null);
  const [reExplain, setReExplain] = useState('');
  const [loading, setLoading] = useState(false);

  const getProfile = () => {
    try {
      return JSON.parse(localStorage.getItem('udaan_profile') || '{}');
    } catch {
      return {};
    }
  };

  const loadQuiz = async () => {
    setResult(null);
    setSelected('');
    setReExplain('');
    const profile = getProfile();
    setLoading(true);
    try {
      const data = await generateQuiz(topic, profile.level || 'beginner', profile.language || 'English');
      setQuiz(data);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!selected || !quiz) return;
    const profile = getProfile();
    if (selected === quiz.correct_answer) {
      const nextProgress = Math.min(Number(profile.progress || 0) + 10, 100);
      const updated = { ...profile, progress: nextProgress };
      localStorage.setItem('udaan_profile', JSON.stringify(updated));
      setResult('pass');
      if (onPass) onPass();
      patchProgress(nextProgress).catch(error => {
        console.warn('Progress saved locally, backend update failed:', error.message);
      });
    } else {
      setResult('fail');
      setLoading(true);
      try {
        const data = await reExplainConcept(topic, profile, 'example');
        setReExplain(data.explanation);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!quiz && !loading) {
    return (
      <button className="u-big-action" onClick={loadQuiz}>
        Take Quiz on This Topic
      </button>
    );
  }

  return (
    <div className="u-card quiz-card">
      <div className="u-card-header">
        <p style={{ fontWeight: 700, fontSize: 14, color: '#f0f0f5', margin: 0 }}>Feynman Quiz</p>
        {quiz && (
          <span className={quiz.source === 'fallback' ? 'u-ai-badge fallback' : 'u-ai-badge'}>
            {quiz.source === 'fallback' ? 'Demo fallback' : 'AI Live'}{quiz.model ? ` - ${quiz.model}` : ''}
          </span>
        )}
      </div>

      {loading && <p style={{ fontSize: 13, color: '#6b7280' }}>Loading quiz...</p>}

      {quiz && !loading && (
        <>
          <p style={{ fontSize: 14, color: '#d1d5db', marginBottom: 14, lineHeight: 1.6 }}>
            {quiz.question}
          </p>

          <div className="quiz-options">
            {quiz.options.map(opt => {
              const isSelected = selected === opt.id;
              const isCorrect = result && opt.id === quiz.correct_answer;
              const isWrong = result === 'fail' && isSelected && !isCorrect;
              return (
                <button
                  key={opt.id}
                  onClick={() => !result && setSelected(opt.id)}
                  className={`quiz-option ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                  disabled={Boolean(result)}
                >
                  <span style={{ fontWeight: 800, textTransform: 'uppercase' }}>{opt.id}.</span> {opt.text}
                </button>
              );
            })}
          </div>

          {result === 'pass' && (
            <div className="quiz-feedback pass">
              <p style={{ fontWeight: 800, color: '#10b981', fontSize: 13, margin: '0 0 6px' }}>
                Correct - +10% Progress
              </p>
              <p style={{ fontSize: 13, color: '#9ca3af', margin: 0, lineHeight: 1.6 }}>
                {quiz.explanation}
              </p>
              <button className="u-text-action" onClick={loadQuiz} style={{ marginTop: 12 }}>
                <RefreshCw size={13} /> Try another quiz
              </button>
            </div>
          )}

          {result === 'fail' && (
            <div className="quiz-feedback fail">
              <p style={{ fontWeight: 800, color: '#ef4444', fontSize: 13, margin: '0 0 8px' }}>
                Not quite - here is a different explanation:
              </p>
              {loading && <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>Getting new explanation...</p>}
              {reExplain && (
                <>
                  <p style={{ fontSize: 13, color: '#9ca3af', margin: '0 0 12px', lineHeight: 1.6 }}>
                    {reExplain}
                  </p>
                  <button className="u-pill-btn" onClick={loadQuiz}>Try New Quiz</button>
                </>
              )}
            </div>
          )}

          {!result && (
            <button className="u-primary-btn full" onClick={submitAnswer} disabled={!selected}>
              Submit Answer
            </button>
          )}
        </>
      )}
    </div>
  );
}
