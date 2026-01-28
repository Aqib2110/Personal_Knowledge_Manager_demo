"use client";
import React from 'react';
import { Folder, Lightbulb, PinIcon } from "lucide-react";
import { SearchIcon } from "lucide-react";
import { BsThreeDots } from "react-icons/bs";
import { FaGreaterThan } from "react-icons/fa";
import { File,FileTypeIcon,FileText,BookOpen } from "lucide-react";
import { PlusCircle,CheckCircle,UploadIcon } from "lucide-react";
import {motion} from 'framer-motion';
const Hero = () => {
  return (
    <div className="min-h-screen relative z-1 bg-[url('/personal_knowledge_manager_bg.png')] bg-cover bg-center ">
      <div className='absolute inset-0 z-[-1] bg-black/50'></div>
  <div className="flex flex-col  px-6 md:px-0 pr-auto lg:pr-[6%]  justify-center items-center">
        <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}

        className="text-5xl pt-8  text-center text-white font-extrabold">
          Your Personal Knowledge Manager
        </motion.h1>
        <motion.p
         initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay:0.3 }}
        className="text-white text-center pt-2 font-semibold text-2xl">
          Organize, Summarize and Discover Insights With Ease.
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay:0.6 }}
      className=" hidden flex-col md:flex md:flex-row gap-5 items-center  justify-center lg:justify-start  mt-3 w-full">
        <div className="h-full w-full md:w-fit lg:w-1/4 pt-3 flex justify-center   py-2">
          <span className="bg-blue-500 flex items-center gap-2 cursor-pointer rounded-md px-9 py-2.5 text-white">
             <span className=" text-white">
             <UploadIcon size={18} className=" text-white " />
            </span>
            Upload Document
          </span>
        </div>

        <div className="lg:w-3/4 w-full  justify-center md:justify-start md:w-fit flex ">
          <div className=" w-100 lg:w-[60%] rounded-md bg-white border-gray-300 px-3 py-3   flex  items-center gap-2">
            <SearchIcon size={20} className="text-gray-500 " />
            <input
              type="text"
              placeholder="Search your knowledge..."
              className="w-full  text-sm  rounded-md text-gray-700 outline-none bg-white"
            />
          </div>
        </div>
      </motion.div>
        <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay:0.6 }}
      className=" flex flex-col md:hidden md:flex-row items-center gap-1 justify-center lg:justify-start  mt-3 w-full">
       

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

         <div className="h-full w-full  md:w-fit lg:w-1/4 pt-3 flex justify-center   py-2">
          <span className="bg-blue-500 flex items-center gap-2 cursor-pointer rounded-md px-9 py-2.5 text-white">
             <span className=" text-white">
             <UploadIcon size={18} className=" text-white " />
            </span>
            Upload Document
          </span>
        </div>
      </motion.div>
      <div className="w-full pt-2 pb-3 flex flex-1 px-6">
<div className=" flex flex-col md:flex-row   gap-5 flex-1">
<motion.div 
 initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5, delay:0.9 }}
className="bg-white/90 border-white/10 w-full lg:w-[20%] h-fit rounded-xl pb-2 px-4">
<div className="">
<div className="flex justify-between items-center pt-3  border-black">
  

<span className="text-lg font-bold text-black ">
Quick Notes
</span>
  <span className=" text-black ">
 <BsThreeDots size={25} className="text-gray-400  border-black"/>
  </span>
</div>
<div className="border-b border-gray-400 pt-1"></div>
<div className="pt-2 flex flex-col gap-3 pb-3">
  <div className="rounded-md  text-black bg-white px-3 py-1">
<span className="text-md flex items-center gap-2 font-bold">
   <span className="bg-blue-500 rounded-sm text-white">
    <CheckCircle size={14} className=" text-white " />
    </span>
  Project Ideas
  </span>
<ul className="list-disc px-6  pt-1 flex flex-col gap-1">
<li className="text-[12px] font-semibold">
Research AI trends
</li>
<li className="text-[12px] font-semibold">
  Plan content strategy
</li>
</ul>

  </div>
  <div className="rounded-md text-black bg-white px-3 py-2">
   <span className="text-md flex items-center gap-2 font-bold">
      <span className="bg-orange-500 rounded-sm text-white">
    <PlusCircle size={14} className=" text-white " />
    </span>
    Meeting Notes
    </span>
<ul className="list-disc px-6  pt-1 flex flex-col gap-1">
<li className="text-[12px] list-style-dot font-semibold">
Client call at 2 PM
</li>
<li className="text-[12px]  font-semibold">
  Follow up next steps
</li>
</ul>
  </div>
</div>
<div className="flex justify-between items-center ">
<span className="text-lg font-semibold text-black ">
Recent Files
</span>
  <span className=" text-black ">
 <BsThreeDots size={25} className="text-gray-400  border-black"/>
  </span>
</div>
<div className="border-b border-gray-300 pt-1"></div>
<div className="flex flex-col gap-1 text-gray-700 pt-1">
  <span className="text-sm flex items-center gap-2 font-semibold">
   <span className="bg-red-900 rounded-sm text-white">
    <FileText size={14} className=" text-white " />
    </span>
  
    Maketing Analysis.pdf
   
    </span>
  <span className="text-sm flex items-center gap-2 font-semibold">
    <span className="bg-blue-500 rounded-sm  text-white">
    <FileTypeIcon size={14} className=" text-white " />
    </span>
    UX Design Guide.docx
      </span>
      <span className="text-sm flex items-center gap-2 font-semibold">
        <span className="bg-blue-600 rounded-sm text-white">
    <File size={14} className=" text-white " />
    </span>
    History Essay.md
      </span>
</div>
</div>
</motion.div>
<motion.div
 initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.5, delay:1.2 }}
className="  bg-white/90  border-white/10 h-fit w-full lg:w-[50%] rounded-xl border px-4">
  <div>
   <h1 className="text-xl pt-5 font-bold text-black">Smart Summary</h1>
   <div className="border-gray-300 pt-1 border-b"></div>
   <h1 className="text-2xl pt-4 font-bold text-black">Quantum Computing Overview</h1>
  <p className="text-md pt-5 text-black font-bold">
    Quantum computing leverages quantum mechanics to process information at unprecedented speeds. key topics include qubits,superposition and entanglement. Ths technology promises breakthroughs in cryptography, material science and complex problem solving. 
  </p>
  <div className="border-gray-300 border-b pt-3"></div>
  <h2 className="text-lg py-3 font-bold text-black">Key Points</h2>
  <div className="border-gray-300 border-b"></div>
 <ul className="flex list-disc px-5 flex-col gap-2">
  <li className="text-gray-700 font-bold text-md">Qubits and superposition</li>
  <li className="text-gray-700 font-bold text-md">Applications in cryptography</li>
  <li className="text-gray-700 font-bold text-md">Future potential in drug discovery</li>
 </ul>
   <div className="border-gray-300 pb-3 border-b"></div>
   <div className="py-2">
    <div className="flex justify-end">
    <span className="bg-blue-500 flex gap-5 justify-center w-fit items-center px-6 py-1.5 rounded-md ">
     <span>Read More</span>  <span><FaGreaterThan size={10} className=""/></span>
    </span>
      </div>
   </div>


  </div>

</motion.div>
<motion.div
 initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay:1.5 }}
className=" bg-white/90  h-fit w-full lg:w-[30%] pb-5 rounded-xl border px-5">
<div>
<div className=" flex justify-between items-center pt-3  border-black ">
  

<span className="text-lg font-bold text-black ">
Knowledge Highlights
</span>
  <span className=" text-black ">
 <BsThreeDots size={25} className="text-gray-400  border-black"/>
  </span>
</div>
<div className="border-b border-gray-300 pt-2"></div>
<div className="pt-3 flex flex-col gap-2">
  <div className="bg-white rounded-md px-3 py-2">
    <span className="flex items-center gap-2">
      <span className="bg-blue-500 rounded-sm text-white">
    <BookOpen size={14} className=" text-white " />
    </span>
  <h2 className="font-semibold text-black text-md">The Future of AI in Healthcare</h2>
    </span>
    <span className="text-gray-400 text-sm font-semibold">
      15m ago
    </span>
  

  </div>
  <div className="bg-white rounded-md p-3">
 <span className="flex items-center gap-2">
      <span className="bg-purple-500 rounded-sm text-white">
    <Lightbulb size={14} className=" text-white " />
    </span>
  <h2 className="font-semibold text-black text-md">Tips for Effective Time Management</h2>
    </span>
    <span className="text-gray-400 text-sm font-semibold">
      1h ago
    </span>
  </div>
  <div className="bg-white rounded-md p-3">
 <span className="flex items-center gap-2">
      <span className="bg-orange-500 rounded-sm text-white">
    <BookOpen size={14} className=" text-white " />
    </span>
  <h2 className="font-semibold text-black text-md">Ancient Civilization Overview</h2>
    </span>
    <span className="text-gray-400 text-sm font-semibold">
      3h ago
    </span>
  </div>

</div>
</div>
</motion.div>
</div>
      </div>
      </div>
  )
}

export default Hero
