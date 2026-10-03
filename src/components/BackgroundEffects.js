import React, { useMemo } from 'react';

const BackgroundEffects = () => {
  const hearts = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      // Keep on the outer left or right margins so content is never blocked
      left: i % 2 === 0 ? `${2 + Math.random() * 12}%` : `${86 + Math.random() * 11}%`,
      size: `${14 + Math.random() * 16}px`,
      duration: `${8 + Math.random() * 8}s`,
      delay: `${Math.random() * 5}s`,
      opacity: 0.15 + Math.random() * 0.2,
      symbol: ['💖', '✨', '💕', '🌸'][Math.floor(Math.random() * 4)]
    }));
  }, []);

  // Subtle floating balloons restricted to the sides
  const balloons = useMemo(() => {
    const balloonSymbols = ['🎈', '💗', '💖', '💜'];
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      // Confine balloons to edges (<14% or >86%) so they never block cards/content
      left: i % 2 === 0 ? `${1 + Math.random() * 12}%` : `${87 + Math.random() * 11}%`,
      size: `${24 + Math.random() * 16}px`,
      duration: `${9 + Math.random() * 7}s`,
      delay: `${Math.random() * 6}s`,
      symbol: balloonSymbols[Math.floor(Math.random() * balloonSymbols.length)]
    }));
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${2 + Math.random() * 3}px`,
      duration: `${2 + Math.random() * 3}s`,
      delay: `${Math.random() * 2}s`
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft, non-intrusive ambient gradient glowing lights */}
      <div className="absolute top-1/4 left-5 w-60 h-60 bg-pink-500/8 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-5 w-72 h-72 bg-purple-600/8 rounded-full blur-3xl pointer-events-none"></div>

      {/* Twinkling Stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute bg-white/70 rounded-full animate-sparkle"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDuration: s.duration,
            animationDelay: s.delay
          }}
        />
      ))}

      {/* Edge-Floating Balloons 🎈 */}
      {balloons.map((b) => (
        <div
          key={b.id}
          className="absolute opacity-30 drop-shadow-[0_0_8px_rgba(236,72,153,0.3)] pointer-events-none"
          style={{
            left: b.left,
            bottom: '-60px',
            fontSize: b.size,
            animation: `floatUpBalloonContinuous ${b.duration} linear infinite`,
            animationDelay: b.delay
          }}
        >
          {b.symbol}
        </div>
      ))}

      {/* Edge-Floating Hearts */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute text-pink-300 pointer-events-none"
          style={{
            left: h.left,
            bottom: '-40px',
            fontSize: h.size,
            opacity: h.opacity,
            animation: `floatUp ${h.duration} linear infinite`,
            animationDelay: h.delay
          }}
        >
          {h.symbol}
        </div>
      ))}

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.35;
          }
          90% {
            opacity: 0.35;
          }
          100% {
            transform: translateY(-105vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes floatUpBalloonContinuous {
          0% {
            transform: translateY(0) rotate(-4deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-55vh) rotate(4deg);
            opacity: 0.45;
          }
          100% {
            transform: translateY(-110vh) rotate(-4deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default BackgroundEffects;
