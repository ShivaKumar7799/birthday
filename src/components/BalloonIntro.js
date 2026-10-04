import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ArrowDown, ArrowUp } from 'lucide-react';
import { CONFIG } from '../data/config';
import { playWin, startBGM } from '../utils/sound';

const BalloonIntro = ({ onStartJourney }) => {
  const [hasScrolledBottom, setHasScrolledBottom] = useState(false);
  const [isBalloonsBlowing, setIsBalloonsBlowing] = useState(false);
  const [balloons, setBalloons] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // User reached near bottom
      if (scrollY + windowHeight >= docHeight - 100) {
        setHasScrolledBottom(true);
      }

      // User scrolled back up near top after visiting bottom -> Auto launch balloons!
      if (hasScrolledBottom && scrollY < 120 && !isBalloonsBlowing) {
        triggerBalloonRelease();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasScrolledBottom]);

  const triggerBalloonRelease = () => {
    if (isBalloonsBlowing) return;
    playWin();
    startBGM();
    setIsBalloonsBlowing(true);

    // Create 30 colorful helium balloons with random colors and positions
    const balloonColors = ['🎈', '💗', '💖', '💜', '🎈', '✨', '👑', '🌸', '🎈'];
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      symbol: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      left: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 1.5}s`,
      speed: `${3 + Math.random() * 3}s`,
      scale: 0.8 + Math.random() * 0.8
    }));

    setBalloons(generated);

    // Launch level confetti
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.8 }
    });

    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // After balloon animation finishes (3.5s), start the steps!
    setTimeout(() => {
      onStartJourney();
    }, 3200);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-between text-center px-4 py-8">
      
      {/* Floating Balloon Overlay when triggered */}
      {isBalloonsBlowing && (
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

      {/* Top Welcome Teaser Header */}
      <div className="max-w-xl mx-auto space-y-4 my-auto animate-float">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-300 p-1 shadow-2xl shadow-pink-500/50 flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center border border-amber-300/40">
            <Heart className="w-12 h-12 text-pink-400 fill-pink-500/60 animate-pulse" />
          </div>
        </div>

        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-pink-500/20 text-pink-200 border border-pink-400/40 shadow-md">
          ✨ Special Surprise For {CONFIG.herName} ✨
        </span>

        <h1 className="font-dancing text-5xl sm:text-7xl font-bold text-white glow-text-rose leading-tight">
          Welcome, {CONFIG.herNickname}! 💕
        </h1>

        <p className="text-pink-100/90 text-sm sm:text-base font-medium max-w-md mx-auto leading-relaxed">
          {CONFIG.subheading}
        </p>

        {/* Scroll Instruction Box */}
        <div className="glass-card-luxury p-6 rounded-3xl border-2 border-pink-400/40 max-w-md mx-auto space-y-3 mt-6 shadow-2xl">
          <p className="text-xs sm:text-sm text-pink-200 font-semibold flex items-center justify-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>How to unlock your surprises:</span>
          </p>

          <div className="space-y-2 text-xs text-pink-100/90 font-medium">
            <div className="flex items-center space-x-2 bg-slate-900/60 p-2.5 rounded-xl border border-pink-500/20">
              <span className="w-6 h-6 rounded-full bg-pink-500 text-white font-bold flex items-center justify-center shrink-0">1</span>
              <span>Scroll down to the bottom to read love notes 👇</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-900/60 p-2.5 rounded-xl border border-pink-500/20">
              <span className="w-6 h-6 rounded-full bg-purple-500 text-white font-bold flex items-center justify-center shrink-0">2</span>
              <span>Scroll back up to the top 👆</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-900/60 p-2.5 rounded-xl border border-pink-500/20">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0">3</span>
              <span>Watch the balloons blow & launch your surprises! 🎈</span>
            </div>
          </div>

          {/* Trigger Button */}
          <div className="pt-2">
            <button
              onClick={triggerBalloonRelease}
              className="w-full py-3.5 rounded-2xl glow-btn-rose text-white font-fredoka font-bold text-sm shadow-2xl flex items-center justify-center space-x-2"
            >
              <span>Blow Balloons & Start Surprises! 🎈✨</span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator Arrow */}
        <div className="pt-6 animate-bounce text-pink-300 flex flex-col items-center text-xs font-bold">
          <span>Scroll Down 👇</span>
          <ArrowDown className="w-5 h-5 mt-1" />
        </div>
      </div>

      {/* Middle Teaser Cards when Sireesha scrolls down */}
      <div className="max-w-md mx-auto space-y-6 my-16">
        <div className="glass-card p-6 rounded-3xl border border-pink-500/30 text-center space-y-2 flex flex-col items-center justify-center">
          <span className="text-2xl">💖</span>
          <h3 className="font-fredoka text-lg font-bold text-pink-300 text-center">Are You Ready, {CONFIG.herName}?</h3>
          <p className="text-xs text-pink-100/90 leading-relaxed font-medium text-center">
            Seven magical levels of minigames, puzzles, birthday cake, and love letters are waiting for you!
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-purple-500/30 text-center space-y-2 flex flex-col items-center justify-center">
          <span className="text-2xl">👑</span>
          <h3 className="font-fredoka text-lg font-bold text-purple-300 text-center">Made With All My Heart</h3>
          <p className="text-xs text-pink-100/90 leading-relaxed font-medium text-center">
            Every single line of code and animation was created to make you smile today!
          </p>
        </div>

        {/* Bottom Scroll Target & Scroll Back Up Prompt */}
        <div className="p-6 rounded-3xl bg-pink-950/60 border-2 border-pink-400/50 text-center space-y-3">
          <span className="text-3xl">🎉</span>
          <h3 className="font-dancing text-3xl font-bold text-white glow-text-rose">
            You Reached The Bottom!
          </h3>
          <p className="text-xs text-pink-100">
            Now scroll back up to the top (or tap the button below) to blow the balloons and begin! 🎈
          </p>
          <button
            onClick={triggerBalloonRelease}
            className="px-6 py-3 rounded-2xl glow-btn-gold text-slate-950 font-fredoka font-bold text-xs shadow-xl flex items-center justify-center space-x-2 mx-auto"
          >
            <ArrowUp className="w-4 h-4 text-slate-950" />
            <span>Scroll To Top & Blow Balloons! 🎈</span>
          </button>
        </div>
      </div>

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

export default BalloonIntro;
