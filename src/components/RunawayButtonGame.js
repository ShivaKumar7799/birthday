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
    <section className="glass-card p-6 sm:p-8 rounded-3xl border border-pink-500/30 max-w-xl mx-auto my-2 text-center flex flex-col items-center justify-center">
      <h2 className="font-dancing text-5xl sm:text-6xl font-bold text-white mb-2 glow-text text-center">
        Do You Love Me, Sireesha? 💘
      </h2>
      <p className="text-sm sm:text-base text-pink-100/90 mb-5 text-center">
        Choose your honest answer below! 😉
      </p>

      {!isAccepted ? (
        <div className="flex items-center justify-center space-x-6 min-h-[95px] relative w-full">
          <button
            onClick={handleYes}
            style={{ transform: `scale(${yesScale})` }}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-fredoka font-semibold shadow-xl glow-btn transition-transform duration-200 text-base sm:text-lg"
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
            className="px-6 py-3 rounded-full bg-slate-800 text-pink-300 text-sm sm:text-base font-medium border border-pink-500/20"
          >
            No 🙈
          </button>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-pink-950/40 border border-pink-500/40 animate-fadeIn space-y-3 flex flex-col items-center justify-center text-center w-full">
          <Heart className="w-18 h-18 text-pink-400 fill-pink-400 mx-auto animate-bounce" />
          <h3 className="font-dancing text-4xl sm:text-5xl font-bold text-pink-300 glow-text text-center">
            I KNEW IT! 🥰
          </h3>
          <p className="text-sm sm:text-base text-pink-100 text-center">
            I love you infinitely more, Sireesha! You are my world! 💖
          </p>
        </div>
      )}
    </section>
  );
};

export default RunawayButtonGame;
