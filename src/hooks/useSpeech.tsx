import { useCallback, useRef, useState, useEffect } from "react";

/**
 * Clean phonetic fallback: strips diacritics and normalizes Roman Urdu text
 * so the default system voice can articulate syllables correctly.
 */
function toPhonetic(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u064F]/g, "") // strip combining diacritics
    .replace(/[^\w\s'-]/g, "") // remove non-word chars except spaces/hyphens/apostrophes
    .replace(/\s+/g, " ") // collapse whitespace
    .trim();
}

export function useSpeech() {
  const speaking = useRef(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [urduVoice, setUrduVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const findUrduVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      // Aggressive match: ur-PK first, then any ur* voice
      const match =
        voices.find((v) => v.lang === "ur-PK") ||
        voices.find((v) => v.lang === "ur") ||
        voices.find((v) => v.lang.startsWith("ur"));
      if (match) {
        setUrduVoice(match);
      }
      return voices.length > 0;
    };

    const loaded = findUrduVoice();
    setVoicesLoaded(loaded);

    const handler = () => {
      findUrduVoice();
      setVoicesLoaded(true);
    };
    window.speechSynthesis.addEventListener("voiceschanged", handler);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", handler);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;

      // Always cancel existing speech before starting new
      window.speechSynthesis.cancel();
      speaking.current = false;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ur-PK";
      utterance.rate = 0.85;
      utterance.pitch = 1.0;

      // Use cached Urdu voice if available, otherwise let the system pick
      if (urduVoice) {
        utterance.voice = urduVoice;
      } else {
        // No Urdu voice found — use phonetic fallback so default voice
        // can articulate Roman Urdu syllables cleanly
        utterance.text = toPhonetic(text);
        utterance.lang = "en-US"; // fall back to English voice for Roman text
      }

      utterance.onstart = () => {
        speaking.current = true;
      };
      utterance.onend = () => {
        speaking.current = false;
      };
      utterance.onerror = () => {
        speaking.current = false;
      };

      window.speechSynthesis.speak(utterance);
    },
    [urduVoice],
  );

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      speaking.current = false;
    }
  }, []);

  return { speak, stop };
}
