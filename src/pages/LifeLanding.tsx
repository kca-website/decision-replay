import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
} from 'lucide-react';
import { LanguageToggle } from '../components/layout/LanguageToggle';
import { ScenarioVisual } from '../components/ScenarioVisual';
import { lifeScenarios, type LifeLocale } from '../data/lifeScenarios';

const copy = {
  el: {
    brand: 'Εσύ τι θα έκανες;',
    eyebrow: 'Micro-simulations για πραγματικές στιγμές',
    titleA: 'Πριν σου συμβεί στ’ αλήθεια,',
    titleB: 'δοκίμασέ το εδώ.',
    sub: 'Μικρές, ρεαλιστικές προσομοιώσεις για ηλικίες 10–15 γύρω από AI, Internet και παρέα. Διαλέγεις, βλέπεις τι μπορεί να ακολουθήσει και ξαναδοκιμάζεις — χωρίς σκορ και χωρίς κήρυγμα.',
    cta: 'Μπες σε μια ιστορία',
    secondary: 'Πώς λειτουργεί',
    trust1: '2–4 λεπτά',
    trust2: 'Χωρίς σωστό / λάθος',
    trust3: 'Χωρίς login ή προσωπικά δεδομένα',
    sampleLabel: 'Πρόβα 01',
    sampleTitle: 'Η φωτογραφία στην ομαδική',
    sampleText: 'Ένας φίλος ανεβάζει άβολη φωτογραφία συμμαθητή χωρίς να τον ρωτήσει. Όλοι γελάνε. Κάποιος λέει να μπει και σε story.',
    sampleQuestion: 'Τι θα έκανες;',
    sampleChoice: 'Θα έλεγα να μη δημοσιευτεί αλλού.',
    sampleConsequence: 'Η παρέα ίσως αντιδράσει, αλλά βάζεις όριο πριν η φωτογραφία διαδοθεί περισσότερο.',
    whyEyebrow: 'Γιατί υπάρχει',
    whyTitle: 'Οι κανόνες είναι εύκολοι. Η στιγμή όχι.',
    whyText: 'Άλλο να ξέρεις θεωρητικά ότι πρέπει να προσέχεις και άλλο να πρέπει να αποφασίσεις μέσα σε λίγα δευτερόλεπτα. Εδώ κάνεις πρόβα στη στιγμή — με ασφάλεια.',
    why1: 'Πριν πατήσεις ένα ύποπτο link.',
    why2: 'Πριν πιστέψεις ένα deepfake.',
    why3: 'Πριν η ομαδική ξεφύγει.',
    categoriesTitle: 'ιστορίες. 3 κόσμοι. 2 ηλικιακές ζώνες.',
    internetTitle: 'Internet',
    internetText: 'Online γνωριμίες, scams, viral παγίδες και ιδιωτικότητα.',
    aiTitle: 'AI',
    aiText: 'Deepfakes, αξιοπιστία, σχολικές εργασίες και συμβουλές από AI.',
    friendsTitle: 'Φίλοι',
    friendsText: 'Πίεση παρέας, όρια, screenshots και δύσκολες κοινωνικές στιγμές.',
    howTitle: 'Μία ιστορία σε τέσσερα βήματα',
    step1: '1. Μπαίνεις στη στιγμή.',
    step2: '2. Διαλέγεις τι θα έκανες.',
    step3: '3. Βλέπεις τι μπορεί να ακολουθήσει.',
    step4: '4. Ξαναπαίζεις την ίδια στιγμή με άλλη επιλογή.',
    aiTitle2: 'Replay: ίδια στιγμή, άλλη επιλογή',
    aiText2: 'Δοκίμασε δεύτερη ή τρίτη αντίδραση στο ίδιο δίλημμα και σύγκρινε τι αλλάζει στις συνέπειες. Η εφαρμογή δεν βαθμολογεί το παιδί και δεν χρειάζεται λογαριασμό.',
    start: 'Ξεκίνα την πρώτη πρόβα',
    footer: 'Prototype — σύντομος simulator ψηφιακών και κοινωνικών αποφάσεων για προσωπική χρήση και τάξη.',
  },
  en: {
    brand: 'What Would You Do?',
    eyebrow: 'Micro-simulations for real moments',
    titleA: 'Before it happens for real,',
    titleB: 'try it here.',
    sub: 'Short, realistic simulations for ages 10–15 about AI, the Internet and friends. Choose, see what may follow and replay the moment — without scores or lectures.',
    cta: 'Enter a story',
    secondary: 'How it works',
    trust1: '2–4 minutes',
    trust2: 'No right / wrong',
    trust3: 'No login or personal data',
    sampleLabel: 'Rehearsal 01',
    sampleTitle: 'The photo in the group chat',
    sampleText: 'A friend posts an awkward photo of a classmate without asking. Everyone laughs. Someone suggests putting it on a story.',
    sampleQuestion: 'What would you do?',
    sampleChoice: 'I would say it should not be reposted.',
    sampleConsequence: 'The group may push back, but you set a boundary before the photo spreads further.',
    whyEyebrow: 'Why it exists',
    whyTitle: 'Rules are easy. The moment is not.',
    whyText: 'Knowing a rule in theory is different from making a choice in a few seconds. Here you can rehearse the moment safely.',
    why1: 'Before you tap a suspicious link.',
    why2: 'Before you believe a deepfake.',
    why3: 'Before the group chat blows up.',
    categoriesTitle: 'stories. 3 worlds. 2 age bands.',
    internetTitle: 'Internet',
    internetText: 'Online contacts, scams, viral traps and privacy.',
    aiTitle: 'AI',
    aiText: 'Deepfakes, reliability, schoolwork and advice from AI.',
    friendsTitle: 'Friends',
    friendsText: 'Peer pressure, boundaries, screenshots and difficult social moments.',
    howTitle: 'One story in four steps',
    step1: '1. Step into the moment.',
    step2: '2. Choose what you would do.',
    step3: '3. See what could happen next.',
    step4: '4. Replay the same moment with another choice.',
    aiTitle2: 'Replay: same moment, different choice',
    aiText2: 'Try a second or third response to the same dilemma and compare how the consequences change. The app does not grade the learner and requires no account.',
    start: 'Start your first rehearsal',
    footer: 'Prototype — a short simulator for digital and social decisions, for individual and classroom use.',
  },
} as const;

export const LifeLanding = () => {
  const { i18n } = useTranslation();
  const lang: LifeLocale = i18n.language.startsWith('en') ? 'en' : 'el';
  const c = copy[lang];

  return (
    <div className="min-h-screen bg-app text-ink">
      <header className="container-app py-5 flex items-center justify-between gap-4">
        <Link to="/" className="text-xl md:text-2xl font-extrabold flex items-center gap-2">
          <span className="w-3 h-3 bg-[#A3E635] rounded-full inline-block shadow-sm" />
          {c.brand}
        </Link>
        <LanguageToggle />
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#D9D6FF] blur-3xl opacity-70 pointer-events-none" />
          <div className="absolute top-48 -left-28 w-64 h-64 rounded-full bg-[#CFFAFE] blur-3xl opacity-70 pointer-events-none" />

          <div className="container-app pt-9 pb-16 md:pt-20 md:pb-24 relative">
            <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-10 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#5148E8] bg-white/85 border px-3 py-2 rounded-full mb-5 shadow-xs">
                  <Sparkles size={15} /> {c.eyebrow}
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.03] mb-6 max-w-3xl">
                  {c.titleA}{' '}
                  <span className="bg-gradient-to-r from-[#635BFF] via-[#7C3AED] to-[#0EA5E9] bg-clip-text text-transparent">
                    {c.titleB}
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-2xl mb-8">{c.sub}</p>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <Link
                    to="/scenarios"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#635BFF] to-[#0EA5E9] text-white text-base px-7 py-4 rounded-2xl font-bold shadow-md hover:opacity-95 transition-opacity"
                  >
                    {c.cta} <ArrowRight size={18} />
                  </Link>
                  <a
                    href="#how"
                    className="inline-flex items-center justify-center gap-2 bg-white border border-border-strong text-ink text-base px-7 py-4 rounded-2xl font-bold hover:bg-subtle transition-colors"
                  >
                    {c.secondary}
                  </a>
                </div>

                <div className="flex flex-wrap gap-2 text-sm">
                  {[c.trust1, c.trust2, c.trust3].map((item) => (
                    <span key={item} className="inline-flex items-center gap-1.5 bg-white border rounded-full px-3 py-2 text-ink-muted">
                      <CheckCircle2 size={14} className="text-success" /> {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white border rounded-[28px] shadow-lg overflow-hidden rotate-[1deg]">
                <div className="p-4 pb-0">
                  <ScenarioVisual visual="groupPhoto" />
                </div>
                <div className="p-5 md:p-7">
                  <div className="text-xs uppercase tracking-[0.14em] text-accent font-extrabold mb-2">{c.sampleLabel}</div>
                  <h2 className="text-2xl md:text-3xl font-extrabold mb-3">{c.sampleTitle}</h2>
                  <p className="text-ink-muted leading-relaxed mb-5">{c.sampleText}</p>
                  <div className="text-sm font-bold mb-3">{c.sampleQuestion}</div>
                  <div className="border-2 border-[#C7C3FF] bg-[#F3F2FF] rounded-2xl p-4 mb-4">
                    <div className="text-sm font-bold">{c.sampleChoice}</div>
                  </div>
                  <div className="rounded-2xl bg-[#ECFEFF] border border-[#A5F3FC] p-4 text-sm text-ink-muted leading-relaxed">
                    {c.sampleConsequence}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#111827] text-white py-14 md:py-18">
          <div className="container-app">
            <div className="max-w-3xl mb-9">
              <div className="text-xs uppercase tracking-[0.14em] font-extrabold text-[#A3E635] mb-3">{c.whyEyebrow}</div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{c.whyTitle}</h2>
              <p className="text-white/70 text-lg leading-relaxed">{c.whyText}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {[c.why1, c.why2, c.why3].map((item, index) => (
                <div key={item} className="rounded-2xl bg-white/8 border border-white/10 p-5 font-semibold">
                  <span className="text-[#A3E635] font-extrabold mr-2">0{index + 1}</span>{item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-[#EEF2FF] to-[#F7FAFF] py-16 md:py-20">
          <div className="container-app">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">{lifeScenarios.length} {c.categoriesTitle}</h2>
            <div className="grid md:grid-cols-3 gap-5">
              <CategoryCard icon={<Wifi size={22} />} title={c.internetTitle} text={c.internetText} iconClass="bg-[#E0F2FE] text-[#0284C7]" accentClass="border-t-[#38BDF8]" />
              <CategoryCard icon={<BrainCircuit size={22} />} title={c.aiTitle} text={c.aiText} iconClass="bg-[#EDE9FE] text-[#7C3AED]" accentClass="border-t-[#8B5CF6]" />
              <CategoryCard icon={<Users size={22} />} title={c.friendsTitle} text={c.friendsText} iconClass="bg-[#ECFCCB] text-[#4D7C0F]" accentClass="border-t-[#A3E635]" />
            </div>
          </div>
        </section>

        <section id="how" className="container-app py-16 md:py-24 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">{c.howTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[c.step1, c.step2, c.step3, c.step4].map((step, index) => (
              <div key={step} className="bg-white border rounded-2xl p-5 md:p-6 flex gap-4 items-start shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#635BFF] to-[#0EA5E9] text-white flex items-center justify-center font-extrabold shrink-0">
                  {index + 1}
                </div>
                <p className="font-semibold leading-relaxed pt-1">{step.substring(3)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y bg-[#111827] text-white py-14">
          <div className="container-read text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#A3E635] text-[#17233C] flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={28} />
            </div>
            <h2 className="text-3xl font-extrabold mb-4">{c.aiTitle2}</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-7">{c.aiText2}</p>
            <Link
              to="/scenarios"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#17233C] px-7 py-4 rounded-2xl font-bold hover:bg-[#EEF2FF] transition-colors"
            >
              {c.start} <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-9 text-center text-sm text-ink-subtle">{c.footer}</footer>
    </div>
  );
};

const CategoryCard = ({
  icon,
  title,
  text,
  iconClass,
  accentClass,
}: {
  icon: JSX.Element;
  title: string;
  text: string;
  iconClass: string;
  accentClass: string;
}) => (
  <article className={`bg-white border border-t-4 ${accentClass} rounded-2xl p-6 shadow-sm`}>
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${iconClass}`}>{icon}</div>
    <h3 className="text-2xl font-extrabold mb-3">{title}</h3>
    <p className="text-ink-muted leading-relaxed">{text}</p>
  </article>
);
