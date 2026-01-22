import React from 'react';
import { TECHNICAL_GLOSSARY } from '../utils/glossary';

interface TooltipTextProps {
  text: string;
}

const TooltipText: React.FC<TooltipTextProps> = ({ text }) => {
  if (!text) return null;

  // Create a regex from glossary keys, ensuring word boundaries
  // Sort keys by length descending to match longer phrases first
  const keys = Object.keys(TECHNICAL_GLOSSARY).sort((a, b) => b.length - a.length);
  const regex = new RegExp(`\\b(${keys.join('|')})\\b`, 'gi');

  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) => {
        const lowerPart = part.toLowerCase();
        if (TECHNICAL_GLOSSARY.hasOwnProperty(lowerPart)) {
          return (
            <span key={index} className="group relative inline-block cursor-help border-b border-dotted border-blue-400 hover:bg-blue-900/30 transition-colors rounded px-0.5 mx-0.5">
              {part}
              <span className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 text-slate-100 text-xs rounded shadow-xl border border-slate-700 z-50 text-center pointer-events-none">
                {TECHNICAL_GLOSSARY[lowerPart]}
                <svg className="absolute text-slate-900 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve">
                    <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
                </svg>
              </span>
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};

export default TooltipText;