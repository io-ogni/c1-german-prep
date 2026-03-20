import { useState, useRef, useCallback, useEffect } from 'react';

export function usePlayAll() {
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playlistRef = useRef<string[]>([]);

  // Keep ref in sync so the onended callback always sees latest
  playlistRef.current = playlist;

  const playIndex = useCallback((urls: string[], idx: number) => {
    if (idx >= urls.length) {
      setIsPlaying(false);
      setCurrentIndex(-1);
      return;
    }
    const audio = new Audio(urls[idx]);
    audioRef.current = audio;
    setCurrentIndex(idx);
    audio.onended = () => {
      playIndex(urls, idx + 1);
    };
    audio.onerror = () => {
      // skip broken file, move to next
      playIndex(urls, idx + 1);
    };
    audio.play();
  }, []);

  const start = useCallback((urls: string[]) => {
    // Stop any current playback
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlaylist(urls);
    setIsPlaying(true);
    playIndex(urls, 0);
  }, [playIndex]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current) {
      setIsPlaying(true);
      audioRef.current.play();
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setCurrentIndex(-1);
    setPlaylist([]);
  }, []);

  const toggle = useCallback((urls: string[]) => {
    if (isPlaying) {
      pause();
    } else if (currentIndex >= 0) {
      resume();
    } else {
      start(urls);
    }
  }, [isPlaying, currentIndex, start, pause, resume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return { isPlaying, currentIndex, total: playlist.length, toggle, stop };
}
