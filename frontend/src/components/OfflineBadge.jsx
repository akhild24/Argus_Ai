export default function OfflineBadge({ isOffline }) {
    if (!isOffline) return null;
    return (
      <div className="bg-orange-100 border border-orange-300 text-orange-700 px-3 py-1 rounded-full text-sm inline-flex items-center gap-1">
        📶 Offline Mode — Cached Content
      </div>
    );
  }