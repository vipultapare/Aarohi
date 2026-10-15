import { useState } from 'react';
import { romanticAudio } from './audioHelper';

export default function OurSpecialSong() {
  const [hasTriggeredBurst, setHasTriggeredBurst] = useState(false);

  const handlePauseAmbientMusic = () => {
    if (romanticAudio.isPlaying) {
      romanticAudio.stop();
    }
    if (!hasTriggeredBurst) {
      setHasTriggeredBurst(true);
      window.dispatchEvent(
        new CustomEvent('love-burst', {
          detail: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
        })
      );
    }
  };

  return (
    <section className="special-song-section" id="our-song">
      <div className="section-header">
        <span className="cursive-tag">The Melody of My Heart 🎵</span>
        <h2 className="section-title">The Song My Heart Sings For You</h2>
        <div className="title-divider">
          <span></span>
          <span className="divider-heart">❦</span>
          <span></span>
        </div>
        <p className="section-description">
          I don't know why, but whenever I think about you, my mind softly hums this song...
        </p>
      </div>

      <div className="song-showcase-card glass-panel glow-border">
        {/* The Golden Lyric Banner */}
        <div className="lyric-quote-banner">
          <div className="lyric-music-icon">🎶</div>
          <p className="lyric-gujarati-highlight">
            “Jo Tu Nahi Hashe, Andhaar Ghero Che...”
          </p>
          <p className="lyric-translation">
            (If you are not with me, it is deep darkness all around...)
          </p>
          <div className="lyric-truth-tag">
            <span>✨ And this is the purest truth, Aarohi ✨</span>
          </div>
          <p className="lyric-personal-note">
            Without you in my life, everything feels dull and quiet. 
            You are the gentle light that brightens my entire world, my sweet Gujju.
          </p>
        </div>

        {/* The Video Player Viewer */}
        <div className="video-player-frame" onClick={handlePauseAmbientMusic}>
          <div className="video-aspect-box">
            <iframe
              src="https://www.youtube-nocookie.com/embed/lKml0bQT63k?rel=0&modestbranding=1"
              title="Our Special Song - Jo Tu Nahi Hashe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="youtube-iframe"
            />
          </div>
          <div className="video-caption-bar">
            <span>🎧 Press Play & Listen to what my heart feels for you</span>
          </div>
        </div>
      </div>
    </section>
  );
}
