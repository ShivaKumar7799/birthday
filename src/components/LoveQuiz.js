import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle2, Sparkles, Award, Heart, ArrowRight, RotateCcw, Crown } from 'lucide-react';
import { CONFIG } from '../data/config';
import { playPop, playWin } from '../utils/sound';

const LoveQuiz = ({ onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [answersHistory, setAnswersHistory] = useState([]);
  const [showBreakdown, setShowBreakdown] = useState(true);
  const [countdown, setCountdown] = useState(7);

  const currentQ = CONFIG.quizQuestions[currentIdx];

  const handleOptionSelect = (index) => {
    if (isAnswered) return;
    playPop();
    setSelectedOption(index);
    setIsAnswered(true);

    // Every choice Sireesha makes is celebrated as 100% perfect!
    playWin();
    confetti({ particleCount: 50, spread: 60 });

    setAnswersHistory((prev) => [
      ...prev,
      {
        question: currentQ.question,
        selectedOptionText: currentQ.options[index],
        celebration: currentQ.celebration,
        isCorrect: true
      }
    ]);
  };

  const handleNext = () => {
    playPop();
    if (currentIdx + 1 < CONFIG.quizQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsQuizFinished(true);
      setCountdown(7);
      playWin();
      confetti({ particleCount: 150, spread: 100 });
    }
  };

  // Auto-advance timer on the results screen
  useEffect(() => {
    if (!isQuizFinished) return;

    if (countdown <= 0) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isQuizFinished, countdown, onComplete]);

  const resetQuiz = () => {
    playPop();
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsQuizFinished(false);
    setAnswersHistory([]);
    setShowBreakdown(true);
    setCountdown(7);
  };

  const getVerdict = () => {
    return {
      title: "👑 100% Soulmate Perfection!",
      badge: `${CONFIG.hisName}' Certified Queen & Soulmate`,
      message: `You know your loved ones inside and out! Every single thought, smile, and heartbeat revolves around you, ${CONFIG.herName}. You truly own their whole hearts! 💕`
    };
  };

  const verdict = getVerdict();

  return (
    <div className="glass-card-luxury p-4 sm:p-7 rounded-3xl border-2 border-pink-400/40 max-w-xl w-full mx-auto my-2 text-center flex flex-col items-center justify-center shadow-2xl">
      
      {/* Quiz Header */}
      <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-pink-500/20">
        <div className="flex items-center space-x-1.5 sm:space-x-2 text-left">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400 fill-pink-500 animate-pulse shrink-0" />
          <h2 className="font-dancing text-xl sm:text-3xl font-bold text-white glow-text-rose leading-tight">
            How Well Do You Know Your Loved Ones? 💖
          </h2>
        </div>
        {!isQuizFinished && (
          <span className="text-xs sm:text-sm font-bold text-pink-200 bg-pink-500/20 px-2.5 sm:px-3 py-1 rounded-full border border-pink-400/30 shrink-0 ml-1">
            Question {currentIdx + 1}
          </span>
        )}
      </div>

      {!isQuizFinished ? (
        <div className="w-full flex flex-col items-center justify-center text-center">
          {/* Question Box */}
          <div className="bg-slate-900/60 p-3 sm:p-4 rounded-2xl border border-pink-400/20 mb-3 sm:mb-4 w-full flex items-center justify-center text-center shadow-inner">
            <h3 className="text-sm sm:text-lg font-semibold text-pink-100 flex items-center justify-center space-x-2 text-center leading-snug">
              <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 shrink-0" />
              <span>{currentQ.question}</span>
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2 sm:space-y-2.5 mb-3 sm:mb-4 w-full">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full text-center p-2.5 sm:p-3.5 rounded-2xl text-xs sm:text-base font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white shadow-lg shadow-pink-500/50 scale-[1.01] border-2 border-white'
                      : 'bg-slate-900/50 hover:bg-pink-900/30 text-pink-100 border border-pink-500/30 hover:border-pink-400'
                  }`}
                >
                  <span className="leading-snug">{option}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Answer Feedback & Proceed Button */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-pink-400/40 mb-3 animate-fadeIn w-full flex flex-col items-center justify-center text-center shadow-lg">
              <p className="text-sm sm:text-base text-pink-200 flex items-center justify-center space-x-2 text-center font-medium">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{currentQ.celebration}</span>
              </p>
              <button
                onClick={handleNext}
                className="mt-3 w-full py-3 rounded-xl glow-btn-rose text-white font-fredoka font-bold text-sm sm:text-base shadow-xl flex items-center justify-center space-x-2"
              >
                <span>{currentIdx + 1 === CONFIG.quizQuestions.length ? 'View Final Results 🏆' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Detailed Results Screen */
        <div className="text-center space-y-4 animate-fadeIn flex flex-col items-center justify-center w-full">
          {/* Trophy & Verdict */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-300 via-pink-400 to-rose-500 p-1 shadow-2xl flex items-center justify-center mx-auto">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
              <Crown className="w-10 h-10 text-amber-300 animate-bounce" />
            </div>
          </div>

          <div className="space-y-1">
            <span className="inline-block px-4 py-1 rounded-full text-xs sm:text-sm font-bold bg-pink-500/20 text-pink-200 border border-pink-400/40">
              {verdict.badge}
            </span>
            <h3 className="font-dancing text-4xl sm:text-5xl font-bold text-white glow-text-rose">
              {verdict.title}
            </h3>
          </div>

          {/* Score Card */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border-2 border-pink-400/40 w-full text-center space-y-2 shadow-xl">
            <div className="flex items-center justify-center space-x-4">
              <div>
                <p className="text-xs text-pink-300 uppercase tracking-widest font-bold">Your Score</p>
                <p className="text-3xl font-extrabold text-amber-300 font-fredoka">
                  {CONFIG.quizQuestions.length} / {CONFIG.quizQuestions.length}
                </p>
              </div>
              <div className="h-10 w-px bg-pink-500/30"></div>
              <div>
                <p className="text-xs text-pink-300 uppercase tracking-widest font-bold">Compatibility</p>
                <p className="text-3xl font-extrabold text-pink-400 font-fredoka">100%</p>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-pink-100/90 font-medium pt-2 leading-relaxed text-center">
              "{verdict.message}"
            </p>
          </div>

          {/* Auto-advance notification */}
          <div className="py-1 px-4 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-bold animate-pulse">
            ⏳ Moving to Magic Scratch Card in {countdown}s...
          </div>

          {/* Question Breakdown Toggle */}
          <div className="w-full">
            <button
              onClick={() => setShowBreakdown((prev) => !prev)}
              className="text-xs sm:text-sm text-pink-300 hover:text-pink-100 underline mb-2 transition-colors flex items-center justify-center space-x-1 mx-auto"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>{showBreakdown ? 'Hide Loved Ones Fact Summary' : 'Show Loved Ones Fact Summary'}</span>
            </button>

            {showBreakdown && (
              <div className="space-y-2.5 max-h-56 overflow-y-auto w-full pr-1 text-left">
                {answersHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/60 border border-pink-500/20 text-xs sm:text-sm"
                  >
                    <div className="flex items-center justify-between text-pink-300 font-bold mb-1">
                      <span>Q{idx + 1}: {item.question}</span>
                      <span className="text-green-400 flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <p className="text-pink-100 font-medium">
                      <span className="text-pink-400 font-semibold">Your Answer: </span>
                      {item.selectedOptionText}
                    </p>
                    <p className="text-amber-200/90 text-xs mt-1 italic">
                      ✨ {item.celebration}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 w-full pt-1">
            <button
              onClick={() => {
                playPop();
                if (onComplete) onComplete();
              }}
              className="w-full py-3.5 rounded-2xl glow-btn-rose text-white font-fredoka font-bold text-sm sm:text-base shadow-2xl flex items-center justify-center space-x-2"
            >
              <span>Continue to Magic Scratch Card 🔮✨</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={resetQuiz}
              className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 mx-auto transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz 🔄</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoveQuiz;
