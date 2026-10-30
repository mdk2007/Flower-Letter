import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Play, Pause, Volume2, Sparkles, Flower2, Mic } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playRomanticMelody, stopRomanticMelody } from '../utils/audioPlayer';

export default function FloatingSidebar({
  isOpen,
  onToggle,
  activeTrack,
  recipientName = "My Love",
}) {
  const [isPlayingVoiceNote, setIsPlayingVoiceNote] = useState(false);
  const [voiceProgress, setVoiceProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'voice', 'bouquet', 'video'
  const voiceTimerRef = useRef(null);

  // Toggle voice note playback
  const handleToggleVoice = () => {
    if (isPlayingVoiceNote) {
      stopRomanticMelody();
      setIsPlayingVoiceNote(false);
      if (voiceTimerRef.current) clearInterval(voiceTimerRef.current);
    } else {
      playRomanticMelody();
      setIsPlayingVoiceNote(true);

      // Simulate voice note progress
      voiceTimerRef.current = setInterval(() => {
        setVoiceProgress((prev) => {
          if (prev >= 100) {
            stopRomanticMelody();
            setIsPlayingVoiceNote(false);
            clearInterval(voiceTimerRef.current);
            return 0;
          }
          return prev + 1.5;
        });
      }, 500);
    }
  };

  useEffect(() => {
    return () => {
      stopRomanticMelody();
      if (voiceTimerRef.current) clearInterval(voiceTimerRef.current);
    };
  }, []);

  // Flower shower trigger
  const handlePetalShower = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { x: 0.25, y: 0.7 },
        colors: ['#f7dcd5', '#eec2b7', '#fceee9', '#adbfb3', '#ffffff'],
        shapes: ['circle'],
        scalar: 1.3,
      });
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <>
      {/* State 3 Trigger: Floating Pill Button in Bottom Left Corner */}
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-40 bg-[#fffdfa]/95 backdrop-blur-md border border-blush-200/90 shadow-lg hover:shadow-xl px-4 py-2.5 rounded-full flex items-center gap-2.5 text-vintage-ink transition-all group"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blush-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blush-500"></span>
        </span>
        <Heart className="w-4 h-4 text-blush-500 fill-blush-400 group-hover:scale-110 transition-transform" />
        <span className="font-serif italic text-sm text-[#473b33] font-medium tracking-wide">
          There's more here
        </span>
      </motion.button>

      {/* Floating Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop on mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="fixed inset-0 bg-black/25 backdrop-blur-xs z-40 md:hidden"
            />

            {/* Sidebar Container */}
            <motion.aside
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 bottom-0 left-0 w-full sm:w-[420px] max-w-[90vw] bg-[#fdfbf7]/95 backdrop-blur-lg border-r border-[#e5dacb] shadow-2xl z-50 flex flex-col overflow-hidden"
            >
              {/* Sidebar Header */}
              <div className="p-5 border-b border-[#eee4d6] flex items-center justify-between bg-[#faf5ec]/70">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blush-400" />
                  <h3 className="font-serif font-bold text-lg text-vintage-ink">
                    Hidden Treasures
                  </h3>
                </div>
                <button
                  onClick={onToggle}
                  className="p-1.5 rounded-full text-vintage-muted hover:text-vintage-ink hover:bg-cream-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content inside Sidebar */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">

                {/* 1. "A Letter for you" - Minimalist Voice Note Player */}
                <div className="bg-[#fffdfa] rounded-2xl p-4 border border-[#e8ded0] shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Mic className="w-4 h-4 text-blush-500" />
                      <h4 className="font-serif font-semibold text-sm text-vintage-ink">
                        A Voice Note for You
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono uppercase bg-blush-100 text-blush-600 px-2 py-0.5 rounded-full">
                      Audio Memo
                    </span>
                  </div>

                  <p className="text-xs text-vintage-muted italic font-serif mb-4">
                    "A quiet voice message from my heart to yours... Press play to listen."
                  </p>

                  {/* HTML5 styled Audio Player Box */}
                  <div className="bg-[#f7f2ea] rounded-xl p-3 border border-[#ded2c1] flex items-center gap-3">
                    <button
                      onClick={handleToggleVoice}
                      className="w-10 h-10 rounded-full bg-blush-400 hover:bg-blush-500 text-white flex items-center justify-center shadow-md active:scale-95 transition-all flex-shrink-0"
                    >
                      {isPlayingVoiceNote ? (
                        <Pause className="w-4 h-4 fill-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      )}
                    </button>

                    {/* Waveform Visualization Bars */}
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex items-center gap-0.5 h-6">
                        {[4, 12, 18, 8, 22, 14, 20, 10, 16, 24, 12, 8, 18, 14, 22, 16, 10, 14, 20, 8, 12].map((height, i) => {
                          const isActive = (i / 21) * 100 <= voiceProgress;
                          return (
                            <span
                              key={i}
                              className={`w-1 rounded-full transition-all duration-200 ${
                                isActive ? 'bg-blush-400' : 'bg-[#d8cabb]'
                              } ${isPlayingVoiceNote ? 'animate-pulse' : ''}`}
                              style={{
                                height: isPlayingVoiceNote ? `${Math.max(4, (height * Math.random() * 0.8) + 4)}px` : `${height}px`,
                              }}
                            />
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-vintage-muted">
                        <span>{isPlayingVoiceNote ? `0:${Math.floor(voiceProgress * 0.45).toString().padStart(2, '0')}` : "0:00"}</span>
                        <span>0:45</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. "Your Bouquet" - Wrapped Flower Bouquet */}
                <div className="bg-[#fffdfa] rounded-2xl p-4 border border-[#e8ded0] shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Flower2 className="w-4 h-4 text-sage-600" />
                      <h4 className="font-serif font-semibold text-sm text-vintage-ink">
                        Your Bouquet
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono uppercase bg-sage-100 text-sage-600 px-2 py-0.5 rounded-full">
                      Everlasting
                    </span>
                  </div>

                  {/* Bouquet Image Card */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-inner border border-[#e5dacb] bg-[#f8f3eb] group">
                    <img
                      src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=700&q=80"
                      alt="Wrapped Bouquet of Pastel Roses and Peonies"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                      <span className="font-serif italic text-base drop-shadow-sm">
                        For {recipientName}
                      </span>
                      <span className="text-xs text-white/90 font-sans drop-shadow-sm">
                        Blush peonies, garden roses & eucalyptus
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-serif italic text-vintage-muted">
                      "A bouquet that never wilts 🌸"
                    </span>
                    <button
                      onClick={handlePetalShower}
                      className="text-xs bg-[#f4ede4] hover:bg-[#ebdccf] text-vintage-ink font-medium px-3 py-1.5 rounded-full border border-[#ded0bf] flex items-center gap-1.5 transition-colors"
                    >
                      <span>Send Petals</span>
                      <Sparkles className="w-3 h-3 text-blush-500" />
                    </button>
                  </div>
                </div>

                {/* 3. "Music Video Embed" - Synced with currently selected song */}
                <div className="bg-[#fffdfa] rounded-2xl p-4 border border-[#e8ded0] shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-red-600 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <h4 className="font-serif font-semibold text-sm text-vintage-ink truncate">
                        Music Video
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono uppercase bg-[#f5ecdf] text-vintage-muted px-2 py-0.5 rounded-full">
                      Live Sync
                    </span>
                  </div>

                  <p className="text-xs text-vintage-muted mb-2 truncate">
                    Now Syncing: <strong className="text-vintage-ink font-semibold">{activeTrack?.title}</strong> — {activeTrack?.artist}
                  </p>

                  {/* Responsive YouTube Iframe */}
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-[#ded2c1] shadow-sm bg-black">
                    {activeTrack?.youtubeId ? (
                      <iframe
                        key={activeTrack.youtubeId}
                        src={`https://www.youtube.com/embed/${activeTrack.youtubeId}?rel=0&modestbranding=1`}
                        title={`${activeTrack.title} - ${activeTrack.artist}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full border-0"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-white/60">
                        Select a track to watch video
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-[#eee4d6] bg-[#faf5ec]/70 text-center">
                <span className="text-[11px] font-serif italic text-vintage-muted">
                  Handcrafted digital mixtape & keepsake ♡
                </span>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
