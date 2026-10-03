import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RefreshCw, Trophy, Heart } from 'lucide-react';
import { playCardFlip, playPop, playWin } from '../utils/sound';

const CARD_ITEMS = ['💖', '🎂', '🎁', '👑', '🌹', '🧸'];

const MemoryMatchGame = ({ onComplete }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const initGame = () => {
    playPop();
    const duplicated = [...CARD_ITEMS, ...CARD_ITEMS];
    const shuffled = duplicated
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setIsWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
      return;
    }

    playCardFlip();
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx].emoji === cards[secondIdx].emoji) {
        // Match!
        const newMatched = [...matched, firstIdx, secondIdx];
        setMatched(newMatched);
        setFlipped([]);
        playPop();

        if (newMatched.length === cards.length) {
          setIsWon(true);
          playWin();
          confetti({ particleCount: 120, spread: 80 });
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 1800);
        }
      } else {
        // No match
        setTimeout(() => {
          setFlipped([]);
        }, 800);
      }
    }
  };

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-pink-500/30 max-w-xl mx-auto my-2 text-center flex flex-col items-center justify-center">
      <div className="flex items-center justify-center space-x-3 mb-3 w-full relative">
        <h2 className="font-fredoka text-2xl sm:text-3xl font-bold text-white text-center">
          Romantic Memory Match 🧩
        </h2>
        <button
          onClick={initGame}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 transition-colors absolute right-0"
          title="Restart Game"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <p className="text-sm sm:text-base text-pink-100/90 mb-4 text-center">
        Match all the cute pairs to prove how sharp Sireesha's mind is! ✨
      </p>

      <div className="flex items-center justify-center space-x-6 text-sm sm:text-base text-pink-200 font-semibold mb-4 px-2 text-center">
        <span>Moves: <strong className="text-pink-400 text-base sm:text-lg">{moves}</strong></span>
        <span>Pairs Matched: <strong className="text-pink-400 text-base sm:text-lg">{matched.length / 2} / {CARD_ITEMS.length}</strong></span>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-4 gap-3.5 w-full">
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(idx);
          const isCardMatched = matched.includes(idx);

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className={`h-22 sm:h-26 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 transform perspective-1000 ${
                isFlipped 
                  ? isCardMatched 
                    ? 'bg-gradient-to-tr from-pink-500 to-rose-400 border-2 border-amber-300 shadow-lg scale-95' 
                    : 'bg-gradient-to-tr from-purple-600 to-pink-500 border border-white/40 rotate-y-180' 
                  : 'bg-slate-800/80 hover:bg-slate-700/90 border border-pink-500/20 hover:scale-105'
              }`}
            >
              {isFlipped ? (
                <span className="text-4xl sm:text-5xl animate-bounce">{card.emoji}</span>
              ) : (
                <Heart className="w-7 h-7 text-pink-400/50" />
              )}
            </div>
          );
        })}
      </div>

      {/* Victory Banner */}
      {isWon && (
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-pink-600/40 to-purple-600/40 border border-pink-400/60 text-center animate-fadeIn w-full flex flex-col items-center justify-center">
          <Trophy className="w-12 h-12 text-amber-300 mx-auto mb-2 animate-bounce" />
          <h3 className="font-dancing text-4xl sm:text-5xl font-bold text-white glow-text text-center">
            Amazing Job, Sireesha! 🎉
          </h3>
          <p className="text-sm sm:text-base text-pink-100 mt-2 text-center">
            You matched all cards in just <strong className="text-amber-300 text-lg">{moves} moves</strong>! Level 1 Complete! 👑
          </p>
          <p className="text-xs sm:text-sm text-amber-200 mt-3 font-semibold animate-pulse">
            ✨ Moving to Step 3: Loved Ones' Quiz... 💕
          </p>
        </div>
      )}
    </div>
  );
};

export default MemoryMatchGame;
