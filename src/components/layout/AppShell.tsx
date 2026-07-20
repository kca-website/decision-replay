import { Link, NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { Home, LayoutDashboard, ClipboardList, Plus, Settings } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';

const Brand = () => (
  <div className="font-display text-lg font-medium flex items-center gap-2 px-4 py-2 mb-6">
    <span className="w-2.5 h-2.5 bg-accent rounded-full inline-block" />
    Decision Replay
  </div>
);

interface NavItem { to: string; label: string; icon: JSX.Element; }

const navItems = (t: TFunction): NavItem[] => [
  { to: '/', label: t('nav.home'), icon: <Home size={18} /> },
  { to: '/app', label: t('nav.dashboard'), icon: <LayoutDashboard size={18} /> },
  { to: '/app/decisions', label: t('nav.decisions'), icon: <ClipboardList size={18} /> },
  { to: '/app/decisions/new', label: t('nav.newDecision'), icon: <Plus size={18} /> },
  { to: '/app/settings', label: t('nav.settings'), icon: <Settings size={18} /> },
];

const NavItems = () => {
  const { t } = useTranslation();
  return (
    <>
      {navItems(t).map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/' || item.to === '/app'}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive ? 'bg-card text-ink shadow-xs border-l-[3px] border-l-accent pl-[13px]' : 'text-ink-muted hover:bg-card hover:text-ink'
            }`
          }
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}
    </>
  );
};

export const AppShell = () => {
  const { t } = useTranslation();
  const mobileItems = navItems(t).filter((item) => item.to !== '/app/decisions');

  return (
    <div className="min-h-screen bg-app md:grid md:grid-cols-[240px_1fr]">
      <aside className="hidden md:flex flex-col bg-subtle border-r p-4">
        <Link to="/" className="block hover:opacity-80 transition-opacity" aria-label={t('nav.home')}>
          <Brand />
        </Link>
        <nav className="flex flex-col gap-1" aria-label={t('nav.mainNavigation')}>
          <NavItems />
        </nav>
        <div className="mt-auto p-4 text-xs text-ink-subtle leading-relaxed">
          <LanguageToggle />
          <p className="mt-3">{t('shell.localData')}</p>
          <p className="mt-2">
            <a href="https://www.linkedin.com/in/kostaskoustas" target="_blank" rel="noopener noreferrer" className="text-ink-subtle hover:text-accent transition-colors">
              Built by Konstantinos Koustas
            </a>
          </p>
        </div>
      </aside>

      <main className="pb-24 md:pb-8">
        <Outlet />
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t z-40 flex" aria-label={t('nav.mobileNavigation')}>
        {mobileItems.map((item) => (
          <MobileNavItem key={item.to} to={item.to} icon={item.icon} label={item.label} />
        ))}
      </nav>
    </div>
  );
};

const MobileNavItem = ({ to, icon, label }: { to: string; icon: JSX.Element; label: string }) => (
  <NavLink
    to={to}
    end={to === '/' || to === '/app'}
    className={({ isActive }) =>
      `flex-1 flex flex-col items-center gap-1 py-3 px-1 transition-colors ${isActive ? 'text-accent' : 'text-ink-subtle'}`
    }
  >
    {icon}
    <span className="text-[11px] font-medium truncate max-w-full">{label}</span>
  </NavLink>
);
