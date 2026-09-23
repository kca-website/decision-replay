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

          <div className="container-app pt-10 pb-16 md:pt-20 md:pb-24 relative">
            <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-10 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.15em] text-[#5148E8] bg-white/80 border px-3 py-2 rounded-full mb-5 shadow-xs">
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
                <div className="bg-gradient-to-r from-[#635BFF] via-[#7C3AED] to-[#0EA5E9] text-white p-5 md:p-6">
                  <div className="text-xs uppercase tracking-[0.16em] text-white/75 font-bold mb-2">{c.sampleLabel}</div>
                  <h2 className="text-2xl md:text-3xl font-extrabold">{c.sampleTitle}</h2>
                </div>
                <div className="p-5 md:p-7">
                  <p className="text-ink-muted leading-relaxed mb-6">{c.sampleText}</p>
                  <div className="text-sm font-bold mb-3">{c.sampleQuestion}</div>
                  <div className="border-2 border-[#C7C3FF] bg-[#F3F2FF] rounded-2xl p-4 mb-4">
                    <div className="text-sm font-bold">{c.sampleChoice}</div>
                  </div>
                  <div className="flex gap-3 rounded-2xl bg-[#ECFEFF] border border-[#A5F3FC] p-4">
                    <MessageCircleQuestion size={20} className="text-[#0891B2] shrink-0 mt-0.5" />
                    <p className="text-sm text-ink-muted leading-relaxed">{c.sampleConsequence}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-[#EEF2FF] to-[#F7FAFF] py-16 md:py-20">
          <div className="container-app">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">{c.categoriesTitle}</h2>
            <div className="grid md:grid-cols-3 gap-5">
              <CategoryCard
                icon={<Wifi size={22} />}
                title={c.internetTitle}
                text={c.internetText}
                iconClass="bg-[#E0F2FE] text-[#0284C7]"
                accentClass="border-t-[#38BDF8]"
              />
              <CategoryCard
                icon={<BrainCircuit size={22} />}
                title={c.aiTitle}
                text={c.aiText}
                iconClass="bg-[#EDE9FE] text-[#7C3AED]"
                accentClass="border-t-[#8B5CF6]"
              />
              <CategoryCard
                icon={<Users size={22} />}
                title={c.friendsTitle}
                text={c.friendsText}
                iconClass="bg-[#ECFCCB] text-[#4D7C0F]"
                accentClass="border-t-[#A3E635]"
              />
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
