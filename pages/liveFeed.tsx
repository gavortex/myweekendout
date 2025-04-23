import React from 'react';

const LiveFeed = () => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <div className="bg-red-500 text-white px-6 py-6 rounded-2xl border-2 border-white shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out max-w-lg w-full">
          <h1 className="text-3xl font-extrabold text-center">
            🚀 Live Streaming Features
            <br />
            Coming Soon
          </h1>
          <p className="mt-4 text-center opacity-90 text-lg">
            We&apos;re working hard to bring you live streaming capabilities.
            <br />
            Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveFeed;
