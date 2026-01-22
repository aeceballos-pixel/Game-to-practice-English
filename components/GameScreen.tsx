import React from 'react';
import { Scenario, Option } from '../types';
import TooltipText from './TooltipText';

interface GameScreenProps {
  scenario: Scenario;
  loading: boolean;
  score: number;
  questionCount: number;
  feedbackVisible: boolean;
  lastAnswerCorrect: boolean | null;
  onOptionSelected: (option: Option) => void;
  onNext: () => void;
  onExit: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
  scenario,
  loading,
  score,
  questionCount,
  feedbackVisible,
  lastAnswerCorrect,
  onOptionSelected,
  onNext,
  onExit
}) => {

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-slate-300 font-mono animate-pulse">Generating Scenario...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      {/* HUD */}
      <div className="flex justify-between items-center mb-8 bg-slate-800 p-4 rounded-lg border border-slate-700">
        <div className="flex flex-col">
          <span className="text-slate-400 text-xs uppercase tracking-wider">Sim Score</span>
          <span className="text-2xl font-mono text-white">{score}</span>
        </div>
        <div className="text-center">
            <span className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs font-bold border border-slate-600">
                TOPIC: {scenario.topic}
            </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-slate-400 text-xs uppercase tracking-wider">Question</span>
          <span className="text-2xl font-mono text-white">#{questionCount}</span>
        </div>
      </div>

      {/* Scenario Card */}
      <div className="bg-slate-800 border border-slate-600 rounded-xl overflow-hidden shadow-2xl mb-8 relative">
        <div className="bg-slate-900/50 p-6 border-b border-slate-700">
          <div className="text-lg leading-relaxed text-slate-200 font-light">
            <span className="text-blue-400 font-mono mr-2">&gt;</span>
            <TooltipText text={scenario.context} />
          </div>
        </div>
        
        <div className="p-6 bg-slate-800">
          <h3 className="text-xl font-semibold text-white mb-6">
            <TooltipText text={scenario.question} />
          </h3>

          <div className="space-y-4">
            {scenario.options.map((option) => (
              <button
                key={option.id}
                onClick={() => !feedbackVisible && onOptionSelected(option)}
                disabled={feedbackVisible}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center
                  ${feedbackVisible 
                    ? option.isCorrect 
                      ? 'bg-green-900/30 border-green-500 text-green-100'
                      : 'bg-slate-800 border-slate-700 text-slate-500 opacity-50'
                    : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700 hover:border-blue-400 text-slate-200'
                  }
                  ${feedbackVisible && !option.isCorrect && lastAnswerCorrect === false ? 'opacity-50' : ''}
                `}
              >
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-4 flex-shrink-0
                   ${feedbackVisible && option.isCorrect ? 'border-green-500 bg-green-500 text-black' : 'border-slate-500'}
                `}>
                  {feedbackVisible && option.isCorrect ? '✓' : ''}
                </div>
                <span>
                    <TooltipText text={option.text} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback Panel */}
      {feedbackVisible && (
        <div className={`mb-8 p-6 rounded-xl border ${lastAnswerCorrect ? 'bg-green-900/20 border-green-600/50' : 'bg-red-900/20 border-red-600/50'} animate-fade-in`}>
          <div className="flex items-start mb-2">
            <span className={`text-2xl mr-3 ${lastAnswerCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {lastAnswerCorrect ? 'Correct' : 'Incorrect'}
            </span>
          </div>
          <div className="text-slate-300 leading-relaxed border-l-2 border-slate-600 pl-4">
            <TooltipText text={scenario.feedback} />
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={onNext}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center"
            >
              Next Scenario <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      )}

        <div className="flex justify-center mt-12">
            <button onClick={onExit} className="text-slate-500 hover:text-slate-300 text-sm underline">
                Exit Simulation
            </button>
        </div>
    </div>
  );
};

export default GameScreen;