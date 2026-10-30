import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Disc3, Sparkles } from 'lucide-react';

export default function CassetteTape({
  activeTrack,
  isPlaying,
  onTogglePlay,
  onPrevTrack,
  onNextTrack,
  progress = 30, // 0 to 100
  currentTime = "1:15",
  duration = "3:45",
  isMuted,
  onToggleMute,
}) {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Cassette Tape Realistic Graphic Wrapper */}
      <div className="relative w-full max-w-[480px] bg-[#f2ebe0] rounded-2xl p-4 sm:p-5 shadow-2xl border-2 border-[#d9ccb9] vintage-shadow">
        {/* Screw holes in corners for realistic retro feel */}
        <div className="absolute top-2.5 left-2.5 w-3 h-3 rounded-full bg-[#baa994] flex items-center justify-center shadow-inner">
          <div className="w-2 h-0.5 bg-[#7a6b58]" />
        </div>
        <div className="absolute top-2.5 right-2.5 w-3 h-3 rounded-full bg-[#baa994] flex items-center justify-center shadow-inner">
          <div className="w-2 h-0.5 bg-[#7a6b58] rotate-45" />
        </div>
        <div className="absolute bottom-2.5 left-2.5 w-3 h-3 rounded-full bg-[#baa994] flex items-center justify-center shadow-inner">
          <div className="w-2 h-0.5 bg-[#7a6b58] -rotate-45" />
        </div>
        <div className="absolute bottom-2.5 right-2.5 w-3 h-3 rounded-full bg-[#baa994] flex items-center justify-center shadow-inner">
          <div className="w-2 h-0.5 bg-[#7a6b58] rotate-90" />
        </div>

        {/* Painted floral decorative corners on the cassette shell */}
        <div className="absolute -top-3 -left-3 pointer-events-none select-none z-20">
          <span className="text-2xl drop-shadow-sm">🌸</span>
        </div>
        <div className="absolute -top-3 -right-3 pointer-events-none select-none z-20">
          <span className="text-2xl drop-shadow-sm">🌿</span>
        </div>
        <div className="absolute -bottom-2 -left-2 pointer-events-none select-none z-20">
          <span className="text-xl drop-shadow-sm">🍃</span>
        </div>
        <div className="absolute -bottom-2 -right-2 pointer-events-none select-none z-20">
          <span className="text-2xl drop-shadow-sm">🌺</span>
        </div>

        {/* Cassette Label Area (Main Paper Insert) */}
        <div className="relative bg-[#fffdf9] rounded-xl border border-[#ded2c1] p-3 sm:p-4 shadow-sm overflow-hidden">
          {/* Retro striped header lines */}
          <div className="w-full h-1.5 bg-gradient-to-r from-blush-300 via-cream-400 to-sage-400 rounded-full mb-2 opacity-80" />

          {/* Top Label Info */}
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-vintage-muted font-sans font-semibold tracking-wider uppercase border-b border-[#eee4d6] pb-1.5 mb-3">
            <span className="flex items-center gap-1.5 text-sage-600">
              <span className="w-2 h-2 rounded-full bg-sage-500 inline-block" />
              SIDE A • 90 MIN
            </span>
            <span className="font-serif italic capitalize text-blush-500 font-normal">
              High Quality Stereo
            </span>
            <span className="tracking-widest text-[#938171]">VOL. 1</span>
          </div>

          {/* Handwritten Track Title Label */}
          <div className="bg-[#f7f2ea]/80 rounded border border-dashed border-[#d8cabb] px-3 py-1.5 text-center mb-3">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-vintage-muted block">
              Now Playing on Cassette:
            </span>
            <h3 className="font-serif text-base sm:text-lg font-semibold text-vintage-ink truncate mt-0.5">
              {activeTrack?.title || "Select a song"}
              <span className="text-xs sm:text-sm font-normal text-vintage-muted ml-2 font-sans">
                — {activeTrack?.artist}
              </span>
            </h3>
          </div>

          {/* Center Tape Window with Visible Spools & Magnetic Tape */}
          <div className="relative w-full h-20 sm:h-24 bg-[#1f1a17] rounded-lg border-2 border-[#b5a38f] p-2 flex items-center justify-between shadow-inner overflow-hidden">
            {/* Dark magnetic tape strip connecting reels */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-8 bg-gradient-to-r from-[#2c1d11] via-[#4a2e1b] to-[#2c1d11] opacity-90 rounded" />
            
            {/* Center ruler marks on transparent acrylic window */}
            <div className="absolute inset-x-1/4 top-1/2 -translate-y-1/2 h-5 border-y border-dashed border-white/20 flex items-center justify-around text-[9px] text-white/40 font-mono pointer-events-none">
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>

            {/* Left Spool */}
            <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#fbf8f2] border-4 border-[#ded2c1] shadow flex items-center justify-center">
              {/* Outer magnetic tape wound around spool */}
              <div
                className="absolute inset-[-6px] rounded-full border-[7px] border-[#3f2a1b] pointer-events-none transition-all duration-1000"
                style={{ borderWidth: `${Math.max(2, 9 - (progress / 15))}px` }}
              />
              
              {/* Rotating gear wheel with teeth */}
              <div className={`relative w-8 h-8 rounded-full bg-[#ece3d4] border border-[#baa994] flex items-center justify-center ${isPlaying ? 'animate-tape-spin' : ''}`}>
                <div className="w-3 h-3 rounded-full bg-[#1f1a17]" />
                {/* Sprocket teeth */}
                <div className="absolute w-1 h-3.5 bg-[#756653] top-0.5" />
                <div className="absolute w-1 h-3.5 bg-[#756653] bottom-0.5" />
                <div className="absolute w-3.5 h-1 bg-[#756653] left-0.5" />
                <div className="absolute w-3.5 h-1 bg-[#756653] right-0.5" />
              </div>
            </div>

            {/* Center Status Glow / Equalizer pill */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="flex items-center gap-1">
                <span className={`w-1.5 rounded-full bg-blush-400 ${isPlaying ? 'animate-eq-1' : 'h-1'}`} />
                <span className={`w-1.5 rounded-full bg-sage-400 ${isPlaying ? 'animate-eq-2' : 'h-2'}`} />
                <span className={`w-1.5 rounded-full bg-blush-400 ${isPlaying ? 'animate-eq-3' : 'h-1.5'}`} />
              </div>
              <span className="text-[9px] uppercase tracking-wider text-white/60 font-mono mt-1">
                {isPlaying ? "TAPE ROLLING" : "STANDBY"}
              </span>
            </div>

            {/* Right Spool */}
            <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#fbf8f2] border-4 border-[#ded2c1] shadow flex items-center justify-center">
              {/* Outer magnetic tape wound around right spool (increases with progress) */}
              <div
                className="absolute inset-[-6px] rounded-full border-[#3f2a1b] pointer-events-none transition-all duration-1000"
                style={{ borderWidth: `${Math.max(2, 2 + (progress / 15))}px` }}
              />

              {/* Rotating gear wheel with teeth */}
              <div className={`relative w-8 h-8 rounded-full bg-[#ece3d4] border border-[#baa994] flex items-center justify-center ${isPlaying ? 'animate-tape-spin' : ''}`}>
                <div className="w-3 h-3 rounded-full bg-[#1f1a17]" />
                {/* Sprocket teeth */}
                <div className="absolute w-1 h-3.5 bg-[#756653] top-0.5" />
                <div className="absolute w-1 h-3.5 bg-[#756653] bottom-0.5" />
                <div className="absolute w-3.5 h-1 bg-[#756653] left-0.5" />
                <div className="absolute w-3.5 h-1 bg-[#756653] right-0.5" />
              </div>
            </div>
          </div>

          {/* Bottom trapezoid cutout representation with screw */}
          <div className="mt-3 flex items-center justify-between px-2 text-[10px] text-vintage-muted font-serif italic">
            <span>Stereo Cassette Deck</span>
            <div className="w-2.5 h-2.5 rounded-full bg-[#c2b29d] flex items-center justify-center shadow-inner">
              <div className="w-1.5 h-0.5 bg-[#756653]" />
            </div>
            <span>Made with All My Love</span>
          </div>
        </div>
      </div>

      {/* Cassette Deck Physical Buttons & Progress Control */}
      <div className="w-full max-w-[480px] mt-4 bg-[#f8f3eb] rounded-xl border border-[#ded2c1] p-3 shadow-sm flex flex-col gap-2.5">
        {/* Progress Bar & Timers */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-vintage-muted w-9 text-right">{currentTime}</span>
          <div className="relative flex-1 h-2 bg-[#e8ded0] rounded-full overflow-hidden cursor-pointer group">
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-sage-400 to-blush-400 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-mono text-vintage-muted w-9">{duration}</span>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between pt-1">
          {/* Mute button */}
          <button
            onClick={onToggleMute}
            className="p-2 text-vintage-muted hover:text-vintage-ink transition-colors rounded-lg hover:bg-cream-200"
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-blush-500" /> : <Volume2 className="w-4 h-4 text-sage-600" />}
          </button>

          {/* Core Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={onPrevTrack}
              className="p-2.5 rounded-full text-vintage-ink hover:bg-cream-200 active:scale-95 transition-all shadow-sm border border-[#e0d4c3]"
              title="Previous Track"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <motion.button
              onClick={onTogglePlay}
              whileTap={{ scale: 0.94 }}
              className="px-5 py-2.5 rounded-full bg-sage-500 hover:bg-sage-600 text-white font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span className="text-xs font-sans uppercase tracking-wider font-semibold">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                  <span className="text-xs font-sans uppercase tracking-wider font-semibold">Play Tape</span>
                </>
              )}
            </motion.button>

            <button
              onClick={onNextTrack}
              className="p-2.5 rounded-full text-vintage-ink hover:bg-cream-200 active:scale-95 transition-all shadow-sm border border-[#e0d4c3]"
              title="Next Track"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Sync indicator */}
          <div className="flex items-center gap-1 text-[11px] text-sage-600 font-sans">
            <Disc3 className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Synced</span>
          </div>
        </div>
      </div>
    </div>
  );
}
