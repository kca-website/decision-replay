import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, BrainCircuit, Clock3, Users, Wifi } from 'lucide-react';
import { LanguageToggle } from '../components/layout/LanguageToggle';
import {
  categoryMeta,
  lifeScenarios,
  type LifeLocale,
  type ScenarioCategory,
} from '../data/lifeScenarios';

const labels = {
  el: {
    back: 'Αρχική',
    eyebrow: 'Διάλεξε ιστορία',
    title: 'Σε ποια κατάσταση θέλεις να μπεις;',
    sub: 'Δεν υπάρχει σκορ. Διάλεξε τι θα έκανες και μετά δες τις συνέπειες και τις ερωτήσεις του coach.',
    all: 'Όλα',
    age: 'ηλικίες',
    minutes: 'λεπτά',
    play: 'Μπες στην ιστορία',
  },
  en: {
    back: 'Home',
    eyebrow: 'Choose a story',
    title: 'Which situation do you want to enter?',
    sub: 'There is no score. Choose what you would do, then see the consequences and the coach questions.',
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
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink">
          <ArrowLeft size={16} /> {c.back}
        </Link>
        <LanguageToggle />
      </header>

      <main className="container-app pb-20">
        <div className="max-w-3xl pt-8 md:pt-14 mb-9">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-accent mb-3">{c.eyebrow}</div>
          <h1 className="font-display text-4xl md:text-5xl mb-4">{c.title}</h1>
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
          {scenarios.map((scenario) => (
            <article key={scenario.id} className="bg-card border rounded-2xl p-6 flex flex-col min-h-[315px] shadow-xs">
              <div className="flex items-center justify-between gap-3 mb-5">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  {icons[scenario.category]}
                  {categoryMeta[scenario.category].label[lang]}
                </span>
                <span className="text-xs text-ink-subtle inline-flex items-center gap-1">
                  <Clock3 size={13} /> {scenario.minutes} {c.minutes}
                </span>
              </div>

              <h2 className="font-display text-2xl mb-3">{scenario.title[lang]}</h2>
              <p className="text-ink-muted leading-relaxed mb-6 flex-1">{scenario.teaser[lang]}</p>

              <div className="text-xs text-ink-subtle mb-4">
                {c.age} {scenario.minAge}–{scenario.maxAge}
              </div>

              <Link
                to={`/scenario/${scenario.id}`}
                className="inline-flex items-center justify-between gap-2 border border-border-strong rounded-lg px-4 py-3 font-medium hover:bg-subtle transition-colors"
              >
                {c.play} <ArrowRight size={17} />
              </Link>
            </article>
          ))}
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
    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-colors ${
      active ? 'bg-ink text-white border-ink' : 'bg-card text-ink-muted border-border-strong hover:text-ink'
    }`}
  >
    {icon}
    {label}
  </button>
);
