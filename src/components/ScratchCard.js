import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Eye } from 'lucide-react';
import { CONFIG } from '../data/config';
import { playPop, playWin } from '../utils/sound';

const ScratchCard = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const drawCover = useCallback((canvas) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    if (width === 0 || height === 0) return;

    // Shiny pink gradient scratch layer
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#ec4899');
    grad.addColorStop(0.5, '#be185d');
    grad.addColorStop(1, '#831843');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle inner border for luxury card feel
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 3;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    // Responsive font sizing based on actual rendered card width
    const titleSize = Math.max(14, Math.min(20, Math.floor(width / 18)));
    ctx.font = `bold ${titleSize}px Fredoka, sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Scratch Me Here! ✨', width / 2, height / 2 - 12);

    const subSize = Math.max(11, Math.min(13, Math.floor(width / 26)));
    ctx.font = `${subSize}px Quicksand, sans-serif`;
    ctx.fillStyle = '#fbcfe8';
    ctx.fillText('(Drag finger or mouse across)', width / 2, height / 2 + 16);
  }, []);

  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container || isRevealed) return;

      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      canvas.width = Math.floor(rect.width);
      canvas.height = Math.floor(rect.height);
      drawCover(canvas);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [drawCover, isRevealed]);

  const scratch = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    // Scale coordinates accurately between screen display and canvas bitmap
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, Math.max(20, Math.min(30, canvas.width / 13)), 0, Math.PI * 2);
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
    let totalSamples = 0;

    // Sample every 4th pixel for speed and responsiveness
    for (let i = 3; i < pixels.length; i += 16) {
      totalSamples++;
      if (pixels[i] === 0) transparentCount++;
    }

    const percentage = (transparentCount / totalSamples) * 100;
    if (percentage > 38 && !isRevealed) {
      setIsRevealed(true);
      playWin();
      confetti({ particleCount: 100, spread: 80 });
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 2500);
    }
  };

  const handlePointerDown = (e) => {
    setIsDrawing(true);
    const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : null);
    const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : null);
    if (clientX != null && clientY != null) {
      scratch(clientX, clientY);
    }
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const handlePointerMove = (e) => {
    if (!isDrawing && e.type !== 'pointerdown') return;
    const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : null);
    const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : null);
    if (clientX != null && clientY != null) {
      scratch(clientX, clientY);
    }
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
    confetti({ particleCount: 100, spread: 80 });
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 2500);
  };

  return (
    <div className="glass-card p-4 sm:p-7 rounded-3xl border border-pink-500/30 max-w-xl w-full mx-auto my-2 text-center flex flex-col items-center justify-center">
      <h2 className="font-fredoka text-xl sm:text-3xl font-bold text-white mb-1.5 text-center">
        Magic Scratch Card 🔮
      </h2>
      <p className="text-xs sm:text-sm text-pink-100/90 mb-3 text-center px-2">
        Scratch off the sparkling overlay to unlock your secret love message! ✨
      </p>

      {/* Container holding hidden message under canvas */}
      <div
        ref={containerRef}
        className="relative w-full max-w-md min-h-[190px] sm:min-h-[220px] mx-auto rounded-2xl overflow-hidden border-2 border-pink-400/40 shadow-xl bg-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 text-center select-none"
      >
        {/* Hidden Message Content */}
        <div className="z-0 space-y-2 flex flex-col items-center justify-center text-center w-full px-2">
          <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-amber-300 mx-auto animate-spin shrink-0" style={{ animationDuration: '4s' }} />
          <p className="font-dancing text-xl sm:text-2xl md:text-3xl text-pink-200 font-bold glow-text leading-snug sm:leading-relaxed text-center">
            {CONFIG.scratchCardSecret}
          </p>
        </div>

        {/* Scratchable Canvas overlay */}
        <canvas
          ref={canvasRef}
          onMouseDown={handlePointerDown}
          onMouseUp={handlePointerUp}
          onMouseMove={handlePointerMove}
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUp}
          onTouchMove={handlePointerMove}
          className={`absolute inset-0 w-full h-full z-10 cursor-pointer touch-none transition-opacity duration-700 ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      </div>

      <div className="mt-3.5 flex flex-col items-center justify-center space-y-2 w-full">
        {!isRevealed ? (
          <button
            onClick={revealAll}
            className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 text-xs sm:text-base font-semibold border border-pink-400/30 flex items-center justify-center space-x-2 mx-auto active:scale-95 transition-transform"
          >
            <Eye className="w-4 h-4" />
            <span>Instant Reveal 🪄</span>
          </button>
        ) : (
          <p className="text-xs sm:text-sm text-amber-200 font-bold animate-pulse px-2">
            ✨ Message Unlocked! Moving to Birthday Cake in 2s... 🎂
          </p>
        )}
      </div>
    </div>
  );
};

export default ScratchCard;
