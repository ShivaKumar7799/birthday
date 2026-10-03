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
          confetti({ particleCount: 100, spread: 70 });
          if (onComplete) onComplete();
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
    <div className="glass-card p-6 rounded-3xl border border-pink-500/30 max-w-xl mx-auto my-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
            Puzzle 1 🧩
          </span>
          <h2 className="font-fredoka text-xl sm:text-2xl font-bold text-white mt-1">
            Romantic Memory Match
          </h2>
        </div>
        <button
          onClick={initGame}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 transition-colors"
          title="Restart Game"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <p className="text-xs sm:text-sm text-pink-100/80 mb-4">
        Match all the cute pairs to prove how sharp Sireesha's mind is! ✨
      </p>

      <div className="flex items-center justify-between text-xs text-pink-200 font-semibold mb-4 px-2">
        <span>Moves: <strong className="text-pink-400 text-sm">{moves}</strong></span>
        <span>Pairs Matched: <strong className="text-pink-400 text-sm">{matched.length / 2} / {CARD_ITEMS.length}</strong></span>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(idx);
          const isCardMatched = matched.includes(idx);

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className={`h-20 sm:h-24 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 transform perspective-1000 ${
                isFlipped 
                  ? isCardMatched 
                    ? 'bg-gradient-to-tr from-pink-500 to-rose-400 border-2 border-amber-300 shadow-lg scale-95' 
                    : 'bg-gradient-to-tr from-purple-600 to-pink-500 border border-white/40 rotate-y-180' 
                  : 'bg-slate-800/80 hover:bg-slate-700/90 border border-pink-500/20 hover:scale-105'
              }`}
            >
              {isFlipped ? (
                <span className="text-3xl sm:text-4xl animate-bounce">{card.emoji}</span>
              ) : (
                <Heart className="w-6 h-6 text-pink-400/50" />
              )}
            </div>
          );
        })}
      </div>

      {/* Victory Banner */}
      {isWon && (
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-pink-600/40 to-purple-600/40 border border-pink-400/60 text-center animate-fadeIn">
          <Trophy className="w-10 h-10 text-amber-300 mx-auto mb-2 animate-bounce" />
          <h3 className="font-dancing text-3xl font-bold text-white glow-text">
            Amazing Job, Sireesha! 🎉
          </h3>
          <p className="text-xs sm:text-sm text-pink-100 mt-1">
            You matched all cards in just <strong className="text-amber-300">{moves} moves</strong>! Level 1 Complete! 👑
          </p>
        </div>
      )}
    </div>
  );
};

export default MemoryMatchGame;
