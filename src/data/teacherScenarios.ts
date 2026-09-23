export type TeacherPattern =
  | 'riskyConsensus'
  | 'safeConsensus'
  | 'safeSplit'
  | 'split'
  | 'minority';

export type TeacherRisk = 'high' | 'low';
export type TeacherArtifactKind = 'sms' | 'video' | 'chat';
export type TeacherLocale = 'el' | 'en';

export interface TeacherScenarioLocale {
  category: string;
  title: string;
  scenarioText: string;
  scenarioSimple: string;
  skills: string[];
  artifactLabel: string;
  artifactFrom: string;
  artifactBody: string;
  artifactLink?: string;
  artifactMeta?: string;
  choices: string[];
  simpleChoices: string[];
  barLabels: string[];
  questions: Record<TeacherPattern, string[]>;
  simpleQuestions: Record<TeacherPattern, string[]>;
  worksheetWhy: string;
  worksheetClue: string;
  worksheetSafe: string;
}

export interface TeacherScenario {
  id: string;
  artifactKind: TeacherArtifactKind;
  riskLevels: [TeacherRisk, TeacherRisk, TeacherRisk];
  el: TeacherScenarioLocale;
  en: TeacherScenarioLocale;
}

export const teacherScenarios: TeacherScenario[] = [
  {
    id: 'courier-sms',
    artifactKind: 'sms',
    riskLevels: ['high', 'low', 'low'],
    el: {
      category: 'Internet · Απάτες',
      title: 'Το μήνυμα για το δέμα',
      scenarioText: 'Στο κινητό εμφανίζεται μήνυμα που λέει ότι ένα δέμα δεν παραδόθηκε. Ζητά επιβεβαίωση διεύθυνσης και χρέωση 1,99€ μέσω συνδέσμου.',
      scenarioSimple: 'Έρχεται μήνυμα για ένα δέμα. Λέει: «Πάτησε εδώ και πλήρωσε 1,99€». Δεν ξέρεις αν είναι αληθινό.',
      skills: ['Ψηφιακή ιθαγένεια', 'Ασφαλής πλοήγηση', 'Κριτική σκέψη'],
      artifactLabel: 'SMS',
      artifactFrom: 'COURIER INFO',
      artifactBody: 'Το δέμα σας δεν παραδόθηκε. Επιβεβαιώστε τη διεύθυνσή σας και καταβάλετε 1,99€ εντός 30 λεπτών.',
      artifactLink: 'parcel-check.help/gr',
      choices: [
        'Πατάω τον σύνδεσμο για να δω τι έγινε.',
        'Μπαίνω μόνος μου στην επίσημη εφαρμογή/σελίδα της courier.',
        'Ρωτάω αν περιμένουμε δέμα και δεν ανοίγω τον σύνδεσμο.',
      ],
      simpleChoices: [
        'Πατάω το link.',
        'Μπαίνω στην επίσημη σελίδα.',
        'Ρωτάω αν περιμένουμε δέμα. Δεν πατάω το link.',
      ],
      barLabels: ['Πατάω το link', 'Επίσημη σελίδα', 'Ελέγχω χωρίς το link'],
      questions: {
        riskyConsensus: [
          'Τι υποθέσαμε για το μήνυμα ώστε ο σύνδεσμος να μας φανεί αρκετά ασφαλής;',
          'Γιατί το μήνυμα βάζει όριο «30 λεπτών»; Ποιος κερδίζει αν βιαστούμε;',
          'Πώς μπορούμε να ελέγξουμε αν υπάρχει πράγματι δέμα χωρίς να χρησιμοποιήσουμε τον σύνδεσμο;',
        ],
        safeConsensus: [
          'Τι στοιχείο του μηνύματος έκανε την ίδια στρατηγική να φαίνεται πιο ασφαλής στους περισσότερους;',
          'Ποιο διαφορετικό στοιχείο θα μπορούσε να σας κάνει να αλλάξετε τρόπο ελέγχου;',
          'Πώς ξεχωρίζουμε την επαλήθευση από το να εμπιστευόμαστε το ίδιο μήνυμα που μας πιέζει;',
        ],
        safeSplit: [
          'Οι δύο δημοφιλείς επιλογές αποφεύγουν το link. Τι ελέγχει καλύτερα η καθεμία;',
          'Ποια θα μπορούσε να γίνει πρώτη και ποια δεύτερη, χωρίς να αυξάνει τον κίνδυνο;',
          'Τι πληροφορία θέλουμε τελικά να επιβεβαιώσουμε: ότι υπάρχει δέμα, ποια courier το έχει ή και τα δύο;',
        ],
        split: [
          'Ποιο στοιχείο του μηνύματος ερμηνεύσατε διαφορετικά μεταξύ σας;',
          'Ποια επιλογή μας δίνει περισσότερες πληροφορίες πριν κάνουμε κάτι που ίσως δεν αναστρέφεται;',
          'Τι μπορούμε να ελέγξουμε πρώτα χωρίς να δώσουμε στοιχεία ή χρήματα;',
        ],
        minority: [
          'Ας ακούσουμε πρώτα τη λιγότερο δημοφιλή επιλογή: ποια λογική μπορεί να κρύβεται πίσω της;',
          'Τι πληροφορία λείπει από το μήνυμα και θα βοηθούσε όλους να αποφασίσουν καλύτερα;',
          'Ποια ασφαλής ενέργεια μπορεί να γίνει πρώτη, πριν αποφασίσουμε αν θα συνεχίσουμε;',
        ],
      },
      simpleQuestions: {
        riskyConsensus: ['Τι σε έκανε να εμπιστευτείς το μήνυμα;', 'Γιατί γράφει «μέσα σε 30 λεπτά»;', 'Πώς ελέγχουμε το δέμα χωρίς να πατήσουμε το link;'],
        safeConsensus: ['Τι σε έκανε να μην πατήσεις το link;', 'Τι άλλο θα ήθελες να ξέρεις πριν αποφασίσεις;', 'Πώς ελέγχουμε αν υπάρχει πράγματι δέμα;'],
        safeSplit: ['Και οι δύο επιλογές δεν πατούν το link. Τι ελέγχει η καθεμία;', 'Ποιον έλεγχο θα έκανες πρώτο;', 'Τι θέλουμε να μάθουμε για το δέμα;'],
        split: ['Τι είδαμε διαφορετικά στο ίδιο μήνυμα;', 'Ποια επιλογή μάς δίνει πρώτα περισσότερες πληροφορίες;', 'Τι μπορούμε να ελέγξουμε χωρίς να πατήσουμε το link;'],
        minority: ['Γιατί κάποιοι διάλεξαν διαφορετικά;', 'Τι πληροφορία λείπει από το μήνυμα;', 'Τι ασφαλές μπορούμε να κάνουμε πρώτα;'],
      },
      worksheetWhy: 'Γιατί θα διάλεγες αυτή την επιλογή;',
      worksheetClue: 'Ποια σημεία του μηνύματος θα έλεγες ότι χρειάζονται έλεγχο;',
      worksheetSafe: 'Ποια είναι μία ενέργεια που μπορείς να κάνεις χωρίς να πατήσεις τον σύνδεσμο;',
    },
    en: {
      category: 'Internet · Scams',
      title: 'The delivery message',
      scenarioText: 'A message says a parcel could not be delivered. It asks you to confirm your address and pay €1.99 through a link.',
      scenarioSimple: 'You get a parcel message. It says: “Tap here and pay €1.99.” You do not know if it is real.',
      skills: ['Digital citizenship', 'Safe browsing', 'Critical thinking'],
      artifactLabel: 'SMS',
      artifactFrom: 'COURIER INFO',
      artifactBody: 'Your parcel could not be delivered. Confirm your address and pay €1.99 within 30 minutes.',
      artifactLink: 'parcel-check.help/gr',
      choices: [
        'Tap the link to see what happened.',
        'Open the courier’s official app/site yourself.',
        'Ask whether we are expecting a parcel and do not open the link.',
      ],
      simpleChoices: ['Tap the link.', 'Open the official site.', 'Ask whether we expect a parcel. Do not tap the link.'],
      barLabels: ['Tap the link', 'Official site', 'Check without the link'],
      questions: {
        riskyConsensus: ['What did we assume about the message that made the link feel safe enough to use?', 'Why does the message create a “30 minute” deadline? Who benefits if we rush?', 'How can we check whether a parcel really exists without using the link?'],
        safeConsensus: ['What part of the message made the same strategy feel safer to most people?', 'What different detail could make you change how you verify it?', 'How do we separate verification from trusting the same message that is pressuring us?'],
        safeSplit: ['Both popular choices avoid the link. What does each one verify better?', 'Which could come first and which second without increasing risk?', 'What are we actually trying to confirm: whether a parcel exists, which courier has it, or both?'],
        split: ['Which part of the message did the class interpret differently?', 'Which option gives us more information before an action that may be hard to undo?', 'What can we check first without sharing details or money?'],
        minority: ['Let us hear the least popular option first: what reasoning might sit behind it?', 'What information is missing that would help everyone decide better?', 'What safe action can happen first before deciding whether to continue?'],
      },
      simpleQuestions: {
        riskyConsensus: ['What made you trust the message?', 'Why does it say “within 30 minutes”?', 'How can we check the parcel without tapping the link?'],
        safeConsensus: ['What made you avoid the link?', 'What else would you want to know?', 'How can we check whether the parcel really exists?'],
        safeSplit: ['Both choices avoid the link. What does each one check?', 'Which check would you do first?', 'What do we want to learn about the parcel?'],
        split: ['What did we see differently in the same message?', 'Which option gives us more information first?', 'What can we check without tapping the link?'],
        minority: ['Why did some people choose differently?', 'What information is missing?', 'What safe thing can we do first?'],
      },
      worksheetWhy: 'Why would you choose that option?',
      worksheetClue: 'Which parts of the message would you want to verify?',
      worksheetSafe: 'What is one action you can take without tapping the link?',
    },
  },
  {
    id: 'bank-alert',
    artifactKind: 'sms',
    riskLevels: ['high', 'low', 'low'],
    el: {
      category: 'Internet · Phishing',
      title: 'Το επείγον μήνυμα από την «τράπεζα»',
      scenarioText: 'Έρχεται SMS που λέει ότι η κάρτα σου θα μπλοκαριστεί επειδή εντοπίστηκε ύποπτη σύνδεση. Το μήνυμα ζητά να μπεις αμέσως σε έναν σύνδεσμο για επιβεβαίωση.',
      scenarioSimple: 'Έρχεται μήνυμα από «τράπεζα». Λέει ότι η κάρτα θα κλείσει αν δεν πατήσεις τώρα ένα link.',
      skills: ['Ψηφιακή ασφάλεια', 'Κριτική σκέψη', 'Οικονομικός γραμματισμός'],
      artifactLabel: 'SMS',
      artifactFrom: 'BANK SECURITY',
      artifactBody: 'Εντοπίστηκε μη αναγνωρισμένη σύνδεση. Επιβεβαιώστε τώρα τα στοιχεία σας για να αποφύγετε προσωρινό αποκλεισμό της κάρτας.',
      artifactLink: 'secure-bank-check.com/gr',
      choices: [
        'Πατάω το link και συνδέομαι γρήγορα πριν μπλοκαριστεί η κάρτα.',
        'Ανοίγω μόνος μου την επίσημη εφαρμογή της τράπεζας και ελέγχω ειδοποιήσεις.',
        'Καλώ την τράπεζα από τον επίσημο αριθμό, όχι από το μήνυμα.',
      ],
      simpleChoices: ['Πατάω το link.', 'Ανοίγω την επίσημη εφαρμογή της τράπεζας.', 'Καλώ τον επίσημο αριθμό της τράπεζας.'],
      barLabels: ['Πατάω το link', 'Επίσημη εφαρμογή', 'Επίσημος αριθμός'],
      questions: {
        riskyConsensus: ['Τι στο μήνυμα μάς έκανε να νιώσουμε ότι πρέπει να δράσουμε πριν ελέγξουμε;', 'Πώς χρησιμοποιείται ο φόβος ότι «θα μπλοκαριστεί η κάρτα» για να μειωθεί ο χρόνος σκέψης;', 'Πώς μπορούμε να ελέγξουμε την ίδια πληροφορία από κανάλι που δεν μας έδωσε το μήνυμα;'],
        safeConsensus: ['Ποιο σημάδι μάς έκανε να προτιμήσουμε ανεξάρτητο κανάλι ελέγχου;', 'Τι θα άλλαζε αν το SMS είχε το σωστό όνομα της τράπεζας ή γνώριζε το μικρό σου όνομα;', 'Γιατί είναι χρήσιμο να ανοίγουμε μόνοι μας την εφαρμογή αντί να ακολουθούμε link;'],
        safeSplit: ['Η εφαρμογή και το τηλεφώνημα είναι και τα δύο ανεξάρτητοι έλεγχοι. Πότε είναι πιο χρήσιμο το καθένα;', 'Ποιος τρόπος αφήνει λιγότερο χώρο σε ένα ψεύτικο μήνυμα να καθοδηγήσει την επόμενη κίνησή μας;', 'Αν δεν βρίσκαμε καμία ειδοποίηση στην εφαρμογή, τι θα κάναμε μετά;'],
        split: ['Ποιο στοιχείο του SMS μάς φάνηκε πειστικό και ποιο ύποπτο;', 'Ποια ενέργεια επιβεβαιώνει το πρόβλημα χωρίς να χρησιμοποιεί στοιχεία του ίδιου μηνύματος;', 'Πώς θα άλλαζε η απόφαση αν δεν υπήρχε η λέξη «τώρα»;'],
        minority: ['Ας ακούσουμε τη λιγότερο δημοφιλή επιλογή: ποιο πρόβλημα προσπαθεί να λύσει;', 'Ποια πληροφορία λείπει για να ξέρουμε αν υπάρχει πράγματι θέμα με την κάρτα;', 'Ποιον έλεγχο μπορούμε να κάνουμε χωρίς να δώσουμε κωδικούς;'],
      },
      simpleQuestions: {
        riskyConsensus: ['Τι σε έκανε να βιαστείς;', 'Γιατί λέει ότι η κάρτα θα κλείσει;', 'Πώς ελέγχουμε χωρίς να πατήσουμε το link;'],
        safeConsensus: ['Τι σε έκανε να διαλέξεις επίσημο κανάλι;', 'Αν το μήνυμα ήξερε το όνομά σου, θα άλλαζε κάτι;', 'Γιατί ανοίγουμε μόνοι μας την εφαρμογή;'],
        safeSplit: ['Πότε βοηθά η εφαρμογή;', 'Πότε βοηθά το επίσημο τηλέφωνο;', 'Τι κάνουμε αν δεν βρούμε καμία ειδοποίηση;'],
        split: ['Τι σου φάνηκε αληθινό;', 'Τι σου φάνηκε ύποπτο;', 'Πώς ελέγχουμε χωρίς να δώσουμε κωδικούς;'],
        minority: ['Γιατί κάποιοι διάλεξαν διαφορετικά;', 'Τι πληροφορία λείπει;', 'Τι ασφαλές κάνουμε πρώτο;'],
      },
      worksheetWhy: 'Ποιο στοιχείο επηρέασε περισσότερο την επιλογή σου;',
      worksheetClue: 'Κύκλωσε δύο σημεία που θα ήθελες να ελέγξεις πριν κάνεις οτιδήποτε.',
      worksheetSafe: 'Γράψε έναν τρόπο να επικοινωνήσεις με την τράπεζα χωρίς να χρησιμοποιήσεις στοιχεία του SMS.',
    },
    en: {
      category: 'Internet · Phishing',
      title: 'The urgent “bank” message',
      scenarioText: 'An SMS says your card will be blocked because a suspicious login was detected. It asks you to use a link immediately to verify your details.',
      scenarioSimple: 'A “bank” message says your card will be blocked unless you tap a link now.',
      skills: ['Digital safety', 'Critical thinking', 'Financial literacy'],
      artifactLabel: 'SMS',
      artifactFrom: 'BANK SECURITY',
      artifactBody: 'An unrecognized login was detected. Verify your details now to avoid temporary card suspension.',
      artifactLink: 'secure-bank-check.com/gr',
      choices: ['Tap the link and log in quickly.', 'Open the official bank app yourself and check alerts.', 'Call the bank using its official number, not the message.'],
      simpleChoices: ['Tap the link.', 'Open the official bank app.', 'Call the bank’s official number.'],
      barLabels: ['Tap the link', 'Official app', 'Official number'],
      questions: {
        riskyConsensus: ['What in the message made us feel we had to act before checking?', 'How does the threat of a blocked card reduce thinking time?', 'How can we verify the same claim through a channel the message did not provide?'],
        safeConsensus: ['What sign made an independent verification channel feel safer?', 'Would it change anything if the SMS knew your first name?', 'Why is opening the official app yourself different from following a link?'],
        safeSplit: ['Both the app and a phone call are independent checks. When is each more useful?', 'Which route gives the suspicious message less control over your next step?', 'If the app showed no alert, what would you do next?'],
        split: ['Which part looked convincing and which looked suspicious?', 'Which action verifies the problem without relying on the same message?', 'How would the choice change without the word “now”?'],
        minority: ['What problem is the least popular option trying to solve?', 'What information is missing?', 'What check can we make without sharing credentials?'],
      },
      simpleQuestions: {
        riskyConsensus: ['What made you rush?', 'Why does it say the card will be blocked?', 'How can we check without tapping the link?'],
        safeConsensus: ['Why did you choose an official channel?', 'Would knowing your name change anything?', 'Why open the app yourself?'],
        safeSplit: ['When does the app help?', 'When does the official phone number help?', 'What if there is no alert?'],
        split: ['What looked real?', 'What looked suspicious?', 'How can we check without sharing codes?'],
        minority: ['Why did some people choose differently?', 'What information is missing?', 'What safe step comes first?'],
      },
      worksheetWhy: 'Which detail influenced your choice the most?',
      worksheetClue: 'Circle two parts you would verify before doing anything.',
      worksheetSafe: 'Write one way to contact the bank without using details from the SMS.',
    },
  },
  {
    id: 'deepfake-school',
    artifactKind: 'video',
    riskLevels: ['high', 'low', 'low'],
    el: {
      category: 'AI · Deepfakes',
      title: 'Το βίντεο που «κλείνει» το σχολείο',
      scenarioText: 'Στην ομαδική της τάξης ανεβαίνει βίντεο όπου ο διευθυντής φαίνεται να λέει ότι αύριο το σχολείο θα είναι κλειστό. Δεν υπάρχει ανακοίνωση στην επίσημη σελίδα και κάποιοι λένε ότι το βίντεο είναι AI.',
      scenarioSimple: 'Βλέπεις βίντεο όπου ο διευθυντής λέει «αύριο δεν έχει σχολείο». Δεν υπάρχει άλλη ανακοίνωση.',
      skills: ['AI literacy', 'Έλεγχος πηγών', 'Κριτική σκέψη'],
      artifactLabel: 'ΒΙΝΤΕΟ · 0:18',
      artifactFrom: 'ΟΜΑΔΙΚΗ Β2',
      artifactBody: '«Αύριο το σχολείο θα παραμείνει κλειστό. Μην προσέλθετε στο μάθημα.»',
      artifactMeta: 'Το πρόσωπο και η φωνή φαίνονται αληθινά — αλλά η πηγή του αρχείου δεν είναι γνωστή.',
      choices: [
        'Το προωθώ και θεωρώ ότι αύριο δεν έχει μάθημα.',
        'Ψάχνω την επίσημη ανακοίνωση του σχολείου ή της Διεύθυνσης.',
        'Το δείχνω σε εκπαιδευτικό χωρίς να το αναδημοσιεύσω.',
      ],
      simpleChoices: ['Το προωθώ και το πιστεύω.', 'Ψάχνω επίσημη ανακοίνωση.', 'Το δείχνω σε εκπαιδευτικό χωρίς να το στείλω αλλού.'],
      barLabels: ['Το προωθώ', 'Επίσημη ανακοίνωση', 'Ρωτάω χωρίς repost'],
      questions: {
        riskyConsensus: ['Τι κάνει ένα βίντεο να μας φαίνεται πιο αξιόπιστο από ένα απλό μήνυμα;', 'Αν το πρόσωπο και η φωνή μπορούν να δημιουργηθούν με AI, ποιο στοιχείο πρέπει να ελέγξουμε εκτός του ίδιου του βίντεο;', 'Τι μπορεί να συμβεί αν όλοι ενεργήσουν πάνω σε ένα ψεύτικο βίντεο πριν επιβεβαιωθεί;'],
        safeConsensus: ['Ποιο ανεξάρτητο στοιχείο θα ήταν αρκετό για να εμπιστευτούμε την ανακοίνωση;', 'Γιατί η αρχική πηγή είναι πιο σημαντική από το πόσο πειστικό φαίνεται το βίντεο;', 'Πότε έχει νόημα να ζητήσουμε επιβεβαίωση από άνθρωπο;'],
        safeSplit: ['Η επίσημη ανακοίνωση και η ερώτηση σε εκπαιδευτικό είναι δύο τρόποι επαλήθευσης. Ποιος είναι πιο άμεσος και ποιος πιο τεκμηριωμένος;', 'Αν ο ένας τρόπος δεν δώσει απάντηση, ποιος είναι ο επόμενος;', 'Τι αποφεύγουμε και στις δύο στρατηγικές;'],
        split: ['Ποιο στοιχείο του βίντεο θεωρήσατε αποδεικτικό και ποιο όχι;', 'Τι θα μπορούσε να επιβεβαιώσει την πληροφορία χωρίς να βασίζεται στην εικόνα ή στη φωνή;', 'Η κοινοποίηση βοηθά στον έλεγχο ή απλώς αυξάνει το κοινό του βίντεο;'],
        minority: ['Τι φοβάται ότι θα χάσει η λιγότερο δημοφιλής επιλογή;', 'Ποια πληροφορία λείπει πριν αποφασίσουμε αν η ανακοίνωση είναι αληθινή;', 'Πώς μπορούμε να ελέγξουμε χωρίς να βοηθήσουμε τη διάδοση;'],
      },
      simpleQuestions: {
        riskyConsensus: ['Γιατί το βίντεο φαίνεται αληθινό;', 'Τι άλλο πρέπει να ελέγξουμε;', 'Τι γίνεται αν όλοι πιστέψουν ένα ψεύτικο βίντεο;'],
        safeConsensus: ['Πού θα βρούμε επίσημη ανακοίνωση;', 'Γιατί δεν αρκεί η εικόνα και η φωνή;', 'Πότε ρωτάμε έναν εκπαιδευτικό;'],
        safeSplit: ['Τι ελέγχει η επίσημη ανακοίνωση;', 'Τι ελέγχει ο εκπαιδευτικός;', 'Τι δεν κάνουμε και στις δύο επιλογές;'],
        split: ['Τι σε έκανε να το πιστέψεις;', 'Τι θα το επιβεβαίωνε;', 'Χρειάζεται να το προωθήσουμε για να το ελέγξουμε;'],
        minority: ['Γιατί κάποιοι διάλεξαν διαφορετικά;', 'Τι πληροφορία λείπει;', 'Πώς ελέγχουμε χωρίς να το διαδώσουμε;'],
      },
      worksheetWhy: 'Τι στο βίντεο θα μπορούσε να σε κάνει να το πιστέψεις;',
      worksheetClue: 'Γράψε δύο πράγματα που θα έλεγχνες έξω από το ίδιο το βίντεο.',
      worksheetSafe: 'Πώς μπορείς να ζητήσεις επιβεβαίωση χωρίς να αναδημοσιεύσεις το αρχείο;',
    },
    en: {
      category: 'AI · Deepfakes',
      title: 'The video that “closes” school',
      scenarioText: 'A class group receives a video where the headteacher appears to say the school will be closed tomorrow. There is no official notice and some students say the video may be AI-generated.',
      scenarioSimple: 'A video shows the headteacher saying “no school tomorrow.” There is no other announcement.',
      skills: ['AI literacy', 'Source verification', 'Critical thinking'],
      artifactLabel: 'VIDEO · 0:18',
      artifactFrom: 'CLASS GROUP B2',
      artifactBody: '“The school will remain closed tomorrow. Do not come to class.”',
      artifactMeta: 'The face and voice look real, but the source of the file is unknown.',
      choices: ['Forward it and assume there is no school tomorrow.', 'Look for an official school or education authority notice.', 'Show it to a teacher without reposting it.'],
      simpleChoices: ['Forward it and believe it.', 'Look for an official notice.', 'Show it to a teacher without sending it on.'],
      barLabels: ['Forward it', 'Official notice', 'Ask without reposting'],
      questions: {
        riskyConsensus: ['What makes a video feel more trustworthy than plain text?', 'If AI can imitate face and voice, what evidence should we check outside the video itself?', 'What can happen if everyone acts on a fake video before it is verified?'],
        safeConsensus: ['What independent evidence would be enough to trust the announcement?', 'Why does the original source matter more than how convincing the video looks?', 'When is it useful to ask a person to confirm?'],
        safeSplit: ['An official notice and asking a teacher are both verification routes. Which is faster and which is more documented?', 'If one route gives no answer, what comes next?', 'What do both strategies avoid doing?'],
        split: ['Which part of the video felt like proof and which did not?', 'What could confirm the claim without relying on the face or voice?', 'Does forwarding help verification or just increase the audience?'],
        minority: ['What is the least popular option trying not to miss?', 'What information is missing?', 'How can we verify without helping the video spread?'],
      },
      simpleQuestions: {
        riskyConsensus: ['Why does the video look real?', 'What else should we check?', 'What happens if everyone believes a fake video?'],
        safeConsensus: ['Where can we find an official notice?', 'Why are face and voice not enough?', 'When do we ask a teacher?'],
        safeSplit: ['What does the official notice check?', 'What does asking a teacher check?', 'What do both choices avoid?'],
        split: ['What made you believe it?', 'What would confirm it?', 'Do we need to forward it to check it?'],
        minority: ['Why did some people choose differently?', 'What information is missing?', 'How can we check without spreading it?'],
      },
      worksheetWhy: 'What in the video could make you believe it?',
      worksheetClue: 'Write two things you would verify outside the video itself.',
      worksheetSafe: 'How can you ask for confirmation without reposting the file?',
    },
  },
  {
    id: 'private-screenshot',
    artifactKind: 'chat',
    riskLevels: ['high', 'low', 'low'],
    el: {
      category: 'Φίλοι · Ομαδικές συνομιλίες',
      title: 'Το screenshot από ιδιωτική συνομιλία',
      scenarioText: 'Στην ομαδική της τάξης κάποιος ανεβάζει screenshot από ιδιωτική συνομιλία δύο συμμαθητών. Γράφει «δες τι λένε για εμάς» και ζητά να σταλεί και σε άλλη παρέα.',
      scenarioSimple: 'Κάποιος στέλνει screenshot από ιδιωτική συνομιλία. Θέλει να το στείλετε και αλλού.',
      skills: ['Ενσυναίσθηση', 'Ψηφιακά όρια', 'Επίλυση συγκρούσεων'],
      artifactLabel: 'ΟΜΑΔΙΚΗ ΤΑΞΗΣ',
      artifactFrom: 'ΜΑΘΗΤΗΣ 3',
      artifactBody: '«Δείτε τι γράφουν για εμάς 😡 Στείλτε το και στην άλλη ομαδική να το δουν όλοι.»',
      artifactMeta: 'Το screenshot δείχνει μόνο ένα κομμάτι της ιδιωτικής συζήτησης.',
      choices: [
        'Το προωθώ και στην άλλη ομαδική για να ξέρουν όλοι τι ειπώθηκε.',
        'Δεν το προωθώ και ρωτάω πώς βρέθηκε αυτή η ιδιωτική συνομιλία.',
        'Λέω να σταματήσει η διάδοση και να λυθεί η διαφωνία χωρίς άλλα screenshots.',
      ],
      simpleChoices: ['Το στέλνω και αλλού.', 'Δεν το στέλνω. Ρωτάω από πού βγήκε.', 'Λέω να σταματήσει η διάδοση.'],
      barLabels: ['Το προωθώ', 'Ρωτάω την πηγή', 'Σταματάω τη διάδοση'],
      questions: {
        riskyConsensus: ['Τι προσπαθούμε να πετύχουμε προωθώντας το screenshot και τι μπορεί να συμβεί ταυτόχρονα;', 'Το ότι ένα screenshot είναι αληθινό σημαίνει ότι είναι σωστό να γίνει δημόσιο;', 'Πώς αλλάζει μια σύγκρουση όταν προστίθεται μεγαλύτερο κοινό;'],
        safeConsensus: ['Ποιο όριο προστατεύει η επιλογή που προτιμήσατε;', 'Τι θα χρειαζόταν για να καταλάβουμε το πλαίσιο χωρίς να διαδώσουμε άλλο το screenshot;', 'Πώς μπορεί να αντιμετωπιστεί η διαφωνία χωρίς να γίνει δημόσιο το ιδιωτικό περιεχόμενο;'],
        safeSplit: ['Η μία ασφαλής επιλογή ψάχνει την πηγή και η άλλη σταματά τη διάδοση. Ποια ανάγκη καλύπτει η καθεμία;', 'Ποια μπορεί να γίνει πρώτη χωρίς να βλάψει την άλλη;', 'Τι κοινό έχουν και οι δύο σε σχέση με την ιδιωτικότητα;'],
        split: ['Τι θεωρήσατε πιο σημαντικό: να ενημερωθούν όλοι ή να περιοριστεί η διάδοση;', 'Πόσο αξιόπιστη εικόνα μιας σύγκρουσης δίνει ένα screenshot χωρίς το υπόλοιπο chat;', 'Ποια ενέργεια μειώνει την ένταση χωρίς να αγνοεί το πρόβλημα;'],
        minority: ['Ας ακούσουμε τη λιγότερο δημοφιλή επιλογή: τι προσπαθεί να προστατέψει;', 'Τι πληροφορία λείπει από το screenshot;', 'Τι μπορούμε να κάνουμε χωρίς να αυξήσουμε το κοινό του;'],
      },
      simpleQuestions: {
        riskyConsensus: ['Τι θέλουμε να πετύχουμε αν το στείλουμε παντού;', 'Αν είναι αληθινό, σημαίνει ότι πρέπει να το δουν όλοι;', 'Τι γίνεται όταν μεγαλώνει το κοινό;'],
        safeConsensus: ['Τι προστατεύει αυτή η επιλογή;', 'Τι άλλο πρέπει να ξέρουμε;', 'Πώς λύνουμε τη διαφωνία χωρίς άλλα screenshots;'],
        safeSplit: ['Η μία επιλογή ρωτά την πηγή. Η άλλη σταματά τη διάδοση. Τι κάνει η καθεμία;', 'Ποια θα έκανες πρώτη;', 'Τι προστατεύουν και οι δύο;'],
        split: ['Τι ήταν πιο σημαντικό για εσένα;', 'Λείπει κάτι από το screenshot;', 'Πώς μειώνουμε την ένταση;'],
        minority: ['Τι προσπαθεί να προστατέψει η άλλη επιλογή;', 'Τι πληροφορία λείπει;', 'Τι μπορούμε να κάνουμε χωρίς να το στείλουμε αλλού;'],
      },
      worksheetWhy: 'Τι προσπαθείς να προστατέψεις με την επιλογή σου;',
      worksheetClue: 'Τι μπορεί να λείπει από ένα screenshot ώστε να αλλάζει το νόημα;',
      worksheetSafe: 'Γράψε έναν τρόπο να αντιμετωπιστεί η σύγκρουση χωρίς νέα κοινοποίηση.',
    },
    en: {
      category: 'Friends · Group chats',
      title: 'The private chat screenshot',
      scenarioText: 'Someone posts a screenshot from a private conversation between two classmates in the class group and asks everyone to forward it to another group.',
      scenarioSimple: 'Someone shares a screenshot from a private chat and wants it sent to more people.',
      skills: ['Empathy', 'Digital boundaries', 'Conflict resolution'],
      artifactLabel: 'CLASS GROUP',
      artifactFrom: 'STUDENT 3',
      artifactBody: '“Look what they say about us 😡 Send it to the other group so everyone sees it.”',
      artifactMeta: 'The screenshot shows only one part of the private conversation.',
      choices: ['Forward it to the other group so everyone knows what was said.', 'Do not forward it and ask how the private chat was obtained.', 'Ask people to stop spreading it and deal with the disagreement without more screenshots.'],
      simpleChoices: ['Send it to more people.', 'Do not send it. Ask where it came from.', 'Ask people to stop spreading it.'],
      barLabels: ['Forward it', 'Ask about source', 'Stop the spread'],
      questions: {
        riskyConsensus: ['What are we trying to achieve by forwarding it, and what else may happen at the same time?', 'If a screenshot is real, does that automatically make it right to publish?', 'How does a conflict change when the audience grows?'],
        safeConsensus: ['What boundary does the preferred choice protect?', 'What would help us understand the context without spreading the screenshot?', 'How can the disagreement be addressed without making private content public?'],
        safeSplit: ['One safer option checks the source; the other stops the spread. What need does each serve?', 'Which could happen first without undermining the other?', 'What do both have in common about privacy?'],
        split: ['What mattered more: informing everyone or limiting the spread?', 'How complete a picture does one screenshot give?', 'Which action reduces escalation without ignoring the problem?'],
        minority: ['What is the least popular option trying to protect?', 'What information is missing from the screenshot?', 'What can we do without increasing its audience?'],
      },
      simpleQuestions: {
        riskyConsensus: ['What are we trying to achieve by sending it everywhere?', 'If it is real, does everyone need to see it?', 'What happens when the audience grows?'],
        safeConsensus: ['What does this choice protect?', 'What else do we need to know?', 'How can we solve the disagreement without more screenshots?'],
        safeSplit: ['One choice checks the source. The other stops the spread. What does each do?', 'Which would you do first?', 'What do both protect?'],
        split: ['What mattered most to you?', 'What may be missing from the screenshot?', 'How can we reduce the conflict?'],
        minority: ['What is the other choice trying to protect?', 'What information is missing?', 'What can we do without forwarding it?'],
      },
      worksheetWhy: 'What are you trying to protect with your choice?',
      worksheetClue: 'What might be missing from a screenshot that could change its meaning?',
      worksheetSafe: 'Write one way to address the conflict without sharing it further.',
    },
  },
];

export const getTeacherScenario = (id: string) =>
  teacherScenarios.find((scenario) => scenario.id === id) ?? teacherScenarios[0];
