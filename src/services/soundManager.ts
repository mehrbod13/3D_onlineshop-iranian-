/**
 * Tiny synthesized SFX via Web Audio API — no .mp3/.wav assets to ship.
 * Browsers block audio until a user gesture; call resumeAudio() from the
 * "start" click handler before anything else tries to play.
 */

let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext
    if (!Ctor) return null
    ctx = new Ctor()
  }
  return ctx
}

export function resumeAudio() {
  const c = getCtx()
  if (c && c.state === 'suspended') void c.resume()
}

interface ToneOptions {
  type?: OscillatorType
  gain?: number
  glideTo?: number
}

function tone(freq: number, duration: number, opts: ToneOptions = {}, delay = 0) {
  const c = getCtx()
  if (!c) return

  // Some browsers re-suspend the context after focus loss / relocking the
  // pointer, even once it's been resumed before. Rather than silently
  // dropping the sound (the old guard bailed out here), nudge it awake —
  // this call is a no-op if it's already running.
  if (c.state === 'suspended') void c.resume()
  if (c.state !== 'running') return

  const startAt = c.currentTime + delay
  const osc = c.createOscillator()
  const gainNode = c.createGain()

  osc.type = opts.type ?? 'sine'
  osc.frequency.setValueAtTime(freq, startAt)
  if (opts.glideTo) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(opts.glideTo, 20), startAt + duration)
  }

  const peakGain = opts.gain ?? 0.12
  gainNode.gain.setValueAtTime(0.0001, startAt)
  gainNode.gain.exponentialRampToValueAtTime(peakGain, startAt + 0.01)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startAt + duration)

  osc.connect(gainNode).connect(c.destination)
  osc.start(startAt)
  osc.stop(startAt + duration + 0.02)
}

/** Footstep tap — pitch jitters a bit so a walk cycle doesn't sound robotic. */
export function playFootstep() {
  const freq = 85 + Math.random() * 25
  tone(freq, 0.11, { type: 'triangle', gain: 0.1, glideTo: freq * 0.6 })
}

/** Two-note "confirm" chime — click on an item, headed to the buy modal. */
export function playBuyClick() {
  tone(760, 0.08, { type: 'sine', gain: 0.1 })
  tone(1080, 0.09, { type: 'sine', gain: 0.09 }, 0.06)
}

/** Short upward blip — E pressed, item saved to the corner wishlist. */
export function playAddToList() {
  tone(520, 0.07, { type: 'square', gain: 0.06 })
  tone(700, 0.09, { type: 'square', gain: 0.06 }, 0.06)
}

/** Neutral tick — Tab pressed, wishlist panel opened/closed. */
export function playPanelToggle() {
  tone(320, 0.06, { type: 'sine', gain: 0.05 })
}
