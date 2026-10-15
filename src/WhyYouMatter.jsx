import { useState } from 'react';
import { romanticAudio } from './audioHelper';

const REASONS = [
  {
    id: 1,
    emoji: '🌸',
    title: 'Your Radiant Presence',
    summary: 'The peace and comfort you bring into any room.',
    deepDetail: 'Whenever you are near me, the background noise of life simply fades away. Your presence has this rare, calming gravity that grounds me when I am overwhelmed.',
    highlight: 'My sanctuary'
  },
  {
    id: 2,
    emoji: '💫',
    title: 'The Magic of Your Smile',
    summary: 'A cure for every heavy thought or tiring day.',
    deepDetail: 'I could be having the most draining day, and then you smile—and just like that, the clouds part. Your smile is pure sunshine, and I live to see it.',
    highlight: 'Pure sunshine'
  },
  {
    id: 3,
    emoji: '🏠',
    title: 'You Are My Home',
    summary: 'The only place where I feel 100% understood.',
    deepDetail: 'With you, I never have to wear a mask or pretend to be someone else. You embrace my flaws, celebrate my quirks, and give me a safe space to just be.',
    highlight: 'Safe haven'
  },
  {
    id: 4,
    emoji: '🌟',
    title: 'Your Compassionate Heart',
    summary: 'The tender gentleness in how you treat others.',
    deepDetail: 'Your heart is so tender and full of empathy. Watching how you care for people and notice little details makes me fall in love with your soul over and over.',
    highlight: 'Golden soul'
  },
  {
    id: 5,
    emoji: '🎶',
    title: 'Your Unfiltered Laugh',
    summary: 'My absolute favorite sound in the world.',
    deepDetail: 'That genuine, belly-deep laugh of yours when something catches you off guard—it is pure joy. If I can make you laugh every single day, my life is complete.',
    highlight: 'Sweetest melody'
  },
  {
    id: 6,
    emoji: '🚀',
    title: 'Every Dream of Tomorrow',
    summary: 'Because my future is empty without you.',
    deepDetail: 'When I close my eyes and imagine the years ahead—traveling, building a cozy life, growing old—you are the center of every single daydream.',
    highlight: 'My forever'
  }
];

export default function WhyYouMatter() {
  const [activeCard, setActiveCard] = useState(null);

  const toggleCard = (id, e) => {
    romanticAudio.playChime();
    setActiveCard(activeCard === id ? null : id);
    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      window.dispatchEvent(
        new CustomEvent('love-burst', {
          detail: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        })
      );
    }
  };

  return (
    <section className="why-section" id="why-you-matter">
      <div className="section-header">
        <span className="cursive-tag">What I Feel For You</span>
        <h2 className="section-title">Why You Mean Everything To Me</h2>
        <div className="title-divider">
          <span></span>
          <span className="divider-heart">❦</span>
          <span></span>
        </div>
        <p className="section-description">
          Tap any card below to unveil the secret thoughts I carry for you every single day.
        </p>
      </div>

      <div className="reasons-grid">
        {REASONS.map((reason) => {
          const isFlipped = activeCard === reason.id;
          return (
            <div
              key={reason.id}
              className={`reason-card glass-panel ${isFlipped ? 'card-active' : ''}`}
              onClick={(e) => toggleCard(reason.id, e)}
              role="button"
              tabIndex={0}
              title="Click to reveal details"
            >
              <div className="card-top">
                <span className="card-emoji">{reason.emoji}</span>
                <span className="card-badge">{reason.highlight}</span>
              </div>
              <h3 className="card-title">{reason.title}</h3>
              <p className="card-summary">{reason.summary}</p>

              <div className={`card-deep-content ${isFlipped ? 'open' : ''}`}>
                <div className="deep-divider"></div>
                <p className="card-detail">{reason.deepDetail}</p>
              </div>

              <div className="card-footer">
                <span className="card-hint">
                  {isFlipped ? 'Tap to fold 🌸' : 'Tap to read more ✨'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
