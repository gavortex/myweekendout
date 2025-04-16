'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

interface VideoThumbnailProps {
  src: string;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const onVideoPress = () => {
    if (playing) {
      videoRef.current?.pause();
      setPlaying(false);
    } else {
      videoRef.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className='relative rounded-2xl'
    >
      <video
        ref={videoRef}
        loop
        src={src}
        className='lg:w-[700px] h-[600px] md:h-[500px] md:w-[350px] lg:h-[728px] w-[300px] rounded-2xl cursor-pointer bg-gray-600'
      />
      {isHover && (
        <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-3'>
          <button onClick={onVideoPress}>
            {playing ? (
              <BsFillPauseFill className='text-red text-2xl lg:text-4xl' />
            ) : (
              <BsFillPlayFill className='text-red text-2xl lg:text-4xl' />
            )}
          </button>
          <button onClick={() => setIsMuted(prev => !prev)}>
            {isMuted ? (
              <HiVolumeOff className='text-red text-2xl lg:text-4xl' />
            ) : (
              <HiVolumeUp className='text-red text-2xl lg:text-4xl' />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoThumbnail;
