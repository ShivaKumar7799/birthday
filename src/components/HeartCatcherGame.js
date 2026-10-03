import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Play, Trophy, Sparkles } from 'lucide-react';
import { playHeartCatch, playPop, playWin } from '../utils/sound';

const ICONS = ['💖', '👑', '🎂', '🌹', '✨', '🎁', '🧸'];

const HeartCatcherGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [items, setItems] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      setIsGameOver(true);
      playWin();
      confetti({ particleCount: 100, spread: 80 });
      if (score > highScore) {
        setHighScore(score);
      }
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, highScore]);

  useEffect(() => {
    let itemSpawner = null;
    if (isPlaying) {
      itemSpawner = setInterval(() => {
        const newItem = {
          id: Date.now() + Math.random(),
          symbol: ICONS[Math.floor(Math.random() * ICONS.length)],
          left: `${10 + Math.random() * 80}%`,
          speed: 1.8 + Math.random() * 1.5
        };
        setItems((prev) => [...prev.slice(-12), newItem]);
      }, 500);
    }
    return () => clearInterval(itemSpawner);
  }, [isPlaying]);

  const startGame = () => {
    playPop();
    setScore(0);
    setTimeLeft(15);
    setItems([]);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  const handleCatch = (id) => {
    if (!isPlaying) return;
    playHeartCatch();
    setScore((prev) => prev + 1);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="glass-card p-6 sm:p-8 rounded-3xl border border-pink-500/30 max-w-xl mx-auto my-2 text-center flex flex-col items-center justify-center">
      <h2 className="font-fredoka text-3xl sm:text-4xl font-bold text-white mb-2 text-center">
        Catch Sireesha's Love Tokens! 🎮
      </h2>
      <p className="text-sm sm:text-base text-pink-100/90 mb-4 text-center">
        Tap as many falling hearts as you can before time runs out! ✨
      </p>

      <div className="flex items-center justify-center space-x-6 text-sm sm:text-base font-bold text-pink-200 bg-slate-900/60 p-3.5 rounded-xl mb-4 border border-pink-500/20 w-full text-center">
        <span>Score: <strong className="text-pink-400 text-lg">{score}</strong></span>
        <span>Time Left: <strong className="text-amber-300 text-lg">{timeLeft}s</strong></span>
        <span>High Score: <strong className="text-purple-300 text-lg">{highScore}</strong></span>
      </div>

      {/* Game Field */}
      <div className="relative w-full h-76 rounded-2xl bg-slate-900/80 border-2 border-pink-500/30 overflow-hidden shadow-inner flex flex-col items-center justify-center">
        {!isPlaying && !isGameOver && (
          <div className="text-center p-4 z-10 flex flex-col items-center justify-center">
            <Trophy className="w-14 h-14 text-amber-300 mx-auto mb-2 animate-bounce" />
            <p className="text-sm sm:text-base text-pink-200 mb-4 font-medium text-center">Ready to test your speed, Sireesha?</p>
            <button
              onClick={startGame}
              className="px-8 py-3.5 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-fredoka font-semibold text-base shadow-lg flex items-center justify-center space-x-2 mx-auto"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Start Catching! 🚀</span>
            </button>
          </div>
        )}

        {/* Falling items */}
        {isPlaying && (
          <div className="absolute inset-0 overflow-hidden">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleCatch(item.id)}
                style={{
                  left: item.left,
                  animation: `fallDown ${item.speed}s linear forwards`
                }}
                className="absolute text-4xl sm:text-5xl p-2 cursor-pointer hover:scale-125 transition-transform"
              >
                {item.symbol}
              </button>
            ))}
          </div>
        )}

        {/* Game Over Banner */}
        {isGameOver && (
          <div className="text-center p-4 z-10 animate-fadeIn flex flex-col items-center justify-center">
            <Sparkles className="w-14 h-14 text-pink-300 mx-auto mb-2 animate-spin" style={{ animationDuration: '3s' }} />
            <h3 className="font-dancing text-4xl sm:text-5xl font-bold text-white glow-text mb-1 text-center">
              Time's Up, Sireesha! 🎉
            </h3>
            <p className="text-sm sm:text-base text-pink-100 mb-4 text-center">
              You caught <strong className="text-amber-300 text-lg sm:text-xl">{score} hearts</strong>! You are legendary! 👑
            </p>
            <button
              onClick={startGame}
              className="px-7 py-3 rounded-full bg-pink-600 hover:bg-pink-500 text-white text-sm sm:text-base font-semibold shadow-lg mx-auto"
            >
              Play Again 🔄
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fallDown {
          0% { top: -40px; opacity: 1; }
          100% { top: 100%; opacity: 0.8; }
        }
      `}</style>
    </section>
  );
};

export default HeartCatcherGame;
