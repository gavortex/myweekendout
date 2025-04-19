'use client';

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { BiSend } from 'react-icons/bi';
import useAuthStore from '../store/authStore';
import { IUser } from '../types';
import Picker, { EmojiClickData } from 'emoji-picker-react';
import { BiSmile } from 'react-icons/bi';

interface IProps {
  isPostingComment: boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { allUsers, userProfile } = useAuthStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [showInput, setShowInput] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setComment((prev) => prev + emojiData.emoji);
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); addComment(e); setShowEmojiPicker(false); };


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowInput(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="h-full flex flex-col bg-transparent">
  
      {/* 🆕 Input Box on Top */}
      {userProfile && (
        <div className="sticky top-0 z-20 p-4 bg-white border-b">
          <div className="relative">
            {showEmojiPicker && (
              <div className="absolute top-full left-0 z-50">
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>
  
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowEmojiPicker((v) => !v)}
              className="text-2xl"
            >
              <BiSmile />
            </button>
  
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="😀 Add a comment..."
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isPostingComment}
              className="p-2 rounded-full bg-primary text-black disabled:opacity-50"
            >
              {isPostingComment ? 'Posting...' : <BiSend className="text-xl" />}
            </button>
          </form>
        </div>
      )}
  
      {/* 💬 Comment List */}
      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-10">
        {comments?.length > 0 ? (
          [...comments].reverse().map((item, idx) => (
            <React.Fragment key={idx}>
              {allUsers?.map(
                (user: IUser) =>
                  user._id === (item.postedBy._ref || item.postedBy._id) && (
                    <div className="py-3 items-center" key={`${item._key}-${user._id}`}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 min-w-[40px]">
                            <Image
                              width={40}
                              height={40}
                              className="rounded-full cursor-pointer"
                              src={user.image}
                              alt="user-profile"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="flex cursor-pointer gap-1 items-center text-md font-bold text-gray-800">
                              {user.userName} <GoVerified className="text-blue-400 text-sm" />
                            </p>
                            <p className="text-sm text-gray-600 mt-1">{item.comment}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
              )}
            </React.Fragment>
          ))
        ) : (
          <div className="pt-4 text-center text-gray-500">No comments yet</div>
        )}
      </div>
    </div>
  );
};

export default Comments;