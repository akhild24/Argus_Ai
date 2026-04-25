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
    body: 'SSC, UPSC, Bank PO, Railways — the same patterns you are practising appear in every major exam.',
  },
  accounting: {
    heading: 'Accounting is the language every business runs on',
    body: 'From startups to large firms, every finance role needs what you are building. Tally alone has 7 million users.',
  },
  finance: {
    heading: 'Finance and banking jobs are among the most stable in India',
    body: 'NBFC, cooperative banks, insurance — all need people who understand money. That is what you are learning.',
  },
  dsa: {
    heading: 'DSA is the gateway to every tech company interview',
    body: 'Google, Microsoft, Flipkart — every tech interview tests data structures. What you learn here maps directly.',
  },
};

export default function OpportunitiesPage() {
  const context = useOutletContext();
  const profile = context?.profile || null;

  const [events, setEvents] = useState([]);
  const [bridge, setBridge] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getOpportunities()
      .then(data => {
        setEvents(data.events || []);
        setBridge(data.bridge || '');
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (!profile) return null;

  const fallbackBridge = bridgeMap[profile.subject] || bridgeMap.python;

  return (
    <div style={{ padding: '32px', maxWidth: 760, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p style={{
          fontSize: 11, fontWeight: 700, color: '#f97316',
          textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8,
        }}>
          Opportunities
        </p>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: '#f0f0f5', margin: '0 0 8px' }}>
          Near {profile.city || 'You'}
        </h1>
        <p style={{ fontSize: 14, color: '#9ca3af', margin: 0, lineHeight: 1.6 }}>
          Free events and workshops around you — based on what you are currently studying.
        </p>
      </div>

      {/* Career Bridge Card */}
      <div style={{
        borderRadius: 20, padding: 24, marginBottom: 28,
        background: 'rgba(13,148,136,0.07)',
        border: '1px solid rgba(13,148,136,0.18)',
      }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
            background: 'rgba(13,148,136,0.15)',
            border: '1px solid rgba(13,148,136,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={17} style={{ color: '#0d9488' }} />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: '#f0f0f5', margin: '0 0 8px', lineHeight: 1.4 }}>
              {bridge || fallbackBridge.heading}
            </p>
            <p style={{ fontSize: 13, color: '#9ca3af', margin: 0, lineHeight: 1.7 }}>
              {fallbackBridge.body}
            </p>
          </div>
        </div>
      </div>

      {/* Events Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <p style={{ fontWeight: 600, fontSize: 15, color: '#f0f0f5', margin: 0 }}>
          Events near {profile.city || 'you'}
        </p>
        {!loading && (
          <span style={{
            fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 99,
            background: 'rgba(13,148,136,0.1)',
            border: '1px solid rgba(13,148,136,0.2)',
            color: '#0d9488',
          }}>
            {events.length} found
          </span>
        )}
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              height: 76, borderRadius: 14,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
            }} />
          ))}
        </div>
      )}

      {/* No events */}
      {!loading && events.length === 0 && (
        <div style={{
          borderRadius: 16, padding: '36px 24px', textAlign: 'center',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <p style={{ fontSize: 14, color: '#6b7280', margin: '0 0 6px' }}>
            No events found near {profile.city || 'your location'}.
          </p>
          <p style={{ fontSize: 12, color: '#4b5563', margin: 0 }}>
            Update your city in Profile to see nearby events.
          </p>
        </div>
      )}

      {/* Event cards */}
      {!loading && events.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {events.map((e, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: '18px 20px',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              {/* Icon */}
              <div style={{
                width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Building size={17} style={{ color: '#6b7280' }} />
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: 14, color: '#f0f0f5', margin: '0 0 6px' }}>
                  {e.title}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#6b7280' }}>
                    <Building size={11} style={{ color: '#4b5563' }} /> {e.org}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#6b7280' }}>
                    <MapPin size={11} style={{ color: '#4b5563' }} /> {e.city}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#6b7280' }}>
                    <Calendar size={11} style={{ color: '#4b5563' }} /> {e.date}
                  </span>
                  <span style={{
                    fontSize: 11, fontWeight: 700,
                    color: '#10b981',
                    background: 'rgba(16,185,129,0.1)',
                    border: '1px solid rgba(16,185,129,0.2)',
                    padding: '1px 8px', borderRadius: 99,
                  }}>
                    FREE
                  </span>
                </div>
              </div>

              <ArrowUpRight size={15} style={{ color: '#4b5563', flexShrink: 0 }} />
            </div>
          ))}
        </div>
      )}

      {/* Footer line */}
      <p style={{
        textAlign: 'center', fontSize: 12,
        color: '#374151', fontStyle: 'italic', marginTop: 36,
        borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24,
      }}>
        Nobody told Ravi this existed. Now you know.
      </p>
    </div>
  );
}