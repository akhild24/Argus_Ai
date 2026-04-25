import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, User, MapPin,
  LogOut, Menu, ChevronLeft, WifiOff, Rocket,
} from 'lucide-react';
import { clearAuth } from '../services/auth';

const navItems = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/app/courses', label: 'Courses', icon: BookOpen },
  { to: '/app/opportunities', label: 'Opportunities', icon: MapPin },
  { to: '/app/profile', label: 'Profile', icon: User },
];

function readSavedProfile() {
  try {
    return JSON.parse(localStorage.getItem('udaan_profile') || 'null');
  } catch {
    return null;
  }
}

export default function SidebarLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [profile, setProfile] = useState(readSavedProfile);

  useEffect(() => {
    const up = () => setIsOffline(false);
    const down = () => setIsOffline(true);
    window.addEventListener('online', up);
    window.addEventListener('offline', down);
    return () => { window.removeEventListener('online', up); window.removeEventListener('offline', down); };
  }, []);

  const refreshProfile = () => setProfile(readSavedProfile());

  return (
    <div className="u-shell">
      <aside className="u-sidebar" style={{ width: open ? 240 : 72 }}>
        <div className="u-sidebar-logo">
          {open && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div className="u-brand-mark"><Rocket size={14} color="white" /></div>
              <span style={{ fontWeight: 800, fontSize: 16, color: '#ffffff' }}>Udaan</span>
            </div>
          )}
          <button className="u-icon-btn" onClick={() => setOpen(!open)} aria-label="Toggle sidebar">
            {open ? <ChevronLeft size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {open && profile && (
          <div className="u-sidebar-profile">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div className="u-avatar">{profile.name?.[0]?.toUpperCase()}</div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#f0f0f5', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.name}</p>
                <p style={{ fontSize: 11, color: '#6b7280', textTransform: 'capitalize', margin: 0 }}>{profile.level}</p>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#6b7280', marginBottom: 4 }}>
                <span>Progress</span><span>{profile.progress}%</span>
              </div>
              <div className="u-progress-track">
                <div className="u-progress-fill" style={{ width: `${profile.progress}%` }} />
              </div>
            </div>
          </div>
        )}

        <nav className="u-sidebar-nav">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `u-nav-item ${isActive ? 'active' : ''}`}
              title={label}
            >
              <Icon size={17} style={{ flexShrink: 0 }} />
              {open && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="u-sidebar-bottom">
          {isOffline && open && (
            <div className="u-offline-pill">
              <WifiOff size={12} />
              <span>Offline - Cached</span>
            </div>
          )}
          <button className="u-nav-item danger" onClick={() => { clearAuth(); navigate('/'); }}>
            <LogOut size={16} style={{ flexShrink: 0 }} />
            {open && <span>Start Over</span>}
          </button>
        </div>
      </aside>

      <main className="u-main">
        <Outlet context={{ isOffline, profile, setProfile: refreshProfile }} />
      </main>
    </div>
  );
}
