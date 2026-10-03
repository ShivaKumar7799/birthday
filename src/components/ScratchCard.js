import React, { useRef, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Eye } from 'lucide-react';
import { CONFIG } from '../data/config';
import { playPop, playWin } from '../utils/sound';

const ScratchCard = () => {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Fill top scratch layer with shiny pink gradient & glitter text
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#ec4899');
    grad.addColorStop(0.5, '#be185d');
    grad.addColorStop(1, '#831843');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Overlay text
    ctx.font = 'bold 20px Fredoka, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch Me Here, Sireesha! ✨', width / 2, height / 2);

    ctx.font = '12px Quicksand, sans-serif';
    ctx.fillStyle = '#fbcfe8';
    ctx.fillText('(Drag your finger or mouse across)', width / 2, height / 2 + 25);
  }, []);

  const scratch = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentCount++;
    }

    const percentage = (transparentCount / (pixels.length / 4)) * 100;
    if (percentage > 45 && !isRevealed) {
      setIsRevealed(true);
      playWin();
      confetti({ particleCount: 90, spread: 70 });
    }
  };

  const handlePointerDown = (e) => {
    setIsDrawing(true);
    handlePointerMove(e);
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const handlePointerMove = (e) => {
    if (!isDrawing && e.type !== 'pointerdown') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    scratch(x, y);
  };

  const revealAll = () => {
    playPop();
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setIsRevealed(true);
    playWin();
    confetti({ particleCount: 90, spread: 70 });
  };

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-pink-500/30 max-w-xl mx-auto my-2 text-center flex flex-col items-center justify-center">
      <h2 className="font-fredoka text-2xl sm:text-3xl font-bold text-white mb-2 text-center">
        Magic Scratch Card 🔮
      </h2>
      <p className="text-sm sm:text-base text-pink-100/90 mb-4 text-center">
        Scratch off the sparkling overlay to unlock your secret love message! ✨
      </p>

      {/* Container holding hidden message under canvas */}
      <div className="relative w-full max-w-md h-56 mx-auto rounded-2xl overflow-hidden border-2 border-pink-400/40 shadow-xl bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
        {/* Hidden Message Content */}
        <div className="z-0 space-y-2 flex flex-col items-center justify-center text-center">
          <Sparkles className="w-9 h-9 text-amber-300 mx-auto animate-spin" style={{ animationDuration: '4s' }} />
          <p className="font-dancing text-3xl sm:text-4xl text-pink-300 font-bold glow-text leading-relaxed text-center">
            {CONFIG.scratchCardSecret}
          </p>
        </div>

        {/* Scratchable Canvas overlay */}
        <canvas
          ref={canvasRef}
          width={400}
          height={220}
          onMouseDown={handlePointerDown}
          onMouseUp={handlePointerUp}
          onMouseMove={handlePointerMove}
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUp}
          onTouchMove={handlePointerMove}
          className={`absolute inset-0 z-10 cursor-pointer touch-none transition-opacity duration-700 ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      </div>

      <div className="mt-4 flex items-center justify-center space-x-3 w-full">
        {!isRevealed && (
          <button
            onClick={revealAll}
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 text-sm sm:text-base font-semibold border border-pink-400/30 flex items-center justify-center space-x-2 mx-auto"
          >
            <Eye className="w-4 h-4" />
            <span>Instant Reveal 🪄</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ScratchCard;
