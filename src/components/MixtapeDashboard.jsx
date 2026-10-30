import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Edit2, RotateCcw, Volume2, Sparkles } from 'lucide-react';
import CassetteTape from './CassetteTape';
import Tracklist from './Tracklist';
import LinerNote from './LinerNote';
import NameCustomizerModal from './NameCustomizerModal';

export default function MixtapeDashboard({
  tracks,
  activeTrack,
  setActiveTrack,
  isPlaying,
  setIsPlaying,
  letterText,
  setLetterText,
  recipientName,
  setRecipientName,
  senderName,
  setSenderName,
  onResealEnvelope,
}) {
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [progress, setProgress] = useState(25);
  const [currentTime, setCurrentTime] = useState("1:12");
  const [isMuted, setIsMuted] = useState(false);

  // Advance progress simulation while playing
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Auto advance next track
            handleNextTrack();
            return 0;
          }
          return prev + 0.8;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeTrack]);

  // Update current time string according to progress
  useEffect(() => {
    // calculate approx seconds
    const totalSeconds = 210; // ~3:30 min average
    const currentSecs = Math.floor((progress / 100) * totalSeconds);
    const mins = Math.floor(currentSecs / 60);
    const secs = currentSecs % 60;
    setCurrentTime(`${mins}:${secs.toString().padStart(2, '0')}`);
  }, [progress]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    const currentIndex = tracks.findIndex((t) => t.id === activeTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setActiveTrack(tracks[nextIndex]);
    setProgress(0);
  };

  const handlePrevTrack = () => {
    const currentIndex = tracks.findIndex((t) => t.id === activeTrack.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setActiveTrack(tracks[prevIndex]);
    setProgress(0);
  };

  const handleSelectTrack = (track) => {
    setActiveTrack(track);
    setIsPlaying(true);
    setProgress(0);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start py-8 sm:py-12 px-4 sm:px-6">
      {/* Background Floral Wallpaper Pattern */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1600&q=80')`,
          filter: 'saturate(0.7) blur(1px)',
        }}
      />
      {/* Cream Tint Overlay for Crisp Readability */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[#f9f6f0]/88 backdrop-blur-[1px]" />

      {/* Main Elevated Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl bg-[#fffdf9]/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-[#e8ded0] shadow-2xl vintage-shadow"
      >
        {/* Top Utility Bar: Reseal Envelope & Customize Names */}
        <div className="flex items-center justify-between pb-4 border-b border-[#eee4d6] mb-6">
          <button
            onClick={onResealEnvelope}
            className="flex items-center gap-1.5 text-xs text-vintage-muted hover:text-vintage-ink transition-colors px-3 py-1.5 rounded-full bg-[#f6eee3] hover:bg-[#ebdccf] border border-[#ded0bf]"
          >
            <RotateCcw className="w-3.5 h-3.5 text-blush-500" />
            <span className="font-serif italic">Reseal Envelope</span>
          </button>

          <button
            onClick={() => setIsNameModalOpen(true)}
            className="flex items-center gap-1.5 text-xs text-vintage-muted hover:text-vintage-ink transition-colors px-3 py-1.5 rounded-full bg-[#f6eee3] hover:bg-[#ebdccf] border border-[#ded0bf]"
          >
            <Edit2 className="w-3.5 h-3.5 text-sage-600" />
            <span className="font-sans font-medium">Edit Names</span>
          </button>
        </div>

        {/* Header Section */}
        <header className="text-center mb-8 sm:mb-10">
          {/* Small spaced-out uppercase header */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blush-50 border border-blush-200/60 mb-2">
            <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.25em] text-[#735c4e] font-semibold">
              FOR {recipientName.toUpperCase()} • FROM {senderName.toUpperCase()}
            </span>
          </div>

          {/* Large elegant serif title */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#362b25] tracking-tight mt-1 flex items-center justify-center gap-3">
            <span className="italic font-normal">Songs</span> for you
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-blush-400 fill-blush-300 inline-block drop-shadow-sm" />
          </h1>

          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="h-[1px] w-12 bg-[#dfd2c0]" />
            <span className="font-serif italic text-xs sm:text-sm text-vintage-muted">
              Side A • A romantic digital mixtape
            </span>
            <span className="h-[1px] w-12 bg-[#dfd2c0]" />
          </div>
        </header>

        {/* Hero Section: Vintage Cassette Player */}
        <section className="mb-10">
          <CassetteTape
            activeTrack={activeTrack}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            onPrevTrack={handlePrevTrack}
            onNextTrack={handleNextTrack}
            progress={progress}
            currentTime={currentTime}
            duration={activeTrack?.duration || "3:30"}
            isMuted={isMuted}
            onToggleMute={() => setIsMuted(!isMuted)}
          />
        </section>

        {/* Content Layout: Two Columns (Tracklist & Liner Note) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Left Column: Tracklist */}
          <Tracklist
            tracks={tracks}
            activeTrack={activeTrack}
            isPlaying={isPlaying}
            onSelectTrack={handleSelectTrack}
            onTogglePlay={handleTogglePlay}
          />

          {/* Right Column: Liner Note */}
          <LinerNote
            letterText={letterText}
            onSaveLetter={setLetterText}
            senderName={senderName}
          />
        </section>

        {/* Card Footer: Subtle quote & aesthetic stamp */}
        <footer className="mt-10 pt-6 border-t border-[#eee4d6] text-center text-xs text-vintage-muted/80 flex flex-col sm:flex-row items-center justify-between gap-3 font-serif italic">
          <span>"Music is the language of the quiet feelings we cannot say out loud."</span>
          <span className="font-sans text-[11px] uppercase tracking-widest text-[#9c897a] not-italic">
            Vintage Mixtape Edition
          </span>
        </footer>
      </motion.div>

      {/* Name Customizer Modal */}
      <NameCustomizerModal
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        recipientName={recipientName}
        senderName={senderName}
        onSave={(rec, snd) => {
          setRecipientName(rec);
          setSenderName(snd);
        }}
      />
    </div>
  );
}
