import { useState } from 'react';
import stargazingImg from './assets/memories/stargazing.jpg';
import roseImg from './assets/memories/rose.jpg';
import sunsetImg from './assets/memories/sunset.jpg';
import { romanticAudio } from './audioHelper';

const MEMORIES = [
  {
    id: 'stargazing',
    src: stargazingImg,
    title: 'Under A Sky of Endless Stars',
    caption: 'I looked up at a thousand constellations, but none of them could ever match the brilliance of your eyes.',
    dateTag: 'Infinite Moments'
  },
  {
    id: 'rose',
    src: roseImg,
    title: 'An Eternal Blossom For You',
    caption: 'Flowers fade with the passing seasons, but the love I carry for you in my heart is preserved for a lifetime.',
    dateTag: 'Everlasting Promise'
  },
  {
    id: 'sunset',
    src: sunsetImg,
    title: 'Hand In Hand Into Every Sunset',
    caption: 'No matter how turbulent the sea or how fast the world changes, holding your hand makes every sunset peaceful.',
    dateTag: 'Our Sanctuary'
  }
];

export default function MemoriesGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const openLightbox = (photo) => {
    romanticAudio.playChime();
    setSelectedPhoto(photo);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  return (
    <section className="gallery-section" id="memories">
      <div className="section-header">
        <span className="cursive-tag">Visual Poetry</span>
        <h2 className="section-title">Chapters of Our Heart</h2>
        <div className="title-divider">
          <span></span>
          <span className="divider-heart">❦</span>
          <span></span>
        </div>
        <p className="section-description">
          Every moment with you feels like a dream painted with the softest colors of happiness.
        </p>
      </div>

      <div className="memories-grid">
        {MEMORIES.map((item, idx) => (
          <div
            key={item.id}
            className="memory-card glass-panel"
            onClick={() => openLightbox(item)}
            role="button"
            tabIndex={0}
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            <div className="memory-image-container">
              <img src={item.src} alt={item.title} className="memory-img" loading="lazy" />
              <div className="memory-tag">{item.dateTag}</div>
              <div className="memory-overlay">
                <span className="overlay-icon">🔍 Tap to expand</span>
              </div>
            </div>
            <div className="memory-info">
              <h3 className="memory-title">{item.title}</h3>
              <p className="memory-caption">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <div className="lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close photo preview"
            >
              ✕
            </button>
            <img src={selectedPhoto.src} alt={selectedPhoto.title} className="lightbox-img" />
            <div className="lightbox-meta">
              <span className="lightbox-tag">{selectedPhoto.dateTag}</span>
              <h3 className="lightbox-title">{selectedPhoto.title}</h3>
              <p className="lightbox-desc">{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
