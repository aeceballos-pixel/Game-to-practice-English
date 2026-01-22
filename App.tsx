import React, { useState, useEffect, useCallback } from 'react';
import { GameState, Level, Scenario, Option } from './types';
import { generateScenario } from './services/geminiService';
import LevelSelector from './components/LevelSelector';
import GameScreen from './components/GameScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: null,
    score: 0,
    questionCount: 0,
    isPlaying: false,
    gameOver: false,
    loading: false,
    currentScenario: null,
    feedbackVisible: false,
    lastAnswerCorrect: null,
  });

  const loadScenario = useCallback(async (level: Level) => {
    setGameState(prev => ({ ...prev, loading: true, feedbackVisible: false, lastAnswerCorrect: null }));
    
    try {
      const scenario = await generateScenario(level);
      setGameState(prev => ({
        ...prev,
        currentScenario: scenario,
        loading: false,
        questionCount: prev.questionCount + 1
      }));
    } catch (error) {
      console.error("Failed to load scenario", error);
      setGameState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const handleStartGame = (level: Level) => {
    setGameState({
      currentLevel: level,
      score: 0,
      questionCount: 0,
      isPlaying: true,
      gameOver: false,
      loading: true,
      currentScenario: null,
      feedbackVisible: false,
      lastAnswerCorrect: null,
    });
    loadScenario(level);
  };

  const handleOptionSelected = (option: Option) => {
    const isCorrect = option.isCorrect;
    setGameState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 100 : prev.score,
      feedbackVisible: true,
      lastAnswerCorrect: isCorrect
    }));
  };

  const handleNext = () => {
    if (gameState.currentLevel) {
      loadScenario(gameState.currentLevel);
    }
  };

  const handleExit = () => {
    setGameState({
      currentLevel: null,
      score: 0,
      questionCount: 0,
      isPlaying: false,
      gameOver: false,
      loading: false,
      currentScenario: null,
      feedbackVisible: false,
      lastAnswerCorrect: null,
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
        {/* Header Bar */}
        <header className="w-full bg-slate-900 border-b border-slate-800 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="font-mono text-sm tracking-widest text-slate-400">ESP_SIMULATOR_V1.0</span>
            </div>
            {gameState.isPlaying && (
                <div className="font-mono text-xs text-slate-500">
                    LEVEL: {gameState.currentLevel}
                </div>
            )}
        </header>

      <main className="flex-grow flex flex-col">
        {!gameState.isPlaying && (
          <LevelSelector onSelectLevel={handleStartGame} />
        )}

        {gameState.isPlaying && gameState.currentScenario && (
          <GameScreen
            scenario={gameState.currentScenario}
            loading={gameState.loading}
            score={gameState.score}
            questionCount={gameState.questionCount}
            feedbackVisible={gameState.feedbackVisible}
            lastAnswerCorrect={gameState.lastAnswerCorrect}
            onOptionSelected={handleOptionSelected}
            onNext={handleNext}
            onExit={handleExit}
          />
        )}
        
        {gameState.isPlaying && !gameState.currentScenario && gameState.loading && (
             <div className="flex flex-col items-center justify-center flex-grow">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                <p className="text-slate-300 font-mono animate-pulse">Initializing Scenario Generator...</p>
             </div>
        )}
      </main>
      
      <footer className="py-6 text-center text-slate-600 text-xs font-mono border-t border-slate-800">
        <p>Technical English Simulation | Powered by Gemini 2.0 Flash</p>
        <p className="mt-2 text-slate-500">Created by Lic. Ana E. Ceballos</p>
      </footer>
    </div>
  );
};

export default App;