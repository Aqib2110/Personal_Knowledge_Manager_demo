"use client";
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { usePathname } from 'next/navigation';
const ContentWrapper = ({children}: {children: React.ReactNode}) => {
  const [load, setload] = useState(false);
  const [ai, setai] = useState(false);
  const path = usePathname();
  useEffect(() => {
    if(path === "/auth/signup")
    {
      setload(true);
    }
    else if(path === "/ai")
    {
     setai(true);
    }
  }, [path])
  
  return load ? <div className='h-screen w-screen  flex justify-center items-center'>
    <div className='w-full'>
  {children}
    </div>
  
  </div> : ai  ? (
     <div className='flex flex-col '>
 <div className="flex flex-col  bg-gray-100 w-full">
      
        <div className='w-full z-20'>
       <Navbar />
        </div>


      <div className='  '>
            {children}
      </div>
     
    
    </div>
     <div className='w-full md:block hidden z-10'>
      <Footer />
      </div>
    </div>
  ) : (
    <div className='flex flex-col '>
 <div className="flex flex-col  bg-gray-100 w-full">
      
        <div className='w-full z-20'>
       <Navbar />
        </div>


      <div className='  '>
            {children}
      </div>
     
    
    </div>
     <div className='w-full  z-10'>
      <Footer />
      </div>
    </div>
  )

}

export default ContentWrapper
