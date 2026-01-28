import React from 'react'
import Link from 'next/link';
import { useState } from 'react';
import { CrossIcon,Cross } from 'lucide-react';
const MobNav = ({sidebar,setsidebar}:{sidebar:boolean,setsidebar:React.Dispatch<boolean>}) => {
    const [nav, setnav] = useState("Dashboard");
  return (
    <div className='h-screen absolute top-0 right-0 z-10 w-full bg-gradient-to-r from-slate-900 to-[#0B1E36]'>
        <div className=" h-full  flex flex-col justify-center items-center gap-20">
            <Cross size={22} className='text-white rotate-[45deg] absolute top-3 right-3' onClick={()=>{setsidebar(false);}}/>
                  <Link
                    href={"/"}
                    className={`  relative px-5 py-2 ${nav === "Dashboard" ? "bg-slate-900" : ""} text-white  justify-center font-semibold flex items-center  gap-5 rounded-md `}
                    onClick={() => {
                      setnav("Dashboard");
                      setsidebar(false);
                    }}
                  >
                   Dashboard
                  </Link>
                  <Link
                    href={"/library"}
                    className={` relative text-white px-5 py-2 ${nav === "Library" ? "bg-slate-900" : ""}  justify-center font-semibold flex items-center  gap-5 rounded-md `}
                    onClick={() => {
                      setnav("Library");
                      setsidebar(false);
                    }}
                  >
                  Library  
                  </Link>
                  <Link
                    href={"/tags"}
                    className={`relative  text-white  px-5 py-2 ${nav === "Tags" ? "bg-slate-900" : ""}  justify-center font-semibold flex items-center  gap-5 rounded-md `}
                    onClick={() => {
                      setnav("Tags");
                      setsidebar(false);
                    }}
                  >
                    Tags
                  </Link>
                  <Link
                    href={"/ai"}
                    className={`relative text-white px-5 py-2 ${nav === "AI" ? "bg-slate-900" : ""} text-center  justify-center font-semibold flex items-center  gap-5 rounded-md `}
                    onClick={() => {
                      setnav("AI");
                      setsidebar(false);
                    }}
                  >
                 AI Assistant 
                  </Link>
                  <Link
                    href={"/pricing"}
                    className={`relative  text-white px-5 py-2 ${nav === "Pricing" ? "bg-slate-900" : ""} justify-center font-semibold flex items-center  gap-5 rounded-md `}
                    onClick={() => {
                      setnav("Pricing");
                      setsidebar(false);
                    }}
                  >
                  Pricing 
                  </Link>
                   <Link
                    href={"/analytics"}
                    className={`relative  text-white px-5 py-2 ${nav === "Analytics" ? "bg-slate-900" : ""}  justify-center font-semibold flex items-center  gap-5 rounded-md `}
                    onClick={() => {
                      setnav("Analytics");
                      setsidebar(false);
                    }}
                  >
                  Analytics 
                  </Link>
                </div>
    </div>
  )
}

export default MobNav
