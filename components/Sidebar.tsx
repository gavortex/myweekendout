import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';
import Discover from './Discover';



const Sidebar: NextPage = () => {
    const [showSidebar, setShowSidebar] = useState<Boolean>(true);

    const userProfile = false;

    const normalLink = 'flex items-center gap-3 p-3 justify-center xl:justify-start cursor-pointer font-semibold text-white rounded';
  
    return (
      <div>
        <div
          className='block xl:hidden m-2 ml-4 mt-3 text-xl'
          onClick={() => setShowSidebar((prev) => !prev)} >
          {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
        </div>
        {showSidebar && (
          <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 bg-red-700 border-gray-100 xl:border-0 p-3">
            <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
              <Link href="/">
                <div className={normalLink}>
                  <p className='text-2xl'>
                    <AiFillHome />
                  </p>
                  <span className="text-xl hidden xl:block">
                    For You
                  </span>
                </div>
              </Link>
            </div>          
            <Discover />
          <SuggestedAccounts />
          <Footer />

                    
          </div>
        )}
      </div>
    );
  };
  
  export default Sidebar;