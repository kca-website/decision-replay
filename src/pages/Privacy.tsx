import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Shield } from 'lucide-react';
import type { LifeLocale } from '../data/lifeScenarios';

const copy = {
  el: {
    back: 'Αρχική',
    title: 'Απόρρητο στο prototype',
    summary: 'Η βασική εμπειρία των σεναρίων δεν χρειάζεται λογαριασμό και δεν ζητά όνομα, ηλικία, email ή προσωπική ιστορία.',
    items: [
      'Οι επιλογές μέσα στα σενάρια μένουν στην τρέχουσα συνεδρία του browser και δεν αποθηκεύονται σε δικό μας server.',
      'Ο AI coach είναι προαιρετικός. Αν τον πατήσεις, στέλνεται στον πάροχο AI μόνο το έτοιμο κείμενο του σεναρίου και η επιλογή που πάτησες.',
      'Δεν υπάρχει πεδίο ελεύθερου κειμένου προς τον AI coach, άρα δεν χρειάζεται να μοιραστείς προσωπικά στοιχεία.',
      'Το prototype χρησιμοποιεί Puter.js για την προαιρετική AI λειτουργία. Η επεξεργασία από τον τρίτο πάροχο διέπεται από τους δικούς του όρους και πολιτικές.',
      'Η παλιά έκδοση Decision Replay παραμένει προσβάσιμη μόνο ως legacy prototype και δεν αποτελεί μέρος της νέας ροής.',
    ],
    noteTitle: 'Σημαντικό',
    note: 'Πριν από οποιαδήποτε δημόσια έκδοση για ανηλίκους χρειάζεται ξεχωριστός έλεγχος ιδιωτικότητας, γονικής συναίνεσης όπου απαιτείται, ηλικιακής στόχευσης και όρων χρήσης του AI παρόχου.',
  },
  en: {
    back: 'Home',
    title: 'Prototype privacy',
    summary: 'The core scenario experience does not require an account and does not ask for a name, age, email address or personal story.',
    items: [
      'Scenario choices remain in the current browser session and are not stored on our own server.',
      'The AI coach is optional. If you use it, only the prepared scenario text and the option you selected are sent to the AI provider.',
      'There is no free-text field sent to the AI coach, so you do not need to share personal information.',
      'The prototype uses Puter.js for the optional AI feature. Processing by that third-party provider is governed by its own terms and policies.',
      'The previous Decision Replay experience remains available only as a legacy prototype and is not part of the new flow.',
    ],
    noteTitle: 'Important',
    note: 'Before any public release for minors, a separate review is required for privacy, parental consent where applicable, age targeting, and the AI provider’s terms.',
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
