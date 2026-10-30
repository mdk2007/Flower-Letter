import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Edit3, Check, Heart } from 'lucide-react';

export default function LinerNote({ letterText, onSaveLetter, senderName = "Yours" }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(letterText);

  const handleSave = () => {
    onSaveLetter(draftText);
    setIsEditing(false);
  };

  return (
    <div className="relative bg-[#fcf9f2] rounded-2xl p-6 border border-[#e5dacb] shadow-sm flex flex-col justify-between h-full paper-texture">
      {/* Decorative Washi Tape at top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#f0d5ce]/80 rotate-1 shadow-sm backdrop-blur-xs border-dashed border-x border-[#dfb3a8] pointer-events-none" />

      {/* Header */}
      <div>
        <div className="flex items-center justify-between border-b border-[#ece1d3] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blush-400" />
            <h3 className="text-xs uppercase font-sans font-bold tracking-[0.25em] text-[#827164]">
              LINER NOTE
            </h3>
          </div>
          
          <button
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setDraftText(letterText);
                setIsEditing(true);
              }
            }}
            className="flex items-center gap-1 text-[11px] font-sans text-vintage-muted hover:text-vintage-ink transition-colors px-2 py-1 rounded bg-[#f5ecdf] hover:bg-[#ede1d0] border border-[#e2d5c3]"
          >
            {isEditing ? (
              <>
                <Check className="w-3.5 h-3.5 text-sage-600" />
                <span>Save</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3 h-3 text-vintage-muted" />
                <span>Personalize</span>
              </>
            )}
          </button>
        </div>

        {/* Note Body */}
        {isEditing ? (
          <textarea
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            className="w-full h-64 p-3 bg-white/90 border border-sage-300 rounded-lg font-serif text-sm leading-relaxed text-vintage-ink focus:outline-none focus:ring-2 focus:ring-sage-400 resize-none shadow-inner"
            placeholder="Write your personal love letter here..."
          />
        ) : (
          <div className="prose prose-stone max-h-[300px] overflow-y-auto pr-1">
            <div className="font-cormorant text-base sm:text-lg leading-relaxed text-vintage-ink whitespace-pre-line tracking-wide">
              {letterText}
            </div>
          </div>
        )}
      </div>

      {/* Note Footer: Sign-off & Pressed flower illustration */}
      <div className="mt-6 pt-3 border-t border-[#eee3d5] flex items-end justify-between">
        <div className="flex flex-col">
          <span className="font-script text-2xl text-blush-500 leading-none">
            Forever & Always,
          </span>
          <span className="font-serif italic text-xs text-vintage-muted mt-1">
            — {senderName} ♡
          </span>
        </div>

        {/* Cute pressed flower seal */}
        <div className="flex items-center gap-1.5 opacity-80 bg-[#f7efe4] px-2.5 py-1 rounded-full border border-[#ded2c1]">
          <span className="text-sm">🌸</span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-vintage-muted">
            Pressed with love
          </span>
        </div>
      </div>
    </div>
  );
}
