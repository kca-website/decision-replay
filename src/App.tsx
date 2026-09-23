import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TeacherPrintStyles } from './components/TeacherPrintStyles';
import { LifeLanding } from './pages/LifeLanding';
import { ScenarioHub } from './pages/ScenarioHub';
import { ScenarioPlayer } from './pages/ScenarioPlayer';
import { TeacherSession } from './pages/TeacherSession';
import { Privacy } from './pages/Privacy';

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
        <Route path="/privacy" element={<Privacy />} />

        <Route path="/legacy" element={<Navigate to="/" replace />} />
        <Route path="/app/*" element={<Navigate to="/" replace />} />
        <Route path="/onboarding" element={<Navigate to="/" replace />} />
        <Route path="/challenge" element={<Navigate to="/" replace />} />
        <Route path="/about" element={<Navigate to="/" replace />} />
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
                {isEnglish ? 'Run a 15-minute classroom scenario' : 'Τρέξε 15λεπτο σενάριο στην τάξη'}
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
