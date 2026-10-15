import { useState, useEffect } from 'react';

const PROPOSAL_DATE_DEFAULT = '2026-06-03';

export default function LoveCounter() {
  const [startDate, setStartDate] = useState(() => {
    const saved = localStorage.getItem('aarohi_love_date');
    // If previously saved default from before the user specified, upgrade to June 3, 2026
    if (saved && saved !== '2026-02-15') {
      return saved;
    }
    localStorage.setItem('aarohi_love_date', PROPOSAL_DATE_DEFAULT);
    return PROPOSAL_DATE_DEFAULT;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempDate, setTempDate] = useState(startDate);

  const [timeUnits, setTimeUnits] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeUnits({
        days,
        hours,
        minutes,
        seconds,
        totalSeconds: Math.floor(diff / 1000),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  const handleSaveDate = (e) => {
    e.preventDefault();
    setStartDate(tempDate);
    localStorage.setItem('aarohi_love_date', tempDate);
    setIsEditing(false);
  };

  return (
    <div className="love-counter-wrapper glass-panel">
      <div className="counter-badge">💍 Since The Day I Asked You To Be Mine</div>
      <h3 className="counter-title">Every Second Since 3rd June 2026</h3>
      <p className="counter-subtitle">
        On June 3rd, 2026, I asked you to be mine. Since that magical day, 
        every single tick of this clock has belonged completely to you, Aarohi.
      </p>

      <div className="timer-grid">
        <div className="timer-box">
          <span className="timer-number">{timeUnits.days}</span>
          <span className="timer-label">Days</span>
        </div>
        <div className="timer-separator">:</div>
        <div className="timer-box">
          <span className="timer-number">
            {String(timeUnits.hours).padStart(2, '0')}
          </span>
          <span className="timer-label">Hours</span>
        </div>
        <div className="timer-separator">:</div>
        <div className="timer-box">
          <span className="timer-number">
            {String(timeUnits.minutes).padStart(2, '0')}
          </span>
          <span className="timer-label">Minutes</span>
        </div>
        <div className="timer-separator">:</div>
        <div className="timer-box accent-box">
          <span className="timer-number animate-pulse-num">
            {String(timeUnits.seconds).padStart(2, '0')}
          </span>
          <span className="timer-label">Seconds</span>
        </div>
      </div>

      <div className="counter-total-ticker">
        Over <span className="highlight-text">{timeUnits.totalSeconds.toLocaleString()}</span> seconds since I proposed to you, and I would choose you all over again in every lifetime.
      </div>

      <div className="date-customizer">
        {!isEditing ? (
          <button
            type="button"
            className="text-subtle-btn"
            onClick={() => setIsEditing(true)}
          >
            <span>🗓️ Proposal Date: 3rd June 2026 ({startDate})</span>
          </button>
        ) : (
          <form onSubmit={handleSaveDate} className="date-picker-form">
            <label htmlFor="anniversary-input" className="sr-only">Our proposal date</label>
            <input
              id="anniversary-input"
              type="date"
              value={tempDate}
              onChange={(e) => setTempDate(e.target.value)}
              className="romantic-date-input"
            />
            <button type="submit" className="save-date-btn">Save</button>
            <button
              type="button"
              className="cancel-date-btn"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
