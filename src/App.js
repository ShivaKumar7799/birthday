import React, { useState } from 'react';
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
import { Sparkles, CheckCircle2, ArrowRight, Heart, SkipForward, RotateCcw } from 'lucide-react';
import { playPop, playWin } from './utils/sound';

function App() {
  // Flag to track whether the door has been unlocked
  const [isDoorOpened, setIsDoorOpened] = useState(false);

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

  const skipCurrentStep = () => {
    playPop();
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
    if (stepId <= maxUnlockedStep || stepId === currentStep + 1) {
      playPop();
      setCurrentStep(stepId);
      if (stepId > maxUnlockedStep) {
        setMaxUnlockedStep(stepId);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const restartJourney = () => {
    playPop();
    setIsDoorOpened(false);
    setCurrentStep(1);
    setMaxUnlockedStep(1);
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
    <div className="min-h-screen relative flex flex-col justify-between selection:bg-pink-500 selection:text-white">
      {/* Background Floating Hearts & Twinkling Stars */}
      <BackgroundEffects />

      {/* Header / Sound Controls */}
      <Navbar activeSection="home" setActiveSection={() => {}} />

      {/* Intro Phase: Happy Birthday Greeting -> Interactive Door Lock */}
      {!isDoorOpened ? (
        <BirthdayDoorIntro onDoorOpened={handleDoorOpened} />
      ) : (
        <>
          {/* Fixed Progress Bar Header */}
          <div className="sticky top-14 z-40 bg-slate-950/85 backdrop-blur-md border-b border-pink-500/20 py-2.5 px-4 shadow-xl">
            <div className="max-w-4xl mx-auto flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs shadow-md">
                  Step {currentStep} of 7
                </span>
                <span className="font-fredoka font-bold text-pink-200 hidden sm:inline text-sm">
                  {stepsList[currentStep - 1]?.name}
                </span>
              </div>

              {/* Timeline Step Buttons */}
              <div className="flex items-center space-x-1.5 sm:space-x-3">
                {stepsList.map((step) => {
                  const isCurrent = step.id === currentStep;
                  const isPassed = step.id < currentStep;
                  const isAccessible = step.id <= maxUnlockedStep;

                  return (
                    <button
                      key={step.id}
                      onClick={() => jumpToStep(step.id)}
                      disabled={!isAccessible}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-gradient-to-tr from-amber-400 via-pink-500 to-rose-500 text-slate-950 ring-4 ring-pink-400/50 scale-110 shadow-lg shadow-pink-500/50'
                          : isPassed
                          ? 'bg-pink-600 text-white shadow-md shadow-pink-500/30 hover:scale-105'
                          : isAccessible
                          ? 'bg-purple-600/60 text-white hover:bg-purple-500'
                          : 'bg-white/10 text-white/30 cursor-not-allowed border border-white/10'
                      }`}
                      title={`${step.name} (${isAccessible ? 'Click to jump' : 'Locked'})`}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4 text-white" /> : step.icon}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Single Step Display Area - Top Aligned */}
          <main className="container mx-auto px-4 z-10 pt-4 pb-8 flex-grow flex flex-col justify-start items-center">
            <div className="max-w-3xl w-full mx-auto animate-fadeIn flex flex-col justify-start items-center space-y-6">
              
              {/* STEP 1: Doorway of Love */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <HeroSection
                    isUnlocked={false}
                    onUnlock={goToNextStep}
                  />
                </div>
              )}

              {/* STEP 2: Memory Match Puzzle */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-2">
                    <span className="inline-flex items-center space-x-1 px-4 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-500/30">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Step 2 of 7: Romantic Memory Puzzle 🧩</span>
                    </span>
                  </div>

                  <MemoryMatchGame onComplete={goToNextStep} />
                </div>
              )}

              {/* STEP 3: Love Quiz */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-2">
                    <span className="inline-flex items-center space-x-1 px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                      <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                      <span>Step 3 of 7: Sireesha's Love Quiz ❓</span>
                    </span>
                  </div>

                  <LoveQuiz onComplete={goToNextStep} />
                </div>
              )}

              {/* STEP 4: Golden Scratch Card */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-2">
                    <span className="inline-flex items-center space-x-1 px-4 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Step 4 of 7: Magic Golden Scratch Card 🔮</span>
                    </span>
                  </div>

                  <ScratchCard />
                </div>
              )}

              {/* STEP 5: Birthday Cake & Candle Blowing */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="text-center mb-2">
                    <span className="inline-flex items-center space-x-1 px-4 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Step 5 of 7: Virtual Birthday Cake 🎂</span>
                    </span>
                  </div>

                  <InteractiveCake />
                </div>
              )}

              {/* STEP 6: Love Letter & Memory Wall */}
              {currentStep === 6 && (
                <div className="space-y-8">
                  <div className="text-center mb-2">
                    <span className="inline-flex items-center space-x-1 px-4 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-500/30">
                      <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                      <span>Step 6 of 7: Secret Love Letter & Photo Gallery 💌</span>
                    </span>
                  </div>

                  <LoveLetter />
                  <PhotoGallery />
                </div>
              )}

              {/* STEP 7: Grand Finale Games & Sky Wish Lanterns */}
              {currentStep === 7 && (
                <div className="space-y-8">
                  <div className="text-center mb-2">
                    <span className="inline-flex items-center space-x-1 px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-amber-400 text-white text-xs font-bold border border-amber-300 shadow-lg">
                      <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                      <span>Step 7 of 7: Grand Finale Surprise 🌟</span>
                    </span>
                  </div>

                  <ReasonGenerator />
                  <HeartCatcherGame />
                  <RunawayButtonGame />
                  <LanternWish />

                  {/* Grand Love Celebration Card */}
                  <div className="glass-card-gold p-8 rounded-3xl max-w-xl mx-auto text-center border-2 border-amber-300/60 shadow-2xl animate-pulse-glow mt-8">
                    <Heart className="w-16 h-16 text-pink-400 fill-pink-400 mx-auto mb-2 animate-bounce" />
                    <h2 className="font-dancing text-4xl sm:text-5xl font-bold text-white glow-text-gold mb-2">
                      Sireesha, You Are My Everything 💖
                    </h2>
                    <p className="text-xs sm:text-sm text-pink-100 leading-relaxed font-medium mb-4">
                      You have completed all 7 magical steps of your surprise website! I hope this brought a huge smile to your face today and forever! 🥰
                    </p>
                    <button
                      onClick={restartJourney}
                      className="px-6 py-2.5 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-fredoka font-semibold text-xs shadow-lg flex items-center space-x-2 mx-auto"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Replay Journey From Start 🔄</span>
                    </button>
                  </div>
                </div>
              )}

              {/* SKIP & NEXT NAVIGATION BAR AT BOTTOM */}
              <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 mt-8">
                {/* Previous Step Button */}
                {currentStep > 1 ? (
                  <button
                    onClick={() => jumpToStep(currentStep - 1)}
                    className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 text-xs font-bold border border-pink-400/30 flex items-center space-x-1.5 transition-all"
                  >
                    <span>⬅️ Previous Step</span>
                  </button>
                ) : <div />}

                {/* SKIP BUTTON AT BOTTOM */}
                {currentStep < 7 && (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={skipCurrentStep}
                      className="px-5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-pink-300 text-xs font-bold border border-pink-500/40 shadow-lg flex items-center space-x-2 transition-all hover:scale-105"
                      title="Skip to next surprise"
                    >
                      <SkipForward className="w-4 h-4 text-pink-400" />
                      <span>Skip To Next Surprise ⏭️</span>
                    </button>

                    <button
                      onClick={goToNextStep}
                      className="px-5 py-2.5 rounded-full glow-btn-rose text-white text-xs font-bold shadow-lg flex items-center space-x-2"
                    >
                      <span>Next Step</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

            </div>
          </main>
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;
