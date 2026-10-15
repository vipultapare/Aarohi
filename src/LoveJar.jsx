import { useState } from 'react';
import { romanticAudio } from './audioHelper';

const LOVE_NOTES = [
  "The way your eyes crinkle with genuine joy when you laugh.",
  "How you make even the most ordinary moments feel like an adventure.",
  "Your warm, gentle kindness that melts away my stress in seconds.",
  "How safe and peaceful I feel just holding your hand.",
  "The way you remember tiny details about the things I love.",
  "Your voice is my favorite sound; it turns any bad day into a calm one.",
  "How passionate and determined you are when you care about something.",
  "Your sweet smile that always catches me off-guard and makes my heart race.",
  "How you make me laugh harder than anyone else in the world.",
  "The gentle warmth of your hugs when I need them the most.",
  "You inspire me to grow, dream bigger, and become a better person.",
  "The way you look at me like I am the only person in the room.",
  "How comfortable we are in silence together; no words needed.",
  "Your empathy and the beautiful, caring heart you share with the world.",
  "The cute little habits you have that make you uniquely, perfectly you.",
  "How proud I am every single time I get to call you mine.",
  "The way we can talk about silly nonsense for hours without getting bored.",
  "Because loving you is the easiest and most natural thing I have ever done.",
  "Because in a chaotic universe, finding you was the most miraculous thing.",
  "No matter how many times I tease you as my Motu, you will always be the most gorgeous girl in every room. 💖",
  "The adorable way my cute Panda pouts and laughs—you completely melt my heart every single time. 🐼",
  "My sweet Gujju who stole my whole heart and made my life ten thousand times brighter. 🌸",
  "How lucky and blessed I feel every single day to have my favorite Panda by my side. 🐼❤️"
];

export default function LoveJar() {
  const [currentNote, setCurrentNote] = useState(
    "Click the jar to pick a note written from my heart to you..."
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [noteCount, setNoteCount] = useState(0);

  const pullNewNote = (e) => {
    romanticAudio.playChime();
    setIsAnimating(true);

    // Trigger subtle confetti from button
    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      window.dispatchEvent(
        new CustomEvent('love-burst', {
          detail: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        })
      );
    }

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * LOVE_NOTES.length);
      setCurrentNote(LOVE_NOTES[randomIndex]);
      setNoteCount((prev) => prev + 1);
      setIsAnimating(false);
    }, 280);
  };

  return (
    <div className="love-jar-container">
      <div className="love-jar-card glass-panel">
        <div className="jar-badge">💌 A Jar of 1000 Reasons</div>
        <h3 className="jar-title">Reasons Why You Are My World</h3>
        <p className="jar-subtitle">
          Whenever you need a reminder of how cherished you are, reach into this little jar.
        </p>

        <div className="jar-icon-wrapper" onClick={pullNewNote} role="button" tabIndex={0} title="Click to draw a note">
          <div className="jar-glow-halo"></div>
          <div className="jar-visual">
            <span className="jar-emoji">🏺</span>
            <span className="jar-floating-heart">💖</span>
            <span className="jar-sparkle-1">✨</span>
            <span className="jar-sparkle-2">🌸</span>
          </div>
        </div>

        <div className={`love-note-parchment ${isAnimating ? 'note-flip' : ''}`}>
          <div className="note-quote-mark">“</div>
          <p className="note-text">{currentNote}</p>
          <div className="note-quote-mark end">”</div>
        </div>

        <div className="jar-actions">
          <button
            id="pull-love-note-btn"
            type="button"
            className="romantic-btn glow-btn"
            onClick={pullNewNote}
          >
            <span>Pick Another Reason 💖</span>
          </button>
          {noteCount > 0 && (
            <span className="note-counter-pill">
              Notes opened: {noteCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
