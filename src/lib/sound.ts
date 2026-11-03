// Web Audio API Retro 1970s TVA Terminal Sound Synthesizer
// Bridges seamlessly to tvaSound engine
import { tvaSound } from '@/lib/tvaSound';

class SoundManager {
  public isEnabled(): boolean {
    return !tvaSound.getMuted();
  }

  public toggle(): boolean {
    const isMuted = tvaSound.toggleMute();
    return !isMuted;
  }

  // Soft mechanical relay snap / tick
  public playMechanicalClick() {
    tvaSound.playHover();
  }

  // Stepped CRT chirp / confirmation
  public playWarpChirp() {
    tvaSound.playConfirm();
  }

  // Warp sweep
  public playWarp() {
    tvaSound.playWarp();
  }
}

export const soundFx = new SoundManager();
