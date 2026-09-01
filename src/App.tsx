import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronLeft,
  CircleHelp,
  Clock3,
  Database,
  FileCheck2,
  Gauge,
  History,
  Languages,
  RefreshCw,
  RotateCcw,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Trash2,
  XCircle,
} from 'lucide-react';

type Lang = 'el' | 'en';
type Freshness = 'stable' | 'sensitive' | 'volatile';
type ClaimKind = 'claim' | 'recommendation' | 'prediction';
type Outcome = 'worked' | 'partial' | 'failed' | 'worse';
type View = 'home' | 'new' | 'library' | 'detail' | 'stats';

interface AdviceClaim {
  id: string;
  text: string;
  kind: ClaimKind;
  freshness: Freshness;
  sourceAttached: boolean;
  recheckDays: number;
}

interface Passport {
  id: string;
  title: string;
  aiSource: string;
  category: string;
  rawText: string;
  createdAt: string;
  lastCheckedAt: string;
  dueAt: string;
  claims: AdviceClaim[];
  actedOn: boolean;
  outcome?: Outcome;
  outcomeNote?: string;
}

const STORAGE_KEY = 'decision-replay-advice-passports-v1';

const copy = {
  el: {
    brand: 'Decision Replay',
    subbrand: 'AI Advice Passport',
    navHome: 'Αρχική',
    navLibrary: 'Passports',
    navStats: 'Reliability',
    heroEyebrow: 'ΜΗΝ ΚΡΑΤΑΣ ΑΠΑΝΤΗΣΕΙΣ AI ΧΩΡΙΣ ΗΜΕΡΟΜΗΝΙΑ',
    heroTitle: 'Οι απαντήσεις AI παλιώνουν. Μάθε πότε η δική σου χρειάζεται ξανά έλεγχο.',
    heroText: 'Αποθήκευσε μια σημαντική απάντηση από ChatGPT, Claude, Gemini ή άλλο AI. Το Decision Replay τη μετατρέπει σε Advice Passport: ξεχωρίζει claims, recommendations και predictions, εκτιμά πόσο γρήγορα μπορεί να παλιώσουν και κρατά τι συνέβη αν τα ακολούθησες.',
    create: 'Δημιούργησε Advice Passport',
    seeHow: 'Δες πώς λειτουργεί',
    noAccount: 'Χωρίς λογαριασμό',
    localOnly: 'Αποθήκευση μόνο στον browser',
    noFakeScore: 'Χωρίς ψεύτικο “AI accuracy score”',
    sampleTitle: 'Παράδειγμα Passport',
    sampleAnswer: '“Το δωρεάν plan περιλαμβάνει export σε PDF και είναι σήμερα η καλύτερη επιλογή κάτω από €20.”',
    sampleSensitive: 'Time-sensitive',
    sampleVolatile: 'Highly volatile',
    sampleStable: 'Stable',
    sampleClaim1: 'Το δωρεάν plan περιλαμβάνει export σε PDF.',
    sampleClaim2: 'Είναι η καλύτερη επιλογή κάτω από €20.',
    sampleClaim3: 'Η εφαρμογή υποστηρίζει export σε PDF.',
    recheck7: 'Recheck σε 7 ημέρες',
    recheck30: 'Recheck σε 30 ημέρες',
    recheck180: 'Recheck σε 180 ημέρες',
    whyTitle: 'Τι αλλάζει πρακτικά',
    why1Title: 'Freshness αντί για τυφλή εμπιστοσύνη',
    why1Text: 'Τιμές, δωρεάν πλάνα, νομοθεσία, διαθεσιμότητα και “καλύτερες επιλογές” μπορεί να αλλάξουν γρήγορα.',
    why2Title: 'Recall πριν ξαναχρησιμοποιήσεις παλιά συμβουλή',
    why2Text: 'Το Passport δείχνει πότε μια παλιά απάντηση έχει φτάσει στο σημείο που πρέπει να ξαναελεγχθεί.',
    why3Title: 'Outcome αντί για εντύπωση',
    why3Text: 'Αν ακολούθησες μια συμβουλή, καταγράφεις αν δούλεψε πλήρως, εν μέρει, καθόλου ή έκανε τα πράγματα χειρότερα.',
    newTitle: 'Νέο AI Advice Passport',
    newText: 'Κάνε paste την απάντηση όπως την έλαβες. Η ανάλυση γίνεται τοπικά με κανόνες — δεν στέλνεται σε server.',
    aiSource: 'Ποιο AI έδωσε την απάντηση;',
    category: 'Κατηγορία',
    titleLabel: 'Σύντομος τίτλος',
    titlePlaceholder: 'π.χ. Ποιο SSD να αγοράσω',
    pasteLabel: 'Απάντηση AI',
    pastePlaceholder: 'Κάνε paste εδώ την απάντηση που θέλεις να κρατήσεις…',
    analyze: 'Ανάλυση απάντησης',
    detected: 'Εντοπίστηκαν',
    items: 'σημεία',
    reviewText: 'Έλεγξε την ταξινόμηση πριν αποθηκεύσεις. Εσύ έχεις τον τελικό έλεγχο.',
    type: 'Τύπος',
    freshness: 'Freshness',
    source: 'Πηγή',
    attached: 'Υπάρχει link',
    noSource: 'Δεν υπάρχει link',
    claim: 'Claim',
    recommendation: 'Recommendation',
    prediction: 'Prediction',
    stable: 'Stable',
    sensitive: 'Time-sensitive',
    volatile: 'Highly volatile',
    save: 'Αποθήκευση Passport',
    back: 'Πίσω',
    libraryTitle: 'Τα Advice Passports μου',
    libraryText: 'Οι σημαντικές AI απαντήσεις που επέλεξες να κρατήσεις — μαζί με το πότε χρειάζονται νέο έλεγχο.',
    empty: 'Δεν έχεις δημιουργήσει ακόμη Passport.',
    emptyCta: 'Φτιάξε το πρώτο',
    fresh: 'Fresh',
    dueSoon: 'Recheck soon',
    overdue: 'Needs recheck',
    outcomeRecorded: 'Outcome recorded',
    created: 'Δημιουργήθηκε',
    recheck: 'Recheck',
    open: 'Άνοιγμα',
    rawAnswer: 'Αρχική απάντηση AI',
    claimsTitle: 'Passport items',
    markRechecked: 'Το ξαναέλεγξα σήμερα',
    followed: 'Ακολούθησα αυτή τη συμβουλή',
    outcomeTitle: 'Τι έγινε στην πράξη;',
    worked: 'Δούλεψε πλήρως',
    partial: 'Βοήθησε εν μέρει',
    failed: 'Δεν βοήθησε',
    worse: 'Έκανε τα πράγματα χειρότερα',
    outcomeNote: 'Τι συνέβη; (προαιρετικό)',
    saveOutcome: 'Αποθήκευση αποτελέσματος',
    delete: 'Διαγραφή Passport',
    statsTitle: 'Η δική μου εμπειρία με AI advice',
    statsText: 'Δεν είναι γενικό benchmark των μοντέλων. Είναι μόνο ό,τι συνέβη στις συμβουλές που εσύ επέλεξες να ακολουθήσεις.',
    passports: 'Passports',
    followedCount: 'Συμβουλές που ακολούθησα',
    successRate: 'Πλήρως ή μερικώς χρήσιμες',
    needsRecheck: 'Χρειάζονται recheck',
    bySource: 'Ανά AI',
    noOutcomes: 'Χρειάζονται περισσότερα outcomes για να εμφανιστούν χρήσιμα στοιχεία.',
    privacy: 'Privacy-first MVP: κανένα κείμενο δεν αποστέλλεται εκτός browser.',
    expiryLogic: 'Η “ημερομηνία recheck” είναι ένδειξη κινδύνου παλαίωσης, όχι εγγύηση αλήθειας.',
  },
  en: {
    brand: 'Decision Replay',
    subbrand: 'AI Advice Passport',
    navHome: 'Home',
    navLibrary: 'Passports',
    navStats: 'Reliability',
    heroEyebrow: 'DON’T KEEP AI ANSWERS WITHOUT A DATE',
    heroTitle: 'AI answers age. Know when yours needs to be checked again.',
    heroText: 'Save an important answer from ChatGPT, Claude, Gemini or another AI. Decision Replay turns it into an Advice Passport: it separates claims, recommendations and predictions, estimates how quickly they may age, and records what happened if you followed them.',
    create: 'Create Advice Passport',
    seeHow: 'See how it works',
    noAccount: 'No account',
    localOnly: 'Stored only in your browser',
    noFakeScore: 'No fake “AI accuracy score”',
    sampleTitle: 'Example Passport',
    sampleAnswer: '“The free plan includes PDF export and is currently the best option under €20.”',
    sampleSensitive: 'Time-sensitive',
    sampleVolatile: 'Highly volatile',
    sampleStable: 'Stable',
    sampleClaim1: 'The free plan includes PDF export.',
    sampleClaim2: 'It is currently the best option under €20.',
    sampleClaim3: 'The app supports PDF export.',
    recheck7: 'Recheck in 7 days',
    recheck30: 'Recheck in 30 days',
    recheck180: 'Recheck in 180 days',
    whyTitle: 'What changes in practice',
    why1Title: 'Freshness instead of blind trust',
    why1Text: 'Prices, free plans, regulations, availability and “best choice” claims can change quickly.',
    why2Title: 'Recall before reusing old advice',
    why2Text: 'The Passport shows when an old answer has reached the point where it should be checked again.',
    why3Title: 'Outcomes instead of impressions',
    why3Text: 'If you followed the advice, record whether it worked fully, partly, not at all, or made things worse.',
    newTitle: 'New AI Advice Passport',
    newText: 'Paste the answer exactly as you received it. Analysis is local and rule-based — nothing is sent to a server.',
    aiSource: 'Which AI gave this answer?',
    category: 'Category',
    titleLabel: 'Short title',
    titlePlaceholder: 'e.g. Which SSD should I buy?',
    pasteLabel: 'AI answer',
    pastePlaceholder: 'Paste the answer you want to keep…',
    analyze: 'Analyze answer',
    detected: 'Detected',
    items: 'items',
    reviewText: 'Review the classification before saving. You remain in control.',
    type: 'Type',
    freshness: 'Freshness',
    source: 'Source',
    attached: 'Link attached',
    noSource: 'No link attached',
    claim: 'Claim',
    recommendation: 'Recommendation',
    prediction: 'Prediction',
    stable: 'Stable',
    sensitive: 'Time-sensitive',
    volatile: 'Highly volatile',
    save: 'Save Passport',
    back: 'Back',
    libraryTitle: 'My Advice Passports',
    libraryText: 'The important AI answers you chose to keep — including when they should be checked again.',
    empty: 'You have not created a Passport yet.',
    emptyCta: 'Create the first one',
    fresh: 'Fresh',
    dueSoon: 'Recheck soon',
    overdue: 'Needs recheck',
    outcomeRecorded: 'Outcome recorded',
    created: 'Created',
    recheck: 'Recheck',
    open: 'Open',
    rawAnswer: 'Original AI answer',
    claimsTitle: 'Passport items',
    markRechecked: 'I rechecked this today',
    followed: 'I followed this advice',
    outcomeTitle: 'What happened in the real world?',
    worked: 'Worked completely',
    partial: 'Helped partly',
    failed: 'Did not help',
    worse: 'Made things worse',
    outcomeNote: 'What happened? (optional)',
    saveOutcome: 'Save outcome',
    delete: 'Delete Passport',
    statsTitle: 'My experience with AI advice',
    statsText: 'This is not a general benchmark of AI models. It only reflects what happened to advice you personally chose to follow.',
    passports: 'Passports',
    followedCount: 'Advice followed',
    successRate: 'Fully or partly useful',
    needsRecheck: 'Need recheck',
    bySource: 'By AI source',
    noOutcomes: 'More outcomes are needed before useful patterns can be shown.',
    privacy: 'Privacy-first MVP: no pasted text leaves your browser.',
    expiryLogic: 'The “recheck date” is an ageing-risk signal, not a guarantee of truth.',
  },
} as const;

const categories = ['Technology', 'Shopping', 'Travel', 'Work', 'Research', 'Finance', 'Education', 'Other'];
const aiSources = ['ChatGPT', 'Claude', 'Gemini', 'Copilot', 'Grok', 'Perplexity', 'Other'];

const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
const addDays = (iso: string, days: number) => {
  const date = new Date(iso);
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

const sentenceSplit = (text: string) =>
  text
    .replace(/\n+/g, ' ')
    .split(/(?<=[.!?;])\s+(?=[A-ZΑ-ΩΆΈΉΊΌΎΏ0-9“"'])/u)
    .map((s) => s.trim().replace(/^[-•]\s*/, ''))
    .filter((s) => s.length >= 24)
    .slice(0, 12);

const classifyKind = (text: string): ClaimKind => {
  const lower = text.toLowerCase();
  if (/(recommend|should|i would|use |choose |buy |avoid |consider |προτείν|θα έπρεπε|χρησιμοποίη|επέλε|αγόρα|απόφυγ|καλύτερα να)/i.test(lower)) return 'recommendation';
  if (/(will |should result|likely|probably|expect|θα |πιθαν|αναμέν|λογικά|πρόκειται)/i.test(lower)) return 'prediction';
  return 'claim';
};

const classifyFreshness = (text: string, category: string): Freshness => {
  const lower = text.toLowerCase();
  const volatile = /(today|currently|right now|latest|cheapest|best price|stock|available now|sale|discount|free plan|subscription|price|€|\$|£|σήμερα|αυτή τη στιγμή|τρέχ|τελευταί|φθηνότερ|τιμή|διαθέσιμ|προσφορά|έκπτωση|δωρεάν πλάνο|συνδρομ)/i;
  const sensitive = /(law|regulation|policy|visa|passport|requirement|schedule|opening hours|version|software|feature|support|compatib|terms|warranty|tax|rate|rule|νομοθε|κανονισ|πολιτικ|βίζ|διαβατ|απαίτησ|ωράριο|έκδοση|λειτουργία|υποστηρ|συμβατ|όροι|εγγύηση|φόρ|επιτόκ|κανό)/i;
  if (volatile.test(lower)) return 'volatile';
  if (sensitive.test(lower) || ['Shopping', 'Travel', 'Finance'].includes(category)) return 'sensitive';
  return 'stable';
};

const daysForFreshness = (freshness: Freshness) => freshness === 'volatile' ? 7 : freshness === 'sensitive' ? 30 : 180;

const analyzeText = (text: string, category: string): AdviceClaim[] => {
  let sentences = sentenceSplit(text);
  if (sentences.length < 2) {
    sentences = text.split(/\n+/).map((s) => s.trim()).filter((s) => s.length >= 20).slice(0, 12);
  }
  return sentences.map((sentence) => {
    const freshness = classifyFreshness(sentence, category);
    return {
      id: uid(),
      text: sentence,
      kind: classifyKind(sentence),
      freshness,
      sourceAttached: /https?:\/\/|www\./i.test(sentence),
      recheckDays: daysForFreshness(freshness),
    };
  });
};

const formatDate = (iso: string, lang: Lang) => new Intl.DateTimeFormat(lang === 'el' ? 'el-GR' : 'en-GB', {
  day: 'numeric', month: 'short', year: 'numeric'
}).format(new Date(iso));

const statusFor = (passport: Passport) => {
  if (passport.outcome) return 'outcomeRecorded';
  const now = Date.now();
  const due = new Date(passport.dueAt).getTime();
  const diffDays = (due - now) / 86400000;
  if (diffDays < 0) return 'overdue';
  if (diffDays <= 7) return 'dueSoon';
  return 'fresh';
};

function App() {
  const [lang, setLang] = useState<Lang>('el');
  const t = copy[lang];
  const [view, setView] = useState<View>('home');
  const [passports, setPassports] = useState<Passport[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ title: '', aiSource: 'ChatGPT', category: 'Technology', rawText: '' });
  const [claims, setClaims] = useState<AdviceClaim[]>([]);
  const [analyzed, setAnalyzed] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | ''>('');
  const [outcomeNote, setOutcomeNote] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setPassports(JSON.parse(stored));
    } catch { /* ignore corrupt storage */ }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(passports));
  }, [passports]);

  const selected = passports.find((p) => p.id === selectedId) || null;

  const goNew = () => {
    setDraft({ title: '', aiSource: 'ChatGPT', category: 'Technology', rawText: '' });
    setClaims([]);
    setAnalyzed(false);
    setView('new');
  };

  const runAnalysis = () => {
    if (!draft.rawText.trim()) return;
    const result = analyzeText(draft.rawText, draft.category);
    setClaims(result.length ? result : [{
      id: uid(), text: draft.rawText.trim(), kind: 'claim', freshness: classifyFreshness(draft.rawText, draft.category),
      sourceAttached: /https?:\/\/|www\./i.test(draft.rawText), recheckDays: 30,
    }]);
    setAnalyzed(true);
  };

  const updateClaim = (id: string, patch: Partial<AdviceClaim>) => {
    setClaims((current) => current.map((claim) => {
      if (claim.id !== id) return claim;
      const next = { ...claim, ...patch };
      if (patch.freshness) next.recheckDays = daysForFreshness(patch.freshness);
      return next;
    }));
  };

  const savePassport = () => {
    if (!draft.rawText.trim() || !claims.length) return;
    const now = new Date().toISOString();
    const shortest = Math.min(...claims.map((c) => c.recheckDays));
    const passport: Passport = {
      id: uid(),
      title: draft.title.trim() || draft.rawText.trim().slice(0, 54),
      aiSource: draft.aiSource,
      category: draft.category,
      rawText: draft.rawText.trim(),
      createdAt: now,
      lastCheckedAt: now,
      dueAt: addDays(now, shortest),
      claims,
      actedOn: false,
    };
    setPassports((current) => [passport, ...current]);
    setSelectedId(passport.id);
    setView('detail');
  };

  const markRechecked = () => {
    if (!selected) return;
    const now = new Date().toISOString();
    const shortest = Math.min(...selected.claims.map((c) => c.recheckDays));
    setPassports((current) => current.map((p) => p.id === selected.id ? { ...p, lastCheckedAt: now, dueAt: addDays(now, shortest) } : p));
  };

  const markFollowed = () => {
    if (!selected) return;
    setPassports((current) => current.map((p) => p.id === selected.id ? { ...p, actedOn: true } : p));
  };

  const saveOutcome = () => {
    if (!selected || !outcome) return;
    setPassports((current) => current.map((p) => p.id === selected.id ? { ...p, actedOn: true, outcome, outcomeNote: outcomeNote.trim() } : p));
    setOutcome('');
    setOutcomeNote('');
  };

  const deleteSelected = () => {
    if (!selected) return;
    setPassports((current) => current.filter((p) => p.id !== selected.id));
    setSelectedId(null);
    setView('library');
  };

  const stats = useMemo(() => {
    const followed = passports.filter((p) => p.actedOn || p.outcome);
    const withOutcome = passports.filter((p) => p.outcome);
    const useful = withOutcome.filter((p) => p.outcome === 'worked' || p.outcome === 'partial').length;
    const needs = passports.filter((p) => statusFor(p) === 'overdue' || statusFor(p) === 'dueSoon').length;
    const bySource = aiSources.map((source) => {
      const items = withOutcome.filter((p) => p.aiSource === source);
      const good = items.filter((p) => p.outcome === 'worked' || p.outcome === 'partial').length;
      return { source, total: items.length, useful: good };
    }).filter((x) => x.total > 0);
    return {
      total: passports.length,
      followed: followed.length,
      outcomes: withOutcome.length,
      usefulRate: withOutcome.length ? Math.round((useful / withOutcome.length) * 100) : 0,
      needs,
      bySource,
    };
  }, [passports]);

  const navigate = (target: View) => {
    setView(target);
    if (target !== 'detail') setSelectedId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => navigate('home')} aria-label={t.navHome}>
          <span className="brand-mark"><History size={18} /></span>
          <span><strong>{t.brand}</strong><small>{t.subbrand}</small></span>
        </button>
        <nav className="nav-links" aria-label="Main navigation">
          <button className={view === 'home' ? 'active' : ''} onClick={() => navigate('home')}>{t.navHome}</button>
          <button className={view === 'library' || view === 'detail' ? 'active' : ''} onClick={() => navigate('library')}>{t.navLibrary}</button>
          <button className={view === 'stats' ? 'active' : ''} onClick={() => navigate('stats')}>{t.navStats}</button>
        </nav>
        <button className="lang-toggle" onClick={() => setLang(lang === 'el' ? 'en' : 'el')}><Languages size={16} /> {lang === 'el' ? 'EN' : 'EL'}</button>
      </header>

      {view === 'home' && <Home t={t} goNew={goNew} goLibrary={() => navigate('library')} />}
      {view === 'new' && (
        <NewPassport
          t={t}
          draft={draft}
          setDraft={setDraft}
          claims={claims}
          analyzed={analyzed}
          analyze={runAnalysis}
          updateClaim={updateClaim}
          save={savePassport}
          back={() => navigate('home')}
        />
      )}
      {view === 'library' && (
        <Library
          t={t}
          lang={lang}
          passports={passports}
          goNew={goNew}
          openPassport={(id) => { setSelectedId(id); setView('detail'); window.scrollTo({ top: 0 }); }}
        />
      )}
      {view === 'detail' && selected && (
        <Detail
          t={t}
          lang={lang}
          passport={selected}
          back={() => navigate('library')}
          markRechecked={markRechecked}
          markFollowed={markFollowed}
          outcome={outcome}
          setOutcome={setOutcome}
          outcomeNote={outcomeNote}
          setOutcomeNote={setOutcomeNote}
          saveOutcome={saveOutcome}
          remove={deleteSelected}
        />
      )}
      {view === 'stats' && <Stats t={t} stats={stats} />}

      <footer>
        <ShieldCheck size={16} /> {t.privacy}<span>•</span>{t.expiryLogic}
      </footer>
    </div>
  );
}

function Home({ t, goNew, goLibrary }: { t: typeof copy.el | typeof copy.en; goNew: () => void; goLibrary: () => void }) {
  return (
    <main>
      <section className="hero page-width">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={15} /> {t.heroEyebrow}</div>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>
          <div className="hero-actions">
            <button className="btn primary" onClick={goNew}>{t.create}<ArrowRight size={18} /></button>
            <button className="btn secondary" onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}>{t.seeHow}</button>
          </div>
          <div className="trust-row">
            <span><Check size={14} />{t.noAccount}</span>
            <span><Database size={14} />{t.localOnly}</span>
            <span><ShieldCheck size={14} />{t.noFakeScore}</span>
          </div>
        </div>
        <div className="passport-demo">
          <div className="passport-head">
            <div><small>{t.sampleTitle}</small><strong>AI-2026-091</strong></div>
            <span className="source-pill">ChatGPT</span>
          </div>
          <p className="demo-answer">{t.sampleAnswer}</p>
          <DemoClaim label={t.sampleSensitive} text={t.sampleClaim1} recheck={t.recheck30} level="sensitive" />
          <DemoClaim label={t.sampleVolatile} text={t.sampleClaim2} recheck={t.recheck7} level="volatile" />
          <DemoClaim label={t.sampleStable} text={t.sampleClaim3} recheck={t.recheck180} level="stable" />
          <div className="demo-footer"><CalendarClock size={16} /> Next recall check: <strong>08 Sep 2026</strong></div>
        </div>
      </section>

      <section id="how" className="section page-width">
        <div className="section-heading"><span>01</span><h2>{t.whyTitle}</h2></div>
        <div className="feature-grid">
          <Feature icon={<Clock3 />} title={t.why1Title} text={t.why1Text} />
          <Feature icon={<RotateCcw />} title={t.why2Title} text={t.why2Text} />
          <Feature icon={<Gauge />} title={t.why3Title} text={t.why3Text} />
        </div>
      </section>

      <section className="cta-band">
        <div><small>DECISION REPLAY / AI ADVICE PASSPORT</small><h2>{t.heroTitle}</h2></div>
        <div className="cta-actions"><button className="btn light" onClick={goNew}>{t.create}<ArrowRight size={18} /></button><button className="text-btn" onClick={goLibrary}>{t.navLibrary}</button></div>
      </section>
    </main>
  );
}

function DemoClaim({ label, text, recheck, level }: { label: string; text: string; recheck: string; level: Freshness }) {
  return <div className="demo-claim"><span className={`freshness-dot ${level}`} /><div><small>{label}</small><p>{text}</p><em>{recheck}</em></div></div>;
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <article className="feature-card"><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{text}</p></article>;
}

function NewPassport({ t, draft, setDraft, claims, analyzed, analyze, updateClaim, save, back }: any) {
  return (
    <main className="page-width narrow workspace">
      <button className="back-link" onClick={back}><ChevronLeft size={16} />{t.back}</button>
      <div className="workspace-heading"><div><span className="step-kicker">AI ADVICE PASSPORT</span><h1>{t.newTitle}</h1><p>{t.newText}</p></div><div className="privacy-badge"><ShieldCheck size={18} />Local analysis</div></div>
      <div className="form-card">
        <div className="form-grid two">
          <label><span>{t.aiSource}</span><select value={draft.aiSource} onChange={(e) => setDraft({ ...draft, aiSource: e.target.value })}>{aiSources.map((x) => <option key={x}>{x}</option>)}</select></label>
          <label><span>{t.category}</span><select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })}>{categories.map((x) => <option key={x}>{x}</option>)}</select></label>
        </div>
        <label><span>{t.titleLabel}</span><input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder={t.titlePlaceholder} /></label>
        <label><span>{t.pasteLabel}</span><textarea rows={11} value={draft.rawText} onChange={(e) => { setDraft({ ...draft, rawText: e.target.value }); }} placeholder={t.pastePlaceholder} /></label>
        {!analyzed && <button className="btn primary wide" disabled={!draft.rawText.trim()} onClick={analyze}><SearchCheck size={18} />{t.analyze}</button>}
      </div>

      {analyzed && <section className="analysis-panel">
        <div className="analysis-heading"><div><span className="step-kicker">PASSPORT REVIEW</span><h2>{t.detected} {claims.length} {t.items}</h2><p>{t.reviewText}</p></div><button className="btn secondary" onClick={analyze}><RefreshCw size={16} />Re-analyze</button></div>
        <div className="claim-list">
          {claims.map((claim: AdviceClaim, index: number) => <div className="claim-row" key={claim.id}>
            <div className="claim-number">{String(index + 1).padStart(2, '0')}</div>
            <div className="claim-content"><p>{claim.text}</p><div className="claim-controls">
              <label><span>{t.type}</span><select value={claim.kind} onChange={(e) => updateClaim(claim.id, { kind: e.target.value as ClaimKind })}><option value="claim">{t.claim}</option><option value="recommendation">{t.recommendation}</option><option value="prediction">{t.prediction}</option></select></label>
              <label><span>{t.freshness}</span><select value={claim.freshness} onChange={(e) => updateClaim(claim.id, { freshness: e.target.value as Freshness })}><option value="stable">{t.stable}</option><option value="sensitive">{t.sensitive}</option><option value="volatile">{t.volatile}</option></select></label>
              <div className="source-indicator"><span>{t.source}</span><strong className={claim.sourceAttached ? 'has-source' : ''}>{claim.sourceAttached ? t.attached : t.noSource}</strong></div>
            </div></div>
          </div>)}
        </div>
        <div className="save-bar"><div><FileCheck2 size={20} /><span>Shortest recheck window: <strong>{Math.min(...claims.map((c: AdviceClaim) => c.recheckDays))} days</strong></span></div><button className="btn primary" onClick={save}>{t.save}<ArrowRight size={18} /></button></div>
      </section>}
    </main>
  );
}

function Library({ t, lang, passports, goNew, openPassport }: { t: any; lang: Lang; passports: Passport[]; goNew: () => void; openPassport: (id: string) => void }) {
  return <main className="page-width workspace">
    <div className="library-heading"><div><span className="step-kicker">PASSPORT LIBRARY</span><h1>{t.libraryTitle}</h1><p>{t.libraryText}</p></div><button className="btn primary" onClick={goNew}>{t.create}<ArrowRight size={18} /></button></div>
    {!passports.length ? <div className="empty-state"><BrainCircuit size={42} /><h2>{t.empty}</h2><button className="btn primary" onClick={goNew}>{t.emptyCta}</button></div> : <div className="passport-grid">
      {passports.map((p) => {
        const status = statusFor(p);
        return <article className="passport-card" key={p.id} onClick={() => openPassport(p.id)}>
          <div className="passport-card-top"><span className="source-pill">{p.aiSource}</span><StatusBadge status={status} t={t} /></div>
          <h2>{p.title}</h2><p>{p.rawText.slice(0, 145)}{p.rawText.length > 145 ? '…' : ''}</p>
          <div className="passport-meta"><span>{p.category}</span><span>{p.claims.length} items</span></div>
          <div className="passport-dates"><span><small>{t.created}</small>{formatDate(p.createdAt, lang)}</span><span><small>{t.recheck}</small>{formatDate(p.dueAt, lang)}</span></div>
          <button className="card-open">{t.open}<ArrowRight size={16} /></button>
        </article>;
      })}
    </div>}
  </main>;
}

function StatusBadge({ status, t }: { status: string; t: any }) {
  const icon = status === 'fresh' ? <CheckCircle2 size={14} /> : status === 'outcomeRecorded' ? <FileCheck2 size={14} /> : <AlertTriangle size={14} />;
  return <span className={`status-badge ${status}`}>{icon}{t[status]}</span>;
}

function Detail({ t, lang, passport, back, markRechecked, markFollowed, outcome, setOutcome, outcomeNote, setOutcomeNote, saveOutcome, remove }: any) {
  const status = statusFor(passport);
  return <main className="page-width narrow workspace">
    <button className="back-link" onClick={back}><ChevronLeft size={16} />{t.back}</button>
    <div className="detail-hero">
      <div><div className="detail-tags"><span className="source-pill">{passport.aiSource}</span><StatusBadge status={status} t={t} /></div><h1>{passport.title}</h1><p>{passport.category} · {passport.claims.length} items</p></div>
      <div className="detail-date"><small>{t.recheck}</small><strong>{formatDate(passport.dueAt, lang)}</strong></div>
    </div>

    <section className="detail-section"><div className="detail-section-title"><h2>{t.claimsTitle}</h2><button className="btn secondary small" onClick={markRechecked}><RefreshCw size={15} />{t.markRechecked}</button></div>
      <div className="detail-claims">{passport.claims.map((claim: AdviceClaim) => <div className="detail-claim" key={claim.id}>
        <div className={`claim-type-icon ${claim.kind}`}>{claim.kind === 'recommendation' ? <ArrowRight size={16}/> : claim.kind === 'prediction' ? <Gauge size={16}/> : <CircleHelp size={16}/>}</div>
        <div><div className="detail-claim-meta"><span>{t[claim.kind]}</span><span className={`freshness-tag ${claim.freshness}`}>{t[claim.freshness]}</span><span>{claim.sourceAttached ? t.attached : t.noSource}</span></div><p>{claim.text}</p><small>Recheck window: {claim.recheckDays} days</small></div>
      </div>)}</div>
    </section>

    <section className="detail-section"><h2>{t.rawAnswer}</h2><blockquote>{passport.rawText}</blockquote></section>

    <section className="outcome-card">
      <div className="outcome-heading"><History size={22}/><div><span className="step-kicker">REAL-WORLD REPLAY</span><h2>{t.outcomeTitle}</h2></div></div>
      {!passport.actedOn && !passport.outcome ? <button className="btn secondary" onClick={markFollowed}><Check size={17}/>{t.followed}</button> : null}
      {(passport.actedOn || passport.outcome) && <>
        <div className="outcome-options">
          {(['worked','partial','failed','worse'] as Outcome[]).map((key) => <button key={key} className={`outcome-option ${outcome === key || passport.outcome === key ? 'selected' : ''}`} onClick={() => setOutcome(key)}>{key === 'worked' ? <CheckCircle2/> : key === 'partial' ? <Gauge/> : key === 'failed' ? <XCircle/> : <AlertTriangle/>}<span>{t[key]}</span></button>)}
        </div>
        <textarea rows={3} value={outcomeNote || passport.outcomeNote || ''} onChange={(e) => setOutcomeNote(e.target.value)} placeholder={t.outcomeNote}/>
        <button className="btn primary" disabled={!outcome && !passport.outcome} onClick={saveOutcome}>{t.saveOutcome}</button>
      </>}
    </section>

    <button className="danger-link" onClick={remove}><Trash2 size={15}/>{t.delete}</button>
  </main>;
}

function Stats({ t, stats }: { t: any; stats: any }) {
  return <main className="page-width workspace">
    <div className="library-heading"><div><span className="step-kicker">PERSONAL RELIABILITY</span><h1>{t.statsTitle}</h1><p>{t.statsText}</p></div></div>
    <div className="stat-grid"><Stat label={t.passports} value={stats.total} icon={<FileCheck2/>}/><Stat label={t.followedCount} value={stats.followed} icon={<Check/>}/><Stat label={t.successRate} value={stats.outcomes ? `${stats.usefulRate}%` : '—'} icon={<Gauge/>}/><Stat label={t.needsRecheck} value={stats.needs} icon={<AlertTriangle/>}/></div>
    <section className="stats-panel"><h2>{t.bySource}</h2>{!stats.bySource.length ? <div className="stats-empty"><BrainCircuit size={32}/><p>{t.noOutcomes}</p></div> : <div className="source-stats">{stats.bySource.map((x: any) => <div key={x.source}><div className="source-stat-head"><strong>{x.source}</strong><span>{x.useful}/{x.total} useful</span></div><div className="meter"><span style={{ width: `${(x.useful / x.total) * 100}%` }}/></div></div>)}</div>}</section>
  </main>;
}

function Stat({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return <div className="stat-card"><div>{icon}</div><strong>{value}</strong><span>{label}</span></div>;
}

export default App;
