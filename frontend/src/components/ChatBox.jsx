import { useState } from 'react';
import { explainConcept, reExplainConcept } from '../services/api';

export default function ChatBox({ topic, onExplained }) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modeUsed, setModeUsed] = useState('example');
  const [lastQuestion, setLastQuestion] = useState('');
  const [hasExplained, setHasExplained] = useState(false);

  const getProfile = () => {
    try {
      return JSON.parse(localStorage.getItem('udaan_profile') || '{}');
    } catch {
      return {};
    }
  };

  const addMessage = (role, text, meta = {}) =>
    setMessages(prev => [...prev, { role, text, ...meta }]);

  const ask = async (q) => {
    const profile = getProfile();
    addMessage('user', q);
    setLastQuestion(q);
    setLoading(true);
    try {
      const data = await explainConcept(q, profile);
      setModeUsed(data.mode_used);
      addMessage('bot', data.explanation, { source: data.source, model: data.model });
      if (!hasExplained) {
        setHasExplained(true);
        if (onExplained) onExplained();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!question.trim() || loading) return;
    ask(question.trim());
    setQuestion('');
  };

  const handleTopicAsk = () => {
    if (topic && !loading) ask(`Explain "${topic}" to me`);
  };

  const handleLanguageToggle = async () => {
    const profile = getProfile();
    const langs = ['English', 'Hindi', 'Hinglish'];
    const currentIndex = Math.max(langs.indexOf(profile.language), 0);
    const nextLang = langs[(currentIndex + 1) % langs.length];
    const updated = { ...profile, language: nextLang };
    localStorage.setItem('udaan_profile', JSON.stringify(updated));
    if (lastQuestion) {
      addMessage('user', `[Switched to ${nextLang}] ${lastQuestion}`);
      setLoading(true);
      try {
        const data = await explainConcept(lastQuestion, updated);
        addMessage('bot', data.explanation, { source: data.source, model: data.model });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleStillConfused = async () => {
    const profile = getProfile();
    const topicToExplain = topic || lastQuestion;
    if (!topicToExplain || loading) return;
    setLoading(true);
    try {
      const data = await reExplainConcept(topicToExplain, profile, modeUsed);
      setModeUsed(data.new_mode);
      addMessage('bot', data.explanation, { source: data.source, model: data.model });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="u-card chat-box">
      <div className="u-card-header">
        <span style={{ fontWeight: 700, fontSize: 14, color: '#f0f0f5' }}>
          Ask Udaan {topic && `- ${topic}`}
        </span>
        <button className="u-pill-btn" onClick={handleLanguageToggle} disabled={loading}>
          Toggle Language
        </button>
      </div>

      {topic && messages.length === 0 && (
        <button className="u-dashed-action" onClick={handleTopicAsk} disabled={loading}>
          Explain "{topic}" for me
        </button>
      )}

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={`${m.role}-${i}`} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div
              className="chat-bubble"
              style={{
                background: m.role === 'user' ? '#0d9488' : 'rgba(255,255,255,0.05)',
                border: m.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {m.text}
              {m.role === 'bot' && (
                <div className={m.source === 'fallback' ? 'u-ai-badge fallback' : 'u-ai-badge'}>
                  {m.source === 'fallback' ? 'Demo fallback' : 'AI Live'}{m.model ? ` - ${m.model}` : ''}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div className="chat-bubble thinking">Thinking...</div>
          </div>
        )}
      </div>

      {messages.length > 0 && !loading && (
        <button className="u-text-action" onClick={handleStillConfused}>
          Still confused? Explain it differently
        </button>
      )}

      <div className="u-inline-form">
        <input
          className="u-input"
          placeholder="Ask anything about this topic..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />
        <button className="u-primary-btn" onClick={handleSubmit} disabled={loading || !question.trim()}>
          Ask
        </button>
      </div>
    </div>
  );
}
