import { useState } from 'react';
import { explainConcept, reExplainConcept } from '../services/api';

export default function ChatBox({ topic, onExplained }) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modeUsed, setModeUsed] = useState('example');
  const [lastQuestion, setLastQuestion] = useState('');
  const [hasExplained, setHasExplained] = useState(false);

  const getProfile = () =>
    JSON.parse(localStorage.getItem('udaan_profile'));

  const addMessage = (role, text) =>
    setMessages((prev) => [...prev, { role, text }]);

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
    const data = await reExplainConcept(
      topic || lastQuestion,
      profile,
      modeUsed
    );
    setLoading(false);
    setModeUsed(data.new_mode);
    addMessage('bot', data.explanation);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800">
          💬 Ask Udaan {topic && `— ${topic}`}
        </h3>
        <button
          onClick={handleLanguageToggle}
          className="text-xs bg-teal-100 text-teal-800 px-3 py-1 rounded-full font-semibold hover:bg-teal-200"
        >
          🌐 Toggle Language
        </button>
      </div>

      {/* Quick Topic Button */}
      {topic && messages.length === 0 && (
        <button
          onClick={handleTopicAsk}
          className="w-full mb-4 border-2 border-dashed border-teal-300 text-teal-700 py-2 rounded-xl text-sm hover:bg-teal-50"
        >
          ⚡ Explain "{topic}" for me
        </button>
      )}

      {/* Message Bubbles */}
      <div className="space-y-3 min-h-[80px] max-h-72 overflow-y-auto mb-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-teal-700 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2 rounded-2xl text-sm text-gray-400">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Still Confused Button */}
      {messages.length > 0 && !loading && (
        <button
          onClick={handleStillConfused}
          className="text-sm text-orange-600 underline mb-3 block"
        >
          😕 Still confused? Explain it differently
        </button>
      )}

      {/* Input Row */}
      <div className="flex gap-2">
        <input
          className="flex-1 border-2 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-teal-500"
          placeholder="Ask anything about this topic..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          className="bg-teal-700 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-teal-800"
        >
          Ask
        </button>
      </div>
    </div>
  );
}