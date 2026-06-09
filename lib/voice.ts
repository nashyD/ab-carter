// Voice: ElevenLabs (premium, via our gated /api/tts) with a browser-speech fallback.

const LANG_TAG: Record<string, string> = { en: 'en-US', es: 'es-ES', zh: 'zh-CN' };
// A valid 0-sample WAV — used to unlock audio playback inside a user gesture (iOS/Safari).
const SILENT_WAV = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';

let audioEl: HTMLAudioElement | null = null;
let controller: AbortController | null = null;

function getAudioEl(): HTMLAudioElement {
  if (!audioEl) audioEl = new Audio();
  return audioEl;
}

export function voiceSupported(): boolean {
  return typeof window !== 'undefined' && ('speechSynthesis' in window || typeof Audio !== 'undefined');
}

// Unlock audio + speech on iOS/Safari (must run inside a user gesture, e.g. the toggle click).
export function primeVoice(): void {
  if (typeof window === 'undefined') return;
  try {
    const el = getAudioEl();
    el.src = SILENT_WAV;
    el.muted = true;
    el.play()
      .then(() => {
        el.pause();
        el.muted = false;
      })
      .catch(() => {
        el.muted = false;
      });
  } catch {
    /* ignore */
  }
  if ('speechSynthesis' in window) {
    const u = new SpeechSynthesisUtterance(' ');
    u.volume = 0;
    window.speechSynthesis.speak(u);
  }
}

export function stopSpeaking(): void {
  if (controller) {
    controller.abort();
    controller = null;
  }
  if (audioEl) {
    audioEl.pause();
    try {
      audioEl.currentTime = 0;
    } catch {
      /* ignore */
    }
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
}

function speakBrowser(text: string, lang: string, onStart?: () => void, onEnd?: () => void): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return;
  }
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const tag = LANG_TAG[lang] ?? 'en-US';
  u.lang = tag;
  const match = synth.getVoices().find((v) => v.lang?.toLowerCase().startsWith(tag.slice(0, 2)));
  if (match) u.voice = match;
  u.onstart = () => onStart?.();
  u.onend = () => onEnd?.();
  u.onerror = () => onEnd?.();
  synth.speak(u);
}

// Speak via ElevenLabs (our gated /api/tts). Falls back to the browser voice on any error.
export async function playVoice(
  text: string,
  lang: string,
  accessCode: string,
  onStart?: () => void,
  onEnd?: () => void,
): Promise<void> {
  stopSpeaking();
  const ctrl = new AbortController();
  controller = ctrl;
  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-access-code': accessCode },
      body: JSON.stringify({ text, lang }),
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`tts ${res.status}`);
    const blob = await res.blob();
    if (ctrl.signal.aborted) return;
    const url = URL.createObjectURL(blob);
    const el = getAudioEl();
    el.src = url;
    el.onplay = () => onStart?.();
    el.onended = () => {
      URL.revokeObjectURL(url);
      onEnd?.();
    };
    el.onerror = () => {
      URL.revokeObjectURL(url);
      onEnd?.();
    };
    await el.play();
  } catch (e) {
    if (controller === ctrl) controller = null;
    if ((e as Error).name === 'AbortError') {
      onEnd?.();
      return;
    }
    // ElevenLabs unavailable (no key / error) → browser fallback so the demo still talks.
    speakBrowser(text, lang, onStart, onEnd);
  }
}

// ---- Speech-to-text (optional; Chrome/Edge full, Safari partial) ----
interface SpeechRecognitionEvent {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
}
interface SpeechRecognitionInstance {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
}
type SRConstructor = new () => SpeechRecognitionInstance;

function getSR(): SRConstructor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { SpeechRecognition?: SRConstructor; webkitSpeechRecognition?: SRConstructor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function micSupported(): boolean {
  return getSR() !== null;
}

export function listen(lang: string, onResult: (text: string) => void, onDone: () => void): void {
  const SR = getSR();
  if (!SR) {
    onDone();
    return;
  }
  const rec = new SR();
  rec.lang = LANG_TAG[lang] ?? 'en-US';
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  rec.onresult = (e) => {
    const t = e.results?.[0]?.[0]?.transcript ?? '';
    if (t) onResult(t);
  };
  rec.onend = () => onDone();
  rec.onerror = () => onDone();
  rec.start();
}
