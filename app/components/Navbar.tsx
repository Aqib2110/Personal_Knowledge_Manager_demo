"use client";
import React, { useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { BellIcon,MenuIcon } from "lucide-react";
import MobNav from "./MobNav";
import { KnowledgeIcon } from "./KnowlegeIcon";
import { Profile } from "./Profile";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const Navbar = () => {
  const [nav, setnav] = useState("Dashboard");
  const [sidebar, setsidebar] = useState(false);
 const router = useRouter();
  const session = useSession();
  console.log(session);
  useEffect(() => {
  
   const path = window.location.pathname;
    if(path === "/")setnav("Dashboard");
    else if(path === "/library")setnav("Library");
    else if(path === "/tags")setnav("Tags");
    else if(path === "/ai")setnav("AI");
    else if(path === "/pricing")setnav("Pricing");
    else if(path === "/analytics")setnav("Analytics");
    if(session?.status === "unauthenticated")
    {
      router.push("/auth/signup");
      return;
    }
  }, [session])
  
 
  return (
    <div className="px-5 w-full h-[60px] border-b fixed top-0 left-0 border-white/10  bg-gradient-to-r from-slate-900 to-[#0B1E36]">
      <div className="flex h-full  justify-between items-center  ">
        <div className="flex h-full    md:flex-4 ">
          <div className=" flex  flex-5  justify-between items-center">

<div className={`${sidebar ? "block" : "hidden" }`}>
  <MobNav sidebar={sidebar} setsidebar={setsidebar}/>
</div>


 <div className="flex h-full cursor-pointer justify-center py-3  items-center gap-2" onClick={()=>{ router.push("/");setnav("Dashboard");}}>
            <span>
              <KnowledgeIcon className="w-6 h-6 text-blue-700" />
            </span>
            <span className="text-xl text-white font-bold">
              Knowledge<span className="text-white">Hub</span>{" "}
            </span>
          </div>
          
          <div className="hidden h-full md:flex justify-center gap-5 md:gap-8 lg:gap-15">
           
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
              className={`relative py-3 text-white text-center h-full justify-center font-semibold flex items-center  gap-5 rounded-md `}
              onClick={() => {
                setnav("AI");
              }}
            >
           AI Assistant <span className={`absolute  ${nav === "AI" ? "block" : "hidden"} bottom-0 w-full  border`}> </span>
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

      
      <div className=" gap-3  justify-end items-center flex h-full py-3 md:flex-1">
        <Link href={'/notifications'} className="cursor-pointer relative p-1.5">
 <BellIcon size={22} className="text-white" />
 <span className="bg-white p-0.5  text-center flex justify-center items-center text-xl rounded-full top-0 right-0 absolute">
 <span className="p-1 bg-blue-500 rounded-full"></span>
 
 </span>
        </Link>
        
      <div>
        <Profile session={session}/>
      </div>
      <div className="block md:hidden">
 <MenuIcon size={22} className="text-white" onClick={()=>{setsidebar(true);}} />

      </div>
      </div>
      </div>

     
    </div>
  );
};

export default Navbar;
