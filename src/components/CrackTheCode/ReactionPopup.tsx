import React from 'react';

interface ReactionPopupProps {
  text: string;
}

export default function ReactionPopup({ text }: ReactionPopupProps) {
  return (
    <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 z-50">
      <div className="animate-bounce bg-gradient-to-r from-red-500 to-pink-500 px-8 py-4 rounded-2xl shadow-2xl text-center">
        <p className="text-3xl font-bold text-white drop-shadow-lg">{text}</p>
      </div>
    </div>
  );
}
