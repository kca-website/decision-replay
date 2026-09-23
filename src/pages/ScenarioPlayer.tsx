import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Loader2,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import { LanguageToggle } from '../components/layout/LanguageToggle';
import {
  categoryMeta,
  getScenario,
  lifeScenarios,
  type LifeLocale,
} from '../data/lifeScenarios';
import { getAiCoachReflection } from '../utils/aiCoach';

const labels = {
  el: {
    back: 'Όλες οι ιστορίες',
    situation: 'Τι συμβαίνει',
    after: 'Τι μπορεί να συμβεί',
    perspective: 'Σκέψου και αυτό',
    coachTitle: 'Σκέψου το λίγο ακόμα',
    coachText: 'Ο AI coach βλέπει μόνο το έτοιμο σενάριο και την επιλογή σου. Δεν χρειάζεται να γράψεις τίποτα προσωπικό.',
    askAi: 'Δώσε μου 3 ερωτήσεις',
    thinking: 'Σκέφτεται…',
    curated: '3 ερωτήσεις για σκέψη',
    ai: '3 ερωτήσεις από το AI',
    reset: 'Άλλαξε επιλογή',
    next: 'Επόμενη ιστορία',
    noScore: 'Δεν υπάρχει μία σωστή απάντηση.',
    story: 'Ιστορία',
    of: 'από',
  },
  en: {
    back: 'All stories',
    situation: 'What is happening',
    after: 'What could happen',
    perspective: 'Think about this too',
    coachTitle: 'Think a little further',
    coachText: 'The AI coach sees only the prepared scenario and your selected option. You do not need to type anything personal.',
    askAi: 'Give me 3 questions',
    thinking: 'Thinking…',
    curated: '3 questions to think about',
    ai: '3 questions from AI',
    reset: 'Change choice',
    next: 'Next story',
    noScore: 'There is not just one right answer.',
    story: 'Story',
    of: 'of',
  },
} as const;

export const ScenarioPlayer = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const lang: LifeLocale = i18n.language.startsWith('en') ? 'en' : 'el';
  const c = labels[lang];
  const scenario = getScenario(id);

  const [choiceId, setChoiceId] = useState<string | null>(null);
  const [coachText, setCoachText] = useState('');
  const [coachSource, setCoachSource] = useState<'ai' | 'curated' | null>(null);
  const [loading, setLoading] = useState(false);

  const scenarioIndex = scenario
    ? lifeScenarios.findIndex((item) => item.id === scenario.id)
    : -1;

  const nextScenario = useMemo(() => {
    if (!scenario) return null;
    const index = lifeScenarios.findIndex((item) => item.id === scenario.id);
    return lifeScenarios[(index + 1) % lifeScenarios.length];
  }, [scenario]);

  if (!scenario) return <Navigate to="/scenarios" replace />;

  const selected = scenario.choices.find((choice) => choice.id === choiceId) ?? null;

  const choose = (idToChoose: string) => {
    setChoiceId(idToChoose || null);
    setCoachText('');
    setCoachSource(null);
  };

  const askCoach = async () => {
    if (!selected) return;
    setLoading(true);
    const result = await getAiCoachReflection(scenario, selected, lang);
    setCoachText(result.text);
    setCoachSource(result.source);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-app text-ink">
      <header className="container-app py-4 flex items-center justify-between gap-4">
        <Link to="/scenarios" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink">
          <ArrowLeft size={16} /> {c.back}
        </Link>
        <LanguageToggle />
      </header>

      <main className="container-read pb-20 pt-3 md:pt-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-accent">
            {categoryMeta[scenario.category].label[lang]}
          </span>
          <span className="text-xs font-medium text-ink-subtle">
            {c.story} {scenarioIndex + 1} {c.of} {lifeScenarios.length} · {scenario.minAge}–{scenario.maxAge}
          </span>
        </div>

        <h1 className="font-sans text-3xl md:text-4xl font-bold leading-tight mb-5">
          {scenario.title[lang]}
        </h1>

        <section className="bg-card border rounded-2xl p-5 md:p-6 mb-5">
          <div className="text-xs uppercase tracking-[0.12em] text-ink-subtle font-bold mb-2">{c.situation}</div>
          <p className="text-base md:text-lg leading-relaxed">{scenario.situation[lang]}</p>
        </section>

        <section className="mb-5">
          <h2 className="font-sans text-2xl font-bold mb-1">{scenario.question[lang]}</h2>
          <p className="text-sm text-ink-subtle mb-4">{c.noScore}</p>

          <div className="space-y-3">
            {scenario.choices.map((choice) => {
              const active = choice.id === choiceId;
              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => choose(choice.id)}
                  aria-pressed={active}
                  className={`w-full text-left border rounded-2xl p-4 transition-all ${
                    active
                      ? 'border-accent bg-[#FFF9F5] shadow-sm'
                      : 'border-border-strong bg-card hover:bg-subtle'
                  }`}
                >
                  <span className="font-semibold leading-relaxed">{choice.label[lang]}</span>
                </button>
              );
            })}
          </div>
        </section>

        {selected && (
          <div className="space-y-4">
            <section className="rounded-2xl border border-accent-soft bg-[#FFFDF9] p-5 md:p-6">
              <div className="text-xs uppercase tracking-[0.12em] text-accent font-bold mb-2">{c.after}</div>
              <p className="leading-relaxed mb-4">{selected.consequence[lang]}</p>

              <div className="border-t pt-4">
                <div className="text-xs uppercase tracking-[0.12em] text-ink-subtle font-bold mb-2">{c.perspective}</div>
                <p className="text-ink-muted leading-relaxed">{selected.perspective[lang]}</p>
              </div>
            </section>

            <section className="bg-[#292620] text-white rounded-2xl p-5 md:p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <BrainCircuit size={21} />
                </div>
                <div>
                  <h2 className="font-sans text-xl md:text-2xl font-bold mb-1">{c.coachTitle}</h2>
                  <p className="text-sm text-white/65 leading-relaxed">{c.coachText}</p>
                </div>
              </div>

              {!coachText ? (
                <button
                  type="button"
                  onClick={askCoach}
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-ink px-5 py-3 rounded-xl font-semibold hover:bg-white/90 disabled:opacity-60"
                >
                  {loading ? <Loader2 size={17} className="animate-spin" /> : <ShieldCheck size={17} />}
                  {loading ? c.thinking : c.askAi}
                </button>
              ) : (
                <div className="rounded-xl bg-white/8 border border-white/10 p-4">
                  <div className="text-xs uppercase tracking-[0.12em] text-white/55 font-bold mb-3">
                    {coachSource === 'ai' ? c.ai : c.curated}
                  </div>
                  <div className="whitespace-pre-line leading-relaxed text-white/95">{coachText}</div>
                </div>
              )}
            </section>

            <div className="grid sm:grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => choose('')}
                className="inline-flex items-center justify-center gap-2 border border-border-strong bg-card px-5 py-3 rounded-xl font-semibold hover:bg-subtle"
              >
                <RefreshCw size={16} /> {c.reset}
              </button>

              {nextScenario && (
                <Link
                  to={`/scenario/${nextScenario.id}`}
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white px-5 py-3 rounded-xl font-semibold hover:bg-accent-hover"
                  onClick={() => {
                    setChoiceId(null);
                    setCoachText('');
                    setCoachSource(null);
                  }}
                >
                  {c.next} <ArrowRight size={17} />
                </Link>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
