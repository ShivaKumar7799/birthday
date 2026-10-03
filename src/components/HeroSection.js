import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, KeyRound, Smile } from 'lucide-react';
import { CONFIG } from '../data/config';
import { playPop, playWin, startBGM } from '../utils/sound';

const HeroSection = ({ onUnlock, isUnlocked }) => {
  const [yesPos, setYesPos] = useState({ x: 50, y: 50 });
  const [clickCount, setClickCount] = useState(0);
  const [balloons, setBalloons] = useState([]);
  const [isBlowingBalloons, setIsBlowingBalloons] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);

  const playfulMessages = [
    "Are you really sure you are Sireesha? Catch me again! 😜",
    "Too slow! Prove you're the real Sireesha! 🏃‍♀️💨",
    "Almost convinced! Catch me once more, gorgeous! ✨",
    "Just one more catch to unlock your birthday magic! 👑💖",
    "🎉 Verified 100%! Releasing birthday balloons! Welcome, Sireesha! 🎈🎈🎈"
  ];

  const buttonLabels = [
    "YES, I'm Sireesha! 🥰 (The Birthday Queen 👑)",
    "Catch Me, I'm Sireesha! 🏃‍♀️💨 (Too Fast!)",
    "Over Here, I'm Sireesha! 💕✨ (Shiva Kumar's Favorite)",
    "Still Looking For I'm Sireesha? 😜 (Almost Got Me!)",
    "Final Catch, I'm Sireesha! 🎂💖 (Unlock Surprises!)"
  ];

  const handleYesClick = () => {
    const nextCount = clickCount + 1;

    if (nextCount < 5) {
      playPop();
      setClickCount(nextCount);
      // Move anywhere on the whole display page (viewport: 18% to 82% width and 18% to 78% height)
      const randomX = Math.floor(Math.random() * 64) + 18;
      const randomY = Math.floor(Math.random() * 60) + 18;
      setYesPos({ x: randomX, y: randomY });

      // Mini confetti sparkle on each tap
      confetti({
        particleCount: 30,
        spread: 55,
        origin: { x: randomX / 100, y: randomY / 100 }
      });
    } else {
      // 5th click: Blow the balloons and unlock!
      setClickCount(5);
      setIsBlowingBalloons(true);
      playWin();
      startBGM();

      // Create 35 floating helium balloons filling the whole screen
      const balloonSymbols = ['🎈', '💗', '💖', '💜', '🎈', '✨', '👑', '🎉', '🎈'];
      const generatedBalloons = Array.from({ length: 35 }).map((_, i) => ({
        id: i,
        symbol: balloonSymbols[Math.floor(Math.random() * balloonSymbols.length)],
        left: `${2 + Math.random() * 94}%`,
        delay: `${Math.random() * 0.9}s`,
        speed: `${2.3 + Math.random() * 2.2}s`,
        scale: 0.85 + Math.random() * 0.85
      }));
      setBalloons(generatedBalloons);

      // Multi-burst celebratory confetti
      confetti({
        particleCount: 160,
        spread: 100,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 120,
          origin: { y: 0.4 }
        });
      }, 400);

      // Automatically move to the next step after 2.5s celebration
      setTimeout(() => {
        onUnlock();
      }, 2500);
    }
  };

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    if (passcode.trim() === CONFIG.secretPasscode || passcode.trim().length > 0) {
      playWin();
      startBGM();
      confetti({ particleCount: 100, spread: 70 });
      onUnlock();
    } else {
      playPop();
    }
  };

  return (
    <section className="pt-1 pb-4 flex flex-col items-center justify-center text-center px-4 relative w-full">
      {/* Balloon Burst Overlay on 5th Click */}
      {isBlowingBalloons && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {balloons.map((b) => (
            <div
              key={b.id}
              style={{
                left: b.left,
                animation: `blowBalloonsUp ${b.speed} ease-out forwards`,
                animationDelay: b.delay,
                transform: `scale(${b.scale})`
              }}
              className="absolute text-5xl sm:text-6xl drop-shadow-[0_0_15px_rgba(236,72,153,0.85)]"
            >
              {b.symbol}
            </div>
          ))}
        </div>
      )}

      {/* Floating runaway button rendered via Portal across the ENTIRE viewport */}
      {clickCount > 0 && clickCount < 5 && typeof document !== 'undefined' && createPortal(
        <button
          onClick={handleYesClick}
          style={{
            position: 'fixed',
            top: `${yesPos.y}vh`,
            left: `${yesPos.x}vw`,
            transform: 'translate(-50%, -50%)',
            zIndex: 99999,
            transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
          className="px-7 py-3.5 sm:px-9 sm:py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-300 text-white font-fredoka font-extrabold shadow-[0_0_35px_rgba(236,72,153,1),0_10px_30px_rgba(0,0,0,0.85)] border-3 sm:border-4 border-white flex items-center justify-center space-x-2 text-base sm:text-xl cursor-pointer hover:scale-110 active:scale-95 whitespace-nowrap animate-bounce"
        >
          <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{buttonLabels[clickCount]}</span>
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-200 shrink-0" />
        </button>,
        document.body
      )}

      {!isUnlocked ? (
        <div className="max-w-lg w-full glass-card-luxury p-6 sm:p-10 relative border-2 border-pink-400/40 shadow-2xl flex flex-col items-center justify-center text-center">
          {/* Top Floating Badge */}
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-300 p-1 shadow-2xl shadow-pink-500/40 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center border border-amber-300/30">
              <Heart className="w-12 h-12 text-pink-400 fill-pink-500/50 animate-pulse" />
            </div>
          </div>

          <h1 className="font-dancing text-6xl sm:text-7xl font-bold text-white mb-3 glow-text-rose leading-tight text-center">
            For {CONFIG.herName}
          </h1>
          <p className="text-pink-100/90 text-sm sm:text-base font-medium mb-5 leading-relaxed max-w-sm mx-auto text-center">
            {CONFIG.subheading}
          </p>

          <div className="bg-slate-950/60 backdrop-blur-md p-6 rounded-3xl border border-pink-500/30 mb-6 shadow-inner w-full flex flex-col items-center justify-center text-center">
            <h3 className="font-fredoka text-xl font-semibold text-pink-300 mb-2 flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Identity Verification</span>
            </h3>
            
            <p className="text-sm sm:text-base text-pink-100/90 mb-3 leading-relaxed text-center">
              Are you the most gorgeous girl named <strong className="text-pink-300 font-bold">{CONFIG.herName}</strong>?
            </p>

            {/* Playful message on click */}
            {clickCount > 0 && clickCount < 5 && (
              <div className="mb-4 animate-fadeIn">
                <p className="text-xs sm:text-sm text-amber-300 font-bold bg-amber-500/20 py-2 px-5 rounded-full inline-block border border-amber-400/40 text-center shadow-md animate-pulse">
                  {playfulMessages[clickCount - 1]}
                </p>
              </div>
            )}

            {/* 5th click confirmation banner */}
            {clickCount >= 5 && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-white font-fredoka font-bold text-base sm:text-xl animate-pulse shadow-2xl flex flex-col items-center justify-center space-y-1 mb-4">
                <span>🎉 100% Sireesha Verified! 🎈🎈🎈</span>
                <span className="text-xs sm:text-sm font-medium text-pink-100">Releasing birthday balloons & opening Step 2... 💕</span>
              </div>
            )}

            {/* Button Area */}
            {clickCount === 0 && (
              <div className="min-h-[85px] w-full flex items-center justify-center">
                <button
                  onClick={handleYesClick}
                  className="px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-300 text-white font-fredoka font-extrabold shadow-[0_0_25px_rgba(236,72,153,0.85),0_6px_20px_rgba(0,0,0,0.6)] border-3 sm:border-4 border-white flex items-center justify-center space-x-2 text-base sm:text-xl cursor-pointer hover:scale-105 active:scale-95 transition-all animate-pulse"
                >
                  <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">{buttonLabels[0]}</span>
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-200 shrink-0" />
                </button>
              </div>
            )}

            {clickCount > 0 && clickCount < 5 && (
              <div className="min-h-[75px] w-full flex flex-col items-center justify-center space-y-2 py-3">
                <div className="py-2.5 px-5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-100 font-bold text-xs sm:text-sm animate-pulse flex items-center justify-center space-x-2 shadow-inner">
                  <span>🏃‍♀️💨 Quick! Catch the glowing button moving across your screen!</span>
                </div>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-center space-x-6 text-xs sm:text-sm text-pink-200/70 w-full">
            <button
              onClick={() => setShowPasscodeModal(!showPasscodeModal)}
              className="flex items-center space-x-1.5 hover:text-pink-300 transition-colors"
            >
              <KeyRound className="w-4 h-4 text-pink-400" />
              <span>Secret Passcode?</span>
            </button>
            <span className="flex items-center space-x-1.5">
              <Smile className="w-4 h-4 text-amber-300" />
              <span>Made with love by Shiva Kumar 💖</span>
            </span>
          </div>

          {/* Passcode Modal */}
          {showPasscodeModal && (
            <div className="mt-4 p-4 rounded-2xl bg-slate-900/90 border border-pink-400/40 w-full animate-fadeIn">
              <form onSubmit={handlePasscodeSubmit} className="space-y-3">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter secret code (e.g. 143)"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 text-white border border-pink-500/30 text-center font-bold text-sm focus:outline-none focus:border-pink-400"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-sm shadow-md"
                >
                  Unlock Instantly 🔑
                </button>
              </form>
            </div>
          )}
        </div>
      ) : null}

      <style>{`
        @keyframes blowBalloonsUp {
          0% {
            bottom: -60px;
            opacity: 0.95;
            transform: translateY(0) rotate(0deg);
          }
          50% {
            opacity: 1;
          }
          100% {
            bottom: 115vh;
            opacity: 0;
            transform: translateY(-115vh) rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
