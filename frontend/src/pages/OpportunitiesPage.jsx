import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { MapPin, Calendar, Building, ArrowUpRight, Zap } from 'lucide-react';
import { getOpportunities } from '../services/api';

const bridgeMap = {
  python: {
    heading: 'Python opens doors to Data Science and AI',
    body: 'Engineers at Jio, Razorpay, and Infosys write Python every day. You are learning the same skill right now.',
  },
  data_science: {
    heading: 'Data Science is one of the highest-paid fields in India',
    body: 'Every company from hospitals to cricket teams needs people who can read data. That is you.',
  },
  govt_exam: {
    heading: 'Reasoning skills unlock 200+ competitive exams',
    body: 'SSC, UPSC, Bank PO, Railways - the same patterns you are practising appear in every major exam.',
  },
  accounting: {
    heading: 'Accounting is the language every business runs on',
    body: 'From startups to large firms, every finance role needs what you are building. Tally alone has 7 million users.',
  },
  finance: {
    heading: 'Finance and banking jobs are among the most stable in India',
    body: 'NBFC, cooperative banks, insurance - all need people who understand money. That is what you are learning.',
  },
  dsa: {
    heading: 'DSA is the gateway to every tech company interview',
    body: 'Google, Microsoft, Flipkart - every tech interview tests data structures. What you learn here maps directly.',
  },
};

export default function OpportunitiesPage() {
  const context = useOutletContext();
  const profile = context?.profile || null;
  const [events, setEvents] = useState([]);
  const [bridge, setBridge] = useState('');
  const [aiMeta, setAiMeta] = useState({ source: 'ai', model: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOpportunities()
      .then(data => {
        setEvents(data.events || []);
        setBridge(data.bridge || '');
        setAiMeta({ source: data.source || 'ai', model: data.model || null });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (!profile) return null;
  const fallbackBridge = bridgeMap[profile.subject] || bridgeMap.python;

  return (
    <div className="u-page" style={{ maxWidth: 820 }}>
      <div style={{ marginBottom: 32 }}>
        <p className="u-eyebrow" style={{ color: '#f97316' }}>Opportunities</p>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: '#f0f0f5', margin: '0 0 8px' }}>
          Near {profile.city || 'You'}
        </h1>
        <p style={{ fontSize: 14, color: '#9ca3af', margin: 0, lineHeight: 1.6 }}>
          Free events and workshops around you - based on what you are currently studying.
        </p>
      </div>

      <div className="u-card career-card">
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div className="u-brand-mark"><Zap size={17} style={{ color: 'white' }} /></div>
          <div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
              <p style={{ fontWeight: 800, fontSize: 15, color: '#f0f0f5', margin: 0, lineHeight: 1.4 }}>
                {bridge || fallbackBridge.heading}
              </p>
              {!loading && (
                <span className={aiMeta.source === 'fallback' ? 'u-ai-badge fallback' : 'u-ai-badge'}>
                  {aiMeta.source === 'fallback' ? 'Demo fallback' : 'AI Live'}{aiMeta.model ? ` - ${aiMeta.model}` : ''}
                </span>
              )}
            </div>
            <p style={{ fontSize: 13, color: '#9ca3af', margin: 0, lineHeight: 1.7 }}>
              {fallbackBridge.body}
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <p style={{ fontWeight: 700, fontSize: 15, color: '#f0f0f5', margin: 0 }}>
          Events near {profile.city || 'you'}
        </p>
        {!loading && <span className="u-count-pill">{events.length} found</span>}
      </div>

      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[1, 2, 3].map(i => <div key={i} className="u-skeleton" />)}
        </div>
      )}

      {!loading && events.length === 0 && (
        <div className="u-card" style={{ textAlign: 'center', padding: '36px 24px' }}>
          <p style={{ fontSize: 14, color: '#9ca3af', margin: '0 0 6px' }}>
            No events found near {profile.city || 'your location'}.
          </p>
          <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>
            Update your city in Profile to see nearby events.
          </p>
        </div>
      )}

      {!loading && events.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {events.map((e, i) => (
            <div key={`${e.title}-${i}`} className="event-card">
              <div className="event-icon"><Building size={17} style={{ color: '#6b7280' }} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 700, fontSize: 14, color: '#f0f0f5', margin: '0 0 6px' }}>
                  {e.title}
                </p>
                <div className="event-meta">
                  <span><Building size={11} /> {e.org}</span>
                  <span><MapPin size={11} /> {e.city}</span>
                  <span><Calendar size={11} /> {e.date}</span>
                  <span className="free-pill">FREE</span>
                </div>
              </div>
              <ArrowUpRight size={15} style={{ color: '#4b5563', flexShrink: 0 }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
