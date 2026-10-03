import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Lock, Unlock, Key, ArrowRight } from 'lucide-react';
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

    // Create 25 floating helium balloons
    const balloonColors = ['🎈', '💗', '💖', '💜', '🎈', '✨', '👑', '🌸'];
    const generated = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      symbol: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      left: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 1.2}s`,
      speed: `${3 + Math.random() * 2.5}s`,
      scale: 0.8 + Math.random() * 0.7
    }));

    setBalloons(generated);

    // Confetti explosion
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.6 }
    });

    // Animate door unlocking after lock animation (0.6s)
    setTimeout(() => {
      setIsDoorUnlocked(true);
    }, 600);

    // Open steps after door opens (2.2s)
    setTimeout(() => {
      onDoorOpened();
    }, 2200);
  };

  return (
    <div className="relative pt-4 pb-8 flex flex-col items-center justify-start text-center px-4 overflow-hidden">
      
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
              className="absolute text-5xl sm:text-6xl drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]"
            >
              {b.symbol}
            </div>
          ))}
        </div>
      )}

      {/* PHASE 1: ANIMATED HAPPY BIRTHDAY GREETING */}
      {phase === 'wish' && (
        <div className="max-w-xl w-full glass-card-luxury p-8 sm:p-12 border-2 border-pink-400/40 shadow-2xl animate-float space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-300 p-1 shadow-2xl shadow-pink-500/50 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center border border-amber-300/40">
              <Heart className="w-12 h-12 text-pink-400 fill-pink-500/60 animate-bounce" />
            </div>
          </div>

          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-pink-500/20 text-pink-200 border border-pink-400/40 shadow-md">
            ✨ Special Celebration For {CONFIG.herName} ✨
          </span>

          {/* Animated Calligraphy Greeting */}
          <h1 className="font-dancing text-6xl sm:text-7xl font-bold text-white glow-text-rose leading-tight animate-pulse-glow">
            Happy Birthday <br />
            <span className="shimmer-text">{CONFIG.herName}! 🎂💖</span>
          </h1>

          <p className="text-pink-100/90 text-sm sm:text-base font-medium max-w-md mx-auto leading-relaxed">
            {CONFIG.subheading}
          </p>

          <div className="pt-4">
            <button
              onClick={handleProceedToDoor}
              className="px-8 py-4 rounded-2xl glow-btn-rose text-white font-fredoka font-bold text-sm shadow-2xl flex items-center justify-center space-x-2 mx-auto"
            >
              <span>Unlock Your Birthday Door 🚪✨</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2: THE ROYAL BIRTHDAY DOOR & LOCK BUTTON */}
      {phase === 'door' && (
        <div className="max-w-md w-full space-y-6 animate-fadeIn">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center space-x-1 px-4 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-500/30">
              <Key className="w-3.5 h-3.5 text-amber-300" />
              <span>The Magical Birthday Door</span>
            </span>
            <h2 className="font-dancing text-4xl sm:text-5xl font-bold text-white glow-text-rose">
              Unlock Sireesha's Kingdom 💕
            </h2>
            <p className="text-xs sm:text-sm text-pink-100/80 font-medium">
              Tap the golden heart lock on the door to open your surprises! 🔑
            </p>
          </div>

          {/* 3D Graphic Door Frame */}
          <div className="relative w-72 sm:w-80 h-96 mx-auto rounded-t-full bg-gradient-to-b from-purple-900 via-slate-900 to-pink-950 border-4 border-amber-300/70 p-4 shadow-2xl overflow-hidden flex items-center justify-center">
            
            {/* Bright Light Rays when door is opened */}
            {isDoorUnlocked && (
              <div className="absolute inset-0 bg-gradient-to-t from-amber-300 via-pink-400 to-white animate-pulse z-20 flex items-center justify-center">
                <span className="font-dancing text-4xl font-bold text-slate-950 glow-text-gold animate-bounce">
                  Welcome Sireesha! 🎉
                </span>
              </div>
            )}

            {/* Left Door Panel */}
            <div
              className={`absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-br from-pink-800 via-rose-900 to-purple-950 border-r-2 border-amber-300/60 shadow-2xl transition-transform duration-1000 ${
                isDoorUnlocked ? '-translate-x-full' : 'translate-x-0'
              }`}
            >
              <div className="w-full h-full p-4 flex flex-col justify-around items-end opacity-40">
                <div className="w-8 h-8 rounded-full border border-amber-300/40"></div>
                <div className="w-12 h-12 rounded-full border border-amber-300/40"></div>
              </div>
            </div>

            {/* Right Door Panel */}
            <div
              className={`absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-bl from-pink-800 via-rose-900 to-purple-950 border-l-2 border-amber-300/60 shadow-2xl transition-transform duration-1000 ${
                isDoorUnlocked ? 'translate-x-full' : 'translate-x-0'
              }`}
            >
              <div className="w-full h-full p-4 flex flex-col justify-around items-start opacity-40">
                <div className="w-8 h-8 rounded-full border border-amber-300/40"></div>
                <div className="w-12 h-12 rounded-full border border-amber-300/40"></div>
              </div>
            </div>

            {/* Centered Golden Heart Lock Button */}
            {!isDoorUnlocked && (
              <div className="z-30 flex flex-col items-center">
                <button
                  onClick={handleUnlockDoor}
                  className={`p-5 rounded-full bg-gradient-to-tr from-amber-300 via-amber-400 to-yellow-500 text-slate-950 border-4 border-white shadow-[0_0_30px_rgba(245,158,11,0.9)] hover:scale-110 active:scale-95 transition-all duration-300 ${
                    isLocking ? 'animate-spin' : 'animate-bounce'
                  }`}
                  title="Click to unlock the door!"
                >
                  {isLocking ? (
                    <Unlock className="w-10 h-10 text-slate-950 fill-amber-200" />
                  ) : (
                    <Lock className="w-10 h-10 text-slate-950 fill-amber-200" />
                  )}
                </button>
                <span className="mt-3 px-4 py-1.5 rounded-full bg-slate-950/80 text-amber-300 text-xs font-bold border border-amber-300/40 shadow-lg animate-pulse">
                  👈 Tap Lock To Open Door!
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes floatUpBalloon {
          0% {
            bottom: -60px;
            opacity: 0.9;
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
