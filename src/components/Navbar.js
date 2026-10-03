import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';
import { toggleBGM, toggleMute, playPop } from '../utils/sound';

const Navbar = ({ activeSection, setActiveSection }) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMutedState, setIsMutedState] = useState(false);

  const handleMusicToggle = () => {
    playPop();
    const playing = toggleBGM();
    setIsPlayingMusic(playing);
  };

  const handleMuteToggle = () => {
    const muted = toggleMute();
    setIsMutedState(muted);
  };

  return (
    <header className="sticky top-0 z-50 px-4 py-3 bg-slate-900/60 backdrop-blur-md border-b border-pink-500/20">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => { playPop(); setActiveSection('home'); }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-lg animate-pulse">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <span className="font-dancing text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 glow-text">
            Sireesha 💕
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Audio BGM Button */}
          <button
            onClick={handleMusicToggle}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              isPlayingMusic 
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/40 animate-pulse' 
                : 'bg-white/10 text-pink-200 hover:bg-white/20'
            }`}
            title="Toggle Romantic BGM"
          >
            <Music className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isPlayingMusic ? 'Music ON 🎵' : 'Music OFF'}</span>
          </button>

          {/* Sound FX Mute Button */}
          <button
            onClick={handleMuteToggle}
            className={`p-2 rounded-full text-xs transition-all ${
              isMutedState 
                ? 'bg-red-500/20 text-red-300 border border-red-500/40' 
                : 'bg-white/10 text-pink-200 hover:bg-white/20'
            }`}
            title="Mute Sound Effects"
          >
            {isMutedState ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
