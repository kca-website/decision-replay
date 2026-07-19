import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, ClipboardList, Plus, Settings } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';

const Brand = () => (
  <div className="font-display text-lg font-medium flex items-center gap-2 px-4 py-2 mb-6">
    <span className="w-2.5 h-2.5 bg-accent rounded-full inline-block" />
    Decision Replay
  </div>
);

interface NavItem { to: string; label: string; icon: JSX.Element; }

const NavItems = () => {
  const { t } = useTranslation();
  const items: NavItem[] = [
    { to: '/app', label: t('nav.dashboard'), icon: <LayoutDashboard size={18} /> },
    { to: '/app/decisions', label: t('nav.decisions'), icon: <ClipboardList size={18} /> },
    { to: '/app/decisions/new', label: t('nav.newDecision'), icon: <Plus size={18} /> },
    { to: '/app/settings', label: t('nav.settings'), icon: <Settings size={18} /> },
  ];

  return (
    <>
      {items.map((it) => (
        <NavLink
          key={it.to}
          to={it.to}
          end={it.to === '/app'}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive ? 'bg-card text-ink shadow-xs border-l-[3px] border-l-accent pl-[13px]' : 'text-ink-muted hover:bg-card hover:text-ink'
            }`
          }
        >
          {it.icon}
          {it.label}
        </NavLink>
      ))}
    </>
  );
};

export const AppShell = () => {
  return (
    <div className="min-h-screen bg-app md:grid md:grid-cols-[240px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col bg-subtle border-r p-4">
      <a href="/" className="block hover:opacity-80 transition-opacity">
          <Brand />
        </a>
        <nav className="flex flex-col gap-1">
          <NavItems />
        </nav>
        <div className="mt-auto p-4 text-xs text-ink-subtle leading-relaxed">
          <LanguageToggle />
        <p className="mt-3">Δεδομένα μόνο στη συσκευή σου.</p>
          <p className="mt-2">
            <a href="https://www.linkedin.com/in/konstantinos-koustas/" target="_blank" rel="noopener noreferrer" className="text-ink-subtle hover:text-accent transition-colors">
              Built by Konstantinos Koustas
            </a>
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="pb-24 md:pb-8">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t z-40 flex">
        <MobileNavItem to="/app" icon={<LayoutDashboard size={20} />} label="Home" />
        <MobileNavItem to="/app/decisions/new" icon={<Plus size={20} />} label="New" />
        <MobileNavItem to="/app/settings" icon={<Settings size={20} />} label="Settings" />
      </nav>
    </div>
  );
};

const MobileNavItem = ({ to, icon, label }: { to: string; icon: JSX.Element; label: string }) => (
  <NavLink
    to={to}
    end={to === '/app'}
    className={({ isActive }) =>
      `flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
        isActive ? 'text-accent' : 'text-ink-subtle'
      }`
    }
  >
    {icon}
    <span className="text-[11px] font-medium">{label}</span>
  </NavLink>
);
