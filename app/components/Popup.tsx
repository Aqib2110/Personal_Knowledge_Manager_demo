import React, { ReactNode } from 'react'
import { CrossIcon } from 'lucide-react'
const Popup = ({Children,showPopup,setselectWorkspace,setshowPopup}:{Children:React.ReactNode,showPopup:boolean,setselectWorkspace?:React.Dispatch<boolean>,setshowPopup:React.Dispatch<boolean>}) => {
  return (
    <div className={`w-screen ${showPopup ? "block" : "hidden"}  z-10 pt-[60px]  flex border justify-center items-center h-screen absolute top-0 right-0`}>
        <div className='w-screen bg-gray-50 z-10 opacity-90 h-screen pt-[60px] absolute top-0 right-0'>

        </div>
        <div className='relative z-50 flex justify-center items-center h-full w-full border'>
 <CrossIcon size={14} className='absolute text-black cursor-pointer rotate-[45deg] top-3 right-3' onClick={()=>{setselectWorkspace && setselectWorkspace(true);setshowPopup(false)}}/>
     {Children}
        </div>
     
    </div>
  )
}

export default Popup
