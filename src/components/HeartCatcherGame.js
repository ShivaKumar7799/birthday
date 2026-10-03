import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Gamepad2, Play, Trophy, Sparkles } from 'lucide-react';
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
    <section className="glass-card p-6 sm:p-10 rounded-3xl border border-pink-500/30 max-w-xl mx-auto my-12 text-center">
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-3 border border-purple-500/30">
        <Gamepad2 className="w-3.5 h-3.5 text-pink-300" />
        <span>Mini-Game: Catch The Hearts 🎮</span>
      </div>

      <h2 className="font-fredoka text-2xl sm:text-3xl font-bold text-white mb-2">
        Catch Sireesha's Love Tokens!
      </h2>
      <p className="text-xs sm:text-sm text-pink-100/80 mb-4">
        Tap as many falling hearts and gifts as you can before time runs out! ✨
      </p>

      <div className="flex items-center justify-between text-xs font-bold text-pink-200 bg-slate-900/60 p-3 rounded-xl mb-4 border border-pink-500/20">
        <span>Score: <strong className="text-pink-400 text-base">{score}</strong></span>
        <span>Time Left: <strong className="text-amber-300 text-base">{timeLeft}s</strong></span>
        <span>High Score: <strong className="text-purple-300 text-base">{highScore}</strong></span>
      </div>

      {/* Game Field */}
      <div className="relative w-full h-72 rounded-2xl bg-slate-900/80 border-2 border-pink-500/30 overflow-hidden shadow-inner flex items-center justify-center">
        {!isPlaying && !isGameOver && (
          <div className="text-center p-4 z-10">
            <Trophy className="w-12 h-12 text-amber-300 mx-auto mb-2 animate-bounce" />
            <p className="text-xs text-pink-200 mb-4 font-medium">Ready to test your speed, Sireesha?</p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-fredoka font-semibold text-xs shadow-lg flex items-center space-x-2 mx-auto"
            >
              <Play className="w-4 h-4 fill-current" />
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
                className="absolute text-3xl sm:text-4xl p-2 cursor-pointer hover:scale-125 transition-transform"
              >
                {item.symbol}
              </button>
            ))}
          </div>
        )}

        {/* Game Over Banner */}
        {isGameOver && (
          <div className="text-center p-4 z-10 animate-fadeIn">
            <Sparkles className="w-12 h-12 text-pink-300 mx-auto mb-2 animate-spin" style={{ animationDuration: '3s' }} />
            <h3 className="font-dancing text-3xl font-bold text-white glow-text mb-1">
              Time's Up, Sireesha! 🎉
            </h3>
            <p className="text-xs text-pink-100 mb-4">
              You caught <strong className="text-amber-300 text-base">{score} hearts</strong>! You are legendary! 👑
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2 rounded-full bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold shadow-lg"
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
