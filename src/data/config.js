// Customization configuration with dynamic query parameter support
// Reads person's name dynamically from URL query params (e.g. ?name=Sireesha or ?name=Priya)

export const getQueryParam = (keys, defaultVal = '') => {
  if (typeof window === 'undefined') return defaultVal;
  try {
    const params = new URLSearchParams(window.location.search);
    const keyList = Array.isArray(keys) ? keys : [keys];
    for (const key of keyList) {
      const val = params.get(key);
      if (val && val.trim()) {
        return val.trim();
      }
    }
  } catch (e) {}
  return defaultVal;
};

// Capitalize words nicely e.g. "sireesha" -> "Sireesha"
export const formatName = (str) => {
  if (!str) return '';
  return str
    .split(' ')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
};

export const resolvePersonName = () => {
  const rawName = getQueryParam(['name', 'person', 'to', 'herName', 'user'], 'Sireesha');
  return formatName(rawName) || 'Sireesha';
};

export const resolveNickname = (fullName) => {
  const customNick = getQueryParam(['nickname', 'nick']);
  if (customNick) return formatName(customNick);
  if (fullName.toLowerCase() === 'sireesha') return 'Siri';
  return fullName.split(' ')[0];
};

export const resolveSenderName = () => {
  const customSender = getQueryParam(['from', 'sender', 'hisName'], 'Loved Ones');
  return formatName(customSender) || 'Loved Ones';
};

const herName = resolvePersonName();
const herNickname = resolveNickname(herName);
const hisName = resolveSenderName();

export const CONFIG = {
  herName,
  herNickname,
  hisName,
  hisNickname: hisName,
  herTitle: `My Dearest ${herName} 💖`,
  subheading: "A magical world created with all our love, just for you! ✨",
  
  // Passcode for secret entry (optional / fun unlock)
  secretPasscode: "143", // or any date/code, default unlocks easily

  // Audio BGM preset title
  bgmTitle: "Sweet Romantic Lullaby",

  // Quiz Questions customized about Loved Ones for the celebrated person
  quizQuestions: [
    {
      id: 1,
      question: "What is your loved ones' absolute favorite view in the entire world?",
      options: [
        "A sunset by the beach 🌅",
        "Snowy mountain peaks 🏔️",
        `${herName}'s cute face & shining smile 🥰`,
        "A high-tech gaming room 🎮"
      ],
      correctIndex: 2,
      celebration: `Bingo! Nothing in this world comes close to ${herName}'s gorgeous smile for your loved ones! 💖`
    },
    {
      id: 2,
      question: `What happens to your loved ones whenever they hear ${herName}'s voice?`,
      options: [
        "All stress disappears instantly ✨",
        "Hearts beat in fast-forward 💓",
        "Everyone gets the biggest uncontrollable smile 😊",
        "All of the above! 💖"
      ],
      correctIndex: 3,
      celebration: "100% true! Your voice is your loved ones' greatest comfort and sweetest melody! 🎶"
    },
    {
      id: 3,
      question: "What is your loved ones' secret to true happiness?",
      options: [
        "Morning coffee ☕",
        `Making ${herName} laugh and keeping her happy 🥰`,
        "Winning a game 🏆",
        "Sleeping an extra hour 😴"
      ],
      correctIndex: 1,
      celebration: "Yes! Seeing you happy is the single greatest joy in your loved ones' life! 💑"
    },
    {
      id: 4,
      question: "Who is your loved ones' #1 favorite person, best friend, and forever star?",
      options: [
        `${herName} 💕`,
        `Our ${herNickname} 👑`,
        `The Birthday Star ${herName} 🎂`,
        `${herName}, now and for all eternity! ♾️`
      ],
      correctIndex: 3,
      celebration: "Without a doubt! Your loved ones cherish you endlessly, now and forever! 💍"
    },
    {
      id: 5,
      question: "If your loved ones could grant you any birthday wish, what would it be?",
      options: [
        "A lifetime filled with smiles, pampering, and endless love 💖",
        "Whatever your precious heart desires ✨",
        "To always stand by your side through every journey 🤝",
        "All of these and so much more! 🎁"
      ],
      correctIndex: 3,
      celebration: "Spot on! Your loved ones' biggest dream is to make every single day magical for you! 🌟"
    }
  ],

  // 100 Love Reasons / Jar of Hearts
  loveReasons: [
    "Your smile brightens up my darkest days.",
    "The cute way you laugh at silly jokes.",
    "How kind and caring your heart is.",
    "Your warm hugs that feel like coming home.",
    "The sparkle in your eyes when you're excited.",
    "How you make every ordinary day feel magical.",
    "Your voice is my favorite sound in the world.",
    "The way you care about the little things.",
    "Because being around you makes me a better person.",
    "Your endless patience and gentle soul.",
    "How beautiful you look even when you just woke up!",
    "The way you make my heart skip a beat every single time.",
    "Your adorable expressions when you're focused.",
    "Because you are my best friend and my true love.",
    "How you listen to me with so much love.",
    "Your sweet messages that make my day.",
    "Because you are unique, priceless, and one of a kind.",
    "How comfy it feels just being silent together.",
    "Because your love is the best gift I have ever received.",
    `Because you are ${herName}, and I love EVERYTHING about you! 💖`
  ],

  // Memories / Photo Cards (Users can swap image URLs or add local photos)
  memories: [
    {
      id: 1,
      title: "Our Special Moments 📸",
      date: "Unforgettable",
      description: "Every second spent with you is a memory I treasure forever.",
      bgGradient: "from-pink-500 to-rose-400",
      emoji: "💖"
    },
    {
      id: 2,
      title: "Your Brightest Smile 🌟",
      date: "Everyday Magic",
      description: "Your laughter is my favorite song and my daily dose of happiness.",
      bgGradient: "from-purple-500 to-pink-400",
      emoji: "😊"
    },
    {
      id: 3,
      title: "Hand in Hand 🤝",
      date: "Forever & Always",
      description: "No matter where life takes us, my hand will always hold yours.",
      bgGradient: "from-rose-500 to-red-400",
      emoji: "👩‍❤️‍👨"
    },
    {
      id: 4,
      title: "My Dream Come True 👑",
      date: "Today & Forever",
      description: `I wished for happiness, and universe sent me ${herName}.`,
      bgGradient: "from-amber-400 to-pink-500",
      emoji: "✨"
    }
  ],

  // Scratch card hidden message
  scratchCardSecret: `✨ SURPRISE! ${herName}, you are the most precious person in my life! I love you so, so much! 💖 Tap below to open your love letter 💌`,

  // Heartfelt Secret Love Letter
  loveLetter: {
    salutation: `Dearest ${herName},`,
    bodyParagraphs: [
      "I built this special digital playground just for you, to put a big smile on your face and remind you of how deeply loved and cherished you are.",
      "From the moment you entered my life, everything became brighter, sweeter, and infinitely more meaningful. Your kindness, your beautiful laugh, and your loving heart mean the world to me.",
      "Thank you for being my anchor, my happiness, and my favorite person to laugh with, play with, and share life with.",
      "No matter what games we play or puzzles we solve, the biggest win in my life will always be having YOU by my side."
    ],
    closing: "Forever & Always With You,",
    signature: `${hisName} 💖`
  },

  // Cake surprise text
  cakeTitle: `Make a Special Wish, ${herName}! 🎂`,
  cakeSubtext: "Blow out the candles (tap them) and slice your virtual birthday/celebration cake!",

  // Floating Lantern wish instructions
  lanternPrompt: `Write a special wish in your heart, ${herName}, and release it into the starry sky...`
};
