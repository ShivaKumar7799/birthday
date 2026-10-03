import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Lock, Unlock, Key, ArrowRight, Sparkles } from 'lucide-react';
import { CONFIG } from '../data/config';
import { playPop, playWin, startBGM } from '../utils/sound';

const BirthdayDoorIntro = ({ onDoorOpened }) => {
  // Phase 1: 'wish' (Animated Birthday Greeting) -> Phase 2: 'door' (Interactive Door & Lock)
  const [phase, setPhase] = useState('wish');
  const [isLocking, setIsLocking] = useState(false);
  const [isDoorUnlocked, setIsDoorUnlocked] = useState(false);
  const [balloons, setBalloons] = useState([]);

  const handleProceedToDoor = () => {
    playPop();
    startBGM();
    setPhase('door');
  };

  const handleUnlockDoor = () => {
    if (isLocking || isDoorUnlocked) return;
    playWin();
    setIsLocking(true);

    // Create 30 floating helium balloons
    const balloonColors = ['🎈', '💗', '💖', '💜', '🎈', '✨', '👑', '🎉', '🎈'];
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      symbol: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      left: `${3 + Math.random() * 94}%`,
      delay: `${Math.random() * 0.9}s`,
      speed: `${2.6 + Math.random() * 2.2}s`,
      scale: 0.85 + Math.random() * 0.85
    }));

    setBalloons(generated);

    // Confetti explosion
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.6 }
    });

    // Start 3D Door opening swing animation at 400ms
    setTimeout(() => {
      setIsDoorUnlocked(true);
    }, 400);

    // Open steps after doors fully open and reveal the kingdom (2.8s)
    setTimeout(() => {
      onDoorOpened();
    }, 2800);
  };

  return (
    <div className="w-full relative pt-4 pb-8 flex-1 flex flex-col items-center justify-center text-center px-4 overflow-hidden mx-auto">
      
      {/* Floating Balloon Overlay on Door Unlock */}
      {isDoorUnlocked && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {balloons.map((b) => (
            <div
              key={b.id}
              style={{
                left: b.left,
                animation: `floatUpBalloon ${b.speed} ease-out forwards`,
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

      {/* PHASE 1: ANIMATED HAPPY BIRTHDAY GREETING */}
      {phase === 'wish' && (
        <div className="max-w-xl w-full mx-auto glass-card-luxury p-4 sm:p-8 border-2 border-pink-400/40 shadow-2xl animate-float space-y-4 sm:space-y-5 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-300 p-1 shadow-2xl shadow-pink-500/50 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center border border-amber-300/40">
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400 fill-pink-500/60 animate-bounce" />
            </div>
          </div>

          <span className="inline-block px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold bg-pink-500/20 text-pink-200 border border-pink-400/40 shadow-md text-center">
            ✨ Special Celebration For {CONFIG.herName} ✨
          </span>

          {/* Animated Calligraphy Greeting */}
          <h1 className="font-dancing text-5xl sm:text-7xl font-bold text-white glow-text-rose leading-tight animate-pulse-glow text-center">
            Happy Birthday <br />
            <span className="shimmer-text">{CONFIG.herName}! 🎂💖</span>
          </h1>

          <p className="text-pink-100/90 text-xs sm:text-base font-medium max-w-md mx-auto leading-relaxed text-center px-1">
            {CONFIG.subheading}
          </p>

          <div className="pt-2 flex justify-center w-full">
            <button
              onClick={handleProceedToDoor}
              className="px-6 py-3 sm:px-8 sm:py-3.5 rounded-2xl glow-btn-rose text-white font-fredoka font-bold text-sm sm:text-base shadow-2xl flex items-center justify-center space-x-2 mx-auto active:scale-95 transition-transform"
            >
              <span>Unlock Your Birthday Door 🚪✨</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2: THE ROYAL BIRTHDAY DOOR & LOCK BUTTON */}
      {phase === 'door' && (
        <div className="max-w-md w-full mx-auto space-y-4 sm:space-y-5 animate-fadeIn flex flex-col items-center justify-center text-center">
          <div className="text-center space-y-1.5 sm:space-y-2 flex flex-col items-center justify-center">
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs sm:text-sm font-bold border border-pink-500/30 shadow-md">
              <Key className="w-3.5 h-3.5 text-amber-300" />
              <span>The Magical Birthday Door</span>
            </span>
            <h2 className="font-dancing text-4xl sm:text-6xl font-bold text-white glow-text-rose text-center leading-tight">
              Unlock Sireesha's Kingdom 💕
            </h2>
            <p className="text-xs sm:text-base text-pink-100/90 font-medium text-center px-1">
              Tap the golden heart lock on the door to open your surprises! 🔑
            </p>
          </div>

          {/* 3D Animated Door Frame */}
          <div
            style={{ perspective: '1200px' }}
            className="relative w-64 sm:w-80 h-[350px] sm:h-[390px] mx-auto rounded-t-full bg-slate-950 border-4 border-amber-300/80 p-2 shadow-[0_0_40px_rgba(245,158,11,0.5)] overflow-hidden flex items-center justify-center"
          >
            {/* Interior Room (Magical Kingdom Revealed Behind Swinging Doors) */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-300 via-rose-500 to-purple-950 flex flex-col items-center justify-center p-6 text-center z-0">
              <div className="space-y-3 animate-pulse">
                <Sparkles className="w-12 h-12 text-amber-200 mx-auto animate-spin" style={{ animationDuration: '6s' }} />
                <h3 className="font-dancing text-4xl sm:text-5xl font-extrabold text-white glow-text-gold drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                  Welcome Sireesha! 🎉
                </h3>
                <p className="font-fredoka text-amber-100 text-sm sm:text-base font-bold drop-shadow">
                  Your Magical Kingdom is Open! 💕
                </p>
              </div>
            </div>

            {/* Left Door Panel - 3D Swinging Door */}
            <div
              style={{
                transformOrigin: 'left center',
                transform: isDoorUnlocked ? 'perspective(1200px) rotateY(-112deg)' : 'perspective(1200px) rotateY(0deg)',
                transition: 'transform 1.8s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 1.8s ease'
              }}
              className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-br from-pink-900 via-rose-950 to-purple-950 border-r-2 border-amber-400/80 shadow-[inset_0_0_20px_rgba(0,0,0,0.8),5px_0_25px_rgba(0,0,0,0.7)] z-20 flex flex-col justify-around items-end p-4"
            >
              {/* Ornate Door Carvings & Panels */}
              <div className="w-full h-full border border-amber-400/30 rounded-tl-full flex flex-col justify-around items-end p-3">
                <div className="w-8 h-8 rounded-full border-2 border-amber-300/40 bg-pink-950/60 shadow-inner"></div>
                <div className="w-12 h-12 rounded-full border-2 border-amber-300/40 bg-pink-950/60 shadow-inner"></div>
                <div className="w-4 h-12 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 border border-white shadow-md"></div>
              </div>
            </div>

            {/* Right Door Panel - 3D Swinging Door */}
            <div
              style={{
                transformOrigin: 'right center',
                transform: isDoorUnlocked ? 'perspective(1200px) rotateY(112deg)' : 'perspective(1200px) rotateY(0deg)',
                transition: 'transform 1.8s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 1.8s ease'
              }}
              className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-bl from-pink-900 via-rose-950 to-purple-950 border-l-2 border-amber-400/80 shadow-[inset_0_0_20px_rgba(0,0,0,0.8),-5px_0_25px_rgba(0,0,0,0.7)] z-20 flex flex-col justify-around items-start p-4"
            >
              {/* Ornate Door Carvings & Panels */}
              <div className="w-full h-full border border-amber-400/30 rounded-tr-full flex flex-col justify-around items-start p-3">
                <div className="w-8 h-8 rounded-full border-2 border-amber-300/40 bg-pink-950/60 shadow-inner"></div>
                <div className="w-12 h-12 rounded-full border-2 border-amber-300/40 bg-pink-950/60 shadow-inner"></div>
                <div className="w-4 h-12 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 border border-white shadow-md"></div>
              </div>
            </div>

            {/* Centered Golden Heart Lock Button */}
            <div
              style={{
                opacity: isDoorUnlocked ? 0 : 1,
                transform: isDoorUnlocked ? 'scale(1.3)' : 'scale(1)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                pointerEvents: isDoorUnlocked ? 'none' : 'auto'
              }}
              className="z-30 flex flex-col items-center justify-center absolute"
            >
              <button
                onClick={handleUnlockDoor}
                className={`p-5 rounded-full bg-gradient-to-tr from-amber-300 via-amber-400 to-yellow-500 text-slate-950 border-4 border-white shadow-[0_0_35px_rgba(245,158,11,0.95),0_6px_20px_rgba(0,0,0,0.8)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer ${
                  isLocking ? 'animate-spin' : 'animate-bounce'
                }`}
                title="Click to unlock the doors!"
              >
                {isLocking ? (
                  <Unlock className="w-10 h-10 text-slate-950 fill-amber-200" />
                ) : (
                  <Lock className="w-10 h-10 text-slate-950 fill-amber-200" />
                )}
              </button>
              <span className="mt-3 px-4 py-1.5 rounded-full bg-slate-950/90 text-amber-300 text-xs sm:text-sm font-bold border border-amber-300/50 shadow-xl animate-pulse">
                👈 Tap Lock To Open Doors!
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes floatUpBalloon {
          0% {
            bottom: -60px;
            opacity: 0.95;
            transform: translateY(0) rotate(0deg);
          }
          50% {
            opacity: 1;
          }
          100% {
            bottom: 110vh;
            opacity: 0;
            transform: translateY(-100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default BirthdayDoorIntro;
