import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Minus,
  Plus,
  Printer,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { LanguageToggle } from '../components/layout/LanguageToggle';
import { useTranslation } from 'react-i18next';
import type { LifeLocale } from '../data/lifeScenarios';

type Pattern = 'consensus' | 'split' | 'minority';

const copy = {
  el: {
    back: 'Αρχική',
    title: 'Teacher Session v0.1',
    subtitle: 'Μία οθόνη, μία ιστορία, συζήτηση 10–15 λεπτών.',
    noLogin: 'Χωρίς login · χωρίς αποθήκευση · χωρίς κινητά μαθητών',
    eae: 'Απλή γλώσσα / ΕΑΕ',
    skillsLabel: 'Σχετικές δεξιότητες Εργαστηρίων Δεξιοτήτων',
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
      'Ρωτάω έναν ενήλικο και δεν πατάω.',
    ],
    countTitle: 'Καταμέτρηση στην τάξη',
    countHelp: 'Οι μαθητές σηκώνουν χέρι ή οι ομάδες συμφωνούν σε μία επιλογή. Πέρασε μόνο τον αριθμό.',
    groupHint: 'Μετράς μαθητές ή ομάδες — όχι ονόματα.',
    reveal: 'Δείξε την κατανομή',
    reset: 'Μηδενισμός',
    total: 'Σύνολο',
    resultTitle: 'Τι βλέπει η τάξη',
    debriefTitle: 'Debrief για τον εκπαιδευτικό',
    consensusLabel: 'Ισχυρή σύγκλιση',
    splitLabel: 'Διχασμένη τάξη',
    minorityLabel: 'Υπάρχει ουσιαστική μειοψηφία',
    questions: {
      consensus: [
        'Τι στοιχείο του μηνύματος έκανε την ίδια επιλογή να φαίνεται προφανής στους περισσότερους;',
        'Ποιο διαφορετικό στοιχείο θα μπορούσε να σας κάνει να αλλάξετε απόφαση;',
        'Πώς θα ελέγχατε αν το μήνυμα είναι αληθινό χωρίς να χρησιμοποιήσετε τον σύνδεσμο;',
      ],
      split: [
        'Ποιο στοιχείο του μηνύματος ερμηνεύσατε διαφορετικά μεταξύ σας;',
        'Ποια επιλογή δίνει περισσότερες πληροφορίες πριν γίνει κάποια μη αναστρέψιμη ενέργεια;',
        'Αν το μήνυμα ήταν αληθινό, τι θα χάναμε περιμένοντας δύο λεπτά για έλεγχο; Αν ήταν ψεύτικο, τι θα κερδίζαμε;',
      ],
      minority: [
        'Ας ακούσουμε πρώτα τη λιγότερο δημοφιλή επιλογή: ποια λογική μπορεί να κρύβεται πίσω της;',
        'Τι πληροφορία λείπει από το μήνυμα και θα βοηθούσε όλους να αποφασίσουν καλύτερα;',
        'Ποια ασφαλής ενέργεια μπορεί να γίνει πρώτα, πριν αποφασίσουμε αν θα συνεχίσουμε;',
      ],
    },
    worksheet: 'Εκτύπωση / PDF worksheet',
    worksheetTitle: 'Φύλλο συζήτησης — Το μήνυμα για το δέμα',
    worksheetIntro: 'Διάβασε το σενάριο και σημείωσε τι θα έκανες και γιατί.',
    worksheetWhy: 'Γιατί θα διάλεγες αυτή την επιλογή;',
    worksheetClue: 'Ποια σημεία του μηνύματος θα έλεγες ότι χρειάζονται έλεγχο;',
    worksheetSafe: 'Ποια είναι μία ενέργεια που μπορείς να κάνεις χωρίς να πατήσεις τον σύνδεσμο;',
    worksheetFooter: 'Στόχος: να εξασκηθούμε στο πώς ελέγχουμε πριν ενεργήσουμε — όχι να βαθμολογήσουμε την επιλογή.',
    projector: 'Προβολή σε μία οθόνη',
    projectorText: 'Η βασική ροή δεν απαιτεί καμία συσκευή από τους μαθητές.',
    eaeText: 'Η λειτουργία ΕΑΕ μειώνει το κείμενο και απλοποιεί τις επιλογές χωρίς να αλλάζει το νόημα.',
  },
  en: {
    back: 'Home',
    title: 'Teacher Session v0.1',
    subtitle: 'One screen, one story, a 10–15 minute discussion.',
    noLogin: 'No login · no storage · no student phones',
    eae: 'Simple language / SEN',
    skillsLabel: 'Related Skills Lab competencies',
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
      'Ask an adult and do not tap.',
    ],
    countTitle: 'Class count',
    countHelp: 'Students raise hands or groups agree on one option. Enter only the number.',
    groupHint: 'Count students or groups — never names.',
    reveal: 'Show distribution',
    reset: 'Reset',
    total: 'Total',
    resultTitle: 'What the class sees',
    debriefTitle: 'Teacher debrief',
    consensusLabel: 'Strong convergence',
    splitLabel: 'Split class',
    minorityLabel: 'Meaningful minority',
    questions: {
      consensus: [
        'What part of the message made the same choice feel obvious to most people?',
        'What different detail could make you change your decision?',
        'How could you verify the message without using the link?',
      ],
      split: [
        'Which part of the message did the class interpret differently?',
        'Which option gives you more information before an irreversible action?',
        'If the message were real, what would we lose by taking two minutes to verify? If it were fake, what would we gain?',
      ],
      minority: [
        'Let us hear the least popular option first: what reasoning might sit behind it?',
        'What information is missing that would help everyone decide better?',
        'What safe action can happen first before deciding whether to continue?',
      ],
    },
    worksheet: 'Print / PDF worksheet',
    worksheetTitle: 'Discussion sheet — The delivery message',
    worksheetIntro: 'Read the scenario and note what you would do and why.',
    worksheetWhy: 'Why would you choose that option?',
    worksheetClue: 'Which parts of the message would you want to verify?',
    worksheetSafe: 'What is one action you can take without tapping the link?',
    worksheetFooter: 'Goal: practise checking before acting — not grading the choice.',
    projector: 'Single-screen projection',
    projectorText: 'The core flow requires no student devices.',
    eaeText: 'SEN mode shortens the text and simplifies choices without changing the meaning.',
  },
} as const;

export const TeacherSession = () => {
  const { i18n } = useTranslation();
  const lang: LifeLocale = i18n.language.startsWith('en') ? 'en' : 'el';
  const c = copy[lang];
  const [simpleMode, setSimpleMode] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]);
  const [revealed, setRevealed] = useState(false);

  const total = counts.reduce((sum, value) => sum + value, 0);
  const percentages = counts.map((count) => (total ? Math.round((count / total) * 100) : 0));

  const pattern: Pattern = useMemo(() => {
    if (!total) return 'minority';
    const sorted = [...counts]
      .map((count, index) => ({ count, index, share: count / total }))
      .sort((a, b) => b.count - a.count);
    if (sorted[0].share >= 0.7) return 'consensus';
    if (sorted.length > 1 && Math.abs(sorted[0].share - sorted[1].share) <= 0.15) return 'split';
    return 'minority';
  }, [counts, total]);

  const patternLabel =
    pattern === 'consensus'
      ? c.consensusLabel
      : pattern === 'split'
        ? c.splitLabel
        : c.minorityLabel;

  const choices = simpleMode ? c.simpleChoices : c.choices;

  const changeCount = (index: number, delta: number) => {
    setCounts((current) =>
      current.map((value, currentIndex) =>
        currentIndex === index ? Math.max(0, value + delta) : value,
      ),
    );
    setRevealed(false);
  };

  const reset = () => {
    setCounts([0, 0, 0]);
    setRevealed(false);
  };

  return (
    <div className="min-h-screen bg-app text-ink teacher-session">
      <header className="container-app py-5 flex items-center justify-between gap-4 no-print">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-ink">
          <ArrowLeft size={16} /> {c.back}
        </Link>
        <LanguageToggle />
      </header>

      <main className="container-app pb-20 no-print">
        <section className="max-w-4xl pt-6 md:pt-10 mb-8">
          <div className="inline-flex items-center gap-2 bg-[#EDE9FE] text-[#6D28D9] rounded-full px-3 py-2 text-xs font-extrabold uppercase tracking-[0.12em] mb-4">
            <Sparkles size={15} /> {c.title}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{c.subtitle}</h1>
          <p className="text-ink-muted font-semibold">{c.noLogin}</p>
        </section>

        <section className="grid lg:grid-cols-[1fr_320px] gap-5 mb-6">
          <div className="bg-white border rounded-3xl p-5 md:p-7 shadow-sm">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {c.skills.map((skill) => (
                <span key={skill} className="bg-[#EEF2FF] text-[#4338CA] rounded-full px-3 py-1.5 text-xs font-bold">
                  {skill}
                </span>
              ))}
            </div>

            <div className="text-xs uppercase tracking-[0.13em] font-extrabold text-accent mb-2">{c.scenarioEyebrow}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{c.scenarioTitle}</h2>
            <p className="text-lg text-ink-muted leading-relaxed mb-6">
              {simpleMode ? c.scenarioSimple : c.scenarioText}
            </p>

            <div className="max-w-md mx-auto bg-[#0F172A] rounded-[28px] p-3 shadow-lg mb-7">
              <div className="bg-white rounded-[22px] overflow-hidden">
                <div className="px-5 py-3 border-b flex items-center justify-between text-xs text-ink-subtle font-bold">
                  <span>09:41</span>
                  <span>SMS</span>
                </div>
                <div className="p-5 bg-[#F8FAFC]">
                  <div className="text-xs font-extrabold text-ink-subtle mb-2">{c.smsFrom}</div>
                  <div className="inline-block max-w-[92%] bg-[#E2E8F0] rounded-2xl rounded-bl-md px-4 py-3 text-sm leading-relaxed">
                    <p>{c.smsBody}</p>
                    <p className="mt-2 text-[#2563EB] font-semibold underline">{c.smsLink}</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-extrabold mb-4">{c.question}</h3>
            <div className="grid md:grid-cols-3 gap-3">
              {choices.map((choice, index) => (
                <div key={choice} className="border-2 border-border-strong rounded-2xl p-4 bg-[#FCFDFF]">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#635BFF] to-[#0EA5E9] text-white flex items-center justify-center font-extrabold mb-3">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <p className="font-semibold leading-relaxed">{choice}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-[#111827] text-white rounded-3xl p-5">
              <div className="font-extrabold mb-2">{c.projector}</div>
              <p className="text-sm text-white/70 leading-relaxed">{c.projectorText}</p>
            </div>

            <button
              type="button"
              onClick={() => setSimpleMode((value) => !value)}
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
        </section>

        <section className="bg-white border rounded-3xl p-5 md:p-7 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-extrabold mb-2">{c.countTitle}</h2>
              <p className="text-ink-muted">{c.countHelp}</p>
              <p className="text-xs text-ink-subtle mt-1">{c.groupHint}</p>
            </div>
            <div className="text-sm font-bold text-ink-muted">
              {c.total}: <span className="text-ink text-lg">{total}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mb-5">
            {counts.map((count, index) => (
              <div key={index} className="border rounded-2xl p-4">
                <div className="font-extrabold mb-3">{String.fromCharCode(65 + index)}</div>
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => changeCount(index, -1)}
                    className="w-11 h-11 rounded-xl border flex items-center justify-center bg-white hover:bg-subtle"
                    aria-label="minus"
                  >
                    <Minus size={18} />
                  </button>
                  <div className="text-3xl font-extrabold tabular-nums">{count}</div>
                  <button
                    type="button"
                    onClick={() => changeCount(index, 1)}
                    className="w-11 h-11 rounded-xl bg-[#17233C] text-white flex items-center justify-center hover:bg-[#253453]"
                    aria-label="plus"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => total > 0 && setRevealed(true)}
              disabled={!total}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#635BFF] to-[#0EA5E9] text-white px-6 py-3.5 rounded-2xl font-bold disabled:opacity-40"
            >
              {c.reveal} <ChevronRight size={18} />
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 border border-border-strong bg-white px-6 py-3.5 rounded-2xl font-bold hover:bg-subtle"
            >
              <RotateCcw size={17} /> {c.reset}
            </button>
          </div>
        </section>

        {revealed && (
          <>
            <section className="grid lg:grid-cols-2 gap-5 mb-6">
              <div className="bg-white border rounded-3xl p-5 md:p-7 shadow-sm">
                <h2 className="text-2xl font-extrabold mb-5">{c.resultTitle}</h2>
                <div className="space-y-5">
                  {percentages.map((percent, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm font-bold mb-2">
                        <span>{String.fromCharCode(65 + index)}</span>
                        <span>{percent}%</span>
                      </div>
                      <div className="h-4 bg-[#E8ECF7] rounded-full overflow-hidden">
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
                <h2 className="text-2xl font-extrabold mb-5">{c.debriefTitle}</h2>
                <div className="space-y-4">
                  {c.questions[pattern].map((question, index) => (
                    <div key={question} className="flex gap-3">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-sm font-extrabold">
                        {index + 1}
                      </div>
                      <p className="text-white/85 leading-relaxed">{question}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-2 bg-white border border-border-strong px-5 py-3 rounded-2xl font-bold hover:bg-subtle"
              >
                <Printer size={17} /> {c.worksheet}
              </button>
            </div>
          </>
        )}

        <section className="mt-10 border-t pt-7">
          <div className="inline-flex items-center gap-2 text-sm text-ink-muted">
            <ShieldCheck size={17} className="text-success" />
            {c.noLogin}
          </div>
        </section>
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
