# 🌸 Digital Mixtape & Love Letter (Songs For You)

A romantic, personalized single-page interactive React application created with **Tailwind CSS**, **Framer Motion**, and **Canvas Confetti**. Recreates the vintage floral aesthetic seen in the romantic TikTok mixtape trend (`@flowers_the_bloom`).

---

## ✨ Features & Architecture

### 1. 💌 State 1: The Sealed Envelope (Landing Screen)
* **Soft Cream Palette (`#f9f6f0`)** with subtle vignette lighting and floating watercolor petals.
* **Vintage Paper Envelope**: Features a 3D folded paper flap, postage stamp, and an embossed **Crimson Wax Seal** with a rose impression.
* **"Tap to open"**: Elegant italic serif typography with a gentle breathing pulse.
* **Floral Burst Animation**: Clicking the envelope triggers a 3D flap flip, letter reveal, and a burst of watercolor flower petals and starbursts before smoothly crossfading to the dashboard.

### 2. 📼 State 2: The Mixtape Dashboard
* **Floral Backdrop**: Semi-transparent watercolor roses, peonies, and greenery overlaid with an 85% cream tint for high readability.
* **Elevated Card**: Centered glassmorphism card with vintage paper texture and subtle gilded border.
* **Header**: `"FOR [NAME] • FROM [NAME]"` with an **Edit Names** modal to customize your names in real time, followed by the title: `"Songs for you ♡"`.
* **Hero Cassette Tape Player**:
  * Realistic retro audio cassette casing decorated with hand-painted watercolor flowers.
  * **Dual rotating reels** with sprocket teeth that physically spin when music is playing.
  * Real-time progress bar, timestamps, play/pause, next/previous controls, and volume mute toggle.
  * Center tape window showing moving magnetic tape spools.
* **Two-Column Layout**:
  * **Left Column (Tracklist)**: Curated romantic tracklist with circular sage green play buttons (`#7c9082`), animated equalizer bars, and song details.
  * **Right Column (Liner Note)**: Handwritten love letter pinned with washi tape. Includes an interactive **Personalize** button to type and save your own custom message.

### 3. 💖 State 3: Floating Interactive Sidebar ("There's more here")
* **Floating Pill Button**: Located in the bottom-left corner with a pulsating heart icon.
* **Slide-in Glass Drawer** containing:
  1. **A Voice Note for You**: Minimalist audio memo player with animated sound wave visualization bars and soothing ambient playback.
  2. **Your Bouquet**: Square card showcasing a wrapped bouquet of blush peonies, roses, and eucalyptus with an interactive **"Send Petals"** button.
  3. **Music Video Embed**: Responsive YouTube player that automatically syncs with the currently selected song from the tracklist.

---

## 🚀 How to Run Locally

```bash
# 1. Navigate to the project directory
cd digital-mixtape

# 2. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎨 How to Personalize Your Assets

You can easily replace the default assets with your own personal files:
* **Audio Voice Note**: Drop your own recorded `.mp3` file into `public/voice-note.mp3`.
* **Bouquet Photo**: Place your flower photo in `public/bouquet.jpg` and reference `/bouquet.jpg` in `src/components/FloatingSidebar.jsx`.
* **Custom Songs**: Edit `src/data/songs.js` to change the track titles, artists, and YouTube video IDs.
