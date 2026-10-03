import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, CheckCircle2 } from 'lucide-react';
import { CONFIG } from '../data/config';
import { playCardFlip, playWin } from '../utils/sound';

const PhotoGallery = ({ onComplete }) => {
  const memories = CONFIG.memories;
  const [flippedId, setFlippedId] = useState(null);
  const [viewedIds, setViewedIds] = useState(new Set());
  const [isAllCompleted, setIsAllCompleted] = useState(false);

  const handleCardClick = (id) => {
    playCardFlip();
    setFlippedId(flippedId === id ? null : id);

    const updated = new Set(viewedIds);
    updated.add(id);
    setViewedIds(updated);

    if (updated.size === memories.length && !isAllCompleted) {
      setIsAllCompleted(true);
      playWin();
      confetti({ particleCount: 120, spread: 80 });
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 2200);
    }
  };

  return (
    <section className="glass-card p-6 sm:p-10 rounded-3xl border border-pink-500/30 max-w-4xl mx-auto my-2 text-center flex flex-col items-center justify-center w-full">
      <h2 className="font-dancing text-5xl sm:text-6xl font-bold text-white mb-2 glow-text text-center">
        Our Special Memories 📸
      </h2>
      <p className="text-sm sm:text-base text-pink-100/90 mb-4 font-medium text-center">
        Tap all cards to flip them over and unlock your final grand surprise! ✨
      </p>

      {/* Progress pill */}
      <div className="mb-6 flex items-center justify-center space-x-2">
        <span className="px-4 py-1 rounded-full bg-pink-500/20 text-pink-200 border border-pink-400/30 text-xs sm:text-sm font-bold shadow-md">
          {viewedIds.size === memories.length 
            ? "✨ All Memories Explored!" 
            : `Cards Flipped: ${viewedIds.size} of ${memories.length}`}
        </span>
      </div>

      {/* Grid of Polaroid Memory Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
        {memories.map((mem) => {
          const isFlipped = flippedId === mem.id;
          const isViewed = viewedIds.has(mem.id);

          return (
            <div
              key={mem.id}
              onClick={() => handleCardClick(mem.id)}
              className="h-68 sm:h-72 rounded-2xl cursor-pointer perspective-1000 transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center relative"
            >
              <div
                className={`w-full h-full rounded-2xl transition-all duration-500 p-5 flex flex-col justify-between items-center shadow-xl text-center ${
                  isFlipped 
                    ? 'bg-gradient-to-br from-slate-900 via-purple-950 to-pink-950 border-2 border-pink-400 text-center' 
                    : `bg-gradient-to-br ${mem.bgGradient} border border-white/30 text-center`
                }`}
              >
                {!isFlipped ? (
                  <>
                    <div className="w-14 h-14 mx-auto rounded-full bg-white/20 flex items-center justify-center text-3xl shadow-inner relative">
                      {mem.emoji}
                      {isViewed && (
                        <CheckCircle2 className="w-5 h-5 text-amber-300 absolute -top-1 -right-1 bg-slate-950 rounded-full" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-fredoka text-xl font-bold text-white mb-1.5 drop-shadow text-center">
                        {mem.title}
                      </h3>
                      <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-black/20 text-pink-100 text-center">
                        {mem.date}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/90 font-medium text-center">
                      (Tap to flip 🔄)
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between border-b border-pink-500/30 pb-2 w-full">
                      <span className="font-dancing text-2xl font-bold text-pink-300 text-center w-full">
                        {mem.title}
                      </span>
                      <Heart className="w-5 h-5 text-pink-400 fill-pink-400 shrink-0" />
                    </div>
                    <p className="text-sm sm:text-base text-pink-100/90 leading-relaxed font-medium text-center">
                      {mem.description}
                    </p>
                    <span className="text-xs text-pink-300/80 text-center w-full">
                      Tap again to flip back
                    </span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {isAllCompleted && (
        <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-white font-fredoka font-bold text-base sm:text-lg animate-pulse shadow-2xl flex flex-col items-center justify-center space-y-1 w-full max-w-lg">
          <span>🎉 All Memories Explored, Sireesha! 💖</span>
          <span className="text-xs sm:text-sm font-medium text-pink-100">
            Unlocking the final step: Sky Wish Lanterns & Finale in 2s... 🌟
          </span>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;
