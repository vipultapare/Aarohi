import { useState, useEffect } from 'react';
import { romanticAudio } from './audioHelper';

export default function MusicControl() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check state periodically or keep sync
    const checkState = () => {
      setIsPlaying(romanticAudio.isPlaying);
    };
    const timer = setInterval(checkState, 600);
    return () => clearInterval(timer);
  }, []);

  const handleToggle = () => {
    const newState = romanticAudio.toggle();
    setIsPlaying(newState);
  };

  const handleBurst = (e) => {
    romanticAudio.playChime();
    const rect = e.currentTarget.getBoundingClientRect();
    window.dispatchEvent(
      new CustomEvent('love-burst', {
        detail: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      })
    );
  };

  return (
    <header className="floating-nav-bar">
      <div className="nav-brand">
        <span className="brand-heart">💖</span>
        <span className="brand-name">Aarohi & Me</span>
      </div>

      <div className="nav-controls">
        <button
          type="button"
          className="nav-sparkle-btn"
          onClick={handleBurst}
          title="Shower hearts"
        >
          <span>✨ Shower Hearts</span>
        </button>

        <button
          id="music-toggle-btn"
          type="button"
          className={`nav-music-pill ${isPlaying ? 'music-playing' : ''}`}
          onClick={handleToggle}
          title={isPlaying ? 'Pause romantic ambient melody' : 'Play romantic ambient melody'}
        >
          <span className="music-icon">{isPlaying ? '🎵' : '🔇'}</span>
          <span className="music-label">{isPlaying ? 'Melody Playing' : 'Play Music'}</span>
          {isPlaying && (
            <div className="equalizer-bars">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </button>
      </div>
    </header>
  );
}
