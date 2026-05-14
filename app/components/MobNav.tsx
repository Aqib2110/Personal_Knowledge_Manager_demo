"use client";
import React from 'react'
import Link from 'next/link';
import { Cross } from 'lucide-react';
import { usePathname } from 'next/navigation';
const MobNav = ({setsidebar}:{setsidebar:React.Dispatch<boolean>}) => {
   
      const path = usePathname();

  return (
    <div className='h-screen fixed flex justify-center items-center left-0 top-0 right-0 z-50 w-full bg-gradient-to-r from-slate-900 to-[#0B1E36]'>
        <div className=" h-4/5  flex flex-col justify-between items-center">
        
            <Cross size={22} className='text-white rotate-[45deg] absolute top-3 right-3' onClick={()=>{setsidebar(false);}}/>
                  <Link
                    href={"/"}
                    className={`  relative px-5 py-2 ${path === "/" ? "bg-slate-900" : ""} text-white  justify-center font-semibold flex items-center  gap-5 rounded-md `}
                    onClick={() => {
                     
                      setsidebar(false);
                    }}
                  >
                   Dashboard
                  </Link>
                  <Link
                    href={"/library"}
                    className={` relative text-white px-5 py-2 ${path === "/library" ? "bg-slate-900" : ""}  justify-center font-semibold flex items-center  gap-5 rounded-md `}
                    onClick={() => {
                     
                      setsidebar(false);
                    }}
                  >
                  Library  
                  </Link>
                  <Link
                    href={"/tags"}
                    className={`relative  text-white  px-5 py-2 ${path === "/tags" ? "bg-slate-900" : ""}  justify-center font-semibold flex items-center  gap-5 rounded-md `}
                    onClick={() => {
                     
                      setsidebar(false);
                    }}
                  >
                    Tags
                  </Link>
                  <Link
                    href={"/ai"}
                    className={`relative text-white px-5 py-2 ${path === "/ai" ? "bg-slate-900" : ""} text-center  justify-center font-semibold flex items-center  gap-5 rounded-md `}
                    onClick={() => {
                    
                      setsidebar(false);
                    }}
                  >
                 AI Assistant 
                  </Link>
                  <Link
                    href={"/pricing"}
                    className={`relative  text-white px-5 py-2 ${path === "/pricing" ? "bg-slate-900" : ""} justify-center font-semibold flex items-center  gap-5 rounded-md `}
                    onClick={() => {
                    
                      setsidebar(false);
                    }}
                  >
                  Pricing 
                  </Link>
                   <Link
                    href={"/analytics"}
                    className={`relative  text-white px-5 py-2 ${path === "/analytics" ? "bg-slate-900" : ""}  justify-center font-semibold flex items-center  gap-5 rounded-md `}
                    onClick={() => {
                     
                      setsidebar(false);
                    }}
                  >
                  Analytics 
                  </Link>
                </div>
    </div>
  )
}

export default React.memo(MobNav);
