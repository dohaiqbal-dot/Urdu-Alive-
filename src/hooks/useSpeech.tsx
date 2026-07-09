import { useCallback, useRef, useState } from "react";

const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || "";
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";
const MODEL_ID = "eleven_multilingual_v2";

export function useSpeech() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setLoading(false);
  }, []);

  const speak = useCallback(
    async (text: string, urduScript?: string) => {
      // Stop any existing playback first
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }

      if (!API_KEY) {
        fallbackSpeak(text);
        return;
      }

      setLoading(true);
      try {
        const textToSpeak = urduScript || text;
        const response = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "xi-api-key": API_KEY,
            },
            body: JSON.stringify({
              text: textToSpeak,
              model_id: MODEL_ID,
              voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75,
              },
            }),
          },
        );

        if (!response.ok) throw new Error("ElevenLabs API error");

        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        blobUrlRef.current = audioUrl;

        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onended = () => {
          if (blobUrlRef.current === audioUrl) {
            URL.revokeObjectURL(audioUrl);
            blobUrlRef.current = null;
          }
          audioRef.current = null;
          setLoading(false);
        };
        audio.onerror = () => {
          if (blobUrlRef.current === audioUrl) {
            URL.revokeObjectURL(audioUrl);
            blobUrlRef.current = null;
          }
          audioRef.current = null;
          setLoading(false);
        };

        await audio.play();
      } catch {
        setLoading(false);
        fallbackSpeak(text);
      }
    },
    [],
  );

  return { speak, stop, loading };
}

function fallbackSpeak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ur-PK";
  utterance.rate = 0.85;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const urduVoice =
    voices.find((v) => v.lang === "ur-PK") ||
    voices.find((v) => v.lang === "ur") ||
    voices.find((v) => v.lang.startsWith("ur"));
  if (urduVoice) {
    utterance.voice = urduVoice;
  }

  window.speechSynthesis.speak(utterance);
}
