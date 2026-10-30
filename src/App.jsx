import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EnvelopeScreen from './components/EnvelopeScreen';
import MixtapeDashboard from './components/MixtapeDashboard';
import FloatingSidebar from './components/FloatingSidebar';
import PetalBackground from './components/PetalBackground';
import { INITIAL_TRACKS, DEFAULT_LETTER } from './data/songs';

export default function App() {
  // State 1 vs State 2
  const [isOpened, setIsOpened] = useState(false);

  // Active track & playback state
  const [tracks] = useState(INITIAL_TRACKS);
  const [activeTrack, setActiveTrack] = useState(INITIAL_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Floating Sidebar (State 3)
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Personalized Names and Letter
  const [recipientName, setRecipientName] = useState("My Love");
  const [senderName, setSenderName] = useState("Forever Yours");
  const [letterText, setLetterText] = useState(DEFAULT_LETTER);

  return (
    <div className="relative min-h-screen w-full bg-[#f9f6f0] text-vintage-ink selection:bg-blush-200">
      {/* Floating Animated Petals background */}
      <PetalBackground count={isOpened ? 20 : 12} />

      {/* Main Screen Transition between Sealed Envelope & Mixtape Dashboard */}
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="sealed-envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full"
          >
            <EnvelopeScreen
              onOpen={() => setIsOpened(true)}
              recipientName={recipientName}
              senderName={senderName}
            />
          </motion.div>
        ) : (
          <motion.div
            key="mixtape-dashboard"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <MixtapeDashboard
              tracks={tracks}
              activeTrack={activeTrack}
              setActiveTrack={setActiveTrack}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              letterText={letterText}
              setLetterText={setLetterText}
              recipientName={recipientName}
              setRecipientName={setRecipientName}
              senderName={senderName}
              setSenderName={setSenderName}
              onResealEnvelope={() => {
                setIsPlaying(false);
                setIsOpened(false);
                setIsSidebarVisible(false);
              }}
            />

            {/* State 3: Floating Widget / Sidebar */}
            <FloatingSidebar
              isOpen={isSidebarVisible}
              onToggle={() => setIsSidebarVisible(!isSidebarVisible)}
              activeTrack={activeTrack}
              recipientName={recipientName}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
