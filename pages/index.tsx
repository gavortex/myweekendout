import React from 'react';
import axios from 'axios';

import VideoCard from '../components/VideoCard';
import { BASE_URL } from '../utils';
import { Video } from '../types';
import NoResults from '../components/NoResults';

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length 
        ? videos?.map((video: Video) => (
          <VideoCard post={video} isShowingOnHome key={video._id} />
        )) 
        : <NoResults text={`No Videos`} />}
    </div>
  );
};

export default Home;

export const getServerSideProps = async ({ query }: { query: { topic?: string } }) => {
  try {
    const url = query.topic 
      ? `${BASE_URL}/api/discover/${query.topic}`
      : `${BASE_URL}/api/post`;

    const response = await axios.get(url);
    
    return { props: { videos: response.data } };
  } catch (error) {
    console.error('Data fetching failed:', error);
    return { props: { videos: [] } };
  }
};