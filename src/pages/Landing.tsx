import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Lock, Clock, TrendingUp, Check, Briefcase, BookOpen, Compass } from 'lucide-react';
import { LanguageToggle } from '../components/layout/LanguageToggle';

export const Landing = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-app text-ink">
      {/* Nav */}
      <header className="container-app py-5 flex items-center justify-between">
        <div className="font-display text-xl font-medium flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent rounded-full inline-block" />
          {t('brand')}
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/about" className="text-sm text-ink-muted hover:text-ink hidden sm:inline">{t('nav.about')}</Link>
          <LanguageToggle />
        </div>
      </header>

      {/* Hero */}
      <section className="container-app pt-16 pb-20 md:pt-24 md:pb-24 text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight font-normal mb-5 max-w-3xl mx-auto">
          {t('landing.heroTitle1')}<br />
          <em className="italic text-accent">{t('landing.heroTitle2')}</em>
        </h1>
        <p className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-2xl mx-auto mb-10">
          {t('landing.heroSub')}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Link
            to="/app"
            className="inline-flex items-center justify-center gap-2 bg-accent text-white text-base px-7 py-3.5 rounded-md font-medium hover:bg-accent-hover transition-colors"
          >
            {t('landing.ctaStart')} <ArrowRight size={18} />
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-ink-subtle">
          <span className="inline-flex items-center gap-2"><Check size={14} className="text-success" />{t('landing.trust1')}</span>
          <span className="inline-flex items-center gap-2"><Check size={14} className="text-success" />{t('landing.trust2')}</span>
          <span className="inline-flex items-center gap-2"><Check size={14} className="text-success" />{t('landing.trust3')}</span>
        </div>
      </section>

      {/* 3 steps */}
      <section className="bg-subtle py-16 md:py-20">
        <div className="container-app grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          <Step icon={<Lock size={22} />} title={t('landing.step1Title')} desc={t('landing.step1Desc')} />
          <Step icon={<Clock size={22} />} title={t('landing.step2Title')} desc={t('landing.step2Desc')} />
          <Step icon={<TrendingUp size={22} />} title={t('landing.step3Title')} desc={t('landing.step3Desc')} />
        </div>
      </section>

      {/* Profiles */}
      <section className="container-app py-16 md:py-20 max-w-4xl">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-10">{t('landing.forWho')}</h2>
        <div className="grid gap-5 md:grid-cols-3">
          <ProfileCard icon={<Briefcase size={20} />} title={t('landing.profileProfTitle')} desc={t('landing.profileProfDesc')} />
          <ProfileCard icon={<BookOpen size={20} />} title={t('landing.profileStudentTitle')} desc={t('landing.profileStudentDesc')} />
          <ProfileCard icon={<Compass size={20} />} title={t('landing.profilePersonalTitle')} desc={t('landing.profilePersonalDesc')} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 text-center text-sm text-ink-subtle">
        {t('landing.footerLicense')}<br />
        <div className="mt-3 flex justify-center gap-4">
          <Link to="/about" className="text-ink-muted hover:text-ink">{t('nav.about')}</Link>
          <Link to="/privacy" className="text-ink-muted hover:text-ink">{t('nav.privacy')}</Link>
       <a href="https://github.com/kca-website/decision-replay" target="_blank" rel="noopener noreferrer" className="text-ink-muted hover:text-ink">{t('nav.github')}</a>
        </div>
        <p className="mt-4">
          <a href="https://www.linkedin.com/in/kostaskoustas" target="_blank" rel="noopener noreferrer" className="text-ink-muted hover:text-accent transition-colors">
            Built by Konstantinos Koustas
          </a>
        </p>
      </footer>
    </div>
  );
};

const Step = ({ icon, title, desc }: { icon: JSX.Element; title: string; desc: string }) => (
  <div>
    <div className="w-12 h-12 rounded-lg bg-card flex items-center justify-center text-accent mb-5 shadow-xs">
      {icon}
    </div>
    <h3 className="font-display text-2xl font-medium mb-3">{title}</h3>
    <p className="text-ink-muted">{desc}</p>
  </div>
);

const ProfileCard = ({ icon, title, desc }: { icon: JSX.Element; title: string; desc: string }) => (
  <div className="bg-card border rounded-lg p-6 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
    <div className="w-10 h-10 rounded-md bg-accent-soft text-accent flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="font-sans text-base font-semibold mb-2">{title}</h3>
    <p className="text-sm text-ink-muted">{desc}</p>
  </div>
);
