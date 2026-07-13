import { useCallback, useEffect, useRef, useState } from "react";

function toAudioFilename(text: string): string {
  const name = text
    .toLowerCase()
    .replace(/[/\\]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `/audio/${name}.mp3`;
}

export function useUrduSpeech() {
  const [loadingText, setLoadingText] = useState<string | null>(null);
  const [playingText, setPlayingText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      currentAudioRef.current?.pause();
      currentAudioRef.current = null;
    };
  }, []);

  const stop = useCallback(() => {
    currentAudioRef.current?.pause();
    currentAudioRef.current = null;
    setPlayingText(null);
  }, []);

  const speak = useCallback(
    async (text: string) => {
      if (!text || !mountedRef.current) return;

      stop();
      setError(null);

      const path = toAudioFilename(text);

      setLoadingText(text);

      try {
        const head = await fetch(path, { method: "HEAD" });
        if (!head.ok) {
          throw new Error(`File not found (HTTP ${head.status})`);
        }
      } catch (fetchErr) {
        if (!mountedRef.current) return;
        setLoadingText(null);
        setError("Pronunciation audio not found.");
        return;
      }

      try {
        const audio = new Audio(path);
        currentAudioRef.current = audio;

        setLoadingText(null);
        setPlayingText(text);

        await new Promise<void>((resolve, reject) => {
          audio.onended = () => {
            resolve();
          };
          audio.onerror = (e) => {
            const errMsg = `Audio error: ${(e as ErrorEvent).message || "unknown"}`;
            reject(new Error(errMsg));
          };
          audio.play().catch((playErr) => {
            reject(playErr);
          });
        });

        if (mountedRef.current) setPlayingText(null);
        currentAudioRef.current = null;
      } catch (err) {
        if (!mountedRef.current) return;
        setLoadingText(null);
        setPlayingText(null);
        const msg = err instanceof Error ? err.message : "Pronunciation audio not found.";
        setError(msg);
      }
    },
    [stop],
  );

  return { speak, stop, loadingText, playingText, error };
}
