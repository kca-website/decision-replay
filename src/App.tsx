import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useProfile } from './store/profileStore';
import { AppShell } from './components/layout/AppShell';
import { Landing } from './pages/Landing';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { DecisionsList } from './pages/DecisionsList';
import { NewDecision } from './pages/NewDecision';
import { DecisionDetail } from './pages/DecisionDetail';
import { ReplayFlow } from './pages/ReplayFlow';
import { Comparison } from './pages/Comparison';
import { Settings } from './pages/Settings';
import { Challenge } from './pages/Challenge';

const AppRoot = () => {
  const { hasOnboarded } = useProfile();
  if (!hasOnboarded) return <Navigate to="/onboarding" replace />;
  return <AppShell />;
};

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language.startsWith('en') ? 'en' : 'el';
  }, [i18n.language]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/challenge" element={<Challenge />} />
      <Route path="/app" element={<AppRoot />}>
        <Route index element={<Dashboard />} />
        <Route path="decisions" element={<DecisionsList />} />
        <Route path="decisions/new" element={<NewDecision />} />
        <Route path="decisions/:id" element={<DecisionDetail />} />
        <Route path="decisions/:id/replay" element={<ReplayFlow />} />
        <Route path="decisions/:id/compare" element={<Comparison />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
