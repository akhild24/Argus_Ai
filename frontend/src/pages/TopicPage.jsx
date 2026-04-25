import { useState } from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ChatBox from '../components/ChatBox';
import QuizCard from '../components/QuizCard';

export default function TopicPage() {
    const { topic } = useParams();
    const context = useOutletContext();
    const profile = context?.profile || null;
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
    <div style={{ padding: '32px', maxWidth: 720, margin: '0 auto' }}>

      {/* Back */}
      <button
        onClick={() => navigate('/app/courses')}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: '#6b7280',
          background: 'transparent', border: 'none',
          cursor: 'pointer', marginBottom: 24, padding: 0,
        }}
      >
        <ArrowLeft size={15} /> Back to Courses
      </button>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#f0f0f5', margin: '0 0 6px' }}>{decoded}</h1>
        <p style={{ fontSize: 13, color: '#4b5563', margin: 0 }}>
          Learn · Quiz · Progress
        </p>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '5px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600,
              background: i <= currentStep ? 'rgba(13,148,136,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${i <= currentStep ? 'rgba(13,148,136,0.3)' : 'rgba(255,255,255,0.07)'}`,
              color: i <= currentStep ? '#0d9488' : '#374151',
            }}>
              {i + 1}. {s}
            </div>
            {i < 2 && <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.08)' }} />}
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
          <div style={{
            background: 'rgba(13,148,136,0.08)',
            border: '1px solid rgba(13,148,136,0.2)',
            borderRadius: 16, padding: 24, textAlign: 'center',
          }}>
            <p style={{ fontWeight: 700, fontSize: 18, color: '#0d9488', marginBottom: 6 }}>
              Topic Complete
            </p>
            <p style={{ fontSize: 13, color: '#4b5563', marginBottom: 20 }}>
              Progress updated. Pick your next move.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button
                onClick={() => navigate('/app/courses')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '10px 20px', borderRadius: 12, fontSize: 13, fontWeight: 600,
                  background: 'rgba(13,148,136,0.15)', border: '1px solid rgba(13,148,136,0.3)',
                  color: '#0d9488', cursor: 'pointer',
                }}
              >
                Next Topic <ArrowRight size={14} />
              </button>
              <button
                onClick={() => navigate('/app/opportunities')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '10px 20px', borderRadius: 12, fontSize: 13, fontWeight: 600,
                  background: 'rgba(234,88,12,0.1)', border: '1px solid rgba(234,88,12,0.2)',
                  color: '#f97316', cursor: 'pointer',
                }}
              >
                See Opportunities <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}