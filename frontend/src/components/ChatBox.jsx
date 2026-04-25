import { useState } from 'react';
import { explainConcept, reExplainConcept } from '../services/api';

export default function ChatBox({ topic, onExplained }) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modeUsed, setModeUsed] = useState('example');
  const [lastQuestion, setLastQuestion] = useState('');
  const [hasExplained, setHasExplained] = useState(false);

  const getProfile = () => JSON.parse(localStorage.getItem('udaan_profile'));

  const addMessage = (role, text) =>
    setMessages(prev => [...prev, { role, text }]);

  const ask = async (q) => {
    const profile = getProfile();
    addMessage('user', q);
    setLastQuestion(q);
    setLoading(true);
    const data = await explainConcept(q, profile);
    setLoading(false);
    setModeUsed(data.mode_used);
    addMessage('bot', data.explanation);
    if (!hasExplained) {
      setHasExplained(true);
      if (onExplained) onExplained();
    }
  };

  const handleSubmit = () => {
    if (!question.trim()) return;
    ask(question);
    setQuestion('');
  };

  const handleTopicAsk = () => {
    if (topic) ask(`Explain "${topic}" to me`);
  };

  const handleLanguageToggle = async () => {
    const profile = getProfile();
    const langs = ['English', 'Hindi', 'Hinglish'];
    const nextLang = langs[(langs.indexOf(profile.language) + 1) % 3];
    const updated = { ...profile, language: nextLang };
    localStorage.setItem('udaan_profile', JSON.stringify(updated));
    if (lastQuestion) {
      addMessage('user', `[Switched to ${nextLang}] ${lastQuestion}`);
      setLoading(true);
      const data = await explainConcept(lastQuestion, updated);
      setLoading(false);
      addMessage('bot', data.explanation);
    }
  };

  const handleStillConfused = async () => {
    const profile = getProfile();
    setLoading(true);
    const data = await reExplainConcept(topic || lastQuestion, profile, modeUsed);
    setLoading(false);
    setModeUsed(data.new_mode);
    addMessage('bot', data.explanation);
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 20,
      padding: 20,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={{ fontWeight: 600, fontSize: 14, color: '#f0f0f5' }}>
          Ask Udaan {topic && `— ${topic}`}
        </span>
        <button
          onClick={handleLanguageToggle}
          style={{
            fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 99,
            background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.25)',
            color: '#0d9488', cursor: 'pointer',
          }}
        >
          Toggle Language
        </button>
      </div>

      {/* Quick explain button */}
      {topic && messages.length === 0 && (
        <button
          onClick={handleTopicAsk}
          style={{
            width: '100%', marginBottom: 14, padding: '10px',
            background: 'transparent',
            border: '1px dashed rgba(13,148,136,0.3)',
            borderRadius: 12, fontSize: 13, color: '#0d9488',
            cursor: 'pointer',
          }}
        >
          Explain "{topic}" for me
        </button>
      )}

      {/* Messages */}
      <div style={{
        minHeight: 80, maxHeight: 280, overflowY: 'auto',
        marginBottom: 14, display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '75%', padding: '10px 14px', borderRadius: 14,
              fontSize: 13, lineHeight: 1.6,
              background: m.role === 'user' ? '#0d9488' : 'rgba(255,255,255,0.05)',
              border: m.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
              color: '#f0f0f5',
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '10px 14px', borderRadius: 14, fontSize: 13,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              color: '#6b7280',
            }}>
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Still confused */}
      {messages.length > 0 && !loading && (
        <button
          onClick={handleStillConfused}
          style={{
            fontSize: 12, color: '#f97316',
            background: 'transparent', border: 'none',
            cursor: 'pointer', marginBottom: 12, padding: 0, display: 'block',
          }}
        >
          Still confused? Explain it differently
        </button>
      )}

      {/* Input */}
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          style={{
            flex: 1, padding: '10px 14px', borderRadius: 12, fontSize: 13,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#f0f0f5', outline: 'none',
          }}
          placeholder="Ask anything about this topic..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          style={{
            padding: '10px 18px', borderRadius: 12, fontSize: 13, fontWeight: 600,
            background: '#0d9488', border: 'none', color: 'white', cursor: 'pointer',
          }}
        >
          Ask
        </button>
      </div>
    </div>
  );
}