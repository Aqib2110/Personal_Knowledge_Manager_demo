"use client";
import React, { useState } from 'react'
import { MenuIcon } from "lucide-react";
import dynamic from 'next/dynamic';
const MobNav = dynamic(() => import("./MobNav"), {
  ssr: false,
});
const MenuWrapper = () => {
    const [sidebar, setsidebar] = useState(false);
  return (
    <div>  
   <MenuIcon size={22} className="text-white" onClick={() => { setsidebar(true); }} />
    { sidebar && <MobNav  setsidebar={setsidebar} /> }
    </div>
  )
}

export default React.memo(MenuWrapper);
