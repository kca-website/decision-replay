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
    maxAge: 14,
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
        label: { el: 'Θα του έδινα το Instagram μου.', en: 'I would give them my Instagram.' },
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
    minAge: 11,
    maxAge: 16,
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
        label: { el: 'Το δοκιμάζω — αφού το κάνουν τόσοι.', en: 'I try it — so many people are doing it.' },
        consequence: {
          el: 'Η δημοτικότητα γίνεται το βασικό κριτήριο, παρότι τα views δεν αποδεικνύουν ότι κάτι είναι ασφαλές.',
          en: 'Popularity becomes the main criterion even though views do not prove something is safe.',
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
    minAge: 11,
    maxAge: 17,
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
        label: { el: 'Το παραδίδω όπως είναι.', en: 'I submit it as it is.' },
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
    minAge: 12,
    maxAge: 17,
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
        label: { el: 'Το προωθώ — ας αποφασίσουν οι άλλοι.', en: 'I forward it — others can decide.' },
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
    maxAge: 15,
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
    minAge: 11,
    maxAge: 16,
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
        label: { el: 'Συμφωνώ για να μη χαλάσω την παρέα.', en: 'I agree so I do not upset the group.' },
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
    minAge: 11,
    maxAge: 17,
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
        label: { el: 'Στέλνω τον κωδικό για να βοηθήσω.', en: 'I send the code to help.' },
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
    minAge: 12,
    maxAge: 17,
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
        label: { el: 'Το στέλνω στην παρέα για να το δουν όλοι.', en: 'I send it to the group so everyone can see.' },
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
    minAge: 12,
    maxAge: 17,
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
        label: { el: 'Το ακολουθώ — ακούγεται πολύ σίγουρο.', en: 'I follow it — it sounds very confident.' },
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
    maxAge: 16,
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
        label: { el: 'Συνδέομαι — δεν θέλω να χάσω την προσφορά.', en: 'I log in — I do not want to miss the offer.' },
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
];

export const getScenario = (id: string | undefined) =>
  lifeScenarios.find((scenario) => scenario.id === id);
