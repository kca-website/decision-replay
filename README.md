# Decision Replay

**Lock what you expect. Return when reality is known.**

Το Decision Replay είναι ένα privacy-first εργαλείο για επαγγελματικές αποφάσεις, προβλέψεις και υποθέσεις. Ο χρήστης καταγράφει τι αποφασίζει, γιατί, τι περιμένει να συμβεί και πόσο βέβαιος είναι. Η αρχική σκέψη κλειδώνει. Αργότερα καταγράφεται το πραγματικό αποτέλεσμα και εμφανίζεται η σύγκριση **Τότε / Τώρα**.

Δεν αποφασίζει αντί του χρήστη. Τον βοηθά να ελέγχει αν οι προβλέψεις του ήταν ακριβείς και να μεταφέρει συγκεκριμένα μαθήματα στην επόμενη απόφαση.

## Βασικά χαρακτηριστικά

- Τρία επαγγελματικά instant demos στην αρχική σελίδα: marketing, e-commerce και career.
- Απλή καταγραφή με πέντε βασικές ερωτήσεις.
- Προαιρετική ενότητα για κριτήρια επιτυχίας, εναλλακτικές, υποθέσεις και ρίσκα.
- Κλειδωμένο αρχικό snapshot.
- Υπενθύμιση μέσω Google Calendar, Outlook ή αρχείου `.ics`, με ορατή ένδειξη αν έχει οριστεί σχέδιο επιστροφής.
- Replay που ξεχωρίζει δύο διαφορετικά πράγματα:
  - αν η αρχική πρόβλεψη επαληθεύτηκε,
  - αν το τελικό αποτέλεσμα ήταν καλό.
- Καθαρή σύγκριση Τότε / Τώρα και στατιστικά βαθμονόμησης.
- Ανώνυμη shareable κάρτα PNG ή native mobile share, με τίτλο και μάθημα κρυφά από προεπιλογή.
- Ελληνικά και αγγλικά.
- Χωρίς λογαριασμό, backend, cookies ή ενεργοποιημένο analytics tracker.
- Τα δεδομένα αποθηκεύονται μόνο στον browser μέσω IndexedDB.

## Τεχνολογία

- React 18 + TypeScript + Vite
- Tailwind CSS
- Dexie.js / IndexedDB
- react-i18next
- react-router-dom
- Zustand
- Lucide React
- html2canvas, φορτωμένο δυναμικά μόνο όταν δημιουργείται share card

Δεν χρησιμοποιούνται εξωτερικά web fonts ή επί πληρωμή υπηρεσίες.

## Τοπική εκτέλεση

Απαιτείται Node.js 18 ή νεότερο.

```bash
npm install
npm run dev
```

Το development URL είναι συνήθως `http://localhost:5173`.

### Έλεγχοι πριν από deploy

```bash
npx tsc --noEmit
npm run build
npm run preview
```

Το production build δημιουργείται στον φάκελο `dist/`.

## Deploy στο Vercel

1. Ανέβασε το project σε GitHub.
2. Στο Vercel επίλεξε **Add New → Project** και κάνε import το repository.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

Το `vercel.json` περιλαμβάνει rewrite για το SPA routing, ώστε τα εσωτερικά routes να ανοίγουν σωστά και μετά από refresh.

## Δομή

```text
src/
├── App.tsx
├── components/
│   ├── layout/
│   └── ui/
├── data/
├── db/
├── i18n/
│   └── locales/
├── pages/
├── store/
└── utils/
```

Κύρια flows:

```text
Landing → New Decision → Locked Decision → Calendar Reminder
        → Replay → Then / Now Comparison → Anonymous Share Card
```

## Ιδιωτικότητα και περιορισμοί

- Οι αποφάσεις και τα replays δεν αποστέλλονται σε server.
- Η διαγραφή δεδομένων browser ή site storage διαγράφει και τις αποφάσεις. Χρησιμοποίησε export backup από τις Ρυθμίσεις.
- Τα δεδομένα δεν συγχρονίζονται μεταξύ συσκευών.
- Το προαιρετικό independent-prediction link ενσωματώνει στοιχεία της απόφασης στο URL hash, ώστε να μην αποστέλλονται ως query σε server. Η εφαρμογή εξακολουθεί να προειδοποιεί να μη χρησιμοποιείται με εμπιστευτικές πληροφορίες.
- Οι calendar υπηρεσίες λαμβάνουν μόνο τα στοιχεία του reminder που επιλέγει να προσθέσει ο χρήστης.
- Υπάρχει privacy-safe event layer για μελλοντική μέτρηση βασικών product actions, αλλά δεν στέλνει τίποτα χωρίς ρητή εγκατάσταση analytics adapter από τον ιδιοκτήτη του site.

## Compatibility

Τα υπάρχοντα δεδομένα της προηγούμενης έκδοσης παραμένουν αναγνώσιμα. Τα παλαιότερα replays που δεν περιέχουν το νέο πεδίο «συμφωνία πρόβλεψης» εμφανίζονται κανονικά, αλλά δεν υπολογίζονται στα νέα calibration metrics.

## Έκδοση

Current MVP: **0.4.0**

## License

MIT — δες το `LICENSE`.

## Made by

Konstantinos Koustas
[LinkedIn](https://www.linkedin.com/in/kostaskoustas)
