import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';

export default function EnvelopeScreen({ onOpen, recipientName = "My Love", senderName = "Yours" }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleEnvelopeClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Launch romantic floral petal confetti burst
    try {
      // Petals burst
      confetti({
        particleCount: 45,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#f7dcd5', '#eec2b7', '#e09e90', '#d0ddd4', '#ffffff', '#c5a059'],
        shapes: ['circle'],
        scalar: 1.2,
        ticks: 200,
        gravity: 0.8,
      });

      setTimeout(() => {
        confetti({
          particleCount: 30,
          spread: 120,
          origin: { y: 0.5, x: 0.4 },
          colors: ['#fceee9', '#f7dcd5', '#adbfb3', '#ffffff'],
          shapes: ['circle'],
          scalar: 1.4,
          ticks: 220,
        });
        confetti({
          particleCount: 30,
          spread: 120,
          origin: { y: 0.5, x: 0.6 },
          colors: ['#fceee9', '#f7dcd5', '#adbfb3', '#ffffff'],
          shapes: ['circle'],
          scalar: 1.4,
          ticks: 220,
        });
      }, 250);
    } catch (e) {
      console.warn("Confetti error:", e);
    }

    // Delay slightly to enjoy the envelope opening animation before switching state
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#f9f6f0] px-4 overflow-hidden select-none">
      {/* Subtle vintage vignette and paper grain */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(197,180,159,0.2)_100%)]" />

      {/* Background floral watercolor flourishes */}
      <div className="absolute top-10 left-10 opacity-30 pointer-events-none hidden md:block">
        <svg width="180" height="180" viewBox="0 0 200 200" fill="none">
          <path d="M40,160 Q80,100 150,80 Q90,140 40,160" fill="#adbfb3" opacity="0.6"/>
          <circle cx="150" cy="80" r="30" fill="#f7dcd5" opacity="0.7"/>
          <circle cx="130" cy="65" r="24" fill="#eec2b7" opacity="0.8"/>
          <circle cx="165" cy="95" r="18" fill="#ffffff" opacity="0.9"/>
        </svg>
      </div>

      <div className="absolute bottom-10 right-10 opacity-30 pointer-events-none hidden md:block">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <circle cx="80" cy="120" r="35" fill="#f7dcd5" opacity="0.7"/>
          <circle cx="110" cy="100" r="28" fill="#eec2b7" opacity="0.8"/>
          <path d="M30,170 Q90,120 140,130" stroke="#7c9082" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </svg>
      </div>

      {/* Main Interactive Envelope Container */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Envelope 3D Wrapper */}
        <motion.div
          onClick={handleEnvelopeClick}
          whileHover={{ scale: isOpening ? 1 : 1.025, y: isOpening ? 0 : -4 }}
          whileTap={{ scale: 0.98 }}
          className="relative cursor-pointer group"
          style={{ perspective: '1200px' }}
        >
          {/* Soft shadow under envelope */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-vintage-ink/10 rounded-full blur-xl transition-all duration-300 group-hover:w-[90%] group-hover:bg-vintage-ink/15" />

          {/* Envelope Body */}
          <div className="relative w-[340px] sm:w-[420px] md:w-[460px] h-[240px] sm:h-[280px] bg-[#f5ede0] rounded-lg shadow-xl overflow-visible border border-[#e2d5c3] flex flex-col justify-between">
            {/* Vintage postal stamp in corner */}
            <div className="absolute top-4 right-5 z-20 flex flex-col items-end">
              <div className="w-12 h-14 border-2 border-dashed border-[#b89f82] bg-[#fcf9f2] p-1 shadow-sm flex flex-col items-center justify-center">
                <span className="text-[9px] uppercase tracking-wider text-sage-500 font-serif">Air Mail</span>
                <Heart className="w-4 h-4 text-blush-400 fill-blush-300 my-0.5" />
                <span className="text-[8px] text-vintage-muted">♥ 2026</span>
              </div>
              {/* Postmark stamp curves */}
              <div className="w-14 h-4 -mt-2 opacity-50 border-t border-b border-vintage-muted -rotate-12 pointer-events-none" />
            </div>

            {/* Handwritten Address on Envelope */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 z-10 pointer-events-none">
              <span className="font-script text-2xl sm:text-3xl text-vintage-ink/85 tracking-wide drop-shadow-sm">
                For {recipientName}
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-vintage-muted font-sans mt-1">
                Special Delivery • Handcrafted with love
              </span>
            </div>

            {/* Folded Paper Envelope Flaps Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 460 280"
              preserveAspectRatio="none"
            >
              {/* Left flap triangle */}
              <polygon points="0,0 230,160 0,280" fill="#efe4d3" opacity="0.45" />
              {/* Right flap triangle */}
              <polygon points="460,0 230,160 460,280" fill="#efe4d3" opacity="0.45" />
              {/* Bottom flap triangle */}
              <polygon points="0,280 230,150 460,280" fill="#f8f1e6" opacity="0.8" />
              {/* Fine seam lines */}
              <line x1="0" y1="280" x2="230" y2="150" stroke="#d8cabb" strokeWidth="1" />
              <line x1="460" y1="280" x2="230" y2="150" stroke="#d8cabb" strokeWidth="1" />
            </svg>

            {/* Letter peek out when opening */}
            <motion.div
              className="absolute left-6 right-6 h-44 bg-[#fffdf9] rounded-md border border-[#e8ded0] p-4 shadow-md z-0 flex flex-col items-center justify-center text-center"
              initial={{ y: 20 }}
              animate={isOpening ? { y: -80, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="font-serif italic text-vintage-ink text-sm sm:text-base">
                "Here is my heart in musical notes..."
              </span>
              <span className="text-xs text-blush-400 font-script text-lg mt-2">
                — {senderName}
              </span>
            </motion.div>

            {/* Top Envelope Flap (3D Flips open on click) */}
            <motion.div
              className="absolute top-0 left-0 w-full origin-top z-30"
              initial={false}
              animate={isOpening ? { rotateX: -160, zIndex: 5 } : { rotateX: 0, zIndex: 30 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <svg
                viewBox="0 0 460 160"
                className="w-full h-auto drop-shadow-sm"
                preserveAspectRatio="none"
              >
                <polygon
                  points="0,0 460,0 230,160"
                  fill="#f2e6d5"
                  stroke="#dbcebe"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Crimson Wax Seal with Rose Impression */}
              <div className="absolute top-[125px] sm:top-[145px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
                <motion.div
                  animate={isOpening ? { scale: 0.8, opacity: 0 } : { scale: [1, 1.04, 1] }}
                  transition={{ repeat: isOpening ? 0 : Infinity, duration: 3.5, ease: "easeInOut" }}
                  className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#a63039] via-[#8c232b] to-[#63141b] flex items-center justify-center wax-seal-shadow border border-[#bf434d]/60 cursor-pointer group-hover:brightness-110"
                >
                  {/* Wax rim texture */}
                  <div className="absolute inset-1 rounded-full border border-[#f5b8b8]/20 pointer-events-none" />
                  
                  {/* Embossed Rose Seal Stamp */}
                  <svg
                    viewBox="0 0 32 32"
                    className="w-8 h-8 sm:w-9 sm:h-9 text-[#fadcdd] fill-current drop-shadow"
                  >
                    <path d="M16 4 C13 4 10 7 10 10 C10 12 11 13 12 14 C9 15 7 18 8 21 C9 24 12 26 16 26 C20 26 23 24 24 21 C25 18 23 15 20 14 C21 13 22 12 22 10 C22 7 19 4 16 4 Z" opacity="0.9" />
                    <circle cx="16" cy="14" r="3" fill="#ffebeb" />
                    <path d="M14 17 Q16 20 18 17" stroke="#63141b" strokeWidth="1" fill="none" />
                  </svg>
                  
                  {/* Gold leaf shimmer accent */}
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#fde047] opacity-60 blur-[1px]" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Text Below Envelope: "Tap to open" */}
        <motion.div
          className="mt-10 sm:mt-12 flex flex-col items-center cursor-pointer"
          onClick={handleEnvelopeClick}
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-2 text-vintage-ink/75 group">
            <Sparkles className="w-4 h-4 text-blush-400 animate-pulse" />
            <span className="font-serif italic text-lg sm:text-xl text-[#4a3f37] tracking-wider group-hover:text-blush-500 transition-colors">
              Tap to open
            </span>
            <Sparkles className="w-4 h-4 text-blush-400 animate-pulse" />
          </div>
          <span className="text-[11px] uppercase tracking-widest text-vintage-muted/70 font-sans mt-1">
            A romantic surprise awaits inside
          </span>
        </motion.div>
      </motion.div>

      {/* Flower Explosion Bloom Overlay during transition */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Expanding radial floral glow */}
            <motion.div
              className="w-[120vw] h-[120vw] rounded-full bg-gradient-to-r from-blush-100/90 via-[#fdfbf7]/95 to-blush-200/80 backdrop-blur-sm"
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: 2.2, opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
            />
            {/* Blooming watercolor floral icons in 4 corners */}
            <motion.div
              className="absolute text-center flex flex-col items-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="text-4xl">🌸</span>
              <span className="font-serif italic text-2xl text-vintage-ink mt-2">Opening your mixtape...</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
