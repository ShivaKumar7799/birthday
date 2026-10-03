import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, Flame } from 'lucide-react';
import { CONFIG } from '../data/config';
import { playWin } from '../utils/sound';

const LanternWish = () => {
  const [wish, setWish] = useState('');
  const [lanterns, setLanterns] = useState([]);

  const handleRelease = (e) => {
    e.preventDefault();
    if (!wish.trim()) return;
    playWin();
    confetti({ particleCount: 60, spread: 50 });

    const newLantern = {
      id: Date.now(),
      text: wish,
      left: `${20 + Math.random() * 60}%`
    };

    setLanterns((prev) => [...prev, newLantern]);
    setWish('');
  };

  return (
    <section className="glass-card p-6 sm:p-8 rounded-3xl border border-pink-500/30 max-w-xl mx-auto my-2 text-center flex flex-col items-center justify-center">
      <h2 className="font-dancing text-5xl sm:text-6xl font-bold text-white mb-2 glow-text text-center">
        Release A Wish, Sireesha 🌌
      </h2>
      <p className="text-sm sm:text-base text-pink-100/90 mb-5 font-medium text-center">
        {CONFIG.lanternPrompt}
      </p>

      {/* Night Sky Box */}
      <div className="relative w-full h-68 sm:h-72 rounded-2xl bg-slate-950 border border-purple-500/30 overflow-hidden shadow-2xl mb-6 flex flex-col justify-end p-4 items-center">
        {/* Floating Lanterns */}
        {lanterns.map((l) => (
          <div
            key={l.id}
            style={{
              left: l.left,
              animation: 'floatLantern 8s ease-in-out forwards'
            }}
            className="absolute flex flex-col items-center pointer-events-none"
          >
            {/* Glowing Lantern */}
            <div className="w-11 h-15 bg-gradient-to-b from-amber-300 via-orange-400 to-amber-500 rounded-t-xl rounded-b-md shadow-[0_0_20px_rgba(245,158,11,0.9)] flex items-center justify-center relative">
              <Flame className="w-4.5 h-4.5 text-white fill-amber-200 animate-pulse" />
            </div>
            <span className="text-xs text-amber-200 font-bold bg-black/60 px-2.5 py-0.5 rounded-full mt-1 max-w-[140px] truncate shadow">
              {l.text}
            </span>
          </div>
        ))}

        <p className="text-xs sm:text-sm text-purple-300/80 text-center font-mono">
          {lanterns.length === 0 
            ? 'The night sky is peaceful. Type your wish below to ignite a lantern... ✨' 
            : `${lanterns.length} wish lantern(s) flying high in the sky! 🌟`}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleRelease} className="flex items-center justify-center space-x-2 max-w-md w-full mx-auto">
        <input
          type="text"
          placeholder="Type your magical wish here..."
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          className="w-full bg-slate-900/90 text-white px-5 py-3.5 rounded-full text-sm sm:text-base border border-pink-500/30 outline-none focus:border-pink-400 shadow-inner text-center"
        />
        <button
          type="submit"
          className="px-6 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-fredoka font-semibold text-sm sm:text-base shadow-lg glow-btn flex items-center justify-center space-x-2 shrink-0"
        >
          <span>Release 🏮</span>
          <Send className="w-4 h-4" />
        </button>
      </form>

      <style>{`
        @keyframes floatLantern {
          0% { bottom: 10px; opacity: 1; transform: scale(1); }
          100% { bottom: 90%; opacity: 0; transform: scale(0.6); }
        }
      `}</style>
    </section>
  );
};

export default LanternWish;
