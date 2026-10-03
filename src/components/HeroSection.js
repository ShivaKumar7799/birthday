import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, KeyRound, Smile } from 'lucide-react';
import { CONFIG } from '../data/config';
import { playPop, playWin, startBGM } from '../utils/sound';

const HeroSection = ({ onUnlock, isUnlocked }) => {
  const [noPos, setNoPos] = useState({ top: '0px', left: '0px' });
  const [isNoMoved, setIsNoMoved] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [passcode, setPasscode] = useState('');
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);

  const playfulMessages = [
    "Nice try! But you are Sireesha! 😉",
    "Hey! Stop running away from love! 💕",
    "Error 404: 'No' button is broken for Sireesha! 😜",
    "Are you sure? Take a second look! ✨",
    "Press YES! You know you want to! 🥰"
  ];

  const moveNoButton = () => {
    playPop();
    const randomY = Math.floor(Math.random() * 200) - 100;
    const randomX = Math.floor(Math.random() * 200) - 100;
    setNoPos({ top: `${randomY}px`, left: `${randomX}px` });
    setIsNoMoved(true);
    setNoCount((prev) => (prev + 1) % playfulMessages.length);
  };

  const handleYes = () => {
    playWin();
    startBGM();
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 }
    });
    onUnlock();
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
    <section className="pt-1 pb-4 flex flex-col items-center justify-center text-center px-4 relative">
      {!isUnlocked ? (
        <div className="max-w-lg w-full glass-card-luxury p-6 sm:p-10 relative overflow-hidden animate-float border-2 border-pink-400/40 shadow-2xl flex flex-col items-center justify-center text-center">
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
              <span>Identity Check</span>
            </h3>
            <p className="text-sm sm:text-base text-pink-100/90 mb-5 leading-relaxed text-center">
              Are you the most gorgeous and sweetest girl named <strong className="text-pink-300 font-bold">{CONFIG.herName}</strong>?
            </p>

            {isNoMoved && (
              <p className="text-xs sm:text-sm text-amber-300 font-semibold mb-4 animate-pulse bg-amber-500/20 py-1.5 px-4 rounded-full inline-block border border-amber-400/30 text-center">
                {playfulMessages[noCount]}
              </p>
            )}

            <div className="flex items-center justify-center space-x-4 relative min-h-[55px] w-full">
              {/* YES Button */}
              <button
                onClick={handleYes}
                className="px-8 py-4 rounded-2xl glow-btn-rose text-white font-fredoka font-bold shadow-2xl flex items-center justify-center space-x-2 text-base sm:text-lg shrink-0"
              >
                <span>YES, I am Sireesha! 🥰</span>
                <Sparkles className="w-5 h-5 text-amber-200" />
              </button>

              {/* Playful Runaway NO Button */}
              <button
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                onClick={moveNoButton}
                style={{
                  position: isNoMoved ? 'relative' : 'static',
                  top: noPos.top,
                  left: noPos.left,
                  transition: 'all 0.2s ease'
                }}
                className="px-5 py-3.5 rounded-2xl bg-slate-900/90 text-pink-300 hover:bg-slate-800 border border-pink-500/30 text-sm font-semibold"
              >
                No, wrong person 🙈
              </button>
            </div>
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
              <span>Made for Sireesha 💖</span>
            </span>
          </div>

          {/* Passcode Modal / Form */}
          {showPasscodeModal && (
            <form onSubmit={handlePasscodeSubmit} className="mt-4 p-3 bg-pink-950/60 rounded-2xl border border-pink-500/30 flex items-center justify-center space-x-2 animate-fadeIn w-full">
              <input
                type="password"
                placeholder="Enter secret passcode..."
                value={passcode}
                onChange={(e) => { setPasscode(e.target.value); }}
                className="w-full bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm outline-none border border-pink-500/30 focus:border-pink-400 text-center"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-pink-600 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-pink-500 shrink-0"
              >
                Unlock
              </button>
            </form>
          )}
        </div>
      ) : (
        /* Unlocked Hero Banner */
        <div className="max-w-2xl w-full text-center space-y-6 animate-fadeIn flex flex-col items-center justify-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-400/40 text-pink-200 text-sm sm:text-base font-bold shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Welcome, My Princess Sireesha! 👑</span>
          </div>

          <h1 className="font-dancing text-6xl sm:text-7xl font-bold text-white glow-text-rose leading-tight text-center">
            Happy Celebration Day! 💕
          </h1>

          <p className="text-pink-100/90 text-base sm:text-lg max-w-lg mx-auto font-medium leading-relaxed text-center">
            I built this interactive romantic storybook experience for you. Complete each level step-by-step to reveal all your surprises! ✨
          </p>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
