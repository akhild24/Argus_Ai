import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildProfile } from '../utils/profileLogic';

const TOTAL_STEPS = 6;

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    style: '',
    level: '',
    language: '',
    experience: '',
    city: '',
  });

  const set = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const next = () => setStep((s) => s + 1);

  const finish = (lastKey, lastValue) => {
    const finalData = { ...formData, [lastKey]: lastValue };
    const profile = buildProfile(finalData);
    localStorage.setItem('udaan_profile', JSON.stringify(profile));
    navigate('/dashboard');
  };

  const progress = Math.round(((step - 1) / TOTAL_STEPS) * 100);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#f7f6f2]">
      <div className="w-full max-w-md">

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Step {step} of {TOTAL_STEPS}</span>
            <span>{progress}% done</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-teal-700 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-8">

          {/* Step 1 — Name */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-1">Hi! What's your name?</h2>
              <p className="text-gray-500 text-sm mb-5">
                So we can personalise your experience
              </p>
              <input
                className="w-full border-2 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-teal-500"
                placeholder="e.g. Ravi"
                value={formData.name}
                onChange={(e) => set('name', e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && formData.name && next()}
              />
              <button
                onClick={next}
                disabled={!formData.name.trim()}
                className="mt-5 w-full bg-teal-700 text-white py-3 rounded-xl font-semibold disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          )}

          {/* Step 2 — Subject */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-1">What do you want to study?</h2>
              <p className="text-gray-500 text-sm mb-5">Choose your main subject</p>
              {[
                { value: 'python', label: '🐍 Python Programming' },
                { value: 'data_science', label: '📊 Data Science' },
                { value: 'govt_exam', label: '📋 Government Exam Prep' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { set('subject', opt.value); next(); }}
                  className="w-full mb-3 border-2 rounded-xl py-3 px-4 text-left font-medium hover:border-teal-600 hover:bg-teal-50"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Step 3 — Learning Style */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-1">How do you like to learn?</h2>
              <p className="text-gray-500 text-sm mb-4">
                Pick the explanation that feels clearer to you:
              </p>
              <div
                onClick={() => { set('style', 'definition'); next(); }}
                className="mb-3 p-4 border-2 rounded-xl cursor-pointer hover:border-teal-600 hover:bg-teal-50"
              >
                <p className="font-semibold">Option A — Definition first</p>
                <p className="text-sm text-gray-500 mt-1">
                  "A variable stores a value, like x = 5"
                </p>
              </div>
              <div
                onClick={() => { set('style', 'example'); next(); }}
                className="p-4 border-2 rounded-xl cursor-pointer hover:border-teal-600 hover:bg-teal-50"
              >
                <p className="font-semibold">Option B — Example first</p>
                <p className="text-sm text-gray-500 mt-1">
                  "Think of a variable like a box — you label it and put something in it"
                </p>
              </div>
            </div>
          )}

          {/* Step 4 — Level Check */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-1">Quick check — what does a for loop do?</h2>
              <p className="text-gray-500 text-sm mb-4">
                No pressure — this just sets your level
              </p>
              {[
                { value: 'beginner', label: '🤷 I have no idea' },
                { value: 'intermediate', label: '🙂 It repeats code a number of times' },
                { value: 'advanced', label: '💡 It iterates over an iterable and executes a block each time' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { set('level', opt.value); next(); }}
                  className="w-full mb-3 border-2 rounded-xl py-3 px-4 text-left hover:border-teal-600 hover:bg-teal-50"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Step 5 — Language */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold mb-1">Which language do you prefer?</h2>
              <p className="text-gray-500 text-sm mb-4">
                Your AI tutor will respond in this language
              </p>
              {['English', 'Hindi', 'Hinglish'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => { set('language', lang); next(); }}
                  className="w-full mb-3 border-2 rounded-xl py-3 px-4 text-left font-medium hover:border-teal-600 hover:bg-teal-50"
                >
                  {lang === 'English' && '🇬🇧 '}
                  {lang === 'Hindi' && '🇮🇳 '}
                  {lang === 'Hinglish' && '🤝 '}
                  {lang}
                </button>
              ))}
            </div>
          )}

          {/* Step 6 — Experience + City */}
          {step === 6 && (
            <div>
              <h2 className="text-2xl font-bold mb-1">What do you do outside college?</h2>
              <p className="text-gray-500 text-sm mb-2">Helps us find your hidden strengths</p>

              {/* City input */}
              <input
                className="w-full border-2 rounded-xl px-4 py-2 text-sm mb-4 focus:outline-none focus:border-teal-500"
                placeholder="Your city (e.g. Indore, Bhopal, Ujjain)"
                value={formData.city}
                onChange={(e) => set('city', e.target.value)}
              />

              {[
                { value: 'delivery', label: '🛵 Delivery work' },
                { value: 'farming', label: '🌾 Farming' },
                { value: 'shop', label: '🏪 Family shop / business' },
                { value: 'other', label: '💡 Other' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => finish('experience', opt.value)}
                  className="w-full mb-3 border-2 rounded-xl py-3 px-4 text-left hover:border-teal-600 hover:bg-teal-50"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}