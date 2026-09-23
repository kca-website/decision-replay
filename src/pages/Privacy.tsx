import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Shield } from 'lucide-react';
import type { LifeLocale } from '../data/lifeScenarios';

const copy = {
  el: {
    back: 'Αρχική',
    title: 'Απόρρητο',
    summary: 'Η εμπειρία των σεναρίων και η λειτουργία τάξης δεν χρειάζονται λογαριασμό και δεν ζητούν όνομα, ηλικία, email ή προσωπική ιστορία.',
    items: [
      'Οι επιλογές στα μαθητικά σενάρια λειτουργούν μέσα στον browser και δεν δημιουργούν προσωπικό προφίλ ή ιστορικό μαθητή.',
      'Οι ερωτήσεις αναστοχασμού είναι προετοιμασμένο περιεχόμενο του σεναρίου. Δεν αποστέλλεται επιλογή ή κείμενο μαθητή σε υπηρεσία AI.',
      'Στη λειτουργία τάξης ο εκπαιδευτικός καταχωρίζει μόνο συνολικούς αριθμούς ψήφων ή ομάδων — ποτέ ονόματα μαθητών.',
      'Δεν απαιτούνται κινητά μαθητών. Η δραστηριότητα μπορεί να γίνει από μία οθόνη ή διαδραστικό πίνακα.',
      'Η εφαρμογή δεν ζητά ελεύθερο κείμενο από ανήλικο για να λειτουργήσει η βασική εμπειρία.',
    ],
    noteTitle: 'Αρχή σχεδιασμού',
    note: 'Στόχος είναι η ελάχιστη δυνατή συλλογή δεδομένων: έτοιμα σενάρια, τοπικές επιλογές και ανώνυμη χρήση στην τάξη.',
  },
  en: {
    back: 'Home',
    title: 'Privacy',
    summary: 'The scenario experience and classroom mode require no account and ask for no name, age, email address or personal story.',
    items: [
      'Student scenario choices run in the browser and do not create a personal profile or learner history.',
      'Reflection questions are prepared scenario content. No learner choice or learner-written text is sent to an AI service.',
      'In classroom mode, the teacher enters only aggregate vote or group counts — never student names.',
      'Student phones are not required. The activity can run from one screen or interactive board.',
      'The core experience does not require a minor to submit free text.',
    ],
    noteTitle: 'Design principle',
    note: 'The goal is data minimisation: prepared scenarios, local choices and anonymous classroom use.',
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
