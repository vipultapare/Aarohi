import { useState } from 'react';
import { romanticAudio } from './audioHelper';

export default function LoveLetter() {
  const [isSealed, setIsSealed] = useState(true);
  const [kissCount, setKissCount] = useState(0);

  const openLetter = (e) => {
    romanticAudio.playChime();
    setIsSealed(false);
    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      window.dispatchEvent(
        new CustomEvent('love-burst', {
          detail: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        })
      );
    }
  };

  const handleKiss = (e) => {
    romanticAudio.playChime();
    setKissCount((prev) => prev + 1);
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
    <section className="love-letter-section" id="heartfelt-letter">
      <div className="section-header">
        <span className="cursive-tag">From My Soul To Yours</span>
        <h2 className="section-title">A Letter For Aarohi</h2>
        <div className="title-divider">
          <span></span>
          <span className="divider-heart">❦</span>
          <span></span>
        </div>
      </div>

      <div className="letter-wrapper">
        <div className={`letter-parchment ${isSealed ? 'sealed-state' : 'unsealed-state'}`}>
          {isSealed ? (
            <div className="sealed-overlay" onClick={openLetter} role="button" tabIndex={0}>
              <div className="wax-seal">
                <div className="seal-ring">
                  <span className="seal-initial">A</span>
                </div>
              </div>
              <p className="seal-prompt">Tap the wax seal to unfold my secret letter to you</p>
            </div>
          ) : (
            <div className="letter-content">
              <div className="letter-header">
                <div>
                  <p className="letter-salutation">My Dearest Aarohi,</p>
                  <p className="letter-nicknames-note">My cute Panda, my Motu & my sweetest Gujju 🐼❤️</p>
                </div>
                <span className="letter-date">Written with all my heart ✨</span>
              </div>

              <div className="letter-body">
                <p>
                  I've been trying to find the right words to describe what you mean to me, 
                  but human language often feels too small to hold the depth of what I feel in my chest. 
                  Every single day that you are in my life feels like a quiet blessing I never knew I deserved.
                </p>

                <p>
                  Before you came into my universe, the days passed by in routine colors. 
                  But with you, everything turned luminous. Your laughter became my favorite melody, 
                  your kindness taught me what gentle strength truly looks like, and your presence 
                  became my greatest sense of calm. Whenever the world gets loud or overwhelming, 
                  just the thought of your smile settles my entire soul.
                </p>

                <p>
                  Whether I'm teasing you as my cute Motu, smiling at my little Panda, or admiring my wonderful Gujju, 
                  every single version of you has my entire heart. You aren't just someone I love; 
                  you are my best friend, my favorite conversation, and the person I look forward to experiencing every tomorrow with. 
                  I cherish the goofy moments where we laugh till our stomachs ache, and I cherish 
                  the peaceful quiet moments where just sitting beside you is more than enough.
                </p>

                <p className="highlight-verse">
                  “I love you not only for who you are, but for who I am when I am with you. 
                  You make my world gentler, brighter, and endlessly full of hope.”
                </p>

                <p>
                  Thank you for being you—unapologetically beautiful, wonderfully genuine, 
                  and deeply loved. No matter where life takes us, remember this: 
                  my heart will always be a safe harbor for you.
                </p>
              </div>

              <div className="letter-footer">
                <p className="letter-closing">Forever & always yours,</p>
                <div className="letter-signature">With all my love ❤️</div>

                <div className="letter-interactions">
                  <button
                    id="send-kiss-btn"
                    type="button"
                    className="kiss-btn"
                    onClick={handleKiss}
                  >
                    <span>Send Love & Kisses 💋</span>
                  </button>
                  {kissCount > 0 && (
                    <span className="kiss-counter">
                      {kissCount} {kissCount === 1 ? 'kiss' : 'kisses'} sent to your heart!
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
