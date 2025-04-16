'use client';

import React, { useRef, useEffect, useState } from 'react';

interface VideoThumbnailProps {
  src: string;
  isMuted?: boolean;
  interactive?: boolean;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  src,
  isMuted = true,
  interactive = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!interactive || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [interactive]);

  useEffect(() => {
    if (!interactive || !videoRef.current) return;

    if (isVisible) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isVisible, interactive]);

  return (
    <video
      ref={videoRef}
      loop
      muted={isMuted}
      playsInline
      preload="metadata"
      src={src}
      className={`rounded-2xl bg-gray-600 cursor-pointer ${
        interactive
          ? 'lg:w-[700px] h-[600px] md:h-[500px] md:w-[350px] lg:h-[728px] w-[300px]'
          : 'w-[400px] h-[500px] md:w-full'
      }`}
    />
  );
};

export default VideoThumbnail;
