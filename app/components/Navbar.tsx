"use client";
import React from "react";
import { SearchIcon } from "lucide-react";
import { BellIcon,MenuIcon } from "lucide-react";

import { KnowledgeIcon } from "./KnowlegeIcon";
import { Profile } from "./Profile";
import Link from "next/link";
import { useState } from "react";
const Navbar = () => {
  const [nav, setnav] = useState("Dashboard");
  return (
    <div className="px-5 w-full h-[60px] border-b fixed top-0  border-white/10  bg-gradient-to-r from-slate-900 to-[#0B1E36]">
      <div className="flex h-full  justify-between items-center  gap-2">
        <div className="flex h-full    md:flex-4 ">
          <div className=" flex  flex-5 gap-5 justify-between items-center">




 <div className="flex h-full  justify-center py-3  items-center gap-2">
            <span>
              <KnowledgeIcon className="w-6 h-6 text-blue-700" />
            </span>
            <span className="text-xl text-white font-bold">
              Knowledge<span className="text-white">Hub</span>{" "}
            </span>
          </div>

          <div className=" hidden h-full md:flex  justify-center gap-5 lg:gap-15">
           
            <Link
              href={"/"}
              className={`  relative py-3 text-white  h-full justify-center font-semibold flex items-center  gap-5 rounded-md `}
              onClick={() => {
                setnav("Dashboard");
              }}
            >
             Dashboard <span className={`absolute ${nav === "Dashboard" ? "block" : "hidden"} bottom-0 w-full  border`}> </span>
            </Link>
            <Link
              href={"/library"}
              className={` relative py-3 text-white  h-full justify-center font-semibold flex items-center  gap-5 rounded-md `}
              onClick={() => {
                setnav("Library");
              }}
            >
            Library  <span className={`absolute ${nav === "Library" ? "block" : "hidden"} bottom-0 w-full  border`}> </span>
            </Link>
            <Link
              href={"/tags"}
              className={`relative py-3 text-white  h-full justify-center font-semibold flex items-center  gap-5 rounded-md `}
              onClick={() => {
                setnav("Tags");
              }}
            >
              Tags<span className={`absolute ${nav === "Tags" ? "block" : "hidden"} bottom-0 w-full  border`}> </span>
            </Link>
            <Link
              href={"/ai"}
              className={`relative py-3 text-white  h-full justify-center font-semibold flex items-center  gap-5 rounded-md `}
              onClick={() => {
                setnav("AI");
              }}
            >
           AI Assistant <span className={`absolute ${nav === "AI" ? "block" : "hidden"} bottom-0 w-full  border`}> </span>
            </Link>
            <Link
              href={"/pricing"}
              className={`relative py-3 text-white  h-full justify-center font-semibold flex items-center  gap-5 rounded-md `}
              onClick={() => {
                setnav("Pricing");
              }}
            >
            Pricing <span className={`absolute ${nav === "Pricing" ? "block" : "hidden"} bottom-0 w-full  border`}> </span>
            </Link>
             <Link
              href={"/analytics"}
              className={`relative py-3 text-white  h-full justify-center font-semibold flex items-center  gap-5 rounded-md `}
              onClick={() => {
                setnav("Analytics");
              }}
            >
            Analytics <span className={`absolute ${nav === "Analytics" ? "block" : "hidden"} bottom-0 w-full  border`}> </span>
            </Link>
          </div>




          </div>
         

          
        </div>

        {/* <div className=" h-full py-3 flex-1">
          <div className="flex h-full justify-end gap-5 items-center ">
            <BellIcon size={22} className="text-white" />
            <div className="rounded-full flex justify-center items-center border border-gray-500 w-8 h-8">
              <span className="text-white font-bold">M</span>
            </div>
          </div>
        </div>
      </div> */}
      <div className="  gap-5 justify-end items-center flex h-full py-3 md:flex-1">
        <Link href={'/notifications'} className="cursor-pointer relative p-1.5">
 <BellIcon size={22} className="text-white" />
 <span className="bg-white p-0.5  text-center flex justify-center items-center text-xl rounded-full top-0 right-0 absolute">
 <span className="p-1 bg-blue-500 rounded-full"></span>
 
 </span>
        </Link>
        
      <div>
        <Profile />
      </div>
      <div className="block md:hidden">
 <MenuIcon size={22} className="text-white" />

      </div>
      </div>
      </div>

      {/* <div className='w-[18vw] flex text-gray-700 items-center px-5 gap-2'>
        <span><KnowledgeIcon className="w-6 h-6 text-blue-700" /></span>
        <span className='text-xl font-bold'>Knowledge<span className='text-blue-700'>Hub</span> </span>
      </div>
      <div className='w-[82vw] '>
      <div className='w-full h-full px-5 flex  justify-center items-center'>
        <div className='border rounded-md border-gray-300 px-2 py-2  w-[55%] flex  items-center gap-2'>
<SearchIcon size={18} className='text-gray-500 '/>
<input type="text" placeholder='Search notes..' className='w-full text-sm text-gray-700 outline-none placeholder-gray-500' />
        </div>

        <div className='w-[45%] flex  justify-end gap-5 items-center '>
        <BellIcon size={22} className='text-gray-500'/>
         <div className='rounded-full flex justify-center items-center border border-gray-500 w-8 h-8'>
          <span className='text-gray-700 font-bold'>
            M
          </span>
         </div>
        </div>

      </div>
      </div> */}
    </div>
  );
};

export default Navbar;
