import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { CONFIG } from '../data/config';

const Footer = () => {
  return (
    <footer className="w-full py-8 px-4 text-center flex flex-col items-center justify-center border-t border-pink-500/20 bg-slate-950/80 backdrop-blur-md relative z-10">
      <div className="max-w-xl w-full mx-auto space-y-3 flex flex-col items-center text-center">
        <div className="flex items-center justify-center space-x-2 text-pink-400">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <Heart className="w-6 h-6 fill-pink-500 text-pink-500 animate-pulse" />
          <Sparkles className="w-5 h-5 text-amber-300" />
        </div>

        <h3 className="font-dancing text-4xl sm:text-5xl font-bold text-white glow-text text-center">
          Forever & Always For {CONFIG.herName} 💕
        </h3>

        <p className="text-sm sm:text-base text-pink-200/80 max-w-md mx-auto font-medium text-center">
          Crafted with endless love, laughter, and magical surprises just for you.
        </p>

        <p className="text-xs text-pink-400/60 pt-2 text-center">
          © {new Date().getFullYear()} • Special Surprise Edition
        </p>
      </div>
    </footer>
  );
};

export default Footer;
