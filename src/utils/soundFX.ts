// Web Audio API Sound Generator for Netflix Graduation Experience

class SoundFXManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgMusicOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
  private isMusicPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isMusicPlaying) {
      this.stopBackgroundMusic();
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  /**
   * Play synthesized Netflix "Ta-Dum" cinematic hit sound effect
   */
  public playTaDum() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Master Gain for Ta-Dum
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.8, now);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);
      masterGain.connect(this.ctx.destination);

      // Hit 1: First soft low-thud hit at t=0
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(60, now);
      osc1.frequency.exponentialRampToValueAtTime(30, now + 0.3);
      gain1.gain.setValueAtTime(0.7, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc1.connect(gain1);
      gain1.connect(masterGain);
      osc1.start(now);
      osc1.stop(now + 0.35);

      // Hit 2: The Main Cinematic "Ta-DUM" impact at t=0.18s
      const hitTime = now + 0.18;

      // Sub Bass
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(110, hitTime);
      subOsc.frequency.exponentialRampToValueAtTime(45, hitTime + 1.8);
      subGain.gain.setValueAtTime(0.9, hitTime);
      subGain.gain.exponentialRampToValueAtTime(0.001, hitTime + 2.5);

      subOsc.connect(subGain);
      subGain.connect(masterGain);
      subOsc.start(hitTime);
      subOsc.stop(hitTime + 2.6);

      // Mid Cinematic Octave Resonance (D major / F# harmony)
      [146.83, 220.0, 293.66, 370.0].forEach((freq) => {
        if (!this.ctx) return;
        const resOsc = this.ctx.createOscillator();
        const resGain = this.ctx.createGain();
        resOsc.type = 'sawtooth';
        resOsc.frequency.setValueAtTime(freq, hitTime);
        
        // Low pass filter for dark warmth
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, hitTime);
        filter.frequency.exponentialRampToValueAtTime(150, hitTime + 2.0);

        resGain.gain.setValueAtTime(0.18, hitTime);
        resGain.gain.exponentialRampToValueAtTime(0.001, hitTime + 2.2);

        resOsc.connect(filter);
        filter.connect(resGain);
        resGain.connect(masterGain);

        resOsc.start(hitTime);
        resOsc.stop(hitTime + 2.3);
      });
    } catch {
      // Audio playback fallback safely handled
    }
  }

  /**
   * Play Envelope opening paper sound effect
   */
  public playPaperRustle() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(1.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.45);
    } catch {
      // Audio fallback
    }
  }

  /**
   * Play achievement chime / unlock sound
   */
  public playUnlockChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.25, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.85);
      });
    } catch {
      // Audio fallback
    }
  }

  /**
   * Start soft ambient emotional piano chord loop for Letters / Finale
   */
  public startBackgroundMusic() {
    if (this.isMuted || this.isMusicPlaying) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      this.isMusicPlaying = true;
      const chordFrequencies = [
        [164.81, 196.00, 246.94, 329.63], // E minor / G chord
        [146.83, 185.00, 220.00, 293.66], // D major chord
        [130.81, 164.81, 196.00, 261.63], // C major chord
        [110.00, 138.59, 164.81, 220.00]  // A minor chord
      ];

      let chordIndex = 0;

      const playChordCycle = () => {
        if (!this.isMusicPlaying || !this.ctx || this.isMuted) return;
        const now = this.ctx.currentTime;
        const currentChord = chordFrequencies[chordIndex];

        currentChord.forEach((freq) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          // Soft ambient fade in & out
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.04, now + 1.2);
          gain.gain.linearRampToValueAtTime(0.001, now + 3.8);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 4.0);
          this.bgMusicOscillators.push({ osc, gain });
        });

        chordIndex = (chordIndex + 1) % chordFrequencies.length;

        if (this.isMusicPlaying) {
          setTimeout(playChordCycle, 4000);
        }
      };

      playChordCycle();
    } catch {
      // Audio fallback
    }
  }

  public stopBackgroundMusic() {
    this.isMusicPlaying = false;
    this.bgMusicOscillators.forEach(({ osc, gain }) => {
      try {
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx ? this.ctx.currentTime + 0.5 : 0);
        setTimeout(() => osc.stop(), 500);
      } catch {
        // ignore
      }
    });
    this.bgMusicOscillators = [];
  }
}

export const soundFX = new SoundFXManager();
