import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import ChatBox from '../components/ChatBox';
import QuizCard from '../components/QuizCard';
import SocialExposureCard from '../components/SocialExposureCard';

const courseTopics = {
  python: ['Variables', 'Loops', 'Functions', 'Lists', 'If Else'],
  data_science: ['What is Data', 'Mean Median Mode', 'CSV Files', 'Intro to ML'],
  govt_exam: ['Current Affairs', 'Reasoning Basics', 'Grammar', 'Quant Basics'],
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [showExposure, setShowExposure] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const saved = localStorage.getItem('udaan_profile');
    if (!saved) { navigate('/'); return; }
    setProfile(JSON.parse(saved));

    const goOnline = () => setIsOffline(false);
    const goOffline = () => setIsOffline(true);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  const refreshProfile = () => {
    const saved = localStorage.getItem('udaan_profile');
    if (saved) setProfile(JSON.parse(saved));
  };

  const handleTopicSelect = (t) => {
    setSelectedTopic(t);
    setShowQuiz(false);
    setShowExposure(false);
  };

  const handleExplained = () => {
    setShowQuiz(true);
  };

  const handlePass = () => {
    setShowExposure(true);
    refreshProfile();
  };

  const topics = profile ? courseTopics[profile.subject] || [] : [];

  return (
    <div className="min-h-screen bg-[#f7f6f2]">
      <Navbar isOffline={isOffline} />

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">

        {/* Profile Card */}
        <ProfileCard profile={profile} />

        {/* Topic Selector */}
        <div className="bg-white rounded-2xl shadow p-5">
          <h3 className="font-bold text-gray-800 mb-3">📚 Choose a Topic</h3>
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => handleTopicSelect(t)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border-2 ${
                  selectedTopic === t
                    ? 'bg-teal-700 text-white border-teal-700'
                    : 'border-gray-200 hover:border-teal-500 bg-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* ChatBox — shows after topic selected */}
        {selectedTopic && (
          <ChatBox
            topic={selectedTopic}
            onExplained={handleExplained}
          />
        )}

        {/* QuizCard — shows after first explanation */}
        {showQuiz && selectedTopic && (
          <QuizCard
            topic={selectedTopic}
            onPass={handlePass}
          />
        )}

        {/* Social Exposure — shows after quiz pass */}
        {showExposure && (
          <SocialExposureCard profile={profile} />
        )}

      </div>
    </div>
  );
}