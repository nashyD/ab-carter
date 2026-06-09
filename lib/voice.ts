// Browser Web Speech API helpers — no external service or API keys.
// Text-to-speech (the assistant talks) + optional speech-to-text (ask by voice).

const LANG_TAG: Record<string, string> = { en: 'en-US', es: 'es-ES', zh: 'zh-CN' };

export function voiceSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function speak(text: string, lang: string, onStart?: () => void, onEnd?: () => void): void {
  if (!voiceSupported()) {
    onEnd?.();
    return;
  }
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const tag = LANG_TAG[lang] ?? 'en-US';
  u.lang = tag;
  const match = synth.getVoices().find((v) => v.lang?.toLowerCase().startsWith(tag.slice(0, 2).toLowerCase()));
  if (match) u.voice = match;
  u.onstart = () => onStart?.();
  u.onend = () => onEnd?.();
  u.onerror = () => onEnd?.();
  synth.speak(u);
}

export function stopSpeaking(): void {
  if (voiceSupported()) window.speechSynthesis.cancel();
}

// Unlock speech on iOS/Safari, which only enables TTS after a user gesture.
// Call this from the click handler that turns voice on.
export function primeVoice(): void {
  if (!voiceSupported()) return;
  const u = new SpeechSynthesisUtterance(' ');
  u.volume = 0;
  window.speechSynthesis.speak(u);
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
