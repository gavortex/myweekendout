'use client';

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { BiSend } from 'react-icons/bi';
import useAuthStore from '../store/authStore';
import { IUser } from '../types';

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
    <div
      ref={wrapperRef}
      className="h-full flex flex-col bg-transparent"
    >
      <div className="flex-1 overflow-y-auto px-4">
        {comments?.length > 0 ? (
          comments.map((item, idx) => (
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
          <div className="pt-4">
            
          </div>
        )}
      </div>

      {userProfile && <div className='absolute bottom-0 left-0  pb-6 px-2 md:px-10 '>
        <form onSubmit={addComment} className='flex gap-4'>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value.trim())}
            className='bg-primary px-6 py-4 text-md font-medium border-2 w-[350px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
            placeholder="😀 Add a comment..."
          />
          <button className='text-md text-gray-400 ' onClick={addComment}>
            {isPostingComment ? 'Posting...' : <BiSend className="text-xl" />}
          </button>
        </form>
      </div>}
    </div>
  );
};


export default Comments;