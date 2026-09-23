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

const labels = {
  el: {
    back: 'Αρχική',
    eyebrow: 'Διάλεξε την επόμενη πρόβα',
    title: 'Τι θα έκανες αν σου συνέβαινε τώρα;',
    sub: '10 σύντομες καταστάσεις για ηλικίες 10–15. Μπαίνεις στη στιγμή, διαλέγεις, βλέπεις τι μπορεί να ακολουθήσει και μπορείς να ξαναδοκιμάσεις.',
    all: 'Όλα',
    age: 'ηλικίες',
    minutes: 'λεπτά',
    play: 'Μπες στην ιστορία',
  },
  en: {
    back: 'Home',
    eyebrow: 'Choose your next rehearsal',
    title: 'What would you do if it happened right now?',
    sub: '10 short situations for ages 10–15. Step into the moment, choose, see what could happen next and replay another option.',
    all: 'All',
    age: 'ages',
    minutes: 'min',
    play: 'Enter the story',
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
  const [filter, setFilter] = useState<'all' | ScenarioCategory>('all');

  const scenarios =
    filter === 'all'
      ? lifeScenarios
      : lifeScenarios.filter((scenario) => scenario.category === filter);

  return (
    <div className="min-h-screen bg-app text-ink">
      <header className="container-app py-5 flex items-center justify-between gap-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-ink">
          <ArrowLeft size={16} /> {c.back}
        </Link>
        <LanguageToggle />
      </header>

      <main className="container-app pb-20">
        <div className="max-w-3xl pt-8 md:pt-14 mb-9">
          <div className="inline-flex bg-white border rounded-full px-3 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-accent mb-4">
            {c.eyebrow}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{c.title}</h1>
          <p className="text-lg text-ink-muted leading-relaxed">{c.sub}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')} label={c.all} />
          {(Object.keys(categoryMeta) as ScenarioCategory[]).map((category) => (
            <FilterButton
              key={category}
              active={filter === category}
              onClick={() => setFilter(category)}
              label={categoryMeta[category].label[lang]}
              icon={icons[category]}
            />
          ))}
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

                  <div className="text-xs font-medium text-ink-subtle mb-4">
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
