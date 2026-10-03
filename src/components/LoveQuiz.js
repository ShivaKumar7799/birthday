import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle2, Sparkles, Award } from 'lucide-react';
import { CONFIG } from '../data/config';
import { playPop, playWin } from '../utils/sound';

const LoveQuiz = ({ onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const currentQ = CONFIG.quizQuestions[currentIdx];

  const handleOptionSelect = (index) => {
    if (isAnswered) return;
    playPop();
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQ.correctIndex || index === 3) {
      // In love quiz, all answers are sweet, but correct choice gets bonus!
      setScore((prev) => prev + 1);
      playWin();
      confetti({ particleCount: 50, spread: 60 });
    }
  };

  const handleNext = () => {
    playPop();
    if (currentIdx + 1 < CONFIG.quizQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsQuizFinished(true);
      playWin();
      confetti({ particleCount: 120, spread: 80 });
      if (onComplete) onComplete();
    }
  };

  const resetQuiz = () => {
    playPop();
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsAnswered(false);
    setIsQuizFinished(false);
  };

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-pink-500/30 max-w-xl mx-auto my-2 text-center flex flex-col items-center justify-center">
      <div className="flex items-center justify-center space-x-3 mb-4 w-full relative">
        <h2 className="font-fredoka text-2xl sm:text-3xl font-bold text-white text-center">
          Sireesha's Love Quiz ❓
        </h2>
        <span className="text-xs sm:text-sm font-bold text-pink-300 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20 absolute right-0">
          Q {currentIdx + 1} / {CONFIG.quizQuestions.length}
        </span>
      </div>

      {!isQuizFinished ? (
        <div className="w-full flex flex-col items-center justify-center text-center">
          {/* Question Title */}
          <div className="bg-slate-900/50 p-4 sm:p-5 rounded-2xl border border-white/10 mb-5 w-full flex items-center justify-center text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-pink-200 flex items-center justify-center space-x-2 text-center">
              <HelpCircle className="w-5 h-5 text-pink-400 shrink-0" />
              <span>{currentQ.question}</span>
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6 w-full">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full text-center p-4 rounded-xl text-base sm:text-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                    isSelected 
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold shadow-lg scale-[1.02]' 
                      : 'bg-slate-800/60 hover:bg-slate-700/80 text-pink-100 border border-pink-500/20'
                  }`}
                >
                  <span>{option}</span>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-200 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-pink-950/40 border border-pink-500/30 mb-4 animate-fadeIn w-full flex flex-col items-center justify-center text-center">
              <p className="text-sm sm:text-base text-pink-200 flex items-center justify-center space-x-2 text-center">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{currentQ.celebration}</span>
              </p>
              <button
                onClick={handleNext}
                className="mt-3 w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-fredoka font-semibold text-sm sm:text-base shadow-md"
              >
                {currentIdx + 1 === CONFIG.quizQuestions.length ? 'See Final Score 🏆' : 'Next Question ➡️'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Finished State */
        <div className="text-center p-6 space-y-4 animate-fadeIn flex flex-col items-center justify-center w-full">
          <Award className="w-16 h-16 text-amber-300 mx-auto animate-bounce" />
          <h3 className="font-dancing text-4xl sm:text-5xl font-bold text-white glow-text text-center">
            Quiz Master Sireesha! 💖
          </h3>
          <p className="text-base sm:text-lg text-pink-100 text-center">
            You scored <strong className="text-amber-300 text-xl">{score} / {CONFIG.quizQuestions.length}</strong>! You know how deeply you are loved! 🥰
          </p>
          <button
            onClick={resetQuiz}
            className="px-7 py-3 rounded-full bg-pink-500 hover:bg-pink-400 text-white text-sm sm:text-base font-semibold shadow-lg mx-auto"
          >
            Retake Quiz 🔄
          </button>
        </div>
      )}
    </div>
  );
};

export default LoveQuiz;
