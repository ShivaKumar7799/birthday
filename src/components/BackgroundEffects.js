import React, { useMemo } from 'react';

const BackgroundEffects = () => {
  const hearts = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${14 + Math.random() * 20}px`,
      duration: `${6 + Math.random() * 8}s`,
      delay: `${Math.random() * 4}s`,
      opacity: 0.3 + Math.random() * 0.4,
      symbol: ['💖', '✨', '💕', '🌸', '👑'][Math.floor(Math.random() * 5)]
    }));
  }, []);

  // Continuous Floating Balloons!
  const balloons = useMemo(() => {
    const balloonSymbols = ['🎈', '💗', '💖', '💜', '🎈', '👑', '✨', '🎈'];
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${3 + Math.random() * 94}%`,
      size: `${28 + Math.random() * 24}px`,
      duration: `${7 + Math.random() * 8}s`,
      delay: `${Math.random() * 6}s`,
      symbol: balloonSymbols[Math.floor(Math.random() * balloonSymbols.length)]
    }));
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${2 + Math.random() * 4}px`,
      duration: `${1.5 + Math.random() * 3}s`,
      delay: `${Math.random() * 2}s`
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Ambient gradient glowing lights */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      {/* Twinkling Stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute bg-white rounded-full animate-sparkle"
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

      {/* Continuously Floating Balloons 🎈 */}
      {balloons.map((b) => (
        <div
          key={b.id}
          className="absolute drop-shadow-[0_0_12px_rgba(236,72,153,0.7)]"
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

      {/* Floating Hearts & Sparkles */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute text-pink-300"
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
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-105vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes floatUpBalloonContinuous {
          0% {
            transform: translateY(0) rotate(-5deg);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-55vh) rotate(5deg);
            opacity: 0.95;
          }
          100% {
            transform: translateY(-110vh) rotate(-5deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default BackgroundEffects;
