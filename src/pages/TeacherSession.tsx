import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Maximize2,
  Minimize2,
  Minus,
  Play,
  Plus,
  Printer,
  Repeat2,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { LanguageToggle } from '../components/layout/LanguageToggle';
import { useTranslation } from 'react-i18next';
import type { LifeLocale } from '../data/lifeScenarios';
import { getTeacherGuide } from '../data/teacherGuides';
import {
  getTeacherScenario,
  teacherScenarios,
  type TeacherPattern,
} from '../data/teacherScenarios';

type Round = 'before' | 'after';

const MIN_VOTES = 5;

const copy = {
  el: {
    back: 'Αρχική',
    title: 'Teacher Sessions',
    subtitle: 'Έτοιμες 15λεπτες δραστηριότητες για ηλικίες 10–15, σε μία οθόνη.',
    intro: 'Διάλεξε σενάριο, κάνε δύο γύρους ψηφοφορίας και χρησιμοποίησε το debrief χωρίς βαθμολόγηση παιδιών.',
    noLogin: 'Χωρίς login · χωρίς αποθήκευση · χωρίς κινητά μαθητών',
    libraryTitle: 'Διάλεξε δραστηριότητα',
    activityCount: 'δραστηριότητες',
    ageFilterTitle: 'Ηλικιακή ζώνη',
    allAges: 'Όλες 10–15',
    younger: '10–12',
    teens: '13–15',
    eae: 'Απλή γλώσσα / ΕΑΕ',
    scenarioEyebrow: 'Σενάριο τάξης',
    question: 'Τι θα έκανες;',
    countTitleBefore: '1ος γύρος · Τι θα κάνατε τώρα;',
    countTitleAfter: '2ος γύρος · Μετά τη συζήτηση',
    countHelp: 'Οι μαθητές σηκώνουν χέρι ή οι ομάδες συμφωνούν σε μία επιλογή. Πέρασε μόνο τον αριθμό.',
    groupHint: 'Μετράς μαθητές ή ομάδες — όχι ονόματα.',
    reveal: 'Δείξε την κατανομή',
    minVotes: 'Χρειάζονται τουλάχιστον 5 ψήφοι για να εμφανιστεί μοτίβο τάξης.',
    reset: 'Μηδενισμός',
    total: 'Σύνολο',
    resultTitleBefore: 'Πριν τη συζήτηση',
    resultTitleAfter: 'Μετά τη συζήτηση',
    debriefTitle: 'Debrief για τον εκπαιδευτικό',
    riskyConsensusLabel: 'Σύγκλιση σε επιλογή υψηλού ρίσκου',
    safeConsensusLabel: 'Ισχυρή σύγκλιση σε ασφαλή στρατηγική',
    safeSplitLabel: 'Διαφωνία ανάμεσα σε δύο ασφαλείς στρατηγικές',
    splitLabel: 'Διχασμένη τάξη',
    minorityLabel: 'Υπάρχει ουσιαστική μειοψηφία',
    nextQuestion: 'Επόμενη ερώτηση',
    secondRound: '2ος γύρος ψηφοφορίας',
    secondRoundHelp: 'Ψηφίστε ξανά μετά τη συζήτηση. Δεν βαθμολογείται κανείς — βλέπουμε μόνο αν μετακινήθηκε η τάξη.',
    comparisonTitle: 'Πριν → Μετά',
    comparisonText: 'Η σύγκριση δείχνει πώς μετακινήθηκε η τάξη μετά τη συζήτηση, χωρίς ατομικά δεδομένα ή βαθμολογία.',
    beforeShort: 'Πριν',
    afterShort: 'Μετά',
    worksheet: 'Εκτύπωση / PDF worksheet',
    worksheetTitle: 'Φύλλο συζήτησης',
    worksheetIntro: 'Διάβασε το σενάριο και σημείωσε τι θα έκανες και γιατί.',
    worksheetArtifact: 'Το στοιχείο που βλέπει η τάξη',
    worksheetFooter: 'Στόχος: να εξασκηθούμε στο πώς ελέγχουμε και σκεφτόμαστε πριν ενεργήσουμε — όχι να βαθμολογήσουμε την επιλογή.',
    projector: 'Προβολή σε μία οθόνη',
    projectorText: 'Η βασική ροή δεν απαιτεί καμία συσκευή από τους μαθητές.',
    eaeText: 'Η λειτουργία ΕΑΕ μειώνει το κείμενο και απλοποιεί τη διατύπωση χωρίς να αλλάζει τη στρατηγική κάθε επιλογής.',
    presentation: 'Λειτουργία προβολής',
    exitPresentation: 'Έξοδος από προβολή',
    decrease: 'Μείωση ψήφων για',
    increase: 'Αύξηση ψήφων για',
    quickPrep: 'Έτοιμο σε 30″',
    prepGoal: 'Στόχος',
    prepWatch: 'Πρόσεξε',
    prepFocus: 'Ερώτηση-κλειδί',
    prepPlan: 'Πλάνο 15′',
    prepSteps: ['2′ · Διάβασε το σενάριο', '3′ · 1ος γύρος', '7′ · Συζήτηση / debrief', '3′ · 2ος γύρος + σύγκριση'],
  },
  en: {
    back: 'Home',
    title: 'Teacher Sessions',
    subtitle: 'Ready 15-minute activities for ages 10–15, on one screen.',
    intro: 'Choose a scenario, run two voting rounds and use the debrief without grading individual students.',
    noLogin: 'No login · no storage · no student phones',
    libraryTitle: 'Choose an activity',
    activityCount: 'activities',
    ageFilterTitle: 'Age band',
    allAges: 'All 10–15',
    younger: '10–12',
    teens: '13–15',
    eae: 'Simple language / SEN',
    scenarioEyebrow: 'Classroom scenario',
    question: 'What would you do?',
    countTitleBefore: 'Round 1 · What would you do now?',
    countTitleAfter: 'Round 2 · After the discussion',
    countHelp: 'Students raise hands or groups agree on one option. Enter only the number.',
    groupHint: 'Count students or groups — never names.',
    reveal: 'Show distribution',
    minVotes: 'At least 5 votes are required before showing a class pattern.',
    reset: 'Reset',
    total: 'Total',
    resultTitleBefore: 'Before discussion',
    resultTitleAfter: 'After discussion',
    debriefTitle: 'Teacher debrief',
    riskyConsensusLabel: 'Convergence on a high-risk option',
    safeConsensusLabel: 'Strong convergence on a safer strategy',
    safeSplitLabel: 'Split between two safer strategies',
    splitLabel: 'Split class',
    minorityLabel: 'Meaningful minority',
    nextQuestion: 'Next question',
    secondRound: 'Second voting round',
    secondRoundHelp: 'Vote again after the discussion. Nobody is graded — we only see whether the class distribution moved.',
    comparisonTitle: 'Before → After',
    comparisonText: 'This comparison shows how the class distribution moved after discussion, without personal data or individual scoring.',
    beforeShort: 'Before',
    afterShort: 'After',
    worksheet: 'Print / PDF worksheet',
    worksheetTitle: 'Discussion sheet',
    worksheetIntro: 'Read the scenario and note what you would do and why.',
    worksheetArtifact: 'What the class sees',
    worksheetFooter: 'Goal: practise checking and thinking before acting — not grading the choice.',
    projector: 'Single-screen projection',
    projectorText: 'The core flow requires no student devices.',
    eaeText: 'SEN mode shortens the text and simplifies wording without changing the strategy behind each option.',
    presentation: 'Presentation mode',
    exitPresentation: 'Exit presentation',
    decrease: 'Decrease votes for',
    increase: 'Increase votes for',
    quickPrep: 'Ready in 30 seconds',
    prepGoal: 'Goal',
    prepWatch: 'Watch for',
    prepFocus: 'Key question',
    prepPlan: '15-minute plan',
    prepSteps: ['2 min · Read the scenario', '3 min · Round 1', '7 min · Discussion / debrief', '3 min · Round 2 + compare'],
  },
} as const;

const getPercentages = (values: number[]) => {
  const total = values.reduce((sum, value) => sum + value, 0);
  return values.map((value) => (total ? Math.round((value / total) * 100) : 0));
};

export const TeacherSession = () => {
  const { i18n } = useTranslation();
  const lang: LifeLocale = i18n.language.startsWith('en') ? 'en' : 'el';
  const c = copy[lang];

  const [scenarioId, setScenarioId] = useState(teacherScenarios[0].id);
  const [ageFilter, setAgeFilter] = useState<'all' | '10-12' | '13-15'>('all');
  const [simpleMode, setSimpleMode] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  const [round, setRound] = useState<Round>('before');
  const [counts, setCounts] = useState([0, 0, 0]);
  const [beforeCounts, setBeforeCounts] = useState<number[] | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [visibleQuestionCount, setVisibleQuestionCount] = useState(1);

  const selectedScenario = getTeacherScenario(scenarioId);
  const s = selectedScenario[lang];
  const guide = getTeacherGuide(scenarioId)[lang];
  const filteredTeacherScenarios =
    ageFilter === 'all'
      ? teacherScenarios
      : teacherScenarios.filter((scenario) => scenario.ageBand === ageFilter);

  const total = counts.reduce((sum, value) => sum + value, 0);
  const percentages = getPercentages(counts);
  const beforePercentages = beforeCounts ? getPercentages(beforeCounts) : null;

  useEffect(() => {
    const handleFullscreen = () => {
      if (!document.fullscreenElement) setPresentationMode(false);
    };
    document.addEventListener('fullscreenchange', handleFullscreen);
    return () => document.removeEventListener('fullscreenchange', handleFullscreen);
  }, []);

  const pattern: TeacherPattern = useMemo(() => {
    if (!total) return 'minority';

    const sorted = counts
      .map((count, index) => ({ count, index, share: count / total }))
      .sort((a, b) => b.count - a.count);

    const top = sorted[0];
    const second = sorted[1];

    if (top.share >= 0.7 && selectedScenario.riskLevels[top.index] === 'high') return 'riskyConsensus';
    if (top.share >= 0.7 && selectedScenario.riskLevels[top.index] === 'low') return 'safeConsensus';

    const riskyShare = counts.reduce(
      (sum, count, index) => sum + (selectedScenario.riskLevels[index] === 'high' ? count : 0),
      0,
    ) / total;

    const safeSorted = sorted.filter((item) => selectedScenario.riskLevels[item.index] === 'low');
    if (
      riskyShare <= 0.2 &&
      safeSorted.length >= 2 &&
      safeSorted[0].count > 0 &&
      safeSorted[1].count > 0 &&
      Math.abs(safeSorted[0].share - safeSorted[1].share) <= 0.15
    ) {
      return 'safeSplit';
    }

    if (Math.abs(top.share - second.share) <= 0.15) return 'split';
    return 'minority';
  }, [counts, total, selectedScenario]);

  const patternLabel = {
    riskyConsensus: c.riskyConsensusLabel,
    safeConsensus: c.safeConsensusLabel,
    safeSplit: c.safeSplitLabel,
    split: c.splitLabel,
    minority: c.minorityLabel,
  }[pattern];

  const choices = simpleMode ? s.simpleChoices : s.choices;
  const questionSet = simpleMode ? s.simpleQuestions[pattern] : s.questions[pattern];

  const resetCurrentRound = () => {
    setCounts([0, 0, 0]);
    setRevealed(false);
    setVisibleQuestionCount(1);
  };

  const resetAll = () => {
    setRound('before');
    setBeforeCounts(null);
    resetCurrentRound();
  };

  const changeScenario = (id: string) => {
    setScenarioId(id);
    setSimpleMode(false);
    setRound('before');
    setBeforeCounts(null);
    setCounts([0, 0, 0]);
    setRevealed(false);
    setVisibleQuestionCount(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changeAgeFilter = (nextFilter: 'all' | '10-12' | '13-15') => {
    setAgeFilter(nextFilter);
    if (nextFilter === 'all' || selectedScenario.ageBand === nextFilter) return;
    const firstMatch = teacherScenarios.find((scenario) => scenario.ageBand === nextFilter);
    if (firstMatch) changeScenario(firstMatch.id);
  };

  const changeCount = (index: number, delta: number) => {
    setCounts((current) =>
      current.map((value, currentIndex) =>
        currentIndex === index ? Math.max(0, value + delta) : value,
      ),
    );
    setRevealed(false);
    setVisibleQuestionCount(1);
  };

  const reveal = () => {
    if (total < MIN_VOTES) return;
    setRevealed(true);
    setVisibleQuestionCount(1);
  };

  const startSecondRound = () => {
    setBeforeCounts([...counts]);
    setRound('after');
    setCounts([0, 0, 0]);
    setRevealed(false);
    setVisibleQuestionCount(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const togglePresentation = async () => {
    if (presentationMode) {
      if (document.fullscreenElement) await document.exitFullscreen().catch(() => undefined);
      setPresentationMode(false);
      return;
    }

    setPresentationMode(true);
    await document.documentElement.requestFullscreen?.().catch(() => undefined);
  };

  const titleSize = presentationMode ? 'text-5xl md:text-6xl' : 'text-3xl md:text-4xl';
  const bodySize = presentationMode ? 'text-xl md:text-2xl' : 'text-lg';
  const choiceTextSize = presentationMode ? 'text-lg md:text-xl' : 'text-base';

  return (
    <div className={`min-h-screen text-ink teacher-session ${presentationMode ? 'bg-[#EEF2FF]' : 'bg-app'}`}>
      {!presentationMode && (
        <header className="container-app py-5 flex items-center justify-between gap-4 no-print">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-ink">
            <ArrowLeft size={16} /> {c.back}
          </Link>
          <LanguageToggle />
        </header>
      )}

      {presentationMode && (
        <button
          type="button"
          onClick={togglePresentation}
          className="fixed top-4 right-4 z-50 inline-flex items-center gap-2 rounded-xl bg-[#17233C] text-white px-4 py-3 font-bold shadow-lg no-print"
          aria-label={c.exitPresentation}
        >
          <Minimize2 size={18} /> {c.exitPresentation}
        </button>
      )}

      <main className={`${presentationMode ? 'max-w-[1500px] mx-auto px-6 md:px-10 pt-8' : 'container-app'} pb-20 no-print`}>
        {!presentationMode && (
          <>
            <section className="max-w-4xl pt-6 md:pt-10 mb-8">
              <div className="inline-flex items-center gap-2 bg-[#EDE9FE] text-[#6D28D9] rounded-full px-3 py-2 text-xs font-extrabold uppercase tracking-[0.12em] mb-4">
                <Sparkles size={15} /> {c.title}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{c.subtitle}</h1>
              <p className="text-lg text-ink-muted mb-3">{c.intro}</p>
              <p className="text-ink-muted font-semibold">{c.noLogin}</p>
            </section>

            <section className="mb-8">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-extrabold mb-3">{c.libraryTitle}</h2>
                  <div className="text-xs uppercase tracking-[0.12em] font-extrabold text-ink-subtle mb-2">
                    {c.ageFilterTitle}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      ['all', c.allAges],
                      ['10-12', c.younger],
                      ['13-15', c.teens],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => changeAgeFilter(value as 'all' | '10-12' | '13-15')}
                        className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                          ageFilter === value
                            ? 'bg-[#17233C] text-white border-[#17233C]'
                            : 'bg-white text-ink-muted border-border-strong hover:text-ink'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <span className="text-sm font-bold text-ink-subtle">
                  {filteredTeacherScenarios.length} {c.activityCount}
                </span>
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3">
                {filteredTeacherScenarios.map((scenario) => {
                  const local = scenario[lang];
                  const active = scenario.id === scenarioId;
                  return (
                    <button
                      key={scenario.id}
                      type="button"
                      onClick={() => changeScenario(scenario.id)}
                      aria-pressed={active}
                      className={`text-left rounded-2xl border p-4 transition-all ${
                        active
                          ? 'border-accent bg-[#F3F2FF] shadow-sm'
                          : 'border-border-strong bg-white hover:bg-subtle'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="text-xs uppercase tracking-[0.1em] font-extrabold text-accent">
                          {local.category}
                        </div>
                        <span className="shrink-0 rounded-full bg-subtle px-2 py-1 text-[11px] font-extrabold text-ink-muted">
                          {scenario.ageBand}
                        </span>
                      </div>
                      <div className="font-extrabold leading-snug">{local.title}</div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="mb-8 rounded-3xl border border-[#D8DEF0] bg-white p-5 md:p-6 shadow-sm no-print">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div>
                  <div className="text-xs uppercase tracking-[0.12em] font-extrabold text-accent mb-1">{c.quickPrep}</div>
                  <h2 className="text-2xl font-extrabold">{s.title}</h2>
                </div>
                <span className="rounded-full bg-[#EEF2FF] text-[#4338CA] px-3 py-1.5 text-xs font-extrabold">
                  {selectedScenario.ageBand}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-3 mb-4">
                <div className="rounded-2xl bg-[#F8FAFC] border p-4">
                  <div className="text-xs uppercase tracking-[0.1em] font-extrabold text-[#475569] mb-2">{c.prepGoal}</div>
                  <p className="text-sm leading-relaxed text-ink-muted">{guide.goal}</p>
                </div>
                <div className="rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] p-4">
                  <div className="text-xs uppercase tracking-[0.1em] font-extrabold text-[#9A3412] mb-2">{c.prepWatch}</div>
                  <p className="text-sm leading-relaxed text-ink-muted">{guide.watch}</p>
                </div>
                <div className="rounded-2xl bg-[#F5F3FF] border border-[#DDD6FE] p-4">
                  <div className="text-xs uppercase tracking-[0.1em] font-extrabold text-[#6D28D9] mb-2">{c.prepFocus}</div>
                  <p className="text-sm leading-relaxed text-ink-muted">{guide.focus}</p>
                </div>
              </div>

              <div className="rounded-2xl bg-[#17233C] text-white p-4">
                <div className="text-xs uppercase tracking-[0.1em] font-extrabold text-white/70 mb-3">{c.prepPlan}</div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {c.prepSteps.map((step, index) => (
                    <div key={step} className="rounded-xl bg-white/10 px-3 py-3 text-sm font-semibold">
                      <span className="text-white/60 mr-1">{index + 1}.</span> {step}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        <section className={`grid gap-5 mb-6 ${presentationMode ? 'grid-cols-1' : 'lg:grid-cols-[1fr_320px]'}`}>
          <div className="bg-white border rounded-3xl p-5 md:p-7 shadow-sm">
            {!presentationMode && (
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {s.skills.map((skill) => (
                  <span key={skill} className="bg-[#EEF2FF] text-[#4338CA] rounded-full px-3 py-1.5 text-xs font-bold">
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <div className="text-xs uppercase tracking-[0.13em] font-extrabold text-accent mb-2">
              {c.scenarioEyebrow} · {s.category}
            </div>
            <h2 className={`${titleSize} font-extrabold mb-4`}>{s.title}</h2>
            <p className={`${bodySize} text-ink-muted leading-relaxed mb-6`}>
              {simpleMode ? s.scenarioSimple : s.scenarioText}
            </p>

            <TeacherArtifact
              kind={selectedScenario.artifactKind}
              label={s.artifactLabel}
              from={s.artifactFrom}
              body={s.artifactBody}
              link={s.artifactLink}
              meta={s.artifactMeta}
              presentationMode={presentationMode}
            />

            <h3 className={`${presentationMode ? 'text-3xl md:text-4xl' : 'text-2xl'} font-extrabold mb-4`}>
              {c.question}
            </h3>
            <div className="grid md:grid-cols-3 gap-3">
              {choices.map((choice, index) => (
                <div key={choice} className="border-2 border-border-strong rounded-2xl p-4 bg-[#FCFDFF]">
                  <div className={`${presentationMode ? 'w-12 h-12 text-xl' : 'w-9 h-9'} rounded-xl bg-gradient-to-br from-[#635BFF] to-[#0EA5E9] text-white flex items-center justify-center font-extrabold mb-3`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <p className={`${choiceTextSize} font-semibold leading-relaxed`}>{choice}</p>
                </div>
              ))}
            </div>
          </div>

          {!presentationMode && (
            <aside className="space-y-4">
              <div className="bg-[#111827] text-white rounded-3xl p-5">
                <div className="font-extrabold mb-2">{c.projector}</div>
                <p className="text-sm text-white/70 leading-relaxed mb-4">{c.projectorText}</p>
                <button
                  type="button"
                  onClick={togglePresentation}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[#17233C] px-4 py-3 font-bold"
                >
                  <Maximize2 size={17} /> {c.presentation}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSimpleMode((value) => !value)}
                aria-pressed={simpleMode}
                className={`w-full text-left border rounded-2xl p-4 transition-colors ${
                  simpleMode ? 'bg-[#ECFCCB] border-[#A3E635]' : 'bg-white border-border-strong'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="font-extrabold">{c.eae}</span>
                  <span className={`w-10 h-6 rounded-full p-1 transition-colors ${simpleMode ? 'bg-[#65A30D]' : 'bg-[#CBD5E1]'}`}>
                    <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${simpleMode ? 'translate-x-4' : ''}`} />
                  </span>
                </div>
                <p className="text-sm text-ink-muted leading-relaxed">{c.eaeText}</p>
              </button>
            </aside>
          )}
        </section>

        <section className="bg-white border rounded-3xl p-5 md:p-7 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
            <div>
              <h2 className={`${presentationMode ? 'text-3xl' : 'text-2xl'} font-extrabold mb-2`}>
                {round === 'before' ? c.countTitleBefore : c.countTitleAfter}
              </h2>
              <p className={`${presentationMode ? 'text-lg' : ''} text-ink-muted`}>{c.countHelp}</p>
              <p className="text-xs text-ink-subtle mt-1">{c.groupHint}</p>
            </div>
            <div className="text-sm font-bold text-ink-muted">
              {c.total}: <span className={`text-ink ${presentationMode ? 'text-3xl' : 'text-lg'}`}>{total}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mb-5">
            {counts.map((count, index) => (
              <div key={index} className="border rounded-2xl p-4">
                <div className="font-extrabold mb-1">
                  {String.fromCharCode(65 + index)} · {s.barLabels[index]}
                </div>
                <div className="flex items-center justify-between gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => changeCount(index, -1)}
                    className={`${presentationMode ? 'w-14 h-14' : 'w-11 h-11'} rounded-xl border flex items-center justify-center bg-white hover:bg-subtle`}
                    aria-label={`${c.decrease} ${s.barLabels[index]}`}
                  >
                    <Minus size={18} />
                  </button>
                  <div className={`${presentationMode ? 'text-5xl' : 'text-3xl'} font-extrabold tabular-nums`}>
                    {count}
                  </div>
                  <button
                    type="button"
                    onClick={() => changeCount(index, 1)}
                    className={`${presentationMode ? 'w-14 h-14' : 'w-11 h-11'} rounded-xl bg-[#17233C] text-white flex items-center justify-center hover:bg-[#253453]`}
                    aria-label={`${c.increase} ${s.barLabels[index]}`}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {total > 0 && total < MIN_VOTES && (
            <p className="mb-4 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] px-4 py-3 text-sm font-semibold text-[#9A3412]">
              {c.minVotes}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={reveal}
              disabled={total < MIN_VOTES}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#635BFF] to-[#0EA5E9] text-white px-6 py-3.5 rounded-2xl font-bold disabled:opacity-40"
            >
              {c.reveal} <ChevronRight size={18} />
            </button>
            <button
              type="button"
              onClick={round === 'before' ? resetAll : resetCurrentRound}
              className="inline-flex items-center justify-center gap-2 border border-border-strong bg-white px-6 py-3.5 rounded-2xl font-bold hover:bg-subtle"
            >
              <RotateCcw size={17} /> {c.reset}
            </button>
          </div>
        </section>

        {revealed && (
          <>
            <section className={`grid gap-5 mb-6 ${presentationMode ? 'xl:grid-cols-[1fr_1.1fr]' : 'lg:grid-cols-2'}`}>
              <div className="bg-white border rounded-3xl p-5 md:p-7 shadow-sm">
                <h2 className={`${presentationMode ? 'text-3xl' : 'text-2xl'} font-extrabold mb-5`}>
                  {round === 'before' ? c.resultTitleBefore : c.resultTitleAfter}
                </h2>
                <div className="space-y-5">
                  {percentages.map((percent, index) => (
                    <div key={index}>
                      <div className={`flex justify-between gap-4 font-bold mb-2 ${presentationMode ? 'text-xl' : 'text-sm'}`}>
                        <span>{String.fromCharCode(65 + index)} · {s.barLabels[index]}</span>
                        <span>{percent}%</span>
                      </div>
                      <div className={`${presentationMode ? 'h-7' : 'h-4'} bg-[#E8ECF7] rounded-full overflow-hidden`}>
                        <div
                          className="h-full bg-gradient-to-r from-[#635BFF] to-[#0EA5E9] rounded-full"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#111827] text-white rounded-3xl p-5 md:p-7">
                <div className="text-xs uppercase tracking-[0.12em] font-extrabold text-[#A3E635] mb-2">
                  {patternLabel}
                </div>
                <h2 className={`${presentationMode ? 'text-3xl' : 'text-2xl'} font-extrabold mb-5`}>
                  {c.debriefTitle}
                </h2>

                <div className="space-y-4">
                  {questionSet.slice(0, visibleQuestionCount).map((question, index) => (
                    <div key={question} className="flex gap-3">
                      <div className={`${presentationMode ? 'w-10 h-10 text-lg' : 'w-7 h-7 text-sm'} rounded-lg bg-white/10 flex items-center justify-center shrink-0 font-extrabold`}>
                        {index + 1}
                      </div>
                      <p className={`${presentationMode ? 'text-xl md:text-2xl' : ''} text-white/90 leading-relaxed`}>
                        {question}
                      </p>
                    </div>
                  ))}
                </div>

                {visibleQuestionCount < questionSet.length && (
                  <button
                    type="button"
                    onClick={() => setVisibleQuestionCount((value) => Math.min(questionSet.length, value + 1))}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white text-[#17233C] px-5 py-3 font-bold"
                  >
                    {c.nextQuestion} <ChevronRight size={17} />
                  </button>
                )}

                {round === 'before' && visibleQuestionCount === questionSet.length && (
                  <div className="mt-6 border-t border-white/15 pt-5">
                    <p className="text-white/65 text-sm mb-4">{c.secondRoundHelp}</p>
                    <button
                      type="button"
                      onClick={startSecondRound}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#A3E635] text-[#17233C] px-5 py-3 font-extrabold"
                    >
                      <Repeat2 size={18} /> {c.secondRound}
                    </button>
                  </div>
                )}
              </div>
            </section>

            {round === 'after' && beforePercentages && (
              <section className="bg-white border rounded-3xl p-5 md:p-7 shadow-sm mb-6">
                <div className="max-w-3xl mb-6">
                  <h2 className={`${presentationMode ? 'text-4xl' : 'text-3xl'} font-extrabold mb-2`}>
                    {c.comparisonTitle}
                  </h2>
                  <p className={`${presentationMode ? 'text-lg' : ''} text-ink-muted`}>{c.comparisonText}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {s.barLabels.map((label, index) => (
                    <div key={label} className="rounded-2xl border p-4">
                      <div className="font-extrabold mb-4">{String.fromCharCode(65 + index)} · {label}</div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm font-bold mb-1">
                            <span>{c.beforeShort}</span><span>{beforePercentages[index]}%</span>
                          </div>
                          <div className="h-3 bg-[#E8ECF7] rounded-full overflow-hidden">
                            <div className="h-full bg-[#94A3B8]" style={{ width: `${beforePercentages[index]}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm font-bold mb-1">
                            <span>{c.afterShort}</span><span>{percentages[index]}%</span>
                          </div>
                          <div className="h-3 bg-[#E8ECF7] rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#635BFF] to-[#0EA5E9]" style={{ width: `${percentages[index]}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {!presentationMode && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-2 bg-white border border-border-strong px-5 py-3 rounded-2xl font-bold hover:bg-subtle"
                >
                  <Printer size={17} /> {c.worksheet}
                </button>
              </div>
            )}
          </>
        )}

        {!presentationMode && (
          <section className="mt-10 border-t pt-7">
            <div className="inline-flex items-center gap-2 text-sm text-ink-muted">
              <ShieldCheck size={17} className="text-success" />
              {c.noLogin}
            </div>
          </section>
        )}
      </main>

      <section className="print-only">
        <div className="print-sheet">
          <div className="print-kicker">Teacher Session</div>
          <h1>{c.worksheetTitle} — {s.title}</h1>
          <p>{c.worksheetIntro}</p>

          <div className="print-box">
            <strong>{s.title}</strong>
            <p>{simpleMode ? s.scenarioSimple : s.scenarioText}</p>
          </div>

          <div className="print-message">
            <strong>{c.worksheetArtifact}</strong>
            <div className="print-sms">
              <div className="print-sms-from">{s.artifactFrom} · {s.artifactLabel}</div>
              <div>{s.artifactBody}</div>
              {s.artifactLink && <div className="print-sms-link">{s.artifactLink}</div>}
              {s.artifactMeta && <div className="mt-2 text-sm">{s.artifactMeta}</div>}
            </div>
          </div>

          <div className="print-options">
            {choices.map((choice, index) => (
              <div key={choice} className="print-option">
                <span className="print-letter">{String.fromCharCode(65 + index)}</span>
                <span>{choice}</span>
              </div>
            ))}
          </div>

          {[s.worksheetWhy, s.worksheetClue, s.worksheetSafe].map((question) => (
            <div key={question} className="print-question">
              <strong>{question}</strong>
              <div className="print-lines" />
            </div>
          ))}

          <div className="print-footer">
            <Check size={16} />
            <span>{c.worksheetFooter}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

const TeacherArtifact = ({
  kind,
  label,
  from,
  body,
  link,
  meta,
  presentationMode,
}: {
  kind: 'sms' | 'video' | 'chat';
  label: string;
  from: string;
  body: string;
  link?: string;
  meta?: string;
  presentationMode: boolean;
}) => {
  if (kind === 'video') {
    return (
      <div className={`${presentationMode ? 'max-w-3xl' : 'max-w-xl'} mx-auto mb-7 overflow-hidden rounded-[28px] bg-[#111827] text-white shadow-lg`}>
        <div className="aspect-video bg-gradient-to-br from-[#312E81] via-[#5B21B6] to-[#0E7490] relative flex items-center justify-center">
          <div className={`${presentationMode ? 'w-24 h-24' : 'w-16 h-16'} rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/30`}>
            <Play size={presentationMode ? 38 : 28} fill="currentColor" />
          </div>
          <div className="absolute left-4 top-4 rounded-full bg-black/35 px-3 py-1.5 text-xs font-extrabold tracking-wide">
            {label}
          </div>
        </div>
        <div className={`${presentationMode ? 'p-7' : 'p-5'}`}>
          <div className="text-xs uppercase tracking-[0.12em] text-white/55 font-bold mb-2">{from}</div>
          <p className={`${presentationMode ? 'text-xl' : 'text-base'} font-semibold leading-relaxed`}>{body}</p>
          {meta && <p className="mt-3 text-sm text-white/60 leading-relaxed">{meta}</p>}
        </div>
      </div>
    );
  }

  if (kind === 'chat') {
    return (
      <div className={`${presentationMode ? 'max-w-2xl' : 'max-w-md'} mx-auto bg-[#0F172A] rounded-[28px] p-3 shadow-lg mb-7`}>
        <div className="bg-[#F8FAFC] rounded-[22px] overflow-hidden">
          <div className="px-5 py-3 bg-white border-b flex items-center justify-between text-xs text-ink-subtle font-bold">
            <span>{from}</span><span>{label}</span>
          </div>
          <div className={`${presentationMode ? 'p-8' : 'p-5'}`}>
            <div className={`ml-auto max-w-[88%] bg-[#EDE9FE] border border-[#C4B5FD] rounded-2xl rounded-br-md px-4 py-3 leading-relaxed ${presentationMode ? 'text-xl' : 'text-sm'}`}>
              {body}
            </div>
            {meta && <p className="mt-4 text-xs text-ink-subtle leading-relaxed">{meta}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${presentationMode ? 'max-w-2xl' : 'max-w-md'} mx-auto bg-[#0F172A] rounded-[28px] p-3 shadow-lg mb-7`}>
      <div className="bg-white rounded-[22px] overflow-hidden">
        <div className="px-5 py-3 border-b flex items-center justify-between text-xs text-ink-subtle font-bold">
          <span>09:41</span><span>{label}</span>
        </div>
        <div className={`${presentationMode ? 'p-8' : 'p-5'} bg-[#F8FAFC]`}>
          <div className="text-xs font-extrabold text-ink-subtle mb-2">{from}</div>
          <div className={`inline-block max-w-[92%] bg-[#E2E8F0] rounded-2xl rounded-bl-md px-4 py-3 leading-relaxed ${presentationMode ? 'text-xl' : 'text-sm'}`}>
            <p>{body}</p>
            {link && <p className="mt-2 text-[#2563EB] font-semibold underline">{link}</p>}
          </div>
          {meta && <p className="mt-3 text-xs text-ink-subtle leading-relaxed">{meta}</p>}
        </div>
      </div>
    </div>
  );
};
