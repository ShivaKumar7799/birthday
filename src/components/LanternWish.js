import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Send, Flame } from 'lucide-react';
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
    <section className="glass-card p-6 sm:p-10 rounded-3xl border border-pink-500/30 max-w-xl mx-auto my-12 text-center relative overflow-hidden">
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-3 border border-purple-500/30">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>Sky Lantern Wish Tree 🌌</span>
      </div>

      <h2 className="font-dancing text-4xl sm:text-5xl font-bold text-white mb-2 glow-text">
        Release A Wish, Sireesha
      </h2>
      <p className="text-xs sm:text-sm text-pink-100/90 mb-6 font-medium">
        {CONFIG.lanternPrompt}
      </p>

      {/* Night Sky Box */}
      <div className="relative w-full h-64 rounded-2xl bg-slate-950 border border-purple-500/30 overflow-hidden shadow-2xl mb-6 flex flex-col justify-end p-4">
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
            <div className="w-10 h-14 bg-gradient-to-b from-amber-300 via-orange-400 to-amber-500 rounded-t-xl rounded-b-md shadow-[0_0_20px_rgba(245,158,11,0.9)] flex items-center justify-center relative">
              <Flame className="w-4 h-4 text-white fill-amber-200 animate-pulse" />
            </div>
            <span className="text-[10px] text-amber-200 font-bold bg-black/60 px-2 py-0.5 rounded-full mt-1 max-w-[120px] truncate shadow">
              {l.text}
            </span>
          </div>
        ))}

        <p className="text-[11px] text-purple-300/60 text-center font-mono">
          {lanterns.length === 0 
            ? 'The night sky is peaceful. Type your wish below to ignite a lantern... ✨' 
            : `${lanterns.length} wish lantern(s) flying high in the sky! 🌟`}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleRelease} className="flex items-center space-x-2 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Type your magical wish here..."
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          className="w-full bg-slate-900/90 text-white px-4 py-3 rounded-full text-xs sm:text-sm border border-pink-500/30 outline-none focus:border-pink-400 shadow-inner"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-fredoka font-semibold text-xs shadow-lg glow-btn flex items-center space-x-1 shrink-0"
        >
          <span>Release 🏮</span>
          <Send className="w-3.5 h-3.5" />
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
