"use client";
import { UploadIcon } from 'lucide-react';
import React from 'react'
import { useRouter } from 'next/navigation';

const ButtonUpload = () => {
    const router = useRouter();
  return (
    <div>
       <div className="h-full w-full md:w-fit lg:w-1/4 pt-3 flex justify-center   py-2">
          <span className="bg-blue-500 flex items-center gap-2 cursor-pointer rounded-md px-9 py-2.5 text-white"
           onClick={()=>{console.log("clicked");router.push("/library")}}
          >
             <span className=" text-white" >
             <UploadIcon size={18} className=" text-white " />
            </span>
            Upload Document
          </span >
        </div>
    </div>
  )
}

export default ButtonUpload
