export type LifeLocale = 'el' | 'en';
export type ScenarioCategory = 'internet' | 'ai' | 'friends';

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
      el: 'Ιδιωτικότητα, social media, online γνωριμίες και ψηφιακές παγίδες.',
      en: 'Privacy, social media, online contacts and digital traps.',
    },
  },
  ai: {
    label: { el: 'AI', en: 'AI' },
    description: {
      el: 'Deepfakes, εργασίες με AI, αξιοπιστία και υπεύθυνη χρήση.',
      en: 'Deepfakes, AI-assisted schoolwork, reliability and responsible use.',
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
    minAge: 10,
    maxAge: 14,
    minutes: 3,
    title: {
      el: 'Ο συμπαίκτης ζητά Instagram',
      en: 'Your gaming teammate asks for Instagram',
    },
    teaser: {
      el: 'Παίζετε μαζί εβδομάδες. Τώρα θέλει να μιλάτε εκτός παιχνιδιού.',
      en: 'You have played together for weeks. Now they want to chat outside the game.',
    },
    situation: {
      el: 'Παίζεις εδώ και περίπου έναν μήνα με ένα άτομο που λέει ότι είναι στην ηλικία σου. Είναι καλός συμπαίκτης και μιλάτε συχνά μέσα στο παιχνίδι. Σήμερα σου ζητά το Instagram σου για να μιλάτε πιο εύκολα.',
      en: 'For about a month you have been playing with someone who says they are your age. They are a good teammate and you often chat inside the game. Today they ask for your Instagram so you can talk more easily.',
    },
    question: {
      el: 'Τι θα έκανες;',
      en: 'What would you do?',
    },
    choices: [
      {
        id: 'share',
        label: { el: 'Θα του έδινα το Instagram μου.', en: 'I would give them my Instagram.' },
        consequence: {
          el: 'Η συζήτηση μεταφέρεται σε χώρο όπου μπορεί να εμφανίζονται περισσότερες προσωπικές πληροφορίες, φωτογραφίες και επαφές σου.',
          en: 'The conversation moves to a place where more personal information, photos and contacts may be visible.',
        },
        perspective: {
          el: 'Το ότι κάποιος φέρεται καλά μέσα σε ένα παιχνίδι δεν επιβεβαιώνει ποιος είναι εκτός παιχνιδιού.',
          en: 'Someone behaving well in a game does not confirm who they are outside it.',
        },
      },
      {
        id: 'stay',
        label: { el: 'Θα συνέχιζα να μιλάω μόνο μέσα στο παιχνίδι.', en: 'I would keep chatting only inside the game.' },
        consequence: {
          el: 'Κρατάς τη σχέση στο περιβάλλον όπου ξεκίνησε και περιορίζεις τις προσωπικές πληροφορίες που μοιράζεσαι.',
          en: 'You keep the relationship in the environment where it started and limit the personal information you share.',
        },
        perspective: {
          el: 'Μπορείς να συνεχίσεις να παίζεις χωρίς να χρειάζεται να δώσεις πρόσβαση στα υπόλοιπα προφίλ σου.',
          en: 'You can keep playing without giving access to the rest of your online profiles.',
        },
      },
      {
        id: 'ask',
        label: { el: 'Θα ρωτούσα πρώτα έναν γονέα ή άλλο έμπιστο ενήλικο.', en: 'I would ask a parent or another trusted adult first.' },
        consequence: {
          el: 'Βάζεις έναν δεύτερο άνθρωπο στη διαδικασία πριν μοιραστείς προσωπικά στοιχεία με κάποιον που γνωρίζεις μόνο online.',
          en: 'You bring in a second person before sharing personal details with someone you only know online.',
        },
        perspective: {
          el: 'Σε online γνωριμίες, μια δεύτερη ματιά μπορεί να εντοπίσει κινδύνους που είναι δύσκολο να δεις όταν περνάς καλά.',
          en: 'With online contacts, a second perspective can spot risks that are hard to notice when you are having fun.',
        },
      },
    ],
    reflection: [
      {
        el: 'Ποια στοιχεία για εσένα μπορεί να αποκαλύψει ένα social profile χωρίς να το καταλάβεις;',
        en: 'What could a social profile reveal about you without you noticing?',
      },
      {
        el: 'Τι θα χρειαζόσουν για να νιώσεις ότι γνωρίζεις πραγματικά ποιος είναι ο άλλος;',
        en: 'What would you need before feeling that you truly know who the other person is?',
      },
    ],
  },
  {
    id: 'viral-challenge',
    category: 'internet',
    minAge: 11,
    maxAge: 16,
    minutes: 3,
    title: {
      el: 'Το viral challenge',
      en: 'The viral challenge',
    },
    teaser: {
      el: 'Όλοι το κάνουν και φαίνεται αστείο. Οι οδηγίες όμως δεν είναι τόσο αθώες.',
      en: 'Everyone is doing it and it looks funny. The instructions are less harmless than they seem.',
    },
    situation: {
      el: 'Σε μια πλατφόρμα βλέπεις ένα challenge που έχει εκατομμύρια views. Φίλοι σου λένε να το δοκιμάσετε και να ανεβάσετε βίντεο. Δεν είσαι σίγουρος αν αυτό που ζητά να κάνετε είναι ασφαλές.',
      en: 'On a platform you see a challenge with millions of views. Friends ask you to try it and upload a video. You are not sure whether what it asks you to do is safe.',
    },
    question: { el: 'Τι θα έκανες πριν συμμετέχεις;', en: 'What would you do before joining?' },
    choices: [
      {
        id: 'join',
        label: { el: 'Θα το έκανα αφού το κάνουν τόσοι πολλοί.', en: 'I would do it because so many people are doing it.' },
        consequence: {
          el: 'Η δημοτικότητα γίνεται το βασικό κριτήριο, παρότι τα views δεν δείχνουν αν κάτι είναι ασφαλές.',
          en: 'Popularity becomes the main criterion, even though views do not show whether something is safe.',
        },
        perspective: {
          el: 'Ένα trend μπορεί να διαδίδεται γρήγορα πριν προλάβουν να φανούν οι πραγματικοί κίνδυνοι.',
          en: 'A trend can spread faster than its real risks become clear.',
        },
      },
      {
        id: 'check',
        label: { el: 'Θα έψαχνα πρώτα τι ακριβώς περιλαμβάνει και αν υπάρχουν προειδοποιήσεις.', en: 'I would first check exactly what it involves and whether there are warnings.' },
        consequence: {
          el: 'Καθυστερείς λίγο τη συμμετοχή, αλλά αποφασίζεις με περισσότερες πληροφορίες.',
          en: 'You delay joining a little, but make the decision with more information.',
        },
        perspective: {
          el: 'Το να ελέγχεις την πηγή και τους κινδύνους είναι διαφορετικό από το να εμπιστεύεσαι τον αριθμό των views.',
          en: 'Checking sources and risks is different from trusting the number of views.',
        },
      },
      {
        id: 'skip',
        label: { el: 'Θα το άφηνα αν δεν μπορούσα να καταλάβω αν είναι ασφαλές.', en: 'I would skip it if I could not tell whether it was safe.' },
        consequence: {
          el: 'Μπορεί να χάσεις ένα trend, αλλά δεν χρειάζεται να αποδείξεις κάτι συμμετέχοντας σε μια αβέβαιη δραστηριότητα.',
          en: 'You may miss a trend, but you do not need to prove anything by joining an uncertain activity.',
        },
        perspective: {
          el: 'Το “όχι ακόμα” είναι επίσης επιλογή όταν δεν έχεις αρκετές πληροφορίες.',
          en: '“Not yet” is also a choice when you do not have enough information.',
        },
      },
    ],
    reflection: [
      {
        el: 'Πότε η δημοτικότητα ενός post σε επηρεάζει περισσότερο από το περιεχόμενό του;',
        en: 'When does the popularity of a post influence you more than its content?',
      },
      {
        el: 'Ποια ένδειξη θα σε έκανε να σταματήσεις πριν δοκιμάσεις ένα challenge;',
        en: 'What sign would make you stop before trying a challenge?',
      },
    ],
  },
  {
    id: 'ai-homework',
    category: 'ai',
    minAge: 11,
    maxAge: 17,
    minutes: 4,
    title: {
      el: 'Η εργασία που έγραψε το AI',
      en: 'The homework AI wrote',
    },
    teaser: {
      el: 'Το κείμενο φαίνεται άψογο, αλλά δεν είσαι σίγουρος ότι είναι σωστό.',
      en: 'The text looks excellent, but you are not sure it is accurate.',
    },
    situation: {
      el: 'Ζήτησες από ένα AI να σε βοηθήσει σε σχολική εργασία. Σου έδωσε ένα πολύ καλό κείμενο με ημερομηνίες και γεγονότα που δεν θυμάσαι από το μάθημα. Η προθεσμία είναι κοντά.',
      en: 'You asked an AI to help with a school assignment. It produced a polished text with dates and facts you do not remember from class. The deadline is close.',
    },
    question: { el: 'Τι κάνεις με το κείμενο;', en: 'What do you do with the text?' },
    choices: [
      {
        id: 'submit',
        label: { el: 'Το παραδίδω όπως είναι.', en: 'I submit it as it is.' },
        consequence: {
          el: 'Κερδίζεις χρόνο, αλλά παραδίδεις πληροφορίες που δεν έχεις ελέγξει και ίσως δεν μπορείς να εξηγήσεις.',
          en: 'You save time, but submit information you have not checked and may not be able to explain.',
        },
        perspective: {
          el: 'Η καλή διατύπωση δεν είναι απόδειξη ότι μια πληροφορία είναι ακριβής.',
          en: 'Good writing is not proof that information is accurate.',
        },
      },
      {
        id: 'verify',
        label: { el: 'Ελέγχω τα βασικά στοιχεία σε βιβλίο ή αξιόπιστες πηγές και ξαναγράφω ό,τι χρειάζεται.', en: 'I verify the key facts in a book or reliable sources and rewrite what needs changing.' },
        consequence: {
          el: 'Χρησιμοποιείς το AI ως βοήθημα, αλλά η τελική εργασία περνά από τον δικό σου έλεγχο.',
          en: 'You use AI as support, but the final work goes through your own verification.',
        },
        perspective: {
          el: 'Η αξία δεν είναι μόνο να βρεις κείμενο γρήγορα, αλλά να ξέρεις τι μπορείς να υποστηρίξεις.',
          en: 'The value is not only getting text quickly, but knowing what you can stand behind.',
        },
      },
      {
        id: 'restart',
        label: { el: 'Ξεκινώ από τις δικές μου σημειώσεις και χρησιμοποιώ το AI μόνο για ερωτήσεις.', en: 'I start from my own notes and use AI only for questions.' },
        consequence: {
          el: 'Θα χρειαστεί περισσότερο χρόνο, αλλά διατηρείς καλύτερα τη σύνδεση ανάμεσα στη δουλειά και σε όσα καταλαβαίνεις.',
          en: 'It may take longer, but you keep a clearer connection between the work and what you understand.',
        },
        perspective: {
          el: 'Το AI μπορεί να λειτουργεί σαν εργαλείο διερεύνησης χωρίς να αντικαθιστά ολόκληρη τη διαδικασία.',
          en: 'AI can work as an exploration tool without replacing the whole process.',
        },
      },
    ],
    reflection: [
      {
        el: 'Πώς θα καταλάβαινες ότι ένα AI “ακούγεται σίγουρο” χωρίς να είναι σωστό;',
        en: 'How could you notice that an AI sounds confident without being correct?',
      },
      {
        el: 'Ποιο κομμάτι μιας εργασίας θέλεις να παραμένει ξεκάθαρα δικό σου;',
        en: 'Which part of an assignment do you want to remain clearly your own?',
      },
    ],
  },
  {
    id: 'deepfake-teacher',
    category: 'ai',
    minAge: 12,
    maxAge: 17,
    minutes: 4,
    title: {
      el: 'Το βίντεο του καθηγητή',
      en: 'The teacher video',
    },
    teaser: {
      el: 'Ένα παράξενο βίντεο κυκλοφορεί στην ομάδα. Είναι αληθινό ή deepfake;',
      en: 'A strange video is spreading in the group. Is it real or a deepfake?',
    },
    situation: {
      el: 'Στην ομαδική συνομιλία της τάξης εμφανίζεται βίντεο στο οποίο ένας καθηγητής φαίνεται να λέει κάτι πολύ προσβλητικό. Κάποιοι λένε ότι είναι αληθινό, άλλοι ότι είναι AI. Σου ζητούν να το προωθήσεις.',
      en: 'A class group chat receives a video in which a teacher appears to say something very offensive. Some say it is real, others say it is AI. People ask you to forward it.',
    },
    question: { el: 'Τι θα έκανες;', en: 'What would you do?' },
    choices: [
      {
        id: 'forward',
        label: { el: 'Το προωθώ — ας αποφασίσουν οι άλλοι.', en: 'I forward it — others can decide.' },
        consequence: {
          el: 'Το βίντεο εξαπλώνεται περισσότερο πριν επιβεβαιωθεί αν είναι αυθεντικό.',
          en: 'The video spreads further before anyone confirms whether it is authentic.',
        },
        perspective: {
          el: 'Η απλή προώθηση συμβάλλει στη διάδοση ακόμη κι αν συνοδεύεται από αμφιβολία.',
          en: 'Forwarding still contributes to distribution even when you add doubt.',
        },
      },
      {
        id: 'pause',
        label: { el: 'Δεν το προωθώ και ψάχνω πρώτα την αρχική πηγή ή άλλη επιβεβαίωση.', en: 'I do not forward it and first look for the original source or other confirmation.' },
        consequence: {
          el: 'Σταματάς προσωρινά τη διάδοση και προσπαθείς να βρεις στοιχεία πριν βγάλεις συμπέρασμα.',
          en: 'You temporarily stop the spread and look for evidence before reaching a conclusion.',
        },
        perspective: {
          el: 'Σε περιεχόμενο που μπορεί να έχει παραχθεί ή αλλοιωθεί με AI, η προέλευση έχει μεγάλη σημασία.',
          en: 'For content that may have been created or altered with AI, provenance matters.',
        },
      },
      {
        id: 'report',
        label: { el: 'Το αναφέρω σε έναν υπεύθυνο ενήλικο χωρίς να το αναδημοσιεύσω.', en: 'I flag it to a responsible adult without reposting it.' },
        consequence: {
          el: 'Το θέμα μπορεί να ελεγχθεί χωρίς να αυξήσεις το κοινό του βίντεο.',
          en: 'The issue can be checked without increasing the video’s audience.',
        },
        perspective: {
          el: 'Μερικές φορές ο καλύτερος τρόπος να ελεγχθεί κάτι δεν είναι να το δείξουμε σε περισσότερο κόσμο.',
          en: 'Sometimes the best way to verify something is not to show it to more people.',
        },
      },
    ],
    reflection: [
      {
        el: 'Τι θα θεωρούσες αρκετή επιβεβαίωση πριν πιστέψεις ένα σοκαριστικό βίντεο;',
        en: 'What would count as enough confirmation before believing a shocking video?',
      },
      {
        el: 'Πώς αλλάζει η ευθύνη μας όταν η τεχνολογία κάνει εύκολη την παραποίηση εικόνας και φωνής;',
        en: 'How does our responsibility change when technology makes it easy to fake image and voice?',
      },
    ],
  },
  {
    id: 'group-photo',
    category: 'friends',
    minAge: 10,
    maxAge: 15,
    minutes: 3,
    title: {
      el: 'Η φωτογραφία στην ομαδική',
      en: 'The photo in the group chat',
    },
    teaser: {
      el: 'Κάποιος στέλνει αστεία φωτογραφία συμμαθητή χωρίς να τον ρωτήσει.',
      en: 'Someone shares a funny photo of a classmate without asking them.',
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
          el: 'Το reaction προσθέτει κοινωνική επιβράβευση σε κάτι που αφορά έναν άνθρωπο χωρίς τη συγκατάθεσή του.',
          en: 'Your reaction adds social approval to something involving a person who did not consent.',
        },
        perspective: {
          el: 'Σε μια ομάδα, ακόμα και μια μικρή αντίδραση μπορεί να ενισχύσει το κλίμα.',
          en: 'In a group, even a small reaction can reinforce the atmosphere.',
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
          el: 'Η σιωπή και η ενεργή συμμετοχή δεν είναι το ίδιο, αλλά μπορεί να έχουν διαφορετικές επιπτώσεις στην ομάδα.',
          en: 'Silence and active participation are not the same, but they can have different effects on the group.',
        },
      },
      {
        id: 'speak',
        label: { el: 'Λέω να μην ανέβει αλλού και να διαγραφεί.', en: 'I say it should not be reposted and should be deleted.' },
        consequence: {
          el: 'Μπορεί να δημιουργηθεί αμηχανία ή αντίδραση στην ομάδα, αλλά βάζεις όριο πριν η φωτογραφία διαδοθεί περισσότερο.',
          en: 'It may create awkwardness or pushback in the group, but you set a boundary before the photo spreads further.',
        },
        perspective: {
          el: 'Η προστασία κάποιου μέσα σε μια παρέα μερικές φορές έχει κοινωνικό κόστος.',
          en: 'Protecting someone in a peer group can sometimes carry a social cost.',
        },
      },
    ],
    reflection: [
      {
        el: 'Πώς θα άλλαζε η επιλογή σου αν ήσουν εσύ στη φωτογραφία;',
        en: 'How would your choice change if you were the person in the photo?',
      },
      {
        el: 'Πότε ένα “αστείο” σταματά να είναι αστείο για όλους;',
        en: 'When does a “joke” stop being funny for everyone?',
      },
    ],
  },
  {
    id: 'exclude-classmate',
    category: 'friends',
    minAge: 11,
    maxAge: 16,
    minutes: 4,
    title: {
      el: '“Μην τον καλέσουμε”',
      en: '“Let’s not invite them”',
    },
    teaser: {
      el: 'Η παρέα κανονίζει έξοδο και θέλει να αποκλείσει ένα άτομο επίτηδες.',
      en: 'The group plans an outing and wants to deliberately leave one person out.',
    },
    situation: {
      el: 'Η παρέα σου κανονίζει έξοδο. Ένα άτομο λέει να μην καλέσετε έναν συμμαθητή γιατί “χαλάει το κλίμα”. Σου ζητούν να μην του πεις τίποτα και να συμφωνήσεις.',
      en: 'Your friend group is planning an outing. Someone says not to invite a classmate because they “ruin the vibe”. They ask you not to tell them and to go along with it.',
    },
    question: { el: 'Τι θα έκανες;', en: 'What would you do?' },
    choices: [
      {
        id: 'agree',
        label: { el: 'Συμφωνώ για να μη χαλάσω την παρέα.', en: 'I agree so I do not upset the group.' },
        consequence: {
          el: 'Αποφεύγεις τη σύγκρουση με την παρέα, αλλά συμμετέχεις στον αποκλεισμό.',
          en: 'You avoid conflict with your friends, but take part in excluding someone.',
        },
        perspective: {
          el: 'Η πίεση να διατηρηθεί η ηρεμία της ομάδας μπορεί να μας κάνει να δεχτούμε κάτι που μόνοι μας δεν θα επιλέγαμε.',
          en: 'Pressure to keep peace in a group can make us accept something we might not choose alone.',
        },
      },
      {
        id: 'question',
        label: { el: 'Ρωτάω τι ακριβώς έχει συμβεί και αν υπάρχει άλλος τρόπος να λυθεί.', en: 'I ask what actually happened and whether there is another way to handle it.' },
        consequence: {
          el: 'Η συζήτηση μετακινείται από μια γενική ταμπέλα (“χαλάει το κλίμα”) σε συγκεκριμένους λόγους και πιθανές λύσεις.',
          en: 'The discussion moves from a broad label (“ruins the vibe”) to specific reasons and possible solutions.',
        },
        perspective: {
          el: 'Οι συγκεκριμένες πληροφορίες βοηθούν να ξεχωρίσουμε ένα πραγματικό πρόβλημα από έναν απλό αποκλεισμό.',
          en: 'Specific information helps separate a real problem from simple exclusion.',
        },
      },
      {
        id: 'optout',
        label: { el: 'Λέω ότι δεν θέλω να συμμετέχω σε σχέδιο που βασίζεται σε κρυφό αποκλεισμό.', en: 'I say I do not want to take part in a plan based on secretly excluding someone.' },
        consequence: {
          el: 'Μπορεί να διαφωνήσουν μαζί σου, αλλά κάνεις ξεκάθαρο το προσωπικό σου όριο.',
          en: 'They may disagree with you, but you make your personal boundary clear.',
        },
        perspective: {
          el: 'Δεν ελέγχεις πάντα τι θα κάνει η ομάδα· ελέγχεις όμως σε τι συμφωνείς να συμμετέχεις.',
          en: 'You cannot always control what the group does, but you can control what you agree to take part in.',
        },
      },
    ],
    reflection: [
      {
        el: 'Τι διαφορά έχει το να βάζεις όρια από το να αποκλείεις κάποιον για να τον τιμωρήσεις;',
        en: 'What is the difference between setting boundaries and excluding someone to punish them?',
      },
      {
        el: 'Πότε αξίζει να διαφωνήσεις με την παρέα, ακόμα κι αν είναι άβολο;',
        en: 'When is it worth disagreeing with your friends even if it feels awkward?',
      },
    ],
  },
];

export const getScenario = (id: string | undefined) =>
  lifeScenarios.find((scenario) => scenario.id === id);
