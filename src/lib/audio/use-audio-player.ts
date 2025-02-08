import { useCallback, useState } from 'react';

export const useAudioPlayer = () => {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [urlObjectUrl, setUrlObjectUrl] = useState<string>();

  const stopAudio = useCallback(() => {
    audio?.pause();
    if (urlObjectUrl) URL.revokeObjectURL(urlObjectUrl);
    setIsPlaying(false);
  }, [audio, urlObjectUrl]);

  const play = useCallback(
    async (audioBlob: Blob) => {
      setIsPlaying(true);
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      setAudio(audio);
      setUrlObjectUrl(audioUrl);

      await audio.play();

      audio.addEventListener('ended', () => {
        stopAudio();
      });
    },
    [stopAudio]
  );

  const stop = useCallback(() => {
    stopAudio();
  }, [stopAudio]);

  return { play, stop, isPlaying };
};
