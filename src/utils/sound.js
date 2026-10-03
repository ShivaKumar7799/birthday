// Web Audio Synthesizer & Speech Voice Harmony for Sireesha's Birthday Celebration

let audioCtx = null;
let bgmGain = null;
let isBgmPlaying = false;
let isMuted = false;
let melodyTimeout = null;
let speechTimeout = null;
let voiceIndex = 0;
let voiceScriptIndex = 0;

const bgmListeners = new Set();
export const subscribeBGM = (listener) => {
  bgmListeners.add(listener);
  return () => bgmListeners.delete(listener);
};

const notifyBgmListeners = () => {
  bgmListeners.forEach((listener) => {
    try { listener(isBgmPlaying); } catch (e) {}
  });
};

export const getIsBgmPlaying = () => isBgmPlaying;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const toggleMute = () => {
  isMuted = !isMuted;
  if (isMuted) {
    stopBGM();
  }
  return isMuted;
};

export const getIsMuted = () => isMuted;

export const playPop = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    console.log("Audio play error", e);
  }
};

export const playCardFlip = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    console.log(e);
  }
};

export const playWin = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

      gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.1);
      osc.stop(ctx.currentTime + idx * 0.1 + 0.3);
    });
  } catch (e) {
    console.log(e);
  }
};

export const playHeartCatch = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {
    console.log(e);
  }
};

export const playBlow = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    // Pink noise / wind blow simulation
    const bufferSize = ctx.sampleRate * 0.5; // 0.5 sec
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.5);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch (e) {
    console.log(e);
  }
};

// Complete Authentic Musical Notes for "Happy Birthday to You"
const HAPPY_BIRTHDAY_MELODY = [
  // Bar 1: "Happy birthday to you"
  { note: 261.63, duration: 0.35, pause: 0.05 }, // Hap- (C4)
  { note: 261.63, duration: 0.35, pause: 0.05 }, // py (C4)
  { note: 293.66, duration: 0.65, pause: 0.08 }, // birth- (D4)
  { note: 261.63, duration: 0.65, pause: 0.08 }, // day (C4)
  { note: 349.23, duration: 0.65, pause: 0.08 }, // to (F4)
  { note: 329.63, duration: 1.15, pause: 0.25 }, // you (E4)
  
  // Bar 2: "Happy birthday to you"
  { note: 261.63, duration: 0.35, pause: 0.05 }, // Hap- (C4)
  { note: 261.63, duration: 0.35, pause: 0.05 }, // py (C4)
  { note: 293.66, duration: 0.65, pause: 0.08 }, // birth- (D4)
  { note: 261.63, duration: 0.65, pause: 0.08 }, // day (C4)
  { note: 392.00, duration: 0.65, pause: 0.08 }, // to (G4)
  { note: 349.23, duration: 1.15, pause: 0.25 }, // you (F4)
  
  // Bar 3: "Happy birthday dear Sireesha"
  { note: 261.63, duration: 0.35, pause: 0.05 }, // Hap- (C4)
  { note: 261.63, duration: 0.35, pause: 0.05 }, // py (C4)
  { note: 523.25, duration: 0.65, pause: 0.08 }, // birth- (C5)
  { note: 440.00, duration: 0.65, pause: 0.08 }, // day (A4)
  { note: 349.23, duration: 0.65, pause: 0.08 }, // dear (F4)
  { note: 329.63, duration: 0.65, pause: 0.08 }, // Si- (E4)
  { note: 293.66, duration: 1.15, pause: 0.25 }, // reesha (D4)

  // Bar 4: "Happy birthday to you"
  { note: 466.16, duration: 0.35, pause: 0.05 }, // Hap- (Bb4)
  { note: 466.16, duration: 0.35, pause: 0.05 }, // py (Bb4)
  { note: 440.00, duration: 0.65, pause: 0.08 }, // birth- (A4)
  { note: 349.23, duration: 0.65, pause: 0.08 }, // day (F4)
  { note: 392.00, duration: 0.65, pause: 0.08 }, // to (G4)
  { note: 349.23, duration: 1.40, pause: 0.80 }  // you! (F4)
];

// Play rich music-box chime note
function playChimeNote(ctx, destination, freq, duration) {
  try {
    const osc = ctx.createOscillator();
    const overtone = ctx.createOscillator();
    const noteGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Sweet shimmering harmonic overtone
    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2, ctx.currentTime);

    noteGain.gain.setValueAtTime(0.12, ctx.currentTime);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(noteGain);
    overtone.connect(noteGain);
    noteGain.connect(destination);

    osc.start();
    overtone.start();
    osc.stop(ctx.currentTime + duration);
    overtone.stop(ctx.currentTime + duration);
  } catch (e) {}
}

// Multi-Voice Birthday Wishes for Sirisha (phonetic spelling for accurate TTS pronunciation)
const BIRTHDAY_VOICE_SCRIPTS = [
  {
    text: "Happy birthday to you! Happy birthday to you! Happy birthday dear Sirisha! Happy birthday to you!",
    pitch: 1.35,
    rate: 0.95
  },
  {
    text: "Happy birthday to you Sirisha! Wishing you endless love, joy, and bright smiles! We love you so much!",
    pitch: 1.08,
    rate: 0.92
  },
  {
    text: "Happy birthday to you! Happy birthday dear Sirisha! May all your wishes come true today and forever!",
    pitch: 1.25,
    rate: 0.98
  },
  {
    text: "Hip hip hooray! Happy birthday to our dearest Queen Sirisha! Sending you all our love!",
    pitch: 1.45,
    rate: 1.05
  },
  {
    text: "Happy birthday to you, Sirisha! From all your loved ones, you are cherished beyond words. Happy birthday!",
    pitch: 0.98,
    rate: 0.88
  }
];

const playNextVoice = () => {
  if (!isBgmPlaying || isMuted || typeof window === 'undefined' || !window.speechSynthesis) return;

  try {
    window.speechSynthesis.cancel();

    const voices = window.speechSynthesis.getVoices() || [];
    const script = BIRTHDAY_VOICE_SCRIPTS[voiceScriptIndex % BIRTHDAY_VOICE_SCRIPTS.length];
    voiceScriptIndex++;

    const utterance = new SpeechSynthesisUtterance(script.text);
    utterance.pitch = script.pitch;
    utterance.rate = script.rate;
    utterance.volume = 0.9;

    if (voices.length > 0) {
      // Rotate through different available browser voices
      utterance.voice = voices[voiceIndex % voices.length];
      voiceIndex = (voiceIndex + 1) % voices.length;
    }

    utterance.onend = () => {
      if (isBgmPlaying && !isMuted) {
        // Schedule next voice greetings smoothly
        speechTimeout = setTimeout(playNextVoice, 4500);
      }
    };

    utterance.onerror = () => {
      if (isBgmPlaying && !isMuted) {
        speechTimeout = setTimeout(playNextVoice, 5000);
      }
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.log("Speech synthesis error", err);
  }
};

// Start background "Happy Birthday to You Sireesha" melody and multi-voice greetings
export const startBGM = () => {
  if (isBgmPlaying || isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    isBgmPlaying = true;
    notifyBgmListeners();
    bgmGain = ctx.createGain();
    bgmGain.gain.setValueAtTime(0.12, ctx.currentTime);
    bgmGain.connect(ctx.destination);

    let noteIdx = 0;
    const playMelody = () => {
      if (!isBgmPlaying || isMuted) return;

      const current = HAPPY_BIRTHDAY_MELODY[noteIdx];
      playChimeNote(ctx, bgmGain, current.note, current.duration);

      noteIdx = (noteIdx + 1) % HAPPY_BIRTHDAY_MELODY.length;
      const waitTime = (current.duration + current.pause) * 1000;

      if (isBgmPlaying) {
        melodyTimeout = setTimeout(playMelody, waitTime);
      }
    };

    // Begin instrumental Happy Birthday melody
    playMelody();

    // Begin vocal Happy Birthday greetings with different voices
    if (speechTimeout) clearTimeout(speechTimeout);
    speechTimeout = setTimeout(playNextVoice, 800);
  } catch (e) {
    console.log("BGM Error", e);
  }
};

export const stopBGM = () => {
  isBgmPlaying = false;
  notifyBgmListeners();
  if (melodyTimeout) {
    clearTimeout(melodyTimeout);
    melodyTimeout = null;
  }
  if (speechTimeout) {
    clearTimeout(speechTimeout);
    speechTimeout = null;
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
};

export const toggleBGM = () => {
  if (isBgmPlaying) {
    stopBGM();
    return false;
  } else {
    startBGM();
    return true;
  }
};
