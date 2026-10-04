import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, ArrowRight } from 'lucide-react';
import { CONFIG } from '../data/config';
import { playPop, playWin } from '../utils/sound';

const LoveLetter = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEnvelope = () => {
    playPop();
    if (!isOpen) {
      playWin();
      confetti({ particleCount: 70, spread: 60 });
    }
    setIsOpen(!isOpen);
  };

  return (
    <section className="glass-card p-4 sm:p-8 rounded-3xl border border-pink-500/30 max-w-2xl mx-auto my-2 text-center relative overflow-hidden flex flex-col items-center justify-center">
      <h2 className="font-dancing text-4xl sm:text-6xl font-bold text-white mb-2 glow-text text-center">
        A Letter For {CONFIG.herName} 💌
      </h2>
      <p className="text-xs sm:text-base text-pink-100/90 mb-4 sm:mb-5 font-medium text-center px-1">
        Tap the heart envelope to unseal the secret letter inside...
      </p>

      {/* Envelope Container */}
      <div className="relative max-w-md w-full mx-auto cursor-pointer" onClick={toggleEnvelope}>
        {!isOpen ? (
          <div className="w-full h-60 sm:h-72 rounded-3xl bg-gradient-to-tr from-pink-600 via-rose-500 to-purple-600 p-1 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center relative overflow-hidden">
            {/* Envelope Flap styling */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 sm:mb-3 border border-white/40 shadow-inner animate-pulse">
                <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-white fill-white" />
              </div>
              <h3 className="font-dancing text-3xl sm:text-5xl font-bold text-white glow-text text-center">
                To My Princess {CONFIG.herName} 👑
              </h3>
              <p className="text-xs sm:text-sm text-pink-100/90 mt-2 font-semibold bg-black/20 px-4 py-1.5 rounded-full text-center">
                Tap to open 💌
              </p>
            </div>
          </div>
        ) : (
          /* Opened Letter Card */
          <div className="w-full rounded-3xl bg-slate-900/90 border-2 border-pink-400/50 p-4 sm:p-8 text-center shadow-2xl animate-fadeIn relative flex flex-col items-center justify-center">
            <div className="flex items-center justify-between border-b border-pink-500/20 pb-3 sm:pb-4 mb-3 sm:mb-4 w-full">
              <span className="font-dancing text-2xl sm:text-3xl font-bold text-pink-300">
                {CONFIG.loveLetter.salutation}
              </span>
              <button
                onClick={toggleEnvelope}
                className="text-xs sm:text-sm text-pink-300 hover:text-white bg-pink-500/20 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full"
              >
                Close Letter ✕
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4 text-xs sm:text-base text-pink-100/90 leading-relaxed font-medium text-center">
              {CONFIG.loveLetter.bodyParagraphs.map((paragraph, idx) => (
                <p key={idx} className="text-center">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-pink-500/20 text-center w-full flex flex-col items-center justify-center">
              <p className="font-sacramento text-3xl text-pink-300 text-center">
                {CONFIG.loveLetter.closing}
              </p>
              <p className="font-dancing text-3xl font-bold text-amber-300 glow-text text-center">
                {CONFIG.loveLetter.signature}
              </p>

              {onComplete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playPop();
                    onComplete();
                  }}
                  className="mt-5 px-6 py-3 rounded-full glow-btn-rose text-white text-xs sm:text-sm font-bold shadow-xl flex items-center justify-center space-x-2 mx-auto"
                >
                  <span>Proceed to Grand Finale 🌟</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoveLetter;
