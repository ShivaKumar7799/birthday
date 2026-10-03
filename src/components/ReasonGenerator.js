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
    <section className="glass-card p-4 sm:p-8 rounded-3xl border border-pink-500/30 max-w-xl mx-auto my-2 text-center flex flex-col items-center justify-center">
      <h2 className="font-dancing text-3xl sm:text-5xl font-bold text-white mb-2 glow-text text-center">
        Why Your Loved Ones Love Sireesha 💖
      </h2>
      <p className="text-xs sm:text-base text-pink-100/90 mb-4 font-medium text-center px-1">
        Tap the heart jar below to draw a sweet reason! ✨
      </p>

      {/* Jar & Reason display */}
      <div className="bg-slate-900/60 p-4 sm:p-7 rounded-2xl border border-pink-500/30 shadow-inner mb-4 sm:mb-6 relative overflow-hidden min-h-[130px] flex flex-col justify-center items-center text-center w-full">
        <div className="absolute top-2 right-3 text-xs text-pink-300/80 font-mono">
          Reason #{count}
        </div>
        <p className="font-fredoka text-lg sm:text-2xl text-pink-200 font-semibold leading-relaxed animate-fadeIn text-center px-1">
          "{currentReason}"
        </p>
      </div>

      <button
        onClick={drawNewReason}
        className="px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-fredoka font-semibold shadow-lg glow-btn flex items-center justify-center space-x-2 mx-auto text-sm sm:text-lg active:scale-95 transition-transform"
      >
        <Shuffle className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Draw Another Note 💌</span>
      </button>
    </section>
  );
};

export default ReasonGenerator;
