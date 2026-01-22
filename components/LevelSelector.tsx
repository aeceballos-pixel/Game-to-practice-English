import React from 'react';
import { Level } from '../types';

interface LevelSelectorProps {
  onSelectLevel: (level: Level) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ onSelectLevel }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          <span className="text-blue-500">Tech</span>English Simulator
        </h1>
        <p className="text-slate-400 text-lg">Select your proficiency level based on the course modules.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Level A */}
        <button
          onClick={() => onSelectLevel(Level.A)}
          className="group relative bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-green-500 rounded-xl p-8 transition-all duration-300 text-left"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-6xl font-bold text-green-500">A</span>
          </div>
          <div className="flex flex-col h-full justify-between">
            <div>
              <h2 className="text-2xl font-bold text-green-400 mb-2">Level A: EJE 3</h2>
              <p className="text-slate-300 text-sm mb-4">Focus: Actions in Progress & Descriptions</p>
              <ul className="text-slate-400 text-xs space-y-2 list-disc pl-4">
                <li>Present Continuous (Alex's Day)</li>
                <li>Prepositions (Time/Place)</li>
                <li>Countable/Uncountable & Quantifiers</li>
              </ul>
            </div>
            <div className="mt-6 text-green-400 text-sm font-medium group-hover:underline">
              Start Training &rarr;
            </div>
          </div>
        </button>

        {/* Level B */}
        <button
          onClick={() => onSelectLevel(Level.B)}
          className="group relative bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500 rounded-xl p-8 transition-all duration-300 text-left"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-6xl font-bold text-blue-500">B</span>
          </div>
          <div className="flex flex-col h-full justify-between">
            <div>
              <h2 className="text-2xl font-bold text-blue-400 mb-2">Level B: EJE 4</h2>
              <p className="text-slate-300 text-sm mb-4">Focus: Past Events & Obligations</p>
              <ul className="text-slate-400 text-xs space-y-2 list-disc pl-4">
                <li>Past Simple (Laura's Day)</li>
                <li>Past Continuous (Agile Morning)</li>
                <li>Modals (Must, Should, Can)</li>
              </ul>
            </div>
            <div className="mt-6 text-blue-400 text-sm font-medium group-hover:underline">
              Start Mission &rarr;
            </div>
          </div>
        </button>

        {/* Level C */}
        <button
          onClick={() => onSelectLevel(Level.C)}
          className="group relative bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-purple-500 rounded-xl p-8 transition-all duration-300 text-left"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-6xl font-bold text-purple-500">C</span>
          </div>
          <div className="flex flex-col h-full justify-between">
            <div>
              <h2 className="text-2xl font-bold text-purple-400 mb-2">Level C: EJE Future</h2>
              <p className="text-slate-300 text-sm mb-4">Focus: Future Plans & Purpose</p>
              <ul className="text-slate-400 text-xs space-y-2 list-disc pl-4">
                <li>Will vs Going To (AI Future)</li>
                <li>Prepositions (To vs For)</li>
                <li>Present Continuous for Future</li>
              </ul>
            </div>
            <div className="mt-6 text-purple-400 text-sm font-medium group-hover:underline">
              Start Challenge &rarr;
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LevelSelector;