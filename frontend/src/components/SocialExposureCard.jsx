import { useEffect, useState } from 'react';
import { getNearbyEvents } from '../utils/eventMatcher';

const bridgeMap = {
  python:
    'You just learned Python. This is how Data Science engineers at Jio, Infosys, and Razorpay automate repeated tasks every single day.',
  data_science:
    'You just learned data basics. This is how analysts turn raw numbers into decisions that companies pay crores for.',
  govt_exam:
    'You just practiced reasoning. This exact skill is tested in SSC, UPSC, and hundreds of government exams every year.',
};

export default function SocialExposureCard({ profile }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (profile?.city && profile?.subject) {
      getNearbyEvents(profile.city, profile.subject).then(setEvents);
    }
  }, [profile]);

  if (!profile) return null;

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
      {/* Bridge Text */}
      <h3 className="font-bold text-yellow-900 mb-2">
        🌟 You're making real progress!
      </h3>
      <p className="text-sm text-gray-700 mb-4">
        {bridgeMap[profile.subject]}
      </p>

      {/* Events */}
      {events.length > 0 ? (
        <>
          <p className="font-semibold text-sm text-gray-800 mb-2">
            📍 Nearby Opportunities for you:
          </p>
          <div className="space-y-3">
            {events.map((e, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-3 border border-yellow-100"
              >
                <p className="font-semibold text-sm text-gray-800">{e.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {e.org} · {e.city} · {e.date} ·{' '}
                  <span className="text-green-600 font-semibold">FREE</span>
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-sm text-gray-500 italic">
          No events found near {profile.city} right now — check back soon.
        </p>
      )}

      <p className="mt-4 text-xs italic text-gray-400">
        Nobody told Ravi this existed. Now you know.
      </p>
    </div>
  );
}