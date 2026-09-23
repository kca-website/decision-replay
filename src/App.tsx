import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AppShell } from './components/layout/AppShell';
import { TeacherPrintStyles } from './components/TeacherPrintStyles';
import { Landing as LegacyLanding } from './pages/Landing';
import { LifeLanding } from './pages/LifeLanding';
import { ScenarioHub } from './pages/ScenarioHub';
import { ScenarioPlayer } from './pages/ScenarioPlayer';
import { TeacherSession } from './pages/TeacherSession';
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

const App = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isEnglish = i18n.language.startsWith('en');

  useEffect(() => {
    document.documentElement.lang = isEnglish ? 'en' : 'el';
  }, [isEnglish]);

  return (
    <>
      <TeacherPrintStyles />

      <Routes>
        <Route path="/" element={<LifeLanding />} />
        <Route path="/scenarios" element={<ScenarioHub />} />
        <Route path="/scenario/:id" element={<ScenarioPlayer />} />
        <Route path="/teacher" element={<TeacherSession />} />

        <Route path="/legacy" element={<LegacyLanding />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/app" element={<AppShell />}>
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

      {location.pathname === '/' && (
        <div className="fixed left-1/2 bottom-4 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-xl no-print">
          <Link
            to="/teacher"
            className="flex items-center justify-between gap-3 rounded-2xl bg-[#17233C] text-white px-4 py-3.5 shadow-lg border border-white/10 hover:bg-[#253453] transition-colors"
          >
            <span>
              <span className="block text-xs uppercase tracking-[0.1em] text-white/55 font-bold">
                {isEnglish ? 'Teacher mode' : 'Για εκπαιδευτικούς'}
              </span>
              <span className="block text-sm font-bold">
                {isEnglish ? 'Try the 10–15 min classroom session' : 'Δοκίμασε τη 10–15λεπτη δραστηριότητα τάξης'}
              </span>
            </span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </>
  );
};

export default App;
