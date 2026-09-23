import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Shield } from 'lucide-react';
import type { LifeLocale } from '../data/lifeScenarios';

const copy = {
  el: {
    back: 'Αρχική',
    title: 'Απόρρητο',
    summary: 'Η βασική εμπειρία των σεναρίων δεν χρειάζεται λογαριασμό και δεν ζητά όνομα, ηλικία, email ή προσωπική ιστορία.',
    items: [
      'Οι επιλογές σου δεν αποθηκεύονται ως προσωπικό προφίλ ή ιστορικό χρήστη από την εφαρμογή.',
      'Ο AI coach είναι προαιρετικός. Όταν τον χρησιμοποιείς, ο browser στέλνει στον δικό μας server μόνο το αναγνωριστικό του έτοιμου σεναρίου, την έτοιμη επιλογή που πάτησες και τη γλώσσα.',
      'Ο server μετατρέπει αυτά τα αναγνωριστικά στο προκαθορισμένο φανταστικό σενάριο και στέλνει αυτό το περιεχόμενο στο Groq για να δημιουργηθούν τρεις σύντομες ερωτήσεις αναστοχασμού.',
      'Δεν υπάρχει πεδίο ελεύθερου κειμένου προς τον AI coach, επομένως δεν χρειάζεται να μοιραστείς προσωπικά στοιχεία ή προσωπική ιστορία.',
      'Το API key του παρόχου AI παραμένει server-side και δεν αποστέλλεται στον browser.',
    ],
    noteTitle: 'Σημαντικό',
    note: 'Πριν από ευρύτερη διάθεση σε ανηλίκους χρειάζεται πλήρης έλεγχος ιδιωτικότητας, ηλικιακής στόχευσης, γονικής συναίνεσης όπου απαιτείται και των όρων του παρόχου AI.',
  },
  en: {
    back: 'Home',
    title: 'Privacy',
    summary: 'The core scenario experience does not require an account and does not ask for a name, age, email address or personal story.',
    items: [
      'Your choices are not stored by the app as a personal profile or user history.',
      'The AI coach is optional. When you use it, the browser sends our server only the prepared scenario ID, the prepared option you selected, and the language.',
      'The server converts those IDs into the predefined fictional scenario and sends that content to Groq to generate three short reflection questions.',
      'There is no free-text field sent to the AI coach, so you do not need to share personal information or a personal story.',
      'The AI provider API key remains server-side and is never sent to the browser.',
    ],
    noteTitle: 'Important',
    note: 'Before broader release to minors, a full review is required for privacy, age targeting, parental consent where applicable, and the AI provider’s terms.',
  },
} as const;

export const Privacy = () => {
  const { i18n } = useTranslation();
  const lang: LifeLocale = i18n.language.startsWith('en') ? 'en' : 'el';
  const c = copy[lang];

  return (
    <div className="min-h-screen bg-app">
      <div className="container-read py-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-8">
          <ArrowLeft size={16} /> {c.back}
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-accent" />
          <h1 className="font-display text-4xl">{c.title}</h1>
        </div>

        <p className="text-lg leading-relaxed text-ink mb-6">{c.summary}</p>

        <ul className="space-y-3 text-ink-muted list-disc pl-6 mb-10">
          {c.items.map((item) => <li key={item}>{item}</li>)}
        </ul>

        <div className="bg-subtle rounded-lg p-6">
          <h3 className="font-medium mb-2">{c.noteTitle}</h3>
          <p className="text-sm text-ink-muted">{c.note}</p>
        </div>
      </div>
    </div>
  );
};
