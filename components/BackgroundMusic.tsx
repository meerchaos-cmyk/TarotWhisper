'use client';

import { useEffect, useRef, useState } from 'react';

const BGM_SOURCE = '/The_Oracle_s_Last_Card.mp3';

export function BackgroundMusic(): React.JSX.Element {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.muted = isMuted;

    if (!isMuted) {
      audio.play().catch(() => {
        // 浏览器自动播放策略可能阻止播放，等待用户交互后重试。
      });
    }
  }, [isMuted]);

  const handleToggleMute = (): void => {
    setIsMuted((previous) => !previous);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={BGM_SOURCE}
        autoPlay
        loop
        preload="auto"
      />

      <button
        type="button"
        onClick={handleToggleMute}
        className="fixed top-6 left-6 z-30 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm transition-all duration-300 text-sm text-purple-100/90"
        title={isMuted ? '开启背景音乐' : '关闭背景音乐'}
        aria-label={isMuted ? '开启背景音乐' : '关闭背景音乐'}
      >
        {isMuted ? '🔇 声音关闭' : '🔊 声音开启'}
      </button>
    </>
  );
}
