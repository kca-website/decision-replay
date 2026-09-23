import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  RotateCcw,
} from 'lucide-react';
import { LanguageToggle } from '../components/layout/LanguageToggle';
import { ScenarioVisual } from '../components/ScenarioVisual';
import {
  categoryMeta,
  getScenario,
  lifeScenarios,
  type LifeLocale,
} from '../data/lifeScenarios';

const labels = {
  el: {
    back: 'Όλες οι ιστορίες',
    situation: 'Η στιγμή',
    after: 'Τι μπορεί να ακολουθήσει',
    perspective: 'Δες το κι αλλιώς',
    reflectionTitle: 'Σκέψου λίγο ακόμη',
    reflectionIntro: 'Δεν υπάρχει βαθμολογία. Οι ερωτήσεις είναι μέρος του έτοιμου σεναρίου και δεν στέλνουν δεδομένα πουθενά.',
    replayTitle: 'Replay τη στιγμή',
    replayFirst: 'Τώρα γύρνα στο ίδιο σημείο και δοκίμασε άλλη αντίδραση. Δες τι αλλάζει στη συνέπεια.',
    replayMore: 'Ίδια στιγμή, διαφορετική επιλογή. Σύγκρινε τις συνέπειες πριν πας στην επόμενη ιστορία.',
    replay: 'Δοκίμασε άλλη επιλογή',
    next: 'Επόμενη ιστορία',
    tried: 'Δοκίμασες',
    choices: 'επιλογές',
    noScore: 'Δεν υπάρχει «σωστή απάντηση» ή σκορ. Δες τη συνέπεια και ξανασκέψου.',
    story: 'Ιστορία',
    of: 'από',
  },
  en: {
    back: 'All stories',
    situation: 'The moment',
    after: 'What could happen next',
    perspective: 'See it another way',
    reflectionTitle: 'Think one step further',
    reflectionIntro: 'There is no score. These questions are part of the prepared scenario and send no data anywhere.',
    replayTitle: 'Replay the moment',
    replayFirst: 'Go back to the same moment and try another response. See what changes in the consequence.',
    replayMore: 'Same moment, different choice. Compare the consequences before moving to the next story.',
    replay: 'Try another choice',
    next: 'Next story',
    tried: 'You tried',
    choices: 'choices',
    noScore: 'There is no “right answer” or score. See the consequence and think again.',
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
  const [triedChoiceIds, setTriedChoiceIds] = useState<string[]>([]);

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
    if (idToChoose) {
      setTriedChoiceIds((current) =>
        current.includes(idToChoose) ? current : [...current, idToChoose],
      );
    }
  };

  const resetForNext = () => {
    setChoiceId(null);
    setTriedChoiceIds([]);
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

        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
          {scenario.title[lang]}
        </h1>

        <div className="mb-5">
          <ScenarioVisual visual={scenario.visual} />
        </div>

        <section className="bg-white border rounded-2xl p-5 md:p-6 mb-5 shadow-xs">
          <div className="text-xs uppercase tracking-[0.12em] text-ink-subtle font-bold mb-2">{c.situation}</div>
          <p className="text-base md:text-lg leading-relaxed">{scenario.situation[lang]}</p>
        </section>

        <section className="mb-5">
          <h2 className="text-2xl font-extrabold mb-1">{scenario.question[lang]}</h2>
          <p className="text-sm text-ink-subtle mb-4">{c.noScore}</p>

          <div className="space-y-3">
            {scenario.choices.map((choice) => {
              const active = choice.id === choiceId;
              const tried = triedChoiceIds.includes(choice.id);
              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => choose(choice.id)}
                  aria-pressed={active}
                  className={`w-full text-left border rounded-2xl p-4 transition-all ${
                    active
                      ? 'border-accent bg-[#F3F2FF] shadow-sm'
                      : tried
                        ? 'border-[#C7C3FF] bg-white'
                        : 'border-border-strong bg-white hover:bg-subtle'
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
            <section className="rounded-2xl border border-[#A5F3FC] bg-[#ECFEFF] p-5 md:p-6">
              <div className="text-xs uppercase tracking-[0.12em] text-[#0369A1] font-bold mb-2">{c.after}</div>
              <p className="leading-relaxed mb-4">{selected.consequence[lang]}</p>

              <div className="border-t border-cyan-200 pt-4">
                <div className="text-xs uppercase tracking-[0.12em] text-ink-subtle font-bold mb-2">{c.perspective}</div>
                <p className="text-ink-muted leading-relaxed">{selected.perspective[lang]}</p>
              </div>
            </section>

            <section className="bg-white border rounded-2xl p-5 md:p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] text-[#6D28D9] flex items-center justify-center shrink-0">
                  <Lightbulb size={21} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-extrabold mb-1">{c.reflectionTitle}</h2>
                  <p className="text-sm text-ink-muted leading-relaxed">{c.reflectionIntro}</p>
                </div>
              </div>

              <div className="space-y-3">
                {scenario.reflection.map((question, index) => (
                  <div key={question[lang]} className="rounded-xl bg-subtle p-4 flex gap-3">
                    <span className="font-extrabold text-accent">{index + 1}</span>
                    <p className="leading-relaxed">{question[lang]}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-[#17233C] text-white rounded-2xl p-5 md:p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.12em] text-[#A3E635] font-bold mb-2">{c.replayTitle}</div>
                  <h2 className="text-xl md:text-2xl font-extrabold">
                    {triedChoiceIds.length > 1 ? c.replayMore : c.replayFirst}
                  </h2>
                </div>
                <RotateCcw size={24} className="text-white/70 shrink-0" />
              </div>

              <div className="text-sm text-white/65 mb-5">
                {c.tried} {triedChoiceIds.length} / {scenario.choices.length} {c.choices}
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => choose('')}
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#17233C] px-5 py-3 rounded-xl font-bold hover:bg-[#EEF2FF]"
                >
                  <RotateCcw size={16} /> {c.replay}
                </button>

                {nextScenario && (
                  <Link
                    to={`/scenario/${nextScenario.id}`}
                    className="inline-flex items-center justify-center gap-2 border border-white/25 bg-white/10 text-white px-5 py-3 rounded-xl font-bold hover:bg-white/15"
                    onClick={resetForNext}
                  >
                    {c.next} <ArrowRight size={17} />
                  </Link>
                )}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};
