import React from 'react';
import { BASE_URL } from '../utils';
import axios from 'axios';
import NoResults from '../components/NoResults';


interface IProps {
  videos: never[]; 
}

const LiveFeed = ({ videos }: IProps) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
         
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-500 text-white px-6 py-3 rounded-lg border-2 border-white shadow-lg transform hover:scale-105 transition-transform">
          <h1 className="text-2xl font-bold text-center">
            🚀 Live Streaming Feature
            <br />
            Coming Soon!
          </h1>
          <p className="mt-2 text-center opacity-90">
            We're working hard to bring you live streaming capabilities.
            <br />
            Stay tuned!
          </p>
        </div>
      </div>

      {videos.length ? null : <NoResults text="" />}
    </div>
  );
};

export default LiveFeed;

export const getServerSideProps = async () => {
  
  return {
    props: { videos: [] }
  };
};