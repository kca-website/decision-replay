export type LifeLocale = 'el' | 'en';
export type ScenarioCategory = 'internet' | 'ai' | 'friends';
export type ScenarioVisualId =
  | 'gaming'
  | 'viral'
  | 'homework'
  | 'deepfake'
  | 'groupPhoto'
  | 'exclude'
  | 'fakeProfile'
  | 'screenshot'
  | 'aiAdvice'
  | 'rewardScam';

export type LocalizedText = Record<LifeLocale, string>;

export interface ScenarioChoice {
  id: string;
  label: LocalizedText;
  consequence: LocalizedText;
  perspective: LocalizedText;
}

export interface LifeScenario {
  id: string;
  category: ScenarioCategory;
  visual: ScenarioVisualId;
  minAge: number;
  maxAge: number;
  minutes: number;
  title: LocalizedText;
  teaser: LocalizedText;
  situation: LocalizedText;
  question: LocalizedText;
  choices: ScenarioChoice[];
  reflection: LocalizedText[];
}

export const categoryMeta: Record<
  ScenarioCategory,
  { label: LocalizedText; description: LocalizedText }
> = {
  internet: {
    label: { el: 'Internet', en: 'Internet' },
    description: {
      el: 'Ιδιωτικότητα, online γνωριμίες, scams και πράγματα που εξαπλώνονται γρήγορα.',
      en: 'Privacy, online contacts, scams and things that spread fast.',
    },
  },
  ai: {
    label: { el: 'AI', en: 'AI' },
    description: {
      el: 'Deepfakes, αξιοπιστία, σχολικές εργασίες και συμβουλές από AI.',
      en: 'Deepfakes, reliability, schoolwork and advice from AI.',
    },
  },
  friends: {
    label: { el: 'Φίλοι', en: 'Friends' },
    description: {
      el: 'Παρέα, πίεση, όρια, ομαδικές συνομιλίες και δύσκολες κοινωνικές στιγμές.',
      en: 'Peer pressure, boundaries, group chats and difficult social moments.',
    },
  },
};

export const lifeScenarios: LifeScenario[] = [
  {
    id: 'gaming-instagram',
    category: 'internet',
    visual: 'gaming',
    minAge: 10,
    maxAge: 12,
    minutes: 3,
    title: { el: 'Ο συμπαίκτης ζητά Instagram', en: 'Your gaming teammate asks for Instagram' },
    teaser: {
      el: 'Παίζετε μαζί εβδομάδες. Τώρα θέλει να μιλάτε εκτός παιχνιδιού.',
      en: 'You have played together for weeks. Now they want to chat outside the game.',
    },
    situation: {
      el: 'Παίζεις εδώ και περίπου έναν μήνα με ένα άτομο που λέει ότι είναι στην ηλικία σου. Είναι καλός συμπαίκτης και μιλάτε συχνά μέσα στο παιχνίδι. Σήμερα σου ζητά το Instagram σου για να μιλάτε πιο εύκολα.',
      en: 'For about a month you have been playing with someone who says they are your age. They are a good teammate and you often chat inside the game. Today they ask for your Instagram so you can talk more easily.',
    },
    question: { el: 'Τι θα έκανες;', en: 'What would you do?' },
    choices: [
      {
        id: 'share',
        label: { el: 'Θα του έδινα ένα κλειστό Instagram με λίγες προσωπικές πληροφορίες.', en: 'I would give them a private Instagram with little personal information.' },
        consequence: {
          el: 'Η συζήτηση μεταφέρεται σε χώρο όπου μπορεί να φαίνονται περισσότερες προσωπικές πληροφορίες σου.',
          en: 'The conversation moves somewhere that may reveal more personal information about you.',
        },
        perspective: {
          el: 'Το ότι κάποιος φέρεται καλά μέσα σε ένα παιχνίδι δεν επιβεβαιώνει ποιος είναι έξω από αυτό.',
          en: 'Someone behaving well in a game does not confirm who they are outside it.',
        },
      },
      {
        id: 'stay',
        label: { el: 'Θα συνέχιζα να μιλάω μόνο μέσα στο παιχνίδι.', en: 'I would keep chatting only inside the game.' },
        consequence: {
          el: 'Κρατάς την επαφή εκεί όπου ξεκίνησε και περιορίζεις όσα προσωπικά στοιχεία μοιράζεσαι.',
          en: 'You keep the contact where it started and limit what personal information you share.',
        },
        perspective: {
          el: 'Μπορείς να συνεχίσεις να παίζεις χωρίς να ανοίξεις πρόσβαση στα υπόλοιπα προφίλ σου.',
          en: 'You can keep playing without opening access to your other profiles.',
        },
      },
      {
        id: 'ask',
        label: { el: 'Θα ρωτούσα πρώτα έναν έμπιστο ενήλικο.', en: 'I would ask a trusted adult first.' },
        consequence: {
          el: 'Βάζεις μια δεύτερη ματιά πριν μοιραστείς στοιχεία με κάποιον που γνωρίζεις μόνο online.',
          en: 'You add a second perspective before sharing details with someone you only know online.',
        },
        perspective: {
          el: 'Μερικές φορές είναι πιο εύκολο σε κάποιον άλλο να δει έναν κίνδυνο που εσύ δεν βλέπεις.',
          en: 'Sometimes another person can spot a risk that is hard for you to notice.',
        },
      },
    ],
    reflection: [
      { el: 'Τι μπορεί να αποκαλύπτει ένα social profile χωρίς να το καταλάβεις;', en: 'What can a social profile reveal without you noticing?' },
      { el: 'Τι θα σε έκανε να εμπιστευτείς περισσότερο ή λιγότερο έναν online γνωστό;', en: 'What would make you trust an online contact more or less?' },
    ],
  },
  {
    id: 'viral-challenge',
    category: 'internet',
    visual: 'viral',
    minAge: 10,
    maxAge: 12,
    minutes: 3,
    title: { el: 'Το viral challenge', en: 'The viral challenge' },
    teaser: {
      el: 'Όλοι το κάνουν και φαίνεται αστείο. Δεν είσαι όμως σίγουρος αν είναι ασφαλές.',
      en: 'Everyone is doing it and it looks funny. You are not sure it is safe.',
    },
    situation: {
      el: 'Βλέπεις ένα challenge με εκατομμύρια views. Φίλοι σου λένε να το δοκιμάσετε και να ανεβάσετε βίντεο. Κάτι στις οδηγίες σε κάνει να διστάζεις.',
      en: 'You see a challenge with millions of views. Friends want to try it and upload a video. Something in the instructions makes you hesitate.',
    },
    question: { el: 'Τι κάνεις πριν συμμετέχεις;', en: 'What do you do before joining?' },
    choices: [
      {
        id: 'join',
        label: { el: 'Το δοκιμάζω αν φαίνεται εύκολο και το κάνουν ήδη φίλοι μου.', en: 'I try it if it looks easy and friends are already doing it.' },
        consequence: {
          el: 'Το ότι φαίνεται εύκολο ή το κάνουν φίλοι μειώνει την αίσθηση κινδύνου, αλλά δεν σου λέει τι μπορεί να πάει στραβά.',
          en: 'If it looks easy or friends are doing it, the risk can feel smaller even though you still do not know what could go wrong.',
        },
        perspective: {
          el: 'Ένα trend μπορεί να διαδίδεται πιο γρήγορα από τις πληροφορίες για τους κινδύνους του.',
          en: 'A trend can spread faster than information about its risks.',
        },
      },
      {
        id: 'check',
        label: { el: 'Ελέγχω πρώτα τι ακριβώς περιλαμβάνει.', en: 'I first check exactly what it involves.' },
        consequence: {
          el: 'Καθυστερείς λίγο, αλλά αποφασίζεις με περισσότερες πληροφορίες.',
          en: 'You wait a little, but decide with more information.',
        },
        perspective: {
          el: 'Το “viral” περιγράφει πόσο εξαπλώνεται κάτι, όχι πόσο ασφαλές είναι.',
          en: '“Viral” describes how fast something spreads, not how safe it is.',
        },
      },
      {
        id: 'skip',
        label: { el: 'Το αφήνω αν δεν μπορώ να καταλάβω αν είναι ασφαλές.', en: 'I skip it if I cannot tell whether it is safe.' },
        consequence: {
          el: 'Μπορεί να χάσεις ένα trend, αλλά δεν χρειάζεται να δοκιμάσεις κάτι αβέβαιο για να ανήκεις στην παρέα.',
          en: 'You may miss a trend, but you do not need to try something uncertain to belong.',
        },
        perspective: {
          el: 'Το “όχι ακόμα” είναι επίσης επιλογή.',
          en: '“Not yet” is also a choice.',
        },
      },
    ],
    reflection: [
      { el: 'Τι σε πείθει περισσότερο: τα views ή το ποιος εξηγεί τους κινδύνους;', en: 'What persuades you more: views or who explains the risks?' },
      { el: 'Ποια ένδειξη θα σε έκανε να σταματήσεις;', en: 'What sign would make you stop?' },
    ],
  },
  {
    id: 'ai-homework',
    category: 'ai',
    visual: 'homework',
    minAge: 13,
    maxAge: 15,
    minutes: 4,
    title: { el: 'Η εργασία που έγραψε το AI', en: 'The homework AI wrote' },
    teaser: {
      el: 'Το κείμενο φαίνεται άψογο, αλλά δεν ξέρεις αν οι πληροφορίες είναι σωστές.',
      en: 'The text looks polished, but you do not know whether the facts are right.',
    },
    situation: {
      el: 'Ζήτησες από ένα AI βοήθεια για σχολική εργασία. Σου έδωσε έτοιμο κείμενο με ημερομηνίες και γεγονότα που δεν θυμάσαι από το μάθημα. Η προθεσμία πλησιάζει.',
      en: 'You asked an AI for help with schoolwork. It gave you a polished text with dates and facts you do not remember from class. The deadline is close.',
    },
    question: { el: 'Τι κάνεις με το κείμενο;', en: 'What do you do with the text?' },
    choices: [
      {
        id: 'submit',
        label: { el: 'Κρατάω το κείμενο του AI και αλλάζω μερικές φράσεις για να ακούγεται δικό μου.', en: 'I keep the AI text and change a few phrases so it sounds like mine.' },
        consequence: {
          el: 'Κερδίζεις χρόνο, αλλά παραδίδεις πράγματα που δεν έχεις ελέγξει και ίσως δεν μπορείς να εξηγήσεις.',
          en: 'You save time, but submit things you have not checked and may not be able to explain.',
        },
        perspective: {
          el: 'Η καλή διατύπωση δεν είναι απόδειξη ακρίβειας.',
          en: 'Good wording is not proof of accuracy.',
        },
      },
      {
        id: 'verify',
        label: { el: 'Ελέγχω τα βασικά στοιχεία και διορθώνω ό,τι χρειάζεται.', en: 'I verify the key facts and correct what is needed.' },
        consequence: {
          el: 'Χρησιμοποιείς το AI ως βοήθημα, αλλά η τελική εργασία περνά από τον δικό σου έλεγχο.',
          en: 'You use AI as support, but the final work goes through your own verification.',
        },
        perspective: {
          el: 'Το σημαντικό δεν είναι μόνο να βγει ένα καλό κείμενο, αλλά να ξέρεις τι υποστηρίζεις.',
          en: 'The goal is not only good text, but knowing what you can stand behind.',
        },
      },
      {
        id: 'restart',
        label: { el: 'Ξεκινώ από τις σημειώσεις μου και χρησιμοποιώ το AI μόνο για βοήθεια.', en: 'I start from my notes and use AI only for help.' },
        consequence: {
          el: 'Θα πάρει περισσότερο χρόνο, αλλά μένεις πιο κοντά σε όσα πραγματικά καταλαβαίνεις.',
          en: 'It takes longer, but stays closer to what you actually understand.',
        },
        perspective: {
          el: 'Το AI μπορεί να βοηθά χωρίς να αντικαθιστά όλη τη διαδικασία.',
          en: 'AI can help without replacing the whole process.',
        },
      },
    ],
    reflection: [
      { el: 'Πώς ξεχωρίζεις το “ακούγεται σωστό” από το “είναι σωστό”;', en: 'How do you separate “sounds right” from “is right”?' },
      { el: 'Ποιο κομμάτι μιας εργασίας θέλεις να παραμένει ξεκάθαρα δικό σου;', en: 'Which part of an assignment should remain clearly yours?' },
    ],
  },
  {
    id: 'deepfake-teacher',
    category: 'ai',
    visual: 'deepfake',
    minAge: 13,
    maxAge: 15,
    minutes: 4,
    title: { el: 'Το βίντεο του καθηγητή', en: 'The teacher video' },
    teaser: {
      el: 'Κυκλοφορεί ένα σοκαριστικό βίντεο. Είναι αληθινό ή deepfake;',
      en: 'A shocking video is spreading. Is it real or a deepfake?',
    },
    situation: {
      el: 'Στην ομαδική της τάξης εμφανίζεται βίντεο όπου ένας καθηγητής φαίνεται να λέει κάτι πολύ προσβλητικό. Κάποιοι λένε ότι είναι αληθινό, άλλοι ότι είναι AI. Σου ζητούν να το προωθήσεις.',
      en: 'A class group receives a video where a teacher appears to say something very offensive. Some say it is real, others say it is AI. People ask you to forward it.',
    },
    question: { el: 'Τι θα έκανες;', en: 'What would you do?' },
    choices: [
      {
        id: 'forward',
        label: { el: 'Το στέλνω σε δύο φίλους για να ρωτήσω αν τους φαίνεται αληθινό.', en: 'I send it to two friends to ask whether it looks real.' },
        consequence: {
          el: 'Το βίντεο εξαπλώνεται πριν επιβεβαιωθεί αν είναι αυθεντικό.',
          en: 'The video spreads before anyone confirms whether it is authentic.',
        },
        perspective: {
          el: 'Η προώθηση βοηθά τη διάδοση ακόμη κι αν γράψεις “δεν ξέρω αν είναι αληθινό”.',
          en: 'Forwarding helps it spread even if you add “I do not know if this is real.”',
        },
      },
      {
        id: 'pause',
        label: { el: 'Δεν το προωθώ και ψάχνω την αρχική πηγή.', en: 'I do not forward it and look for the original source.' },
        consequence: {
          el: 'Σταματάς προσωρινά τη διάδοση και ψάχνεις στοιχεία πριν βγάλεις συμπέρασμα.',
          en: 'You pause the spread and look for evidence before reaching a conclusion.',
        },
        perspective: {
          el: 'Σε περιεχόμενο που μπορεί να έχει αλλοιωθεί με AI, η προέλευση έχει μεγάλη σημασία.',
          en: 'For content that may be AI-altered, provenance matters.',
        },
      },
      {
        id: 'report',
        label: { el: 'Το δείχνω σε υπεύθυνο ενήλικο χωρίς να το αναδημοσιεύσω.', en: 'I show it to a responsible adult without reposting it.' },
        consequence: {
          el: 'Το θέμα μπορεί να ελεγχθεί χωρίς να αυξήσεις το κοινό του βίντεο.',
          en: 'The issue can be checked without increasing the video’s audience.',
        },
        perspective: {
          el: 'Μερικές φορές το “έλεγξέ το” δεν σημαίνει “στείλ’ το παντού”.',
          en: 'Sometimes “check it” does not mean “send it everywhere.”',
        },
      },
    ],
    reflection: [
      { el: 'Τι θα θεωρούσες αρκετή επιβεβαίωση;', en: 'What would count as enough confirmation?' },
      { el: 'Ποιος βλάπτεται αν ένα ψεύτικο βίντεο διαδοθεί πριν ελεγχθεί;', en: 'Who can be harmed if a fake video spreads before it is checked?' },
    ],
  },
  {
    id: 'group-photo',
    category: 'friends',
    visual: 'groupPhoto',
    minAge: 10,
    maxAge: 12,
    minutes: 3,
    title: { el: 'Η φωτογραφία στην ομαδική', en: 'The photo in the group chat' },
    teaser: {
      el: 'Κάποιος στέλνει άβολη φωτογραφία συμμαθητή χωρίς να τον ρωτήσει.',
      en: 'Someone shares an awkward photo of a classmate without asking.',
    },
    situation: {
      el: 'Σε ομαδική συνομιλία ένας φίλος στέλνει μια άβολη φωτογραφία συμμαθητή σας. Οι περισσότεροι γελάνε και κάποιος προτείνει να τη βάλει σε story.',
      en: 'In a group chat a friend posts an awkward photo of a classmate. Most people laugh and someone suggests putting it on a story.',
    },
    question: { el: 'Πώς αντιδράς;', en: 'How do you react?' },
    choices: [
      {
        id: 'laugh',
        label: { el: 'Βάζω κι εγώ reaction — δεν την ανέβασα εγώ.', en: 'I react too — I did not post it.' },
        consequence: {
          el: 'Το reaction προσθέτει επιβράβευση σε κάτι που αφορά κάποιον χωρίς τη συγκατάθεσή του.',
          en: 'Your reaction adds approval to something involving a person who did not consent.',
        },
        perspective: {
          el: 'Σε μια ομάδα, ακόμη και μια μικρή αντίδραση μπορεί να ενισχύσει το κλίμα.',
          en: 'In a group, even a small reaction can reinforce the mood.',
        },
      },
      {
        id: 'silent',
        label: { el: 'Δεν συμμετέχω, αλλά δεν λέω τίποτα.', en: 'I do not join in, but I say nothing.' },
        consequence: {
          el: 'Δεν ενισχύεις άμεσα το αστείο, αλλά η κατάσταση συνεχίζεται χωρίς αντίδραση από εσένα.',
          en: 'You do not directly reinforce the joke, but the situation continues without a response from you.',
        },
        perspective: {
          el: 'Η σιωπή και η συμμετοχή δεν είναι το ίδιο, αλλά έχουν διαφορετικές επιπτώσεις.',
          en: 'Silence and participation are not the same, but they have different effects.',
        },
      },
      {
        id: 'speak',
        label: { el: 'Λέω να μη δημοσιευτεί αλλού και να διαγραφεί.', en: 'I say it should not be reposted and should be deleted.' },
        consequence: {
          el: 'Μπορεί να υπάρξει αμηχανία στην παρέα, αλλά βάζεις όριο πριν η φωτογραφία διαδοθεί περισσότερο.',
          en: 'It may feel awkward, but you set a boundary before the photo spreads further.',
        },
        perspective: {
          el: 'Το να προστατέψεις κάποιον μπορεί να έχει κοινωνικό κόστος.',
          en: 'Protecting someone can carry a social cost.',
        },
      },
    ],
    reflection: [
      { el: 'Πώς θα άλλαζε η επιλογή σου αν ήσουν εσύ στη φωτογραφία;', en: 'How would your choice change if you were in the photo?' },
      { el: 'Πότε ένα “αστείο” σταματά να είναι αστείο;', en: 'When does a “joke” stop being funny?' },
    ],
  },
  {
    id: 'exclude-classmate',
    category: 'friends',
    visual: 'exclude',
    minAge: 10,
    maxAge: 12,
    minutes: 4,
    title: { el: '«Μην τον καλέσουμε»', en: '“Let’s not invite them”' },
    teaser: {
      el: 'Η παρέα κανονίζει έξοδο και θέλει να αποκλείσει ένα άτομο επίτηδες.',
      en: 'The group is planning an outing and wants to deliberately leave someone out.',
    },
    situation: {
      el: 'Η παρέα σου κανονίζει έξοδο. Κάποιος λέει να μην καλέσετε έναν συμμαθητή γιατί “χαλάει το κλίμα”. Σου ζητούν να μην του πεις τίποτα και να συμφωνήσεις.',
      en: 'Your group is planning an outing. Someone says not to invite a classmate because they “ruin the vibe”. They ask you to keep quiet and go along with it.',
    },
    question: { el: 'Τι θα έκανες;', en: 'What would you do?' },
    choices: [
      {
        id: 'agree',
        label: { el: 'Δεν λέω τίποτα και ακολουθώ το σχέδιο της παρέας για να μη γίνω εγώ θέμα.', en: 'I say nothing and go along with the group so I do not become the next issue.' },
        consequence: {
          el: 'Αποφεύγεις τη σύγκρουση, αλλά συμμετέχεις στον αποκλεισμό.',
          en: 'You avoid conflict, but take part in excluding someone.',
        },
        perspective: {
          el: 'Η ανάγκη να “μη χαλάσει η παρέα” μπορεί να σε κάνει να δεχτείς κάτι που μόνος σου δεν θα επέλεγες.',
          en: 'Keeping the group happy can make you accept something you would not choose alone.',
        },
      },
      {
        id: 'question',
        label: { el: 'Ρωτάω τι ακριβώς έχει συμβεί και αν υπάρχει άλλος τρόπος.', en: 'I ask what actually happened and whether there is another way.' },
        consequence: {
          el: 'Η συζήτηση μετακινείται από μια ταμπέλα σε συγκεκριμένους λόγους και λύσεις.',
          en: 'The discussion moves from a label to specific reasons and possible solutions.',
        },
        perspective: {
          el: 'Οι συγκεκριμένες πληροφορίες βοηθούν να ξεχωρίσεις ένα πραγματικό όριο από έναν απλό αποκλεισμό.',
          en: 'Specific information helps separate a real boundary from simple exclusion.',
        },
      },
      {
        id: 'optout',
        label: { el: 'Λέω ότι δεν θέλω να συμμετέχω σε κρυφό αποκλεισμό.', en: 'I say I do not want to take part in secretly excluding someone.' },
        consequence: {
          el: 'Μπορεί να διαφωνήσουν μαζί σου, αλλά κάνεις ξεκάθαρο το προσωπικό σου όριο.',
          en: 'They may disagree, but you make your personal boundary clear.',
        },
        perspective: {
          el: 'Δεν ελέγχεις πάντα τι θα κάνει η ομάδα· ελέγχεις όμως σε τι συμμετέχεις.',
          en: 'You cannot always control the group, but you can control what you take part in.',
        },
      },
    ],
    reflection: [
      { el: 'Τι διαφορά έχει το όριο από την τιμωρία μέσω αποκλεισμού;', en: 'What is the difference between a boundary and punishing someone through exclusion?' },
      { el: 'Πότε αξίζει να διαφωνήσεις με την παρέα;', en: 'When is it worth disagreeing with your friends?' },
    ],
  },
  {
    id: 'fake-profile',
    category: 'internet',
    visual: 'fakeProfile',
    minAge: 13,
    maxAge: 15,
    minutes: 3,
    title: { el: 'Το δεύτερο προφίλ του φίλου σου', en: 'Your friend’s second profile' },
    teaser: {
      el: 'Ένα καινούριο account σού στέλνει μήνυμα και λέει ότι είναι φίλος σου.',
      en: 'A new account messages you and says it belongs to your friend.',
    },
    situation: {
      el: 'Λαμβάνεις μήνυμα από νέο λογαριασμό με φωτογραφία φίλου σου. Σου λέει ότι έχασε τον παλιό λογαριασμό και ζητά να του στείλεις έναν κωδικό που “μόλις θα έρθει στο κινητό σου”.',
      en: 'A new account with your friend’s photo messages you. They say they lost their old account and ask you to send a code that “will arrive on your phone.”',
    },
    question: { el: 'Τι κάνεις;', en: 'What do you do?' },
    choices: [
      {
        id: 'send',
        label: { el: 'Στέλνω τον κωδικό αφού το προφίλ έχει σωστή φωτογραφία και ξέρει πράγματα για τον φίλο μου.', en: 'I send the code because the profile has the right photo and knows things about my friend.' },
        consequence: {
          el: 'Αν ο λογαριασμός είναι ψεύτικος, μπορεί να δώσεις σε άλλον πρόσβαση σε κάτι που ανήκει σε εσένα.',
          en: 'If the account is fake, you may give someone access to something that belongs to you.',
        },
        perspective: {
          el: 'Οι κωδικοί επιβεβαίωσης είναι συνήθως για τον κάτοχο της συσκευής, όχι για να τους προωθούμε.',
          en: 'Verification codes are usually for the device owner, not for forwarding.',
        },
      },
      {
        id: 'verify',
        label: { el: 'Επικοινωνώ με τον φίλο μου από άλλο κανάλι.', en: 'I contact my friend through another channel.' },
        consequence: {
          el: 'Ελέγχεις την ταυτότητα του ατόμου χωρίς να βασιστείς στο ίδιο account που ζητά τον κωδικό.',
          en: 'You verify who it is without relying on the same account asking for the code.',
        },
        perspective: {
          el: 'Η επιβεβαίωση από δεύτερο κανάλι είναι χρήσιμη όταν κάτι αφορά λογαριασμό ή πρόσβαση.',
          en: 'A second channel is useful when an account or access is involved.',
        },
      },
      {
        id: 'ignore',
        label: { el: 'Δεν απαντώ και κάνω report το account.', en: 'I do not reply and report the account.' },
        consequence: {
          el: 'Δεν δίνεις πληροφορίες και περιορίζεις την πιθανότητα να συνεχιστεί η προσπάθεια.',
          en: 'You share nothing and reduce the chance of the attempt continuing.',
        },
        perspective: {
          el: 'Το επείγον “στείλε το τώρα” είναι συχνά λόγος να ελέγξεις πρώτα.',
          en: 'An urgent “send it now” is often a reason to verify first.',
        },
      },
    ],
    reflection: [
      { el: 'Τι θα μπορούσε να αποδείξει ότι το account είναι όντως του φίλου σου;', en: 'What could prove the account really belongs to your friend?' },
      { el: 'Γιατί τα επείγοντα μηνύματα μάς κάνουν να ελέγχουμε λιγότερο;', en: 'Why do urgent messages make us verify less?' },
    ],
  },
  {
    id: 'private-screenshot',
    category: 'friends',
    visual: 'screenshot',
    minAge: 13,
    maxAge: 15,
    minutes: 4,
    title: { el: 'Το screenshot από προσωπική συνομιλία', en: 'The private chat screenshot' },
    teaser: {
      el: 'Ένας φίλος σού στέλνει screenshot από προσωπική συζήτηση άλλου ατόμου.',
      en: 'A friend sends you a screenshot from someone else’s private conversation.',
    },
    situation: {
      el: 'Ένας φίλος σού στέλνει screenshot από προσωπική συνομιλία δύο συμμαθητών και γράφει “δες τι λένε για εμάς”. Δεν ξέρεις πώς βρέθηκε στα χέρια του.',
      en: 'A friend sends you a screenshot from a private chat between two classmates and writes “look what they say about us.” You do not know how they got it.',
    },
    question: { el: 'Τι θα έκανες;', en: 'What would you do?' },
    choices: [
      {
        id: 'share',
        label: { el: 'Το δείχνω μόνο σε έναν κοντινό φίλο για να ρωτήσω τι πιστεύει.', en: 'I show it to one close friend to ask what they think.' },
        consequence: {
          el: 'Η ιδιωτική συζήτηση αποκτά μεγαλύτερο κοινό και γίνεται δυσκολότερο να σταματήσει η διάδοση.',
          en: 'The private conversation gets a bigger audience and becomes harder to contain.',
        },
        perspective: {
          el: 'Το ότι κάτι έφτασε σε εσένα δεν σημαίνει ότι προοριζόταν να γίνει δημόσιο.',
          en: 'The fact that something reached you does not mean it was meant to become public.',
        },
      },
      {
        id: 'ask',
        label: { el: 'Ρωτάω πώς αποκτήθηκε και δεν το προωθώ.', en: 'I ask how it was obtained and do not forward it.' },
        consequence: {
          el: 'Σταματάς τη διάδοση και προσπαθείς να καταλάβεις το πλαίσιο πριν αντιδράσεις.',
          en: 'You stop the spread and try to understand the context before reacting.',
        },
        perspective: {
          el: 'Το screenshot δείχνει ένα κομμάτι μιας συζήτησης, όχι πάντα όλη την ιστορία.',
          en: 'A screenshot shows a piece of a conversation, not always the whole story.',
        },
      },
      {
        id: 'delete',
        label: { el: 'Το διαγράφω και λέω ότι δεν θέλω να συμμετέχω.', en: 'I delete it and say I do not want to be involved.' },
        consequence: {
          el: 'Βάζεις προσωπικό όριο χωρίς να αυξήσεις το κοινό του screenshot.',
          en: 'You set a personal boundary without increasing the screenshot’s audience.',
        },
        perspective: {
          el: 'Δεν χρειάζεται να λύσεις όλη τη σύγκρουση για να αποφασίσεις ότι δεν θα διαδώσεις κάτι ιδιωτικό.',
          en: 'You do not need to solve the whole conflict to decide not to spread something private.',
        },
      },
    ],
    reflection: [
      { el: 'Αλλάζει κάτι αν το screenshot είναι αληθινό αλλά ιδιωτικό;', en: 'Does it change anything if the screenshot is real but private?' },
      { el: 'Τι λείπει από ένα screenshot που μπορεί να αλλάξει την εικόνα;', en: 'What might be missing from a screenshot that could change the story?' },
    ],
  },
  {
    id: 'ai-advice',
    category: 'ai',
    visual: 'aiAdvice',
    minAge: 13,
    maxAge: 15,
    minutes: 4,
    title: { el: 'Το AI σου λέει τι να κάνεις', en: 'AI tells you what to do' },
    teaser: {
      el: 'Ρωτάς ένα chatbot για ένα πρόβλημα με φίλο και η απάντηση ακούγεται πολύ σίγουρη.',
      en: 'You ask a chatbot about a problem with a friend and the answer sounds very confident.',
    },
    situation: {
      el: 'Έχεις παρεξήγηση με φίλο και ρωτάς ένα AI “τι να κάνω;”. Το AI σου λέει με σιγουριά ότι ο φίλος σου “σε χειρίζεται” και ότι πρέπει να κόψεις επαφή. Δεν του έχεις δώσει όλη την ιστορία.',
      en: 'You have a disagreement with a friend and ask an AI “what should I do?” It confidently says your friend is “manipulating you” and that you should cut contact. You have not given the full story.',
    },
    question: { el: 'Πόσο βάρος δίνεις στην απάντηση;', en: 'How much weight do you give the answer?' },
    choices: [
      {
        id: 'follow',
        label: { el: 'Το ακολουθώ γιατί ταιριάζει με αυτό που ήδη σκεφτόμουν.', en: 'I follow it because it matches what I was already thinking.' },
        consequence: {
          el: 'Μια μεγάλη απόφαση βασίζεται σε μια απάντηση που έχει μόνο το κομμάτι της ιστορίας που έγραψες.',
          en: 'A major decision is based on an answer that only knows the part of the story you typed.',
        },
        perspective: {
          el: 'Η αυτοπεποίθηση του ύφους δεν σημαίνει ότι το AI γνωρίζει όλο το πλαίσιο.',
          en: 'A confident tone does not mean AI knows the full context.',
        },
      },
      {
        id: 'consider',
        label: { el: 'Το βλέπω ως μία οπτική, όχι ως τελική απόφαση.', en: 'I treat it as one perspective, not a final decision.' },
        consequence: {
          el: 'Χρησιμοποιείς την απάντηση ως αφορμή να σκεφτείς, χωρίς να της παραδώσεις την απόφαση.',
          en: 'You use the answer to think, without handing over the decision.',
        },
        perspective: {
          el: 'Ένα εργαλείο μπορεί να βοηθήσει με ερωτήσεις χωρίς να γνωρίζει καλύτερα από εσένα τη σχέση σου.',
          en: 'A tool can help with questions without knowing your relationship better than you do.',
        },
      },
      {
        id: 'human',
        label: { el: 'Μιλάω και με έναν άνθρωπο που ξέρει το πλαίσιο.', en: 'I also talk to a person who knows the context.' },
        consequence: {
          el: 'Προσθέτεις μια πηγή που μπορεί να γνωρίζει περισσότερα για τη συγκεκριμένη κατάσταση.',
          en: 'You add a source that may know more about the specific situation.',
        },
        perspective: {
          el: 'Για προσωπικές σχέσεις, το πλαίσιο και η γνώση των ανθρώπων συχνά μετράνε πολύ.',
          en: 'For personal relationships, context and knowing the people often matter a lot.',
        },
      },
    ],
    reflection: [
      { el: 'Τι δεν μπορεί να γνωρίζει ένα chatbot για μια σχέση αν δεν του το πεις;', en: 'What can a chatbot not know about a relationship unless you tell it?' },
      { el: 'Πότε μια απάντηση είναι βοήθεια και πότε γίνεται “απόφαση αντί για εσένα”;', en: 'When is an answer helpful, and when does it become “deciding for you”?' },
    ],
  },
  {
    id: 'free-reward',
    category: 'internet',
    visual: 'rewardScam',
    minAge: 10,
    maxAge: 12,
    minutes: 3,
    title: { el: '«Δωρεάν 5.000 coins — μόνο σήμερα»', en: '“Free 5,000 coins — today only”' },
    teaser: {
      el: 'Ένα link υπόσχεται δωρεάν reward για το αγαπημένο σου game.',
      en: 'A link promises a free reward for your favourite game.',
    },
    situation: {
      el: 'Σε σχόλιο κάτω από gaming video βλέπεις link που υπόσχεται 5.000 δωρεάν coins “μόνο σήμερα”. Η σελίδα μοιάζει πολύ με την επίσημη και ζητά username και password.',
      en: 'Under a gaming video you see a link promising 5,000 free coins “today only”. The page looks very similar to the official one and asks for your username and password.',
    },
    question: { el: 'Τι κάνεις;', en: 'What do you do?' },
    choices: [
      {
        id: 'login',
        label: { el: 'Συνδέομαι επειδή η σελίδα έχει το σωστό λογότυπο και μοιάζει επίσημη.', en: 'I log in because the page has the right logo and looks official.' },
        consequence: {
          el: 'Αν η σελίδα είναι ψεύτικη, τα στοιχεία σύνδεσης μπορούν να καταλήξουν σε άλλον.',
          en: 'If the page is fake, your login details can end up with someone else.',
        },
        perspective: {
          el: 'Η πίεση χρόνου είναι συχνά μέρος της προσπάθειας να μη σταματήσεις για έλεγχο.',
          en: 'Time pressure is often used to stop you from checking first.',
        },
      },
      {
        id: 'official',
        label: { el: 'Μπαίνω στο game από την επίσημη εφαρμογή και ψάχνω αν υπάρχει όντως η προσφορά.', en: 'I open the official game/app and check whether the offer really exists.' },
        consequence: {
          el: 'Ελέγχεις την προσφορά από γνωστό σημείο αντί να εμπιστευτείς το link.',
          en: 'You check the offer from a known place instead of trusting the link.',
        },
        perspective: {
          el: 'Το πού βρήκες μια προσφορά είναι εξίσου σημαντικό με το τι υπόσχεται.',
          en: 'Where you found an offer matters as much as what it promises.',
        },
      },
      {
        id: 'skip',
        label: { el: 'Το αγνοώ αν ζητά password εκτός επίσημης εφαρμογής.', en: 'I ignore it if it asks for a password outside the official app.' },
        consequence: {
          el: 'Χάνεις ίσως μια “ευκαιρία”, αλλά δεν δίνεις στοιχεία σε άγνωστη σελίδα.',
          en: 'You may miss an “opportunity”, but you do not give details to an unknown page.',
        },
        perspective: {
          el: 'Μια πραγματική προσφορά δεν χρειάζεται να βασίζεται στην πίεση ή σε ύποπτο link.',
          en: 'A real offer does not need to rely on pressure or a suspicious link.',
        },
      },
    ],
    reflection: [
      { el: 'Ποιο στοιχείο της προσφοράς σε κάνει να βιαστείς;', en: 'What part of the offer makes you rush?' },
      { el: 'Τι θα έλεγες ότι είναι “ασφαλές σημείο” για να ελέγξεις μια προσφορά;', en: 'What would count as a safe place to verify an offer?' },
    ],
  },
  {
    id: 'ai-fact-check',
    category: 'ai',
    visual: 'homework',
    minAge: 10,
    maxAge: 12,
    minutes: 3,
    title: { el: 'Το AI απαντά με σιγουριά', en: 'AI answers with confidence' },
    teaser: {
      el: 'Η απάντηση ακούγεται σωστή, αλλά δεν ξέρεις από πού προέκυψε.',
      en: 'The answer sounds right, but you do not know where it came from.',
    },
    situation: {
      el: 'Για μια εργασία ρωτάς ένα AI πότε έγινε ένα ιστορικό γεγονός. Απαντά αμέσως, με πολλές λεπτομέρειες και απόλυτη σιγουριά. Στο βιβλίο θυμάσαι κάτι διαφορετικό.',
      en: 'For homework, you ask an AI when a historical event happened. It answers immediately with lots of detail and total confidence. You remember something different from your textbook.',
    },
    question: { el: 'Τι θα έκανες πριν χρησιμοποιήσεις την απάντηση;', en: 'What would you do before using the answer?' },
    choices: [
      {
        id: 'copy',
        label: { el: 'Τη χρησιμοποιώ τώρα και λέω ότι θα την ελέγξω πριν παραδώσω.', en: 'I use it for now and tell myself I will verify it before submitting.' },
        consequence: {
          el: 'Κερδίζεις χρόνο, αλλά η σιγουριά στον τρόπο που γράφει ένα AI δεν αποδεικνύει ότι το γεγονός είναι σωστό.',
          en: 'You save time, but confident wording from AI does not prove the fact is correct.',
        },
        perspective: {
          el: 'Ένα AI μπορεί να δώσει λάθος πληροφορία με πολύ πειστικό τρόπο.',
          en: 'AI can give incorrect information in a very convincing way.',
        },
      },
      {
        id: 'check',
        label: { el: 'Ελέγχω στο βιβλίο ή σε γνωστή αξιόπιστη πηγή.', en: 'I check the textbook or a known reliable source.' },
        consequence: {
          el: 'Χρειάζεται λίγο περισσότερο χρόνο, αλλά ξεχωρίζεις τι είπε το AI από αυτό που μπορείς να επιβεβαιώσεις.',
          en: 'It takes a little longer, but you separate what AI said from what you can verify.',
        },
        perspective: {
          el: 'Η επαλήθευση είναι πιο σημαντική όταν μια απάντηση θα χρησιμοποιηθεί ως γεγονός.',
          en: 'Verification matters most when an answer will be used as a fact.',
        },
      },
      {
        id: 'compare',
        label: { el: 'Ζητάω από το AI να εξηγήσει και μετά συγκρίνω με το βιβλίο.', en: 'I ask AI to explain, then compare it with the textbook.' },
        consequence: {
          el: 'Η εξήγηση μπορεί να σε βοηθήσει να καταλάβεις το θέμα, αλλά ο τελικός έλεγχος παραμένει δικός σου.',
          en: 'The explanation may help you understand the topic, but the final check is still yours.',
        },
        perspective: {
          el: 'Το AI μπορεί να είναι βοήθημα σκέψης χωρίς να γίνεται η μοναδική πηγή.',
          en: 'AI can support thinking without becoming the only source.',
        },
      },
    ],
    reflection: [
      { el: 'Ποια είναι η διαφορά ανάμεσα στο «ακούγεται σίγουρο» και στο «έχει ελεγχθεί»;', en: 'What is the difference between “sounds confident” and “has been verified”?' },
      { el: 'Πότε θα εμπιστευόσουν περισσότερο το βιβλίο, έναν άνθρωπο ή ένα AI;', en: 'When would you trust a textbook, a person, or AI more?' },
    ],
  },
  {
    id: 'ai-photo-prank',
    category: 'ai',
    visual: 'deepfake',
    minAge: 10,
    maxAge: 12,
    minutes: 3,
    title: { el: 'Η αστεία AI φωτογραφία', en: 'The funny AI photo' },
    teaser: {
      el: 'Ένας φίλος θέλει να φτιάξει ψεύτικη αστεία εικόνα συμμαθητή.',
      en: 'A friend wants to make a fake funny image of a classmate.',
    },
    situation: {
      el: 'Στην παρέα κάποιος προτείνει να βάλετε τη φωτογραφία ενός συμμαθητή σε AI και να τον δείξετε σε μια γελοία σκηνή. Λέει ότι «είναι ψεύτικο, άρα δεν πειράζει».',
      en: 'Someone in your group suggests putting a classmate’s photo into AI and showing them in a ridiculous scene. They say, “It is fake, so it cannot hurt.”',
    },
    question: { el: 'Τι θα έκανες;', en: 'What would you do?' },
    choices: [
      {
        id: 'make',
        label: { el: 'Το φτιάχνω αλλά το στέλνω μόνο στην κλειστή παρέα, όχι δημόσια.', en: 'I make it but share it only in the private group, not publicly.' },
        consequence: {
          el: 'Η εικόνα μπορεί να γίνει αστείο για την παρέα, αλλά χρησιμοποιεί το πρόσωπο κάποιου χωρίς να έχει συμφωνήσει.',
          en: 'The image may become a joke for the group, but it uses someone’s likeness without their agreement.',
        },
        perspective: {
          el: 'Το ότι κάτι είναι τεχνητό δεν εξαφανίζει το θέμα της συναίνεσης.',
          en: 'Being artificial does not remove the issue of consent.',
        },
      },
      {
        id: 'ask',
        label: { el: 'Ρωτάω πρώτα τον συμμαθητή αν είναι ΟΚ.', en: 'I ask the classmate first if they are OK with it.' },
        consequence: {
          el: 'Το αστείο μπορεί να αλλάξει ή να μη γίνει, αλλά το άτομο έχει λόγο στο πώς χρησιμοποιείται η εικόνα του.',
          en: 'The joke may change or not happen, but the person has a say in how their image is used.',
        },
        perspective: {
          el: 'Η συναίνεση μετρά και όταν το αποτέλεσμα δεν είναι πραγματική φωτογραφία.',
          en: 'Consent matters even when the result is not a real photograph.',
        },
      },
      {
        id: 'fictional',
        label: { el: 'Κάνω το αστείο με φανταστικό χαρακτήρα αντί για συμμαθητή.', en: 'I make the joke with a fictional character instead.' },
        consequence: {
          el: 'Κρατάς τη δημιουργική ιδέα χωρίς να βάζεις πραγματικό πρόσωπο στο επίκεντρο.',
          en: 'You keep the creative idea without putting a real person at the centre of it.',
        },
        perspective: {
          el: 'Μερικές φορές μπορείς να κρατήσεις το χιούμορ αλλά να αλλάξεις ποιον επηρεάζει.',
          en: 'Sometimes you can keep the humour while changing who is affected.',
        },
      },
    ],
    reflection: [
      { el: 'Αλλάζει κάτι αν όλοι ξέρουν ότι η εικόνα είναι ψεύτικη;', en: 'Does it change anything if everyone knows the image is fake?' },
      { el: 'Πότε χρειάζεται να ζητάμε άδεια για τη φωτογραφία ή το πρόσωπο κάποιου;', en: 'When should we ask permission to use someone’s photo or likeness?' },
    ],
  },
  {
    id: 'ai-personal-details',
    category: 'ai',
    visual: 'aiAdvice',
    minAge: 10,
    maxAge: 12,
    minutes: 3,
    title: { el: '«Πες μου λίγα περισσότερα για εσένα»', en: '“Tell me a little more about you”' },
    teaser: {
      el: 'Ένα AI ζητά προσωπικές λεπτομέρειες για να κάνει την απάντηση «καλύτερη».',
      en: 'An AI asks for personal details to make its answer “better.”',
    },
    situation: {
      el: 'Χρησιμοποιείς ένα AI για να φτιάξεις ιστορία. Για να την κάνει πιο προσωπική, σου ζητά όνομα σχολείου, περιοχή που μένεις και μια φωτογραφία σου.',
      en: 'You use AI to create a story. To make it more personal, it asks for your school name, where you live, and a photo of you.',
    },
    question: { el: 'Τι θα έκανες;', en: 'What would you do?' },
    choices: [
      {
        id: 'share',
        label: { el: 'Δίνω το σχολείο μου, αλλά όχι διεύθυνση ή φωτογραφία, για να γίνει πιο προσωπική η ιστορία.', en: 'I share my school, but not my address or photo, so the story feels more personal.' },
        consequence: {
          el: 'Η ιστορία μπορεί να γίνει πιο προσωπική, αλλά έχεις δώσει περισσότερες πληροφορίες από όσες χρειάζονται για τη δραστηριότητα.',
          en: 'The story may become more personal, but you have shared more information than the activity needs.',
        },
        perspective: {
          el: 'Το «θα κάνει καλύτερη απάντηση» δεν σημαίνει ότι κάθε πληροφορία είναι απαραίτητη.',
          en: '“It will make a better answer” does not mean every detail is necessary.',
        },
      },
      {
        id: 'generalize',
        label: { el: 'Δίνω μόνο γενικές, φανταστικές λεπτομέρειες.', en: 'I use only general or fictional details.' },
        consequence: {
          el: 'Μπορείς να συνεχίσεις τη δημιουργία χωρίς να αποκαλύψεις ποιο σχολείο ή πού μένεις.',
          en: 'You can keep creating without revealing your school or where you live.',
        },
        perspective: {
          el: 'Συχνά μπορούμε να πετύχουμε τον ίδιο στόχο με λιγότερα προσωπικά δεδομένα.',
          en: 'Often we can reach the same goal with less personal data.',
        },
      },
      {
        id: 'pause',
        label: { el: 'Σταματάω και ρωτάω έναν έμπιστο ενήλικο αν χρειάζονται αυτά τα στοιχεία.', en: 'I pause and ask a trusted adult whether those details are needed.' },
        consequence: {
          el: 'Η δραστηριότητα καθυστερεί λίγο, αλλά προσθέτεις δεύτερη ματιά πριν μοιραστείς στοιχεία.',
          en: 'The activity pauses briefly, but you add a second check before sharing information.',
        },
        perspective: {
          el: 'Το να σταματήσεις πριν δώσεις δεδομένα είναι επίσης ψηφιακή δεξιότητα.',
          en: 'Pausing before sharing data is also a digital skill.',
        },
      },
    ],
    reflection: [
      { el: 'Ποια στοιχεία ήταν πραγματικά απαραίτητα για να φτιαχτεί η ιστορία;', en: 'Which details were actually necessary to create the story?' },
      { el: 'Πώς μπορείς να κάνεις μια ερώτηση προσωπική χωρίς να αποκαλύψεις ποιος είσαι;', en: 'How can you personalise a prompt without revealing who you are?' },
    ],
  },
  {
    id: 'group-chat-pile-on',
    category: 'friends',
    visual: 'groupPhoto',
    minAge: 10,
    maxAge: 12,
    minutes: 3,
    title: { el: 'Όλοι γελάνε με το ίδιο άτομο', en: 'Everyone is laughing at the same person' },
    teaser: {
      el: 'Ένα λάθος στην τάξη γίνεται αστείο στην ομαδική.',
      en: 'A mistake in class turns into a joke in the group chat.',
    },
    situation: {
      el: 'Ένας συμμαθητής είπε λάθος απάντηση στην τάξη. Το απόγευμα στην ομαδική αρχίζουν memes και γελαστά emoji για αυτόν. Κάθε νέο μήνυμα κάνει το αστείο μεγαλύτερο.',
      en: 'A classmate gave a wrong answer in class. Later, the group chat fills with memes and laughing emojis about them. Each message makes the joke bigger.',
    },
    question: { el: 'Τι θα έκανες;', en: 'What would you do?' },
    choices: [
      {
        id: 'join',
        label: { el: 'Βάζω κι εγώ ένα emoji — όλοι το κάνουν.', en: 'I add an emoji too — everyone is doing it.' },
        consequence: {
          el: 'Η δική σου αντίδραση είναι μικρή, αλλά προστίθεται σε μια μεγάλη ομάδα που στοχεύει το ίδιο άτομο.',
          en: 'Your reaction is small, but it adds to a large group targeting the same person.',
        },
        perspective: {
          el: 'Πολλές μικρές αντιδράσεις μαζί μπορούν να έχουν μεγαλύτερο αποτέλεσμα από όσο φαίνεται η καθεμία μόνη της.',
          en: 'Many small reactions together can have a bigger impact than each one seems to have alone.',
        },
      },
      {
        id: 'silent',
        label: { el: 'Δεν γράφω τίποτα και περιμένω να περάσει.', en: 'I say nothing and wait for it to pass.' },
        consequence: {
          el: 'Δεν προσθέτεις άλλο μήνυμα, αλλά η συζήτηση μπορεί να συνεχιστεί χωρίς αντίλογο.',
          en: 'You do not add another message, but the conversation may continue without any pushback.',
        },
        perspective: {
          el: 'Το να μη συμμετέχεις και το να βοηθάς να αλλάξει η κατάσταση είναι δύο διαφορετικά πράγματα.',
          en: 'Not joining in and helping change the situation are two different things.',
        },
      },
      {
        id: 'shift',
        label: { el: 'Λέω να σταματήσει το αστείο ή στέλνω μήνυμα στήριξης στον συμμαθητή.', en: 'I ask the group to stop or send the classmate a supportive message.' },
        consequence: {
          el: 'Ίσως νιώσεις ότι ξεχωρίζεις από την παρέα, αλλά αλλάζεις το μήνυμα ότι «όλοι συμφωνούν».',
          en: 'You may feel like you stand out from the group, but you change the message that “everyone agrees.”',
        },
        perspective: {
          el: 'Ένας παρατηρητής μπορεί να επηρεάσει το κλίμα χωρίς να χρειάζεται να κάνει καβγά.',
          en: 'A bystander can influence the tone without starting a fight.',
        },
      },
    ],
    reflection: [
      { el: 'Τι αλλάζει όταν δέκα μικρές αντιδράσεις πέφτουν πάνω στο ίδιο άτομο;', en: 'What changes when ten small reactions all target the same person?' },
      { el: 'Ποια είναι μια φράση που θα μπορούσε να αλλάξει το κλίμα χωρίς επίθεση;', en: 'What is one sentence that could change the tone without attacking anyone?' },
    ],
  },
  {
    id: 'live-location-share',
    category: 'internet',
    visual: 'screenshot',
    minAge: 13,
    maxAge: 15,
    minutes: 3,
    title: { el: '«Στείλε live location να σε βρούμε»', en: '“Share live location so we can find you”' },
    teaser: {
      el: 'Η ομαδική έχει και άτομα που γνωρίζεις λίγο.',
      en: 'The group chat includes people you barely know.',
    },
    situation: {
      el: 'Σε μια μεγάλη εκδήλωση η παρέα δεν σε βρίσκει. Στην ομαδική υπάρχουν εννέα άτομα, δύο από τα οποία τα έχεις γνωρίσει μόνο μία φορά. Κάποιος ζητά να στείλεις live location για μία ώρα.',
      en: 'At a large event your friends cannot find you. The group chat has nine people, including two you have met only once. Someone asks you to share live location for an hour.',
    },
    question: { el: 'Τι θα έκανες;', en: 'What would you do?' },
    choices: [
      {
        id: 'group',
        label: { el: 'Στέλνω live location σε όλη την ομαδική.', en: 'I share live location with the whole group.' },
        consequence: {
          el: 'Η παρέα μπορεί να σε βρει γρήγορα, αλλά όλοι στην ομάδα βλέπουν τη θέση σου όσο η κοινοποίηση μένει ενεργή.',
          en: 'Your friends may find you quickly, but everyone in the group can see your position while sharing stays active.',
        },
        perspective: {
          el: 'Η ευκολία και η ποσότητα προσωπικής πληροφορίας δεν είναι πάντα το ίδιο πράγμα.',
          en: 'Convenience and the amount of personal information shared are not the same thing.',
        },
      },
      {
        id: 'trusted',
        label: { el: 'Το στέλνω μόνο σε ένα άτομο που εμπιστεύομαι και για λίγο.', en: 'I share it only with one trusted person and for a short time.' },
        consequence: {
          el: 'Δίνεις πραγματικό χρόνο τοποθεσίας μόνο εκεί που χρειάζεται για να λυθεί το πρόβλημα.',
          en: 'You share real-time location only where it is needed to solve the problem.',
        },
        perspective: {
          el: 'Το κοινό και η διάρκεια είναι δύο τρόποι να περιορίζεις μια κοινοποίηση.',
          en: 'Audience and duration are two ways to limit sharing.',
        },
      },
      {
        id: 'meeting',
        label: { el: 'Δίνω ένα συγκεκριμένο σημείο συνάντησης χωρίς live location.', en: 'I give a specific meeting point without live location.' },
        consequence: {
          el: 'Δεν φαίνεται η συνεχής θέση σου, αλλά χρειάζεται περισσότερος συντονισμός για να συναντηθείτε.',
          en: 'Your continuous location stays private, but meeting may require more coordination.',
        },
        perspective: {
          el: 'Μερικές φορές ένα σταθερό σημείο λύνει το ίδιο πρόβλημα με λιγότερα δεδομένα.',
          en: 'Sometimes a fixed meeting point solves the same problem with less data.',
        },
      },
    ],
    reflection: [
      { el: 'Τι παραπάνω αποκαλύπτει το live location από ένα σημείο συνάντησης;', en: 'What does live location reveal beyond a meeting point?' },
      { el: 'Πώς αλλάζει η απόφαση ανάλογα με το ποιοι είναι μέσα στην ομαδική;', en: 'How does the decision change depending on who is in the group?' },
    ],
  },
  {
    id: 'verification-code',
    category: 'internet',
    visual: 'fakeProfile',
    minAge: 13,
    maxAge: 15,
    minutes: 3,
    title: { el: 'Ο «φίλος» που ζητά κωδικό', en: 'The “friend” asking for a code' },
    teaser: {
      el: 'Νέο προφίλ με σωστή φωτογραφία ζητά τον κωδικό που ήρθε στο κινητό σου.',
      en: 'A new profile with the right photo asks for the code sent to your phone.',
    },
    situation: {
      el: 'Ένα νέο προφίλ με φωτογραφία φίλου σου λέει ότι έχασε τον λογαριασμό του. Σου γράφει ότι θα έρθει ένας εξαψήφιος κωδικός στο κινητό σου και πρέπει να του τον στείλεις γρήγορα.',
      en: 'A new profile using your friend’s photo says they lost their account. It says a six-digit code will arrive on your phone and asks you to send it quickly.',
    },
    question: { el: 'Τι θα έκανες;', en: 'What would you do?' },
    choices: [
      {
        id: 'send',
        label: { el: 'Στέλνω τον κωδικό αφού πρώτα ρωτήσω κάτι που μόνο ο πραγματικός φίλος μου θα ήξερε.', en: 'I send the code after first asking something only my real friend would know.' },
        consequence: {
          el: 'Αν το προφίλ δεν είναι του φίλου σου, ο κωδικός μπορεί να χρησιμοποιηθεί για πρόσβαση σε δικό σου λογαριασμό.',
          en: 'If the profile is not your friend, the code may be used to access one of your accounts.',
        },
        perspective: {
          el: 'Ένας κωδικός επιβεβαίωσης που έρχεται στη δική σου συσκευή δεν είναι κάτι που χρειάζεται κάποιος άλλος.',
          en: 'A verification code sent to your device is not something another person should need.',
        },
      },
      {
        id: 'verify',
        label: { el: 'Επικοινωνώ με τον φίλο μου από άλλο κανάλι πρώτα.', en: 'I contact my friend through another channel first.' },
        consequence: {
          el: 'Ελέγχεις την ταυτότητα χωρίς να βασίζεσαι στο ίδιο προφίλ που ζητά τον κωδικό.',
          en: 'You verify identity without relying on the same profile asking for the code.',
        },
        perspective: {
          el: 'Ο ανεξάρτητος έλεγχος μειώνει το ρίσκο όταν ένα προφίλ μπορεί να είναι πλαστό ή παραβιασμένο.',
          en: 'Independent verification reduces risk when an account may be fake or compromised.',
        },
      },
      {
        id: 'report',
        label: { el: 'Δεν στέλνω τίποτα και κάνω αναφορά στο προφίλ.', en: 'I send nothing and report the profile.' },
        consequence: {
          el: 'Προστατεύεις τον κωδικό και περιορίζεις την επαφή, αλλά ίσως χρειάζεται και να ενημερώσεις τον πραγματικό φίλο.',
          en: 'You protect the code and limit contact, but you may also need to alert the real friend.',
        },
        perspective: {
          el: 'Η προστασία του δικού σου λογαριασμού και η βοήθεια προς τον φίλο μπορούν να γίνουν με ξεχωριστές κινήσεις.',
          en: 'Protecting your account and helping your friend can be separate actions.',
        },
      },
    ],
    reflection: [
      { el: 'Γιατί ο κωδικός έρχεται στη δική σου συσκευή και όχι στη δική του;', en: 'Why is the code arriving on your device rather than theirs?' },
      { el: 'Ποιος είναι ένας ανεξάρτητος τρόπος να ελέγξεις ποιος βρίσκεται πίσω από ένα προφίλ;', en: 'What is one independent way to verify who is behind a profile?' },
    ],
  },
  {
    id: 'private-photo-pressure',
    category: 'friends',
    visual: 'screenshot',
    minAge: 13,
    maxAge: 15,
    minutes: 3,
    title: { el: '«Στείλε μου μια πολύ προσωπική φωτογραφία»', en: '“Send me a very personal photo”' },
    teaser: {
      el: 'Κάποιος που σου αρέσει λέει ότι αν τον εμπιστεύεσαι, πρέπει να το αποδείξεις.',
      en: 'Someone you like says that if you trust them, you should prove it.',
    },
    situation: {
      el: 'Μιλάς με κάποιον που σου αρέσει. Σου ζητά μια πολύ προσωπική φωτογραφία και λέει «θα τη δω μόνο εγώ — αν με εμπιστεύεσαι, στείλε». Όταν διστάζεις, επιμένει.',
      en: 'You are chatting with someone you like. They ask for a very personal photo and say, “Only I will see it — if you trust me, send it.” When you hesitate, they keep pushing.',
    },
    question: { el: 'Τι θα έκανες;', en: 'What would you do?' },
    choices: [
      {
        id: 'send',
        label: { el: 'Τη στέλνω για να μη νομίσει ότι δεν τον εμπιστεύομαι.', en: 'I send it so they do not think I distrust them.' },
        consequence: {
          el: 'Η πίεση μπορεί να σταματήσει προσωρινά, αλλά μετά την αποστολή δεν ελέγχεις πλήρως πού μπορεί να αποθηκευτεί ή να κοινοποιηθεί η εικόνα.',
          en: 'The pressure may stop for now, but after sending you cannot fully control where the image may be stored or shared.',
        },
        perspective: {
          el: 'Η εμπιστοσύνη δεν χρειάζεται να αποδεικνύεται με κάτι που σε κάνει να νιώθεις πίεση ή δυσφορία.',
          en: 'Trust does not need to be proven by doing something that makes you feel pressured or uncomfortable.',
        },
      },
      {
        id: 'boundary',
        label: { el: 'Λέω καθαρά όχι και βάζω όριο.', en: 'I clearly say no and set a boundary.' },
        consequence: {
          el: 'Ο άλλος μπορεί να απογοητευτεί ή να πιέσει ξανά, αλλά δεν κάνεις κάτι που δεν θέλεις για να κρατήσεις τη σχέση.',
          en: 'The other person may be disappointed or push again, but you do not do something you do not want to keep the relationship.',
        },
        perspective: {
          el: 'Το «όχι» δεν χρειάζεται επιπλέον απόδειξη ή δικαιολογία.',
          en: '“No” does not require extra proof or justification.',
        },
      },
      {
        id: 'support',
        label: { el: 'Σταματάω τη συζήτηση και μιλάω σε έμπιστο ενήλικο αν η πίεση συνεχίζεται.', en: 'I stop the conversation and talk to a trusted adult if the pressure continues.' },
        consequence: {
          el: 'Μπορεί να νιώσεις άβολα να το μοιραστείς, αλλά δεν μένεις μόνος/μόνη απέναντι σε επίμονη πίεση.',
          en: 'It may feel awkward to share, but you do not stay alone with persistent pressure.',
        },
        perspective: {
          el: 'Η βοήθεια από άνθρωπο που εμπιστεύεσαι είναι ιδιαίτερα σημαντική όταν κάποιος δεν σέβεται ένα όριο.',
          en: 'Support from someone you trust matters especially when another person will not respect a boundary.',
        },
      },
    ],
    reflection: [
      { el: 'Γιατί η φράση «αν με εμπιστεύεσαι» μπορεί να λειτουργεί σαν πίεση;', en: 'Why can “if you trust me” work as pressure?' },
      { el: 'Ποια σημάδια δείχνουν ότι ένα όριο δεν γίνεται σεβαστό;', en: 'What signs show that a boundary is not being respected?' },
    ],
  },
  {
    id: 'anonymous-rumor',
    category: 'friends',
    visual: 'screenshot',
    minAge: 13,
    maxAge: 15,
    minutes: 3,
    title: { el: 'Το ανώνυμο story για συμμαθητή', en: 'The anonymous story about a classmate' },
    teaser: {
      el: 'Μια σοβαρή κατηγορία κυκλοφορεί χωρίς πηγή και όλοι τη στέλνουν.',
      en: 'A serious accusation is circulating without a source and everyone is forwarding it.',
    },
    situation: {
      el: 'Ένα ανώνυμο account ανεβάζει story που κατηγορεί έναν συμμαθητή ότι έκλεψε χρήματα από εκδρομή. Δεν υπάρχει απόδειξη στο post. Στην ομαδική αρχίζουν να το προωθούν λέγοντας «κάτι θα ξέρουν».',
      en: 'An anonymous account posts a story accusing a classmate of stealing money on a trip. The post shows no evidence. In the group chat people start forwarding it, saying, “They must know something.”',
    },
    question: { el: 'Τι θα έκανες;', en: 'What would you do?' },
    choices: [
      {
        id: 'reshare',
        label: { el: 'Το στέλνω μόνο σε δύο φίλους και ρωτάω αν ξέρουν αν ισχύει.', en: 'I send it only to two friends and ask whether they know if it is true.' },
        consequence: {
          el: 'Η πληροφορία φτάνει γρήγορα σε περισσότερους, αλλά μαζί εξαπλώνεται και μια κατηγορία που δεν έχει επιβεβαιωθεί.',
          en: 'The information reaches more people quickly, but so does an accusation that has not been verified.',
        },
        perspective: {
          el: 'Το να αναπαράγεις μια κατηγορία δεν είναι ουδέτερο μόνο και μόνο επειδή δεν την έγραψες εσύ.',
          en: 'Repeating an accusation is not neutral just because you did not write it yourself.',
        },
      },
      {
        id: 'pause',
        label: { el: 'Δεν το προωθώ και ψάχνω αν υπάρχει αξιόπιστη πηγή.', en: 'I do not forward it and look for a reliable source.' },
        consequence: {
          el: 'Η ομαδική ίσως συνεχίσει χωρίς εσένα, αλλά δεν αυξάνεις την εμβέλεια μιας ανεπιβεβαίωτης πληροφορίας.',
          en: 'The group may keep going without you, but you do not increase the reach of an unverified claim.',
        },
        perspective: {
          el: 'Η έλλειψη πηγής είναι λόγος για περισσότερο έλεγχο, όχι για γρηγορότερο share.',
          en: 'A missing source is a reason for more checking, not faster sharing.',
        },
      },
      {
        id: 'support',
        label: { el: 'Δεν το διαδίδω και ενημερώνω υπεύθυνο ενήλικο αν φαίνεται ότι στοχοποιείται ο συμμαθητής.', en: 'I do not spread it and tell a responsible adult if the classmate is being targeted.' },
        consequence: {
          el: 'Μεταφέρεις το θέμα σε άνθρωπο που μπορεί να παρέμβει χωρίς να κάνεις την κατηγορία πιο δημόσια.',
          en: 'You move the issue to someone who can intervene without making the accusation more public.',
        },
        perspective: {
          el: 'Μπορείς να πάρεις σοβαρά μια πιθανή κατάσταση χωρίς να αντιμετωπίζεις το ανώνυμο post ως αποδεδειγμένο γεγονός.',
          en: 'You can take a possible problem seriously without treating an anonymous post as proven fact.',
        },
      },
    ],
    reflection: [
      { el: 'Τι αποδεικνύει — και τι δεν αποδεικνύει — το ότι ένα post το μοιράζονται πολλοί;', en: 'What does — and does not — get proved when many people share a post?' },
      { el: 'Πώς μπορείς να ζητήσεις βοήθεια χωρίς να αυξήσεις το κοινό μιας φήμης;', en: 'How can you ask for help without increasing the audience for a rumour?' },
    ],
  },

];

export const getScenario = (id: string | undefined) =>
  lifeScenarios.find((scenario) => scenario.id === id);
