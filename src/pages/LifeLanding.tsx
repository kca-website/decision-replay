import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  MessageCircleQuestion,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
} from 'lucide-react';
import { LanguageToggle } from '../components/layout/LanguageToggle';
import type { LifeLocale } from '../data/lifeScenarios';

const copy = {
  el: {
    brand: 'Εσύ τι θα έκανες;',
    eyebrow: 'Interactive life scenarios',
    titleA: 'Μπες στην ιστορία.',
    titleB: 'Εσύ αποφασίζεις τι γίνεται μετά.',
    sub: 'Σύντομα σενάρια για Internet, AI και φίλους. Δεν ψάχνουμε τη “σωστή απάντηση” — εξασκούμε το πώς σκεφτόμαστε πριν δράσουμε.',
    cta: 'Δοκίμασε ένα σενάριο',
    secondary: 'Δες πώς λειτουργεί',
    trust1: '2–4 λεπτά ανά ιστορία',
    trust2: 'Χωρίς βαθμολογία σωστό/λάθος',
    trust3: 'AI χωρίς προσωπικές ερωτήσεις',
    sampleLabel: 'Δείγμα ιστορίας',
    sampleTitle: 'Η φωτογραφία στην ομαδική',
    sampleText: 'Ένας φίλος ανεβάζει αστεία φωτογραφία συμμαθητή χωρίς να τον ρωτήσει. Όλοι γελάνε. Κάποιος λέει να μπει και σε story.',
    sampleQuestion: 'Τι θα έκανες;',
    sampleChoice: 'Θα έλεγα να μη δημοσιευτεί αλλού.',
    sampleConsequence: 'Η παρέα ίσως αντιδράσει, αλλά η φωτογραφία σταματά πριν διαδοθεί περισσότερο.',
    categoriesTitle: 'Τρεις κόσμοι για την πρώτη έκδοση',
    internetTitle: 'Internet',
    internetText: 'Ιδιωτικότητα, social media, online γνωριμίες και viral παγίδες.',
    aiTitle: 'AI',
    aiText: 'Deepfakes, αξιοπιστία, σχολικές εργασίες και υπεύθυνη χρήση.',
    friendsTitle: 'Φίλοι',
    friendsText: 'Πίεση παρέας, όρια, ομαδικές συνομιλίες και δύσκολες στιγμές.',
    howTitle: 'Δεν είναι quiz. Είναι προσομοίωση.',
    step1: '1. Μπαίνεις σε μια πραγματική κατάσταση.',
    step2: '2. Επιλέγεις πώς θα αντιδρούσες.',
    step3: '3. Βλέπεις συνέπειες και νέες οπτικές.',
    step4: '4. Ο AI coach σε βοηθά να σκεφτείς — δεν αποφασίζει για εσένα.',
    aiTitle2: 'AI με συγκεκριμένα όρια',
    aiText2: 'Ο coach δεν έχει ελεύθερη συνομιλία. Βλέπει μόνο το έτοιμο σενάριο και την επιλογή σου και επιστρέφει σύντομες ερωτήσεις αναστοχασμού. Δεν ζητά προσωπικά στοιχεία.',
    start: 'Μπες στις ιστορίες',
    footer: 'Prototype concept — όχι τελικό brand ή production έκδοση.',
  },
  en: {
    brand: 'What Would You Do?',
    eyebrow: 'Interactive life scenarios',
    titleA: 'Step into the story.',
    titleB: 'You decide what happens next.',
    sub: 'Short scenarios about the Internet, AI and friends. We are not looking for a single “correct answer” — we practise how to think before acting.',
    cta: 'Try a scenario',
    secondary: 'See how it works',
    trust1: '2–4 minutes per story',
    trust2: 'No right/wrong scoring',
    trust3: 'AI without personal questions',
    sampleLabel: 'Sample story',
    sampleTitle: 'The photo in the group chat',
    sampleText: 'A friend posts a funny photo of a classmate without asking. Everyone laughs. Someone suggests putting it on a story.',
    sampleQuestion: 'What would you do?',
    sampleChoice: 'I would say it should not be reposted.',
    sampleConsequence: 'The group may push back, but the photo stops before spreading further.',
    categoriesTitle: 'Three worlds for the first version',
    internetTitle: 'Internet',
    internetText: 'Privacy, social media, online contacts and viral traps.',
    aiTitle: 'AI',
    aiText: 'Deepfakes, reliability, schoolwork and responsible use.',
    friendsTitle: 'Friends',
    friendsText: 'Peer pressure, boundaries, group chats and difficult moments.',
    howTitle: 'Not a quiz. A simulation.',
    step1: '1. Enter a realistic situation.',
    step2: '2. Choose how you would respond.',
    step3: '3. See consequences and other perspectives.',
    step4: '4. The AI coach helps you think — it does not decide for you.',
    aiTitle2: 'AI with clear boundaries',
    aiText2: 'The coach is not an open chat. It sees only the prepared scenario and your selected option, then returns short reflection questions. It does not ask for personal information.',
    start: 'Explore the stories',
    footer: 'Prototype concept — not the final brand or production version.',
  },
} as const;

export const LifeLanding = () => {
  const { i18n } = useTranslation();
  const lang: LifeLocale = i18n.language.startsWith('en') ? 'en' : 'el';
  const c = copy[lang];

  return (
    <div className="min-h-screen bg-app text-ink">
      <header className="container-app py-5 flex items-center justify-between gap-4">
        <Link to="/" className="font-display text-xl md:text-2xl font-medium flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent rounded-full inline-block" />
          {c.brand}
        </Link>
        <LanguageToggle />
      </header>

      <main>
        <section className="container-app pt-10 pb-16 md:pt-20 md:pb-24">
          <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-10 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent mb-5">
                <Sparkles size={15} /> {c.eyebrow}
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.07] mb-6 max-w-3xl">
                {c.titleA} <em className="italic text-accent">{c.titleB}</em>
              </h1>
              <p className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-2xl mb-8">{c.sub}</p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link
                  to="/scenarios"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white text-base px-7 py-3.5 rounded-md font-medium hover:bg-accent-hover transition-colors"
                >
                  {c.cta} <ArrowRight size={18} />
                </Link>
                <a
                  href="#how"
                  className="inline-flex items-center justify-center gap-2 bg-card border border-border-strong text-ink text-base px-7 py-3.5 rounded-md font-medium hover:bg-subtle transition-colors"
                >
                  {c.secondary}
                </a>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-subtle">
                {[c.trust1, c.trust2, c.trust3].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-success" /> {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-card border rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-ink text-white p-5 md:p-6">
                <div className="text-xs uppercase tracking-[0.16em] text-white/65 mb-2">{c.sampleLabel}</div>
                <h2 className="font-display text-2xl md:text-3xl">{c.sampleTitle}</h2>
              </div>
              <div className="p-5 md:p-7">
                <p className="text-ink-muted leading-relaxed mb-6">{c.sampleText}</p>
                <div className="text-sm font-semibold mb-3">{c.sampleQuestion}</div>
                <div className="border border-accent-soft bg-[#FFF9F5] rounded-xl p-4 mb-4">
                  <div className="text-sm font-medium">{c.sampleChoice}</div>
                </div>
                <div className="flex gap-3 rounded-xl bg-subtle p-4">
                  <MessageCircleQuestion size={20} className="text-accent shrink-0 mt-0.5" />
                  <p className="text-sm text-ink-muted leading-relaxed">{c.sampleConsequence}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-subtle py-16 md:py-20">
          <div className="container-app">
            <h2 className="font-display text-3xl md:text-4xl text-center mb-10">{c.categoriesTitle}</h2>
            <div className="grid md:grid-cols-3 gap-5">
              <CategoryCard icon={<Wifi size={22} />} title={c.internetTitle} text={c.internetText} />
              <CategoryCard icon={<BrainCircuit size={22} />} title={c.aiTitle} text={c.aiText} />
              <CategoryCard icon={<Users size={22} />} title={c.friendsTitle} text={c.friendsText} />
            </div>
          </div>
        </section>

        <section id="how" className="container-app py-16 md:py-24 max-w-5xl">
          <h2 className="font-display text-3xl md:text-4xl text-center mb-10">{c.howTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[c.step1, c.step2, c.step3, c.step4].map((step, index) => (
              <div key={step} className="bg-card border rounded-xl p-5 md:p-6 flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full bg-accent-soft text-accent flex items-center justify-center font-semibold shrink-0">
                  {index + 1}
                </div>
                <p className="font-medium leading-relaxed pt-1">{step.substring(3)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y bg-card py-14">
          <div className="container-read text-center">
            <ShieldCheck size={30} className="text-success mx-auto mb-4" />
            <h2 className="font-display text-3xl mb-4">{c.aiTitle2}</h2>
            <p className="text-ink-muted text-lg leading-relaxed mb-7">{c.aiText2}</p>
            <Link
              to="/scenarios"
              className="inline-flex items-center justify-center gap-2 bg-accent text-white px-7 py-3.5 rounded-md font-medium hover:bg-accent-hover transition-colors"
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

const CategoryCard = ({ icon, title, text }: { icon: JSX.Element; title: string; text: string }) => (
  <article className="bg-card border rounded-2xl p-6 shadow-xs">
    <div className="w-11 h-11 rounded-xl bg-accent-soft text-accent flex items-center justify-center mb-5">{icon}</div>
    <h3 className="font-display text-2xl mb-3">{title}</h3>
    <p className="text-ink-muted leading-relaxed">{text}</p>
  </article>
);
