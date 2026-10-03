import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Shuffle } from 'lucide-react';
import { CONFIG } from '../data/config';
import { playPop, playWin } from '../utils/sound';

const ReasonGenerator = () => {
  const [currentReason, setCurrentReason] = useState(CONFIG.loveReasons[0]);
  const [count, setCount] = useState(1);

  const drawNewReason = () => {
    playPop();
    const randomIdx = Math.floor(Math.random() * CONFIG.loveReasons.length);
    setCurrentReason(CONFIG.loveReasons[randomIdx]);
    setCount((prev) => prev + 1);

    if (count % 5 === 0) {
      playWin();
      confetti({ particleCount: 50, spread: 60 });
    }
  };

  return (
    <section className="glass-card p-6 sm:p-10 rounded-3xl border border-pink-500/30 max-w-xl mx-auto my-12 text-center">
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold mb-3 border border-pink-500/30">
        <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
        <span>Jar of Love Reasons 💖</span>
      </div>

      <h2 className="font-dancing text-4xl sm:text-5xl font-bold text-white mb-2 glow-text">
        Why I Love Sireesha
      </h2>
      <p className="text-xs sm:text-sm text-pink-100/90 mb-6 font-medium">
        Tap the heart jar below to draw a sweet reason! ✨
      </p>

      {/* Jar & Reason display */}
      <div className="bg-slate-900/60 p-6 rounded-2xl border border-pink-500/30 shadow-inner mb-6 relative overflow-hidden min-h-[140px] flex flex-col justify-center items-center">
        <div className="absolute top-2 right-2 text-[10px] text-pink-300/60 font-mono">
          Reason #{count}
        </div>
        <p className="font-fredoka text-lg sm:text-xl text-pink-200 font-semibold leading-relaxed animate-fadeIn">
          "{currentReason}"
        </p>
      </div>

      <button
        onClick={drawNewReason}
        className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-fredoka font-semibold shadow-lg glow-btn flex items-center space-x-2 mx-auto text-sm"
      >
        <Shuffle className="w-4 h-4" />
        <span>Draw Another Love Note 💌</span>
      </button>
    </section>
  );
};

export default ReasonGenerator;
