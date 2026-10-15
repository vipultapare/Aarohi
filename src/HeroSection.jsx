import { useState } from 'react';
import { romanticAudio } from './audioHelper';
import ourGhibliPortrait from './assets/our_ghibli_portrait.jpg';

export default function HeroSection() {
  const [heartbeats, setHeartbeats] = useState(0);
  const [isBeating, setIsBeating] = useState(false);

  const triggerHeartbeat = (e) => {
    romanticAudio.playChime();
    setIsBeating(true);
    setHeartbeats((prev) => prev + 1);

    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      window.dispatchEvent(
        new CustomEvent('love-burst', {
          detail: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        })
      );
    }

    setTimeout(() => setIsBeating(false), 300);
  };

  const triggerPhotoSparkle = (e) => {
    romanticAudio.playCelebration();
    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      window.dispatchEvent(
        new CustomEvent('love-burst', {
          detail: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        })
      );
    }
  };

  const getHeartbeatMessage = () => {
    if (heartbeats === 0) return "Tap the glowing heart to send a beat ❤️";
    if (heartbeats < 5) return `My heart has skipped ${heartbeats} beats for you! 💓`;
    if (heartbeats < 10) return `You make my heart flutter uncontrollably! 🥰`;
    if (heartbeats < 20) return `Every single beat belongs completely to you, Aarohi! ✨`;
    return `Infinite love unlocked! You are my forever and always! 💖♾️`;
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-sparkle">✨</span>
          <span>To The Most Beautiful Girl In The Universe</span>
          <span className="badge-sparkle">✨</span>
        </div>

        <h1 className="hero-title">
          Aarohi, <span className="highlight-gradient">I Love You.</span>
        </h1>

        <div className="hero-grid-showcase">
          {/* Featured Ghibli Portrait Frame */}
          <div
            className="portrait-showcase-card glass-panel glow-border"
            onClick={triggerPhotoSparkle}
            role="button"
            tabIndex={0}
            title="Aarohi & Vipul - Tap to shower love ✨"
          >
            <div className="portrait-image-wrapper">
              <img
                src={ourGhibliPortrait}
                alt="Aarohi and Vipul Ghibli Portrait"
                className="portrait-featured-img"
              />
              <div className="portrait-heart-badge">💖</div>
              <div className="portrait-interactive-overlay">
                <span>✨ Tap to shower our love ✨</span>
              </div>
            </div>
            <div className="portrait-meta">
              <p className="portrait-caption-cursive">
                “With you, life feels like our very own Ghibli story.”
              </p>
              <div className="portrait-nicknames-row">
                <span className="nickname-tag">🐼 My Panda</span>
                <span className="nickname-tag">💖 Motu</span>
                <span className="nickname-tag">🌸 Sweet Gujju</span>
              </div>
            </div>
          </div>

          {/* Declaration, Heartbeat Widget & Navigation */}
          <div className="hero-interactive-column">
            <p className="hero-poetic">
              “In a world of eight billion people, you are the only one my heart seeks. 
              You are not just a part of my life; you are the reason it shines so brightly.”
            </p>

            {/* Interactive glowing heart beat machine */}
            <div
              className="heartbeat-widget"
              onClick={triggerHeartbeat}
              role="button"
              tabIndex={0}
              title="Tap to send a heartbeat"
            >
              <div className={`pulsing-heart ${isBeating ? 'beat-active' : ''}`}>
                ❤️
              </div>
              <div className="heart-glow-ring"></div>
            </div>

            <div className="heartbeat-stats">
              <p className="heartbeat-message">{getHeartbeatMessage()}</p>
              <div className="heartbeat-pill">
                <span>Heartbeats sent: <strong>{heartbeats}</strong></span>
              </div>
            </div>

            <div className="hero-cta-group">
              <a href="#heartfelt-letter" className="romantic-btn glow-btn">
                <span>Read My Letter 📜</span>
              </a>
              <a href="#why-you-matter" className="romantic-btn glass-btn">
                <span>Why You Matter ✨</span>
              </a>
              <a href="#the-question" className="romantic-btn special-btn">
                <span>What Do You Feel? 💌</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
