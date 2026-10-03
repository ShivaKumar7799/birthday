import React, { useState, useEffect } from 'react';
import BackgroundEffects from './components/BackgroundEffects';
import Navbar from './components/Navbar';
import BirthdayDoorIntro from './components/BirthdayDoorIntro';
import HeroSection from './components/HeroSection';
import MemoryMatchGame from './components/MemoryMatchGame';
import LoveQuiz from './components/LoveQuiz';
import ScratchCard from './components/ScratchCard';
import InteractiveCake from './components/InteractiveCake';
import LoveLetter from './components/LoveLetter';
import PhotoGallery from './components/PhotoGallery';
import ReasonGenerator from './components/ReasonGenerator';
import HeartCatcherGame from './components/HeartCatcherGame';
import RunawayButtonGame from './components/RunawayButtonGame';
import LanternWish from './components/LanternWish';
import Footer from './components/Footer';
import { Heart } from 'lucide-react';
import { playPop, playWin, startBGM } from './utils/sound';

function App() {
  // Flag to track whether the door has been unlocked
  const [isDoorOpened, setIsDoorOpened] = useState(false);

  // Directly play the birthday song on page load / first touch anywhere
  useEffect(() => {
    // Attempt direct play immediately
    startBGM();

    // In case browser requires a user gesture first, trigger immediately on first touch/tap/click anywhere
    const playDirectly = () => {
      startBGM();
      window.removeEventListener('click', playDirectly);
      window.removeEventListener('touchstart', playDirectly);
      window.removeEventListener('pointerdown', playDirectly);
      window.removeEventListener('keydown', playDirectly);
    };

    window.addEventListener('click', playDirectly, { passive: true });
    window.addEventListener('touchstart', playDirectly, { passive: true });
    window.addEventListener('pointerdown', playDirectly, { passive: true });
    window.addEventListener('keydown', playDirectly, { passive: true });

    return () => {
      window.removeEventListener('click', playDirectly);
      window.removeEventListener('touchstart', playDirectly);
      window.removeEventListener('pointerdown', playDirectly);
      window.removeEventListener('keydown', playDirectly);
    };
  }, []);

  // Current active step index (1 to 7) - Only ONE step rendered at a time!
  const [currentStep, setCurrentStep] = useState(1);
  // Highest unlocked step so far
  const [maxUnlockedStep, setMaxUnlockedStep] = useState(1);

  const handleDoorOpened = () => {
    setIsDoorOpened(true);
    setCurrentStep(1);
    setMaxUnlockedStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextStep = () => {
    playWin();
    const next = currentStep + 1;
    if (next <= 7) {
      setCurrentStep(next);
      if (next > maxUnlockedStep) {
        setMaxUnlockedStep(next);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const jumpToStep = (stepId) => {
    playPop();
    setCurrentStep(stepId);
    if (stepId > maxUnlockedStep) {
      setMaxUnlockedStep(stepId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stepsList = [
    { id: 1, name: "Doorway of Love", icon: "🔑" },
    { id: 2, name: "Memory Puzzle", icon: "🧩" },
    { id: 3, name: "Love Quiz", icon: "❓" },
    { id: 4, name: "Scratch Card", icon: "🔮" },
    { id: 5, name: "Birthday Cake", icon: "🎂" },
    { id: 6, name: "Love Letter", icon: "💌" },
    { id: 7, name: "Sky Wish Lanterns", icon: "🌟" }
  ];

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-between selection:bg-pink-500 selection:text-white">
      {/* Background Floating Hearts & Twinkling Stars */}
      <BackgroundEffects />

      {/* Header / Sound Controls */}
      <Navbar activeSection="home" setActiveSection={() => {}} />

      {/* Intro Phase: Happy Birthday Greeting -> Interactive Door Lock */}
      {!isDoorOpened ? (
        <main className="w-full flex-grow flex flex-col justify-center items-center text-center">
          <BirthdayDoorIntro onDoorOpened={handleDoorOpened} />
        </main>
      ) : (
        <>
          {/* Fixed Navigation Header - Only Step Icons */}
          <div className="sticky top-[57px] sm:top-[61px] z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-pink-500/20 py-2.5 px-3 shadow-xl">
            <div className="max-w-md mx-auto flex items-center justify-center">
              {/* Step Icons Row - Centered & 100% Clickable */}
              <div className="flex items-center justify-center space-x-2 sm:space-x-3.5">
                {stepsList.map((step) => {
                  const isCurrent = step.id === currentStep;

                  return (
                    <button
                      key={step.id}
                      onClick={() => jumpToStep(step.id)}
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-sm sm:text-lg font-bold transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-gradient-to-tr from-amber-400 via-pink-500 to-rose-500 text-slate-950 ring-2 sm:ring-4 ring-pink-400/60 scale-110 shadow-lg shadow-pink-500/50'
                          : 'bg-white/10 hover:bg-pink-600/70 text-white hover:scale-105 border border-white/20 hover:border-pink-400/60 shadow-md'
                      }`}
                      title={step.name}
                    >
                      <span className="drop-shadow-sm leading-none">{step.icon}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Single Step Display Area - Clean Top Aligned & Centered */}
          <main className="container mx-auto px-2 sm:px-4 z-10 pt-2 pb-6 flex-grow flex flex-col justify-center items-center text-center">
            <div className="max-w-3xl w-full mx-auto animate-fadeIn flex flex-col justify-center items-center space-y-3 sm:space-y-4 text-center">
              
              {/* STEP 1: Doorway of Love */}
              {currentStep === 1 && (
                <div className="w-full flex justify-center">
                  <HeroSection
                    isUnlocked={false}
                    onUnlock={goToNextStep}
                  />
                </div>
              )}

              {/* STEP 2: Memory Match Puzzle */}
              {currentStep === 2 && (
                <div className="w-full flex justify-center">
                  <MemoryMatchGame onComplete={goToNextStep} />
                </div>
              )}

              {/* STEP 3: Love Quiz */}
              {currentStep === 3 && (
                <div className="w-full flex justify-center">
                  <LoveQuiz onComplete={goToNextStep} />
                </div>
              )}

              {/* STEP 4: Golden Scratch Card */}
              {currentStep === 4 && (
                <div className="w-full flex justify-center">
                  <ScratchCard onComplete={goToNextStep} />
                </div>
              )}

              {/* STEP 5: Birthday Cake & Candle Blowing */}
              {currentStep === 5 && (
                <div className="w-full flex justify-center">
                  <InteractiveCake onComplete={goToNextStep} />
                </div>
              )}

              {/* STEP 6: Love Letter & Memory Wall */}
              {currentStep === 6 && (
                <div className="w-full space-y-5 flex flex-col items-center justify-center">
                  <LoveLetter onComplete={goToNextStep} />
                  <PhotoGallery onComplete={goToNextStep} />
                </div>
              )}

              {/* STEP 7: Grand Finale Games & Sky Wish Lanterns */}
              {currentStep === 7 && (
                <div className="w-full space-y-5 flex flex-col items-center justify-center">
                  <ReasonGenerator />
                  <HeartCatcherGame />
                  <RunawayButtonGame />
                  <LanternWish />

                  {/* Grand Love Celebration Card */}
                  <div className="glass-card-gold p-5 sm:p-10 rounded-3xl max-w-xl mx-auto text-center border-2 border-amber-300/60 shadow-2xl animate-pulse-glow mt-4 sm:mt-6 flex flex-col items-center justify-center">
                    <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-pink-400 fill-pink-400 mx-auto mb-2 sm:mb-3 animate-bounce" />
                    <h2 className="font-dancing text-3xl sm:text-5xl font-bold text-white glow-text-gold mb-2 sm:mb-3 text-center leading-tight">
                      Sireesha, You Are Loved Beyond Measure 💖
                    </h2>
                    <p className="text-xs sm:text-base text-pink-100 leading-relaxed font-medium mb-3 text-center px-1">
                      You have completed all the magical surprises of your birthday website! We hope this brought a huge smile to your face today and forever! 🥰
                    </p>
                    <div className="p-3 sm:p-3.5 rounded-2xl bg-black/40 border border-amber-300/40 text-amber-200 text-xs sm:text-base font-bold mb-1 text-center">
                      💖 Forever & Always Created With All Our Love by Your Loved Ones 💕
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;
