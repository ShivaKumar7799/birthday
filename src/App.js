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
import { CheckCircle2, ArrowRight, Heart, SkipForward, RotateCcw } from 'lucide-react';
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
          {/* Fixed Progress Bar Header */}
          <div className="sticky top-[57px] sm:top-[61px] z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-pink-500/20 py-2.5 px-4 shadow-xl">
            <div className="max-w-4xl mx-auto flex items-center justify-between sm:justify-between text-sm">
              <div className="flex items-center space-x-2.5">
                <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs sm:text-sm shadow-md">
                  Step {currentStep} of 7
                </span>
                <span className="font-fredoka font-bold text-pink-200 hidden sm:inline text-base">
                  {stepsList[currentStep - 1]?.name}
                </span>
              </div>

              {/* Timeline Step Buttons */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                {stepsList.map((step) => {
                  const isCurrent = step.id === currentStep;
                  const isPassed = step.id < currentStep;
                  const isAccessible = step.id <= maxUnlockedStep;

                  return (
                    <button
                      key={step.id}
                      onClick={() => jumpToStep(step.id)}
                      disabled={!isAccessible}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
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
                      {isPassed ? <CheckCircle2 className="w-4.5 h-4.5 text-white" /> : step.icon}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Single Step Display Area - Clean Top Aligned & Centered */}
          <main className="container mx-auto px-4 z-10 pt-3 pb-8 flex-grow flex flex-col justify-center items-center text-center">
            <div className="max-w-3xl w-full mx-auto animate-fadeIn flex flex-col justify-center items-center space-y-4 text-center">
              
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
                  <ScratchCard />
                </div>
              )}

              {/* STEP 5: Birthday Cake & Candle Blowing */}
              {currentStep === 5 && (
                <div className="w-full flex justify-center">
                  <InteractiveCake />
                </div>
              )}

              {/* STEP 6: Love Letter & Memory Wall */}
              {currentStep === 6 && (
                <div className="w-full space-y-5 flex flex-col items-center justify-center">
                  <LoveLetter />
                  <PhotoGallery />
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
                  <div className="glass-card-gold p-8 sm:p-10 rounded-3xl max-w-xl mx-auto text-center border-2 border-amber-300/60 shadow-2xl animate-pulse-glow mt-6 flex flex-col items-center justify-center">
                    <Heart className="w-16 h-16 text-pink-400 fill-pink-400 mx-auto mb-3 animate-bounce" />
                    <h2 className="font-dancing text-5xl sm:text-6xl font-bold text-white glow-text-gold mb-3 text-center">
                      Sireesha, You Are My Everything 💖
                    </h2>
                    <p className="text-sm sm:text-base text-pink-100 leading-relaxed font-medium mb-5 text-center">
                      You have completed all 7 magical steps of your surprise website! I hope this brought a huge smile to your face today and forever! 🥰
                    </p>
                    <button
                      onClick={restartJourney}
                      className="px-7 py-3 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-fredoka font-semibold text-sm sm:text-base shadow-lg flex items-center justify-center space-x-2 mx-auto"
                    >
                      <RotateCcw className="w-5 h-5" />
                      <span>Replay Journey From Start 🔄</span>
                    </button>
                  </div>
                </div>
              )}

              {/* SKIP & NEXT NAVIGATION BAR AT BOTTOM - CENTERED */}
              <div className="w-full pt-5 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 mt-6">
                {/* Previous Step Button */}
                {currentStep > 1 && (
                  <button
                    onClick={() => jumpToStep(currentStep - 1)}
                    className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 text-xs sm:text-sm font-bold border border-pink-400/30 flex items-center justify-center space-x-2 transition-all"
                  >
                    <span>⬅️ Previous Step</span>
                  </button>
                )}

                {/* SKIP BUTTON AT BOTTOM */}
                {currentStep < 7 && (
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={skipCurrentStep}
                      className="px-5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-pink-300 text-xs sm:text-sm font-bold border border-pink-500/40 shadow-lg flex items-center justify-center space-x-2 transition-all hover:scale-105"
                      title="Skip to next surprise"
                    >
                      <SkipForward className="w-4.5 h-4.5 text-pink-400" />
                      <span>Skip Surprise ⏭️</span>
                    </button>

                    <button
                      onClick={goToNextStep}
                      className="px-6 py-2.5 rounded-full glow-btn-rose text-white text-xs sm:text-sm font-bold shadow-lg flex items-center justify-center space-x-2"
                    >
                      <span>Next Step</span>
                      <ArrowRight className="w-4.5 h-4.5" />
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
