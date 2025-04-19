import React, { useEffect, useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { NextPage } from 'next';

import useAuthStore from '../store/authStore';

interface IProps {
  likes: any;
  flex: string;
  handleLike: () => void;
}

const LikeButton: NextPage<IProps> = ({ likes, flex, handleLike }) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();

  useEffect(() => {
    const hasLiked = likes?.some((item: any) => item._ref === userProfile?._id);
    setAlreadyLiked(hasLiked);
  }, [likes, userProfile]);

  return (
    <div className={`${flex} gap-6`}>
      <div
        className="mt-4 flex flex-col justify-center items-center cursor-pointer"
        onClick={handleLike}
      >
        <div className="bg-primary rounded-full p-2 md:p-4 text-[#F51997]">
          <MdFavorite
            className={`text-lg md:text-2xl ${alreadyLiked ? 'fill-current' : 'fill-white'}`}
          />
        </div>
        <p className="text-md text-white font-semibold">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
