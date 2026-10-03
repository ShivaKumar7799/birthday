import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Shuffle } from 'lucide-react';
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
    <section className="glass-card p-6 sm:p-8 rounded-3xl border border-pink-500/30 max-w-xl mx-auto my-2 text-center flex flex-col items-center justify-center">
      <h2 className="font-dancing text-5xl sm:text-6xl font-bold text-white mb-2 glow-text text-center">
        Why I Love Sireesha 💖
      </h2>
      <p className="text-sm sm:text-base text-pink-100/90 mb-5 font-medium text-center">
        Tap the heart jar below to draw a sweet reason! ✨
      </p>

      {/* Jar & Reason display */}
      <div className="bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-pink-500/30 shadow-inner mb-6 relative overflow-hidden min-h-[150px] flex flex-col justify-center items-center text-center w-full">
        <div className="absolute top-2.5 right-3 text-xs text-pink-300/80 font-mono">
          Reason #{count}
        </div>
        <p className="font-fredoka text-xl sm:text-2xl text-pink-200 font-semibold leading-relaxed animate-fadeIn text-center">
          "{currentReason}"
        </p>
      </div>

      <button
        onClick={drawNewReason}
        className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-fredoka font-semibold shadow-lg glow-btn flex items-center justify-center space-x-2 mx-auto text-base sm:text-lg"
      >
        <Shuffle className="w-5 h-5" />
        <span>Draw Another Love Note 💌</span>
      </button>
    </section>
  );
};

export default ReasonGenerator;
