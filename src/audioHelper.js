// Romantic Ambient Web Audio API Synthesizer
// Provides soothing, dreamy music-box / harp-like romantic arpeggios
// No external MP3 files needed; works reliably and offline!

class RomanticAudioPlayer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.chordIndex = 0;
    this.noteIndex = 0;
    this.gainNode = null;

    // Romantic dreamy chords (frequencies in Hz)
    // Cmaj9 -> Am9 -> Fmaj9 -> G7sus4
    this.chords = [
      [261.63, 329.63, 392.00, 493.88, 587.33], // C4, E4, G4, B4, D5
      [220.00, 261.63, 329.63, 392.00, 493.88], // A3, C4, E4, G4, B4
      [174.61, 261.63, 329.63, 392.00, 523.25], // F3, C4, E4, G4, C5
      [196.00, 293.66, 392.00, 440.00, 587.33], // G3, D4, G4, A4, D5
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, time, duration = 1.8) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Soft sine + subtle triangle warmth
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      // Envelope: soft attack, gentle decay
      noteGain.gain.setValueAtTime(0.0001, time);
      noteGain.gain.exponentialRampToValueAtTime(0.18, time + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(time);
      osc.stop(time + duration);
    } catch {
      // Audio fallback
    }
  }

  // Play a gentle chime when Aarohi clicks a heart or love card
  playChime() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      this.playTone(freq, now + idx * 0.09, 1.2);
    });
  }

  // Play a celebratory fanfare chime when she clicks YES!
  playCelebration() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      this.playTone(freq, now + idx * 0.12, 2.0);
    });
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    const step = () => {
      if (!this.isPlaying) return;
      const chord = this.chords[this.chordIndex];
      const freq = chord[this.noteIndex];

      const now = this.ctx.currentTime;
      this.playTone(freq, now, 1.9);

      this.noteIndex++;
      if (this.noteIndex >= chord.length) {
        this.noteIndex = 0;
        this.chordIndex = (this.chordIndex + 1) % this.chords.length;
      }

      this.timer = setTimeout(step, 450);
    };

    step();
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const romanticAudio = new RomanticAudioPlayer();
