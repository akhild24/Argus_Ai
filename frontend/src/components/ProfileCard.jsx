export default function ProfileCard({ profile }) {
    if (!profile) return null;
  
    return (
      <div className="bg-white rounded-2xl shadow p-5 border border-gray-100">
        <h2 className="text-lg font-bold mb-3">🧠 {profile.name}'s Learning Profile</h2>
        <div className="space-y-1 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Subject:</span>{' '}
            {profile.subject === 'python' && '🐍 Python Programming'}
            {profile.subject === 'data_science' && '📊 Data Science'}
            {profile.subject === 'govt_exam' && '📋 Government Exam Prep'}
          </p>
          <p>
            <span className="font-semibold">Style:</span>{' '}
            {profile.style === 'example' ? 'Example-first learner' : 'Definition-first learner'}
          </p>
          <p>
            <span className="font-semibold">Level:</span>{' '}
            {profile.level.charAt(0).toUpperCase() + profile.level.slice(1)}
          </p>
          <p>
            <span className="font-semibold">Language:</span> {profile.language}
          </p>
          <p>
            <span className="font-semibold">Hidden Strength:</span> {profile.hiddenSkill}
          </p>
        </div>
  
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{profile.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-teal-600 h-3 rounded-full"
              style={{ width: `${profile.progress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }