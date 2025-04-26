'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineCancel } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import Comments from '../../components/Comments';
import { BASE_URL } from '../../utils';
import useAuthStore from '../../store/authStore';
import { Video } from '../../types';
import axios from 'axios';

interface IProps { postDetails: Video; }

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [comment, setComment] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { userProfile }: any = useAuthStore();

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => router.back(), 300);
  };

 // Handles comment submission
 const handleAddComment = async (e: { preventDefault: () => void }) => {
  e.preventDefault();
  if (!userProfile || !comment.trim()) return;

  setIsPostingComment(true);
  try {
    // Use relative path to avoid CORS issues
    const res = await axios.put(
      `/api/post/${post._id}`,
      { userId: userProfile._id, comment: comment.trim() }
    );
    setPost({ ...post, comments: res.data.comments });
    setComment('');
  } catch (err) {
    console.error('Error adding comment:', err);
  } finally {
    setIsPostingComment(false);
  }
};
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        >
          <motion.div
            ref={modalRef}
            initial={{ y: '100%' }} animate={{ y: '25%' }} exit={{ y: '100%' }}
            transition={{ type: 'tween' }}
            className="w-full max-w-lg bg-white rounded-2xl h-[70vh] flex flex-col"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            {/* Close */}
            <div className="p-4 flex justify-end border-b">
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full">
                <MdOutlineCancel className="text-2xl" />
              </button>
            </div>

            {/* Header */}
            <div className="p-4 flex items-center gap-3 border-b">
            {post?.postedBy && (
  <Link href={`/profile/${post.postedBy._id}`}>
    <Image
      width={40} height={40}
      className="rounded-full cursor-pointer"
      src={post.postedBy.image}
      alt="user-profile"
    />
  </Link>
)}

{post?.postedBy && (
  <div>
    <p className="font-bold flex items-center gap-1">
      {post.postedBy.userName} <GoVerified className="text-blue-400" />
    </p>
    <p className="text-gray-600 text-sm">{post.caption}</p>
  </div>
     )}
     </div>
            {/* Comments */}
            <div className="flex-1 flex flex-col">
            <Comments
              isPostingComment={isPostingComment}
              comment={comment}
              setComment={setComment}
              addComment={handleAddComment}
              comments={post.comments}
            />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
  const res = await axios.get(`${BASE_URL}/api/post/${id}`);
  return { props: { postDetails: res.data } };
};

export default Detail;