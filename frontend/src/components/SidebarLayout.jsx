import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, User, MapPin,
  LogOut, Menu, ChevronLeft, WifiOff, Rocket,
} from 'lucide-react';

const navItems = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/app/courses', label: 'My Courses', icon: BookOpen },
  { to: '/app/opportunities', label: 'Opportunities', icon: MapPin },
  { to: '/app/profile', label: 'Profile', icon: User },
];

export default function SidebarLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('udaan_profile');
    if (saved) setProfile(JSON.parse(saved));
    const up = () => setIsOffline(false);
    const down = () => setIsOffline(true);
    window.addEventListener('online', up);
    window.addEventListener('offline', down);
    return () => { window.removeEventListener('online', up); window.removeEventListener('offline', down); };
  }, []);

  const refreshProfile = () => {
    const saved = localStorage.getItem('udaan_profile');
    if (saved) setProfile(JSON.parse(saved));
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0a0a0f' }}>

      {/* Sidebar */}
      <aside
        style={{
          width: open ? '240px' : '64px',
          background: 'rgba(255,255,255,0.03)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          transition: 'width 0.25s ease',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Logo */}
       
<div style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'space-between' : 'center',
  padding: '20px 16px',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
}}>
  {open && (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: 'linear-gradient(135deg, #0d9488, #0f766e)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Rocket size={14} color="white" />
      </div>
      <span style={{ fontWeight: 700, fontSize: 16, color: '#ffffff' }}>Udaan</span>
    </div>
  )}
  <button
    onClick={() => setOpen(!open)}
    style={{
      color: '#6b7280', background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      cursor: 'pointer', padding: '6px', borderRadius: 8,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
  >
    {open ? <ChevronLeft size={16} /> : <Menu size={16} />}
  </button>
</div>
        {/* Profile mini */}
        {open && profile && (
          <div
            style={{
              margin: '12px',
              padding: '12px',
              borderRadius: '12px',
              background: 'rgba(13,148,136,0.08)',
              border: '1px solid rgba(13,148,136,0.15)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0d9488, #7c3aed)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, color: 'white', flexShrink: 0,
                }}
              >
                {profile.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f5' }}>{profile.name}</p>
                <p style={{ fontSize: 11, color: '#6b7280', textTransform: 'capitalize' }}>{profile.level}</p>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#6b7280', marginBottom: 4 }}>
                <span>Progress</span><span>{profile.progress}%</span>
              </div>
              <div style={{ width: '100%', background: 'rgba(255,255,255,0.08)', borderRadius: 99, height: 4 }}>
                <div style={{ width: `${profile.progress}%`, height: 4, borderRadius: 99, background: 'linear-gradient(90deg, #0d9488, #7c3aed)' }} />
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, padding: '8px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: open ? '10px 12px' : '10px',
                justifyContent: open ? 'flex-start' : 'center',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 500,
                textDecoration: 'none',
                color: isActive ? '#ffffff' : '#6b7280',
                background: isActive ? 'rgba(13,148,136,0.15)' : 'transparent',
                border: isActive ? '1px solid rgba(13,148,136,0.25)' : '1px solid transparent',
              })}
            >
              <Icon size={17} style={{ flexShrink: 0 }} />
              {open && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '8px 8px 16px' }}>
          {isOffline && open && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 12px', borderRadius: 10, marginBottom: 6,
              background: 'rgba(234,88,12,0.1)', border: '1px solid rgba(234,88,12,0.2)',
              fontSize: 11, color: '#fb923c',
            }}>
              <WifiOff size={12} />
              <span>Offline — Cached</span>
            </div>
          )}
          <button
            onClick={() => { localStorage.removeItem('udaan_profile'); navigate('/'); }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: open ? '10px 12px' : '10px',
              justifyContent: open ? 'flex-start' : 'center',
              borderRadius: 10, fontSize: 13, fontWeight: 500,
              color: '#ef4444', background: 'transparent',
              border: '1px solid transparent', cursor: 'pointer', width: '100%',
            }}
          >
            <LogOut size={16} style={{ flexShrink: 0 }} />
            {open && <span>Start Over</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet context={{ isOffline, profile, setProfile: refreshProfile }} />
      </main>
    </div>
  );
}