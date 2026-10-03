import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { CONFIG } from '../data/config';

const Footer = () => {
  return (
    <footer className="py-8 px-4 text-center border-t border-pink-500/20 bg-slate-950/80 backdrop-blur-md relative z-10">
      <div className="max-w-xl mx-auto space-y-3">
        <div className="flex items-center justify-center space-x-2 text-pink-400">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <Heart className="w-5 h-5 fill-pink-500 text-pink-500 animate-pulse" />
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>

        <h3 className="font-dancing text-3xl font-bold text-white glow-text">
          Forever & Always For {CONFIG.herName} 💕
        </h3>

        <p className="text-xs text-pink-200/70 max-w-sm mx-auto font-medium">
          Crafted with endless love, laughter, and magical surprises just for you.
        </p>

        <p className="text-[11px] text-pink-400/50 pt-2">
          © {new Date().getFullYear()} • Special Surprise Edition
        </p>
      </div>
    </footer>
  );
};

export default Footer;
