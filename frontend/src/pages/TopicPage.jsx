import { useState } from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ChatBox from '../components/ChatBox';
import QuizCard from '../components/QuizCard';

export default function TopicPage() {
  const { topic } = useParams();
  const context = useOutletContext();
  const setProfile = context?.setProfile || (() => {});
  const navigate = useNavigate();
  const decoded = decodeURIComponent(topic);
  const [showQuiz, setShowQuiz] = useState(false);
  const [passed, setPassed] = useState(false);

  const refresh = () => {
    const saved = localStorage.getItem('udaan_profile');
    if (saved) setProfile(JSON.parse(saved));
  };

  const steps = ['Learn', 'Quiz', 'Done'];
  const currentStep = passed ? 2 : showQuiz ? 1 : 0;

  return (
    <div className="u-page" style={{ maxWidth: 760 }}>
      <button className="u-back-btn" onClick={() => navigate('/app/courses')}>
        <ArrowLeft size={15} /> Back to Courses
      </button>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#f0f0f5', margin: '0 0 6px' }}>{decoded}</h1>
        <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>Learn / Quiz / Progress</p>
      </div>

      <div className="u-stepper">
        {steps.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className={`u-step-pill ${i <= currentStep ? 'active' : ''}`}>
              {i + 1}. {s}
            </div>
            {i < 2 && <div className="u-step-line" />}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ChatBox topic={decoded} onExplained={() => setShowQuiz(true)} />

        {showQuiz && (
          <QuizCard
            topic={decoded}
            onPass={() => { setPassed(true); refresh(); }}
          />
        )}

        {passed && (
          <div className="u-card complete-card" style={{ textAlign: 'center' }}>
            <p style={{ fontWeight: 800, fontSize: 18, color: '#0d9488', marginBottom: 6 }}>
              Topic Complete
            </p>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>
              Progress updated. Pick your next move.
            </p>
            <div className="u-inline-form center">
              <button className="u-pill-btn" onClick={() => navigate('/app/courses')}>
                Next Topic <ArrowRight size={14} />
              </button>
              <button className="u-pill-btn orange" onClick={() => navigate('/app/opportunities')}>
                See Opportunities <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
