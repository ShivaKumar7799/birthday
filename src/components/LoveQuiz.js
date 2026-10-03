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
    <div className="glass-card p-6 rounded-3xl border border-pink-500/30 max-w-xl mx-auto my-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Puzzle 2 ❓
          </span>
          <h2 className="font-fredoka text-xl sm:text-2xl font-bold text-white mt-1">
            Sireesha's Love Quiz
          </h2>
        </div>
        <span className="text-xs font-bold text-pink-300 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
          Q {currentIdx + 1} / {CONFIG.quizQuestions.length}
        </span>
      </div>

      {!isQuizFinished ? (
        <div>
          {/* Question Title */}
          <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/10 mb-5">
            <h3 className="text-base sm:text-lg font-semibold text-pink-200 flex items-start space-x-2">
              <HelpCircle className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
              <span>{currentQ.question}</span>
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                    isSelected 
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold shadow-lg scale-[1.02]' 
                      : 'bg-slate-800/60 hover:bg-slate-700/80 text-pink-100 border border-pink-500/20'
                  }`}
                >
                  <span>{option}</span>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-200" />}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-pink-950/40 border border-pink-500/30 mb-4 animate-fadeIn">
              <p className="text-xs sm:text-sm text-pink-200 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{currentQ.celebration}</span>
              </p>
              <button
                onClick={handleNext}
                className="mt-3 w-full py-2.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-fredoka font-semibold text-xs sm:text-sm shadow-md"
              >
                {currentIdx + 1 === CONFIG.quizQuestions.length ? 'See Final Score 🏆' : 'Next Question ➡️'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Finished State */
        <div className="text-center p-6 space-y-4 animate-fadeIn">
          <Award className="w-16 h-16 text-amber-300 mx-auto animate-bounce" />
          <h3 className="font-dancing text-4xl font-bold text-white glow-text">
            Quiz Master Sireesha! 💖
          </h3>
          <p className="text-sm text-pink-100">
            You scored <strong className="text-amber-300 text-lg">{score} / {CONFIG.quizQuestions.length}</strong>! You know how deeply you are loved! 🥰
          </p>
          <button
            onClick={resetQuiz}
            className="px-6 py-2.5 rounded-full bg-pink-500 hover:bg-pink-400 text-white text-xs font-semibold shadow-lg"
          >
            Retake Quiz 🔄
          </button>
        </div>
      )}
    </div>
  );
};

export default LoveQuiz;
