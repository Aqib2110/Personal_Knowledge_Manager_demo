import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
const ContentWrapper = ({children}: {children: React.ReactNode}) => {
  return (
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
