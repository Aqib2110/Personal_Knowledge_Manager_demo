import React from "react";
import NavLinks from "./NavLinks";
import MenuWrapper from "./MenuWrapper";
import Logo from "./Logo";
import NotifiLink from "./NotifiLink";
import ProfileServerCom from "./ProfileServerCom";
const Navbar = () => {

  return (
    <div className="px-5 z-50 w-full h-[60px] border-b fixed top-0 left-0 border-white/10  bg-gradient-to-r from-slate-900 to-[#0B1E36]">
      <div className="flex h-full  justify-between items-center  ">
        <div className="flex h-full    md:flex-4 ">
          <div className=" flex  flex-5  justify-between items-center">
           <Logo />
          <NavLinks />
          </div>
        </div>


        <div className=" gap-3  justify-end items-center flex h-full py-3 md:flex-1">
         <NotifiLink />

          <div>
            <ProfileServerCom />
          </div>
          <div className="block md:hidden">
            <MenuWrapper />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;