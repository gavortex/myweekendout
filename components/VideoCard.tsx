import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { MdOutlineInsertComment } from 'react-icons/md';
import { Video } from './../types';
import LikeButton from './LikeButton';
import Comments from './Comments';
import useAuthStore from '../store/authStore';
import { useRouter } from 'next/router';
import axios from 'axios';

interface IProps {
  post: Video;
  isShowingOnHome?: boolean;
  currentlyPlayingId: string | null;
  setCurrentlyPlayingId: (id: string) => void;
}

const VideoCard: React.FC<IProps> = ({
  post: { caption, postedBy, video, _id, likes, comments },
  currentlyPlayingId,
  setCurrentlyPlayingId
}) => {
  const [playing, setPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);
  const { userProfile } = useAuthStore();
  const router = useRouter();

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (!videoRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentlyPlayingId(_id);
        }
      },
      { threshold: 0.75 }
    );
    observer.observe(videoRef.current);
    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, [setCurrentlyPlayingId, _id]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (currentlyPlayingId === _id) {
      videoEl
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      videoEl.pause();
      setPlaying(false);
    }
  }, [currentlyPlayingId, _id]);

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment) {
      setIsPostingComment(true);
      console.log('New Comment:', comment);
      setComment('');
      setIsPostingComment(false);
    }
  };

  const handleLike = async () => {
    if (!userProfile) return;
    try {
      const res = await axios.put('/api/like', {
        userId: (userProfile as any)?._id,
        postId: _id,
        like: true,
      });
      console.log('Like successful', res.data);
    } catch (err) {
      console.error('Like failed:', err);
    }
  };

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6 relative'>
      {/* Profile & Caption */}
      <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
        <div className='md:w-16 md:h-16 w-10 h-10'>
          <Image
            width={24}
            height={24}
            className='rounded-full'
            src={postedBy?.image}
            alt='user-profile'
            layout='responsive'
          />
        </div>
        <div>
          <div className='flex items-center gap-1'>
            <p className='flex gap-2 items-center md:text-md font-bold text-gray-600'>
              {postedBy.userName}
              <GoVerified className='text-blue-400 text-md' />
            </p>
            <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
              {postedBy.userName}
            </p>
          </div>
          <p className='mt-1 text-gray-700 font-xs'>{caption}</p>
        </div>
      </div>

      {/* Video Section */}
      <div className='lg:ml-20 flex gap-4 relative'>
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className='rounded-3xl relative'
        >
          <video
            loop
            muted
            playsInline
            preload='auto'
            ref={videoRef}
            src={video?.asset.url}
            className='lg:w-[700px] h-[600px] md:h-[500px] md:w-[350px] lg:h-[728px] w-[300px] rounded-2xl cursor-pointer bg-gray-600'
            onClick={onVideoPress}
          />

          {/* Overlay Controls */}
          {isHover && (
            <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-3'>
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className='text-red text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className='text-red text-2xl lg:text-4xl' />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className='text-red text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className='text-red text-2xl lg:text-4xl' />
                </button>
              )}
            </div>
          )}

          {/* Like & Comment Buttons */}
          <div className="absolute right-4 bottom-20 flex flex-col gap-6 items-center z-50">
            <LikeButton likes={likes} flex="flex" handleLike={handleLike} />
            <button
              className="bg-red p-2 rounded-full text-white"
              onClick={async () => {
                try {
                  await axios.get(`/api/post/${_id}`);
                  router.push(`/detail/${_id}?comment=true`);
                } catch (error) {
                  console.error('Failed to fetch post details:', error);
                }
              }}
            >
              <MdOutlineInsertComment className="text-xl md:text-2xl" />
            </button>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div
              className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end justify-center"
              onClick={() => router.push(`/detail/${_id}?modal=true`)}
            >
              <div
                className="bg-white w-full md:w-[250px] md:h-[650px] max-h-[700px] rounded-t-2xl p-4 overflow-y-scroll"
                onClick={(e) => e.stopPropagation()}
              >
                <Comments
                  comment={comment}
                  setComment={setComment}
                  addComment={addComment}
                  comments={comments}
                  isPostingComment={isPostingComment}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
