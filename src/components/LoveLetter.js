import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Heart } from 'lucide-react';
import { CONFIG } from '../data/config';
import { playPop, playWin } from '../utils/sound';

const LoveLetter = () => {
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
    <section className="glass-card p-6 sm:p-10 rounded-3xl border border-pink-500/30 max-w-2xl mx-auto my-12 text-center relative overflow-hidden">
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold mb-3 border border-rose-500/30">
        <Mail className="w-3.5 h-3.5 text-pink-300" />
        <span>Secret Love Letter 💌</span>
      </div>

      <h2 className="font-dancing text-4xl sm:text-5xl font-bold text-white mb-2 glow-text">
        A Letter For Sireesha 💕
      </h2>
      <p className="text-xs sm:text-sm text-pink-100/90 mb-8 font-medium">
        Tap the heart envelope to unseal the secret letter inside...
      </p>

      {/* Envelope Container */}
      <div className="relative max-w-md mx-auto cursor-pointer" onClick={toggleEnvelope}>
        {!isOpen ? (
          <div className="w-full h-64 rounded-3xl bg-gradient-to-tr from-pink-600 via-rose-500 to-purple-600 p-1 shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center relative overflow-hidden">
            {/* Envelope Flap styling */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 border border-white/40 shadow-inner animate-pulse">
                <Heart className="w-10 h-10 text-white fill-white" />
              </div>
              <h3 className="font-dancing text-3xl font-bold text-white glow-text">
                To My Princess Sireesha 👑
              </h3>
              <p className="text-xs text-pink-100/80 mt-2 font-semibold bg-black/20 px-4 py-1 rounded-full">
                Tap to open 💌
              </p>
            </div>
          </div>
        ) : (
          /* Opened Letter Card */
          <div className="w-full rounded-3xl bg-slate-900/90 border-2 border-pink-400/50 p-6 sm:p-8 text-left shadow-2xl animate-fadeIn relative">
            <div className="flex items-center justify-between border-b border-pink-500/20 pb-4 mb-4">
              <span className="font-dancing text-2xl font-bold text-pink-300">
                {CONFIG.loveLetter.salutation}
              </span>
              <button
                onClick={toggleEnvelope}
                className="text-xs text-pink-300 hover:text-white bg-pink-500/20 px-3 py-1 rounded-full"
              >
                Close Letter ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-pink-100/90 leading-relaxed font-medium">
              {CONFIG.loveLetter.bodyParagraphs.map((paragraph, idx) => (
                <p key={idx} className="indent-4">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-pink-500/20 text-right">
              <p className="font-sacramento text-2xl text-pink-300">
                {CONFIG.loveLetter.closing}
              </p>
              <p className="font-dancing text-2xl font-bold text-amber-300 glow-text">
                {CONFIG.loveLetter.signature}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoveLetter;
