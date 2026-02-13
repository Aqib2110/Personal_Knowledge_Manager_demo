"use client";
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { usePathname } from 'next/navigation';
const ContentWrapper = ({children}: {children: React.ReactNode}) => {
  const [load, setload] = useState(false);
  const path = usePathname();
  useEffect(() => {
    if(path === "/auth/signup")
    {
      setload(true);
    }
  }, [path])
  
  return load ? <div className='h-screen w-screen  flex justify-center items-center'>
    <div className='w-full'>
  {children}
    </div>
  
  </div> : (
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
