"use client";
import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const NavLinks = () => {
  const path = usePathname();
  return (
    <div>
       <div className="hidden h-full md:flex justify-center gap-5 md:gap-8 lg:gap-15">

              <Link
                href={"/"}
                className={`  relative py-3 text-white  h-full justify-center font-semibold flex items-center  gap-5 rounded-md `}
              >
                Dashboard <span className={`absolute ${path === "/" ? "block" : "hidden"} bottom-0 w-full  border`}> </span>
              </Link>
              <Link
                href={"/library"}
                className={` relative py-3 text-white  h-full justify-center font-semibold flex items-center  gap-5 rounded-md `}
              >
                Library  <span className={`absolute ${path === "/library" ? "block" : "hidden"} bottom-0 w-full  border`}> </span>
              </Link>
              <Link
                href={"/tags"}
                className={`relative py-3 text-white  h-full justify-center font-semibold flex items-center  gap-5 rounded-md `}
               
              >
                Tags<span className={`absolute ${path === "/tags" ? "block" : "hidden"} bottom-0 w-full  border`}> </span>
              </Link>
              <Link
                href={"/ai"}
                className={`relative py-3 text-white text-center h-full justify-center font-semibold flex items-center  gap-5 rounded-md `}
               
              >
                AI Assistant <span className={`absolute  ${path === "/ai" ? "block" : "hidden"} bottom-0 w-full  border`}> </span>
              </Link>
              <Link
                href={"/pricing"}
                className={`relative py-3 text-white  h-full justify-center font-semibold flex items-center  gap-5 rounded-md `}
          
              >
                Pricing <span className={`absolute ${path === "/pricing" ? "block" : "hidden"} bottom-0 w-full  border`}> </span>
              </Link>
              <Link
                href={"/analytics"}
                className={`relative py-3 text-white  h-full justify-center font-semibold flex items-center  gap-5 rounded-md `}
              
              >
                Analytics <span className={`absolute ${path === "/analytics" ? "block" : "hidden"} bottom-0 w-full  border`}> </span>
              </Link>
            </div>
    </div>
  )
}

export default React.memo(NavLinks);
