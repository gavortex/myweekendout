// components/CommentModal.tsx
'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import Comments from './Comments'; // your existing Comments component

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  comments: any[];
  comment: string;
  setComment: (val: string) => void;
  addComment: (e: React.FormEvent) => void;
  isPostingComment: boolean;
}

const CommentModal = ({
  isOpen,
  onClose,
  postId,
  comments,
  comment,
  setComment,
  addComment,
  isPostingComment,
}: CommentModalProps) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-end"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <motion.div className="w-full bg-white rounded-t-2xl p-4 h-[75%] overflow-y-auto relative">
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-2xl text-gray-500 z-10"
            >
              <IoClose />
            </button>

            <Comments
              postId={postId}
              comments={comments}
              comment={comment}
              setComment={setComment}
              addComment={addComment}
              isPostingComment={isPostingComment}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommentModal;
