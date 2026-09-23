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
    situation: 'Η κατάσταση',
    question: 'Η επιλογή σου',
    after: 'Τι αλλάζει με αυτή την επιλογή;',
    perspective: 'Μια ακόμη οπτική',
    coachTitle: 'AI Reflection Coach',
    coachText: 'Ο coach βλέπει μόνο αυτό το έτοιμο σενάριο και την επιλογή που πάτησες. Δεν του στέλνουμε όνομα, ηλικία ή προσωπική ιστορία.',
    askAi: 'Ρώτα τον AI coach',
    thinking: 'Σκέφτεται…',
    curated: 'Εναλλακτικές ερωτήσεις αναστοχασμού',
    ai: 'AI-generated reflection',
    reset: 'Άλλαξε επιλογή',
    next: 'Επόμενη ιστορία',
    noScore: 'Δεν υπάρχει σωστό/λάθος σκορ.',
  },
  en: {
    back: 'All stories',
    situation: 'The situation',
    question: 'Your choice',
    after: 'What changes with this choice?',
    perspective: 'Another perspective',
    coachTitle: 'AI Reflection Coach',
    coachText: 'The coach sees only this prepared scenario and the option you selected. We do not send your name, age or personal story.',
    askAi: 'Ask the AI coach',
    thinking: 'Thinking…',
    curated: 'Alternative reflection questions',
    ai: 'AI-generated reflection',
    reset: 'Change choice',
    next: 'Next story',
    noScore: 'There is no right/wrong score.',
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

  const nextScenario = useMemo(() => {
    if (!scenario) return null;
    const index = lifeScenarios.findIndex((item) => item.id === scenario.id);
    return lifeScenarios[(index + 1) % lifeScenarios.length];
  }, [scenario]);

  if (!scenario) return <Navigate to="/scenarios" replace />;

  const selected = scenario.choices.find((choice) => choice.id === choiceId) ?? null;

  const choose = (idToChoose: string) => {
    setChoiceId(idToChoose);
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
      <header className="container-app py-5 flex items-center justify-between gap-4">
        <Link to="/scenarios" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink">
          <ArrowLeft size={16} /> {c.back}
        </Link>
        <LanguageToggle />
      </header>

      <main className="container-read pb-20 pt-4 md:pt-10">
        <div className="mb-5 flex items-center justify-between gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {categoryMeta[scenario.category].label[lang]}
          </span>
          <span className="text-xs text-ink-subtle">{scenario.minAge}–{scenario.maxAge}</span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl mb-7">{scenario.title[lang]}</h1>

        <section className="bg-card border rounded-2xl p-6 md:p-8 mb-5">
          <div className="text-xs uppercase tracking-[0.14em] text-ink-subtle font-semibold mb-3">{c.situation}</div>
          <p className="text-lg leading-relaxed">{scenario.situation[lang]}</p>
        </section>

        <section className="mb-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="font-display text-2xl">{scenario.question[lang]}</h2>
            <span className="hidden sm:inline text-xs text-ink-subtle">{c.noScore}</span>
          </div>
          <div className="space-y-3">
            {scenario.choices.map((choice) => {
              const active = choice.id === choiceId;
              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => choose(choice.id)}
                  className={`w-full text-left border rounded-xl p-4 md:p-5 transition-all ${
                    active
                      ? 'border-accent bg-[#FFF9F5] shadow-sm'
                      : 'border-border-strong bg-card hover:bg-subtle'
                  }`}
                >
                  <span className="font-medium leading-relaxed">{choice.label[lang]}</span>
                </button>
              );
            })}
          </div>
        </section>

        {selected && (
          <div className="space-y-5">
            <section className="rounded-2xl border border-accent-soft bg-[#FFFDF9] p-6 md:p-7">
              <div className="text-xs uppercase tracking-[0.14em] text-accent font-semibold mb-3">{c.after}</div>
              <p className="leading-relaxed mb-5">{selected.consequence[lang]}</p>
              <div className="border-t pt-5">
                <div className="text-xs uppercase tracking-[0.14em] text-ink-subtle font-semibold mb-2">{c.perspective}</div>
                <p className="text-ink-muted leading-relaxed">{selected.perspective[lang]}</p>
              </div>
            </section>

            <section className="bg-ink text-white rounded-2xl p-6 md:p-7">
              <div className="flex items-start gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <BrainCircuit size={21} />
                </div>
                <div>
                  <h2 className="font-display text-2xl mb-1">{c.coachTitle}</h2>
                  <p className="text-sm text-white/65 leading-relaxed">{c.coachText}</p>
                </div>
              </div>

              {!coachText ? (
                <button
                  type="button"
                  onClick={askCoach}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 bg-white text-ink px-5 py-3 rounded-lg font-medium hover:bg-white/90 disabled:opacity-60"
                >
                  {loading ? <Loader2 size={17} className="animate-spin" /> : <ShieldCheck size={17} />}
                  {loading ? c.thinking : c.askAi}
                </button>
              ) : (
                <div>
                  <div className="text-xs uppercase tracking-[0.14em] text-white/55 font-semibold mb-3">
                    {coachSource === 'ai' ? c.ai : c.curated}
                  </div>
                  <div className="whitespace-pre-line leading-relaxed text-white/90">{coachText}</div>
                </div>
              )}
            </section>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => choose('')}
                className="inline-flex items-center justify-center gap-2 border border-border-strong bg-card px-5 py-3 rounded-lg font-medium hover:bg-subtle"
              >
                <RefreshCw size={16} /> {c.reset}
              </button>
              {nextScenario && (
                <Link
                  to={`/scenario/${nextScenario.id}`}
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white px-5 py-3 rounded-lg font-medium hover:bg-accent-hover"
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
