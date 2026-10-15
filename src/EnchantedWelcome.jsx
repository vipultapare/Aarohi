import { useState } from 'react';
import { romanticAudio } from './audioHelper';

export default function EnchantedWelcome({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    romanticAudio.playCelebration();
    romanticAudio.start();

    // Burst hearts from center
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    window.dispatchEvent(
      new CustomEvent('love-burst', {
        detail: { x, y }
      })
    );

    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <div className={`welcome-overlay ${isOpening ? 'fade-out' : ''}`}>
      <div className="welcome-card glass-panel glow-border">
        <div className="welcome-tag">✨ A Personal Message Just For You ✨</div>

        <div className="envelope-graphic">
          <div className="envelope-heart-seal" onClick={handleOpen} role="button" tabIndex={0}>
            <span className="heart-pulse-icon">💌</span>
            <div className="pulse-ripple"></div>
            <div className="pulse-ripple delay"></div>
          </div>
        </div>

        <h1 className="welcome-headline">For My Dearest Aarohi</h1>
        <div className="welcome-nicknames-pill">
          <span>🐼 Panda</span> • <span>💖 Motu</span> • <span>🌸 Gujju</span>
        </div>
        <p className="welcome-subtext">
          I created this little corner of the digital universe exclusively for you, my favorite person in the whole world...
        </p>

        <button
          id="open-letter-welcome-btn"
          type="button"
          className="romantic-btn main-open-btn glow-btn"
          onClick={handleOpen}
        >
          <span>Tap To Open My Heart ❤️</span>
        </button>

        <p className="welcome-audio-tip">
          🎧 Includes soothing ambient romantic melody
        </p>
      </div>
    </div>
  );
}
