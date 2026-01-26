// "use client";
// import React from 'react'
// import Link from 'next/link'
// import { Home, FileText, Folder,PlusIcon, Globe } from "lucide-react";
// import { History } from "lucide-react";
// import { useState } from 'react';
// const Sidebar = () => {
//    const [nav, setnav] = useState('Home');
//    const [notes, setnotes] = useState('');

//   return (
//     <div className='h-full w-full pr-3'>

      // <div className='py-5 flex flex-col gap-2 border-b border-gray-300 '>
      //   <Link href={"/"} className={` py-2 px-6 ${nav === "Home" ? "bg-gray-200 text-gray-700" : "text-gray-500"} font-semibold flex items-center gap-2 rounded-md hover:bg-gray-200 hover:text-gray-700`} onClick={()=>{setnav("Home")}}><span>  <Home size={20} fill='gray' className="text-gray-700" /></span>Home</Link>
      //    <Link href={"/notes"} className={` py-2 px-6 ${nav === "Notes" ? "bg-gray-200 text-gray-700" : "text-gray-500"} font-semibold flex items-center gap-2 rounded-md hover:bg-gray-200 hover:text-gray-700`} onClick={()=>{setnav("Notes")}}><span>  <FileText size={20} fill='gray' className="text-gray-700" /></span>All Notes</Link>
      //     <Link href={"/projects"} className={` py-2 px-6 ${nav === "Projects" ? "bg-gray-200 text-gray-700" : "text-gray-500"} font-semibold flex items-center gap-2 rounded-md hover:bg-gray-200 hover:text-gray-700`} onClick={()=>{setnav("Projects")}}><span>  <Folder size={20} fill='gray' className="text-gray-700" /></span>Projects</Link>
      //     <Link href={"/resources"} className={` py-2 px-6 ${nav === "Resources" ? "bg-gray-200 text-gray-700" : "text-gray-500"} font-semibold flex items-center gap-2 rounded-md hover:bg-gray-200 hover:text-gray-700`} onClick={()=>{setnav("Resources")}}><span>  <Globe size={20} fill='gray' className="text-gray-700" /></span>Resources</Link>

      // </div>

//       <div className='py-6 pl-3 flex flex-col gap-3 border-b border-gray-300'>
//         <span className='px-3 text-gray-500 text-sm font-semibold '>Shortcuts</span>
//         <div className='flex flex-col gap-2'>
//            <div className={` ${notes === 'new_notes' ? 'bg-gray-200 text-gray-700' : 'text-gray-500'}  flex items-center gap-2  rounded-md text-md font-semibold hover:bg-gray-200 hover:text-gray-700 px-3 py-2 cursor-pointer`} onClick={()=>{setnotes('new_notes')}}>
//             <span className=''>
//           <PlusIcon size={20} className="text-muted" />
//             </span>
//             New Note
//           </div>

//            <div className={` ${notes === 'recent_notes' ? 'bg-gray-200 text-gray-700' : 'text-gray-500'}  flex items-center gap-2  rounded-md text-md font-semibold hover:bg-gray-200 hover:text-gray-700 px-3 py-2 cursor-pointer`} onClick={()=>{setnotes('recent_notes')}}>
//             <span>
//           <History size={20} className="text-muted" />
//             </span>
//            Recent Notes
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default Sidebar
