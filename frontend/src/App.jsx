import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import SidebarLayout from './components/SidebarLayout';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import TopicPage from './pages/TopicPage';
import ProfilePage from './pages/ProfilePage';
import OpportunitiesPage from './pages/OpportunitiesPage';

function ProtectedLayout() {
  const profile = localStorage.getItem('udaan_profile');
  if (!profile) return <Navigate to="/" replace />;
  return <SidebarLayout />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/app" element={<ProtectedLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:topic" element={<TopicPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="opportunities" element={<OpportunitiesPage />} />
        </Route>
        <Route path="/dashboard" element={<Navigate to="/app" replace />} />
      </Routes>
    </BrowserRouter>
  );
}