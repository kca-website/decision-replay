import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, BrainCircuit, Clock3, Users, Wifi } from 'lucide-react';
import { LanguageToggle } from '../components/layout/LanguageToggle';
import { ScenarioVisual } from '../components/ScenarioVisual';
import {
  categoryMeta,
  lifeScenarios,
  type LifeLocale,
  type ScenarioCategory,
} from '../data/lifeScenarios';

type AgeBand = 'all' | '10-12' | '13-15';

const labels = {
  el: {
    back: 'Αρχική',
    eyebrow: 'Διάλεξε την επόμενη πρόβα',
    title: 'Τι θα έκανες αν σου συνέβαινε τώρα;',
    sub: 'Ρεαλιστικές καταστάσεις για ηλικίες 10–15. Διάλεξε ηλικιακή ζώνη και θέμα, μπες στη στιγμή και δοκίμασε περισσότερες από μία επιλογές.',
    all: 'Όλα',
    ageGroup: 'Ηλικιακή ζώνη',
    allAges: 'Όλες 10–15',
    younger: '10–12',
    teens: '13–15',
    topics: 'Θέμα',
    age: 'ηλικίες',
    minutes: 'λεπτά',
    play: 'Μπες στην ιστορία',
    results: 'ιστορίες',
  },
  en: {
    back: 'Home',
    eyebrow: 'Choose your next rehearsal',
    title: 'What would you do if it happened right now?',
    sub: 'Realistic situations for ages 10–15. Choose an age band and topic, step into the moment and try more than one response.',
    all: 'All',
    ageGroup: 'Age band',
    allAges: 'All 10–15',
    younger: '10–12',
    teens: '13–15',
    topics: 'Topic',
    age: 'ages',
    minutes: 'min',
    play: 'Enter the story',
    results: 'stories',
  },
} as const;

const icons: Record<ScenarioCategory, JSX.Element> = {
  internet: <Wifi size={18} />,
  ai: <BrainCircuit size={18} />,
  friends: <Users size={18} />,
};

const categoryClasses: Record<ScenarioCategory, { pill: string; border: string }> = {
  internet: { pill: 'bg-[#E0F2FE] text-[#0369A1]', border: 'border-t-[#38BDF8]' },
  ai: { pill: 'bg-[#EDE9FE] text-[#6D28D9]', border: 'border-t-[#8B5CF6]' },
  friends: { pill: 'bg-[#ECFCCB] text-[#4D7C0F]', border: 'border-t-[#A3E635]' },
};

export const ScenarioHub = () => {
  const { i18n } = useTranslation();
  const lang: LifeLocale = i18n.language.startsWith('en') ? 'en' : 'el';
  const c = labels[lang];
  const [categoryFilter, setCategoryFilter] = useState<'all' | ScenarioCategory>('all');
  const [ageFilter, setAgeFilter] = useState<AgeBand>('all');

  const scenarios = lifeScenarios.filter((scenario) => {
    const categoryMatch = categoryFilter === 'all' || scenario.category === categoryFilter;
    const ageMatch =
      ageFilter === 'all' ||
      (ageFilter === '10-12' && scenario.minAge === 10 && scenario.maxAge === 12) ||
      (ageFilter === '13-15' && scenario.minAge === 13 && scenario.maxAge === 15);
    return categoryMatch && ageMatch;
  });

  return (
    <div className="min-h-screen bg-app text-ink">
      <header className="container-app py-5 flex items-center justify-between gap-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-ink">
          <ArrowLeft size={16} /> {c.back}
        </Link>
        <LanguageToggle />
      </header>

      <main className="container-app pb-20">
        <div className="max-w-3xl pt-8 md:pt-14 mb-8">
          <div className="inline-flex bg-white border rounded-full px-3 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-accent mb-4">
            {c.eyebrow}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{c.title}</h1>
          <p className="text-lg text-ink-muted leading-relaxed">{c.sub}</p>
        </div>

        <section className="bg-white border rounded-2xl p-4 md:p-5 mb-8 shadow-xs">
          <div className="mb-4">
            <div className="text-xs uppercase tracking-[0.12em] font-extrabold text-ink-subtle mb-2">{c.ageGroup}</div>
            <div className="flex flex-wrap gap-2">
              <FilterButton active={ageFilter === 'all'} onClick={() => setAgeFilter('all')} label={c.allAges} />
              <FilterButton active={ageFilter === '10-12'} onClick={() => setAgeFilter('10-12')} label={c.younger} />
              <FilterButton active={ageFilter === '13-15'} onClick={() => setAgeFilter('13-15')} label={c.teens} />
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.12em] font-extrabold text-ink-subtle mb-2">{c.topics}</div>
            <div className="flex flex-wrap gap-2">
              <FilterButton active={categoryFilter === 'all'} onClick={() => setCategoryFilter('all')} label={c.all} />
              {(Object.keys(categoryMeta) as ScenarioCategory[]).map((category) => (
                <FilterButton
                  key={category}
                  active={categoryFilter === category}
                  onClick={() => setCategoryFilter(category)}
                  label={categoryMeta[category].label[lang]}
                  icon={icons[category]}
                />
              ))}
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="text-sm font-bold text-ink-muted">
            {scenarios.length} {c.results}
          </div>
          <div className="text-xs text-ink-subtle">
            {lifeScenarios.length} {c.results} · 9 × 10–12 · 9 × 13–15
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {scenarios.map((scenario) => {
            const palette = categoryClasses[scenario.category];

            return (
              <article
                key={scenario.id}
                className={`bg-white border border-t-4 ${palette.border} rounded-2xl overflow-hidden flex flex-col shadow-sm`}
              >
                <div className="p-3 pb-0">
                  <ScenarioVisual visual={scenario.visual} compact />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className={`inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.09em] px-3 py-1.5 rounded-full ${palette.pill}`}>
                      {icons[scenario.category]}
                      {categoryMeta[scenario.category].label[lang]}
                    </span>
                    <span className="text-xs font-medium text-ink-subtle inline-flex items-center gap-1">
                      <Clock3 size={13} /> {scenario.minutes} {c.minutes}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-extrabold mb-2">{scenario.title[lang]}</h2>
                  <p className="text-ink-muted leading-relaxed mb-5 flex-1">{scenario.teaser[lang]}</p>

                  <div className="text-xs font-bold text-ink-subtle mb-4">
                    {c.age} {scenario.minAge}–{scenario.maxAge}
                  </div>

                  <Link
                    to={`/scenario/${scenario.id}`}
                    className="inline-flex items-center justify-between gap-2 bg-[#17233C] text-white rounded-xl px-4 py-3 font-bold hover:bg-[#253453] transition-colors"
                  >
                    {c.play} <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
};

const FilterButton = ({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: JSX.Element;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-bold transition-colors ${
      active
        ? 'bg-gradient-to-r from-[#635BFF] to-[#0EA5E9] text-white border-transparent'
        : 'bg-white text-ink-muted border-border-strong hover:text-ink'
    }`}
  >
    {icon}
    {label}
  </button>
);
