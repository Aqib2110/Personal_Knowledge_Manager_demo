"use client";
import { SearchIcon,UploadIcon } from "lucide-react";
import { useRouter } from 'next/navigation';

export function DesktopInput() {
    const router = useRouter();
  return (
    <div className="w-full h-full flex">
         <div className="h-full w-full md:w-fit lg:w-1/4 pt-3 flex justify-center  py-2">
          <span className="bg-blue-500 flex items-center gap-2 cursor-pointer rounded-md px-9 py-2.5 text-white"
           onClick={()=>{console.log("clicked");router.push("/library")}}
          >
             <span className=" text-white" >
             <UploadIcon size={18} className=" text-white " />
            </span>
            Upload Document
          </span >
        </div>

        <div className="lg:w-3/4 w-full justify-center md:justify-start md:w-fit flex ">
          <div className=" w-100 lg:w-[60%] rounded-md bg-white border-gray-300 px-3 py-3   flex  items-center gap-2">
            <SearchIcon size={20} className="text-gray-500 " />
            <input
              type="text"
              placeholder="Search your knowledge..."
              className="w-full  text-sm  rounded-md text-gray-700 outline-none bg-white"
            />
          </div>

        </div>
    </div>
  )
}

export function MobileInput() {
  const router = useRouter();
  return <div className="flex flex-col w-full h-full justify-center items-center">
   <div className="px-6  w-full  justify-center md:justify-start md:w-fit flex ">
          <div className=" w-full rounded-md bg-white border-gray-300 px-3 py-3   flex  items-center gap-2">
            <SearchIcon size={20} className="text-gray-500 " />
            <input
              type="text"
              placeholder="Search your knowledge..."
              className="w-full  text-sm  rounded-md text-gray-700 outline-none bg-white"
            />
          </div>
        </div>

         <div className="h-full w-full  md:w-fit lg:w-1/4 pt-3 flex justify-center py-2">
          <span className="bg-blue-500 flex items-center cursor-pointer gap-2 cursor-pointer rounded-md px-9 py-2.5 text-white"
          onClick={()=>{console.log("clicked");router.push("/library")}}
          >
             <span className=" text-white" >
             <UploadIcon size={18} className=" text-white " />
            </span>
            Upload Document
          </span>
        </div>
  </div>
}