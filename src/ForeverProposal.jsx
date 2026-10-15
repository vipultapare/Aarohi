import { useState } from 'react';
import { romanticAudio } from './audioHelper';

const FEELING_OPTIONS = [
  { id: 'magic', icon: '💫', text: 'You make even ordinary days feel like pure magic.' },
  { id: 'safe', icon: '🏡', text: 'You are my safe haven, my peace, and my favorite person.' },
  { id: 'flutter', icon: '💓', text: 'My heart skips a beat whenever you look at me and smile.' },
  { id: 'forever', icon: '♾️', text: 'I love you more than words or numbers could ever capture.' },
];

export default function ForeverProposal() {
  const [noPosition, setNoPosition] = useState({ top: 0, left: 0 });
  const [noAttempts, setNoAttempts] = useState(0);
  const [hasConfirmedLove, setHasConfirmedLove] = useState(() => {
    return localStorage.getItem('aarohi_love_confirmed') === 'true';
  });
  const [selectedFeelings, setSelectedFeelings] = useState([]);
  const [lovePercentage, setLovePercentage] = useState(100);
  const [customMessage, setCustomMessage] = useState(() => {
    return localStorage.getItem('aarohi_feelings_note') || '';
  });
  const [messageSaved, setMessageSaved] = useState(() => {
    return Boolean(localStorage.getItem('aarohi_feelings_note'));
  });

  const playfulMessages = [
    "Let me think... 🤔",
    "Nice try, Motu! 😜",
    "Panda is running away from this button! 😂",
    "Error 404: 'No' does not exist for my Gujju! ❌",
    "You know in your heart you love me, Panda! 💕",
    "Just click YES already, Motuuu! 🥰",
  ];

  const handleDodgingNo = () => {
    const randomX = (Math.random() - 0.5) * 220;
    const randomY = (Math.random() - 0.5) * 120;
    setNoPosition({ left: randomX, top: randomY });
    setNoAttempts((prev) => prev + 1);
  };

  const triggerBurst = () => {
    const x = window.innerWidth * (0.2 + Math.random() * 0.6);
    const y = window.innerHeight * (0.2 + Math.random() * 0.5);
    window.dispatchEvent(
      new CustomEvent('love-burst', {
        detail: { x, y }
      })
    );
  };

  const handleConfirmLove = () => {
    romanticAudio.playCelebration();
    setHasConfirmedLove(true);
    localStorage.setItem('aarohi_love_confirmed', 'true');

    triggerBurst();
    setTimeout(triggerBurst, 250);
    setTimeout(triggerBurst, 550);
  };

  const toggleFeeling = (id, e) => {
    romanticAudio.playChime();
    setSelectedFeelings((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      window.dispatchEvent(
        new CustomEvent('love-burst', {
          detail: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        })
      );
    }
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!customMessage.trim()) return;

    romanticAudio.playCelebration();
    localStorage.setItem('aarohi_feelings_note', customMessage);
    setMessageSaved(true);

    triggerBurst();
    setTimeout(triggerBurst, 300);
  };

  const handleResetNote = () => {
    romanticAudio.playChime();
    localStorage.removeItem('aarohi_feelings_note');
    setCustomMessage('');
    setMessageSaved(false);
  };

  const handleResetEntireProposal = () => {
    romanticAudio.playChime();
    localStorage.removeItem('aarohi_love_confirmed');
    localStorage.removeItem('aarohi_feelings_note');
    setHasConfirmedLove(false);
    setSelectedFeelings([]);
    setLovePercentage(100);
    setCustomMessage('');
    setMessageSaved(false);
    setNoAttempts(0);
    setNoPosition({ top: 0, left: 0 });
  };

  const getLoveMeterText = (val) => {
    if (val < 200) return "100% — My whole heart is yours! ❤️";
    if (val < 400) return `${val}% — To the moon and back a hundred times! 🌙✨`;
    if (val < 700) return `${val}% — Deeper than the deepest oceans! 🌊💖`;
    if (val < 990) return `${val}% — More than all the stars in the night sky! 🌌`;
    return "1000% INFINITY — Beyond time, space, and the whole universe! ♾️💍❤️";
  };

  return (
    <section className="proposal-section" id="the-question">
      <div className="proposal-card glass-panel glow-border">
        <div className="proposal-crown">💌</div>
        <span className="cursive-tag">From Your Heart To Mine</span>
        <h2 className="proposal-title">Aarohi, What Do You Feel For Me?</h2>
        <p className="proposal-subtitle">
          I've shared everything my heart holds for you... 
          Now tell me honestly, do you love me too, and what do you feel about us?
        </p>

        {/* Phase 1: The Initial Confession Question */}
        {!hasConfirmedLove ? (
          <div className="feeling-question-box">
            <h3 className="sub-question-title">Do you love me, my cute Panda? 💖🐼</h3>
            <div className="proposal-button-zone">
              <button
                id="yes-love-btn"
                type="button"
                className="romantic-btn yes-btn"
                onClick={handleConfirmLove}
              >
                <span>YES, I Love You So Much! 💖🥰</span>
              </button>

              <button
                id="no-love-btn"
                type="button"
                className="romantic-btn no-btn"
                onMouseEnter={handleDodgingNo}
                onClick={handleDodgingNo}
                style={{
                  transform: `translate(${noPosition.left}px, ${noPosition.top}px)`,
                  transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <span>
                  {noAttempts === 0
                    ? "Let me think... 🤔"
                    : playfulMessages[noAttempts % playfulMessages.length]}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="feelings-interactive-hub animate-scale-up">
            <div className="love-confirmed-badge">
              <span>💖 You said YES! My heart is dancing! 💖</span>
            </div>

            {/* Step 2: How She Feels - Interactive Tap Cards */}
            <div className="feelings-step">
              <h3 className="hub-step-title">
                Tap all the things you feel when you think of me:
              </h3>
              <div className="feelings-options-grid">
                {FEELING_OPTIONS.map((opt) => {
                  const isSelected = selectedFeelings.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      className={`feeling-chip-card ${isSelected ? 'selected' : ''}`}
                      onClick={(e) => toggleFeeling(opt.id, e)}
                      role="button"
                      tabIndex={0}
                    >
                      <span className="chip-icon">{opt.icon}</span>
                      <p className="chip-text">{opt.text}</p>
                      <span className="chip-check">{isSelected ? '✓' : '+'}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Interactive Love Meter Slider */}
            <div className="love-meter-step">
              <h3 className="hub-step-title">How much love is in your heart for me?</h3>
              <div className="meter-slider-container">
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={lovePercentage}
                  onChange={(e) => setLovePercentage(Number(e.target.value))}
                  className="romantic-range-slider"
                />
                <div className="meter-feedback-badge">
                  {getLoveMeterText(lovePercentage)}
                </div>
              </div>
            </div>

            {/* Step 4: Write In Her Own Words */}
            <div className="custom-note-step">
              <h3 className="hub-step-title">Tell me what you feel in your own words:</h3>
              <form onSubmit={handleSaveNote} className="love-note-form">
                <textarea
                  className="romantic-textarea"
                  rows={4}
                  placeholder="Motu, write whatever is in your heart right now... what you feel about me, our moments, or anything you want your Vipul to know ❤️"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                />

                <div className="form-actions-row">
                  <button
                    type="submit"
                    className="romantic-btn glow-btn send-note-btn"
                  >
                    <span>{messageSaved ? "Update My Note 💌" : "Send To Vipul's Heart 💌"}</span>
                  </button>

                  {messageSaved && (
                    <button
                      type="button"
                      onClick={handleResetNote}
                      className="romantic-btn glass-btn reset-note-btn"
                      title="Clear saved note"
                    >
                      <span>Clear Note 🗑️</span>
                    </button>
                  )}

                  {customMessage.trim() && (
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        `Hey Vipul ❤️ (From your Motu / Panda 🐼):\n\nHere is what I feel about you:\n"${customMessage}"\n\nLove Meter: ${getLoveMeterText(
                          lovePercentage
                        )}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="romantic-btn glass-btn share-whatsapp-btn"
                    >
                      <span>Share to WhatsApp 💬</span>
                    </a>
                  )}
                </div>
              </form>

              {messageSaved && (
                <div className="note-saved-banner">
                  <div className="saved-icon">✨ 💌 🔐</div>
                  <h4>Your message is safely sealed in my heart!</h4>
                  <p className="saved-preview">“{customMessage}”</p>
                  <p className="saved-sub">I will cherish these words forever, Aarohi ❤️</p>
                </div>
              )}
            </div>

            {/* Optional Reset Proposal Zone (Useful for testing / replaying) */}
            <div className="reset-proposal-container">
              <button
                type="button"
                onClick={handleResetEntireProposal}
                className="reset-proposal-btn"
                title="Reset answers and replay the proposal from the beginning"
              >
                🔄 Reset & Replay Proposal Question
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
