# Decision Replay

> **Μην καταγράφεις απλώς τις αποφάσεις σου. Μάθε από αυτές.**
> Don't just track your decisions. Learn from them.

Το Decision Replay αποθηκεύει το πώς σκεφτόσουν όταν πήρες μια απόφαση και επιστρέφει όταν φανεί το αποτέλεσμα, για να σε βοηθήσει να αναγνωρίσεις τα δικά σου μοτίβα.

- **Δωρεάν, χωρίς λογαριασμό.**
- **Τα δεδομένα μένουν στη συσκευή σου** (IndexedDB, no server).
- **Δίγλωσσο** (Ελληνικά / English).
- **Ανοιχτός κώδικας** (MIT).

---

## Τι είναι μέσα

- React 18 + TypeScript + Vite
- Tailwind CSS με τα custom design tokens
- Dexie.js για local IndexedDB
- react-i18next για EL/EN
- react-router-dom για routing
- Zustand για user profile state
- Lucide-react για icons

Bundle target: ~180-220KB gzipped.

---

## Πρώτη εγκατάσταση (τοπικά, στο μηχάνημά σου)

### Προαπαιτούμενα
- **Node.js 18+** και **npm** εγκατεστημένα.
  Δες αν έχεις: `node --version` και `npm --version`.

### Βήματα

```bash
# 1. Πήγαινε στον φάκελο του project
cd decision-replay

# 2. Εγκατέστησε τα dependencies (μία φορά)
npm install

# 3. Ξεκίνα τον development server
npm run dev
```

Θα ανοίξει στο http://localhost:5173.

### Άλλες εντολές

```bash
npm run build     # Παράγει το production build στο /dist
npm run preview   # Preview του production build τοπικά
```

---

## Δημοσίευση στο Vercel (δωρεάν)

### 1. Ανέβασμα στο GitHub

```bash
# Στον φάκελο του project
git init
git add .
git commit -m "Initial: Decision Replay MVP v0.1"
git branch -M main

# Δημιούργησε καινούριο repo στο github.com/new (π.χ. "decision-replay")
# και μετά:
git remote add origin git@github.com:USERNAME/decision-replay.git
git push -u origin main
```

### 2. Σύνδεση με Vercel

1. Πήγαινε στο https://vercel.com/new
2. Κάνε **Import Git Repository** και διάλεξε το `decision-replay` repo.
3. Framework Preset: **Vite** (θα αναγνωριστεί αυτόματα).
4. Build Command: `npm run build`  (default)
5. Output Directory: `dist`  (default)
6. Πάτησε **Deploy**.

Σε ~30 δευτερόλεπτα θα έχεις live URL όπως `decision-replay-username.vercel.app`.
Κάθε `git push` θα αναπτύσσει αυτόματα.

Το `vercel.json` που περιλαμβάνεται φροντίζει για το SPA routing (χωρίς 404 σε refresh εσωτερικών σελίδων).

---

## Πώς είναι οργανωμένος ο κώδικας

```
src/
├── App.tsx                    # Router root
├── main.tsx                   # Entry point
├── index.css                  # Tailwind + globals
├── i18n/
│   ├── index.ts               # i18next setup
│   └── locales/
│       ├── el.json            # Ελληνικά
│       └── en.json            # English
├── db/
│   └── db.ts                  # Dexie schema (decisions, replays, notes, meta)
├── store/
│   └── profileStore.ts        # Zustand: user profile + onboarding flag
├── data/
│   └── templates.ts           # Τα 6 decision templates
├── utils/
│   ├── date.ts                # Ημερομηνίες, greetings
│   ├── backup.ts              # Export/import JSON
│   └── calibration.ts         # Στατιστικά και observations
├── components/
│   ├── ui/                    # Button, Input, Card, Badge, Slider, etc.
│   └── layout/
│       ├── AppShell.tsx       # Sidebar + bottom nav
│       └── LanguageToggle.tsx
└── pages/
    ├── Landing.tsx            # Public home
    ├── About.tsx
    ├── Privacy.tsx
    ├── Onboarding.tsx
    ├── Dashboard.tsx
    ├── DecisionsList.tsx
    ├── NewDecision.tsx        # Wizard 3 βημάτων
    ├── DecisionDetail.tsx     # Locked snapshot view
    ├── ReplayFlow.tsx         # 2-step replay form
    ├── Comparison.tsx         # «Τότε vs Τώρα»
    └── Settings.tsx           # Backup, restore, delete-all
```

---

## Ιδιωτικότητα (design principle)

- Κανένα δεδομένο δεν φεύγει από τη συσκευή του χρήστη.
- Καμία αποστολή σε server, καμία τηλεμετρία, κανένα cookie.
- Οι fonts (Fraunces + Inter) φορτώνονται από τα Google Fonts μόνο για rendering — αν θέλεις να τα κάνεις self-hosted για πλήρη offline λειτουργία, δες τα docs του Fontsource ή κατέβασε τα woff2.

---

## Επόμενα βήματα (post-MVP, όχι στο v1.0)

- Dark mode
- .ics calendar export για να θυμάται ο χρήστης το replay
- PDF export συγκρίσεων
- Optional AI insights (opt-in, με ρητή συναίνεση)
- Cross-device sync (θα απαιτεί backend — προαιρετικό)

---

## License

MIT — δες `LICENSE` (αν λείπει, πρόσθεσέ το από το GitHub UI όταν δημιουργείς το repo).

---

## Made by

Ένα portfolio project από τον Κώστα Κούστα.
Product creator · Business operations · AI workflow designer.
