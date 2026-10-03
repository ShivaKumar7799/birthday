import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';
import { playPop, playWin } from '../utils/sound';

const RunawayButtonGame = () => {
  const [noPos, setNoPos] = useState({ top: '0px', left: '0px' });
  const [yesScale, setYesScale] = useState(1);
  const [isAccepted, setIsAccepted] = useState(false);

  const moveNo = () => {
    playPop();
    const randomY = Math.floor(Math.random() * 160) - 80;
    const randomX = Math.floor(Math.random() * 160) - 80;
    setNoPos({ top: `${randomY}px`, left: `${randomX}px` });
    setYesScale((prev) => Math.min(prev + 0.15, 1.8));
  };

  const handleYes = () => {
    playWin();
    setIsAccepted(true);
    confetti({ particleCount: 120, spread: 80 });
  };

  return (
    <section className="glass-card p-6 sm:p-10 rounded-3xl border border-pink-500/30 max-w-xl mx-auto my-12 text-center">
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold mb-3 border border-rose-500/30">
        <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
        <span>Playful Question 💘</span>
      </div>

      <h2 className="font-dancing text-4xl sm:text-5xl font-bold text-white mb-3 glow-text">
        Do You Love Me, Sireesha?
      </h2>
      <p className="text-xs sm:text-sm text-pink-100/80 mb-6">
        Choose your honest answer below! 😉
      </p>

      {!isAccepted ? (
        <div className="flex items-center justify-center space-x-4 min-h-[90px] relative">
          <button
            onClick={handleYes}
            style={{ transform: `scale(${yesScale})` }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-fredoka font-semibold shadow-xl glow-btn transition-transform duration-200 text-sm"
          >
            YES! Forever! 💕
          </button>

          <button
            onMouseEnter={moveNo}
            onTouchStart={moveNo}
            onClick={moveNo}
            style={{
              position: 'relative',
              top: noPos.top,
              left: noPos.left,
              transition: 'all 0.15s ease'
            }}
            className="px-5 py-2.5 rounded-full bg-slate-800 text-pink-300 text-xs font-medium border border-pink-500/20"
          >
            No 🙈
          </button>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-pink-950/40 border border-pink-500/40 animate-fadeIn space-y-2">
          <Heart className="w-16 h-16 text-pink-400 fill-pink-400 mx-auto animate-bounce" />
          <h3 className="font-dancing text-3xl font-bold text-pink-300 glow-text">
            I KNEW IT! 🥰
          </h3>
          <p className="text-xs sm:text-sm text-pink-100">
            I love you infinitely more, Sireesha! You are my world! 💖
          </p>
        </div>
      )}
    </section>
  );
};

export default RunawayButtonGame;
