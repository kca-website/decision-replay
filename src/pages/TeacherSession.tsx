import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Maximize2,
  Minimize2,
  Minus,
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

type Pattern = 'riskyConsensus' | 'safeConsensus' | 'safeSplit' | 'split' | 'minority';
type Round = 'before' | 'after';

const MIN_VOTES = 5;
const RISK_LEVELS = ['high', 'low', 'low'] as const;

const copy = {
  el: {
    back: 'Αρχική',
    title: 'Teacher Session v0.2',
    subtitle: 'Μία οθόνη, μία ιστορία, συζήτηση 10–15 λεπτών.',
    noLogin: 'Χωρίς login · χωρίς αποθήκευση · χωρίς κινητά μαθητών',
    eae: 'Απλή γλώσσα / ΕΑΕ',
    skills: ['Ψηφιακή ιθαγένεια', 'Ασφαλής πλοήγηση', 'Κριτική σκέψη'],
    scenarioEyebrow: 'Σενάριο τάξης',
    scenarioTitle: 'Το μήνυμα για το δέμα',
    scenarioText: 'Στο κινητό εμφανίζεται μήνυμα που λέει ότι ένα δέμα δεν παραδόθηκε. Ζητά επιβεβαίωση διεύθυνσης και χρέωση 1,99€ μέσω συνδέσμου.',
    scenarioSimple: 'Έρχεται μήνυμα για ένα δέμα. Λέει: «Πάτησε εδώ και πλήρωσε 1,99€». Δεν ξέρεις αν είναι αληθινό.',
    smsFrom: 'COURIER INFO',
    smsBody: 'Το δέμα σας δεν παραδόθηκε. Επιβεβαιώστε τη διεύθυνσή σας και καταβάλετε 1,99€ εντός 30 λεπτών.',
    smsLink: 'parcel-check.help/gr',
    question: 'Τι θα έκανες;',
    choices: [
      'Πατάω τον σύνδεσμο για να δω τι έγινε.',
      'Μπαίνω μόνος μου στην επίσημη εφαρμογή/σελίδα της courier.',
      'Ρωτάω αν περιμένουμε δέμα και δεν ανοίγω τον σύνδεσμο.',
    ],
    simpleChoices: [
      'Πατάω το link.',
      'Μπαίνω στην επίσημη σελίδα.',
      'Ρωτάω αν περιμένουμε δέμα. Δεν πατάω το link.',
    ],
    barLabels: ['Πατάω το link', 'Επίσημη σελίδα', 'Ελέγχω χωρίς το link'],
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
    questions: {
      riskyConsensus: [
        'Τι υποθέσαμε για το μήνυμα ώστε ο σύνδεσμος να μας φανεί αρκετά ασφαλής;',
        'Γιατί το μήνυμα βάζει όριο «30 λεπτών»; Ποιος κερδίζει αν βιαστούμε;',
        'Πώς μπορούμε να ελέγξουμε αν υπάρχει πράγματι δέμα χωρίς να χρησιμοποιήσουμε τον σύνδεσμο;',
      ],
      safeConsensus: [
        'Τι στοιχείο του μηνύματος έκανε την ίδια στρατηγική να φαίνεται πιο ασφαλής στους περισσότερους;',
        'Ποιο διαφορετικό στοιχείο θα μπορούσε να σας κάνει να αλλάξετε τρόπο ελέγχου;',
        'Πώς ξεχωρίζουμε την επαλήθευση από το να εμπιστευόμαστε το ίδιο μήνυμα που μας πιέζει;',
      ],
      safeSplit: [
        'Οι δύο δημοφιλείς επιλογές αποφεύγουν το link. Τι ελέγχει καλύτερα η καθεμία;',
        'Ποια θα μπορούσε να γίνει πρώτη και ποια δεύτερη, χωρίς να αυξάνει τον κίνδυνο;',
        'Τι πληροφορία θέλουμε τελικά να επιβεβαιώσουμε: ότι υπάρχει δέμα, ποια courier το έχει ή και τα δύο;',
      ],
      split: [
        'Ποιο στοιχείο του μηνύματος ερμηνεύσατε διαφορετικά μεταξύ σας;',
        'Ποια επιλογή μας δίνει περισσότερες πληροφορίες πριν κάνουμε κάτι που ίσως δεν αναστρέφεται;',
        'Τι μπορούμε να ελέγξουμε πρώτα χωρίς να δώσουμε στοιχεία ή χρήματα;',
      ],
      minority: [
        'Ας ακούσουμε πρώτα τη λιγότερο δημοφιλή επιλογή: ποια λογική μπορεί να κρύβεται πίσω της;',
        'Τι πληροφορία λείπει από το μήνυμα και θα βοηθούσε όλους να αποφασίσουν καλύτερα;',
        'Ποια ασφαλής ενέργεια μπορεί να γίνει πρώτη, πριν αποφασίσουμε αν θα συνεχίσουμε;',
      ],
    },
    simpleQuestions: {
      riskyConsensus: [
        'Τι σε έκανε να εμπιστευτείς το μήνυμα;',
        'Γιατί γράφει «μέσα σε 30 λεπτά»;',
        'Πώς ελέγχουμε το δέμα χωρίς να πατήσουμε το link;',
      ],
      safeConsensus: [
        'Τι σε έκανε να μην πατήσεις το link;',
        'Τι άλλο θα ήθελες να ξέρεις πριν αποφασίσεις;',
        'Πώς ελέγχουμε αν υπάρχει πράγματι δέμα;',
      ],
      safeSplit: [
        'Και οι δύο επιλογές δεν πατούν το link. Τι ελέγχει η καθεμία;',
        'Ποιον έλεγχο θα έκανες πρώτο;',
        'Τι θέλουμε να μάθουμε για το δέμα;',
      ],
      split: [
        'Τι είδαμε διαφορετικά στο ίδιο μήνυμα;',
        'Ποια επιλογή μας δίνει πρώτα περισσότερες πληροφορίες;',
        'Τι μπορούμε να ελέγξουμε χωρίς να πατήσουμε το link;',
      ],
      minority: [
        'Γιατί κάποιοι διάλεξαν διαφορετικά;',
        'Τι πληροφορία λείπει από το μήνυμα;',
        'Τι ασφαλές μπορούμε να κάνουμε πρώτα;',
      ],
    },
    nextQuestion: 'Επόμενη ερώτηση',
    secondRound: '2ος γύρος ψηφοφορίας',
    secondRoundHelp: 'Ψηφίστε ξανά μετά τη συζήτηση. Δεν βαθμολογείται κανείς — βλέπουμε μόνο αν μετακινήθηκε η τάξη.',
    comparisonTitle: 'Πριν → Μετά',
    comparisonText: 'Η σύγκριση δείχνει πώς μετακινήθηκε η τάξη μετά τη συζήτηση, χωρίς ατομικά δεδομένα ή βαθμολογία.',
    beforeShort: 'Πριν',
    afterShort: 'Μετά',
    worksheet: 'Εκτύπωση / PDF worksheet',
    worksheetTitle: 'Φύλλο συζήτησης — Το μήνυμα για το δέμα',
    worksheetIntro: 'Διάβασε το σενάριο και σημείωσε τι θα έκανες και γιατί.',
    worksheetMessage: 'Το μήνυμα που βλέπεις',
    worksheetWhy: 'Γιατί θα διάλεγες αυτή την επιλογή;',
    worksheetClue: 'Ποια σημεία του μηνύματος θα έλεγες ότι χρειάζονται έλεγχο;',
    worksheetSafe: 'Ποια είναι μία ενέργεια που μπορείς να κάνεις χωρίς να πατήσεις τον σύνδεσμο;',
    worksheetFooter: 'Στόχος: να εξασκηθούμε στο πώς ελέγχουμε πριν ενεργήσουμε — όχι να βαθμολογήσουμε την επιλογή.',
    projector: 'Προβολή σε μία οθόνη',
    projectorText: 'Η βασική ροή δεν απαιτεί καμία συσκευή από τους μαθητές.',
    eaeText: 'Η λειτουργία ΕΑΕ μειώνει το κείμενο και απλοποιεί τη διατύπωση χωρίς να αλλάζει τη στρατηγική κάθε επιλογής.',
    presentation: 'Λειτουργία προβολής',
    exitPresentation: 'Έξοδος από προβολή',
    decrease: 'Μείωση ψήφων για',
    increase: 'Αύξηση ψήφων για',
  },
  en: {
    back: 'Home',
    title: 'Teacher Session v0.2',
    subtitle: 'One screen, one story, a 10–15 minute discussion.',
    noLogin: 'No login · no storage · no student phones',
    eae: 'Simple language / SEN',
    skills: ['Digital citizenship', 'Safe browsing', 'Critical thinking'],
    scenarioEyebrow: 'Classroom scenario',
    scenarioTitle: 'The delivery message',
    scenarioText: 'A message says a parcel could not be delivered. It asks you to confirm your address and pay €1.99 through a link.',
    scenarioSimple: 'You get a parcel message. It says: “Tap here and pay €1.99.” You do not know if it is real.',
    smsFrom: 'COURIER INFO',
    smsBody: 'Your parcel could not be delivered. Confirm your address and pay €1.99 within 30 minutes.',
    smsLink: 'parcel-check.help/gr',
    question: 'What would you do?',
    choices: [
      'Tap the link to see what happened.',
      'Open the courier’s official app/site yourself.',
      'Ask whether we are expecting a parcel and do not open the link.',
    ],
    simpleChoices: [
      'Tap the link.',
      'Open the official site.',
      'Ask whether we are expecting a parcel. Do not tap the link.',
    ],
    barLabels: ['Tap the link', 'Official site', 'Check without the link'],
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
    questions: {
      riskyConsensus: [
        'What did we assume about the message that made the link feel safe enough to use?',
        'Why does the message create a “30 minute” deadline? Who benefits if we rush?',
        'How can we check whether a parcel really exists without using the link?',
      ],
      safeConsensus: [
        'What part of the message made the same strategy feel safer to most people?',
        'What different detail could make you change how you verify it?',
        'How do we separate verification from trusting the same message that is pressuring us?',
      ],
      safeSplit: [
        'Both popular choices avoid the link. What does each one verify better?',
        'Which could come first and which second without increasing risk?',
        'What are we actually trying to confirm: whether a parcel exists, which courier has it, or both?',
      ],
      split: [
        'Which part of the message did the class interpret differently?',
        'Which option gives us more information before an action that may be hard to undo?',
        'What can we check first without sharing details or money?',
      ],
      minority: [
        'Let us hear the least popular option first: what reasoning might sit behind it?',
        'What information is missing that would help everyone decide better?',
        'What safe action can happen first before deciding whether to continue?',
      ],
    },
    simpleQuestions: {
      riskyConsensus: [
        'What made you trust the message?',
        'Why does it say “within 30 minutes”?',
        'How can we check the parcel without tapping the link?',
      ],
      safeConsensus: [
        'What made you avoid the link?',
        'What else would you want to know before deciding?',
        'How can we check whether the parcel really exists?',
      ],
      safeSplit: [
        'Both choices avoid the link. What does each one check?',
        'Which check would you do first?',
        'What do we want to learn about the parcel?',
      ],
      split: [
        'What did we see differently in the same message?',
        'Which option gives us more information first?',
        'What can we check without tapping the link?',
      ],
      minority: [
        'Why did some people choose differently?',
        'What information is missing from the message?',
        'What safe thing can we do first?',
      ],
    },
    nextQuestion: 'Next question',
    secondRound: 'Second voting round',
    secondRoundHelp: 'Vote again after the discussion. Nobody is graded — we only see whether the class distribution moved.',
    comparisonTitle: 'Before → After',
    comparisonText: 'This comparison shows how the class distribution moved after discussion, without personal data or individual scoring.',
    beforeShort: 'Before',
    afterShort: 'After',
    worksheet: 'Print / PDF worksheet',
    worksheetTitle: 'Discussion sheet — The delivery message',
    worksheetIntro: 'Read the scenario and note what you would do and why.',
    worksheetMessage: 'The message you see',
    worksheetWhy: 'Why would you choose that option?',
    worksheetClue: 'Which parts of the message would you want to verify?',
    worksheetSafe: 'What is one action you can take without tapping the link?',
    worksheetFooter: 'Goal: practise checking before acting — not grading the choice.',
    projector: 'Single-screen projection',
    projectorText: 'The core flow requires no student devices.',
    eaeText: 'SEN mode shortens the text and simplifies wording without changing the strategy behind each option.',
    presentation: 'Presentation mode',
    exitPresentation: 'Exit presentation',
    decrease: 'Decrease votes for',
    increase: 'Increase votes for',
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

  const [simpleMode, setSimpleMode] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  const [round, setRound] = useState<Round>('before');
  const [counts, setCounts] = useState([0, 0, 0]);
  const [beforeCounts, setBeforeCounts] = useState<number[] | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [visibleQuestionCount, setVisibleQuestionCount] = useState(1);

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

  const pattern: Pattern = useMemo(() => {
    const sorted = counts
      .map((count, index) => ({ count, index, share: count / total }))
      .sort((a, b) => b.count - a.count);

    const top = sorted[0];
    const second = sorted[1];

    if (top.share >= 0.7 && RISK_LEVELS[top.index] === 'high') return 'riskyConsensus';
    if (top.share >= 0.7 && RISK_LEVELS[top.index] === 'low') return 'safeConsensus';

    const riskyShare = counts[0] / total;
    const safeDifference = Math.abs(counts[1] - counts[2]) / total;
    if (riskyShare <= 0.2 && counts[1] > 0 && counts[2] > 0 && safeDifference <= 0.15) {
      return 'safeSplit';
    }

    if (Math.abs(top.share - second.share) <= 0.15) return 'split';
    return 'minority';
  }, [counts, total]);

  const patternLabel = {
    riskyConsensus: c.riskyConsensusLabel,
    safeConsensus: c.safeConsensusLabel,
    safeSplit: c.safeSplitLabel,
    split: c.splitLabel,
    minority: c.minorityLabel,
  }[pattern];

  const choices = simpleMode ? c.simpleChoices : c.choices;
  const questionSet = simpleMode ? c.simpleQuestions[pattern] : c.questions[pattern];

  const changeCount = (index: number, delta: number) => {
    setCounts((current) =>
      current.map((value, currentIndex) =>
        currentIndex === index ? Math.max(0, value + delta) : value,
      ),
    );
    setRevealed(false);
    setVisibleQuestionCount(1);
  };

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
          <section className="max-w-4xl pt-6 md:pt-10 mb-8">
            <div className="inline-flex items-center gap-2 bg-[#EDE9FE] text-[#6D28D9] rounded-full px-3 py-2 text-xs font-extrabold uppercase tracking-[0.12em] mb-4">
              <Sparkles size={15} /> {c.title}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{c.subtitle}</h1>
            <p className="text-ink-muted font-semibold">{c.noLogin}</p>
          </section>
        )}

        <section className={`grid gap-5 mb-6 ${presentationMode ? 'grid-cols-1' : 'lg:grid-cols-[1fr_320px]'}`}>
          <div className="bg-white border rounded-3xl p-5 md:p-7 shadow-sm">
            {!presentationMode && (
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {c.skills.map((skill) => (
                  <span key={skill} className="bg-[#EEF2FF] text-[#4338CA] rounded-full px-3 py-1.5 text-xs font-bold">
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <div className="text-xs uppercase tracking-[0.13em] font-extrabold text-accent mb-2">{c.scenarioEyebrow}</div>
            <h2 className={`${titleSize} font-extrabold mb-4`}>{c.scenarioTitle}</h2>
            <p className={`${bodySize} text-ink-muted leading-relaxed mb-6`}>
              {simpleMode ? c.scenarioSimple : c.scenarioText}
            </p>

            <div className={`${presentationMode ? 'max-w-2xl' : 'max-w-md'} mx-auto bg-[#0F172A] rounded-[28px] p-3 shadow-lg mb-7`}>
              <div className="bg-white rounded-[22px] overflow-hidden">
                <div className="px-5 py-3 border-b flex items-center justify-between text-xs text-ink-subtle font-bold">
                  <span>09:41</span>
                  <span>SMS</span>
                </div>
                <div className={`${presentationMode ? 'p-8' : 'p-5'} bg-[#F8FAFC]`}>
                  <div className="text-xs font-extrabold text-ink-subtle mb-2">{c.smsFrom}</div>
                  <div className={`inline-block max-w-[92%] bg-[#E2E8F0] rounded-2xl rounded-bl-md px-4 py-3 leading-relaxed ${presentationMode ? 'text-xl' : 'text-sm'}`}>
                    <p>{c.smsBody}</p>
                    <p className="mt-2 text-[#2563EB] font-semibold underline">{c.smsLink}</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className={`${presentationMode ? 'text-3xl md:text-4xl' : 'text-2xl'} font-extrabold mb-4`}>{c.question}</h3>
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
                  {String.fromCharCode(65 + index)} · {c.barLabels[index]}
                </div>
                <div className="flex items-center justify-between gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => changeCount(index, -1)}
                    className={`${presentationMode ? 'w-14 h-14' : 'w-11 h-11'} rounded-xl border flex items-center justify-center bg-white hover:bg-subtle`}
                    aria-label={`${c.decrease} ${c.barLabels[index]}`}
                  >
                    <Minus size={18} />
                  </button>
                  <div className={`${presentationMode ? 'text-5xl' : 'text-3xl'} font-extrabold tabular-nums`}>{count}</div>
                  <button
                    type="button"
                    onClick={() => changeCount(index, 1)}
                    className={`${presentationMode ? 'w-14 h-14' : 'w-11 h-11'} rounded-xl bg-[#17233C] text-white flex items-center justify-center hover:bg-[#253453]`}
                    aria-label={`${c.increase} ${c.barLabels[index]}`}
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
                        <span>{String.fromCharCode(65 + index)} · {c.barLabels[index]}</span>
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
                <div className="text-xs uppercase tracking-[0.12em] font-extrabold text-[#A3E635] mb-2">{patternLabel}</div>
                <h2 className={`${presentationMode ? 'text-3xl' : 'text-2xl'} font-extrabold mb-5`}>{c.debriefTitle}</h2>

                <div className="space-y-4">
                  {questionSet.slice(0, visibleQuestionCount).map((question, index) => (
                    <div key={question} className="flex gap-3">
                      <div className={`${presentationMode ? 'w-10 h-10 text-lg' : 'w-7 h-7 text-sm'} rounded-lg bg-white/10 flex items-center justify-center shrink-0 font-extrabold`}>
                        {index + 1}
                      </div>
                      <p className={`${presentationMode ? 'text-xl md:text-2xl' : ''} text-white/90 leading-relaxed`}>{question}</p>
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
                  <h2 className={`${presentationMode ? 'text-4xl' : 'text-3xl'} font-extrabold mb-2`}>{c.comparisonTitle}</h2>
                  <p className={`${presentationMode ? 'text-lg' : ''} text-ink-muted`}>{c.comparisonText}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {c.barLabels.map((label, index) => (
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
          <h1>{c.worksheetTitle}</h1>
          <p>{c.worksheetIntro}</p>

          <div className="print-box">
            <strong>{c.scenarioTitle}</strong>
            <p>{simpleMode ? c.scenarioSimple : c.scenarioText}</p>
          </div>

          <div className="print-message">
            <strong>{c.worksheetMessage}</strong>
            <div className="print-sms">
              <div className="print-sms-from">{c.smsFrom}</div>
              <div>{c.smsBody}</div>
              <div className="print-sms-link">{c.smsLink}</div>
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

          {[c.worksheetWhy, c.worksheetClue, c.worksheetSafe].map((question) => (
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
