import { useState } from 'react';
import { generateQuiz, reExplainConcept } from '../services/api';

export default function QuizCard({ topic, onPass }) {
  const [quiz, setQuiz] = useState(null);
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState(null); // null | 'pass' | 'fail'
  const [reExplain, setReExplain] = useState('');
  const [loading, setLoading] = useState(false);

  const getProfile = () =>
    JSON.parse(localStorage.getItem('udaan_profile'));

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
      // PASS
      const updated = {
        ...profile,
        progress: Math.min(profile.progress + 10, 100),
      };
      localStorage.setItem('udaan_profile', JSON.stringify(updated));
      setResult('pass');
      if (onPass) onPass();
    } else {
      // FAIL — re-explain
      setResult('fail');
      setLoading(true);
      const data = await reExplainConcept(topic, profile, 'example');
      setLoading(false);
      setReExplain(data.explanation);
    }
  };

  // Before quiz loads
  if (!quiz && !loading) {
    return (
      <button
        onClick={loadQuiz}
        className="w-full bg-teal-700 text-white py-3 rounded-xl font-semibold hover:bg-teal-800"
      >
        📝 Take Quiz on This Topic
      </button>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h3 className="font-bold text-gray-800 mb-4">📝 Feynman Quiz</h3>

      {loading && (
        <p className="text-gray-400 text-sm">Loading quiz...</p>
      )}

      {quiz && !loading && (
        <>
          <p className="text-sm font-medium text-gray-800 mb-4">
            {quiz.question}
          </p>

          {/* Options */}
          <div className="space-y-2 mb-4">
            {quiz.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => !result && setSelected(opt.id)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm ${
                  selected === opt.id
                    ? 'border-teal-600 bg-teal-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${result ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <span className="font-semibold uppercase">{opt.id}.</span>{' '}
                {opt.text}
              </button>
            ))}
          </div>

          {/* PASS State */}
          {result === 'pass' && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm">
              <p className="font-bold text-green-700 mb-1">
                ✅ Correct! +10% Progress
              </p>
              <p className="text-green-600">{quiz.explanation}</p>
            </div>
          )}

          {/* FAIL State */}
          {result === 'fail' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm">
              <p className="font-bold text-red-700 mb-2">
                ❌ Not quite — let me explain this differently...
              </p>
              {loading && (
                <p className="text-gray-400">Getting a new explanation...</p>
              )}
              {reExplain && (
                <>
                  <p className="text-gray-700 mb-3">{reExplain}</p>
                  <button
                    onClick={loadQuiz}
                    className="bg-teal-700 text-white px-4 py-2 rounded-xl text-xs font-semibold"
                  >
                    Try a New Quiz →
                  </button>
                </>
              )}
            </div>
          )}

          {/* Submit Button */}
          {!result && (
            <button
              onClick={submitAnswer}
              disabled={!selected}
              className="w-full bg-teal-700 text-white py-2 rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-teal-800"
            >
              Submit Answer
            </button>
          )}
        </>
      )}
    </div>
  );
}