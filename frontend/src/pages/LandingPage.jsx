import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#f7f6f2]">
      
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-teal-800 mb-3">🚀 Udaan</h1>
        <p className="text-xl text-gray-600 mb-2">Your pace. Your language. Your subject.</p>
        <p className="text-sm text-gray-400">Built for students nobody built for.</p>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => navigate('/onboarding')}
        className="bg-teal-700 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-teal-800 mb-12"
      >
        Start Learning →
      </button>

      {/* 3 Value Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-2xl w-full">
        <div className="bg-white rounded-2xl p-5 shadow text-left">
          <div className="text-3xl mb-2">🌐</div>
          <p className="font-semibold text-gray-800">Learn in Hindi</p>
          <p className="text-sm text-gray-500 mt-1">
            Your AI tutor answers in your language — Hindi, Hinglish, or English
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow text-left">
          <div className="text-3xl mb-2">📶</div>
          <p className="font-semibold text-gray-800">Works Offline</p>
          <p className="text-sm text-gray-500 mt-1">
            No internet? Last 5 lessons still load from cache
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow text-left">
          <div className="text-3xl mb-2">📍</div>
          <p className="font-semibold text-gray-800">Nearby Opportunities</p>
          <p className="text-sm text-gray-500 mt-1">
            Finds free workshops and events near your city
          </p>
        </div>
      </div>

    </div>
  );
}