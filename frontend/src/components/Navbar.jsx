import OfflineBadge from './OfflineBadge';

export default function Navbar({ isOffline }) {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-teal-800">🚀 Udaan</h1>
      <OfflineBadge isOffline={isOffline} />
    </nav>
  );
}