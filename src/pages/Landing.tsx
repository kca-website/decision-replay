import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  Check,
  FlaskConical,
  Lock,
  PackageCheck,
  ShieldCheck,
  Target,
} from 'lucide-react';
import { LanguageToggle } from '../components/layout/LanguageToggle';

export const Landing = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-app text-ink">
      <header className="container-app py-5 flex items-center justify-between">
        <div className="font-display text-xl font-medium flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent rounded-full inline-block" />
          {t('brand')}
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <a href="#demo" className="text-sm text-ink-muted hover:text-ink hidden md:inline">{t('landing.navDemo')}</a>
          <Link to="/about" className="text-sm text-ink-muted hover:text-ink hidden sm:inline">{t('nav.about')}</Link>
          <LanguageToggle />
        </div>
      </header>

      <main>
        <section className="container-app pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-10 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent mb-5">
                <Target size={15} /> {t('landing.eyebrow')}
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.08] font-normal mb-6 max-w-3xl">
                {t('landing.heroTitle1')}{' '}
                <em className="italic text-accent">{t('landing.heroTitle2')}</em>
              </h1>
              <p className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-2xl mb-8">
                {t('landing.heroSub')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link
                  to="/app/decisions/new"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white text-base px-7 py-3.5 rounded-md font-medium hover:bg-accent-hover transition-colors"
                >
                  {t('landing.ctaStart')} <ArrowRight size={18} />
                </Link>
                <a
                  href="#demo"
                  className="inline-flex items-center justify-center gap-2 bg-card border border-border-strong text-ink text-base px-7 py-3.5 rounded-md font-medium hover:bg-subtle transition-colors"
                >
                  {t('landing.ctaDemo')}
                </a>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-subtle">
                <Trust text={t('landing.trust1')} />
                <Trust text={t('landing.trust2')} />
                <Trust text={t('landing.trust3')} />
              </div>
            </div>

            <div className="bg-card border rounded-xl shadow-lg p-5 md:p-7" aria-label={t('landing.heroCardAria')}>
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <div className="text-xs uppercase tracking-wider text-ink-muted font-medium">{t('landing.heroCardLabel')}</div>
                  <h2 className="font-display text-xl md:text-2xl mt-1">{t('landing.demoDecisionTitle')}</h2>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-success bg-success/10 px-2.5 py-1.5 rounded-full">
                  <Lock size={13} /> {t('landing.locked')}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                <MiniField label={t('landing.demoChoiceLabel')} value={t('landing.demoChoice')} />
                <MiniField label={t('landing.demoPredictionLabel')} value={t('landing.demoPrediction')} />
              </div>
              <div className="mt-4 pt-4 border-t flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-ink-muted">{t('landing.demoConfidenceLabel')}</div>
                  <div className="font-display text-3xl text-accent font-medium">70%</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-ink-muted">{t('landing.demoReplayLabel')}</div>
                  <div className="font-medium">{t('landing.demoReplayDate')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="demo" className="bg-subtle py-16 md:py-24 scroll-mt-6">
          <div className="container-app max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-accent mb-3">{t('landing.demoEyebrow')}</div>
              <h2 className="font-display text-3xl md:text-4xl mb-4">{t('landing.demoTitle')}</h2>
              <p className="text-ink-muted text-lg">{t('landing.demoSub')}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <DemoCard
                tone="then"
                label={t('comparison.then')}
                date={t('landing.demoThenDate')}
                fields={[
                  [t('landing.demoChoiceLabel'), t('landing.demoChoice')],
                  [t('landing.demoReasonLabel'), t('landing.demoReason')],
                  [t('landing.demoPredictionLabel'), t('landing.demoPrediction')],
                  [t('landing.demoConfidenceLabel'), '70%'],
                ]}
              />
              <DemoCard
                tone="now"
                label={t('comparison.now')}
                date={t('landing.demoNowDate')}
                fields={[
                  [t('landing.demoOutcomeLabel'), t('landing.demoOutcome')],
                  [t('landing.demoMatchLabel'), t('landing.demoMatch')],
                  [t('landing.demoLessonLabel'), t('landing.demoLesson')],
                ]}
              />
            </div>

            <div className="mt-8 text-center">
              <Link to="/app/decisions/new" className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent-hover">
                {t('landing.demoCta')} <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section className="container-app py-16 md:py-24 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl mb-4">{t('landing.howTitle')}</h2>
            <p className="text-ink-muted text-lg">{t('landing.howSub')}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Step icon={<Lock size={22} />} number="01" title={t('landing.step1Title')} desc={t('landing.step1Desc')} />
            <Step icon={<CalendarClock size={22} />} number="02" title={t('landing.step2Title')} desc={t('landing.step2Desc')} />
            <Step icon={<BarChart3 size={22} />} number="03" title={t('landing.step3Title')} desc={t('landing.step3Desc')} />
          </div>
        </section>

        <section className="border-y bg-card py-16 md:py-20">
          <div className="container-app max-w-5xl">
            <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-10 items-start">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-accent mb-3">{t('landing.forWhoEyebrow')}</div>
                <h2 className="font-display text-3xl md:text-4xl mb-4">{t('landing.forWho')}</h2>
                <p className="text-ink-muted text-lg">{t('landing.forWhoSub')}</p>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <UseCase icon={<FlaskConical size={20} />} title={t('landing.useCase1Title')} desc={t('landing.useCase1Desc')} />
                <UseCase icon={<PackageCheck size={20} />} title={t('landing.useCase2Title')} desc={t('landing.useCase2Desc')} />
                <UseCase icon={<ShieldCheck size={20} />} title={t('landing.useCase3Title')} desc={t('landing.useCase3Desc')} />
              </div>
            </div>
          </div>
        </section>

        <section className="container-read py-16 md:py-20 text-center">
          <ShieldCheck size={28} className="text-success mx-auto mb-4" />
          <h2 className="font-display text-3xl mb-4">{t('landing.privacyTitle')}</h2>
          <p className="text-ink-muted text-lg mb-7">{t('landing.privacySub')}</p>
          <Link to="/app/decisions/new" className="inline-flex items-center justify-center gap-2 bg-accent text-white px-7 py-3.5 rounded-md font-medium hover:bg-accent-hover transition-colors">
            {t('landing.ctaStart')} <ArrowRight size={18} />
          </Link>
        </section>
      </main>

      <footer className="border-t py-10 text-center text-sm text-ink-subtle">
        {t('landing.footerLicense')}
        <div className="mt-3 flex flex-wrap justify-center gap-4">
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

const Trust = ({ text }: { text: string }) => (
  <span className="inline-flex items-center gap-1.5"><Check size={14} className="text-success" />{text}</span>
);

const MiniField = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-subtle rounded-lg p-3.5">
    <div className="text-xs text-ink-muted mb-1">{label}</div>
    <div className="text-sm font-medium leading-snug">{value}</div>
  </div>
);

const DemoCard = ({
  tone,
  label,
  date,
  fields,
}: {
  tone: 'then' | 'now';
  label: string;
  date: string;
  fields: Array<[string, string]>;
}) => (
  <article className={`rounded-xl border p-6 md:p-8 ${tone === 'then' ? 'bg-card' : 'bg-[#FFFDF9] border-accent-soft'}`}>
    <div className={`text-xs uppercase tracking-[0.18em] font-semibold mb-1 ${tone === 'then' ? 'text-ink-muted' : 'text-accent'}`}>{label}</div>
    <div className="text-xs text-ink-subtle mb-6">{date}</div>
    <div className="space-y-5">
      {fields.map(([fieldLabel, value]) => (
        <div key={fieldLabel}>
          <div className="text-xs text-ink-muted font-medium mb-1.5">{fieldLabel}</div>
          <p className="leading-relaxed">{value}</p>
        </div>
      ))}
    </div>
  </article>
);

const Step = ({ icon, number, title, desc }: { icon: JSX.Element; number: string; title: string; desc: string }) => (
  <div className="relative bg-card border rounded-xl p-6 shadow-xs">
    <div className="flex items-center justify-between mb-5">
      <div className="w-11 h-11 rounded-lg bg-accent-soft flex items-center justify-center text-accent">{icon}</div>
      <span className="font-display text-2xl text-ink-subtle/60">{number}</span>
    </div>
    <h3 className="font-display text-2xl font-medium mb-3">{title}</h3>
    <p className="text-ink-muted">{desc}</p>
  </div>
);

const UseCase = ({ icon, title, desc }: { icon: JSX.Element; title: string; desc: string }) => (
  <div className="bg-app border rounded-lg p-5">
    <div className="w-10 h-10 rounded-md bg-accent-soft text-accent flex items-center justify-center mb-4">{icon}</div>
    <h3 className="font-sans text-base font-semibold mb-2">{title}</h3>
    <p className="text-sm text-ink-muted">{desc}</p>
  </div>
);
