// Web Audio API Synthesizer for Netflix "TA-DUM" sound effect

export function playTaDumSound(): void {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // --- 1. "TA" - Low Sub-Bass Impact (0.0s - 0.5s) ---
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(80, now);
    subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.35);

    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.exponentialRampToValueAtTime(0.7, now + 0.04);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);

    subOsc.start(now);
    subOsc.stop(now + 0.5);

    // --- 2. "DUM" - Main Deep Cinematic Impact (0.22s - 2.5s) ---
    const dumTime = now + 0.22;

    // Sub-heavy sine wave for body
    const mainBassOsc = ctx.createOscillator();
    const mainBassGain = ctx.createGain();
    mainBassOsc.type = 'triangle';
    mainBassOsc.frequency.setValueAtTime(110, dumTime);
    mainBassOsc.frequency.exponentialRampToValueAtTime(40, dumTime + 0.8);

    mainBassGain.gain.setValueAtTime(0.001, dumTime);
    mainBassGain.gain.exponentialRampToValueAtTime(0.95, dumTime + 0.05);
    mainBassGain.gain.exponentialRampToValueAtTime(0.001, dumTime + 2.2);

    mainBassOsc.connect(mainBassGain);
    mainBassGain.connect(ctx.destination);

    mainBassOsc.start(dumTime);
    mainBassOsc.stop(dumTime + 2.3);

    // Metallic Timpani / String Strike synth (Dual Chord Hit: D Minor / F Major harmonics)
    const frequencies = [146.83, 174.61, 220.00, 293.66, 440.00]; // D3, F3, A3, D4, A4
    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'sawtooth' : 'square';
      osc.frequency.setValueAtTime(freq, dumTime);
      // Pitch drop effect
      osc.frequency.exponentialRampToValueAtTime(freq * 0.96, dumTime + 1.5);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, dumTime);
      filter.frequency.exponentialRampToValueAtTime(150, dumTime + 1.8);

      gain.gain.setValueAtTime(0.001, dumTime);
      gain.gain.exponentialRampToValueAtTime(0.18 / (idx + 1), dumTime + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, dumTime + 2.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(dumTime);
      osc.stop(dumTime + 2.1);
    });

    // --- 3. Shimmer / Metallic Reverberation (0.3s - 2.8s) ---
    // White noise bursts passed through bandpass filters to simulate the dramatic shimmering tail
    const bufferSize = ctx.sampleRate * 2.0;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(1800, dumTime);
    noiseFilter.Q.setValueAtTime(3.0, dumTime);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, dumTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.25, dumTime + 0.1);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, dumTime + 2.5);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(dumTime + 0.05);
    noise.stop(dumTime + 2.6);

  } catch (err) {
    console.warn('AudioContext playback error:', err);
  }
}
