import { useCallback, useEffect, useRef, useState } from "react";

function toAudioFilename(text: string): string {
  const name = text
    .toLowerCase()
    .replace(/[/\\]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const result = `/audio/${name}.mp3`;
  console.log(`[toAudioFilename] input="${text}" → name="${name}" → path="${result}"`);
  return result;
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
      console.log("[useUrduSpeech] speak() called with text:", JSON.stringify(text));

      if (!text || !mountedRef.current) {
        console.warn("[useUrduSpeech] Early return:", { text, mounted: mountedRef.current });
        return;
      }

      stop();
      setError(null);

      const path = toAudioFilename(text);

      setLoadingText(text);

      // Verify file exists before trying to play
      try {
        console.log("[useUrduSpeech] Fetching file to verify existence:", path);
        const head = await fetch(path, { method: "HEAD" });
        console.log("[useUrduSpeech] File check response:", head.status, head.statusText);
        if (!head.ok) {
          throw new Error(`File not found (HTTP ${head.status})`);
        }
        const contentType = head.headers.get("content-type");
        console.log("[useUrduSpeech] Content-Type:", contentType);
      } catch (fetchErr) {
        console.error("[useUrduSpeech] File verification failed:", fetchErr);
        if (!mountedRef.current) return;
        setLoadingText(null);
        const msg = "Pronunciation audio not found.";
        setError(msg);
        return;
      }

      // Play the audio
      try {
        const audio = new Audio(path);
        currentAudioRef.current = audio;

        setLoadingText(null);
        setPlayingText(text);

        console.log("[useUrduSpeech] Created Audio element, calling play()");
        await new Promise<void>((resolve, reject) => {
          audio.onended = () => {
            console.log("[useUrduSpeech] Audio playback ended");
            resolve();
          };
          audio.onerror = (e) => {
            const errMsg = `Audio error: ${(e as ErrorEvent).message || "unknown"}`;
            console.error("[useUrduSpeech] onerror fired:", errMsg);
            reject(new Error(errMsg));
          };
          audio.play().catch((playErr) => {
            console.error("[useUrduSpeech] audio.play() rejected:", playErr);
            reject(playErr);
          });
        });

        if (mountedRef.current) setPlayingText(null);
        currentAudioRef.current = null;
        console.log("[useUrduSpeech] Playback complete");
      } catch (err) {
        if (!mountedRef.current) return;
        setLoadingText(null);
        setPlayingText(null);
        const msg = err instanceof Error ? err.message : "Pronunciation audio not found.";
        console.error("[useUrduSpeech] Playback failed:", msg);
        setError(msg);
      }
    },
    [stop],
  );

  return { speak, stop, loadingText, playingText, error };
}
