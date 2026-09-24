import type { TeacherLocale } from './teacherScenarios';

export interface TeacherGuideLocale {
  goal: string;
  watch: string;
  focus: string;
}

export const teacherGuides: Record<string, Record<TeacherLocale, TeacherGuideLocale>> = {
  'courier-sms': {
    el: {
      goal: 'Να αναγνωρίζουν πίεση και επείγον ως λόγο για ανεξάρτητο έλεγχο πριν πατήσουν σύνδεσμο.',
      watch: 'Μην ζητήσεις από μαθητές να πουν αν οι ίδιοι ή η οικογένειά τους έχουν εξαπατηθεί.',
      focus: 'Πώς ελέγχω αν υπάρχει πράγματι δέμα χωρίς να χρησιμοποιήσω το ίδιο μήνυμα;',
    },
    en: {
      goal: 'Recognise urgency and pressure as reasons to verify independently before opening a link.',
      watch: 'Do not ask students to disclose whether they or their family have been scammed.',
      focus: 'How can I verify that a parcel really exists without using the same message?',
    },
  },
  'bank-alert': {
    el: {
      goal: 'Να ξεχωρίζουν τον φόβο που δημιουργεί ένα μήνυμα από τα στοιχεία που αποδεικνύουν ότι είναι γνήσιο.',
      watch: 'Χρησιμοποίησε μόνο το φανταστικό παράδειγμα· όχι πραγματικά στοιχεία τράπεζας ή λογαριασμού.',
      focus: 'Ποιο κανάλι θα χρησιμοποιούσα για έλεγχο αν δεν εμπιστευόμουν καθόλου το μήνυμα;',
    },
    en: {
      goal: 'Separate the fear created by a message from evidence that the message is genuine.',
      watch: 'Use only the fictional example; never ask for real bank or account details.',
      focus: 'Which channel would I use to verify this if I did not trust the message at all?',
    },
  },
  'deepfake-school': {
    el: {
      goal: 'Να αντιμετωπίζουν ένα πειστικό βίντεο ως ισχυρισμό που χρειάζεται επιβεβαίωση, όχι ως αυτόματη απόδειξη.',
      watch: 'Μην παράγετε ή αναπαράγετε deepfake πραγματικού προσώπου της σχολικής κοινότητας.',
      focus: 'Ποια ανεξάρτητη πηγή θα μπορούσε να επιβεβαιώσει ή να διαψεύσει το βίντεο;',
    },
    en: {
      goal: 'Treat a convincing video as a claim to verify, not automatic proof.',
      watch: 'Do not create or replay a deepfake of a real person in the school community.',
      focus: 'Which independent source could confirm or disprove the video?',
    },
  },
  'private-screenshot': {
    el: {
      goal: 'Να κατανοούν ότι το screenshot αλλάζει το κοινό και το πλαίσιο μιας ιδιωτικής συνομιλίας.',
      watch: 'Μην ζητήσεις πραγματικά screenshots ή λεπτομέρειες προσωπικών συνομιλιών μαθητών.',
      focus: 'Τι αλλάζει όταν κάτι που ειπώθηκε για ένα άτομο ξαφνικά το βλέπουν πολλοί;',
    },
    en: {
      goal: 'Understand that a screenshot changes the audience and context of a private conversation.',
      watch: 'Do not ask students to show real screenshots or reveal private conversations.',
      focus: 'What changes when something meant for one person is suddenly seen by many?',
    },
  },
  'friend-verification-code': {
    el: {
      goal: 'Να αναγνωρίζουν ότι ένας κωδικός επιβεβαίωσης που έρχεται στη δική τους συσκευή δεν πρέπει να δοθεί σε τρίτο.',
      watch: 'Μην χρησιμοποιήσετε πραγματικούς λογαριασμούς, τηλέφωνα ή κωδικούς στη δραστηριότητα.',
      focus: 'Πώς μπορώ να επιβεβαιώσω ότι ο φίλος είναι πράγματι αυτός που γράφει χωρίς να στείλω τον κωδικό;',
    },
    en: {
      goal: 'Recognise that a verification code sent to their device should not be shared with another person.',
      watch: 'Do not use real accounts, phone numbers or verification codes in the activity.',
      focus: 'How can I verify that this is really my friend without sending the code?',
    },
  },
  'game-coins-giveaway': {
    el: {
      goal: 'Να αναγνωρίζουν πώς η επιθυμία για ανταμοιβή και το «μόνο σήμερα» μειώνουν τον χρόνο ελέγχου.',
      watch: 'Μην γελοιοποιήσεις μαθητές που παίζουν παιχνίδια ή έχουν αγοράσει ψηφιακά αντικείμενα.',
      focus: 'Ποια στοιχεία θα έπρεπε να ελέγξω πριν συνδεθώ κάπου για να πάρω μια δωρεάν ανταμοιβή;',
    },
    en: {
      goal: 'Recognise how rewards and “today only” pressure reduce the time people take to verify.',
      watch: 'Do not shame students who play games or have bought digital items.',
      focus: 'What should I verify before signing in somewhere to claim a free reward?',
    },
  },
  'ai-homework-sources': {
    el: {
      goal: 'Να ξεχωρίζουν μια καλογραμμένη AI απάντηση από μια πληροφορία ή πηγή που έχει επαληθευτεί.',
      watch: 'Ο στόχος δεν είναι «μη χρησιμοποιείτε AI», αλλά «ελέγχετε πριν βασιστείτε σε αυτό».',
      focus: 'Πώς ελέγχω ότι μια πηγή που προτείνει το AI υπάρχει και λέει πράγματι αυτό που ισχυρίζεται;',
    },
    en: {
      goal: 'Separate a polished AI answer from information or sources that have actually been verified.',
      watch: 'The lesson is not “do not use AI”; it is “verify before relying on it.”',
      focus: 'How do I check that an AI-suggested source exists and actually supports the claim?',
    },
  },
  'ai-friendship-advice': {
    el: {
      goal: 'Να βλέπουν το AI ως εργαλείο ιδεών και όχι ως αυθεντία για σχέσεις, προθέσεις και ανθρώπινα συναισθήματα.',
      watch: 'Μην ζητήσεις από μαθητές να αποκαλύψουν πραγματική σύγκρουση ή δύσκολη προσωπική σχέση.',
      focus: 'Τι πληροφορία για μια σχέση δεν μπορεί να γνωρίζει το AI μόνο από ένα σύντομο prompt;',
    },
    en: {
      goal: 'See AI as a source of ideas, not an authority on relationships, intentions or human feelings.',
      watch: 'Do not ask students to disclose a real conflict or difficult personal relationship.',
      focus: 'What information about a relationship can AI not know from a short prompt?',
    },
  },
  'ai-classmate-image': {
    el: {
      goal: 'Να συνδέουν τη δημιουργία AI εικόνας με συναίνεση, φήμη και πιθανή διάδοση πέρα από τον αρχικό σκοπό.',
      watch: 'Μην δημιουργήσετε εικόνα πραγματικού μαθητή ή εκπαιδευτικού ως μέρος της άσκησης.',
      focus: 'Αλλάζει η ανάγκη για συναίνεση επειδή η εικόνα είναι ψεύτικη;',
    },
    en: {
      goal: 'Connect AI image creation with consent, reputation and possible sharing beyond the original purpose.',
      watch: 'Do not create an image of a real student or teacher as part of the activity.',
      focus: 'Does the need for consent disappear because the image is fake?',
    },
  },
  'photo-story-consent': {
    el: {
      goal: 'Να αντιμετωπίζουν την ανάρτηση φωτογραφίας ως απόφαση που αφορά και το άτομο που εμφανίζεται σε αυτή.',
      watch: 'Μην ζητήσεις πραγματικές φωτογραφίες μαθητών για να λυθεί το σενάριο.',
      focus: 'Πότε το «την έβγαλα εγώ» δεν σημαίνει ότι μπορώ και να τη δημοσιεύσω;',
    },
    en: {
      goal: 'Treat posting a photo as a decision that also affects the person shown in it.',
      watch: 'Do not ask students to use real photos to solve the scenario.',
      focus: 'When does “I took the photo” not mean “I can post the photo”?',
    },
  },
  'exclude-classmate-group': {
    el: {
      goal: 'Να αναγνωρίζουν την πίεση παρέας και τη διαφορά ανάμεσα στο να μη συμμετέχουν και στο να ενισχύουν έναν αποκλεισμό.',
      watch: 'Κράτησε το σενάριο υποθετικό· μην ζητήσεις να κατονομαστεί πραγματικός μαθητής που αποκλείεται.',
      focus: 'Ποια μικρή κίνηση μπορεί να αλλάξει την κατάσταση χωρίς να μετατρέψει τη συζήτηση σε σύγκρουση;',
    },
    en: {
      goal: 'Recognise peer pressure and the difference between not participating and reinforcing exclusion.',
      watch: 'Keep the scenario hypothetical; do not ask students to identify a real excluded classmate.',
      focus: 'What small action could change the situation without turning it into a confrontation?',
    },
  },
  'live-location-share': {
    el: {
      goal: 'Να αξιολογούν ποιος χρειάζεται μια πληροφορία τοποθεσίας, για πόσο χρόνο και αν υπάρχει λιγότερο παρεμβατική λύση.',
      watch: 'Μην ζητήσεις να ανοίξουν ή να μοιραστούν την πραγματική τοποθεσία τους στην τάξη.',
      focus: 'Ποια είναι η ελάχιστη πληροφορία τοποθεσίας που αρκεί για να λυθεί το πρόβλημα;',
    },
    en: {
      goal: 'Evaluate who needs location information, for how long, and whether a less revealing option works.',
      watch: 'Do not ask students to open or share their real location in class.',
      focus: 'What is the minimum location information needed to solve the problem?',
    },
  },
};

export const getTeacherGuide = (id: string) => teacherGuides[id];
