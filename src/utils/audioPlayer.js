// Utility for romantic ambient music and voice note preview
let audioCtx = null;
let isPlayingSynth = false;
let synthInterval = null;

export function playRomanticMelody() {
  if (isPlayingSynth) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isPlayingSynth = true;

    // Soft music box / Rhodes piano notes (pentatonic romantic chords in E major / C# minor)
    // E4, G#4, B4, E5, D#5, C#5, B4, G#4
    const notes = [329.63, 415.30, 493.88, 659.25, 622.25, 554.37, 493.88, 415.30];
    let noteIdx = 0;

    const playNote = () => {
      if (!isPlayingSynth || !audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      const freq = notes[noteIdx % notes.length];
      noteIdx++;

      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // Soft gentle envelope
      gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 1.3);
    };

    playNote();
    synthInterval = setInterval(playNote, 500);
  } catch (err) {
    console.warn("Audio Context playback error:", err);
  }
}

export function stopRomanticMelody() {
  isPlayingSynth = false;
  if (synthInterval) {
    clearInterval(synthInterval);
    synthInterval = null;
  }
}
