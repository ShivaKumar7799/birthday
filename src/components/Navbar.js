import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';
import { toggleBGM, toggleMute, playPop, getIsBgmPlaying, subscribeBGM } from '../utils/sound';

const Navbar = ({ activeSection, setActiveSection }) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(getIsBgmPlaying());
  const [isMutedState, setIsMutedState] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeBGM((playing) => {
      setIsPlayingMusic(playing);
    });
    return unsubscribe;
  }, []);

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
    <header className="sticky top-0 z-50 w-full px-4 py-3 bg-slate-900/70 backdrop-blur-md border-b border-pink-500/20">
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => { playPop(); setActiveSection('home'); }}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-lg animate-pulse">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <span className="font-dancing text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 glow-text">
            Sireesha 💕
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Audio BGM Button */}
          <button
            onClick={handleMusicToggle}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all ${
              isPlayingMusic 
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/40 animate-pulse' 
                : 'bg-white/10 text-pink-200 hover:bg-white/20'
            }`}
            title="Toggle Birthday Song"
          >
            <Music className="w-4 h-4" />
            <span className="hidden sm:inline">{isPlayingMusic ? 'Birthday Song 🎂🎵' : 'Play Song 🎶'}</span>
          </button>

          {/* Sound FX Mute Button */}
          <button
            onClick={handleMuteToggle}
            className={`p-2.5 rounded-full text-xs sm:text-sm transition-all ${
              isMutedState 
                ? 'bg-red-500/20 text-red-300 border border-red-500/40' 
                : 'bg-white/10 text-pink-200 hover:bg-white/20'
            }`}
            title="Mute Sound Effects"
          >
            {isMutedState ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
