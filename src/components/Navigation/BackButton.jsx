import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';

export function BackButton({ onClick, showHome = false }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-2 px-4 py-2 rounded-lg
        bg-gradient-to-r from-neon-cyan/10 to-neon-cyan/5
        border border-neon-cyan/40 hover:border-neon-cyan/80
        text-neon-cyan hover:text-white
        transition-all duration-300 transform hover:scale-105 active:scale-95
        shadow-lg hover:shadow-neon-cyan/50"
      title={showHome ? 'Go to Home' : 'Go Back'}
    >
      {showHome ? (
        <Home className="w-5 h-5 group-hover:animate-pulse" />
      ) : (
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      )}
      <span className="font-semibold text-sm">{showHome ? 'Home' : 'Back'}</span>
    </button>
  );
}
