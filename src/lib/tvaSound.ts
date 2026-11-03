// Native Web Audio API Sound Engine for TVA TemPad CRT Interface
// Zero external assets (.mp3), 100% synthesized analog sounds + haptic feedback

class TVASoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isUnlocked: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tva_audio_muted');
      // Respect user's explicit preference or default to false
      this.isMuted = saved === 'true';

      const unlock = () => {
        if (!this.isUnlocked) {
          this.initContext();
          this.isUnlocked = true;
          window.removeEventListener('click', unlock);
          window.removeEventListener('keydown', unlock);
          window.removeEventListener('touchstart', unlock);
        }
      };

      window.addEventListener('click', unlock, { passive: true });
      window.addEventListener('keydown', unlock, { passive: true });
      window.addEventListener('touchstart', unlock, { passive: true });
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('tva_audio_muted', String(this.isMuted));
    }
    if (!this.isMuted) {
      this.initContext();
      this.playConfirm();
    }
    return this.isMuted;
  }

  // 1. playHover(): short 25ms analog relay tick with slight pitch randomization
  public playHover() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      // Slight pitch randomization around 180Hz - 220Hz
      const randomPitch = 180 + Math.random() * 40;
      osc.frequency.setValueAtTime(randomPitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.025);
    } catch {
      // Audio context silenced
    }
  }

  // 2. playKeystroke(): crisp 15ms CRT data chirp for typing
  public playKeystroke() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      const randomFreq = 800 + Math.random() * 200;
      osc.frequency.setValueAtTime(randomFreq, this.ctx.currentTime);
      osc.frequency.setValueAtTime(randomFreq * 1.5, this.ctx.currentTime + 0.008);

      gain.gain.setValueAtTime(0.035, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.015);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.015);
    } catch {
      // Audio context silenced
    }
  }

  // 3. playConfirm(): dual-tone TVA confirmation beep + subtle haptic pulse on mobile
  public playConfirm() {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(10);
      } catch {
        // Haptics unavailable
      }
    }

    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // Dual-tone: 520Hz then 780Hz
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.setValueAtTime(780, now + 0.04);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.setValueAtTime(0.11, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Audio context silenced
    }
  }

  // 4. playWarp(): filtered low-pass analog synthesizer sweep synced to useWarpTransition.ts
  public playWarp() {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([15, 25, 15]);
      } catch {
        // Haptics unavailable
      }
    }

    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.07);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.16);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.07);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.16);
      filter.Q.setValueAtTime(4.0, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch {
      // Audio context silenced
    }
  }
}

export const tvaSound = new TVASoundEngine();
