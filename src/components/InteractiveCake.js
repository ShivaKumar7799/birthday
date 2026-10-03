import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Flame, Wind, Scissors } from 'lucide-react';
import { CONFIG } from '../data/config';
import { playBlow, playWin, playPop } from '../utils/sound';

const InteractiveCake = ({ onComplete }) => {
  const [candlesLit, setCandlesLit] = useState([true, true, true]);
  const [isSliced, setIsSliced] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const isAllBlown = candlesLit.every((lit) => !lit);

  const handleBlowCandle = (idx) => {
    playBlow();
    const updated = [...candlesLit];
    updated[idx] = false;
    setCandlesLit(updated);

    if (updated.every((lit) => !lit)) {
      setWishMade(true);
      playWin();
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    }
  };

  const handleBlowAll = () => {
    playBlow();
    setCandlesLit([false, false, false]);
    setWishMade(true);
    playWin();
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
  };

  const handleSliceCake = () => {
    playPop();
    setIsSliced(true);
    playWin();
    confetti({ particleCount: 120, spread: 80 });
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 2200);
  };

  const resetCake = () => {
    playPop();
    setCandlesLit([true, true, true]);
    setIsSliced(false);
    setWishMade(false);
  };

  return (
    <section id="cake" className="glass-card p-6 sm:p-10 rounded-3xl border border-pink-500/30 max-w-2xl mx-auto my-2 text-center relative overflow-hidden flex flex-col items-center justify-center">
      <h2 className="font-dancing text-5xl sm:text-6xl font-bold text-white mb-2 glow-text text-center">
        {CONFIG.cakeTitle} 🎂
      </h2>
      <p className="text-sm sm:text-base text-pink-100/90 max-w-md mx-auto mb-5 font-medium text-center">
        {CONFIG.cakeSubtext}
      </p>

      {/* The Interactive Cake graphic */}
      <div className="relative w-64 sm:w-80 mx-auto my-4 flex flex-col items-center justify-center">
        {/* Candles Row */}
        <div className="flex justify-center space-x-8 mb-1 z-20">
          {candlesLit.map((isLit, idx) => (
            <div key={idx} className="flex flex-col items-center cursor-pointer" onClick={() => handleBlowCandle(idx)}>
              {/* Flame */}
              {isLit ? (
                <div className="animate-bounce">
                  <Flame className="w-7 h-7 text-amber-400 fill-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
                </div>
              ) : (
                <div className="h-7 flex items-center justify-center text-sm text-gray-400 font-bold animate-pulse">
                  💨
                </div>
              )}
              {/* Candle Body */}
              <div className="w-3 h-11 bg-gradient-to-b from-pink-300 to-rose-500 rounded-t-sm shadow-md border-x border-white/40"></div>
            </div>
          ))}
        </div>

        {/* Top Layer */}
        <div className="w-44 sm:w-52 h-14 bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 rounded-t-2xl shadow-lg border-b-4 border-pink-500 relative flex items-center justify-center">
          <span className="text-xl">💖 ✨ 💖</span>
        </div>

        {/* Middle Layer */}
        <div className="w-56 sm:w-64 h-16 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-t-xl shadow-lg border-b-4 border-purple-500 relative flex items-center justify-center">
          <span className="text-2xl">🍓 👑 🍓</span>
        </div>

        {/* Bottom Base Layer */}
        <div className="w-64 sm:w-76 h-20 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 rounded-t-xl shadow-2xl border-b-8 border-rose-700 relative flex items-center justify-center">
          <span className="font-dancing text-3xl font-bold text-white glow-text text-center">
            For Sireesha 💕
          </span>
        </div>

        {/* Cake Stand Plate */}
        <div className="w-72 sm:w-84 h-4.5 bg-gradient-to-r from-slate-200 via-white to-slate-300 rounded-full shadow-2xl mt-1 border border-white"></div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6 z-30 relative w-full">
        {!isAllBlown ? (
          <button
            onClick={handleBlowAll}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-fredoka font-semibold shadow-lg glow-btn flex items-center justify-center space-x-2 text-base sm:text-lg"
          >
            <Wind className="w-5 h-5" />
            <span>Blow Out All Candles 🕯️</span>
          </button>
        ) : !isSliced ? (
          <button
            onClick={handleSliceCake}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-fredoka font-semibold shadow-lg glow-btn flex items-center justify-center space-x-2 text-base sm:text-lg"
          >
            <Scissors className="w-5 h-5" />
            <span>Slice The Cake 🍰</span>
          </button>
        ) : (
          <button
            onClick={resetCake}
            className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 text-sm sm:text-base font-semibold border border-pink-400/30"
          >
            Blow & Slice Again 🔄
          </button>
        )}
      </div>

      {/* Wish & Slice Feedback */}
      {wishMade && (
        <div className="mt-6 p-5 rounded-2xl bg-pink-950/40 border border-pink-500/40 animate-fadeIn w-full flex flex-col items-center justify-center text-center">
          <h3 className="font-dancing text-4xl sm:text-5xl font-bold text-pink-300 glow-text mb-2 text-center">
            Your Wish is Granted, Sireesha! ✨
          </h3>
          <p className="text-sm sm:text-base text-pink-100 text-center">
            {isSliced 
              ? "Here is a sweet slice of happiness for the sweetest girl in the world! 🍰💕" 
              : "All candles are blown out! May all your dreams come true today and always! 💖"}
          </p>
          {isSliced && (
            <p className="text-xs sm:text-sm text-amber-200 font-bold mt-2 animate-pulse">
              ✨ Cake sliced! Moving to Step 6: Love Letter in 2s... 💌
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default InteractiveCake;
