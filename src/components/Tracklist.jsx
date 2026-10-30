import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Music, Heart } from 'lucide-react';

export default function Tracklist({ tracks, activeTrack, isPlaying, onSelectTrack, onTogglePlay }) {
  return (
    <div className="bg-[#fffdf9] rounded-2xl p-5 border border-[#e5dcce] shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#f0e7db] pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4 text-sage-600" />
          <h3 className="font-serif font-semibold text-lg text-vintage-ink">
            Tracklist
          </h3>
        </div>
        <span className="text-xs uppercase tracking-wider text-vintage-muted font-sans font-medium">
          {tracks.length} Songs Selected
        </span>
      </div>

      {/* Song list */}
      <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[360px] pr-1">
        {tracks.map((track, idx) => {
          const isCurrent = activeTrack?.id === track.id;
          const isCurrentlyPlaying = isCurrent && isPlaying;

          return (
            <motion.div
              key={track.id}
              onClick={() => {
                if (isCurrent) {
                  onTogglePlay();
                } else {
                  onSelectTrack(track);
                }
              }}
              whileHover={{ x: 3 }}
              className={`group flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-[#f4f7f4] border-sage-300 shadow-sm'
                  : 'bg-white/70 hover:bg-[#faf7f2] border-[#eee5d8] hover:border-[#dfd3c3]'
              }`}
            >
              {/* Left: Play button & info */}
              <div className="flex items-center gap-3 min-w-0">
                {/* Circular play button with green accent */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isCurrent) {
                      onTogglePlay();
                    } else {
                      onSelectTrack(track);
                    }
                  }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0 shadow-sm ${
                    isCurrent
                      ? 'bg-sage-500 text-white ring-2 ring-sage-200'
                      : 'bg-sage-100 group-hover:bg-sage-500 text-sage-700 group-hover:text-white'
                  }`}
                  aria-label={isCurrentlyPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
                >
                  {isCurrentlyPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>

                {/* Song title and artist */}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono text-vintage-muted/80">
                      0{idx + 1}.
                    </span>
                    <h4 className={`text-sm font-semibold truncate ${isCurrent ? 'text-sage-700' : 'text-vintage-ink group-hover:text-blush-500'}`}>
                      {track.title}
                    </h4>
                  </div>
                  <p className="text-xs text-vintage-muted truncate font-sans">
                    {track.artist}
                  </p>
                </div>
              </div>

              {/* Right: Equalizer or Duration */}
              <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                {isCurrentlyPlaying ? (
                  <div className="flex items-end gap-1 h-4">
                    <span className="w-1 bg-sage-500 rounded-full animate-eq-1" />
                    <span className="w-1 bg-sage-500 rounded-full animate-eq-2" />
                    <span className="w-1 bg-sage-500 rounded-full animate-eq-3" />
                  </div>
                ) : (
                  <span className="text-xs font-mono text-vintage-muted">
                    {track.duration}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tracklist footer info */}
      <div className="mt-4 pt-3 border-t border-[#f0e7db] flex items-center justify-between text-[11px] text-vintage-muted">
        <span className="italic font-serif">Selected with all my love</span>
        <span className="flex items-center gap-1 text-blush-400">
          <Heart className="w-3.5 h-3.5 fill-blush-300" /> Made for your heart
        </span>
      </div>
    </div>
  );
}
