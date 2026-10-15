import { useState } from 'react';
import { romanticAudio } from './audioHelper';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const [showSecret, setShowSecret] = useState(false);

  const toggleSecret = (e) => {
    romanticAudio.playChime();
    setShowSecret(!showSecret);
    if (!showSecret && e) {
      const rect = e.currentTarget.getBoundingClientRect();
      window.dispatchEvent(
        new CustomEvent('love-burst', {
          detail: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        })
      );
    }
  };

  return (
    <footer className="romantic-footer">
      <div className="footer-glow"></div>
      <div className="footer-content">
        <p className="footer-quote">
          “You are my sun, my moon, and all of my stars.”
        </p>

        <div className="footer-tag">
          Handcrafted with pure love exclusively for Aarohi ❤️
        </div>

        <button
          type="button"
          className="secret-whisper-btn"
          onClick={toggleSecret}
        >
          <span>🤫 Pssst... click for a secret confession</span>
        </button>

        {showSecret && (
          <div className="secret-dialog glass-panel animate-scale-up">
            <p className="secret-title">A Little Secret Just For You:</p>
            <p className="secret-body">
              Whenever my phone lights up, no matter what I am doing, I secretly cross my fingers 
              hoping it's a message from you. You make even the simplest day feel like magic, Aarohi.
            </p>
            <button
              type="button"
              className="secret-close-btn"
              onClick={() => setShowSecret(false)}
            >
              Keep safe in my heart 🔐
            </button>
          </div>
        )}

        <div className="footer-copyright">
          © {CURRENT_YEAR} Forever & Always. All my heart is yours.
        </div>
      </div>
    </footer>
  );
}
